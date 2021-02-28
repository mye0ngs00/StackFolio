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
import { Number } from 'components/material/Number';
import previewStyle from '../../styles/previewStyle'

const Wrapper = styled(Link)`
    ${previewStyle}
    display: grid;
    grid-template-columns: 33.3% 66.6%;
    max-width: 100%;
    padding: 0px 20px 17px 25px;
    min-height: 114px;
    text-decoration:none;
`;
const Left = styled.div`
    display: grid;
    padding: 0px 45px 0px 0px;
    grid-template-columns: repeat(3, 33.33%);
`
const Right = styled.div`
    display: grid;
    grid-template-areas: 
        "t t"
        "s info";
    grid-template-columns: 50% 50%;
    grid-template-rows: 66% 34%;
    & > *:first-child{grid-area: t}
    & > *:nth-child(2){grid-area: s}
    & > *:nth-child(3){grid-area: info}
`

interface CountBoxProps {
    Icon: IconType
    value:number
}
const CountBox = ({Icon, value}:CountBoxProps) => {
    return (
        <Box transparent direction="column">
            <Number fontSize={24} value={value}/>
            <Icon size={24}/>
        </Box>
    )
}

const QuestionPreview = (props:QuestionData) => {
    const {
        id, author, title, content, likes, views, comments
    } = props;
    // TODO [임시] 조상노드에서 map으로 변환 작업 필요.
    const mappedTimestamp: Array<string> = '2021-01-02'.split('-')
    //
    // TODO color theme지정 필요
    // TODO 글씨체 변경 필요
    return (
        <Wrapper to={`/questions/${id}`}>
            <Left>
                <CountBox Icon={BiLike} value={likes} />
                <CountBox Icon={RiQuestionAnswerLine} value={comments} />
                <CountBox Icon={IoPeopleOutline} value={views} />
            </Left>
            <Right>
                <Text font-size={24} left bold>{title}</Text>
                {/* 여기 생략하는지? <Text left>{content}</Text> */}
                <Box left transparent rowSpace={10}>
                    <Tag font-size={21} color={'secondary'} name="Hello World!" />
                    <Tag font-size={21} color={'secondary'} name="C++" />
                </Box>
                <Text color={'#909090'}>
                    {`${mappedTimestamp[0]}년 ${mappedTimestamp[1]}월 ${mappedTimestamp[2]}일 ${author}`}
                </Text>
            </Right>
        </Wrapper>
    )
}

export default QuestionPreview;