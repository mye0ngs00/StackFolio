import React from 'react';
import { Route } from 'react-router-dom';
import TagDetail from './TagDetail';
import TagList from './TagList';

const Tags = ({match}:any) => {
    return (
        <>
         <Route exact path={match.path} component={TagList} />
         <Route path={`${match.path}/:id`} component={TagDetail} />
        </>
    )
}

export default Tags;