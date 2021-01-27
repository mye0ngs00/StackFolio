import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html{
        max-width: 100vw;
        min-height: 100vh;
        background-color: ${ props => props.theme.mainBackground}
    }
    body, html{
        padding: 0;
        margin: 0;
    }
`
export default GlobalStyle;