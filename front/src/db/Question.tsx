export interface QuestionData{
    id:string
    author:string
    question: string
    likes:number
    views:number
}

export const getQuestionData = async(id:string):Promise<QuestionData> => {
    return {
        id,
        author: 'For You',
        question: 'How to be a good programmer?',
        likes: 20,
        views: 3902
    }
}