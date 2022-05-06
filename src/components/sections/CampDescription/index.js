import { Form, Input, } from 'antd';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';

const CampDescriptionWrapper = styled('div', {
    'label.ant-form-item-required': {
        fontFamily: '$manjari',
        marginTop: '$space-3',
        fontSize: '$default',
    },
    '.ant-form-item-control-input-content > input, .ant-form-item-control-input-content > textarea, .ant-form-item-control-input-content > span.ant-input-affix-wrapper, .ant-form-item-control-input-content > span.ant-input-affix-wrapper-focused': {
        border: '5px solid $black !important',
        borderRadius: '$default',
        boxShadow: 'unset !important',
        padding: '$space-3',
    },
});

const formItemLayout = {
    labelCol: {
        md: { span: 6, },
        lg: { span: 5, },
    },
    wrapperCol: {
        md: { span: 20, offset: 2, },
        lg: { span: 20, offset: 1, },
    },
}

export const CampDescription = () => {
    const onFinish = values => {
        console.log('genera info values: ', values);
    }

    return (
        <CampDescriptionWrapper className='bg-warning'>
            <Heading type={6} text="Description" />
            <Text type="span">
                Current:
            </Text>
            <Form
                name="general-information-form"
                {...formItemLayout}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="New Camp Name"
                    name="name"
                    className="test"
                    rules={[{ required: true, }]}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" text="Submit" />
                </Form.Item>
            </Form>
        </CampDescriptionWrapper>
    )
}

export default CampDescription;