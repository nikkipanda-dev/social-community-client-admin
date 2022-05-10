import { NavLink } from "react-router-dom";
import { styled } from "../../../stitches.config";

import Text from '../../core/Text';

const SidebatItemWrapper = styled('div', {});

const SidebarItemContentWrapper = styled('div', {
    padding: '$space-2 $space-2 $space-1',
    '> span': {
        fontSize: '$medium',
    },
});

const SidebarItemIconWrapper = styled('div', {
    marginRight: '$space-2',
    minWidth: '40px', 
    minHeight: '40px',
    color: '$sealBrown',
});

export const SideBarItem = ({ item }) => {
    return (
        <SidebatItemWrapper>
        {
            item &&
            <NavLink 
            to={item.link} 
            className={({ isActive }) => isActive ? 'active-nav' : undefined}
            style={{ textDecoration: 'unset', }}>
                <SidebarItemContentWrapper className="d-flex align-items-center">
                    <SidebarItemIconWrapper className="d-flex justify-content-center align-items-center">
                        {item.icon}
                    </SidebarItemIconWrapper>
                    <Text type="span" css={{ color: '$black', }}>
                        {item.page}
                    </Text>
                </SidebarItemContentWrapper>
            </NavLink>
        }
        </SidebatItemWrapper>
    )
}

export default SideBarItem;