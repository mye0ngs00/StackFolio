import { Box } from 'components/material/Box';
import PostPreview from 'components/common/PostPreview';
import Text from 'components/material/Text';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PostData } from 'db/Post';
import { getTopicData } from 'db/Topic';
import media from 'styles/media';

const TopicWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "title title"
        "a b"
        "c d";
    ${media.desktop`
        grid-template-columns: 1fr;
        grid-template-areas: 
        "title"
        "a"
        "b"
        "c"
        "d";
    `}
    & > div:first-child {
        grid-area: title;
        height: 30px;
        margin-bottom: -20px;
    }
    gap: 30px;
    margin-top: 30px;
`;

interface TopicProps{
    title: string
}

const Topic = ({title}:TopicProps) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostData[]>([]);
    useEffect(()=>{
        (async () => {
            const postsData = await getTopicData(title);
            setPosts(postsData.posts);
            setLoading(false);
        })();
    },[])
    return (
        <Box transparent>
            <TopicWrapper>
                <Text 
                    justifyContent="flex-start" 
                    bold
                    fontSize={24}>
                    {title}
                </Text>
                {
                    loading ? <>Loading...</>
                    :
                    posts.map((post:PostData, idx:number) =>(
                        <PostPreview key={idx} {...post} />
                    ))
                }
            </TopicWrapper>
        </Box>
    );
}

export default Topic;