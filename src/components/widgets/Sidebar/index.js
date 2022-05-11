import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faInfoCircle, 
    faUsers, 
    faBlog, 
    faQuoteLeft, 
    faBook, 
    faChalkboard, 
    faCalendarDay, 
    faPhotoFilm, 
    faFlag, 
    faScroll
} from '@fortawesome/free-solid-svg-icons';
import { styled } from "../../../stitches.config";
import SidebarItem from '../SidebarItem';

const SidebarWrapper = styled('div', {
    borderRadius: '$default',
    background: '$lightGray',
    padding: '$space-3',
    'div:nth-child(n+2)': {
        marginTop: '$space-2',
    },
    'a.active-nav': {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        background: '$white',
        borderRadius: '$small',
    },
});

export const Sidebar = ({ className, css, children }) => {

    const sidebarNavGroup = {
        0: {
            page: "Information",
            link: "information",
            icon: <FontAwesomeIcon icon={faInfoCircle} className="fa-2xl" />,
        },
        1: {
            page: "Administrators",
            link: "admins",
            icon: <FontAwesomeIcon icon={faUsers} className="fa-2xl" />,
        },
        2: {
            page: "Members",
            link: "members",
            icon: <FontAwesomeIcon icon={faUsers} className="fa-2xl" />,
        },
        3: {
            page: "Blog Entries",
            link: "blog-entries",
            icon: <FontAwesomeIcon icon={faBlog} className="fa-2xl" />,
        },
        4: {
            page: "Microblog Entries",
            link: "microblog-entries",
            icon: <FontAwesomeIcon icon={faQuoteLeft} className="fa-2xl" />,
        },
        5: {
            page: "Journal Entries",
            link: "journal-entries",
            icon: <FontAwesomeIcon icon={faBook} className="fa-2xl" />,
        },
        6: {
            page: "Discussions",
            link: "discussions",
            icon: <FontAwesomeIcon icon={faChalkboard} className="fa-2xl" />,
        },
        7: {
            page: "Events",
            link: "events",
            icon: <FontAwesomeIcon icon={faCalendarDay} className="fa-2xl" />,
        },
        8: {
            page: "Multimedia",
            link: "multimedia",
            icon: <FontAwesomeIcon icon={faPhotoFilm} className="fa-2xl" />,
        },
        9: {
            page: "Reports",
            link: "reports",
            icon: <FontAwesomeIcon icon={faFlag} className="fa-2xl" />,
        },
        10: {
            page: "User Activities",
            link: "user-activities",
            icon: <FontAwesomeIcon icon={faScroll} className="fa-2xl" />,
        },
    }

    return (
        <SidebarWrapper className={ className } css={{ ...css }}>
        {
            Object.keys(sidebarNavGroup).map((i, val) => {
                return <SidebarItem key={i} item={Object.values(sidebarNavGroup)[val]} />
            })
        }
        </SidebarWrapper>
    )
}

export default Sidebar;