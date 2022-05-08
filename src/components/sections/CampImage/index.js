import { useState, useEffect } from 'react';
import { isAuth } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Upload, message } from 'antd';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';

const CampImageFormWrapper = styled('div', {});

const HeaderWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

const formItemLayout = {
    labelCol: {
        sm: { span: 24 },
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
        },
    });
};

const fileList = [];

export const CampImage = ({ 
    className, 
    details, 
    handleDetails
}) => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const handleImageChange = image_path => {
        handleDetails({ ...details, image_path: image_path });
        form.resetFields();
        setHelp('');
        handleToggleForm(!isShown);
    }

    const onFinish = value => {
        console.log('val ', value);

        for (let i in value) {
            console.log('i ', i);
            console.log('val ', value[i]);
        }

        const campImageForm = new FormData();

        // if (isAuth()) {

        // } else {

        // }
    }

    const beforeUpload = file => {
        console.log(file.type);
        const isPNG = file.type === 'image/png';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG;
    }

    const test = info => {
        console.log('inf', info.fileList);
    }

    return (
        <CampImageFormWrapper className={ '' + (className ? (' ' + className) : '') }>
            Image
        </CampImageFormWrapper>
    )
}

export default CampImage;