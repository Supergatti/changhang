import React, { Component,useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Divider } from 'antd';
import { forecastByIdlist } from "../../../services/products";

import EditableTable from "./EditableTable"



function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}

var data11 = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data11.push(randomData());
}
export default class BasForecastRecordDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            data:[],
            pid:this.props.match.params.id,
            echartsData: [],
            option01 : {},
        }
    }
    
    //页面初始化
    componentDidMount =() => {
        //初始化图谱数据
        this.initEchartsData()
    }
    //初始化图谱
    initEchartsData = async() =>{
        const forecastId = this.state.pid;
        const res = await forecastByIdlist({forecastId})
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
  render() {
    const {pid,option01} = this.state
    //mergedColumns合并列
    return (
      <div>
        <ReactEcharts
            option={option01}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            style={{ height: '280px',border:'0' }}
            onChartReady={this.onChartReadyCallback}
        />
        <Divider />
        <EditableTable forecastId = {pid} />
      </div>
    )
  }
}

