import { getPostData, PostData } from 'db/Post';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/material/Text';
import Tag from './Tag';
import { Box } from 'components/material/Box';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 40px 120px 55px;
    max-width: 100%;
    box-shadow: 2px 2px 10px grey;
    padding: 10px;
`;
const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;
    & > *:nth-child(n+2){
        margin-left: 10px
    }
`
const BodyWrapper = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 40px 60px 16px;
    row-gap: 5px;
    grid-template-areas:
        "a img"
        "b img"
        "c img"
        "d e";
`
const Image = styled.img`
    grid-area: img; 
    width: 100%;
    height: 100%;
`
const Avatar = styled.img`
    background-color: #ddd;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin: 2.5px;
`
const ProfilePreview = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
`

const PostPreview = (props:PostData) => {
    const {tags, title, content, thumbnail, timestamp, author, likes, comments} = props;
    return (
        <Wrapper>
            <TagsWrapper>
                {tags.map(tag => <Tag key={tag} name={tag}/>)}
            </TagsWrapper>
            <BodyWrapper>
                <Text bold left>{title}</Text>
                <Text>{content.length > 150 ? content.slice(0,150)+'...' : content}</Text>
                <Text left bold >{timestamp} &nbsp; &nbsp;<BiCommentDetail/> &nbsp; {comments}</Text>
                <Image src={thumbnail} alt="img"/>
                <ProfilePreview>
                    <Avatar />
                    <Text bold left>{author}</Text>
                </ProfilePreview>
                <Box transparent right>
                    <AiOutlineLike size={20}/> &nbsp;
                    <Text bold> {likes} </Text> &nbsp;
                </Box>
            </BodyWrapper>
        </Wrapper>
    )
}

export default PostPreview;