import Cookies from 'js-cookie';

export const isAuth = () => {
    let isAuth = false;
    
    if ((Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user'))) && (Cookies.get('auth_user_token') && JSON.parse(Cookies.get('auth_user_token')))) {
        isAuth = true;
    }

    return isAuth;
}