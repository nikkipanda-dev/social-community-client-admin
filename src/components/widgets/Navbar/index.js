import { useState, useEffect, } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message, Dropdown, Menu, } from 'antd';
import { isAuth, key, showAlert, } from '../../../util';
import { axiosInstance } from "../../../requests";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, } from '@fortawesome/free-solid-svg-icons';
import { styled } from "../../../stitches.config";

import Row from '../../core/Row';
import Column from '../../core/Column';
import Button from "../../core/Button";
import Anchor from '../../core/Anchor';
import Text from '../../core/Text';
import Image from '../../core/Image';

const NavbarWrapper = styled('div', {
    width: '100%',
    zIndex: '$default',
});

const LogoWrapper = styled('div', {});

const NavGroupWrapper = styled('div', {
    height: '100%',
});

const NavLinkGroupWrapper = styled('div', {
    'a': {
        transition: '$default',
        textDecoration: 'unset',
        color: '$black',
        fontFamily: '$manjari',
        fontSize: '$medium',
        letterSpacing: '$default',
    },
    'a:hover': {
        color: '$pineGreen',
    },
    'img:hover': {
        cursor: 'pointer',
    },
});

export const Navbar = ({ 
    className, 
    css,
    handleLogIn,
    handleLogOut,
}) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [notifications, setNotifications] = useState('');

    const logout = () => {
        if (isAuth()) {
            const authToken = JSON.parse(Cookies.get('auth_user_token'));

            const logoutForm = new FormData();
            logoutForm.append('email', JSON.parse(Cookies.get('auth_user')).email);

            axiosInstance.post(process.env.REACT_APP_BASE_URL + 'logout', logoutForm, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            .then(response => {
                if (response.data.isSuccess) {
                    setTimeout(() => {
                        Cookies.remove('auth_user');
                        Cookies.remove('auth_user_token');
                        handleLogOut();
                        navigate('/');
                    }, 1000);
                    showAlert();
                    setTimeout(() => {
                        message.success({
                            content: 'Logged out.',
                            key,
                            duration: 2,
                            style: {
                                marginTop: '10vh',
                                zIndex: '999999',
                            }
                        });
                    }, 2000);
                } else {
                    console.log('err res ', response.data.errorText);
                }
            })

            .catch(err => {
                console.log('err ', err.response ? err.response.data.errors : err);
            });
        } else {
            console.log('on logout: no cookies');
        }
    }

    // TODO: set json for Menu items

    const mailable = (
        <Menu
            items={[
                {
                    type: 'group',
                    label: <Text type="span" color="darkGray">Admin</Text>,
                    children: [
                        {
                            key: '1',
                            label: <Text type="span">Dashboard</Text>,
                        },
                    ],
                },
                {
                    type: 'group',
                    label: <Text type="span" color="darkGray">Account</Text>,
                    children: [
                        {
                            key: '2',
                            label: <Text type="span">Settings</Text>,
                        },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    label: <Text type="span" onClick={() => logout()}>Sign out</Text>,
                },
            ]}
        />
    );

    const menu = (
        <Menu
            items={[
                {
                    type: 'group',
                    label: <Text type="span" color="darkGray">Admin</Text>,
                    children: [
                        {
                            key: '1',
                            label: <Text type="span">Dashboard</Text>,
                        },
                    ],
                },
                {
                    type: 'group',
                    label: <Text type="span" color="darkGray">Account</Text>,
                    children: [
                        {
                            key: '2',
                            label: <Text type="span">Settings</Text>,
                        },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    label: <Text type="span" onClick={() => logout()}>Sign out</Text>,
                },
            ]}
        />
    );

    return (
        <NavbarWrapper className={ 'sticky-top bg-warning' + ( className ? (' ' + className) : '') } css={{ ...css }}>
            {
                isAuth() && 
                <Row className="m-0" css={{
                    maxWidth: '1700px',
                    minHeight: '7vh',
                    background: 'violet',
                    padding: '$space-3',
                }}>
                    <Column className="bg-primary col-sm-auto">
                        <LogoWrapper>
                           <Image src="/casualcampersclub_logo.png" css={{ width: '100px', }}/>
                        </LogoWrapper>
                    </Column>
                    <Column className="bg-danger col d-flex align-items-center p-0">
                        <NavGroupWrapper className="bg-light flex-grow-1 d-flex justify-content-end align-items-center">
                            <NavLinkGroupWrapper className="bg-secondary">
                                <Link to="/">Dashboard</Link>
                                <Dropdown overlay={notifications} arrow>
                                    <a onClick={e => e.preventDefault()}>
                                        <FontAwesomeIcon icon={faBell} className="ms-3 fa-xl"/>
                                    </a>
                                </Dropdown>
                                <Dropdown overlay={menu} arrow>
                                    <a onClick={e => e.preventDefault()}>
                                        <Image
                                        src="/avatar_medium.png"
                                        className="ms-3"
                                        css={{ width: '60px', }} />
                                    </a>
                                </Dropdown>
                            </NavLinkGroupWrapper>
                        </NavGroupWrapper>
                    </Column>
                </Row>
            }
        </NavbarWrapper>
    )
}

export default Navbar;