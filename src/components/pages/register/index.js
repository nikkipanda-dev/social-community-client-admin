import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../requests";
import { styled } from "../../../stitches.config";

import Section from "../../core/Section";
import { Register as RegisterSection } from '../../sections/Register';

const RegisterWrapper = styled('div', {
    paddingTop: '100px',
    maxWidth: '1700px',
});

export const Register = ({ 
    isAuth,
    handleLogIn,
    handleLogOut, 
}) => {
    const navigate = useNavigate();

    const [isTokenValid, setIsTokenValid] = useState(false);
    
    const handleValidToken = () => setIsTokenValid(true);
    const handleInvalidToken = () => setIsTokenValid(false);

    const validateToken = () => {
        axiosInstance.get('http://localhost:8000/api/validate-invitation/' + window.location.pathname.slice(10))

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
        }

        return () => {
            loading = false;
        }
    }, []);

    return (
        <Section className="bg-primary">
            <RegisterWrapper className="mx-auto">
            {
                isTokenValid ?
                <RegisterSection
                className="mx-auto"
                isAuth={isAuth}
                handleLogIn={handleLogIn}
                handleLogOut={handleLogOut} /> : 
                navigate('/not-found')
            }
            </RegisterWrapper>
        </Section>
    )
}

export default Register;