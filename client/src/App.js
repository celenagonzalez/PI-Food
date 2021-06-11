import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import Page from './components/page/Page';
import RecetasHome from './components/home/Home';
import DetailRece from './components/detail/Detail';
import Name from './components/name/name';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={Page}/>
      <Route exact path='/home' component={RecetasHome}/>
      <Route path="/detail" component={DetailRece} />
      <Route path= "/Busqueda" component={Name}/>

    </React.Fragment>
  );
}

export default App;
