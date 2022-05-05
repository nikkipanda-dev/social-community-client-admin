import { styled } from "../../../stitches.config";

const ImageWrapper = styled('img', {});

export const Image = ({ 
    className, 
    css, 
    src, 
    alt
}) => {
    return (
        <ImageWrapper 
        className={ className }
        css={{ ...css }}
        src={ src }
        {...alt && { alt: alt }}/>
    )
}
