import { QuestionData } from "./Question";

export interface TopicQuestionsData {
    topic: string
    questions: QuestionData[]
}

export const getTopicQuestionsData = async (id:string):Promise<TopicQuestionsData> => {
    return {
        topic:id,
        questions: [
            {
                id,
                author: 'Admin',
                title: 'How to be a good programmer?',
                content: '알려주세요...',
                likes: 120,
                views: 3902,
                comments: 3
            },
            {
                id,
                author: 'Messi',
                title: 'How to be a good Soccer Player?',
                content: '알려주세요...',
                likes: 1390,
                views: 23090,
                comments: 90
            },
            {
                id,
                author: 'Son',
                title: 'How to be a good programmer?',
                content: '알려주세요...',
                likes: 125,
                views: 339,
                comments: 32
            },
            {
                id,
                author: 'Park',
                title: 'About React',
                content: 'It does not work...',
                likes: 12,
                views: 688,
                comments: 6
            }
        ]
    }
}