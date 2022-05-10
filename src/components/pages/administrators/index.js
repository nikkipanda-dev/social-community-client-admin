import { useState, useEffect } from 'react';
import { Table, message, } from 'antd';
import Cookies from 'js-cookie';
import { isAuth, key, showAlert } from '../../../util';
import { axiosInstance } from '../../../requests';
import { styled } from "../../../stitches.config";

import Heading from "../../core/Heading";
import Button from '../../core/Button';
import Text from '../../core/Text';
import User from '../../widgets/User';
import Modal from '../../widgets/Modal';
import Alert from '../../core/Alert';

const AdministratorsWrapper = styled('div', {
    padding: '$space-3',
    '> div:nth-child(n+2)': {
        marginTop: '60px',
    },
});

const HeaderWrapper = styled('div', {});

const ColumnWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const TableWrapper = styled('div', {
    'thead > tr > th': {
        fontFamily: '$manjari',
        fontSize: '$default',
        letterSpacing: '$default',
    },
});

export const Administrators = () => {
    const [admins, setAdmins] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [help, setHelp] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleAdmins = admins => setAdmins(admins);

    const handleShowModal = () => setIsVisible(true);
    const handleHideModal = () => setIsVisible(false);
    const handleUsername = username => setUsername(username);

    const getAdministrators = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + "administrators", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                console.log('response ', response.data.data.details);
                handleAdmins(response.data.data.details);
            })

            .catch(err => {
                console.log('err ', err.response ? err.response.data.errors : err);
            });
        } else {
            console.log('on admin: no cookies');
        }
    }

    const confirmRemoval = username => {
        handleUsername(username);
        handleShowModal();
    }

    const removeAdminPrivileges = () => {
        setHelp('');
        setStatus('');
        setHeader('');

        if (isAuth()) {
            const removeAdminForm = new FormData();
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            removeAdminForm.append('auth_username', JSON.parse(Cookies.get('auth_user')).username);
            removeAdminForm.append('username', username);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "destroy-administrator", removeAdminForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    getAdministrators();
                    handleHideModal();
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: `Removed @${response.data.data.details.username + ((response.data.data.details.username.charAt(response.data.data.details.username.length - 1) !== 's'.toLowerCase()) ? "'s" : "'")} administrative privileges.`,
                            key,
                            duration: 2,
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999',
                            }
                        });
                    }, 1000);
                } else {
                    showAlert();
                    setTimeout(() => {
                        message.info({
                            content: response.data.data.errorText,
                            key,
                            duration: 2,
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999',
                            }
                        });
                    }, 1000);
                }
            })

            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setStatus('error');
                    setHeader('Error')
                    setHelp(<Text type="span" color="red">{err.response.data.errors.username[0]}</Text>);
                }
            });
        } else {
            console.log('on admin: no cookies');
        }
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            width: '200px',
            render: (_, record) => (
                <ColumnWrapper>
                    <User member={record} type="item" />
                </ColumnWrapper>
            )
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            width: '200px',
            render: (_, record) => (
                <ColumnWrapper>
                    <Text type="span">
                    {
                        new Intl.DateTimeFormat('en-US', {
                            timeZone: 'Asia/Manila',
                            month: 'short',
                            year: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hourCycle: 'h24',
                            weekday: 'short',
                        }).format(new Date(record.created_at))
                    }
                </Text>
                </ColumnWrapper>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (_, record) => (
                <ColumnWrapper style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    <Button
                    type="button"
                    text="Remove"
                    color="red"
                    onClick={() => confirmRemoval(record.username)} />
                </ColumnWrapper>
            ),
        },
    ];

    useEffect(() => {
        let loading = true;

        if (loading) {
            getAdministrators();
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <AdministratorsWrapper>
            <HeaderWrapper>
                <Heading type={5} text="Administrators" />
            </HeaderWrapper>
            {
                help && 
                <Alert
                status={status}
                header={header}
                icon>
                    {help}
                </Alert>   
            }
            <TableWrapper>
                <Table 
                columns={columns} 
                rowKey="id"
                sticky
                pagination={false}
                dataSource={admins} />
            </TableWrapper>
            <Modal
            isVisible={isVisible}
            closable
            maskClosable
            title="Confirm removal"
            onCancel={handleHideModal}>
                <Alert status="warning" header="Remove">This will only remove the member's administrator privileges.</Alert>
                <SubmitButtonWrapper className="d-flex justify-content-sm-end">
                    <Button 
                    type="button" 
                    className="flex-grow-1 flex-sm-grow-0 mt-3"
                    text="Remove" 
                    onClick={() => removeAdminPrivileges()}
                    color="red" />
                </SubmitButtonWrapper>
            </Modal>
        </AdministratorsWrapper>
    )
}

export default Administrators;