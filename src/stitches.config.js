import { createStitches } from '@stitches/react';

export const { 
    styled,
    css,
    globalCss,
    keyframes,
    theme,
    createTheme,
    getCssText, 
} = createStitches({
    prefix: 'draw',
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            darkGray: '#666666',
            lightGray: '#F6F6F6',
            sealBrown: '#552D03',
            orangePeel: '#FF9F1C',
            mellowApricot: '#FFBF69',
            orangeRedCrayola: '#F95F5F',
            pineGreen: '#007B70',
        },
        space: {
            "space-1": '5px',
            "space-2": '10px',
            "space-3": '15px',
            "space-4": '20px',
        },
        fontSizes: {
            default: '16px',
            small: '1rem',
            medium: '1.3rem',
            large: '1.6rem',
        },
        fonts: {
            patuaOne: 'Patua One, cursive',
            manjari: 'Manjari, sans-serif',
        },
        fontWeights: {},
        lineHeights: {
            default: '150%',
            medium: '200%',
        },
        letterSpacings: {},
        sizes: {},
        borderWidths: {
            default: '5px',
            small: '3px',
            medium: '5px',
            large: '10px',
        },
        borderStyles: {
            default: 'solid',
        },
        radii: {
            default: '15px',
            small: '10px',
        },
        shadows: {
            default: '5px 5px #000000',
        },
        zIndices: {
            default: '9999999',
        },
        transitions: {
            default: 'all .2s ease-in-out',
        },
    },
});

export const globalStyles = globalCss({
    'html': { 
        margin: 0, 
        padding: 0,
        fontSize: '$default',
    },
    '@import': ["https://fonts.googleapis.com/css2?family=Manjari&family=Patua+One&display=swap"],
});
