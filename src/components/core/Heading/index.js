import { styled } from "../../../stitches.config";

const headingStyle = {};

const heading1Wrapper = styled('h1', {});

const heading2Wrapper = styled('h2', {});

const heading3Wrapper = styled('h3', {});

const heading4Wrapper = styled('h4', {});

const heading5Wrapper = styled('h5', {});

const heading6Wrapper = styled('h6', {});

const headings = {
    1: heading1Wrapper,
    2: heading2Wrapper,
    3: heading3Wrapper,
    4: heading4Wrapper,
    5: heading5Wrapper,
    6: heading6Wrapper,
};

export const Heading = ({ type, className, css, text }) => {
    const HeadingWrapper = headings[type];

    return (
        <HeadingWrapper>
            {text}
        </HeadingWrapper>
    )
}

export default Heading;