import { styled } from "../../../stitches.config";

const ButtonWrapper = styled('button', {
    transition: '$default',
    fontFamily: '$manjari',
    background: '#f1f1f1',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '$default',
    padding: '$space-2 $space-3 $space-1',
    '&.button-sm': {
        fontSize: '$small',
    },
    '&.button-md': {
        fontSize: '$medium',
    },
    '&.button-lg': {
        fontSize: '$large',
    },
    variants: {
        color: {
            brown: {
                background: '$sealBrown',
                color: '$white',
                '&:hover': {
                    background: '#442300',
                },
            },
            orange: {
                background: '$orangePeel',
                color: '$white',
                '&:hover': {
                    background: '#f58e00',
                },
            },
            red: {
                background: '$orangeRedCrayola',
                color: '$white',
                '&:hover': {
                    background: '#de3c3c',
                },
            }
        },
        outline: {
            brown: {
                color: '$black',
                background: 'transparent',
                border: '$sealBrown',
                borderStyle: '$default',
                borderWidth: '$default',
                '&:hover': {
                    color: '$white',
                    background: '$sealBrown',
                },
            },
            orange: {
                color: '$black',
                background: 'transparent',
                border: '$orangePeel',
                borderStyle: '$default',
                borderWidth: '$default',
                '&:hover': {
                    color: '$white',
                    background: '$orangePeel',
                },
            },
            red: {
                color: '$black',
                background: 'transparent',
                border: '$orangeRedCrayola',
                borderStyle: '$default',
                borderWidth: '$default',
                '&:hover': {
                    color: '$white',
                    background: '$orangeRedCrayola',
                },
            },
        },
    },
    '&:hover': {
        background: '#d6d6d6',
    }
});

export const Button = ({ 
    className, 
    css, 
    text,
    color,
    outline,
    onClick,
    type,
}) => {
    return (
        <ButtonWrapper 
        {...color && { color: color }}
        {...outline && { outline: outline }}
        {...type && { type: type }}
        {...onClick && { onClick: () => onClick() }}
        className={'' + ( className ? (' ' +  className) : '')} 
        {...css && { css: { ...css } }}>
            {text}
        </ButtonWrapper>
    )
}

export default Button;