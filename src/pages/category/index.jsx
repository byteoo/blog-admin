import React, {PureComponent, Fragment} from 'react';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, Col, Form, Input, Popconfirm, Row, Table} from "antd";
import moment from 'moment';
import {Link} from "umi";
import {connect} from "dva";
import CategoryModal from "@/pages/category/CategoryModal";


const {Search} = Input;
const FormItem = Form.Item;

class Category extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      desc: '',
      // categoryList: [
      //   {
      //     name: '1',
      //     desc: '2'
      //   },
      //   {
      //     name: '3',
      //     desc: '4'
      //   },
      //   {
      //     name: '5',
      //     desc: '6'
      //   },
      //   {
      //     name: '7',
      //     desc: '8'
      //   }
      // ],
      columns: [
        {
          title: '分类名称',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '操作',
          render: (text, record) => (
            <span>
              <CategoryModal type='edit' record={record} onOk={this.handleUpdate}>
                <a style={{marginRight: 16}}>编辑</a>
              </CategoryModal>
              <Popconfirm title="是否删除？" onConfirm={() => this.handleDelete(record.id)}>
                <Link to="">删除</Link>
              </Popconfirm>
            </span>
          ),
        },
      ],
    };
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/fetch'
    })
  }

  handleUpdate = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/update',
      payload: record
    })
  }

  handleDelete = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/delete',
      payload: id
    })
  }

  handleCreate = (record) => {
    const {dispatch} = this.props;
    console.log(`JSON.stringify(record)${  record}`)
    console.log(JSON.stringify(record))
    dispatch({
      type: 'category/create',
      payload: record
    })
  }


  render() {
    const {category} = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className="">
            <div>
              <Form layout="inline" style={{marginBottom: '20px'}}>
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                  <Col md={24} sm={24}>
                    <span>
                      <Search style={{width: '160px'}}/>
                    </span>
                    <span>
                      <CategoryModal type='create' record={{}} onOk={this.handleCreate}>
                        <Button
                          style={{marginTop: '3px', marginLeft: '20px'}}
                          type="primary"
                        >
                        新增
                        </Button>
                      </CategoryModal>

                  </span>
                  </Col>
                </Row>
              </Form>
            </div>
            <Table
              loading={this.state.loading}
              rowKey={record => record._id}
              columns={this.state.columns}
              bordered
              dataSource={category.categoryList}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
      ;
  }
}

export default connect(({category}) => ({
  category,
}))(Category);

