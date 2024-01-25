import React, { Component } from 'react'
import { Form,  Button, Table, Select, Spin ,Pagination,message
  ,Modal,Upload
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { basWaterSiteForecastOther} from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
import waterLevelother from "../../../static/waterLevelOther.xlsx"
const { Option } = Select
const { Item } = Form;
const { confirm } = Modal;
const { Dragger } = Upload;

export default class WaterSiteForecastOther extends Component {
    constructor(props){
      super(props)
      this.state ={
        spinning:false,
        children:[],
        data:[],
        pagination:{
          defaultPageSize:10,
          current:1,
          total:0
        },
        relationModel:false,
        param:{

        }
      }
    }
    columns =[
      {
        title: '导入文件名称',
        dataIndex: 'fileName',
        key: 'fileName',
      },
      {
        title: '文件大小(kb)',
        key: 'fileSize',
        dataIndex: 'fileSize'
      },{
        title: '导入时间',
        key: 'creatorTime',
        dataIndex: 'creatorTime',
        render: text => {
            return dateFormat("YYYY-mm-dd HH:MM:SS",new Date(text))
        }
      },{
        title: '导入站点数',
        key: 'forecastSiteSize',
        dataIndex: 'forecastSiteSize'
      },{
        title: '操作',
        key: 'forecastResult',
        dataIndex: 'forecastResult',
        render: (text, record) => (
          <div>
          <Button type="primary" onClick={() => { this.opop(record) }}>详情</Button>&nbsp;&nbsp;&nbsp;
          </div>
          
        ),
      }
    ]
    //详情请求事件
    opop = e => {
      this.props.history.push({ pathname: `/WaterSiteForecastOtherDetails/${e.id}` })
    }
    //页面初始化
    componentDidMount =() => {
      //this.initSelectData();
      this.initTableData(10,1)
    }
    //初始化表格
    initTableData = async(pageNumber,current) =>{
      const res = await basWaterSiteForecastOther({page:current,size:pageNumber})
      if(res.code == 200){
        this.setState({
          data:res.content.records,
          pagination:{
            defaultPageSize:pageNumber,
            defaultCurrent:res.content.current,
            total:res.content.total
          }
        })
      }
    }
    handleCancel = (relationModel) =>{
      if(!relationModel){
        this.initTableData(10,1)
      }
      this.setState({
        relationModel
      })
    }
      //点击分页请求方法
    onChangeBankPerson = async(current,pageNumber) =>{
      this.initTableData(pageNumber,current);
      
    } 
  render() {
    const props = {
      name: 'file',
      action: '/api/v1/deptwave-system/bas-water-forecast-other-m/import',
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
          message.success("数据导入成功");
          this.initTableData(10,1)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
      const {data,children,spinning} = this.state
      const {defaultPageSize,defaultCurrent,total} = this.state.pagination
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
              href={waterLevelother}>
              下载文件模版.xlsx</a>
              <a className="ant-upload-text" style={{color:'#fff'}} href={waterLevelother} download="waterLevel.xlsx">下载</a>
          </Modal>
          <Spin spinning ={spinning} tip="Loading...">
            <Table  columns={this.columns} dataSource = {data} pagination={false} scroll={{ y: 500 }}/>
            <Pagination  
                style={{float:'right'}}  
                defaultPageSize={defaultPageSize} 
                current = {defaultCurrent}
                total = {total} 
                onChange = {this.onChangeBankPerson}
            />
          </Spin>
        </div>
    )
  }
}