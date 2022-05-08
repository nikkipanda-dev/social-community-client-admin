import { useState, useEffect, useRef, } from 'react';
import { isAuth } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { message } from 'antd';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';
import Image from '../../core/Image';
import Input from '../../core/Input';

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

export const CampImage = ({ 
    className, 
    details, 
    handleDetails,
    forceRender,
    setForceRender,
}) => {
    const ref = useRef('');
    const [isShown, setIsShown] = useState(false);
    const [images, setImages] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [help, setHelp] = useState('');

    const setPreview = evt => {
        if (!evt.target.files || evt.target.files.length === 0) {
            setImages('');
            return;
        } else {
            setImages(evt.target.files);
        }

        setForceRender(!forceRender);
    }

    const handleSubmit = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            if (images && Object.keys(images).length > 0) {
                console.log('image count ', Object.keys(images).length);
                console.log(images[0]);
                const imageForm = new FormData();
                imageForm.append('image', images[0]);
                campNameForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

                axiosInstance.post(process.env.REACT_APP_BASE_URL + "community/store-image", imageForm, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                })

                .then (response => {
                    console.log('res ', response.data);
                })

                .catch (err => {
                    console.log('err ', err.response ? err.response.data.errors : err);
                });
            } else {
                console.log('no image uploaded');
            }
        } else {
            console.log('on camp image: no image');
        }
    }

    useEffect(() => {
        let loading = true;
        let array = [];

        if (loading) {
            if (images.length > 0) {
                let ctr = 0;

                for (let i of images) {
                    array.push({id: ++ctr,src: URL.createObjectURL(i)});
                    setImageUrls(array);
                }
            }
        }

        return () => {
            if (imageUrls && Object.keys(imageUrls).length > 0) {
                // revoke each object url
                Object.keys(imageUrls).map((i, val) => {
                    URL.revokeObjectURL(Object.values(imageUrls)[val].src);
                });
            }

            loading = false;
        }
    }, [forceRender]);

    return (
        <CampImageFormWrapper className={ '' + (className ? (' ' + className) : '') }>
            <label htmlFor="image">Upload</label>
            <Input 
            type="file" 
            ref={ref}
            accept='.jpg,.png,.jpeg' 
            name="image" 
            id="image"
            hidden
            onChange={evt => setPreview(evt)} />
        {
            (imageUrls && Object.keys(imageUrls).length > 0) ?
            Object.keys(imageUrls).map((i, val) => {
                return <Image key={Object.values(imageUrls)[val].id} src={Object.values(imageUrls)[val].src} />
            }) : ' No image uploaded'
        }
        <Button 
        type="button" 
        text="Submit"
        onClick={() => handleSubmit()} />
        </CampImageFormWrapper>
    )
}

export default CampImage;