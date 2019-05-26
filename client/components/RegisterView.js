import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
export default class RegisterView extends React.Component {
constructor(props) {
    super(props);

  }

render() {
    return (
  <Layout>
  <Row>  <Col span={12} offset={6}>   <Register/>  </Col> </Row>
</Layout>
    );
  }
}