import { useState, useEffect } from "react";
import { isAuth } from "../../../util";
import Cookies from 'js-cookie';
import { axiosInstance } from "../../../requests";
import { styled } from "../../../stitches.config";

import InviteMembers from "../../sections/InviteMembers";
import { Members as MembersSection } from "../../sections/Members";

const MembersWrapper = styled('div', {});

export const Members = () => {
    const [members, setMembers] = useState('');
    const [forceRender, setForceRender] = useState('');

    const handleMembers = members => setMembers(members);
    const handleForceRender = () => setForceRender(!forceRender);

    const getUsers = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.get(process.env.REACT_APP_BASE_URL + "users", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

                .then(response => {
                    console.log('response ', response.data.data.details);
                    handleMembers(response.data.data.details);
                })

                .catch(err => {
                    console.log('err ', err.response ? err.response.data.errors : err);
                });
        } else {
            console.log('on admin: no cookies');
        }
    }

    useEffect(() => {
        let loading = true;

        if (loading) {
            getUsers();
        }

        return () => {
            loading = false;
        }
    }, [forceRender]);

    return (
        <MembersWrapper>
            <InviteMembers />
            <MembersSection 
            members={members} 
            handleMembers={handleMembers} 
            handleForceRender={handleForceRender} />
        </MembersWrapper>
    )
}

export default Members;