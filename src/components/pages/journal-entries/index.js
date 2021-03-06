import { useState, useEffect } from "react";
import { Table, message, } from 'antd';
import Cookies from 'js-cookie';
import { axiosInstance } from "../../../requests";
import { isAuth } from "../../../util";
import { styled } from "../../../stitches.config";

import Heading from "../../core/Heading";
import Alert from "../../core/Alert";
import Modal from "../../widgets/Modal";
import Button from "../../core/Button";
import Text from "../../core/Text";
import Report from "../../widgets/Report";

const JournalEntriesWrapper = styled('div', {
    padding: '$space-3',
    '> div:nth-child(n+2)': {
        marginTop: '60px',
    },
});

const HeaderWrapper = styled('div', {});

const ColumnWrapper = styled('div', {});

const TableWrapper = styled('div', {
    'thead > tr > th': {
        fontFamily: '$manjari',
        fontSize: '$default',
        letterSpacing: '$default',
    },
});

export const JournalEntries = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [help, setHelp] = useState('');
    const [journalEntries, setJournalEntries] = useState('');
    const [journalId, setJournalId] = useState('');
    const [status, setStatus] = useState('');
    const [header, setHeader] = useState('');

    const handleJournalEntries = journalEntries => setJournalEntries(journalEntries);
    const handleShowModal = () => setIsVisible(true);
    const handleHideModal = () => setIsVisible(false);

    const getJournalEntries = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + "journal-entries", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleJournalEntries(response.data.data.details);
                }
            })

            .catch(err => {
                console.log('err ', err.response ? err.response.data.errors : err);
            });
        } else {
            console.log('on journal entries: no cookies');
        }
    }

    const confirmReport = journalId => {
        setJournalId(journalId);
        handleShowModal();
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            width: '150px',
            render: (_, record) => (
                <ColumnWrapper>
                    <Text type="span">@{(record.user) ? record.user.username : 'no author'}</Text>
                </ColumnWrapper>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '200px',
            render: (_, record) => (
                <ColumnWrapper className="d-flex">
                    <ColumnWrapper css={{ width: '170px', overflow: 'hidden', whiteSpace: 'nowrap', }}>
                        <Text type="span">{record.title}</Text>
                    </ColumnWrapper>
                    <Text type="span">&#xa0;...</Text>
                </ColumnWrapper>
            )
        },
        {
            title: 'Body',
            dataIndex: 'body',
            width: '250px',
            render: (_, record) => (
                <ColumnWrapper className="d-flex">
                    <ColumnWrapper css={{ width: '220px', overflow: 'hidden', whiteSpace: 'nowrap', }}>
                        <Text type="span">{record.body}</Text>
                    </ColumnWrapper>
                    <Text type="span">&#xa0;...</Text>
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
                <ColumnWrapper css={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    <Button
                        type="button"
                        text="Report"
                        color="red"
                        onClick={() => confirmReport(record.id)} />
                </ColumnWrapper>
            ),
        },
    ];

    useEffect(() => {
        let loading = true;

        if (loading) {
            getJournalEntries();
        }

        return () => {
            loading = false;
        }
    }, []); 

    return (
        <JournalEntriesWrapper>
            <HeaderWrapper>
                <Heading type={5} text="Journal Entries" />
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
            <TableWrapper css={{ minWidth: '900px', }}>
                <Table
                columns={columns}
                rowKey="id"
                sticky
                pagination={false}
                dataSource={journalEntries} />
            </TableWrapper>
            <Modal
            isVisible={isVisible}
            closable
            maskClosable
            title="Confirmation"
            onCancel={handleHideModal}>
                <Alert status="warning" header="Remove">Report post?</Alert>
                <Report />
            </Modal>
        </JournalEntriesWrapper>
    )
}

export default JournalEntries;