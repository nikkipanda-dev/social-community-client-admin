import { useState, useEffect } from 'react';
import { Form, Input, } from 'antd';
import { axiosInstance } from '../../../requests';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';

const CampNameFormWrapper = styled('div', {
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

const HeaderWrapper = styled('div', {});

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

export const CampName = () => {
    const [isShown, setIsShown] = useState(false);

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const onFinish = value => {
        console.log('val ', value);

        const campNameForm = new FormData();

        for (let i in value) {
            campNameForm.append(i, value[i]);
        }

        for (let [i, val] of campNameForm.entries()) {
            console.log('i ', i);
            console.log('val ', val);
        }

        // axiosInstance.post('http://localhost:8000/api/community/store', campNameForm)

        // .then (response => {
        //     console.log('res ', response.data);
        // })

        // .catch (err => {
        //     console.log('err ', err.response ? err.response.data.errors : err);
        // });
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
                Current: Camp Name Placeholder
            </Text>
        {
            isShown && 
            <Form
            name="camp-name-form"
            {...formItemLayout}
            onFinish={onFinish}
            className="mt-4"
            style={{ maxWidth: '800px', }}
            validateMessages={validateMessages}
            autoComplete="off">
                <Form.Item
                label="New camp name"
                name="name"
                rules={[{ required: true, type: 'string', min: 2, max: 100, }]}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" text="Submit" />
                </Form.Item>
            </Form>
        }
        </CampNameFormWrapper>
    )
}

export default CampName;