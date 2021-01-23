import Header from 'components/sections/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'components/home/Home';
import Playground from './Playground';
import React from 'react';
import Tags from './tags/TagIndex';
import Search from './search/Search';
import { Box } from './material/Box';
import styled from 'styled-components';
import Questions from './questions/QuestionsIndex';

const Wrapper = styled.div`
    width:min(1470px, 100%);
    padding: 10px;
`

const Routes = () => {
    return(
    <BrowserRouter>
        <Header />
        <Box transparent>
            <Wrapper>
                <Switch>
                    <Route path="/playground" exact component={Playground} />
                    <Route path="/" exact component={Home} />
                    <Route path="/search/:keyword" component={Search} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/questions" component={Questions} />
                </Switch>
            </Wrapper>
        </Box>
    </BrowserRouter>
    )
}

export default Routes;