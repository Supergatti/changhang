// 人工预测水位
import React, { Component } from "react";
import ReactEcharts from "echarts-for-react"; // echarts图表
import { dateFormat } from "../../../utils/commonUtil"; // el-table 时间（水位时间）

import moment from "moment";
import "moment/locale/zh-cn"; // Ant Design 时间选择器 初始化默认时间
import {
  get7WaterForecastAnalysisList,
  get7WaterForecastAnalysisListForChart,
  ListMan,
  ForChartMan,
  get7WaterForecastAnalysisListFormat,
  get7WaterForecastAnalysisListManFormat,
} from "../../../services/project"; //  封装的Ajax请求

import { basInfo } from "../../../services/project";

import "./SevenDays.css";
import {
  Form,
  Divider,
  Button,
  Col,
  Row,
  DatePicker,
  Table,
  message,
  Select,
} from "antd";
const { Option } = Select;
const { Item } = Form;

// el-table 表格渲染数据   7天人工预测水位对比分析
const ManualForecast = [
  {
    title: "水位时间",
    key: "measureTime",
    dataIndex: "measureTime",
    align: "center", //头部单元格和列内容水平居中
  },
  {
    title: "T-7天预测",
    key: "t7",
    dataIndex: "t7",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t7 }) => <>{t7 == null ? "--" : t7}</>,
  },
  {
    title: "T-6天预测",
    key: "t6",
    dataIndex: "t6",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t6 }) => <>{t6 == null ? "--" : t6}</>,
  },
  {
    title: "T-5天预测",
    key: "t5",
    dataIndex: "t5",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t5 }) => <>{t5 == null ? "--" : t5}</>,
  },
  {
    title: "T-4天预测",
    key: "t4",
    dataIndex: "t4",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t4 }) => <>{t4 == null ? "--" : t4}</>,
  },
  {
    title: "T-3天预测",
    key: "t3",
    dataIndex: "t3",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t3 }) => <>{t3 == null ? "--" : t3}</>,
  },
  {
    title: "T-2天预测",
    key: "t2",
    dataIndex: "t2",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t2 }) => <>{t2 == null ? "--" : t2}</>,
  },
  {
    title: "T-1天预测",
    key: "t1",
    dataIndex: "t1",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t1 }) => <>{t1 == null ? "--" : t1}</>,
  },
  {
    title: "真实水位",
    key: "measureWater85",
    dataIndex: "measureWater85",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { measureWater85 }) => (
      <>{measureWater85 == null ? "--" : measureWater85}</>
    ),
  },
  {
    title: "均方根误差",
    key: "deviationThan",
    dataIndex: "deviationThan",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { deviationThan }) => (
      <>{deviationThan == null ? "--" : Math.sqrt(deviationThan).toFixed(2)}</>
    ),
  },
  {
    title: "绝对误差",
    key: "deviationNub",
    dataIndex: "deviationNub",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { deviationNub }) => (
      <>{deviationNub == null ? "--" : deviationNub}</>
    ),
  },
];
// 7天模型预测水位对比分析
const Modelcolumns = [
  {
    title: "水位时间",
    key: "measureTime",
    dataIndex: "measureTime",
    align: "center", //头部单元格和列内容水平居中
  },

  {
    title: "T-6天预测",
    key: "t6",
    dataIndex: "t6",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t6 }) => <>{t6 == null ? "--" : t6}</>,
  },
  {
    title: "T-5天预测",
    key: "t5",
    dataIndex: "t5",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t5 }) => <>{t5 == null ? "--" : t5}</>,
  },
  {
    title: "T-4天预测",
    key: "t4",
    dataIndex: "t4",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t4 }) => <>{t4 == null ? "--" : t4}</>,
  },
  {
    title: "T-3天预测",
    key: "t3",
    dataIndex: "t3",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t3 }) => <>{t3 == null ? "--" : t3}</>,
  },
  {
    title: "T-2天预测",
    key: "t2",
    dataIndex: "t2",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t2 }) => <>{t2 == null ? "--" : t2}</>,
  },
  {
    title: "T-1天预测",
    key: "t1",
    dataIndex: "t1",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t1 }) => <>{t1 == null ? "--" : t1}</>,
  },
  {
    title: "T天预测",
    key: "t",
    dataIndex: "t",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { t }) => <>{t == null ? "--" : t}</>,
  },
  {
    title: "真实水位",
    key: "measureWater85",
    dataIndex: "measureWater85",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { measureWater85 }) => (
      <>{measureWater85 == null ? "--" : measureWater85}</>
    ),
  },
  {
    title: "均方根误差",
    key: "deviationThan",
    dataIndex: "deviationThan",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { deviationThan }) => (
      <>{deviationThan == null ? "--" : Math.sqrt(deviationThan).toFixed(2)}</>
    ),
  },
  {
    title: "绝对误差",
    key: "deviationNub",
    dataIndex: "deviationNub",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { deviationNub }) => (
      <>{deviationNub == null ? "--" : deviationNub}</>
    ),
  },
];

export default class OtherWaterLevel extends Component {
  constructor() {
    super();
    this.state = {
      Modeldata: [], // el-table 数据源 (模型)
      ModelNub: {
        averageCoefficient: "--", //确定性系数
        averageDeviationNub: "--", //绝对误差
        averageDeviationThan: "--", //均方根
      },
      artificialData: [], //人工数据
      artificialNub: {
        averageCoefficient1: "--", //确定性系数
        averageDeviationNub1: "--", //绝对误差
        averageDeviationThan1: "--", //均方根
      },

      param: {
        measureTimeStart: "",
        measureTimeEnd: "",
      },
      showtime: "",
      TshowTime: "", // T 代表什么
      Modeloption01: {},
      artificialoption01: {},
      optionSite: [], // 站点下拉
      siteName: "", // 站点名称
    };
  }

  // render 后调用，可以获取DOM
  componentDidMount = () => {
    const nowDate = parseInt((new Date().getTime() / 1000).toString()); // 当前时间
    this.TimeProcessing(nowDate);
    this.basInfo();
  };

  // 站点下拉
  basInfo = async () => {
    this.setState({ optionSite: ["万州"] })
    // const res = await basInfo();
    // this.setState({
    //   optionSite: res.content,
    // });

  };
  // 获取选中时间的处理
  TimeProcessing(item) {
    const nowDate = item; // 时间戳
    // let startTime = nowDate - (nowDate % 86400) - 3600 * 8; // 当前
    // console.log(startTime, "现在的传递的时间戳");
    let startTime = nowDate - (nowDate % 86400); // 昨天09:00:00 时间戳

    let ShowTime = nowDate - (nowDate % 86400) + 3600;

    let endTime = startTime + 3600 * 24; // 第二天8点的时间戳
    this.setState({
      showtime: dateFormat("YYYY-mm-dd HH:MM:SS", new Date(ShowTime * 1000)), // 昨天09:00:00 时间戳
      TshowTime: dateFormat("YYYY-mm-dd", new Date(ShowTime * 1000)),
      param: {
        measureTimeStart: dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          new Date(ShowTime * 1000)
        ), // 开始时间
        measureTimeEnd: dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          new Date(endTime * 1000)
        ), // 结束时间
      },
    });
  }

  // 人工数据 （预测指标）
  ListMan = async () => {
    this.setState({
      artificialNub: {
        averageDeviationNub1: "--", // 绝对误差值
        averageDeviationThan1: "--", // 均方误差值
        averageCoefficient1: "--", // 确定性系数
      },
    });
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    // let res = await ListMan({
    //   measureTimeStart,
    //   measureTimeEnd,
    //   siteName,
    // });
    let res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": {
        "averageDeviationThan": 0.33,
        "averageDeviationNub": 0.29,
        "averageCoefficient": "--",
        "dateList": [
          {
            "measureTime": "2024-01-06 08",
            "siteName": "万州站",
            "measureWater85": 166.71,
            "deviationNub": 0.29,
            "deviationThan": 0.1118,
            "t1": 166.77,
            "t2": 166.78,
            "t3": 166.97,
            "t4": 166.99,
            "t5": 167.08,
            "t6": 167.23,
            "t7": 167.18
          }
        ]
      }
    }
    console.log(res, " 7天水位人工预测对比");
    if (res.code == 200) {
      let meanSquare = "--";
      if ((res.content.dateList[0] ?? "") !== "") {
        meanSquare = Math.sqrt(res.content.dateList[0].deviationThan).toFixed(
          2
        ); // toFixed 四舍五入
      }
      this.setState({
        artificialNub: {
          averageDeviationNub1: res.content.averageDeviationNub, // 绝对误差值
          averageDeviationThan1: meanSquare, // 均方误差值
          averageCoefficient1: res.content.averageCoefficient, // 确定性系数
        },
      });
    }
  };
  // 7天人工表格数据
  get7WaterForecastAnalysisListManFormat = async () => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    this.setState({
      artificialData: [],
    });
    const res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": [
        {
          "measureTime": "2024-01-06 08",
          "siteName": "万州站",
          "measureWater85": 166.71,
          "deviationNub": 0.29,
          "deviationThan": 0.1118,
          "t1": 166.77,
          "t2": 166.78,
          "t3": 166.97,
          "t4": 166.99,
          "t5": 167.08,
          "t6": 167.23,
          "t7": 167.18
        }
      ]
    };
    if (res.code == 200) {
      this.setState({
        artificialData: res.content, // table 表格数据
      });
    }
  };
  //初始化图谱 （七天水位预测对比图）人工
  artificialinitEchartsData = async (deviationType) => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    // const res = await ForChartMan({
    //   measureTimeStart,
    //   measureTimeEnd,
    //   siteName,
    // });
    const res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": {
        "returnList": [
          {
            "date": "2024-01-06 08",
            "measureLevel": 166.71,
            "T_2": 166.78,
            "T_1": 166.77,
            "T_4": 166.99,
            "T_3": 166.97,
            "T_6": 167.23,
            "T_5": 167.08,
            "T_7": 167.18
          }
        ]
      }
    };
    //   const res = {
    //     "returnList": [
    //         {
    //             "date": "2024-01-06 08",
    //             "measureLevel": 166.71,
    //             "T_2": 166.78,
    //             "T_1": 166.77,
    //             "T_4": 166.99,
    //             "T_3": 166.97,
    //             "T_6": 167.23,
    //             "T_5": 167.08,
    //             "T_7": 167.18
    //         }
    //     ]
    // }
    console.log(res);
    if (res.code == 200) {
      let forecastxAxis = [];
      let historyxAxis = [];
      // let residuals = forecastxAxis.map((forecast, index) => forecast - historyxAxis[index]);
      let residuals = [];
      let Xdata = ["T_7", "T_6", "T_5", "T_4", "T_3", "T_2", "T_1"];
      let xAxisData = [
        "T-7天预测",
        "T-6天预测",
        "T-5天预测",
        "T-4天预测",
        "T-3天预测",
        "T-2天预测",
        "T-1天预测",
      ];
      Xdata.forEach((element) => {
        for (const key in res.content.returnList[0]) {
          if (key == element) {
            forecastxAxis.push(res.content.returnList[0][key]);
            historyxAxis.push(res.content.returnList[0].measureLevel);
            residuals.push((res.content.returnList[0][key] - res.content.returnList[0].measureLevel > 0 ? res.content.returnList[0][key] - res.content.returnList[0].measureLevel : -res.content.returnList[0][key] + res.content.returnList[0].measureLevel) / res.content.returnList[0].measureLevel)
          }
        }
        console.log(residuals);
      });
      this.setState({
        artificialoption01: {
          title: {
            x: "center",
            text: "7天人工预测水位对比图",
            textStyle: {
              color: "#555",
              fontWeight: 400,
              fontSize: "14",
            },
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
            data: xAxisData,
            // type: "time",
            // axisLabel: {
            //   interval: 1,
            // },
            // splitLine: {
            //   show: false,
            // },
          },
          yAxis: [
            {
              type: "value",
              boundaryGap: [0, "100%"],
              splitLine: {
                show: false,
              },
              max: function (value) {
                // console.log("最大值", value.max + value.max * 0.3);
                const maxv = value.max + value.max * 0.003;
                return maxv.toFixed(2);
              },
              min: function (value) {
                // console.log("最小值", value.min + value.min * 0.3);
                const minv = value.min - value.min * 0.003;
                return minv.toFixed(2);
                // return value.min;
              },
            },
            {
              type: "value",
              boundaryGap: [0, "100%"],
              splitLine: {
                show: false,
              },
              max: function (value) {
                let maxResidual = Math.max(residuals);console.log(maxResidual);
                return maxResidual + maxResidual * 0.1
                
              },
              // min: function (value) {
              //   const minv = value.min - value.min * 0.3;
              //   return minv.toFixed(2);
              // },
              // max:0.004,
              // max:
              min: 0,
            }
          ],
          series: [
            {
              name: "预测水位",
              type: "bar",
              showSymbol: false,
              hoverAnimation: false,
              data: forecastxAxis,
            },
            {
              name: "真实水位",
              type: "bar",
              showSymbol: false,
              hoverAnimation: false,
              data: historyxAxis,
            },
            {
              name: "残差",
              type: "line",
              yAxisIndex: 1,// 指定使用次坐标轴
              showSymbol: false,
              hoverAnimation: false,
              data: residuals,
            },
          ],
        },
      });
    } else {
      let forecastxAxis = [];
      let historyxAxis = [];
      let Xdata = ["T_7", "T_6", "T_5", "T_4", "T_3", "T_2", "T_1"];
      let xAxisData = Xdata.map((item) => {
        // console.log(item);
        item = item.replace("_", "-");
        // console.log("item,", item);
        return item;
      });
      this.setState({
        artificialoption01: {
          title: {
            x: "center",
            text: "7天人工预测水位对比图",
            textStyle: {
              color: "#555",
              fontWeight: 400,
              fontSize: "14",
            },
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
            data: xAxisData,
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
              show: false,
            },
            max: function (value) {
              // console.log("最大值", value.max + value.max * 0.3);
              const maxv = value.max + value.max * 0.003;
              return maxv;
            },
            min: function (value) {
              // console.log("最小值", value.min + value.min * 0.3);
              return value.min - value.min * 0.003;
              // return value.min;
            },
          },
          series: [
            {
              name: "预测水位",
              type: "bar",
              showSymbol: false,
              hoverAnimation: false,
              data: forecastxAxis,
            },
            {
              name: "真实水位",
              type: "bar",
              showSymbol: false,
              hoverAnimation: false,
              data: historyxAxis,
            },
          ],
        },
      });
    }
  };

  // 7天模型表格数据
  get7WaterForecastAnalysisListFormat = async () => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    this.setState({
      Modeldata: [], // table 表格数据
    });
    // const res = await get7WaterForecastAnalysisListFormat({
    //   measureTimeStart,
    //   measureTimeEnd,
    //   siteName,
    // });
    const res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": [
        {
          "measureTime": "2024-01-05 09",
          "siteName": null,
          "measureWater85": 166.79,
          "t": 166.81,
          "t1": 166.83,
          "t2": 166.99,
          "t3": 167.03,
          "t4": 167.12,
          "t5": 167.26,
          "t6": 167.23,
          "deviationNub": 0.25,
          "deviationThan": 0.089
        },
        {
          "measureTime": "2024-01-05 10",
          "siteName": null,
          "measureWater85": 166.78,
          "t": 166.8,
          "t1": 166.82,
          "t2": 167.0,
          "t3": 167.02,
          "t4": 167.12,
          "t5": 167.26,
          "t6": 167.22,
          "deviationNub": 0.25,
          "deviationThan": 0.0925
        },
        {
          "measureTime": "2024-01-05 11",
          "siteName": null,
          "measureWater85": 166.8,
          "t": 166.79,
          "t1": 166.81,
          "t2": 166.99,
          "t3": 167.01,
          "t4": 167.1,
          "t5": 167.25,
          "t6": 167.21,
          "deviationNub": 0.23,
          "deviationThan": 0.0773
        },
        {
          "measureTime": "2024-01-05 12",
          "siteName": null,
          "measureWater85": 166.79,
          "t": 166.79,
          "t1": 166.8,
          "t2": 166.98,
          "t3": 167.01,
          "t4": 167.1,
          "t5": 167.25,
          "t6": 167.22,
          "deviationNub": 0.23,
          "deviationThan": 0.0825
        },
        {
          "measureTime": "2024-01-05 13",
          "siteName": null,
          "measureWater85": 166.8,
          "t": 166.79,
          "t1": 166.81,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.11,
          "t5": 167.25,
          "t6": 167.2,
          "deviationNub": 0.22,
          "deviationThan": 0.0759
        },
        {
          "measureTime": "2024-01-05 14",
          "siteName": null,
          "measureWater85": 166.77,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.23,
          "t6": 167.2,
          "deviationNub": 0.24,
          "deviationThan": 0.0861
        },
        {
          "measureTime": "2024-01-05 15",
          "siteName": null,
          "measureWater85": 166.77,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 167.01,
          "t4": 167.11,
          "t5": 167.24,
          "t6": 167.2,
          "deviationNub": 0.24,
          "deviationThan": 0.0885
        },
        {
          "measureTime": "2024-01-05 16",
          "siteName": null,
          "measureWater85": 166.76,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.21,
          "deviationNub": 0.25,
          "deviationThan": 0.0931
        },
        {
          "measureTime": "2024-01-05 17",
          "siteName": null,
          "measureWater85": 166.76,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.09,
          "t5": 167.24,
          "t6": 167.21,
          "deviationNub": 0.25,
          "deviationThan": 0.0921
        },
        {
          "measureTime": "2024-01-05 18",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.98,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.2,
          "deviationNub": 0.28,
          "deviationThan": 0.1085
        },
        {
          "measureTime": "2024-01-05 19",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.24,
          "t6": 167.22,
          "deviationNub": 0.27,
          "deviationThan": 0.1032
        },
        {
          "measureTime": "2024-01-05 20",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.8,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.1,
          "t5": 167.24,
          "t6": 167.19,
          "deviationNub": 0.28,
          "deviationThan": 0.1065
        },
        {
          "measureTime": "2024-01-05 21",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 167.0,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.19,
          "deviationNub": 0.26,
          "deviationThan": 0.0973
        },
        {
          "measureTime": "2024-01-05 22",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.26,
          "deviationThan": 0.095
        },
        {
          "measureTime": "2024-01-05 23",
          "siteName": null,
          "measureWater85": 166.73,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.95,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.27,
          "deviationThan": 0.099
        },
        {
          "measureTime": "2024-01-06 00",
          "siteName": null,
          "measureWater85": 166.71,
          "t": 166.76,
          "t1": 166.77,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.29,
          "deviationThan": 0.1112
        },
        {
          "measureTime": "2024-01-06 01",
          "siteName": null,
          "measureWater85": 166.7,
          "t": 166.76,
          "t1": 166.77,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.17,
          "deviationNub": 0.29,
          "deviationThan": 0.1144
        },
        {
          "measureTime": "2024-01-06 02",
          "siteName": null,
          "measureWater85": 166.69,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.98,
          "t4": 167.08,
          "t5": 167.22,
          "t6": 167.17,
          "deviationNub": 0.3,
          "deviationThan": 0.1191
        },
        {
          "measureTime": "2024-01-06 03",
          "siteName": null,
          "measureWater85": 166.75,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.96,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.22,
          "t6": 167.17,
          "deviationNub": 0.24,
          "deviationThan": 0.087
        },
        {
          "measureTime": "2024-01-06 04",
          "siteName": null,
          "measureWater85": 166.75,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.98,
          "t3": 166.98,
          "t4": 167.07,
          "t5": 167.22,
          "t6": 167.18,
          "deviationNub": 0.25,
          "deviationThan": 0.0879
        },
        {
          "measureTime": "2024-01-06 05",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.26,
          "deviationThan": 0.0953
        },
        {
          "measureTime": "2024-01-06 06",
          "siteName": null,
          "measureWater85": 166.72,
          "t": 166.76,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.09,
          "t5": 167.23,
          "t6": 167.19,
          "deviationNub": 0.28,
          "deviationThan": 0.1084
        },
        {
          "measureTime": "2024-01-06 07",
          "siteName": null,
          "measureWater85": 166.74,
          "t": 166.78,
          "t1": 166.79,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.24,
          "t6": 167.19,
          "deviationNub": 0.27,
          "deviationThan": 0.0982
        },
        {
          "measureTime": "2024-01-06 08",
          "siteName": null,
          "measureWater85": 166.71,
          "t": 166.77,
          "t1": 166.78,
          "t2": 166.97,
          "t3": 166.99,
          "t4": 167.08,
          "t5": 167.23,
          "t6": 167.18,
          "deviationNub": 0.29,
          "deviationThan": 0.1118
        }
      ]
    };
    if (res.code == 200) {
      this.setState({
        Modeldata: res.content, // table 表格数据
      });
    }
  };
  // 7天模型（预测指标）
  initTableData = async () => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    this.setState({
      ModelNub: {
        averageDeviationNub: "--", // 绝对误差值
        averageDeviationThan: "--", // 均方误差值
        averageCoefficient: "--", // 确定性系数
      },
    });
    // const res = await get7WaterForecastAnalysisList({
    //   measureTimeStart,
    //   measureTimeEnd,
    //   siteName,
    // });
    const res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": {
        "averageDeviationThan": 0.31,
        "averageDeviationNub": 0.26,
        "averageCoefficient": -73.48,
        "dateList": [
          {
            "measureTime": "2024-01-05 09",
            "siteName": null,
            "measureWater85": 166.79,
            "t": 166.81,
            "t1": 166.83,
            "t2": 166.99,
            "t3": 167.03,
            "t4": 167.12,
            "t5": 167.26,
            "t6": 167.23,
            "deviationNub": 0.25,
            "deviationThan": 0.298328677803525954548291565515683032572269439697265625
          },
          {
            "measureTime": "2024-01-05 10",
            "siteName": null,
            "measureWater85": 166.78,
            "t": 166.8,
            "t1": 166.82,
            "t2": 167.0,
            "t3": 167.02,
            "t4": 167.12,
            "t5": 167.26,
            "t6": 167.22,
            "deviationNub": 0.25,
            "deviationThan": 0.304138126514910955844328555031097494065761566162109375
          },
          {
            "measureTime": "2024-01-05 11",
            "siteName": null,
            "measureWater85": 166.8,
            "t": 166.79,
            "t1": 166.81,
            "t2": 166.99,
            "t3": 167.01,
            "t4": 167.1,
            "t5": 167.25,
            "t6": 167.21,
            "deviationNub": 0.23,
            "deviationThan": 0.278028775489156887434916143320151604712009429931640625
          },
          {
            "measureTime": "2024-01-05 12",
            "siteName": null,
            "measureWater85": 166.79,
            "t": 166.79,
            "t1": 166.8,
            "t2": 166.98,
            "t3": 167.01,
            "t4": 167.1,
            "t5": 167.25,
            "t6": 167.22,
            "deviationNub": 0.23,
            "deviationThan": 0.287228132326901419713038876579958014190196990966796875
          },
          {
            "measureTime": "2024-01-05 13",
            "siteName": null,
            "measureWater85": 166.8,
            "t": 166.79,
            "t1": 166.81,
            "t2": 166.98,
            "t3": 167.0,
            "t4": 167.11,
            "t5": 167.25,
            "t6": 167.2,
            "deviationNub": 0.22,
            "deviationThan": 0.27549954627911821258834379477775655686855316162109375
          },
          {
            "measureTime": "2024-01-05 14",
            "siteName": null,
            "measureWater85": 166.77,
            "t": 166.78,
            "t1": 166.79,
            "t2": 166.98,
            "t3": 167.0,
            "t4": 167.1,
            "t5": 167.23,
            "t6": 167.2,
            "deviationNub": 0.24,
            "deviationThan": 0.293428015022424215629825994255952537059783935546875
          },
          {
            "measureTime": "2024-01-05 15",
            "siteName": null,
            "measureWater85": 166.77,
            "t": 166.78,
            "t1": 166.79,
            "t2": 166.97,
            "t3": 167.01,
            "t4": 167.11,
            "t5": 167.24,
            "t6": 167.2,
            "deviationNub": 0.24,
            "deviationThan": 0.29748949561287030274314702182891778647899627685546875
          },
          {
            "measureTime": "2024-01-05 16",
            "siteName": null,
            "measureWater85": 166.76,
            "t": 166.77,
            "t1": 166.8,
            "t2": 166.97,
            "t3": 167.0,
            "t4": 167.1,
            "t5": 167.24,
            "t6": 167.21,
            "deviationNub": 0.25,
            "deviationThan": 0.305122926047847131680867960312752984464168548583984375
          },
          {
            "measureTime": "2024-01-05 17",
            "siteName": null,
            "measureWater85": 166.76,
            "t": 166.78,
            "t1": 166.79,
            "t2": 166.97,
            "t3": 167.0,
            "t4": 167.09,
            "t5": 167.24,
            "t6": 167.21,
            "deviationNub": 0.25,
            "deviationThan": 0.303479818109870347342393870349042117595672607421875
          },
          {
            "measureTime": "2024-01-05 18",
            "siteName": null,
            "measureWater85": 166.73,
            "t": 166.77,
            "t1": 166.8,
            "t2": 166.98,
            "t3": 167.0,
            "t4": 167.1,
            "t5": 167.24,
            "t6": 167.2,
            "deviationNub": 0.28,
            "deviationThan": 0.329393381840012100525427740649320185184478759765625
          },
          {
            "measureTime": "2024-01-05 19",
            "siteName": null,
            "measureWater85": 166.74,
            "t": 166.78,
            "t1": 166.79,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.09,
            "t5": 167.24,
            "t6": 167.22,
            "deviationNub": 0.27,
            "deviationThan": 0.3212475680841802017084773979149758815765380859375
          },
          {
            "measureTime": "2024-01-05 20",
            "siteName": null,
            "measureWater85": 166.73,
            "t": 166.77,
            "t1": 166.8,
            "t2": 166.97,
            "t3": 167.0,
            "t4": 167.1,
            "t5": 167.24,
            "t6": 167.19,
            "deviationNub": 0.28,
            "deviationThan": 0.326343377441614401757163932416005991399288177490234375
          },
          {
            "measureTime": "2024-01-05 21",
            "siteName": null,
            "measureWater85": 166.74,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.97,
            "t3": 167.0,
            "t4": 167.08,
            "t5": 167.23,
            "t6": 167.19,
            "deviationNub": 0.26,
            "deviationThan": 0.31192947920964442243274561405996792018413543701171875
          },
          {
            "measureTime": "2024-01-05 22",
            "siteName": null,
            "measureWater85": 166.74,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.96,
            "t3": 166.98,
            "t4": 167.09,
            "t5": 167.23,
            "t6": 167.18,
            "deviationNub": 0.26,
            "deviationThan": 0.30822070014844882290816485692630521953105926513671875
          },
          {
            "measureTime": "2024-01-05 23",
            "siteName": null,
            "measureWater85": 166.73,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.95,
            "t3": 166.99,
            "t4": 167.09,
            "t5": 167.23,
            "t6": 167.17,
            "deviationNub": 0.27,
            "deviationThan": 0.314642654451045444830015185289084911346435546875
          },
          {
            "measureTime": "2024-01-06 00",
            "siteName": null,
            "measureWater85": 166.71,
            "t": 166.76,
            "t1": 166.77,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.09,
            "t5": 167.23,
            "t6": 167.17,
            "deviationNub": 0.29,
            "deviationThan": 0.333466640010661341531061907517141662538051605224609375
          },
          {
            "measureTime": "2024-01-06 01",
            "siteName": null,
            "measureWater85": 166.7,
            "t": 166.76,
            "t1": 166.77,
            "t2": 166.96,
            "t3": 166.98,
            "t4": 167.08,
            "t5": 167.23,
            "t6": 167.17,
            "deviationNub": 0.29,
            "deviationThan": 0.3382306905057552715021529365913011133670806884765625
          },
          {
            "measureTime": "2024-01-06 02",
            "siteName": null,
            "measureWater85": 166.69,
            "t": 166.76,
            "t1": 166.78,
            "t2": 166.96,
            "t3": 166.98,
            "t4": 167.08,
            "t5": 167.22,
            "t6": 167.17,
            "deviationNub": 0.3,
            "deviationThan": 0.345108678534747970179097364962217397987842559814453125
          },
          {
            "measureTime": "2024-01-06 03",
            "siteName": null,
            "measureWater85": 166.75,
            "t": 166.76,
            "t1": 166.78,
            "t2": 166.96,
            "t3": 166.99,
            "t4": 167.08,
            "t5": 167.22,
            "t6": 167.17,
            "deviationNub": 0.24,
            "deviationThan": 0.294957624075052493584081503286142833530902862548828125
          },
          {
            "measureTime": "2024-01-06 04",
            "siteName": null,
            "measureWater85": 166.75,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.98,
            "t3": 166.98,
            "t4": 167.07,
            "t5": 167.22,
            "t6": 167.18,
            "deviationNub": 0.25,
            "deviationThan": 0.296479341607471857944489102010265924036502838134765625
          },
          {
            "measureTime": "2024-01-06 05",
            "siteName": null,
            "measureWater85": 166.74,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.08,
            "t5": 167.23,
            "t6": 167.18,
            "deviationNub": 0.26,
            "deviationThan": 0.308706980808662601045710971447988413274288177490234375
          },
          {
            "measureTime": "2024-01-06 06",
            "siteName": null,
            "measureWater85": 166.72,
            "t": 166.76,
            "t1": 166.78,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.09,
            "t5": 167.23,
            "t6": 167.19,
            "deviationNub": 0.28,
            "deviationThan": 0.329241552663086578522921854528249241411685943603515625
          },
          {
            "measureTime": "2024-01-06 07",
            "siteName": null,
            "measureWater85": 166.74,
            "t": 166.78,
            "t1": 166.79,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.08,
            "t5": 167.24,
            "t6": 167.19,
            "deviationNub": 0.27,
            "deviationThan": 0.31336879231984793303666947394958697259426116943359375
          },
          {
            "measureTime": "2024-01-06 08",
            "siteName": null,
            "measureWater85": 166.71,
            "t": 166.77,
            "t1": 166.78,
            "t2": 166.97,
            "t3": 166.99,
            "t4": 167.08,
            "t5": 167.23,
            "t6": 167.18,
            "deviationNub": 0.29,
            "deviationThan": 0.334365069946009729751068562109139747917652130126953125
          }
        ]
      }
    };
    if (res.code == 200) {
      this.setState({
        ModelNub: {
          averageDeviationNub: res.content.averageDeviationNub, // 绝对误差值
          averageDeviationThan: res.content.averageDeviationThan, // 均方误差值
          averageCoefficient: res.content.averageCoefficient, // 确定性系数
        },
      });
    }
  };
  //初始化图谱 （七天水位预测对比图）模型
  ModelinitEchartsData = async (deviationType) => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    // const res = await get7WaterForecastAnalysisListForChart({
    //   measureTimeStart,
    //   measureTimeEnd,
    //   siteName,
    // });
    const res = {
      "success": true,
      "message": "成功",
      "code": "200",
      "content": {
        "returnList": [
          {
            "date": "2024-01-05 09",
            "measureLevel": 166.79,
            "T": 166.81,
            "T_2": 166.99,
            "T_1": 166.83,
            "T_4": 167.12,
            "T_3": 167.03,
            "T_6": 167.23,
            "T_5": 167.26
          },
          {
            "date": "2024-01-05 10",
            "measureLevel": 166.78,
            "T": 166.8,
            "T_2": 167.0,
            "T_1": 166.82,
            "T_4": 167.12,
            "T_3": 167.02,
            "T_6": 167.22,
            "T_5": 167.26
          },
          {
            "date": "2024-01-05 11",
            "measureLevel": 166.8,
            "T": 166.79,
            "T_2": 166.99,
            "T_1": 166.81,
            "T_4": 167.1,
            "T_3": 167.01,
            "T_6": 167.21,
            "T_5": 167.25
          },
          {
            "date": "2024-01-05 12",
            "measureLevel": 166.79,
            "T": 166.79,
            "T_2": 166.98,
            "T_1": 166.8,
            "T_4": 167.1,
            "T_3": 167.01,
            "T_6": 167.22,
            "T_5": 167.25
          },
          {
            "date": "2024-01-05 13",
            "measureLevel": 166.8,
            "T": 166.79,
            "T_2": 166.98,
            "T_1": 166.81,
            "T_4": 167.11,
            "T_3": 167.0,
            "T_6": 167.2,
            "T_5": 167.25
          },
          {
            "date": "2024-01-05 14",
            "measureLevel": 166.77,
            "T": 166.78,
            "T_2": 166.98,
            "T_1": 166.79,
            "T_4": 167.1,
            "T_3": 167.0,
            "T_6": 167.2,
            "T_5": 167.23
          },
          {
            "date": "2024-01-05 15",
            "measureLevel": 166.77,
            "T": 166.78,
            "T_2": 166.97,
            "T_1": 166.79,
            "T_4": 167.11,
            "T_3": 167.01,
            "T_6": 167.2,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 16",
            "measureLevel": 166.76,
            "T": 166.77,
            "T_2": 166.97,
            "T_1": 166.8,
            "T_4": 167.1,
            "T_3": 167.0,
            "T_6": 167.21,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 17",
            "measureLevel": 166.76,
            "T": 166.78,
            "T_2": 166.97,
            "T_1": 166.79,
            "T_4": 167.09,
            "T_3": 167.0,
            "T_6": 167.21,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 18",
            "measureLevel": 166.73,
            "T": 166.77,
            "T_2": 166.98,
            "T_1": 166.8,
            "T_4": 167.1,
            "T_3": 167.0,
            "T_6": 167.2,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 19",
            "measureLevel": 166.74,
            "T": 166.78,
            "T_2": 166.97,
            "T_1": 166.79,
            "T_4": 167.09,
            "T_3": 166.99,
            "T_6": 167.22,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 20",
            "measureLevel": 166.73,
            "T": 166.77,
            "T_2": 166.97,
            "T_1": 166.8,
            "T_4": 167.1,
            "T_3": 167.0,
            "T_6": 167.19,
            "T_5": 167.24
          },
          {
            "date": "2024-01-05 21",
            "measureLevel": 166.74,
            "T": 166.77,
            "T_2": 166.97,
            "T_1": 166.78,
            "T_4": 167.08,
            "T_3": 167.0,
            "T_6": 167.19,
            "T_5": 167.23
          },
          {
            "date": "2024-01-05 22",
            "measureLevel": 166.74,
            "T": 166.77,
            "T_2": 166.96,
            "T_1": 166.78,
            "T_4": 167.09,
            "T_3": 166.98,
            "T_6": 167.18,
            "T_5": 167.23
          },
          {
            "date": "2024-01-05 23",
            "measureLevel": 166.73,
            "T": 166.77,
            "T_2": 166.95,
            "T_1": 166.78,
            "T_4": 167.09,
            "T_3": 166.99,
            "T_6": 167.17,
            "T_5": 167.23
          },
          {
            "date": "2024-01-06 00",
            "measureLevel": 166.71,
            "T": 166.76,
            "T_2": 166.97,
            "T_1": 166.77,
            "T_4": 167.09,
            "T_3": 166.99,
            "T_6": 167.17,
            "T_5": 167.23
          },
          {
            "date": "2024-01-06 01",
            "measureLevel": 166.7,
            "T": 166.76,
            "T_2": 166.96,
            "T_1": 166.77,
            "T_4": 167.08,
            "T_3": 166.98,
            "T_6": 167.17,
            "T_5": 167.23
          },
          {
            "date": "2024-01-06 02",
            "measureLevel": 166.69,
            "T": 166.76,
            "T_2": 166.96,
            "T_1": 166.78,
            "T_4": 167.08,
            "T_3": 166.98,
            "T_6": 167.17,
            "T_5": 167.22
          },
          {
            "date": "2024-01-06 03",
            "measureLevel": 166.75,
            "T": 166.76,
            "T_2": 166.96,
            "T_1": 166.78,
            "T_4": 167.08,
            "T_3": 166.99,
            "T_6": 167.17,
            "T_5": 167.22
          },
          {
            "date": "2024-01-06 04",
            "measureLevel": 166.75,
            "T": 166.77,
            "T_2": 166.98,
            "T_1": 166.78,
            "T_4": 167.07,
            "T_3": 166.98,
            "T_6": 167.18,
            "T_5": 167.22
          },
          {
            "date": "2024-01-06 05",
            "measureLevel": 166.74,
            "T": 166.77,
            "T_2": 166.97,
            "T_1": 166.78,
            "T_4": 167.08,
            "T_3": 166.99,
            "T_6": 167.18,
            "T_5": 167.23
          },
          {
            "date": "2024-01-06 06",
            "measureLevel": 166.72,
            "T": 166.76,
            "T_2": 166.97,
            "T_1": 166.78,
            "T_4": 167.09,
            "T_3": 166.99,
            "T_6": 167.19,
            "T_5": 167.23
          },
          {
            "date": "2024-01-06 07",
            "measureLevel": 166.74,
            "T": 166.78,
            "T_2": 166.97,
            "T_1": 166.79,
            "T_4": 167.08,
            "T_3": 166.99,
            "T_6": 167.19,
            "T_5": 167.24
          },
          {
            "date": "2024-01-06 08",
            "measureLevel": 166.71,
            "T": 166.77,
            "T_2": 166.97,
            "T_1": 166.78,
            "T_4": 167.08,
            "T_3": 166.99,
            "T_6": 167.18,
            "T_5": 167.23
          }
        ]
      }
    };
    if (res.code == 200) {
      let t1 = [];
      let t2 = [];
      let t3 = [];
      let t4 = [];
      let t5 = [];
      let t6 = [];
      let t = [];
      let measureLevel = [];
      let xAxisdata = [];
      res.content.returnList.forEach((element, i) => {
        t1.push(element.T_1);
        t2.push(element.T_2);
        t3.push(element.T_3);
        t4.push(element.T_4);
        t5.push(element.T_5);
        t6.push(element.T_6);
        t.push(element.T);
        measureLevel.push(element.measureLevel);
        xAxisdata.push(element.date);
      });
      this.setState({
        Modeloption01: {
          title: {
            x: "center",
            text: "7天模型预测水位对比图",
            textStyle: {
              color: "#555",
              fontWeight: 400,
              fontSize: "14",
            },
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
            // formatter: function (params) {
            //   // console.log(params[0].seriesIndex)
            //   // console.log(res.content.returnList[params[0].seriesIndex].date)
            //   // var relVal = ''
            //   // for (var i = 0, l = params.length; i < l; i++) {
            //   //   relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + self.Monthlyunit;
            //   // }
            //   // let name = params[0].name ? params[0].name : ""
            //   // relVal = name + relVal
            //   // return relVal;
            // }
          },
          xAxis: {
            data: xAxisdata,
            type: "category",
            splitLine: {
              show: false,
            },
            axisLabel: {
              interval: 2,
              formatter: function (data, i) {
                // console.log(data, i);
                let text = "";
                switch (i) {
                  case 0:
                    text = 1;
                    break;
                  case 3:
                    text = 2;
                    break;
                  case 6:
                    text = 3;
                    break;
                  case 9:
                    text = 4;
                    break;
                  case 12:
                    text = 5;
                    break;
                  case 15:
                    text = 6;
                    break;
                  case 18:
                    text = 7;
                    break;
                  case 21:
                    text = 8;
                    break;
                }
                return text;
              },
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
              const maxv = value.max.toFixed(2);
              return maxv;
            },
            min: function (value) {
              // console.log("最小值", value.min + value.min * 0.3);
              return value.min.toFixed(2);
            },
          },
          series: [
            {
              name: "真实水位",
              smooth: true,
              // showSymbol: false,
              type: "line",
              // stack: "Total",
              data: measureLevel,
            },
            {
              name: "T天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t,
            },
            {
              name: "T-1天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t1,
            },
            {
              name: "T-2天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t2,
            },
            {
              name: "T-3天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t3,
            },
            {
              name: "T-4天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t4,
            },
            {
              name: "T-5天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t5,
            },
            {
              name: "T-6天预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t6,
            },
          ],
        },
      });
    } else {
      let t1 = [];
      let t2 = [];
      let t3 = [];
      let t4 = [];
      let t5 = [];
      let t6 = [];
      let t = [];
      let measureLevel = [];
      let xAxisdata = [];
      this.setState({
        Modeloption01: {
          title: {
            x: "center",
            text: "7天模型预测水位对比图",
            textStyle: {
              color: "#555",
              fontWeight: 400,
              fontSize: "14",
            },
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
            data: xAxisdata,
            type: "category",
            splitLine: {
              show: false,
            },
            axisLabel: {
              interval: 2,
              formatter: function (data, i) {
                // console.log(data, i);
                let text = "";
                switch (i) {
                  case 0:
                    text = 1;
                    break;
                  case 3:
                    text = 2;
                    break;
                  case 6:
                    text = 3;
                    break;
                  case 9:
                    text = 4;
                    break;
                  case 12:
                    text = 5;
                    break;
                  case 15:
                    text = 6;
                    break;
                  case 18:
                    text = 7;
                    break;
                  case 21:
                    text = 8;
                    break;
                }
                return text;
              },
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
              const maxv = value.max;
              return maxv;
            },
            min: function (value) {
              // console.log("最小值", value.min + value.min * 0.3);
              return value.min;
            },
          },
          series: [
            {
              name: "真实水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: measureLevel,
            },
            {
              name: "T预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t,
            },
            {
              name: "T-1预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t1,
            },
            {
              name: "T-2预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t2,
            },
            {
              name: "T-3预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t3,
            },
            {
              name: "T-4预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t4,
            },
            {
              name: "T-5预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t5,
            },
            {
              name: "T-6预测水位",
              smooth: true,
              showSymbol: false,
              type: "line",
              // stack: "Total",
              data: t6,
            },
          ],
        },
      });
    }
  };

  // 站点名称
  changeSite = (event) => {
    this.setState({
      siteName: event,
    });
  };

  //获取选中的时间信息
  onChangeTime = (value, dateString) => {
    if (dateString != "") {
      var timeStamp = Date.parse(dateString) / 1000;
      this.TimeProcessing(timeStamp);
    } else {
      const nowDate = parseInt((new Date().getTime() / 1000).toString()); // 当前时间
      this.TimeProcessing(nowDate);
    }
  };
  // 查询按钮 (时间范围 和 站点名称都是必填项)
  submitParam = async () => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteName } = this.state;
    if (siteName == "" || measureTimeStart == "" || measureTimeEnd == "") {
      message.error("信息不足，无法分析");
    } else {
      this.ListMan(); //人工 预测指标
      this.initTableData(); // 模型 预测指标
      this.ModelinitEchartsData(); // 模型echarts 图表
      this.artificialinitEchartsData(); //人工echarts
      this.get7WaterForecastAnalysisListFormat(); // 模型表格数据
      this.get7WaterForecastAnalysisListManFormat(); // 人工表格数据
    }
  };

  render() {
    const {
      artificialData,
      Modeldata,
      artificialoption01,
      Modeloption01,
      optionSite,
      showtime,
      TshowTime,
    } = this.state;
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { averageDeviationNub, averageDeviationThan, averageCoefficient } =
      this.state.ModelNub; //模型误差
    const { averageDeviationNub1, averageDeviationThan1, averageCoefficient1 } =
      this.state.artificialNub; //人工误差

    // 设置禁用时间 （今日之后的时间不可选择）
    const disabledDate = (current) => {
      return current > moment().endOf("day");
    };

    return (
      <div>
        {/* 顶部筛选条件 */}
        <Form>
          <Row>
            <Col span={5}>
              <Item label="站点名称:">
                <Select
                  allowClear
                  style={{ width: "80%" }}
                  placeholder="请选择预测站点名称"
                  onChange={(event) => this.changeSite(event)}
                >
                  {optionSite &&
                    optionSite.map((item) => {
                      return (
                        <Option key={item.siteName}>{item.siteName}</Option>
                      );
                    })}
                </Select>
              </Item>
            </Col>
            <Col span={14}>
              <Item label="水位预测时间:">
                <DatePicker
                  disabledDate={disabledDate}
                  onChange={this.onChangeTime}
                  style={{ marginRight: "20px" }}
                // defaultValue={moment(measureTimeStart)}
                />
                <span>
                  {/* ( {measureTimeStart} — {measureTimeEnd} ) */}( {showtime}{" "}
                  — {measureTimeEnd} )
                </span>
              </Item>
            </Col>
            {/* <Col span={1}></Col> */}
            <Col span={3}>
              <Button onClick={this.submitParam} type="primary">
                查询
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={3}>
              <span>预测指标</span>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <Item>人工预测指标</Item>
            </Col>
            <Col span={3}>
              <Item label="绝对误差值:">
                {averageDeviationNub1 == "--" || averageDeviationNub1 == null
                  ? "--"
                  : Number(averageDeviationNub1).toFixed(2)}
              </Item>
            </Col>
            <Col span={3}>
              <Item label="均方根误差值:">
                {averageDeviationThan1 == "--" || averageDeviationThan1 == null
                  ? "--"
                  : averageDeviationThan1}
              </Item>
            </Col>
            <Col span={3}>
              <Item label="确定性系数:">
                {averageCoefficient1 == "--" || averageCoefficient1 == null
                  ? "--"
                  : Number(averageCoefficient1).toFixed(2)}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <Item>模型预测指标</Item>
            </Col>
            <Col span={3}>
              <Item label="绝对误差值:">
                {averageDeviationNub == "--" || averageDeviationNub == null
                  ? "--"
                  : Number(averageDeviationNub).toFixed(2)}
              </Item>
            </Col>
            <Col span={3}>
              <Item label="均方根误差值:">
                {averageDeviationThan == "--" || averageDeviationThan == null
                  ? "--"
                  : Number(averageDeviationThan).toFixed(2)}
              </Item>
            </Col>
            <Col span={3}>
              <Item label="确定性系数:">
                {averageCoefficient == "--" || averageCoefficient == null
                  ? "--"
                  : Number(averageCoefficient).toFixed(2)}
              </Item>
            </Col>
          </Row>
          <Divider style={{ marginTop: "0px" }} />
        </Form>

        {/* 7天人工预测水位对比分析 */}
        <p className="TitileName">
          7天人工预测水位对比分析 <span>（ T表示的是{TshowTime} ）</span>
        </p>
        <Table
          bordered
          className="TableStyle"
          columns={ManualForecast}
          dataSource={artificialData}
          pagination={false}
        />
        <ReactEcharts
          option={artificialoption01}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{ height: "280px", border: "0", marginTop: "20px" }}
        />
        <p className="TitileName">
          7天模型预测水位对比分析 <span>（ T表示的是{TshowTime} ）</span>
        </p>
        {/* table 表格 */}
        <Table
          bordered
          className="TableStyle"
          columns={Modelcolumns}
          dataSource={Modeldata}
          pagination={false}
          scroll={{ y: 420 }}
        />
        {/* echart 图表问题 */}
        <ReactEcharts
          option={Modeloption01}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{ height: "280px", border: "0", marginTop: "20px" }}
        />
      </div>
    );
  }
}
