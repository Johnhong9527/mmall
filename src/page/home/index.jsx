import React from 'react';
import { Button, PageHeader } from 'antd';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';

export default class Home extends React.Component {
  getUser() {
    console.log(7);
    fetch('/api/statistic', {
      method: 'GET'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }
  render() {
    return (
      <div className="page-wrapper">
        {/*
        <PageTitle title="首页" />
        <PageHeader title="首页"/>
        */}
        <PageTitle title="首页" />
        <Button
          onClick={e => {
            this.getUser(e);
          }}
          type="primary"
        >
          get
        </Button>
      </div>
    );
  }
}
