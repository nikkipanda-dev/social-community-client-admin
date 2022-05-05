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
    const [isTokenValid, setIsTokenValid] = useState(false);

    const validateToken = () => {
        axiosInstance.get('http://localhost:8000/api/validate-invitation/' + window.location.pathname.slice(10))

        .then (response => {
            console.log('response ', response.data);
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
                <RegisterSection 
                className="mx-auto" 
                isAuth={isAuth} 
                handleLogIn={handleLogIn} 
                handleLogOut={handleLogOut} />
            </RegisterWrapper>
        </Section>
    )
}

export default Register;