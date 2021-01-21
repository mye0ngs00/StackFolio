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
    padding: 5px 20px 5px 20px;
    color: ${({theme}) => theme.default.text};
    
    display: grid;
    grid-template-columns : 150px calc(100% - 370px) 180px;
`
const Buttons = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
`

const Header = () => {
    const [theme, toggleTheme] = useRecoilState(toggleThemeState);
    const history = useHistory();
    return (
        <Head>
            <TextButton bold fontSize={40} onClick={()=>history.push('/')}> Logo </TextButton>
            <Box>
                <Switch size="md" checked={theme==='light'} onChange={()=>toggleTheme('')} />
            </Box>
            <Buttons>
                <TextButton onClick={()=>history.push('/search')}>검색</TextButton>
                <TextButton>글쓰기</TextButton>
                <TextButton>알림</TextButton>
                <TextButton>프로필</TextButton>
            </Buttons>
        </Head>
    )
}
export default Header;