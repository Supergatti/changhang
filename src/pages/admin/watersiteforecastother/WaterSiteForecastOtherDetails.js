import React, { Component } from 'react'
import { Form,  Button, Table, Spin ,Pagination
  ,Modal,Icon
} from 'antd';
import { basWaterLevelForecastOther} from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
const { Item } = Form;
const { confirm } = Modal;

export default class WaterSiteForecastOtherDetails extends Component {
    constructor(props){
      super(props)
      this.state ={
        spinning:false,
        pid:this.props.match.params.id,
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
        title: '预测结果',
        key: 'forecastResult',
        dataIndex: 'forecastResult',
        render: (text, record) => (
          <div>
          <Button type="primary" onClick={() => { this.opop(record) }}>分析</Button>&nbsp;&nbsp;&nbsp;
          </div>
          
        ),
      }
    ]
    //详情请求事件
    opop = e => {
      this.props.history.push({ pathname: `/WaterSiteDeviationOtherDetails/${e.id}` })
    }
     //返回请求事件
     return = e => {
      this.props.history.go(-1)
    }
    //页面初始化
    componentDidMount =() => {
      //this.initSelectData();
      this.initTableData(10,1)
    }
    //初始化表格
    initTableData = async(pageNumber,current) =>{
      const res = await basWaterLevelForecastOther({page:current,size:pageNumber,forecastMainId:this.state.pid})
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
      //点击分页请求方法
    onChangeBankPerson = async(current,pageNumber) =>{
      this.initTableData(pageNumber,current);
      
    } 
  render() {
      const {data,spinning} = this.state
      const {defaultPageSize,defaultCurrent,total} = this.state.pagination
    return (
        <div>
          <Spin spinning ={spinning} tip="Loading...">
          <Button style={{ float: "right"}} onClick={() => { this.return() }}>返回</Button>
            <Table  columns={this.columns} dataSource = {data} pagination={false} scroll={{ y: 420 }}/>
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