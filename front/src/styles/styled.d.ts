import 'styled-components'

interface Colorset {
    main: string
    text: string
    border: string
    accent: string
    disabled: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        mainBackground: string;
        basic: string;

        // neutral color
        title: string;
        divider: string;
        tableHeader: string;
        disable: string;

        // //point-color
        default: Colorset;
        primary: Colorset;
        secondary: Colorset;
        ghost: Colorset;
    }
}
