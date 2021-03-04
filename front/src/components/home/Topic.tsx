import { Box } from 'components/material/Box';
import PostPreview from 'components/common/PostPreview';
import Text from 'components/material/Text';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PostData } from 'db/Post';
import { getTopicData } from 'db/Topic';
import media from 'styles/media';

const TopicWrapper = styled.div`
    width: 100%;
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
    padding: 0 15px;
    gap: 30px;
`;

interface TopicProps{
    title: string
}

// 홈 화면에 노출되는 Topic
// 게시글 미리보기 4개를 담고 있음.
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