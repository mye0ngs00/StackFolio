import { toggleSignInModalState } from "atoms/signInModal";
import { toggleThemeState } from "atoms/theme";
import { userState } from "atoms/user";
import { Box } from "components/material/Box";
import { Button } from "components/material/Button";
import { Switch } from "components/material/Switch";
import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SignIn from "./SignIn";
import LOGO_BLACK from 'assets/logo_black.png';
import LOGO_WHITE from 'assets/logo_white.png';
import { themes } from "styles/theme";

const Head = styled.header`
    background-color:#27384B;
    height: 55px;
    padding: 5px 20px 5px 20px;
    color: ${({theme}) => theme.default.text};
    display: grid;
    grid-template-columns : 180px calc(100% - 370px) 170px;
`
const Logo = styled.button`
    background: url(${LOGO_WHITE}) no-repeat center;
    background-size: contain;
    border: none;
    outline: none;
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
`

const Header = () => {
    const [user, setUser] = useRecoilState(userState);
    const [theme, toggleTheme] = useRecoilState(toggleThemeState);
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const history = useHistory();
    return (
        <Head>
            <Logo onClick={()=>history.push('/')}/>
            <Box transparent>
                <Switch size="md" checked={theme==='light'} onChange={()=>toggleTheme('')} />
            </Box>
            <Buttons>
                <Button color="text" onClick={()=>history.push('/search')}>검색</Button>
                {
                    user ?
                    <>
                    <Button color="text">글쓰기</Button>
                    <Button color="text">알림</Button>
                    <Button color="text">프로필</Button>
                    </>
                    :
                    <>
                        <Button color="text" onClick={()=>toggleDisplay('')}> 로그인</Button>
                        <SignIn />
                    </>
                }
            </Buttons>
        </Head>
    )
}
export default Header;