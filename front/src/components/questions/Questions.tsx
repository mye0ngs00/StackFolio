import React, { useEffect, useState } from 'react';
import { getQuestionData, QuestionData } from 'db/Question'
import QuestionPreview from 'components/common/QuestionPreview';
import styled from 'styled-components';
import SearchField from 'components/search/SearchField';
import MainWrapper from 'components/common/MainWrapper';
import { Box } from 'components/material/Box';

const QuestionsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`


const Questions = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    useEffect(()=>{
        (async () => {
            const questionData = await Promise.all(
                ['a1', 'b222', 'c33'].map(async id => await getQuestionData(id))
            )
            setQuestions(questionData);
        })();
    },[])
    return (
        <div style={{width:"100%"}}>
        <SearchField />
        <MainWrapper>
            <QuestionsWrapper>
                {questions.map( (question:QuestionData, idx:number) => 
                    <QuestionPreview key={idx} {...question}/>)}
            </QuestionsWrapper>
        </MainWrapper>
        </div>
    )
}

export default Questions;