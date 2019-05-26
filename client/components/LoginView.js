import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
import Login from './Login';

export default class LoginView extends React.Component {
constructor(props) {
    super(props);

  }

render() {
    return (
   <Row>  <Col span={12} offset={6}>   <Login/>  </Col> </Row>

    );
  }
}