import React from 'react';
import { Route } from 'react-router-dom';
import QuestionsDetail from './QuestionsDetail';
import QuestionsList from './QuestionsList';

const Questions = ({match}:any) => {
    return (
        <>
         <Route exact path={match.path} component={QuestionsList} />
         <Route path={`${match.path}/:id`} component={QuestionsDetail} />
        </>
    )
}

export default Questions;