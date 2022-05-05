import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { styled } from "../../../stitches.config";

import Section from "../../core/Section";
import LogIn from '../../widgets/Login';

const LandingPageWrapper = styled('div', {
    maxWidth: '1700px',
    minHeight: '90vh',
});

export const LandingPage = ({ isAuth, handleLogIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        let loading = true;
        if (loading) {
            if (Cookies.get('auth_user')) {
                navigate('/dashboard');
            }
        }

        return () => {
            loading = false
        }
    }, [isAuth]);

    return (
        <Section>
            <LandingPageWrapper className="mx-auto d-flex justify-content-center align-items-center">
                <LogIn isAuth={isAuth} handleLogIn={handleLogIn} />
            </LandingPageWrapper>
        </Section>
    )
}

export default LandingPage;