// 人工预测水位
import React, { Component } from "react";
import { dateFormat } from "../../../utils/commonUtil"; // el-table 时间（水位时间）
import { basInfo, basHandList, ManExport } from "../../../services/project"; // 预测水位站点下拉，人工预测水位数据列表
import { lyPrefix } from "../../../utils/config";
import axios from "axios";
import { getToken } from "../../../utils/auth";
import {
  Form,
  Divider,
  Button,
  Col,
  Row,
  DatePicker,
  Table,
  Pagination,
  Select,
} from "antd";
import moment from "moment";
import "moment/locale/zh-cn"; // Ant Design 时间选择器 初始化默认时间
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Item } = Form;

// el-table 表格渲染数据
const columns = [
  {
    title: "预测站点名称",
    dataIndex: "siteName",
    key: "siteName",
    align: "center", //头部单元格和列内容水平居中
  },
  {
    title: "预测日期",
    dataIndex: "measureTime",
    key: "measureTime",
    align: "center", //头部单元格和列内容水平居中
  },
  {
    title: "预测水位日期",
    key: "measureTimeWater",
    dataIndex: "measureTimeWater",
    align: "center", //头部单元格和列内容水平居中
  },
  {
    title: "预测水位",
    key: "measureWater",
    dataIndex: "measureWater",
    align: "center", //头部单元格和列内容水平居中
    render: (_, { measureWater }) => (
      <>{measureWater == null ? "--" : measureWater}</>
    ),
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
];

export default class OtherWaterLevel extends Component {
  formRef = React.createRef();
  constructor() {
    super();
    this.state = {
      data: [], // el-table 数据源
      pagination: {
        defaultPageSize: 10, // 每页展示条数
        current: 1, // 页码
        total: 0, // 返回信息总数
      },

      param: {
        measureTimeStart: null,
        measureTimeEnd: null,
      },

      option01: [], // 数据来源
      siteCode: [], // 站点code

      measureTimeWater: "", // 预测时间
    };
  }

  // render 后调用，可以获取DOM
  componentDidMount = () => {
    this.basInfo();
    this.initTableData(10, 1);
  };

  basInfo = async () => {
    const res = await basInfo();
    if (res.code == 200) {
      this.setState({
        option01: res.content,
      });
    }
  };
  onChangeBankPerson = async (current, pageNumber) => {
    this.initTableData(pageNumber, current);
  };
  // 获取el-table表格数据
  initTableData = async (pageNumber, current) => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteCode, measureTimeWater } = this.state;
    const res = await basHandList({
      page: current,
      size: pageNumber,
      siteCode,
      measureTimeWater,
      measureTimeStart,
      measureTimeEnd,
    });
    console.log(res)
    if (res.code == 200) {
      this.setState({
        data: res.content.records,
        pagination: {
          defaultPageSize: pageNumber, // 每页展示条数
          defaultCurrent: res.content.current, // 当前页码
          total: res.content.total, // 总条数
        }

      });

    }
  };
  // 站点名称
  changeSite = (event) => {
    const arr = [];
    if (event.indexOf("all") != -1) {
      event.splice(event.indexOf("all"), 1);
      this.state.option01.forEach(function (ele) {
        arr.push(ele.siteCode);
      });
      event = arr;
      this.formRef.current.setFieldsValue({
        siteCode: arr,
      });
    }
    this.setState({
      siteCode: event,
    });
  };

  // 预测时间
  onChange = (date, dateString) => {
    this.setState({
      measureTimeWater: dateString,
    });
  };

  //获取选中的时间信息
  onChangeTime = (value, dateString) => {
    if (value == null) {
      this.setState({
        param: {
          measureTimeStart: null,
          measureTimeEnd: null,
        },
      });
    } else {
      this.setState({
        param: {
          measureTimeStart: dateString[0],
          measureTimeEnd: dateString[1],
        },
      });
    }
  };
  // 查询接口
  submitParam = async () => {
    this.initTableData(10, 1);
  };
  exportExcel(form) {
    return axios({
      // 用axios发送post请求
      method: "post",
      url: lyPrefix + "/deptwave-system/bas-forecast-hand/excel", // 请求地址
      data: form, // 参数
      responseType: "blob", // 表明返回服务器返回的数据类型
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    });
  }
  execl = async () => {
    const { measureTimeStart, measureTimeEnd } = this.state.param;
    const { siteCode, measureTimeWater } = this.state;
    this.exportExcel({
      siteCode,
      measureTimeWater,
      measureTimeStart,
      measureTimeEnd,
    }).then((res) => {
      const link = document.createElement("a"); // 创建一个a 标签
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); // 规定，你想让a标签 下的文件类型
      console.log(blob)
      link.style.display = "none"; // 将创建的 a 标签隐藏
      link.href = URL.createObjectURL(blob); // 将 a 标签的地址转换为 接口返回的值
      link.download = "人工预测水位表.xlsx"; //下载的文件名
      document.body.appendChild(link); // 将a 标签添加到 html结构的末尾
      link.click(); // 执行点击a 标签，触发a 标签的下载功能
      document.body.removeChild(link); // 将添加在html 末尾的a标签 删除
    });
  };

  render() {
    const { data, option01 } = this.state;
    const { defaultPageSize, defaultCurrent, total } = this.state.pagination;
    // 设置禁用时间 （今日之后的时间不可选择）
    const disabledDate = (current) => {
      return current > moment().endOf("day");
    };
    const disabledDateTwo = (current) => {
      if ((this.state.measureTimeWater ?? "") !== "") {
        let data =
          new Date(this.state.measureTimeWater).getTime() + 86400 * 8 * 1000;
        let data1 = new Date(this.state.measureTimeWater).getTime() + 86400 * 1000;
        let endTime = new Date(data);
        let start = new Date(data1);
        return current > endTime || current < start;
      } else {
        // return current > moment().endOf("day");
        return current > new Date().getTime() + 86400 * 7 * 1000;
      }
    };
    return (
      <div>
        {/* 顶部筛选条件 */}
        <Form ref={this.formRef}>
          <Row>
            <Col span={6}>
              <Item label="预测站点名称:" name="siteCode">
                <Select
                  mode="multiple"
                  showSearch
                  allowClear
                  style={{ width: "80%" }}
                  placeholder="请选择数据来源"
                  onChange={(event) => this.changeSite(event)}
                >
                  <Option value="all" key="all">
                    全选
                  </Option>
                  {option01 &&
                    option01.map((item) => {
                      return (
                        <Option key={item.siteCode}>{item.siteName}</Option>
                      );
                    })}
                </Select>
              </Item>
            </Col>
            <Col span={6}>
              <Item label="预测日期:">
                <DatePicker
                  style={{ width: "80%" }}
                  onChange={this.onChange}
                  disabledDate={disabledDate}
                />
              </Item>
            </Col>
            <Col span={6}>
              <Item label="预测水位日期:">
                <RangePicker
                  onChange={this.onChangeTime}
                  disabledDate={disabledDateTwo}
                />
              </Item>
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
              <Button onClick={this.submitParam} type="primary">
                查询
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                type="primary"
                onClick={() => {
                  this.execl();
                }}
              >
                导出
              </Button>
            </Col>
          </Row>
          <Divider />
        </Form>
        {/* table 表格 */}
        <Table
          bordered
          className="TableStyle"
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 420 }}
        />
        {/* 分页器 */}
        <Pagination
          style={{ float: "right", marginTop: "40px" }}
          pageSize={defaultPageSize}
          current={defaultCurrent}
          total={total}
          onChange={this.onChangeBankPerson}
        />
      </div>
    );
  }
}
