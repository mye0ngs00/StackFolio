import React, { useEffect, useState } from 'react';
import { Box } from 'components/material/Box';
import { PostData } from 'db/Post';
import { getTopicData } from 'db/Topic';
import PostPreview from 'components/common/PostPreview';
import styled from 'styled-components';

const ProfilePosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostData[]>([]);
    useEffect(()=>{
        (async () => {
            const postsData = await getTopicData('');
            setPosts(postsData.posts);
            setLoading(false);
        })();
    },[])
    return (
        <Box direction="column" columnSpace={30}>{
            loading ? <>Loading...</>
            :
            [...posts, ...posts].map((post:PostData, idx:number) =>(
                <PostPreview key={idx} {...post} />
            ))
        }</Box>
    )
}

export default ProfilePosts