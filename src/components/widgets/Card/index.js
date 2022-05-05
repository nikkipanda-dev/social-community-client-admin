import { styled } from "../../../stitches.config";

const CardWrapper = styled('div', {});

const CardHeaderWrapper = styled('div', {});

const CardBodyWrapper = styled('div', {});

const CardFooterWrapper = styled('div', {});

export const Card = ({ 
    header, 
    className, 
    css, 
    children, 
    footer
}) => {
    return (
        <CardWrapper className={ className } css={{ ...css }}>
        {
            header && 
            <CardHeaderWrapper>{header}</CardHeaderWrapper>
        }
            <CardBodyWrapper>
                { children }
            </CardBodyWrapper>
        {
            footer && 
            <CardFooterWrapper>
                {footer}
            </CardFooterWrapper>
        }
        </CardWrapper>
    )
}

export default Card;