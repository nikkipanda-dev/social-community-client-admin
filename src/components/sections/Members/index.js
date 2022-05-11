import { useState } from 'react';
import { Table, message, } from 'antd';
import { isAuth, key, showAlert } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { styled } from "../../../stitches.config";

import Heading from "../../core/Heading";
import Button from '../../core/Button';
import Text from '../../core/Text';
import User from '../../widgets/User';
import Modal from '../../widgets/Modal';
import Alert from '../../core/Alert';

const MembersWrapper = styled('div', {});

const ColumnWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const TableWrapper = styled('div', {
    'thead > tr > th': {
        fontFamily: '$manjari',
        fontSize: '$default',
        letterSpacing: '$default',
    },
});

export const Members = ({ 
    members, 
    handleMembers, 
    className, 
    css,
    render,
    handleForceRender,
}) => {
    console.log('members ', members && members);

    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [help, setHelp] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleShowModal = () => setIsVisible(true);
    const handleHideModal = () => setIsVisible(false);
    const handleName = (firstName, lastName) => setName(firstName + ' ' + lastName)
    const handleUsername = username => setUsername(username);

    const confirmRemoval = (username, firstName, lastName) => {
        handleName(firstName, lastName);
        handleUsername(username);
        handleShowModal();
    }

    const deleteUser = () => {
        setHelp('');
        setStatus('');
        setHeader('');

        if (isAuth()) {
            const removeAdminForm = new FormData();
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            removeAdminForm.append('auth_username', JSON.parse(Cookies.get('auth_user')).username);
            removeAdminForm.append('username', username);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "destroy-user", removeAdminForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleForceRender();
                    handleHideModal();
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: `Removed @${response.data.data.details + ((response.data.data.details.charAt(response.data.data.details.length - 1) !== 's'.toLowerCase()) ? "'s" : "'")} from the community.`,
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
                        onClick={() => confirmRemoval(record.username, record.first_name, record.last_name)} />
                </ColumnWrapper>
            ),
        },
    ];

    return (
        <MembersWrapper className={'' + (className ? (' ' + className) : '')} {...css & { css: {...css} }}>
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
                dataSource={members} />
            </TableWrapper>
            <Modal
            isVisible={isVisible}
            closable
            maskClosable
            title="Confirm removal"
            onCancel={handleHideModal}>
                <Alert status="warning" header="Remove" icon>
                    <Text type="span">You are about to remove {name}</Text> <Text type="span" color="darkGray">@{username}</Text> <Text type="span">from your community. Continue?</Text>
                </Alert>
                <SubmitButtonWrapper className="d-flex justify-content-sm-end">
                    <Button
                    type="button"
                    className="flex-grow-1 flex-sm-grow-0 mt-3"
                    text="Remove"
                    onClick={() => deleteUser()}
                    color="red" />
                </SubmitButtonWrapper>
            </Modal>
        </MembersWrapper>
    )
}
