import { Box } from 'components/material/Box';
import { Number } from 'components/material/Number';
import {Title, Subtitle, Contents} from 'components/material/Text';
import { getUserProfileData, User_Profile } from 'db/User_Profile';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from 'styles/media';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 480px auto;
    ${media.tablet`
        grid-template-columns: 100%;
    `}
`
const HeadWrapper = styled.div`
    display: grid;
    margin: 25px 0 80px 0;
    height: 150px;
    grid-template-columns: 150px auto;
    grid-template-rows: 60% 40%;
    column-gap: 20px;
    grid-template-areas:
        "img name"
        "img followers";
`
const Image = styled.img`
    grid-area: img; 
    width: 100%;
    height: 100%;
    border-radius: 50%;
`
const NumbersWrapper = styled.div`
    display: grid;
    margin-bottom: 60px;
    width: max(70%, 360px);
    grid-template-columns: repeat(4, 1fr);
`
interface CountBoxProps{
    title: string
    value: number
}
const CountBox = ({title, value}: CountBoxProps) => (
    <Box transparent direction="column">
        <Subtitle>{title}</Subtitle>
        <Number fontSize={24} value={value}/>
    </Box>
)
const About = styled(Box)`
    background-color: ${({theme}) => theme.mainBackground};
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 10px;
    word-wrap: break-word;
    min-height: 50px;
`
const InfoWrapper = styled.div`
    display: grid;
    width: 100%;
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
        <Wrapper>
            <Box direction="column">
                <HeadWrapper>
                    <Image src={avatar}/>
                    <Title alignItems="flex-end">{username}</Title>
                    <Contents alignItems="flex-start">{bio}</Contents>
                </HeadWrapper>
                <NumbersWrapper>
                    <CountBox title="팔로워" value={300}/>
                    <CountBox title="팔로잉" value={19}/>
                    <CountBox title="포스트" value={30}/>
                    <CountBox title="스코어" value={348000}/>
                </NumbersWrapper>
                <About alignItems="flex-start" left>{about}</About>
                <Box style={{width:"100%"}} transparent left>
                    <Subtitle bold>A</Subtitle>
                    <Subtitle bold>B</Subtitle>
                    <Subtitle bold>C</Subtitle>
                    <Subtitle bold>D</Subtitle>
                </Box>
                <Title style={{height:"300px"}}>
                    TreeMap
                </Title>
            </Box>
        </Wrapper>
    )
}

export default Profile;