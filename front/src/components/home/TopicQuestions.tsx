import React, { useState, useEffect } from 'react';
import { Box } from 'components/material/Box';
import Text from 'components/material/Text';
import styled from 'styled-components';
import { getTopicQuestionsData } from 'db/TopicQuestions';
import media from 'styles/media';
import QuestionPreview from 'components/common/QuestionPreview';
import { QuestionData } from 'db/Question';

const TopicWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "title title"
        "a b"
        "c d";
    ${media.desktop`
        grid-template-columns: 1fr;
        grid-template-areas: 
        "title"
        "a"
        "b"
        "c"
        "d";
    `}
    & > div:first-child {
        grid-area: title;
        height: 30px;
        margin-bottom: -20px;
    }
    gap: 30px;
`;

interface TopicProps{
    title: string
}

// 홈 화면에 노출되는 질문 모아보기 컴포넌트
// 질문 미리보기 4개를 담고 있음.
const TopicQuestions = ({title}:TopicProps) => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    useEffect(()=>{
        (async () => {
            const questionsData = await getTopicQuestionsData(title);
            setQuestions(questionsData.questions);
            setLoading(false);
        })();
    },[])
    return (
        <Box transparent>
            <TopicWrapper>
                <Text 
                    justifyContent="flex-start" 
                    bold
                    fontSize={24}>
                    {title}
                </Text>
                {
                    loading ? <>Loading...</>
                    :
                    questions.map((question:QuestionData, idx:number) =>(
                        <QuestionPreview key={idx} {...question} />
                    ))
                }
            </TopicWrapper>
        </Box>
    );
}

export default TopicQuestions;