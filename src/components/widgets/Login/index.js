import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form as FormWrapper, Input, } from 'antd';
import { axiosInstance } from '../../../requests';
import Cookies from 'js-cookie'
import { styled } from "../../../stitches.config";

import Button from '../../core/Button';

const LoginWrapper = styled('div', {
    width: '500px',
    'label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '5px',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
    },
});

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: { 
        sm: { span: 20, offset: 1, }
     },
};

const validateMessages = {
    required: '${label} is required.',
    types: {
        email: '${label} is not a valid email.',
    },
};

export const Form = ({ 
    className, 
    css, 
    children,
    isAuth,
    handleLogIn,
    handleLogOut,
}) => {
    const navigate = useNavigate();

    const [emailValidateStatus, setEmailValidateStatus] = useState('');
    const [passwordValidateStatus, setPasswordValidateStatus] = useState('');
    const [emailHelp, setEmailHelp] = useState('');
    const [passwordHelp, setPasswordHelp] = useState('');
    const [emailHasFeedback, setEmailHasFeedback] = useState(false);
    const [passwordHasFeedback, setPasswordHasFeedback] = useState(false);

    const handleRequest = evt => {
        // evt.preventDefault();
    }

    const onFinish = values => {
        console.log('Received values of form: ', values);

        const loginForm = new FormData();

        for (let i in values) {
            loginForm.append(i, values[i]);
        }

        axiosInstance.post(process.env.REACT_APP_BASE_URL + "login", loginForm)

        .then (response => {
            if (response.data.isSuccess) {
                Cookies.set('admin_auth_user', JSON.stringify(response.data.data.details.user), { 
                    expires: .5,
                    secure: true,
                    sameSite: 'strict',
                });

                Cookies.set('admin_user_token', JSON.stringify(response.data.data.details.token), {
                    expires: .5,
                    secure: true,
                    sameSite: 'strict',
                });

                if (Cookies.get('admin_auth_user') && Cookies.get('admin_user_token')) {
                    console.log('valid')

                    setTimeout(() => {
                        handleLogIn();
                        navigate('/dashboard');
                    }, 1000);
                }
            } else {
                console.log('no')
            }
        })

        .catch (err => {
            console.log('err ', err.response ? err.response.data.errors : err);
        });
    };
    
    return (
        <LoginWrapper className="p-3 p-sm-0">
            <FormWrapper
                {...formItemLayout}
                onFinish={onFinish}
                validateMessages={validateMessages}>
                <FormWrapper.Item
                    label="Email address"
                    name="email"
                    hasFeedback={ emailHasFeedback }
                    rules={[{ required: true, type: 'email', }]} >
                    <Input />
                </FormWrapper.Item>

                <FormWrapper.Item
                    label="Password"
                    name="password"
                    hasFeedback={ passwordHasFeedback }
                    rules={[{ required: true, }]} >
                    <Input.Password visibilityToggle />
                </FormWrapper.Item>

                <Button
                type="submit"
                text="Log In"
                className="d-grid gap-2 col-12 col-sm-auto mx-auto button-sm"
                color="brown" />
            </FormWrapper>
        </LoginWrapper>
    )
}

export default Form;