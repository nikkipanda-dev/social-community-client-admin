import { useState, useEffect } from "react";
import { styled } from "../../../stitches.config";

import InviteMembers from "../../sections/InviteMembers";
import { Members as MembersSection } from "../../sections/Members";

const MembersWrapper = styled('div', {});

export const Members = () => {
    return (
        <MembersWrapper>
            <InviteMembers />
            <MembersSection />
        </MembersWrapper>
    )
}

export default Members;