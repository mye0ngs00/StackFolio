import Text from 'components/material/Text';
import { QuestionData } from 'db/Question';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    max-width: 100%;
    box-shadow: 2px 2px 10px grey;
    padding: 10px;
`;

const QuestionPreview = (props:QuestionData) => {
    const {
        id, author, question, likes, views
    } = props;

    return (
        <Wrapper>
            <Text> {id} </Text>
            <Text> {author} </Text>
        </Wrapper>
    )
}

export default QuestionPreview;