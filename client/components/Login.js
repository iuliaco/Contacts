import React from 'react';
import ReactDOM from 'react-dom';
import { Alert,Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import { withRouter, Link } from 'react-router-dom';

 class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          errors: {}
        }
      }
      componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
           this.props.loginUser(values,this.props.history);
            }

          })
        };
      
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
    <div className="center">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
      
          {this.props.errors.message !==undefined && <Alert message={`${this.props.errors.message}`} type="error" showIcon />}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={`/register`}> <Button type="primary">register now!</Button></Link>
        </FormItem>
      </Form>
    </div>
        );
      }
    }
    const mapStateToProps = (state) => ({
      auth:state.auth,
      errors: state.errors
  })
    export default withRouter(connect(mapStateToProps, { loginUser })(Form.create()(Login)));
