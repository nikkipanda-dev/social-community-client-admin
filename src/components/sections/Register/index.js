import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../requests';
import { Form, Input } from 'antd';
import Cookies from 'js-cookie'
import { styled } from "../../../stitches.config";

import Button from '../../core/Button';

const RegisterWrapper = styled('div', {
    maxWidth: '800px',
    '.ant-row:nth-child(n+2)': {
        marginTop: '$space-2',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
    },
});

const SubmitButtonWrapper = styled('div', {});

const validateMessages = {
    required: '${label} is required.',
    types: {
        email: '${label} is not a valid email.',
    },
    string: {
        range: "${label} must be at least ${min} and maximum of ${max} characters.",
    }
};

const formItemLayout = {
    labelCol: { 
        sm: {span: 4},
    },
    wrapperCol: { 
        sm: {span: 24, offset: 1,},
    },
}

export const Register = ({ 
    className, 
    css,
    handleLogIn,
    handleLogOut,
}) => {
    console.log('param ', window.location.pathname);
    const navigate = useNavigate();

    const onFinish = values => {
        const registerForm = new FormData();

        for (let i in values) {
            registerForm.append(i, values[i]);
        }

        for (let [i, val] of registerForm.entries()) {
            console.log('i ', i);
            console.log('val ', val);
        }

        axiosInstance.post(process.env.REACT_APP_BASE_URL + "register/" + window.location.pathname.slice(10), registerForm)

        .then (response => {
            console.log('res ', response.data);
            if (response.data.isSuccess) {
                Cookies.set('auth_user', JSON.stringify(response.data.data.details.user), {
                    expires: .5,
                    secure: true,
                    sameSite: 'strict',
                });

                Cookies.set('auth_user_token', JSON.stringify(response.data.data.details.token), {
                    expires: .5,
                    secure: true,
                    sameSite: 'strict',
                });

                if (Cookies.get('auth_user') && Cookies.get('auth_user_token')) {
                    console.log('valid')

                    setTimeout(() => {
                        handleLogIn(true);
                        navigate('/dashboard');
                    }, 1000);
                } else {
                    console.log('invalid');
                    handleLogIn(false);
                }
            } else {

            }
        })

        .catch (err => {
            console.log('err ', err.response ? err.response.data.errors : 'err');
        });
    }

    return (
        <RegisterWrapper className={ "bg-light" + (className ? (' ' + className) : '')}>
            <Form
            name="register-form"
            {...formItemLayout}
            initialValues={{ remember: true }}
            validateMessages={validateMessages}
            onFinish={onFinish}
            autoComplete="off">
                <Form.Item
                    label="First name"
                    name="first_name"
                    rules={[{ required: true, type: 'string', min: 2, max: 100 }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[{ required: true, type: 'string', min: 2, max: 100 }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, type: 'string', min: 2, max: 100 }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="Email address"
                    name="email"
                    rules={[{ required: true, type: 'email', }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, type: 'string', min: 8, max: 20 }]}>
                    <Input.Password visibilityToggle allowClear />
                </Form.Item>

                <Form.Item
                    label="Repeat password"
                    name="password_confirmation"
                    rules={[
                        { required: true, },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),]}>
                    <Input.Password visibilityToggle allowClear />
                </Form.Item>

                <SubmitButtonWrapper className="d-grid gap-2 col-12 col-sm-2 mx-auto">
                    <Button 
                    type="submit" 
                    className="mt-3"
                    text="Register"
                    color="brown" />
                </SubmitButtonWrapper>
            </Form>
        </RegisterWrapper>
    )
}