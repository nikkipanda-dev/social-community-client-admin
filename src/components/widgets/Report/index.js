import { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { isAuth, key, showAlert } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { styled } from "../../../stitches.config";

import Button from '../../core/Button';

const ReportWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
        md: { span: 7, },
        lg: { span: 5, },
        xl: { span: 4, },
    },
    wrapperCol: {
        md: { span: 24, offset: 1, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    string: {
        range: "${label} must be at least ${min} and maximum of ${max} characters.",
    }
};

export const Report = () => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const onFinish = value => {
        const campNameForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            for (let i in value) {
                value[i] && campNameForm.append(i, value[i]);
            }

            campNameForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

            // axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/update-name", campNameForm, {
            //     headers: {
            //         Authorization: `Bearer ${authToken}`,
            //     }
            // })

            // .then(response => {
            //     if (response.data.isSuccess) {
            //         handleNameChange(response.data.data.details);
            //         showAlert();
            //         setTimeout(() => {
            //             message.success({
            //                 content: 'Community name updated.',
            //                 key,
            //                 duration: 2,
            //                 style: {
            //                     marginTop: '10vh',
            //                     zIndex: '999999',
            //                 }
            //             });
            //         }, 1000);
            //     } else {
            //         showAlert();
            //         setTimeout(() => {
            //             message.info({
            //                 content: response.data.data.errorText,
            //                 key,
            //                 duration: 2,
            //                 style: {
            //                     marginTop: '10vh',
            //                     zIndex: '999999',
            //                 }
            //             });
            //         }, 1000);
            //     }
            // })

            // .catch(err => {
            //     if (err.response && err.response.data.errors) {
            //         setHelp(<Text type="span" color="red">{err.response.data.errors.name[0]}</Text>);
            //     }
            // });
        } else {
            console.log('on camp name: no cookies');
        }
    }

    return (
        <ReportWrapper>
            <Form
                name="camp-name-form"
                {...formItemLayout}
                onFinish={onFinish}
                form={form}
                className="mt-4 mx-auto"
                validateMessages={validateMessages}
                autoComplete="off">
                <Form.Item
                    label="New camp name"
                    name="name"
                    {...help && { help: help }}
                    rules={[{
                        required: true,
                        type: 'string',
                        min: 2,
                        max: 100,
                    }]}>
                    <Input allowClear />
                </Form.Item>

                <SubmitButtonWrapper className="d-grid gap-2 col-12 col-md-2 col-lg-1 mx-auto">
                    <Button
                        type="submit"
                        text="Save"
                        color="brown" />
                </SubmitButtonWrapper>
            </Form>
        </ReportWrapper>
    )
}

export default Report;