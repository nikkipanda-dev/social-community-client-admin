import { useState, useEffect } from 'react';
import { isAuth } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { Form, Input, message } from 'antd';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';

const CampDescriptionFormWrapper = styled('div', {
    'label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '35px',
        fontWeight: 'bold',
        fontSize: '$default',
    },
    '.ant-form-item-control-input-content > div.ant-input-textarea > span.ant-input-affix-wrapper > textarea': {
        borderRadius: '$small',
        padding: '$space-3',
        border: 'unset',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > div.ant-input-textarea > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
        padding: '$space-3',
    },
});

const HeaderWrapper = styled('div', {});

const DescriptionWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
        md: { span: 7, },
        lg: { span: 6, },
        xl: { span: 5, },
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
        },
    });
};

export const CampDescription = ({ 
    details, 
    handleDetails,
    className,
}) => {
    console.log('details desc ', details.description);

    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const handleDescriptionChange = description => {
        handleDetails({ ...details, description: description });
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
    }

    const onFinish = value => {
        const campDescForm = new FormData();

        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            for (let i in value) {
                value[i] && campDescForm.append(i, value[i]);
            }

            campDescForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/" + ((details && details.description) ? 'update-description' : 'store-description'), campDescForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleDescriptionChange(response.data.data.details);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: 'Community description updated.',
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
                    setHelp(<Text type="span" color="red">{err.response.data.errors.description[0]}</Text>);
                }
            });
        } else {
            console.log('on camp description: no cookies');
        }
    }

    return (
        <CampDescriptionFormWrapper className={ 'bg-warning' + (className ? (' ' + className) : '') }>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Description" />
                <Button
                    text={isShown ? 'Cancel' : 'Update'}
                    {...isShown && { color: "orange" }}
                    className="button-sm"
                    color={!(isShown) && 'orange'}
                    onClick={() => handleToggleForm(!isShown)} />       
            </HeaderWrapper>
            <DescriptionWrapper>
                <Text type="span">
                    Current:
                </Text>
                <Text type="paragraph">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae deserunt nesciunt, corporis incidunt quae ipsum, blanditiis ea itaque veritatis commodi aspernatur voluptatum odit quis placeat eum eveniet voluptatem rem atque. Nostrum accusantium provident, magni officia fugit quibusdam. Enim ut eligendi eos aliquam corporis? Quod porro nam distinctio, voluptatem molestias nostrum vel deleniti a sapiente? Recusandae in deserunt molestias vitae consequuntur, laudantium optio rem voluptas architecto, quia suscipit mollitia, quisquam fugit impedit officiis quos eos dolor? Quibusdam possimus tempore sapiente impedit magni iure, incidunt fuga laudantium. Illo, reiciendis autem officia eaque, aperiam, temporibus libero mollitia nostrum eum beatae deserunt! Dolorem, atque.
                </Text>
            </DescriptionWrapper>
        {
            isShown && 
            <Form
            name="camp-description-form"
            {...formItemLayout}
            className="mt-4"
            style={{ maxWidth: '1000px', }}
            validateMessages={validateMessages}
            onFinish={onFinish}
            autoComplete="off">
                <Form.Item
                label="New description"
                name="description"
                {...help && { help: help }}
                rules={[{ 
                    required: true, 
                    type: 'string', 
                    min: 2, 
                    max: 10000,
                }]}>
                    <Input.TextArea 
                    allowClear 
                    maxLength={10000} 
                    rows={5}
                    showCount />
                </Form.Item>

                <SubmitButtonWrapper className="d-grid gap-2 col-12 col-md-2 col-lg-1 mx-auto">
                    <Button 
                    type="submit" 
                    text="Save"
                    color="brown" />
                </SubmitButtonWrapper>
            </Form>
        }
        </CampDescriptionFormWrapper>
    )
}

export default CampDescription;