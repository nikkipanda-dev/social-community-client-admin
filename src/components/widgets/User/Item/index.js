import { styled } from "../../../../stitches.config";

import Text from "../../../core/Text";
import Image from "../../../core/Image";

const UserItemWrapper = styled('div', {
    maxWidth: '600px',
});
const UserContentWrapper = styled('div', {});
const UserDetailsWrapper = styled('div', {});
const UserNameWrapper = styled('div', {});
const ActionWrapper = styled('div', {});
const ImageWrapper = styled('div', {});

export const UserItem = ({ 
    member, 
    className,
    action,
    background,
    css,
    onClick,
    evtOnclick,
}) => {
    return (
        <UserItemWrapper className={'d-flex flex-wrap' + (className ? (' ' + className) : '')}>
            <ImageWrapper className="d-none d-md-block">
                <Image
                className="d-none d-sm-block"
                src="/avatar_medium.png"
                css={{ 
                    width: '100%', 
                    maxWidth: '60px', 
                    height: 'auto'
                }} />
            </ImageWrapper>
            <UserContentWrapper className="flex-grow-1 d-flex flex-wrap justify-content-between align-items-start ms-0 ms-md-3">
                <UserDetailsWrapper className="d-flex flex-column align-items-start ms-0 ms-md-3">
                    <UserNameWrapper className={"d-flex" + ((member && member.title) ? ' flex-wrap align-items-center' : ' flex-column ')}>
                        <Text type="span" size="medium">
                        {
                            (member && member.user) ? (member.user.first_name + ' ' + member.user.last_name) : 
                            (member && (member.first_name && member.last_name)) ? (member.first_name + ' ' + member.last_name) : ''
                        }
                        </Text>
                        <Text type="span" className={(member && member.title) && "ms-2"} color="darkGray">@
                        {
                            (member && member.user) ? member.user.username :
                            (member && member.username) ? member.username : ''
                        }
                        </Text>
                    </UserNameWrapper>
                    <Text type="span">{(member && member.title) && member.title}</Text>
                </UserDetailsWrapper>
                <ActionWrapper data-target-username={
                    (member && member.user) ? member.user.username : 
                    (member && member.username) ? member.username : ''
                } data-target-id={(member && member.id) && member.id}>
                    {action ? action : ''}
                </ActionWrapper>
            </UserContentWrapper>
        </UserItemWrapper>
    )
}

export default UserItem;