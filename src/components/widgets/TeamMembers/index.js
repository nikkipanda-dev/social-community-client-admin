import { styled } from "../../../stitches.config";

import User from "../User";

const TeamMembersWrapper = styled('div', {
    '> div:nth-child(n+2)': {
        marginTop: '30px',
    },
});

export const TeamMembers = ({ 
    members, 
    className, 
    css,
    action,
}) => {
    return (
        <TeamMembersWrapper className={' ' + (className ? (' ' + className) : '')} {...css & { css: { ...css } }}>
        {
            (members && (Object.keys(members).length > 0)) && 
            Object.keys(members).map((i, val) => {
                return <User 
                key={'member-' + Object.values(members)[val].id} 
                type="item"
                action={action}
                member={Object.values(members)[val]} />
            })
        }
        </TeamMembersWrapper>
    )
}

export default TeamMembers;