import { styled } from "../../../stitches.config";

import NotFound from '../../widgets/NotFound';

const textStyle = {
    fontFamily: '$manjari',
    fontSize: '$small',
    variants: {
        color: {
            brown: {
                color: '$sealBrown',
            },
            orange: {
                color: '$orangePeel',
            },
            red: {
                color: '$orangeRedCrayola',
            }
        },
    }
};

const ParagraphWrapper = styled('p', 
    textStyle,
    {
        textAlign: 'justify',
    },
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
    color,
    children,
}) => {
    const TextWrapper = textType[type];

    return (
        TextWrapper ? 
        <TextWrapper 
        {...color && { color: color }}
        className={ className } 
        css={{ ...css }}>
            { children }
        </TextWrapper> : <NotFound />
    )
}

export default Text;
