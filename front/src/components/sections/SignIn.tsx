import { toggleSignInModalState } from 'atoms/signInModal';
import { Box } from 'components/material/Box';
import { Head, Subtitle } from 'components/material/Text';
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub } from 'react-icons/io5';

const Modal = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;
const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: min(555px, 80%); 
    box-shadow: 1px 1px 6px black;
`
const ModalHeader = styled(Box)`
    height: 100px;
`;
const ModalBody = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 75px);
    gap: 15px;
    padding-left: max(5%, 10px);
    padding-right: max(5%, 10px);
`;
const SocialButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    box-shadow: 2px 2px 6px grey;
    display: grid;
    grid-template-columns: 75px auto;
    & > * { height: 100%; padding:0;}
`
const SignIn = () => {
    const [display, toggleDisplay] = useRecoilState(toggleSignInModalState);
    const ref = useRef(null);
    const toggle = (event:any) => 
        (event.target === ref.current) && toggleDisplay('');
    
    const colors = {
        google: "#db4437",
        facebook: "#3b5998",
        github: "#111"
    }
    return (
        <Modal ref={ref} style={{display}} onClick={toggle}>
            <ModalContent>
                <ModalHeader>
                    <Head color="#666">JOIN</Head>
                </ModalHeader>
                <ModalBody>
                    <SocialButton>
                        <Box transparent>
                            <IoLogoGoogle size={32} color={colors.google}/>
                        </Box>
                        <Subtitle color={colors.google}> Google </Subtitle>
                    </SocialButton>
                    <SocialButton>
                        <Box transparent>
                            <IoLogoFacebook size={32} color={colors.facebook}/>
                        </Box>
                        <Subtitle color={colors.facebook}> Facebook </Subtitle>
                    </SocialButton>
                    <SocialButton>
                        <Box transparent>
                            <IoLogoGithub size={32} color={colors.github}/>
                        </Box>
                        <Subtitle color={colors.github}> Github</Subtitle>
                    </SocialButton>
                </ModalBody>
                <ModalHeader>
                    <Subtitle>SNS계정을 이용해 로그인하세요.</Subtitle>
                </ModalHeader>
            </ModalContent>
        </Modal>
    )
}

export default SignIn;