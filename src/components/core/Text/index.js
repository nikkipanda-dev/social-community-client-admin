import { styled } from "../../../stitches.config";

import NotFound from '../../widgets/NotFound';

const textStyle = {
    fontFamily: '$manjari',
    fontSize: '$small',
};

const ParagraphWrapper = styled('p', 
    textStyle,
    {},
);

const SpanWrapper = styled('span', 
    textStyle,
    {}
);

const textType = {
    paragraph: ParagraphWrapper,
    span: SpanWrapper,
}

export const Text = ({ 
    type, 
    className, 
    css, 
    children,
}) => {
    const TextWrapper = textType[type];

    return (
        TextWrapper ? 
        <TextWrapper className={ className } css={{ ...css }}>
            { children }
        </TextWrapper> : <NotFound />
    )
}

export default Text;
