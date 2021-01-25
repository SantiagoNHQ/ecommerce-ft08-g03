import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import ProductCards from "./components/ProductCards/ProductCards";
import FormProduct from "./components/FormProduct/FormProduct";
import FormCategory from "./components/FormCategory/FormCategory";
import Product from "./components/Product/product";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossOrigin="anonymous"
    />
    <BrowserRouter>
      <React.Fragment>
        <Route path="/products/:id" component={Product} />
        <Route path="/" component={SearchBar} />
        <Route exact path="/" component={App} />
        <Route exact path="/products" component={() => <ProductCards /* categoria={"Vinos"} */ data={axios.get(`http://localhost:3001/product`)}/>} />
        <Route exact path="/formProduct" component={FormProduct} />
        <Route exact path="/formCategory" component={FormCategory} />
        <Route path="/product/:id" component={Product} />
      </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
