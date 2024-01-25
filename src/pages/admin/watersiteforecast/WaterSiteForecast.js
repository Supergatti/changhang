import React, { Component } from 'react'
import { Form, Divider,  Button,  DatePicker, Table, Select, Col, Row, Spin,message ,Pagination
  ,Modal,Icon
} from 'antd';
import { basWaterSiteForecast ,queryDataByTypeCode,addbasWaterLevelForecast,delWaterLevelForecast} from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
const { Option } = Select
const { Item } = Form;
const { confirm } = Modal;

export default class WaterSiteForecast extends Component {
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
        title: '预测站点名称',
        dataIndex: 'forecastSiteName',
        key: 'forecastSiteName',
      },
      {
        title: '预测时间',
        key: 'forecastTime',
        dataIndex: 'forecastTime',
        render: text => {
          return dateFormat("YYYY-mm-dd HH",new Date(text))
        }
      },{
        title: '创建时间',
        key: 'creatorTime',
        dataIndex: 'creatorTime',
        render: text => {
            return dateFormat("YYYY-mm-dd HH:MM:SS",new Date(text))
        }
      },{
        title: '操作',
        key: 'forecastResult',
        dataIndex: 'forecastResult',
        render: (text, record) => (
          <div>
          <Button type="primary" onClick={() => { this.execl(record) }}>导出</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={() => { this.opop(record) }}>详情</Button>&nbsp;&nbsp;&nbsp;
          </div>
          
        ),
      }
    ]
    //详情请求事件
    opop = e => {
      this.props.history.push({ pathname: `/WaterSiteForecastDetails/${e.id}` })
    }
    //查看请求事件
    execl = e => {
        window.open(
          `/api/v1/deptwave-system/bas-water-site-forecast/excel/${e.id}`,
         )
    }
    //页面初始化
    componentDidMount =() => {
      //this.initSelectData();
      this.initTableData(10,1)
    }
    //初始化表格
    initTableData = async(pageNumber,current) =>{
      const res = await basWaterSiteForecast({page:current,size:pageNumber})
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
      //初始化下拉框
    initSelectData = async() =>{
        const res = await queryDataByTypeCode({typeCode:'site_name'})
        console.log("site_name",res);
        if(res.code == 200){
          this.setState({
            children:res.content
          })
        }
      }
      //点击分页请求方法
    onChangeBankPerson = async(current,pageNumber) =>{
      this.initTableData(pageNumber,current);
      
    } 
    //选择站点信息
    handleChange = (value,data) =>{
        this.setState({
            forecastSite:value
          })
    }
    //时间框点击获取值
    onChange = (value, dateString)=> {
        this.setState({
            forecastTime:value
          })
    }
  render() {
      const {data,children,spinning} = this.state
      const {defaultPageSize,defaultCurrent,total} = this.state.pagination
    return (
        <div>
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