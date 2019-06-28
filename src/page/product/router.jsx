/*
 * @Author: Johnhong9527
 * @Date:   2019-05-30 13:17:01
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 15:27:21
 */
import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// page
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetailPage from 'page/product/index/detail.jsx';
import ProductCategory from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';
export default class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product/index" component={ProductList} />
        <Route path="/product/save/:pid?" component={ProductSave} />
        <Route path="/product/detail/:pid" component={ProductDetailPage} />
        <Route path="/product-category/index/:categoryId?" component={ProductCategory} />
        <Route path="/product-category/add/:categoryId?" component={CategoryAdd} />
        <Redirect exact from="/product" to="/product/index" />
        <Redirect exact from="/product-category" to="/product-category/index" />
      </Switch>
    );
  }
}
