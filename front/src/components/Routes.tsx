import Header from 'components/sections/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'components/home/Home';
import Playground from './Playground';

const Routes = () => {
    return(
    <>
        <Header />
        <BrowserRouter>
            <Switch>
                <Route path="/playground" exact component={Playground} />
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    </>
    )
}

export default Routes;