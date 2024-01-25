import React, { Component,useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Form, Divider,  Descriptions,  Button, Table, Col, Row,message} from 'antd';
import {resultAnalysisOther,forecastByIdlistOther } from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
const { Item } = Form;

export default class WaterSiteDeviationOtherDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            data:[],
            averageCoefficient:0,
            averageDeviationNub:0,
            averageDeviationThan:0,
            deviationType:1,
            pid:this.props.match.params.id,
            echartsData: [],
            option01 : {},
        }
    }
     columns = [
        {
          title: '预测时间',
          key: 'forecastTime',
          dataIndex: 'forecastTime',
          width: '10%',
          render: text => {
            return dateFormat("YYYY-mm-dd HH",new Date(text))
          }
        },{
          title: '预测水位',
          key: 'forecastLevel',
          dataIndex: 'forecastLevel',
          width: '10%',
          editable: true,
        },{
          title: '实际水位',
          key: 'measureWater',
          dataIndex: 'measureWater',
          width: '10%',
          editable: true,
        },{
          title: '相对误差',
          key: 'deviationThan',
          dataIndex: 'deviationThan',
          width: '10%',
          editable: true,
        },{
          title: '绝对误差',
          key: 'deviationNub',
          dataIndex: 'deviationNub',
          width: '10%',
          editable: true,
        }
    ];
    //页面初始化
    componentDidMount =() => {
        //初始化表格
        this.initTableData(2);
        //初始化图谱数据
        this.initEchartsData(2)
    }
    //初始化图谱
    initEchartsData = async(deviationType) =>{
        const forecastId = this.state.pid;
        const res = await forecastByIdlistOther({forecastId,deviationType})
        if(res.code == 200){
            this.setState({
                option01:{
                    title: {
                        x: 'center',
                        y: '7px',
                        text: '预测水位图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: { 
                        type: 'time',
                        axisLabel: {
                            interval:1
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        },
                        max:function(value) {
                            console.log("最大值",value.max);
                            return value.max;
                        },
                        min:function(value) {
                            console.log("最小值",value.min);
                            return value.min;
                        }
                    },
                    series: [{
                        name: '预测水位',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: res.content.returnList,
                    },{
                        name: '历史水位',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: res.content.returnListWar
                    }],
                }
            })
        }
    }
    //返回请求事件
    return = e => {
     this.props.history.go(-1)
    }
    initTableData = async(deviationType) =>{
        const id = this.state.pid
        const res = await resultAnalysisOther({deviationType,id})
        if(res.code == 200){
            this.setState({
                data: res.content.dateList,
                averageCoefficient:res.content.averageCoefficient,
                averageDeviationNub:res.content.averageDeviationNub,
                averageDeviationThan:res.content.averageDeviationThan
            })
           // setData(res.content.records)
        }else{
            message.error(res.message)
        }
    }
    //点击维度请求事件
    changeName = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        deviationType:e.target.value
      })
      //表格表格数据加载
      this.initTableData(e.target.value);
       //加载图谱中数据
      this.initEchartsData(e.target.value);
     }
  render() {
    const {data,option01,deviationType,averageCoefficient,averageDeviationNub,averageDeviationThan} = this.state
    return (
      <div>
        <Form >
                <Row>
                    {/* <Col span={12}>
                        <Item label = "误差分析维度">
                            <Radio.Group onChange={event => this.changeName(event)} value={deviationType}>
                            <Radio value={1}>逐时</Radio>
                            <Radio value={2}>每日8时</Radio>
                            <Radio value={3}>每日最低水位</Radio>
                            <Radio value={4}>每日最高水位</Radio>
                          </Radio.Group>
                        </Item>
                    </Col> */}
                    <Col span={12}>
                    <Descriptions title="预测指标">
                        <Descriptions.Item label="绝对误差值">{averageDeviationNub}</Descriptions.Item>
                        <Descriptions.Item label="相对误差值">{averageDeviationThan}</Descriptions.Item>
                        <Descriptions.Item label="确定性系数">{averageCoefficient}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={10}>
                    </Col>
                    <Col span={2}>
                        <Button  onClick={() =>this. return()}>返回</Button>
                    </Col>
                </Row>
              <Divider />
        </Form>
        <Table  columns={this.columns} dataSource = {data} pagination={false} scroll={{ y: 200 }}/>
        <Divider />
        <ReactEcharts
            option={option01}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            style={{ height: '280px',border:'0' }}
            onChartReady={this.onChartReadyCallback}
        />
        {/* <ResultAnalysisTable  deviationType = {deviationType} id = {pid} /> */}
      </div>
    )
  }
}

