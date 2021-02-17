import { toggleSignInModalState } from "atoms/signInModal";
import { toggleThemeState } from "atoms/theme";
import { userState } from "atoms/user";
import { Box } from "components/material/Box";
import { Button } from "components/material/Button";
import { Switch } from "components/material/Switch";
import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import SignIn from "./SignIn";

const Head = styled.header`
    background-color:#27384B;
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
    const [user, setUser] = useRecoilState(userState);
    const [theme, toggleTheme] = useRecoilState(toggleThemeState);
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const history = useHistory();
    return (
        <Head>
            <Button color="ghost" bold fontSize={36} onClick={()=>history.push('/')}> StackFolio </Button>
            <Box transparent>
                <Switch size="md" checked={theme==='light'} onChange={()=>toggleTheme('')} />
            </Box>
            <Buttons>
                <Button color="ghost" onClick={()=>history.push('/search')}>검색</Button>
                {
                    user ?
                    <>
                    <Button color="ghost">글쓰기</Button>
                    <Button color="ghost">알림</Button>
                    <Button color="ghost">프로필</Button>
                    </>
                    :
                    <>
                        <Button color="ghost" onClick={()=>toggleDisplay('')}> 로그인</Button>
                        <SignIn />
                    </>
                }
            </Buttons>
        </Head>
    )
}
export default Header;