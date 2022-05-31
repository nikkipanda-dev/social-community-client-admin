import { useState } from 'react';
import { isAuth, key, showAlert, } from '../../../util';
import { axiosInstance } from '../../../requests';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, message, } from 'antd';
import { styled } from "../../../stitches.config";

import Text from "../../core/Text";
import Button from '../../core/Button';

const InviteMembersWrapper = styled('div', {
    'svg:hover': {
        cursor: 'pointer',
    }
});

const InvitationFormWrapper = styled('div', {
    // maxWidth: '800px',
    'div.ant-form-item-label > label': {
        fontFamily: '$manjari',
        marginTop: '$space-4',
        fontWeight: 'bold',
        fontSize: '$default',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
        padding: '$space-3',
    },
});

const HeaderWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
        md: { span: 5, },
        lg: { span: 4, },
    },
    wrapperCol: {
        sm: { span: 24 },
        md: { span: 20, offset: 2, },
        lg: { span: 20, offset: 1, },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        md: { span: 24, offset: 7, },
        lg: { span: 20, offset: 5, },
    },
};

export const InviteMembers = () => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const handleResetForm = () => {
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
    }

    const onFinish = values => {
        const inviteForm = new FormData();

        let ctr = 0;
        
        for (let i in values.emails) {
            console.log('i ', values.emails[i]);
            inviteForm.append(`emails.list[${ctr}]`, values.emails[i]);
            ctr++
        }

        for (let [i, val] of inviteForm.entries()) {
            console.log('i ', i);
            console.log('val ', val);
        }

        if (isAuth()) {
            console.log('on invite: auth');

            message.loading({
                content: "Sending invitations...",
                duration: 5,
                style: {
                    marginTop: '10vh',
                    zIndex: '999999',
                }
            });

            const authToken = JSON.parse(Cookies.get('admin_user_token'));

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "invite", inviteForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleResetForm();
                    message.destroy();
                    message.success({
                        content: response.data.data.details,
                        key,
                        duration: 2,
                        style: {
                            marginTop: '10vh',
                            zIndex: '999999',
                        }
                    })
                } else {
                    message.info({
                        content: response.data.data.errorText,
                        key,
                        duration: 2,
                        style: {
                            marginTop: '10vh',
                            zIndex: '999999',
                        }
                    });
                }
            })

            .catch(err => {
                console.log('err ', err.response ? err.response.data.errors : err);
            });
        } else {
            console.log('on invite: no cookies');
        }
    }

    return (
        <InviteMembersWrapper>
            <HeaderWrapper className="d-flex flex-wrap justify-content-end align-items-center">
                <Button
                text={isShown ? 'Cancel' : 'Invite'}
                {...isShown && { color: "orange" }}
                className="button-md"
                color={!(isShown) && 'brown'}
                onClick={() => handleToggleForm(!isShown)} />
            </HeaderWrapper>
            <InvitationFormWrapper className="mx-auto">
            {
                isShown && 
                <Form
                name="invite-members-form"
                {...formItemLayoutWithOutLabel}
                form={form}
                onFinish={onFinish}>
                    <Form.List
                    name="emails"
                    // rules={[
                    //     {
                    //         validator: async (_, email) => {
                    //             if (!email || email.length < 1) {
                    //                 return Promise.reject(new Error('At least 2 passengers'));
                    //             }
                    //         },
                    //     }]}
                    >
                    {(fields, { add, remove }) => (
                    <>
                        {
                            fields.map((field, index) => (
                            <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Email address' : ''}
                            required={false}
                            className="mb-3"
                            key={field.key}>
                                <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[{
                                    required: true,
                                    type: 'email',
                                    message: "Please input a valid email address or remove this field.",
                                }]}
                                noStyle>
                                    <Input placeholder="Email address" style={{ width: '80%' }} />
                                </Form.Item>
                                {(fields.length > 0) ?
                                (
                                    <FontAwesomeIcon
                                    icon={faCircleMinus}
                                    className="ms-2 fa-2xl"
                                    style={{ color: '#F95F5F' }}
                                    onClick={() => remove(field.name)} />
                                ) : null}
                            </Form.Item>
                        ))}
                        {
                            fields.length > 0 ? 
                            <Form.Item className="mt-3">
                                <SubmitButtonWrapper className="d-grid col-12 col-md-3 col-lg-2">
                                    <Button
                                    type="button"
                                    onClick={() => add()}
                                    text={<><FontAwesomeIcon icon={faPlus} /> Add</>} />
                                </SubmitButtonWrapper>
                            </Form.Item> : 
                            <SubmitButtonWrapper className="d-grid col-12 col-md-5 col-lg-4 mt-3">
                                <Button
                                type="button"
                                onClick={() => add()}
                                text={<><FontAwesomeIcon icon={faPlus} /> Add email address</>} />
                            </SubmitButtonWrapper>
                        }
                        {
                            (fields.length > 0) &&
                            <SubmitButtonWrapper className="d-grid col-12 col-md-4 col-lg-3 mx-auto">
                                <Button
                                type="submit"
                                text={"Send " + (fields.length > 1 ? 'invitations' : 'invitation')}
                                color="brown" />
                            </SubmitButtonWrapper>
                        }
                    </>
                    )}
                    </Form.List>
                </Form>
            }
            </InvitationFormWrapper>
        </InviteMembersWrapper>
    )
}

export default InviteMembers;