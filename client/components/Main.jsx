import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import Routes from './../routes';

const { Header, Footer, Sider, Content } = Layout;


export default class Main extends React.Component {
constructor(props) {
    super(props);

  }

render() {
    return (
<Layout>
    <Header className="alb">Ei bine eu vreau un header dar nuj ce sa pun in el deci daca ai idei pls ms</Header>
<Layout style={{minHeight:'100%'}}>
        <Content className="cont">
            <Routes/>
        </Content>
      </Layout>
      <Footer className="alb">Nu am nicio idee cum sa fac footerul sa stea at the bottom of the page aflu si remediez</Footer>
    
</Layout>
    );
  }
}