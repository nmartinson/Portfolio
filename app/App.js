import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory, browserHistory } from 'react-router'
// import { createHashHistory } from 'history'
// const appHistory = useRouterHistory(createHashHistory)()
import routes from './config/routes';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-90607881-1');


function logPageView() {
  ReactGA.set({ page: window.location.hash });
  ReactGA.pageview(window.location.hash);
}

ReactDOM.render(
<Router routes={routes} onUpdate={logPageView} history={browserHistory} >{routes}</Router>,  document.getElementById('app')
)