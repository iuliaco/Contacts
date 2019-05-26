import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Radio, InputNumber, Tag, Tooltip } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import axios from 'axios';

const RadioGroup = Radio.Group;
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

 class Addcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          errors: {},
          tags: [],
          inputVisible: false,
          inputValue: '',
        }
      }
      componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }
    //for tags
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      }

      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }

      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }

      saveInputRef = input => this.input = input;

      //endfortags

      handleSubmit = (e) => {
        e.preventDefault();
        const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];}
    console.log(tags);
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.tags=tags;
            console.log('Received values of form: ', values);
            axios.post(`/user/contacts`, values)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/');

      })
          }
        });
      };
    render()
    {
        const { getFieldDecorator } = this.props.form;
        const { tags, inputVisible, inputValue } = this.state;

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
        return (
    <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
                  {...formItemLayout}
                  label="Name"
                  >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name!' }],
          })(
            <Input  placeholder="Name" />
          )}
        </FormItem>
        <FormItem
                  {...formItemLayout}
                  label="Company"
                  >
          {getFieldDecorator('company')(
            <Input   placeholder="Company" />
          )}
        </FormItem>
        <FormItem
                  {...formItemLayout}
                  label="About"
                  >
          {getFieldDecorator('about')(
            <TextArea placeholder="About that person" autosize />          )}
        </FormItem>
        <FormItem
                  {...formItemLayout}
                  label="Phone"
                  >
          {getFieldDecorator('phone')(
            <Input   placeholder="Phone number" />
          )}
        </FormItem>
        <FormItem
                  {...formItemLayout}
                  label="Email"
                  >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!'
            }]})(
            <Input   placeholder="Email" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender"
        >
         {getFieldDecorator('gender')(
        <RadioGroup >
        <Radio value={0}>Male</Radio>
        <Radio value={1}>Female</Radio>
            
      </RadioGroup>
          )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="Cathegory"
        >
         {getFieldDecorator('cathegory')(
        <RadioGroup>
        <Radio value={1}>Family</Radio>
        <Radio value={2}>Friends</Radio>
        <Radio value={3}>Work</Radio>
        <Radio value={4}>Other</Radio>

      </RadioGroup>
          )}
      </FormItem>
      <FormItem 
                {...formItemLayout}
                label="Age"
                >
 {getFieldDecorator('age')(
      <InputNumber min={1} max={100} defaultValue={18}  />)}
      </FormItem>
      <FormItem 
                {...formItemLayout}
                label="tags"
                >
  {getFieldDecorator('tags')(
    <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>


  )}

</FormItem>
      <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>

      </Form>
    </div>
        );
      }
    }
    const mapStateToProps = (state) => ({
      auth:state.auth
  })
    export default withRouter(connect(mapStateToProps)(Form.create()(Addcard)));