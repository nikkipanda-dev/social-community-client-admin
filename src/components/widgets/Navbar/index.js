import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { axiosInstance } from "../../../requests";
import { styled } from "../../../stitches.config";

import Button from "../../core/Button";

const NavbarWrapper = styled('div', {
    width: '100%',
    zIndex: '$default',
});

const NavbarContent = styled('div', {
    maxWidth: '1700px',
    minHeight: '10vh',
});

export const Navbar = ({ 
    className, 
    css,
    isAuth,
    handleLogIn,
    handleLogOut,
}) => {
    const navigate = useNavigate();

    const logout = () => {
        if ((Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user'))) && (Cookies.get('auth_user_token') && JSON.parse(Cookies.get('auth_user_token')))) {
            const logoutForm = new FormData();
            logoutForm.append('email', JSON.parse(Cookies.get('auth_user')).email);

            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            axiosInstance.post('http://localhost:8000/api/logout', logoutForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then (response => {

                if (response.data.isSuccess) {
                    setTimeout(() => {
                        Cookies.remove('auth_user');
                        Cookies.remove('auth_user_token');
                        handleLogOut();
                        navigate('/');
                    }, 1000);
                } else {
                    console.log('err res ', response.data.errorText);
                }
            })

            .catch (err => {
                console.log('err ', err.response ? err.response.data.errors : err);
            });
        } else {
            console.log('no cookie');
        }
    }

    return (
        <NavbarWrapper className={ 'sticky-top' + ( className ? (' ' + className) : '') } css={{ ...css }}>
            <NavbarContent className="mx-auto bg-success">
            {
                isAuth && 
                <Button text="Log out" onClick={logout } />
            }
            </NavbarContent>
        </NavbarWrapper>
    )
}

export default Navbar;