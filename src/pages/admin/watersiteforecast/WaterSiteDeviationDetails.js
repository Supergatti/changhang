// 水位误差分析（分析详情页面）

import React, { Component, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "./WaterSiteDeviationDetails.css";

import {
  Form,
  Divider,
  Descriptions,
  Button,
  Table,
  Radio,
  Col,
  Row,
  message,
} from "antd";
import { forecastByIdlist, resultAnalysis } from "../../../services/products";
import { forecastByIdlistMan } from "../../../services/project";
import { dateFormat } from "../../../utils/commonUtil";
const { Item } = Form;

export default class WaterSiteDeviationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      averageCoefficient: 0,
      averageDeviationNub: 0,
      averageDeviationThan: 0,
      averageDeviationNubMan: 0,
      averageDeviationThanMan: 0,
      averageCoefficientMan: 0,

      deviationType: 1,
      pid: this.props.match.params.id,
      pName: this.props.match.params.name,
      echartsData: [],
      option01: {},
    };
  }
  columns = [
    {
      title: "预测时间",
      key: "forecastTime",
      dataIndex: "forecastTime",
      align: "center", //头部单元格和列内容水平居中
      render: (text) => {
        return dateFormat("YYYY-mm-dd HH", new Date(text));
      },
    },
    {
      title: "真实水位",
      key: "measureWater",
      dataIndex: "measureWater",
      align: "center", //头部单元格和列内容水平居中
      render: (_, { measureWater }) => (
        <>{measureWater == null ? "--" : measureWater}</>
      ),
    },
    {
      title: "人工预测水位",
      key: "forecastLevelMan",
      dataIndex: "forecastLevelMan",
      align: "center", //头部单元格和列内容水平居中
      render: (_, { forecastLevelMan }) => (
        <>{forecastLevelMan == null ? "--" : forecastLevelMan}</>
      ),
    },
    {
      title: "模型预测水位",
      key: "forecastLevel",
      dataIndex: "forecastLevel",
      align: "center", //头部单元格和列内容水平居中
      render: (_, { forecastLevel }) => (
        <>{forecastLevel == null ? "--" : forecastLevel}</>
      ),
    },
  ];
  //页面初始化
  componentDidMount = () => {
    //初始化表格
    this.initTableData(1);
    //初始化图谱数据
    this.initEchartsData(1);
  };
  // 初始化图谱 (模型与真实)
  initEchartsData = async (deviationType) => {
    const forecastId = this.state.pid;
    const res = await forecastByIdlist({ forecastId, deviationType });
    if (res.code == 200) {
      this.setState({
        option01: {
          title: {
            x: "center",
            y: "7px",
            text: "预测水位图",
          },
          legend: {
            top: "middle", // 图例距离上边的距离 top(置顶显示)   middle（居中显示） bottom（最底部显示）
            orient: "vertical", // 图例的布局朝向
            align: "left",
            x: "right",
            y: " center",
            itemWidth: 30, // 图例标记的图形宽度
            textStyle: {
              color: "#02A7F0",
            }, // 图例字体颜色
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              animation: false,
            },
          },
          xAxis: {
            type: "time",
            axisLabel: {
              interval: 1,
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
              show: false,
            },
            max: function (value) {
              // console.log("最大值", value.max + value.max * 0.3);
              const maxv = value.max + value.max * 0.3;
              return maxv;
            },
            min: function (value) {
              // console.log("最小值", value.min + value.min * 0.3);
              return value.min - value.min * 0.3;
            },
          },
          series: [
            {
              name: "模型预测水位",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: res.content.returnList,
            },
            {
              name: "真实水位",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: res.content.returnListWar,
            },
          ],
        },
      });
    }
  };
  // t图表 （每日8时）
  initEcharts = async (deviationType) => {
    const forecastId = this.state.pid;
    const res = await forecastByIdlistMan({ forecastId, deviationType });
    if (res.code == 200) {
      let forecastLevel = [] // 预测水位
      let forecastLevelMan = [] // 人工预测水位
      let measureWater = [] // 真实水位
      for (let index = 0; index < res.content.returnListWar.length; index++) {
        let data =  res.content.returnListWar[index]
        forecastLevel.push({name:data.name,value:[data.name,data.forecastLevel]})
        forecastLevelMan.push({name:data.name,value:[data.name,data.forecastLevelMan]})
        measureWater.push({name:data.name,value:[data.name,data.measureWater]})
      }
      this.setState({
        option01: {
          title: {
            x: "center",
            y: "7px",
            text: "预测水位图",
          },
          legend: {
            top: "middle", // 图例距离上边的距离 top(置顶显示)   middle（居中显示） bottom（最底部显示）
            orient: "vertical", // 图例的布局朝向
            align: "left",
            x: "right",
            y: " center",
            itemWidth: 30, // 图例标记的图形宽度
            textStyle: {
              color: "#02A7F0",
            }, // 图例字体颜色
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              animation: false,
            },
          },
          xAxis: {
            type: "time",
            axisLabel: {
              interval: 1,
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
              show: false,
            },
            max: function (value) {
              // console.log("最大值", value.max + value.max * 0.3);
              const maxv = value.max + value.max * 0.3;
              return maxv;
            },
            min: function (value) {
              // console.log("最小值", value.min + value.min * 0.3);
              return value.min - value.min * 0.3;
            },
          },
          series: [
            {
              name: "模型预测水位",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: forecastLevel,
            },
            {
              name: "人工预测水位",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: forecastLevelMan,
            },
            {
              name: "真实水位",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: measureWater,
            },
          ],
        },
      });
    }
  };

  //返回请求事件
  return = (e) => {
    this.props.history.go(-1);
  };
  //点击维度请求事件
  changeName = (e) => {
    this.setState({
      deviationType: e.target.value,
    });
    this.initTableData(e.target.value); //表格表格数据加载
    if (e.target.value == 2) {
      this.initEcharts(e.target.value)
    } else {
      this.initEchartsData(e.target.value); //加载图谱中数据
    }
  };
  //模型与真实（table表格数据）
  initTableData = async (deviationType) => {
    const id = this.state.pid;
    const res = await resultAnalysis({ deviationType, id });
    if (res.code == 200) {
      this.setState({
        data: res.content.dateList,
        averageCoefficient: res.content.averageCoefficient,
        averageDeviationNub: res.content.averageDeviationNub,
        averageDeviationThan: res.content.averageDeviationThan,
        averageDeviationNubMan: res.content.averageDeviationNubMan,
        averageDeviationThanMan: res.content.averageDeviationThanMan,
        averageCoefficientMan: res.content.averageCoefficientMan,
      });
    } else {
      message.error(res.message);
    }
  };

  render() {
    const deviationTypeList = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
    ];
    const {
      data,
      option01,
      deviationType,
      averageCoefficient,
      averageDeviationNub,
      averageDeviationThan,
      averageDeviationNubMan,
      averageDeviationThanMan,
      averageCoefficientMan,
      pName,
    } = this.state;
    return (
      <div>
        {/* <Form > */}
        <Row>
          <Col span={8}>
            <div>
              <div
                style={{
                  flex: "auto",
                  overflow: "hidden",
                  fontWeight: "bold",
                  fontSize: 16,
                  lineHeight: 1.5715,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  height: 48,
                }}
              >
                分析维度
              </div>
              <Radio.Group
                onChange={(event) => this.changeName(event)}
                value={deviationType}
              >
                <Radio value={1}>逐时</Radio>
                <Radio value={2}>每日8时</Radio>
                <Radio value={3}>每日最低水位</Radio>
                <Radio value={4}>每日最高水位</Radio>
              </Radio.Group>
            </div>
          </Col>
          <Col span={14}>
            {/* 模型预测指标 */}
            <Descriptions column={4} title="预测指标">
              <Descriptions.Item>模型预测指标</Descriptions.Item>
              <Descriptions.Item label="绝对误差值">
                {averageDeviationNub}
              </Descriptions.Item>
              <Descriptions.Item label="均方根误差值">
                {averageDeviationThan}
              </Descriptions.Item>
              <Descriptions.Item label="确定性系数">
                {averageCoefficient}
              </Descriptions.Item>
            </Descriptions>
            {/* 人工预测指标 */}
            <Descriptions column={4}>
              <Descriptions.Item>人工预测指标</Descriptions.Item>
              <Descriptions.Item label="绝对误差值">
                {averageDeviationNubMan == undefined
                  ? "--"
                  : averageDeviationNubMan}
              </Descriptions.Item>
              <Descriptions.Item label="均方根误差值">
                {averageDeviationThanMan == undefined
                  ? "--"
                  : averageDeviationThanMan}
              </Descriptions.Item>
              <Descriptions.Item label="确定性系数">
                {averageCoefficientMan == undefined
                  ? "--"
                  : averageCoefficientMan}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={2}>
            <Button onClick={() => this.return()}>返回 {pName}</Button>
          </Col>
        </Row>
        <Divider />
        {/* </Form> */}
        <Table
          bordered
          columns={this.columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 200 }}
        />
        <Divider />
        <ReactEcharts
          option={option01}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{ height: "280px", border: "0" }}
          onChartReady={this.onChartReadyCallback}
        />
        {/* <ResultAnalysisTable  deviationType = {deviationType} id = {pid} /> */}
      </div>
    );
  }
}
