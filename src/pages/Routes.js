import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setFavourites } from '../store/actions';
import DetailPage from './DetailPage';

const LandingPage = lazy(() => import('./LandingPage')) 
const Headers = lazy(() => import('../components/header/Header'))

const Routes = ({ setFavourites }) => {

  useEffect(() => {
    // eslint-disable-next-line
    const favouritesExist = localStorage.getItem('fav');
    if(favouritesExist){
      setFavourites(JSON.parse(favouritesExist))
    }
    // eslint-disable-next-line
  },[])

    return (
      <Suspense fallback={<div>....loading</div>}>
        <Headers />
        <div style={{ padding: '10em 12em'}}>
          <Router>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/detail/:id" component={DetailPage} />
          </Router>
        </div>
      </Suspense>
    );
}

export default connect(null, {setFavourites}) (Routes)
