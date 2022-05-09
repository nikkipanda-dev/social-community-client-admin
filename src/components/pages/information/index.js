import { useState, useEffect } from "react";
import { isAuth } from "../../../util";
import Cookies from 'js-cookie';
import { axiosInstance } from "../../../requests";
import { styled } from "../../../stitches.config";

import CampName from "../../sections/CampName";
import CampImage from "../../sections/CampImage";
import CampDescription from "../../sections/CampDescription";
import Team from "../../sections/Team";
import SocialNetworkAccounts from "../../sections/SocialNetworkAccounts";
import Heading from "../../core/Heading";

const InformationWrapper = styled('div', {
    '> div:nth-child(n+2)': {
        marginTop: '50px',
    },
});

const GeneralInformationWrapper = styled('div', {});

const TeamWrapper = styled('div', {});

const SocialNetworkAccountsWrapper = styled('div', {});

export const Information = () => {
    const [isVisible, setIsVisible] = useState(false);

    const [details, setDetails] = useState('');
    const [team, setTeam] = useState('');
    const [forceRender, setForceRender] = useState(false);

    const handleDetails = data => setDetails(data);
    const handleTeam = data => setTeam(data);

    const handleShowModal = () => setIsVisible(true);
    const handleHideModal = () => setIsVisible(false);

    const getDetails = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + 'community/details', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    handleDetails(response.data.data.details);
                } else {
                    console.log('response ', response.data.errorText);
                }
            })

            .catch(err => {
                console.log('err ', err.response ? err.response.data.errors : '');
            });
        } else {
            console.log('on information: no cookies');
        }
    }

    const getTeamMembers = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + 'community/team', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

                .then(response => {
                    if (response.data.isSuccess) {
                        handleTeam(response.data.data.details);
                    } else {
                        console.log('response ', response.data.errorText);
                    }
                })

                .catch(err => {
                    console.log('err ', err.response ? err.response.data.errors : '');
                });
        } else {
            console.log('on information team: no cookies');
        }
    }

    useEffect(() => {
        let loading = true;

        if (loading) {
            getDetails();
            getTeamMembers();
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <InformationWrapper>
            <GeneralInformationWrapper>
                <Heading type={5} text="General" />
                <CampName details={details} handleDetails={handleDetails} />
                <CampImage 
                className="mt-3" 
                forceRender={forceRender} 
                setForceRender={setForceRender}/>
                <CampDescription 
                className="mt-3"
                details={details} 
                handleDetails={handleDetails} />
            </GeneralInformationWrapper>
            <TeamWrapper>
                <Heading type={5} text="Team" />
                <Team 
                team={team} 
                handleTeam={handleTeam}
                isVisible={isVisible}
                setIsVisible={handleShowModal}
                onCancel={handleHideModal} />
            </TeamWrapper>
            <SocialNetworkAccountsWrapper>
                <SocialNetworkAccounts />
            </SocialNetworkAccountsWrapper>
        </InformationWrapper>
    )
}

export default Information;