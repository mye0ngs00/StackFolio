import React from 'react';

const QuestionDetails = ({match}:any) => {
    const {params:{id}} = match;
    return (
        <>
            {id}
        </>
    )
}

export default QuestionDetails;