import { Box } from 'components/material/Box';
import { Button } from 'components/material/Button';
import Text from 'components/material/Text';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import media from 'styles/media';

const Wrapper = styled.div`
    background-color:#27384B;
    padding: 30px;
    height: 500px;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    ${media.phone`
        height: 250px;
        padding: 10px;
        grid-template-columns: 1fr;
    `}
`
const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 50px 150px;
    ${media.phone`
        padding: 5px;
        & > * {
            font-size: 36px;
        }
        & > *:nth-child(3) > div {
            font-size: 20px;
        }
        & > *:nth-child(3) > button {
            width: 5rem;
            margin: 2px 5px;
        }
    `}
`
const PalletWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap:50px;
    padding: 60px 50px 200px 50px;
    ${media.phone`
        display: none;
    `}
`
const Pallet = styled.div`
    ${({color}) => `background-color: ${color};`};
    box-shadow: 1px 1.5px 4px black;
`

const Main = () => {
    const history = useHistory();
    return (
        <Wrapper>
            <LeftWrapper>
                <Text fontSize={80} color="white" bold>STACK</Text>
                <Text fontSize={80} color="white" bold>PORTFOLIO.</Text>
                <Box transparent>
                    <Text fontSize={32} color="white">Solve your curiosity on the</Text>
                    <Button color="primary" onClick={()=>history.push('/questions')} >
                        질문게시판
                    </Button>
                </Box>
            </LeftWrapper>
            <PalletWrapper>
                <Pallet color="#F3E3DF"/>
                <Pallet color="#3B5BC6"/>
                <Pallet color="#E5E5E5"/>
                <Pallet color="#27384B"/>
            </PalletWrapper>
        </Wrapper>
    )
}

export default Main;