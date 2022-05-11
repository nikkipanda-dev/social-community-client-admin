import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuth } from "../../../util";
import { axiosInstance } from "../../../requests";
import { styled } from "../../../stitches.config";

import Section from "../../core/Section";
import { Register as RegisterSection } from '../../sections/Register';

const RegisterWrapper = styled('div', {
    paddingTop: '100px',
    maxWidth: '1700px',
});

export const Register = ({ 
    handleLogIn,
    handleLogOut, 
}) => {
    const navigate = useNavigate();

    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleValidToken = () => setIsTokenValid(true);
    const handleInvalidToken = () => setIsTokenValid(false);
    const handleAuthUser = () => setIsAuthenticated(true);
    const handleGuest = () => setIsAuthenticated(false);

    const validateToken = () => {
        axiosInstance.get(process.env.REACT_APP_BASE_URL + "validate-invitation/" + window.location.pathname.slice(10))

        .then (response => {
            if (response.data.isSuccess) {
                handleValidToken();
            } else {
                handleInvalidToken();
            }
        })

        .catch (err => {
            console.log('err ', err.response ? err.response.data.errors : err)
        });
    }

    useEffect(() => {
        let loading = true;

        if (loading) {
            validateToken();

            isAuth() ? handleAuthUser() : handleGuest();
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section className="bg-primary">
            <RegisterWrapper className="mx-auto">
            {
                (isTokenValid && !(isAuthenticated)) ?
                <RegisterSection
                className="mx-auto"
                handleLogIn={handleLogIn}
                handleLogOut={handleLogOut} /> : 
                (isAuthenticated) ? navigate('/dashboard') :
                navigate('/not-found')
            }
            </RegisterWrapper>
        </Section>
    )
}

export default Register;