import { useState } from 'react';
import { Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import { isAuth, key, showAlert } from '../../../util';
import { axiosInstance } from '../../../requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, } from '@fortawesome/free-brands-svg-icons';
import { styled } from "../../../stitches.config";

import Text from '../../core/Text';
import Button from '../../core/Button';
import Anchor from '../../core/Anchor';

const CommunityInstagramWrapper = styled('div', {
    'label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '$space-4',
        fontWeight: 'bold',
        fontSize: '$default',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-group-wrapper > span.ant-input-wrapper > span.ant-input-group-addon, .ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-group-wrapper > span.ant-input-wrapper > span.ant-input-affix-wrapper': {
        boxShadow: 'unset !important',
        padding: '$space-3',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-group-wrapper > span.ant-input-wrapper > span.ant-input-group-addon': {
        border: '5px solid $black !important',
        borderRadius: '$default 0px 0px $default',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > span.ant-input-group-wrapper > span.ant-input-wrapper > span.ant-input-affix-wrapper': {
        borderRadius: '0px $default $default 0px',
        borderWidth: '$default $default $default 0px',
        borderStyle: '$default',
        borderColor: '$black',
    },
});

const HeaderWrapper = styled('div', {});

const LinkWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        md: { span: 24 },
        lg: { span: 7, },
        xl: { span: 6, },
    },
    wrapperCol: {
        md: { span: 24, offset: 0, },
        lg: { offset: 1, },
    },
}

const validateMessages = {
    required: '${label} is required.',
    string: {
        range: "${label} must be at least ${min} and maximum of ${max} characters.",
    }
};

export const CommunityInstagram = ({ details, handleDetails }) => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
        setHelp('');
    }

    const handleInstagramChange = instagram => {
        handleDetails({ ...details, instagram_account: instagram });
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
    }

    const onFinish = value => {
        const instagramAccountForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            for (let i in value) {
                console.log('i ', i);
                console.log('val ', value[i]);
                value[i] && instagramAccountForm.append(i, value[i]);
            }

            instagramAccountForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/update-instagram-account", instagramAccountForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleInstagramChange(response.data.data.details.instagram_account);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: "Community's Instagram account updated.",
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
                console.log('err ', err.response ? err.response.data.errors : err);
                if (err.response && err.response.data.errors) {
                    setHelp(<Text type="span" color="red">{err.response.data.errors.instagram_account && err.response.data.errors.instagram_account[0]}</Text>);
                }
            });
        } else {
            console.log('on camp ig: no cookies');
        }
    }

    return (
        <CommunityInstagramWrapper>
            <HeaderWrapper className="d-flex flex-row flex-sm-column flex-md-row justify-content-between align-items-center align-items-sm-stretch align-items-md-center">
                <LinkWrapper className="d-flex flex-wrap align-items-center" css={{ height: '100%', }}>
                    <Text type="span" className="d-flex justify-content-center" css={{ display: 'inline-block', width: '40px', }}>
                        <FontAwesomeIcon icon={faInstagram} className="fa-xl" />
                    </Text>
                    <Anchor
                    target="_self"
                    text="Instagram account"
                    href={(details && details.instagram_account) && details.instagram_account} />
                </LinkWrapper>

                <Button
                text={isShown ? 'Cancel' : 'Update'}
                {...isShown && { color: "orange" }}
                className="button-sm flex-grow-0 flex-sm-grow-1 flex-md-grow-0 mt-0 mt-sm-3 mt-md-0"
                color={!(isShown) && 'orange'}
                onClick={() => handleToggleForm(!isShown)} />
            </HeaderWrapper>
        {
                isShown &&
                <Form
                name="instagram-account-form"
                {...formItemLayout}
                onFinish={onFinish}
                form={form}
                className="mt-4 mx-auto"
                validateMessages={validateMessages}
                autoComplete="off">
                    <Form.Item
                    label="New Instagram account"
                    name="instagram_account"
                    {...help && { help: help }}
                    rules={[{
                        required: true,
                        type: 'string',
                        min: 2,
                        max: 100,
                    }]}>
                    <Input addonBefore="@" allowClear />
                </Form.Item>

                <SubmitButtonWrapper className="d-grid gap-2 col-12 col-md-2 col-lg-1 mx-auto mt-3">
                    <Button
                    type="submit"
                    text="Save"
                    color="brown" />
                </SubmitButtonWrapper>
            </Form>
        }
        </CommunityInstagramWrapper>
    )
}

export default CommunityInstagram;