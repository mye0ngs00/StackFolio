import { userState } from 'atoms/user';
import MainWrapper from 'components/common/MainWrapper';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Main from './Main';
import Topic from './Topic';
import TopicQuestions from './TopicQuestions';
import TrendTags from './TrendTags';

const HomeWrapper = styled.div`
    & > *:nth-child(n+2){margin-top:30px;}
`
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useRecoilState(userState);

    return (
        <div>
            <Main />
            <MainWrapper>
                <HomeWrapper>
                    <TrendTags tags={["javascript", "c++", "python"]}/>
                    <Topic title="인기 있는 스펙 콘텐츠 TOP" />
                    { user && 
                      <Topic title="내가 가장 관심있어하는 토픽" /> 
                    }
                    <TopicQuestions title="스택폴리오 사용자들이 가장 많이 본 질문" />
                    <TopicQuestions title="답변을 기다리는 질문" />
                </HomeWrapper>
            </MainWrapper>
        </div>
    )
}

export default Home;