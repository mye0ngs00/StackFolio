import React from 'react';

const QuestionsDetail = ({match}:any) => {
    const {params:{id}} = match;
    return (
        <>
            {id}
        </>
    )
}

export default QuestionsDetail;