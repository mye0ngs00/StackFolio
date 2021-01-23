import React, { useEffect, useState } from 'react';
import { getQuestionData, QuestionData } from 'db/Question'
import QuestionPreview from 'components/common/QuestionPreview';
import styled from 'styled-components';

const QuestionsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`


const QuestionsList = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    useEffect(()=>{
        (async () => {
            const questionData = await Promise.all(
                ['aaa', 'bbb', 'ccc'].map(async id => await getQuestionData(id))
            )
            setQuestions(questionData);
        })();
    },[])
    return (
        <>
        <QuestionsWrapper>
            {questions.map( (question:QuestionData, idx:number) => <
                QuestionPreview key={idx} {...question}/>)}
        </QuestionsWrapper>
        </>
    )
}

export default QuestionsList;