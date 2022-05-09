import { useState } from 'react';
import { Form, Input, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleMinus,
    faPlus,
    faCircleXmark,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { styled } from '../../../stitches.config';

import Heading from '../../core/Heading';
import Button from '../../core/Button';
import Text from '../../core/Text';
import CommunityWebsite from '../../widgets/CommunityWebsite';
import CommunityFacebook from '../../widgets/CommunityFacebook';
import CommunityInstagram from '../../widgets/CommunityInstagram';
import CommunityTwitter from '../../widgets/CommunityTwitter';

const SocialNetworkAccountsWrapper = styled('div', {
    '> div:nth-child(n+2)': {
        marginTop: '$space-4',
    },
});

const HeaderWrapper = styled('div', {});

const WebsiteWrapper = styled('div', {});

const FacebookWrapper = styled('div', {});

const InstagramWrapper = styled('div', {});

const TwitterWrapper = styled('div', {});

export const SocialNetworkAccounts = () => {
    const [form] = Form.useForm();
    const [isShown, setIsShown] = useState(false);
    const [help, setHelp] = useState('');

    const handleToggleForm = isShown => {
        setIsShown(isShown);
    }

    const onFinish = values => {
        console.log('social values: ', values);

        for (let i in values) {
            console.log('i ', i);
            console.log('val ', values[i]);
        }
    }

    return (
        <SocialNetworkAccountsWrapper>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Social Network Accounts" />
            </HeaderWrapper>
            <WebsiteWrapper className="d-flex flex-column">
                <Text type="span" size="medium">Website</Text>
                <Text
                type="span"
                css={{ display: 'inline-block', }}>
                    Current: Website
                </Text>
                <CommunityWebsite />
            </WebsiteWrapper>
            <FacebookWrapper>
                <Text
                type="span"
                className=""
                css={{ display: 'inline-block', }}>
                    Current: Facebook
                </Text>
                <CommunityFacebook />
            </FacebookWrapper>
            <InstagramWrapper>
                <Text
                type="span"
                className=""
                css={{ display: 'inline-block', }}>
                    Current: Instagram
                </Text>
                <CommunityInstagram />
            </InstagramWrapper>
            <TwitterWrapper>
                <Text
                type="span"
                className=""
                css={{ display: 'inline-block', }}>
                    Current: Twitter
                </Text>
                <CommunityTwitter />
            </TwitterWrapper>
        </SocialNetworkAccountsWrapper>
    )
}

export default SocialNetworkAccounts;