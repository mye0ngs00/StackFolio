import { userState } from 'atoms/user';
import { Box } from 'components/material/Box';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import SearchField from './SearchField';
import Topic from './Topic';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useRecoilState(userState);

    return (
        <>
            <SearchField />
            <Topic title="요즘 뜨는 트렌드" />
            <Topic title="최신 포스트" />
        </>
    )
}

export default Home;