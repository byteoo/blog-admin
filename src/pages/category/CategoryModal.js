import {Component, PureComponent} from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

class CategoryModal extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // 显示madal
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  //隐藏madal
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  //确认
  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
        console.log(`modal：${values}`);
      }
    });
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {record, type} = this.props;
    const {name, desc} = record;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 12},
    };
    console.log(this.props.form);

    return (
      <span>
          <span onClick={this.showModelHandler}>
              {children}
          </span>
          <Modal
            title={type === 'edit' ? '编辑' : '新增'}
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
          >
              <Form horizontal='true' onSubmit={this.okHandler}>
                {/* 分类名称 */}
                <FormItem
                  {...formItemLayout}
                  label="分类名称"
                >
                  {
                    getFieldDecorator('name', {
                      initialValue: name,
                    })(<Input/>)
                  }
                  </FormItem>

                {/* 分类描述 */}
                <FormItem
                  {...formItemLayout}
                  label="分类描述"
                >
                  {
                    getFieldDecorator('desc', {
                      initialValue: desc,
                    })(<Input/>)
                  }
                  </FormItem>
              </Form>
          </Modal>
      </span>
    );
  }
}

export default Form.create()(CategoryModal);
