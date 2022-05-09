import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleInfo, 
    faCircleCheck, 
    faCircleExclamation, 
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { styled } from "../../../stitches.config";

const alertStyle = {
    borderRadius: '$default',
    padding: '$space-2 $space-4',
    background: '$lightGray',
    variants: {
        status: {
            info: {
                background: '$lightGray',
            },
            success: {
                background: '$lightGreen',
            },
            warning: {
                background: '$lightYellow',
            },
            error: {
                background: '$salmon',
            },
        }
    }
}

const HeaderWrapper = styled('div', {
    fontSize: '$large',
});

const AlertWrapper = styled('div', 
    alertStyle,
    {}
);

const AlertHeaderWrapper = styled('div', {});

const AlertBodyWrapper = styled('div', {});

export const Alert = ({
    status,
    className,
    css,
    children,
    header,
    headerClassName,
    bodyClassName,
}) => {
    return (
        <AlertWrapper 
        status={status}
        className={'' + (className ? (' ' + className) : '')}
        {...css && { css: { ...css } }}>
            <AlertHeaderWrapper className={'d-flex flex-wrap justify-content-start align-items-center' + (headerClassName ? (' ' + headerClassName) : '')}>
            {
                status &&
                (
                    (status === "info") ? <FontAwesomeIcon
                    className="fa-2xl"
                    icon={faCircleInfo}
                    style={{ color: '#666666', }} /> :
                    (status === "success") ? <FontAwesomeIcon
                    className="fa-2xl"
                    icon={faCircleCheck}
                    style={{ color: '#007B70', }} /> :
                    (status === "warning") ? <FontAwesomeIcon
                    className="fa-2xl"
                    icon={faCircleExclamation}
                    style={{ color: '#FFBF69', }} /> :
                    (status === "error") ? <FontAwesomeIcon
                    className="fa-2xl"
                    icon={faCircleXmark}
                    style={{ color: '#F95F5F', }} />
                    : ''
                )
            }
                <HeaderWrapper className={(status && ((status === "info") || (status === "success") || (status === "warning") || (status === "error"))) ? "ms-2" : '' }>
                    {header}
                </HeaderWrapper>
            </AlertHeaderWrapper>
            <AlertBodyWrapper className={' ' + (header ? 'mt-3' : '') + (bodyClassName ? (' ' + bodyClassName) : '')}>
                {children}
            </AlertBodyWrapper>
        </AlertWrapper>
    )
}

export default Alert;