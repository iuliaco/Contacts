import React from 'react';
import ReactDOM from 'react-dom';
import { Form, DatePicker, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { registerUser } from '../actions/authentication';

class Register extends React.Component {
  state = {
    confirmDirty: false,
    value: 0,
    errors: {}

  };

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'birthdate': fieldsValue['birthdate'].format('YYYY-MM-DD')};
        console.log('Received values of form: ', values);
        this.props.registerUser(values, this.props.history);

      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
}

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
            rules: [ {
              required: true, message: 'Please input your username',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: 'Please input your name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Surname"
        >
          {getFieldDecorator('surname', {
            rules: [ {
              required: true, message: 'Please input your surname!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender"
        >
         {getFieldDecorator('gender')(
        <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={0}>Male</Radio>
        <Radio value={1}>Female</Radio>
            
      </RadioGroup>
          )}
      </FormItem>
        <FormItem
          {...formItemLayout}
          label="Birthdate"
        >
          {getFieldDecorator('birthdate', config)(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
          Or  <Link to={`/login`}> <Button type="primary"> login now! </Button></Link>
 
        </FormItem>
      </Form>
      
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default withRouter(connect(mapStateToProps,{ registerUser })(Form.create()(Register)));
