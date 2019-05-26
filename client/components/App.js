import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Add from './Add'
import data from './../data.json';
import { Card, Tag, Icon, Row, Col,Button, Input} from 'antd';
const Search = Input.Search;
const { Meta } = Card;
import { connect } from 'react-redux';

class App extends React.Component {
constructor(props) {
    super(props);
    console.log(data);
this.state= {
  contacts:[],
  searchresult:[]
}
console.log(this.props)
this.delete = this.delete.bind(this);
}
delete(id){
axios.delete("/user/contacts/"+id)
.then( response => {
  axios.get(`/user/contacts`)
  .then(res => {
    const contacts = res.data;
    console.log(res.data);
    this.setState({ contacts });
    console.log(this.state.contacts);
  })})
.catch(function (error) {
  console.log(error);
});
}
componentDidMount() {
  if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
  }
  axios.get(`/user/contacts`)
  .then(res => {
    const contacts = res.data;
    this.setState({ contacts });
    console.log(this.state.contacts);
  })

}
render() {
  const family= this.state.contacts.filter(contact => contact.cathegory==1);
  const work= this.state.contacts.filter(contact => contact.cathegory==3);
  const friends= this.state.contacts.filter(contact => contact.cathegory==2);
  const other= this.state.contacts.filter(contact => contact.cathegory==4);
let search=[];

  console.log(family);
const nocards= <div className="center" style={{width:'100%', flexDirection:'column' }} ><Icon type="frown-o" style={{ fontSize: 135, color: '#08c' }} /> <h1> No contacts for now </h1></div>;
const cards = this.state.contacts.map((x,i) =>  <Card className="card--content"  key={i}>
        <Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

  <Meta
    title={x.name} />
   <div>
   { x.about!==undefined && <p>{`${x.about}`}</p> }
   { x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
   { x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
   { x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
   { x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
   { x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
   { x.tags.map((tag,i) => 
    <Tag color="cyan" key={i} > {tag} </Tag>
     )}
     </div>
  </Card>
  );

    return (
<div>
<Row><Col span={12} offset={6} className="center"><Search
      placeholder="search a contact"
      onSearch={val => {search= this.state.contacts.filter(contact => contact.name.toLowerCase().includes(val) );console.log(search);this.setState({ searchresult:search });}}
      style={{ width: 200, marginBottom:'5%' }}
    /> </Col> </Row>
    {this.state.searchresult.length !==0 && 
     <div className="card center2">
    {this.state.searchresult.map((x,i) =>  <Card className="card--content"  key={i}>
<Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

<Meta
title={x.name}  />
<div style={{wordWrap:'break-word'}}>
{ x.about!==undefined && <p>{`${x.about}`}</p> }
{ x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
{ x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
{ x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
{ x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
{ x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
{ x.tags.map((tag,i) => 
<Tag color="cyan" key={i} > {tag} </Tag>
)}
</div>
    </Card> )}   
</div> }
<div className="container" style={{padding:'5% 0 '}}>
<Row><Col span={12} offset={6} className="center"><h1>Family</h1></Col></Row>
<div className="card center2">
{family.length==0? nocards
:family.map((x,i) =>  <Card className="card--content"  key={i}>
<Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

<Meta
title={x.name}  />
<div style={{wordWrap:'break-word'}}>
{ x.about!==undefined && <p>{`${x.about}`}</p> }
{ x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
{ x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
{ x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
{ x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
{ x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
{ x.tags.map((tag,i) => 
<Tag color="cyan" key={i} > {tag} </Tag>
)}
</div>
</Card>
)}
</div>
</div>
<div className="container" style={{padding:'5% 0'}}>
<Row><Col span={12} offset={6} className="center"><h1>Friends</h1></Col></Row>
<div className="card center2">
{friends.length==0? nocards
:friends.map((x,i) =>  <Card className="card--content"  key={i}>
<Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

<Meta
title={x.name}  />
<div style={{wordWrap:'break-word'}}>
{ x.about!==undefined && <p>{`${x.about}`}</p> }
{ x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
{ x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
{ x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
{ x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
{ x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
{ x.tags.map((tag,i) => 
<Tag color="cyan" key={i} > {tag} </Tag>
)}
</div>
</Card>
)}
</div>
</div>
<div className="container" style={{padding:'5% 0'}}>
<Row><Col span={12} offset={6} className="center"><h1>Work</h1></Col></Row>
<div className="card center2">
{work.length==0? nocards
:work.map((x,i) =>  <Card className="card--content"  key={i}>
<Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

<Meta
title={x.name} />
<div style={{wordWrap:'break-word'}}>
{ x.about!==undefined && <p>{`${x.about}`}</p> }
{ x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
{ x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
{ x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
{ x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
{ x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
{ x.tags.map((tag,i) => 
<Tag color="cyan" key={i} > {tag} </Tag>
)}
</div>
</Card>
)}
</div>
</div>
<div className="container" style={{padding:'5% 0'}}>
<Row><Col span={12} offset={6} className="center"><h1>Other</h1></Col></Row>
<div className="card center2">
{other.length==0? nocards
:other.map((x,i) =>  <Card className="card--content"  key={i}>
<Icon type="close" className="sus link"  onClick={()=>this.delete(x._id)}/>

<Meta
title={x.name}  />
<div style={{wordWrap:'break-word'}}>
{ x.about!==undefined && <p>{`${x.about}`}</p> }
{ x.age!==undefined && <p>{`Age: ${x.age}`}</p> }
{ x.gender!==undefined && <p>{`Gender: `} {x.gender===true? `woman`:`man`}</p> }
{ x.company!==undefined && <p>{`Company: ${x.company}`}</p> }
{ x.phone!==undefined && <p>{`Phone: ${x.phone}`}</p> }
{ x.email!==undefined && <p>{`Email: ${x.email}`}</p> }
{ x.tags.map((tag,i) => 
<Tag color="cyan" key={i} > {tag} </Tag>
)}
</div>
</Card>
)}
</div>
</div>
<Row><Col span={12} offset={6} className="center"><span style={{margin:"0 1% 0 0"}}>or</span> <Link to={`/addcard`}>    <Button type="primary">add a contact</Button></Link> </Col></Row>
 
</div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(App));