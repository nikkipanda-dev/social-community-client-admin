import Cookies from 'js-cookie';

export const isAuth = () => {
    let isAuth = false;
    
    if ((Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user'))) && (Cookies.get('auth_user_token') && JSON.parse(Cookies.get('auth_user_token')))) {
        isAuth = true;
    }

    return isAuth;
}

export const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}