export interface TagData{
    name: string
    posts: number
}

export const getTagData = async (name:string):Promise<TagData> => {
    return {
        name,
        posts: 10
    }
}