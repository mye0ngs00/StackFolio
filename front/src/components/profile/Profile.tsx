import MainWrapper from 'components/common/MainWrapper';
import { Box } from 'components/material/Box';
import { Button } from 'components/material/Button';
import { Number } from 'components/material/Number';
import {Title, Subtitle, Contents} from 'components/material/Text';
import { getUserProfileData, User_Profile } from 'db/User_Profile';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from 'styles/media';
import ProfileIntroduce from './Profile_Introduce';
import ProfilePosts from './Profile_Posts';
import ProfileSeries from './Profile_Series';
import Treemap from './Treemap';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 480px auto;
    ${media.tablet`
        grid-template-columns: 100%;
        gap: 30px;
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
    width: max(75%, 360px);
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
    const [tabs, setTabs] = useState(0);
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
    <MainWrapper>
        <Wrapper>
            {/* Profile */}
            <Box direction="column" justifyContent="flex-start">
                <HeadWrapper>
                    <Image src={avatar}/>
                    <Title alignItems="flex-end">{username}</Title>
                    <Contents alignItems="flex-start">{bio}</Contents>
                </HeadWrapper>
                <NumbersWrapper>
                    <CountBox title="?????????" value={300}/>
                    <CountBox title="?????????" value={19}/>
                    <CountBox title="?????????" value={30}/>
                    <CountBox title="?????????" value={348000}/>
                </NumbersWrapper>
                <About alignItems="flex-start" left>{about}</About>
                <Box style={{width:"100%"}} transparent left>
                    <Subtitle bold>A</Subtitle>
                    <Subtitle bold>B</Subtitle>
                    <Subtitle bold>C</Subtitle>
                    <Subtitle bold>D</Subtitle>
                </Box>
                <Treemap/>
            </Box>
            <Box transparent direction="column" justifyContent="flex-start" columnSpace={30}>
                <Box transparent rowSpace={50}>
                    <Button color="ghost" fontSize={24} onClick={()=>setTabs(0)}> ???</Button>
                    <Button color="ghost" fontSize={24} onClick={()=>setTabs(1)}> ????????? </Button>
                    <Button color="ghost" fontSize={24} onClick={()=>setTabs(2)}> ???????????? </Button>
                </Box>
                {
                    tabs === 0 ? 
                        <ProfilePosts/> 
                    : tabs === 1 ? 
                        <ProfileSeries/> 
                    :   <ProfileIntroduce/>
                }
            </Box>
        </Wrapper>
    </MainWrapper>
    )
}

export default Profile;