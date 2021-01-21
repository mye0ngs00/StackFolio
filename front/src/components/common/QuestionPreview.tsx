import { Box } from 'components/material/Box';
import Text from 'components/material/Text';
import { QuestionData } from 'db/Question';
import React from 'react';
import { IconType } from 'react-icons';
import { BiLike } from 'react-icons/bi';
import { RiQuestionAnswerLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tag from './Tag';
import { Numbers } from 'components/material/Numbers';

const Wrapper = styled(Link)`
    display: grid;
    grid-template-columns: 30% 70%;
    max-width: 100%;
    box-shadow: 2px 2px 10px grey;
    padding: 10px;
    min-height: 144px;
    text-decoration:none;
`;
const Left = styled.div`
    display: grid;
    padding-right:10px;
    grid-template-columns: repeat(3, 33.33%);
`
const Right = styled.div`
    display: grid;
    grid-template-areas: 
        "t t"
        "s s"
        "tags info";
    grid-template-columns: calc(100% - 150px);
    grid-template-rows: 35% 35% 30%;
    & > *:first-child{grid-area: t}
    & > *:nth-child(2){grid-area: s}
`

interface CountBoxProps {
    Icon: IconType
    value:number
}
const CountBox = ({Icon, value}:CountBoxProps) => {
    return (
        <Box transparent direction="column">
            <Numbers fontSize={24} value={value}/>
            <Icon size={30}/>
        </Box>
    )
}

const QuestionPreview = (props:QuestionData) => {
    const {
        id, author, title, question, likes, views, comments
    } = props;

    return (
        <Wrapper to={`/questions/${id}`}>
            <Left>
                <CountBox Icon={BiLike} value={likes} />
                <CountBox Icon={RiQuestionAnswerLine} value={comments} />
                <CountBox Icon={IoPeopleOutline} value={views} />
            </Left>
            <Right>
                <Text left bold>{title}</Text>
                <Text left>{question}</Text>
                <Box left transparent rowSpace={10}>
                    <Tag name="Hello World!" />
                    <Tag name="C++" />
                </Box>
                <Text>{author}</Text>
            </Right>
        </Wrapper>
    )
}

export default QuestionPreview;