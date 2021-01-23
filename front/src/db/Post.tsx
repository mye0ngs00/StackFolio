export interface PostData{
    // tag ids
    tags: string[]
    title: string
    content: string
    thumbnail: string
    timestamp: string
    author: string
    comments: number
    likes: number
}
export const getPostData = async (id:string):Promise<PostData> => {
    return {
        tags: ['javascript', 'c++'],
        title: 'Lorem ipsum',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.`,
        thumbnail:'https://cfnimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2018082719141105121dd55077bc212323473.jpg',
        timestamp: '2021-01-20',
        author: 'swimmie',
        comments: 10,
        likes: 5
    }
}