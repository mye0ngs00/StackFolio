export interface QuestionData{
    id:string
    author:string
    title: string
    content: string
    likes:number
    views:number
    comments: number
}

export const getQuestionData = async(id:string):Promise<QuestionData> => {
    return {
        id,
        author: 'Admin',
        title: 'How to be a good programmer?',
        content: '알려주세요...',
        likes: 120,
        views: 3902,
        comments: 3
    }
}