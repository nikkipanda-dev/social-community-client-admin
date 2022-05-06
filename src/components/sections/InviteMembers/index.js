import { isAuth } from '../../../util';
import { axiosInstance } from '../../../requests';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, Input } from 'antd';
import { styled } from "../../../stitches.config";

import Text from "../../core/Text";
import Button from '../../core/Button';

const InviteMembersWrapper = styled('div', {
    'svg:hover': {
        cursor: 'pointer',
    }
});

const InvitationFormWrapper = styled('div', {
    maxWidth: '800px',
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
    },
});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
        md: { span: 4 },
    },
    wrapperCol: {
        sm: { span: 24 },
        md: { span: 20, offset: 1, },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        sm: { span: 24,},
        md: { span: 24, offset: 5 },
    },
};

export const InviteMembers = () => {
    const onFinish = values => {
        console.log('val ', values.emails);

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

            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.post('http://localhost:8000/api/invite', inviteForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                console.log('res', response.data);
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
            <Text type="span">Generate member invitation links.</Text>
            <InvitationFormWrapper className="mx-auto">
                <Form
                name="invite-members-form"
                {...formItemLayoutWithOutLabel}
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
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Email address' : ''}
                                        required={false}
                                        className="mt-2"
                                        key={field.key}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[{
                                                required: true,
                                                whitespace: true,
                                                message: "Please input an email address or remove this field.",
                                            }]}
                                            noStyle>
                                            <Input placeholder="Email address" style={{ width: '80%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ?
                                            (
                                                <FontAwesomeIcon
                                                icon={faCircleMinus}
                                                className="ms-2 fa-2xl"
                                                style={{ color: '#F95F5F' }}
                                                onClick={() => remove(field.name)} />
                                            ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item className="mt-5">
                                    <Button onClick={() => add()} text={<><FontAwesomeIcon icon={faPlus} /> Add</>} />
                                </Form.Item>
                                <Form.Item>
                                    <SubmitButtonWrapper className='d-grid col-12 col-sm-6 col-md-5 mx-auto'>
                                        <Button
                                        type="submit"
                                        text={"Send " + (fields.length > 1 ? 'invitations' : 'invitation')}
                                        color="brown" />
                                    </SubmitButtonWrapper>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </InvitationFormWrapper>
        </InviteMembersWrapper>
    )
}

export default InviteMembers;