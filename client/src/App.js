import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import Page from './components/page/Page';
import RecetasHome from './components/home/Home';
import DetailRece from './components/detail/Detail';
import Name from './components/name/name';
import FilterTypes from './components/filter/filter';
import Form from './components/formulario/formulario';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={Page}/>
      <Route exact path='/home' component={RecetasHome}/>
      <Route path="/detail" component={DetailRece} />
      <Route path= "/Busqueda" component={Name}/>
      <Route path= "/typesMatch" component={FilterTypes}/>
      <Route path = "/formulario" component={Form} />

    </React.Fragment>
  );
}

export default App;
