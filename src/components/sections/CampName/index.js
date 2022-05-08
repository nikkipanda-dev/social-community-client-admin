import { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { isAuth } from '../../../util';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';

const CampNameFormWrapper = styled('div', {
    'label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '35px',
        fontWeight: 'bold',
        fontSize: '$default',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > textarea, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
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
        sm: { span:24 },
        md: { span: 7, },
        lg: { span: 6, },
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

const key = 'updatable';

const showAlert = () => {
    message.loading({
        content: 'Loading...', 
        key, 
        style: {
            marginTop: '10vh',
            zIndex: '999999',
    },});
};

export const CampName = ({ details, handleDetails }) => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const handleNameChange = name => {
        handleDetails({...details, name: name});
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
    }

    const onFinish = value => {
        const campNameForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            for (let i in value) {
                value[i] && campNameForm.append(i, value[i]);
            }

            campNameForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

            axiosInstance.post('http://localhost:8000/api/community/' + ((details && details.name) ? 'update-name' : 'store-name'), campNameForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then (response => {
                if (response.data.isSuccess) {
                    handleNameChange(response.data.data.details);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: 'Community name updated.', 
                            key, 
                            duration: 2, 
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999',
                            }});
                    }, 1000);
                } else {
                    console.log('err response ', response.data.data.errorText);
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

            .catch (err => {
                if (err.response && err.response.data.errors) {
                    setHelp(<Text type="span" color="red">{ err.response.data.errors.name[0] }</Text>);
                }
            });
        } else {
            console.log('on camp name: no cookies');
        }
    }

    return (
        <CampNameFormWrapper className='bg-warning '>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Name" />
                <Button
                text={isShown ? 'Cancel' : 'Update'}
                {...isShown && {color: "orange"}}
                className="button-sm" 
                color={!(isShown) && 'orange'}
                onClick={() => handleToggleForm(!isShown) }/>
            </HeaderWrapper>
            <Text 
            type="span" 
            className="" 
            css={{ display: 'inline-block', }}>
                Current: {(details && details.name) && details.name}
            </Text>
        {
            isShown && 
            <Form
            name="camp-name-form"
            {...formItemLayout}
            onFinish={onFinish}
            form={form}
            className="mt-4"
            style={{ maxWidth: '1000px', }}
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
                    type="primary" 
                    text="Save"
                    color="brown" />
                </SubmitButtonWrapper>
            </Form>
        }
        </CampNameFormWrapper>
    )
}

export default CampName;