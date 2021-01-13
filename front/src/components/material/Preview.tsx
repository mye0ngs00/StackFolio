import React from 'react';
import styled from 'styled-components';
import { Box } from './Box';
import image from 'dummy/example.png'

const PreviewBox = styled.div`
    display: grid;
    grid-template-rows: 45% 40% 15%;
    width: 350px;
    height: 420px;
    margin: 10px;
    box-shadow: 2px 2px 10px grey;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
`
const Preview = () => {
    return(
        <PreviewBox>
            <Image src={image} alt="img"/>
            <Box>
                Description
            </Box>
            <Box>
                Like
            </Box>
        </PreviewBox>
    )
}

export default Preview;