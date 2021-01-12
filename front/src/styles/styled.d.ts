import 'styled-components'

interface Colorset {
    main: string
    text: string
    border: string
    accent: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        mainBackground: string;
        opposite: string;

        // neutral color
        title: string;
        disable: string;
        divider: string;
        tableHeader: string;

        //point-color
        default: Colorset;
        primary: Colorset;
        secondary: Colorset;
    }
}
