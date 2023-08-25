import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form1 from "./Form1";
import Form2 from "./Form2";
import AlanContainer from './AlanContainer';
import { FormProvider, useForm } from 'react-hook-form';

function App(){

  const methods = useForm();

  return(
    <FormProvider {...methods}>
    <Router>
      <Route exact path="/" component={Form1}/>
      <Route exact path="/Form2" component={Form2}/>
      <AlanContainer/>
    </Router>
    </FormProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
