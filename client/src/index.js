import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import ProductCards from './components/ProductCards/ProductCards';
import FormProduct from './components/FormProduct/FormProduct';
import FormCategory from './components/FormCategory/FormCategory';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       <React.Fragment>
           <Route path="/" component={SearchBar} />
           <Route exact path="/" component={App}  />
            <Route exact path="/products" component={ProductCards} />
            <Route exact path="/formProduct" component={FormProduct} />
            <Route exact path="/formCategory" component={FormCategory} />
        </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
