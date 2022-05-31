import { message } from 'antd';
import Cookies from 'js-cookie';

export const isAuth = () => {
    let isAuth = false;
    
    if ((Cookies.get('admin_auth_user') && JSON.parse(Cookies.get('admin_auth_user'))) && (Cookies.get('admin_user_token') && JSON.parse(Cookies.get('admin_user_token')))) {
        isAuth = true;
    }

    return isAuth;
}

export const key = 'updatable';

export const showAlert = () => {
    message.loading({
        content: 'Loading...',
        key,
        style: {
            marginTop: '10vh',
            zIndex: '999999',
        },
    });
};