import { Form, Input, } from 'antd';
import { styled } from '../../../stitches.config';

import Heading from '../../core/Heading';
import Button from '../../core/Button';

const SocialNetworkAccountsWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
}

export const SocialNetworkAccounts = () => {
    const onFinish = values => {
        console.log('genera info values: ', values);
    }

    return (
        <SocialNetworkAccountsWrapper>
            <Heading type={5} text="Social Network Accounts" />
            <Form
            name="general-information-form"
            {...formItemLayout}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" text="Submit" />
                </Form.Item>
            </Form>
        </SocialNetworkAccountsWrapper>
    )
}

export default SocialNetworkAccounts;