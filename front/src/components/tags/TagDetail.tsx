import MainWrapper from 'components/common/MainWrapper';
import Text from 'components/material/Text';
import { getTagData } from 'db/Tag';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import media from 'styles/media';

const HeadWrapper = styled.div`
    margin-bottom: 45px;
    & > * :first-child{
        margin-bottom: 35px;
    }
    & > * :nth-child(2){
        margin-bottom: 22px;
    }

`;
const BodyWrapper = styled.div`
    display: grid;
    gap:30px;
    grid-template-columns: 1fr 1fr;
    ${media.tablet`
        grid-template-columns: 1fr;
    `}
`


const TagDetail = ({match}:any) => {
    const {params:{id}} = match;
    const [{name, posts}, setTagData] = useState({
        name: '', posts:0
    })
    useEffect(()=>{
        (async () => {
            const tagData = await getTagData(id);
            setTagData(tagData);
        })();
    }, [id])
    return (
        <MainWrapper>
            <HeadWrapper>
                <Text fontSize={48} left bold >#{name} </Text>
                <Text fontSize={21} left>태그내용 설명 </Text>
                <Text fontSize={16} left>
                    {
                        posts ? 
                        <>{posts}개의 포스트 </>
                        : "포스트가 없습니다."
                    }
                </Text>
            </HeadWrapper>
            <BodyWrapper>
            </BodyWrapper>
        </MainWrapper>
    )
}

export default TagDetail;