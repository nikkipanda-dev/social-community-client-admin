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

export const Information = () => {
    const [details, setDetails] = useState('');
    const [forceRender, setForceRender] = useState(false);

    const handleDetails = data => setDetails(data);

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

    useEffect(() => {
        let loading = true;

        if (loading) {
            getDetails();
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
            <Team />
            <SocialNetworkAccounts />
        </InformationWrapper>
    )
}

export default Information;