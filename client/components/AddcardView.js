import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
import Addcard from './Addcard.js';

export default class AddcardView extends React.Component {
constructor(props) {
    super(props);

  }

render() {
    return (
<Layout>
   <Row>  <Col span={12} offset={6}>   <Addcard/>  </Col> </Row>
</Layout>
    );
  }
}