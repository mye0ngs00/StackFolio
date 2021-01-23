import { toggleThemeState } from "atoms/theme";
import { Box } from "components/material/Box";
import { TextButton } from "components/material/Button";
import { Switch } from "components/material/Switch";
import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Head = styled.header`
    height: 55px;
    display: flex;
    align-items: center;
    padding: 5px 20px 5px 20px;
    color: ${({theme}) => theme.default.text};
    font-weight: 900;
    font-size: 40px;
`

const Header = () => {
    const [theme, toggleTheme] = useRecoilState(toggleThemeState);
    const history = useHistory();
    return (
        <Head>
            <Box rowSpace={10}>
                <TextButton bold onClick={()=>history.push('/')} >
                    Clone Velog Header
                </TextButton>
                <Switch size="md" checked={theme==='light'} onChange={()=>toggleTheme('')} />
            </Box>
        </Head>
    )
}
export default Header;