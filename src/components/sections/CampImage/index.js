import { useState, useEffect, useRef, } from 'react';
import { isAuth, key, showAlert } from '../../../util';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../../requests';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, } from '@fortawesome/free-solid-svg-icons';
import { styled } from "../../../stitches.config";

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';
import Image from '../../core/Image';
import Input from '../../core/Input';

const CampImageFormWrapper = styled('div', {});

const LabelWrapper = styled('label', {
    background: '$lightGray',
    padding: '$space-3',
    height: '150px',
    width: '150px',
    border: '2px dashed #e1e1e1',
    borderRadius: '$default',
    marginTop: '$space-3',
});

const LabelContentWrapper = styled('div', {});

const PreviewWrapper = styled('div', {});

const HeaderWrapper = styled('div', {});

const SubmitButtonWrapper = styled('div', {});

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

    const revokeObjectUrls = () => {
        if (imageUrls && Object.keys(imageUrls).length > 0) {
            console.log('yes');
            // revoke each object url
            Object.keys(imageUrls).map((i, val) => {
                URL.revokeObjectURL(Object.values(imageUrls)[val].src);
            });
        }
    }

    const handleToggleForm = isShown => {
        setIsShown(isShown);
        revokeObjectUrls();
        setImageUrls('');
    }

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
                imageForm.append('username', JSON.parse(Cookies.get('auth_user')).username);

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
            revokeObjectUrls();
            loading = false;
        }
    }, [forceRender]);

    return (
        <CampImageFormWrapper className={ 'd-flex flex-column' + (className ? (' ' + className) : '') }>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Image" />
                <Button
                text={isShown ? 'Cancel' : 'Update'}
                {...isShown && { color: "orange" }}
                className="button-sm"
                color={!(isShown) && 'orange'}
                onClick={() => handleToggleForm(!isShown)} />
            </HeaderWrapper>
            <Text
            type="span"
            css={{ display: 'inline-block', }}>
            Current: {(details && details.image_path) ? details.image_path : <Text type="span" color="darkGray">n/a</Text>}
            </Text>
            {
                isShown && 
                <>
                    <LabelWrapper htmlFor="image" className="d-flex justify-content-center align-items-center">
                        <LabelContentWrapper className="d-flex flex-column">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ color: '#666666', }}/>
                            <Text type="span" size="medium" className="mt-3">Upload</Text>
                        </LabelContentWrapper>
                    </LabelWrapper>
                    <Input
                    type="file"
                    ref={ref}
                    accept='.jpg,.png,.jpeg'
                    name="image"
                    id="image"
                    hidden
                    onChange={evt => setPreview(evt)} />
                    <PreviewWrapper className="d-flex flex-column mt-5">
                    {
                        (imageUrls && Object.keys(imageUrls).length > 0) &&
                        <Text type="span" size="medium">Preview:</Text>
                    }
                    {
                        (imageUrls && Object.keys(imageUrls).length > 0) ?
                            Object.keys(imageUrls).map((_, val) => {
                                return <Image
                                    key={Object.values(imageUrls)[val].id}
                                    className="mx-auto mt-3"
                                    size="small"
                                    src={Object.values(imageUrls)[val].src} />
                            }) : ' '
                    }
                    </PreviewWrapper>
                    {
                        (imageUrls && Object.keys(imageUrls).length > 0) &&
                        <SubmitButtonWrapper className="d-grid gap-2 col-12 col-md-2 col-lg-1 mx-auto mt-3">
                            <Button
                                type="button"
                                text="Submit"
                                color="brown"
                                onClick={() => handleSubmit()} />
                        </SubmitButtonWrapper>
                    }
                </>
            }
        </CampImageFormWrapper>
    )
}

export default CampImage;