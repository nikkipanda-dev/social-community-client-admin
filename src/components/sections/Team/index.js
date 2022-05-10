import { useState, } from 'react';
import { Form, Input, Mentions, message } from 'antd';
import { isAuth, key, showAlert } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleMinus, 
    faPlus, 
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Alert from '../../core/Alert';
import Text from '../../core/Text';
import TeamMembers from '../../widgets/TeamMembers';
import Modal from '../../widgets/Modal';
import Image from '../../core/Image';

const { Option } = Mentions;

const TeamWrapper = styled('div', {
    'svg:hover': {
        cursor: 'pointer',
    },
    'div.ant-form-item-label > label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '$space-4',
        fontWeight: 'bold',
        fontSize: '$default',
    },
    'div.ant-form-item-control-input-content > input, div.ant-form-item-control-input-content > div.ant-mentions, div.ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
        background: '$white',
    },
    'div.ant-form-item-control-input-content > div.ant-mentions, div.ant-form-item-control-input-content > div.ant-mentions-focused': {
        border: 'unset',
        boxShadow: 'unset',
    },
    'div.ant-form-item-control-input-content > input, div.ant-form-item-control-input-content > span.ant-input-affix-wrapper, div.ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        padding: '$space-3',
    },
    'div.ant-form-item-control-input-content > div.ant-mentions': {
        padding: '$space-2',
    },
    'div.ant-form-item-control-input-content > div.ant-mentions > div.ant-mentions-measure': {
        marginTop: '$space-3',
    },
    '@media screen and (max-width: 767px)': {
        'div.ant-form-item-label > label.ant-form-item-required': {
            marginTop: 'auto',
        },
    },
});

const TeamMembersWrapper = styled('div', {});

const HeaderWrapper = styled('div', {});

const DynamicFieldsWrapper = styled('div', {
    background: '$lightGray',
});

const FieldsWrapper = styled('div', {
    // '> div:nth-child(n+2)': {
    //     marginTop: '$space-4',
    // }
});

const RemoveButtonWrapper = styled('div', {});

const AddFieldButtonWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const validateMessages = {
    required: "${label} is required.",
    string: {
        range: "${label} must be at least ${min} and maximum of ${max} characters.",
    },
}

export const Team = ({ 
    team, 
    handleTeam,
    isVisible,
    setIsVisible,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [IdRemove, setIdRemove] = useState('');
    const [usernameRemove, setUsernameRemove] = useState('');
    const [users, setUsers] = useState('');
    const [status, setStatus] = useState('');
    const [help, setHelp] = useState('');

    const handleUsers = users => setUsers(users);

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const handleTeamChange = team => {
        handleTeam({ ...team });
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
        onCancel();
    }

    const confirmRemoval = evt => {
        const el = evt.target;
        let id = null;
        let username = null;

        if (el.tagName === "path") {
            id = el.parentElement.parentElement.parentElement.dataset.targetId;
            username = el.parentElement.parentElement.parentElement.dataset.targetUsername;
        } else if (el.tagName === 'svg') {
            id = el.parentElement.parentElement.dataset.targetId;
            username = el.parentElement.parentElement.dataset.targetUsername;
        }

        setIdRemove(id);
        setUsernameRemove(username);

        setIsVisible();
    }

    const handleRemoveMember = () => {
        const removeMemberForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            removeMemberForm.append('auth_username', JSON.parse(Cookies.get('auth_user')).username);
            removeMemberForm.append('username', usernameRemove);
            removeMemberForm.append('id', IdRemove);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/remove-team-member", removeMemberForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleTeamChange(response.data.data.details);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: 'Team members updated.',
                            key,
                            duration: 2,
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999999',
                            }
                        });
                    }, 1000);
                } else {
                    setHelp(response.data.data.errorText);
                }
            })

            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setHelp(<Text type="span" color="red">{err.response.data.errors.name[0]}</Text>);
                }
            });
        } else {
            console.log('on remove team member: no cookies');
        }
    }

    const onChange = value => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + "search-user", {
                params: {
                    "username": value.slice(1),
                },
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleUsers(response.data.data.details);
                    setStatus('');
                } else {
                    setStatus(response.data.data.errorText);
                }
            })

            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setStatus("Something went wrong. Please try again in a few seconds.");
                }
            });
        }
    }

    const onFinish = values => {
        if (!(values.team)) {
            setHelp("Title and username fields cannot be empty.");
            setStatus('warning');
            return;
        }

        setHelp('');

        const teamForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            let team_members = [];
            for (let i in values.team) {
                team_members.push(values.team[i]);
            }

            teamForm.append('team_members[]', JSON.stringify(team_members));
            teamForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/store-team", teamForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then (response => {
                if (response.data.isSuccess) {
                    handleTeamChange(response.data.data.details);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: 'Team members updated.',
                            key,
                            duration: 2,
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999999',
                            }
                        });
                    }, 1000);
                } else {
                    setHelp(response.data.data.errorText);
                }
            })

            .catch (err => {
                if (err.response && err.response.data.errors) {
                    console.log(err.response.data.errors);
                }
            });
        } else {
            console.log('on team: no cookies');
        }
    }

    return (
        <TeamWrapper>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Members" />
                <Button
                text={isShown ? 'Cancel' : 'Update'}
                {...isShown && { color: "orange" }}
                className="button-sm"
                color={!(isShown) && 'orange'}
                onClick={() => handleToggleForm(!isShown)} />
            </HeaderWrapper>
            <TeamMembersWrapper className="d-flex flex-column">
            {
                team ? <TeamMembers 
                members={team} 
                className="mt-3"
                action={isShown ? 
                    <Text 
                    type="span" 
                    css={{ display: 'inline-block', color: '$orangeRedCrayola', }}>
                    <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    className="fa-2xl" 
                    onClick={evt => confirmRemoval(evt)} />
                    </Text> : ''} /> 
                : 'No team yet.'
            }
            </TeamMembersWrapper>
        {
            (help && status) &&
            <Alert status={status} header="Header" className="mt-5">
                {help}
            </Alert>
        }
        {
            isShown && 
            <Form
            name="team-form"
            form={form}
            validateMessages={validateMessages}
            onFinish={onFinish}
            { ...team && { style: { marginTop: '60px', }}}
            autoComplete="off">
                <Form.List name="team">
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <DynamicFieldsWrapper key={key} className="d-flex flex-column flex-lg-row-reverse mb-3 p-2">
                                <RemoveButtonWrapper className="d-flex justify-content-end p-2">
                                    <FontAwesomeIcon
                                    icon={faCircleMinus}
                                    className="mb-3 fa-2xl"
                                    style={{ color: '#F95F5F' }}
                                    onClick={() => remove(name)} />
                                </RemoveButtonWrapper>
                                <FieldsWrapper className="flex-grow-1 d-flex flex-column flex-lg-row">
                                    <Form.Item
                                    {...restField}
                                    label="Title"
                                    name={[name, "title"]}
                                    labelCol={{ span: 24, lg: { span: 5, }, xl: { span: 4, }, }}
                                    wrapperCol={{ lg: { span: 24, }}}
                                    style={{ width: '100%', }}
                                    rules={[{ required: true, type: 'string', }]}>
                                        <Input allowClear />
                                    </Form.Item>
                                    <Form.Item
                                    {...restField}
                                    label="Username"
                                    name={[name, "username"]}
                                    labelCol={{ span: 24, lg: { span: 7, }, xl: { span: 6, }, }}
                                    wrapperCol={{ lg: { span: 24, offset: 1, }, xl: { offset: 0, }, }}
                                    style={{ width: '100%', }}
                                    className="ms-lg-5"
                                    rules={[{ required: true, type: 'string', }]}>
                                        <Mentions
                                        style={{ width: '100%' }}
                                        onChange={evt => onChange(evt)}>
                                        {
                                            (users && Object.keys(users).length > 0) &&
                                            Object.keys(users).map((i, val) => {
                                                return (
                                                    <Option
                                                    key={'option-' + restField.fieldKey + '-' + i}
                                                    value={Object.values(users)[val].username}>
                                                        <Image 
                                                        src="/avatar_medium.png" 
                                                        alt="Placeholder avatar"
                                                        css={{ 
                                                            width: '100%',
                                                            maxWidth: '30px',
                                                            height: 'auto',
                                                        }} />
                                                        <Text type="span" className="ms-2">@{Object.values(users)[val].username}</Text>
                                                    </Option>
                                                )
                                            })
                                        }
                                        </Mentions>
                                    </Form.Item>
                                </FieldsWrapper>
                            </DynamicFieldsWrapper>
                        ))}
                        <AddFieldButtonWrapper className="d-grid col-12 col-md-3 col-lg-2 mt-3">
                            <Button
                            type="button"
                            text={<><FontAwesomeIcon
                            icon={faPlus}
                            className="me-2" />Add</>}
                            onClick={() => add()} />
                        </AddFieldButtonWrapper>
                    {
                        (fields.length > 0) && 
                        <SubmitButtonWrapper className="d-grid col-12 col-md-1 mx-auto mt-3">
                            <Button
                            type="submit"
                            text="Submit"
                            color="brown" />
                        </SubmitButtonWrapper>
                    }
                    </>
                    )}
                </Form.List>
            </Form>
        }
            <Modal
            isVisible={isVisible}
            closable={true}
            maskClosable={true}
            wrapClassName="bg-warning"
            title="Confirmation"
            onCancel={onCancel}>
                <Alert status="warning" header="Remove user?" />
                <SubmitButtonWrapper className="d-flex justify-content-end mt-3">
                    <Button
                    type="button"
                    color="red"
                    className="flex-grow-1 flex-sm-grow-0"
                    text="Remove"
                    onClick={() => handleRemoveMember()} />
                </SubmitButtonWrapper>
            </Modal>
        </TeamWrapper>
    )
}

export default Team;