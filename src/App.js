import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import useProfunctorState from '@staltz/use-profunctor-state';
import ResizeObserver from "react-resize-observer";

import MenuBar from './menubar';

import Projects from './states/projects';
import ProjectInfo from './states/project-info';
import About from './states/about';

import { resizeGridItems } from './DynamicGridUtil';

const getStateRender = (prof) => {
  console.log(prof.state);

  switch (prof.state.path) {
    case '/':
      return <Projects {...prof} />;
    case '/projects':
      return <Projects {...prof} />;
    case '/project-info':
      return <ProjectInfo {...prof} />;
    case '/about':
      return <About {...prof} />;
  }
}

function App() {
  const initState = { path: '/', data: {} };
  const appProf = useProfunctorState(initState);
  let history = useHistory();

  const prof = appProf.promap(
    state => state,
    ({ path, data }, state) => ({ ...state, path: path, data: data })
  );

  return (
    <div className="App">
      <ResizeObserver onResize={rect => {
        resizeGridItems();
      }} />


      <MenuBar />
      <div id="App-body">
        <Router>
          <Switch>
            <Route exact path="/">
              <Projects {...prof} />
            </Route>
            <Route path="/project-info">
              <ProjectInfo {...prof} />
            </Route>
            <Route path="/about">
              <About {...prof} />
            </Route>
          </Switch>
        </Router>

        {/* { getStateRender(prof) } */}
      </div>
    </div>
  );
}

export default App;
