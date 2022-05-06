import { styled } from "../../../stitches.config";

import CampName from "../../sections/CampName";
import CampDescription from "../../sections/CampDescription";
import Team from "../../sections/Team";
import SocialNetworkAccounts from "../../sections/SocialNetworkAccounts";
import Heading from "../../core/Heading";

const InformationWrapper = styled('div', {
    '> div:nth-child(n+2)': {
        marginTop: '$space-3',
    },
});

const GeneralInformationWrapper = styled('div', {
    maxWidth: '1000px',
});

export const Information = () => {

    return (
        <InformationWrapper>
            <GeneralInformationWrapper>
                <Heading type={5} text="General" />
                <CampName />
                <CampDescription />
            </GeneralInformationWrapper>
            <Team />
            <SocialNetworkAccounts />
        </InformationWrapper>
    )
}

export default Information;