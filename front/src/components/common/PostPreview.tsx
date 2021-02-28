import { getPostData, PostData } from 'db/Post';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/material/Text';
import Tag from './Tag';
import { Box } from 'components/material/Box';
import { AiOutlineLike } from 'react-icons/ai';
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
        "footer footer";
    & > div:first-child{grid-area:tags;}
    & > div:nth-child(2){grid-area:img;}
    & > div:nth-child(3){grid-area:title;}
    & > div:nth-child(4){grid-area:contents;}
    & > div:nth-child(5){grid-area:info;}
    & > div:nth-child(6){grid-area:footer;}
    max-width: 100%;
    padding: 15px 25px 25px 25px;
    ${media.phone`
        grid-template-rows: 200px 40px 60px 16px 55px;
        grid-template-areas: 
            "img img"
            "title title"
            "contents contents"
            "info info"
            "footer footer";
        & > div:first-child{display:none;}
    `}
`;
const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;
    & > *:nth-child(n+2){
        margin-left: 5px
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
    width: 45px;
    height: 45px;
`
const ProfilePreview = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    gap: 10px;
    float: left;
`
const WrapperFooter = styled.div`
    width: 100%;
    height: 100%;
    & > div:first-child{padding-top: 10px;}
    & > div:nth-child(2){padding-top: 20px;}
`
const PostPreview = (props:PostData) => {
    const history = useHistory();
    const {tags, title, content, thumbnail, timestamp, author, likes, comments} = props;

    // TODO [임시] 조상노드에서 map으로 변환 작업 필요.
    const mappedTimestamp: Array<string> = timestamp.split('-')
    //
    // TODO bookmarks db추가 필요
    const bookmarks = 12
    //
    // TODO color theme지정 필요
    // TODO ProfilePreview, Box 부모 컴포넌트로 wrapper footer 만들어서 감싸기 필요
    return (
        <Wrapper>
            <TagsWrapper>
                {tags.map(tag => <Tag key={tag} small color={'secondary'} name={tag}/>)}
            </TagsWrapper>
            <Image src={thumbnail} alt="img"/>
            <Text bold left fontSize={21}>{title}</Text>
            <Text>{content.length > 150 ? content.slice(0,150)+'...' : content}</Text>
            <Text left color={'#909090'} font-size={16}>
                {`${mappedTimestamp[0]}년 ${mappedTimestamp[1]}월 ${mappedTimestamp[2]}일`} &nbsp; {comments}개의 댓글
            </Text>
            <WrapperFooter>
                <ProfilePreview>
                    <Avatar onClick={()=>history.push(`/@${author}`)} />
                    <Text left>{author}</Text>
                </ProfilePreview>
                <Box transparent right>
                    <AiOutlineLike size={20}/> &nbsp;
                    <Text color={'#909090'}> {likes} </Text> &nbsp;
                    <Text color={'#909090'} rowSpace={10}> {bookmarks} </Text>
                </Box>
            </WrapperFooter>
        </Wrapper>
    )
}

export default PostPreview;