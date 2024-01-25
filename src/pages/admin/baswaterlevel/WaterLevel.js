import React, {Component} from 'react'
import {
    Form, Divider, Button, DatePicker, Table, Input, Select, Col, Row, Upload, message, Pagination
    , Modal, Card
} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import "./WaterLevel.css"
import { basInfo, basHandList, ManExport } from "../../../services/project"; // 预测水位站点下拉，人工预测水位数据列表
import {basWaterLevelPage} from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
import axios from "axios";
import {lyPrefix} from "../../../utils/config";
import {getToken} from "../../../utils/auth";

const {RangePicker} = DatePicker;
const {Option} = Select
const {Item} = Form;
const {Dragger} = Upload;

const columns = [
    {
        title: '站点名称',
        dataIndex: 'siteName',
        key: 'siteName',
        align: "center", //头部单元格和列内容水平居中
    }
    // ,{
    //   title: '数据来源',
    //   dataIndex: 'dataSource',
    //   key: 'dataSource',
    // }
    ,
    {
        title: '测量时间',
        key: 'measureTime',
        dataIndex: 'measureTime',
        align: "center", //头部单元格和列内容水平居中
        render: text => {
            return dateFormat("YYYY-mm-dd HH", new Date(text))
        }
    }
    // ,{
    //   title: '测量水位',
    //   key: 'measureWaterLevel',
    //   dataIndex: 'measureWaterLevel',
    // }
    , {
        title: '输出水位85',
        key: 'measureWater85',
        dataIndex: 'measureWater85',
        align: "center", //头部单元格和列内容水平居中
    },
    , {
        title: '涨落',
        key: 'fluctuate',
        dataIndex: 'fluctuate',
        align: "center", //头部单元格和列内容水平居中
        render: (_, { flow }) => (
            <>{flow == null ? "--" : flow}</>
        ),
    },
    // {
    //   title: '输出水位56',
    //   key: 'measureWater56',
    //   dataIndex: 'measureWater56',
    // },{
    //   title: '输出水位吴淞',
    //   key: 'measureWater11',
    //   dataIndex: 'measureWater11',
    // },{
    //   title: '输出水位基面',
    //   key: 'measureWaterBase',
    //   dataIndex: 'measureWaterBase',
    // },
]


export default class WaterLevel extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        console.log("菜单点击后：", this.props);
        this.state = {
            data: [],// el-table 数据源
            pagination: {
                defaultPageSize: 10,// 每页展示条数
                current: 1,// 页码
                total: 0// 返回信息总数
            },
            relationModel: false,
            option01: [], // 数据来源
            // siteCode: [],// 站点code
            siteName: [],// 站点code
            measureTimeWater:'',//预测时间
            param: {
                measureStaTime: null,
                measureEndTime: null
            },
        }
    }

    componentDidMount = () => {
        this.initTableData(10, 1)
        this.basInfo();
    }
    onChangeBankPerson = async (current, pageNumber) => {
        this.initTableData(pageNumber, current);
    }
    basInfo = async () => {
        const res = await basInfo();
        if (res.code == 200) {
            this.setState({
                option01: res.content,
            });
        }
    };
    //初始化表格
    initTableData = async (pageNumber, current) => {
        const {measureStaTime, measureEndTime} = this.state.param
        const {siteName} = this.state
        const res = await basWaterLevelPage({
            page: current,
            size: pageNumber,
            siteName,
            measureStaTime,
            measureEndTime
        })
        // console.log(res)
        if (res.code == 200) {
            this.setState({
                data: res.content.records,
                pagination: {
                    defaultPageSize: pageNumber,
                    defaultCurrent: res.content.current,
                    total: res.content.total
                }

            })
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleCancel = (relationModel) => {
        this.setState({
            relationModel
        })
    }
    //获取选中的时间信息
    onChangeTime = (value, dateString) => {
        if (value == null) {
            this.setState({
                param: {
                    measureTimeStart: null,
                    measureTimeEnd: null,
                },
            });
        }else{
            this.setState({
                param: {
                    measureStaTime: value[0],
                    measureEndTime: value[1]
                }
            })
        }
    }
    //获取查询名称
    changeSite = (event) => {
        const arr = [];
        if (event.indexOf("all") != -1) {
            event.splice(event.indexOf("all"), 1);
            this.state.option01.forEach(function (ele) {
                arr.push(ele.siteName);
            });
            event = arr;
            this.formRef.current.setFieldsValue({
                siteName: arr,
            });
        }
        this.setState({
            siteName: event
        })
    }
    submitParam = async () => {
        this.initTableData(10, 1)
    }
    exportExcel(form) {
        return axios({
            // 用axios发送post请求
            method: "post",
            url: lyPrefix + "/deptwave-system/bas-water-level/export", // 请求地址
            // /deptwave-system/bas-water-level/export
        // /deptwave-system/bas-forecast-hand/excel
            data: form, // 参数
            responseType: "blob", // 表明返回服务器返回的数据类型
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
        });
    }
    execl = async () => {
        const {measureStaTime, measureEndTime} = this.state.param;
        const {siteName, measureTimeWater} = this.state;
        this.exportExcel({
            siteName,
            measureTimeWater,
            measureStaTime,
            measureEndTime,
        }).then((res) => {
            const link = document.createElement("a");
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
            console.log(blob)
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.download = "历史水位信息表.xlsx"; //下载的文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    render() {
        const {data, option01} = this.state
        const {defaultPageSize, defaultCurrent, total} = this.state.pagination
        const disabledDate = (current) => {
            return current > new Date();
        };

        return (
            <div>
                <Form ref={this.formRef}>
                    <Row>
                        <Col span={8}>
                            <Item label="预测站点名称" name="siteName">
                                {/*<Input style={{width: '80%'}}*/}
                                {/*       onChange={event => this.changeName(event)}*/}
                                {/*/>*/}
                                <Select
                                    mode="multiple"
                                    showSearch
                                    allowClear
                                    style={{width: "80%"}}
                                    placeholder="请选择数据来源"
                                    onChange={(event) => this.changeSite(event)}
                                >
                                    <Option value="all" key="all">
                                        全选
                                    </Option>
                                    {option01 &&
                                        option01.map((item) => {
                                            return (
                                                <Option key={item.siteName}>{item.siteName}</Option>
                                            );
                                        })}
                                </Select>
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item label="操作时间">
                                <RangePicker
                                    showTime={{format: 'HH'}}
                                    format="YYYY-MM-DD HH"
                                    onChange={this.onChangeTime}
                                    disabledDate={disabledDate}
                                />
                            </Item>
                        </Col>
                        <Col span={2}>

                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={this.submitParam}>查询</Button>
                            <Button
                                style={{marginLeft: "20px"}}
                                type="primary"
                                onClick={() => {
                                    this.execl();
                                }}
                            >
                                导出
                            </Button>

                        </Col>
                    </Row>
                    <Divider/>
                </Form>
                {/* <Table  columns={columns} dataSource = {data} pagination={false}/> */}
                <Table className="TableStyle" columns={columns} dataSource={data} pagination={false} scroll={{y: 420}}/>
                <Pagination
                    style={{float: 'right', marginTop: "40px"}}
                    defaultPageSize={defaultPageSize}
                    current={defaultCurrent}
                    total={total}
                    onChange={this.onChangeBankPerson}
                />
            </div>
        )
    }
}
