import { Box } from 'components/material/Box';
import {Title, Subtitle, Contents} from 'components/material/Text';
import { getUserProfileData, User_Profile } from 'db/User_Profile';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: min(786px, 100%);
`
const HeadWrapper = styled.div`
    display: grid;
    margin: 50px 0 80px 0;
    height: 200px;
    grid-template-columns: 200px auto;
    grid-template-rows: 40% 40% 20%;
    column-gap: 20px;
    grid-template-areas:
        "img name"
        "img rank"
        "img followers";
`
const Image = styled.img`
    grid-area: img; 
    width: 100%;
    height: 100%;
    border-radius: 50%;
`
const AboutWrapper = styled.div`
    margin-bottom: 50px;
    & > div:nth-child(2){
        padding:20px;
        min-height: 100px;
    }
`
const InfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
`


const Profile = ({match}:any) => {
    const {params:{id}} = match;
    const [{username, avatar, bio, about}, setUserProfile] = useState<User_Profile>(
    {
        id,
        created_at: "",
        updated_at: "",
        username: "",
        bio: "",
        about: "",
        avatar: "",
        social_links: {},
        user: {
            id,
            created_at: "",
            updated_at: "",
            provider: "google",
            social_id: "",
            email: "",
            is_verified: false
        }
    });
    useEffect(()=>{
        (async () => {
            const userProfile = await getUserProfileData(id);
            setUserProfile(userProfile);
        })();
    },[id])
    return (
        <Box transparent><Wrapper>
            <HeadWrapper>
                <Image src={avatar}/>
                <Title alignItems="flex-end">{username}</Title>
                <Subtitle> Gold 3 </Subtitle>
                <Subtitle>{bio}</Subtitle>
            </HeadWrapper>
            <AboutWrapper>
                <Subtitle> 자기소개 </Subtitle>
                <Box left alignItems="flex-start">{about}</Box>
            </AboutWrapper>
            <InfoWrapper>
                <Subtitle>벨로그 제목</Subtitle>
                <Box transparent left>
                    <Contents> VELOG TITLE</Contents>
                    <Contents> VELOG TITLE</Contents>
                </Box>
            </InfoWrapper>
        </Wrapper></Box>
    )
}

export default Profile;