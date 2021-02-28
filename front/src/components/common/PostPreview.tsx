import { getPostData, PostData } from 'db/Post';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/material/Text';
import Tag from './Tag';
import { Box } from 'components/material/Box';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import media from 'styles/media';
import { useHistory } from 'react-router-dom';
import previewStyle from '../../styles/previewStyle'

const Wrapper = styled.div`
    ${previewStyle}
    display: grid;
    grid-template-rows: 40px 40px 60px 16px 55px;
    grid-template-columns: 70% 30%;
    grid-template-areas: 
        "tags tags"
        "title img"
        "contents img"
        "info img"
        "author likes";
    & > div:first-child{grid-area:tags;}
    & > div:nth-child(2){grid-area:img;}
    & > div:nth-child(3){grid-area:title;}
    & > div:nth-child(4){grid-area:contents;}
    & > div:nth-child(5){grid-area:info;}
    & > div:nth-child(6){grid-area:author;}
    & > div:nth-child(7){grid-area:likes;}
    max-width: 100%;
    padding: 10px 10px 5px 10px;
    ${media.phone`
        grid-template-rows: 200px 40px 60px 16px 55px;
        grid-template-areas: 
            "img img"
            "title title"
            "contents contents"
            "info info"
            "author likes";
        & > div:first-child{display:none;}
    `}
`;
const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;
    & > *:nth-child(n+2){
        margin-left: 10px
    }
`
const Image = styled.img`
    grid-area: img; 
    width: 100%;
    height: 100%;
`
const Avatar = styled.img`
    background-color: #ddd;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 2.5px;
`
const ProfilePreview = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    gap: 10px;
`

const PostPreview = (props:PostData) => {
    const history = useHistory();
    const {tags, title, content, thumbnail, timestamp, author, likes, comments} = props;
    return (
        <Wrapper>
            <TagsWrapper>
                {tags.map(tag => <Tag key={tag} name={tag}/>)}
            </TagsWrapper>
            <Image src={thumbnail} alt="img"/>
            <Text bold left fontSize={21}>{title}</Text>
            <Text>{content.length > 150 ? content.slice(0,150)+'...' : content}</Text>
            <Text left bold >{timestamp} &nbsp; &nbsp;<BiCommentDetail/> &nbsp; {comments}</Text>
            <ProfilePreview>
                <Avatar onClick={()=>history.push(`/@${author}`)} />
                <Text bold left>{author}</Text>
            </ProfilePreview>
            <Box transparent right>
                <AiOutlineLike size={20}/> &nbsp;
                <Text bold> {likes} </Text> &nbsp;
            </Box>
        </Wrapper>
    )
}

export default PostPreview;