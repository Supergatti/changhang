import React, { Component } from 'react'
import { Form,  Button,  DatePicker, Table, Select, Upload,message ,Pagination
  ,Modal
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import "./BasFileUpload.css"
import { basFileUploadPage } from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
import waterLevel from "../../../static/waterLevel.xlsx"
const { RangePicker } = DatePicker;
const { Item } = Form;
const { Dragger } = Upload;

const columns =[
  {
    title: '业务附件名',
    dataIndex: 'fileName',
    key: 'fileName'
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    key: 'updateTime',
    render: text => {
      return dateFormat("YYYY-mm-dd HH:MM:SS",new Date(text))
    }
  },
  {
    title: '入库数量',
    key: 'storeCluecnt',
    dataIndex: 'storeCluecnt',
  },
  {
    title: '文件大小',
    key: 'fileSize',
    dataIndex: 'fileSize',
  },
  {
    title: '状态',
    key: 'statusName',
    dataIndex: 'statusName',
  }
]
export default class BasFileUpload extends Component {
    constructor(props){
      super(props)
      this.state ={
        data:[],
        pagination:{
          defaultPageSize:10,
          current:1,
          total:0
        },
        relationModel:false
      }

    }
    componentDidMount =() => {
      this.initTableData(1,10);
    }
    //初始化表格
    initTableData = async(current,pageNumber) =>{
      const res = await basFileUploadPage({page:current,size:pageNumber})
      if(res.code == 200){
        this.setState({
          data:res.content.records,
          pagination:{
            defaultPageSize:pageNumber,
            current:res.content.current,
            total:res.content.total
          }
        })
      }
    }
    //分页点击时间
    onChangeBankPerson = async(current,pageNumber) =>{
      this.initTableData(current,pageNumber);
    }
    onFinish = (values) => {
        console.log('Success:', values);
    };
    handleCancel = (relationModel) =>{
      if(!relationModel){
        this.initTableData(1,10)
      }
      this.setState({
        relationModel
      })
    }
  render() {
    const props = {
        name: 'file',
        action: '/api/v1/deptwave-system/sys-bas-fie-upload/upload',
        headers: {
          authorization: 'authorization-text',
        },
        showUploadList:true,
        defaultFileList:[],
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log("状态1",info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            console.log("状态2",info.file, info.fileList);
            this.initTableData()
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      const {data} = this.state
      const {defaultPageSize,current,total} = this.state.pagination
    return (
        <div>
            <Button onClick={() => this.handleCancel(true)} type="primary">水位信息导入</Button>
            <Modal title="水位信息导入"
              visible={this.state.relationModel}
              width={600}
              height={600}
              onOk={() =>this.handleCancel(false)}
              onCancel={() =>this.handleCancel(false)}
              footer={[
                <Button key="back" type="primary" onClick={() =>this.handleCancel(false)}>
                  关闭
                </Button>,
              ]}
            >
              <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">请选择测量水位信息表</p>
              <p className="ant-upload-hint">
                <span style={{color:'rgb(243 3 3)'}}>提示：请按照固定文件格式进行数据信息导入</span>
              </p>
            </Dragger>
            <a target="_blank" rel="noopener noreferrer"
              class="ant-upload-list-item-name"
              title="水位历史表模版.xlsx"
              download="waterLevel.xlsx"
              href={waterLevel}>
              下载文件模版.xlsx</a>
              <a className="ant-upload-text" style={{color:'#fff'}} href={waterLevel} download="waterLevel.xlsx">下载</a>
            </Modal>
            <Table className = "TableStyle" columns={columns} dataSource = {data} pagination={false}/>
            <Pagination
                style={{float:'right'}}
                defaultPageSize={defaultPageSize}
                current = {current}
                total = {total}
                onChange = {this.onChangeBankPerson}
            />
        </div>
    )
  }
}
