import { styled } from '../../../stitches.config';

import Heading from '../../core/Heading';
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

export const SocialNetworkAccounts = ({ details, handleDetails }) => {

    return (
        <SocialNetworkAccountsWrapper>
            <HeaderWrapper className="d-flex flex-wrap justify-content-between align-items-center">
                <Heading type={6} text="Social Network Accounts" />
            </HeaderWrapper>
            <WebsiteWrapper className="d-flex flex-column">
                <CommunityWebsite details={details} handleDetails={handleDetails} />
            </WebsiteWrapper>
            <FacebookWrapper>
                <CommunityFacebook details={details} handleDetails={handleDetails} />
            </FacebookWrapper>
            <InstagramWrapper>
                <CommunityInstagram details={details} handleDetails={handleDetails} />
            </InstagramWrapper>
            <TwitterWrapper>
                <CommunityTwitter details={details} handleDetails={handleDetails} />
            </TwitterWrapper>
        </SocialNetworkAccountsWrapper>
    )
}

export default SocialNetworkAccounts;