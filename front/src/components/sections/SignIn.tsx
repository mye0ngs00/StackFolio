import { toggleSignInModalState } from 'atoms/signInModal';
import { Box } from 'components/material/Box';
import Text, { Subtitle } from 'components/material/Text';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IoLogoFacebook, IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import Separator from 'components/material/Separator';
import { TextField } from 'components/material/Textfield';
import { Button } from 'components/material/Button';
import ModalBackgroundImg from 'assets/modal_bg.png';
import media from 'styles/media';
import TextButton from 'components/material/TextButton';

const ModalBackground = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background: url(${ModalBackgroundImg}) no-repeat center center;
    background-size: cover;
`;
const Modal = styled.div`
    position: absolute;
    top: 15%;
    right: 100px;
    ${media.tablet`
        position: initial;
        margin: 20% auto;
    `}
    
    background-color: #fefefe;
    padding: 20px 30px;
    border: 1px solid #888;
    width: min(400px, calc(90% - 60px)); 
    box-shadow: 1px 1px 6px black;
`
const ModalHeader = styled(Box)`
    height: 100px;
`;
const EmailWrapper = styled.div `
    padding: 50px 0 30px 0;
`;
const EmailField = styled.div`
    & > *{
        width: 100%;
    }
    & > button{
        position: relative;
        margin: 0;
        float: right;
        top: -40px;
        height: 35px;
        width: 6rem;
    }
`
//이메일 주소 오류 시 메세지
const EmailErrorMessage = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    color: #333;
    background-color: #F39797;
    opacity: 0.65;
    box-shadow: 1px 1px 2px grey;
    margin-top:3px;
    height: 35px;
    width: 50%;
    padding: 0 10px;
    font-size: 14px;
`
const SocialButtonWrapper = styled.div`
    padding: 50px 0;
    & > button:nth-child(n+2){
        margin-top: 20px;
    }
`
const SocialButton = styled.button`
    padding: 0;
    width: 100%;
    height: 60px;
    border-radius: 30px;
    border: black solid 1px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    outline: none;
    & > div { 
        height: 100%; 
        padding: 0 10px;
    }
`

//이메일 주소 유효성 검사
const checkIsValidEmail = (address:string) => {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return emailRegex.test(String(address).toLowerCase());
}

const SignIn = () => {
    // modal 바깥 부분 클릭 시 숨기기
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const ref = useRef(null);
    const toggle = (event:any) => 
        (event.target === ref.current) && toggleDisplay('');

    // sign in - sign up mode
    const [isSignInMode, setIsSignInMode] = useState<Boolean>(true);
    const toggleIsSignInMode = () => setIsSignInMode(prev => !prev);

    // Show Error message 
    const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);

    const [email, setEmail] = useState('');
    const onEmailChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(value);
    }

    // 로그인 버튼 클릭 시
    const onSignInClicked = () => {
        const isValid = checkIsValidEmail(email);
        setShowErrorMessage(!isValid);
        // 시간 지나면 없어지게 할까요?
        // setTimeout(()=>setShowErrorMessage(false), 3000);
    }

    // 회원가입 버튼 클릭 시
    const onSignUpClicked = () => {
        const isValid = checkIsValidEmail(email);
        setShowErrorMessage(!isValid);
    }
    
    return (
        <ModalBackground ref={ref} style={{display}} onClick={toggle}>
            <Modal>
                <ModalHeader transparent>
                    <Text fontSize={48} color="#666">{isSignInMode ? "LOGIN" : "SIGN UP"}</Text>
                </ModalHeader>
                <EmailWrapper>
                    <Subtitle color="#999">이메일로 {isSignInMode ? "로그인" : "회원가입"}</Subtitle>
                    <EmailField>
                        <TextField 
                            height={36}
                            value={email}
                            onChange={onEmailChange}
                            fullWidth 
                            placeholder="이메일 주소를 입력하세요." 
                        />
                         <Button
                            color={email ? "primary": "secondary"}
                            disabled={!Boolean(email)}
                            onClick={isSignInMode ? onSignInClicked : onSignUpClicked}
                            >
                            {isSignInMode ? "로그인" : "회원가입"}
                        </Button>
                        {showErrorMessage && 
                            <EmailErrorMessage>
                                올바르지 않은 메일 형식입니다.
                            </EmailErrorMessage>
                        }
                        <Text right>
                            {isSignInMode ? "신규 사용자이신가요?" : "계정이 이미 있으신가요?"} &nbsp;
                            <TextButton onClick={toggleIsSignInMode}>
                                {isSignInMode ? "회원가입" : "로그인"}
                            </TextButton>하기
                        </Text>
                    </EmailField>
                </EmailWrapper>
                <Separator> 또는 </Separator>
                <SocialButtonWrapper>
                <SocialButton>
                        <FcGoogle size={32}/> 
                    <Box transparent left>
                        Google로 {isSignInMode ? "계속" : "회원가입"}
                    </Box>
                </SocialButton>
                <SocialButton>
                    <IoLogoFacebook color="#3b5998" size={32}/>
                    <Box transparent left>
                        Facebook으로 {isSignInMode ? "계속" : "회원가입"}
                    </Box>
                </SocialButton>
                <SocialButton>
                    <IoLogoGithub color="#111" size={32}/>
                    <Box transparent left>
                        Github로 {isSignInMode ? "계속" : "회원가입"}
                    </Box>
                </SocialButton>
                </SocialButtonWrapper>
            </Modal>
        </ModalBackground>
    )
}

export default SignIn;