import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        
    }
    body {
        width: 100vw;
        min-height: 100vh;
        background-color: ${ props => props.theme.mainBackground}
    }
`
export default GlobalStyle;