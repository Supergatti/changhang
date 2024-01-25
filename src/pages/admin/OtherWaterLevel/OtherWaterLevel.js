// 其他站点水位页面
import React, {Component} from "react";
import {dateFormat} from "../../../utils/commonUtil"; // el-table 时间（水位时间）
import {Splicing} from "../../../utils/splitJoint"; // el-table 数据来源 （来源名称 + 网址）
import {lyPrefix} from "../../../utils/config";
import axios from "axios";
import {getToken} from "../../../utils/auth";

import moment from "moment";
import "moment/locale/zh-cn"; // Ant Design 时间选择器 初始化默认时间

import "./OtherWaterLevel.css";
import {
    otherSite,
    otherSource,
    otherforecast,
    otherExport,
    getChosenSiteInfoList,
} from "../../../services/project"; // 封装的Ajax请求
import {
    Form,
    Divider,
    Button,
    Input,
    Col,
    Row,
    DatePicker,
    Table,
    Pagination,
    Select,
    Descriptions,
    Spin,
    Space,
    Modal,
    Layout,
    Typography,
    Checkbox,
} from "antd";

const {Option} = Select;
const {RangePicker} = DatePicker;
const {Item} = Form;
const {Header, Content} = Layout;
const {Title} = Typography;


// el-table 表格渲染数据
const columns = [
    {
        title: "数据来源",
        dataIndex: "webName",
        key: "webName",
        render: (_, {webName, webUrl}) => (
            <>
                {webName}({webUrl}){" "}
            </>
        ),
        align: "center", //头部单元格和列内容水平居中
        width: 450,
    },
    {
        title: "站点名称",
        dataIndex: "siteName",
        key: "siteName",
        align: "center", //头部单元格和列内容水平居中
    },
    {
        title: "时间",
        key: "measureTime",
        dataIndex: "measureTime",
        align: "center", //头部单元格和列内容水平居中
    },
    {
        title: "水位",
        key: "measureWater85",
        dataIndex: "measureWater85",
        align: "center", //头部单元格和列内容水平居中
        render: (_, {measureWater85}) => (
            <>{measureWater85 == null ? "--" : measureWater85}</>
        ),
    },
    {
        title: "流量",
        key: "flow",
        dataIndex: "flow",
        align: "center", //头部单元格和列内容水平居中
        render: (_, {flow}) => <>{flow == null ? "--" : flow}</>,
    },
    {
        title: "采集时间",
        key: "createTime",
        dataIndex: "createTime",
        align: "center", //头部单元格和列内容水平居中
        render: (text) => {
            return dateFormat("YYYY-mm-dd HH:MM:SS", new Date(text));
        },
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

            measureTimeStart2:null,
            measureEndTime2:null,

            webInfo: [], // 来源编码
            optionSource: [], // 数据来源

            siteCode: [], // 站点编码
            optionSite: [], // 站点下拉

            optionSite2:[],
            filteredOptionSite:[],
            filteredText:"",
            removeArr:[],
            leftBox:[],
            rightBox:[],


            tableLoading: false,
            isModalOpen: false,//弹框设置
            // keyCode: [],//选择的站点
            checkEer: false,
            checkedArr: [],
            checkData: [
                "60107245",
                "60107300",
                "60103400",
                "60603300",
                "60613950",
                "60104800",
                "60703800",
                "60105400",
                "60803000",
                "60108300",
                "60112200",
                "60113400",
                "60115000",
                "61512000",
                "61505400",
                "62601600",
                "61804600",
            ],

            webInfo2:[],
            siteCode2:[],

            defaultOptionSite2:[],
            defaultCheckArr:[],
        };
    }

    // render 后调用，可以获取DOM
    componentDidMount = () => {
        this.otherSource();
        this.initTableData(10, 1); // el-table 表格数据
        this.otherSite();
        this.otherSite2(true)
        // this.exportArr()
    };
    // 来源下拉
    otherSource = async () => {
        const res = await otherSource();
        this.setState({
            optionSource: res.content,
        });
    };


    // 站点下拉
    otherSite = async () => {
        const {webInfo} = this.state;
        const res = await otherSite(webInfo);
        this.setState({
            optionSite: res.content,
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
                    measureTimeStart: value[0],
                    measureTimeEnd: value[1]
                }
            })
        }
    }

    //获取选中的时间信息
    onChangeTime2 = (value, dateString) => {
        if (value == null) {
            this.setState({
                measureTimeStart2: null,
                measureEndTime2: null,
            });
        } else {
            this.setState({
                measureTimeStart2: value[0],
                measureEndTime2: value[1]
            })
        }
    }
    // 站点下拉
    otherSite2 = async (init = false) => {
        const {webInfo2} = this.state;
        const res = await otherSite(webInfo2);
        const res2 = await getChosenSiteInfoList()
        let defaultSiteList = res2.content
        console.log('defaultSiteList',defaultSiteList)
        if(init){

            let optionSite2 = res.content.filter(it => !defaultSiteList.some(item => item.siteCode === it.siteCode) )
            let checkedArr = res.content.filter(it => defaultSiteList.some(item => item.siteCode === it.siteCode) )
            checkedArr = checkedArr.map((item => {
                let target = defaultSiteList.find(it => item.siteCode ===it.siteCode)
                  return {
                      sort:target.siteSort,
                      label: item.siteName,
                      value: item.siteCode,
                  }
            }))

            checkedArr.sort((a,b) => {return a.sort - b.sort})

            this.setState({
                optionSite2: optionSite2,
                checkedArr:checkedArr,
                defaultOptionSite2:optionSite2,
                defaultCheckArr:checkedArr,
            });
        }else{
            this.setState({
                optionSite2: res.content,
                checkedArr:[],
            });
        }


    };

    // 获取el-table表格数据
    initTableData = async (pageNumber, current) => {
        console.log(this.state.param)
        const {measureTimeStart, measureTimeEnd} = this.state.param;
        const {webInfo, siteCode} = this.state;
        this.setState({
            tableLoading: true,
        });
        const res = await otherforecast({
            page: current,
            size: pageNumber,
            webCode: webInfo,
            siteCode,
            measureTimeEnd:measureTimeEnd,
            measureTimeStart:measureTimeStart,
        });
        this.setState({
            tableLoading: false,
        });
        if (res.code == 200) {
            this.setState({
                data: res.content.records,
                pagination: {
                    defaultPageSize: pageNumber, // 一页数量
                    defaultCurrent: res.content.current, // 页码
                    total: res.content.total, // 总条数
                },
            });
        }
    };

    // 查询接口
    submitParam = async () => {
        this.initTableData(10, 1);
    };
    // 分页器
    onChangeBankPerson = async (current, pageNumber) => {
        this.initTableData(pageNumber, current);
    };
    // 获取数据来源
    changeName = (value, data) => {
        const ls = [];
        if (value.indexOf("all") != -1) {
            // 说明选中了全选
            value.splice(value.indexOf("all"), 1);
            this.state.optionSource.forEach(function (ele) {
                ls.push(ele.webCode);
            });
            value = ls;
            this.formRef.current.setFieldsValue({
                forecastSite: ls,
            });
        }
        // 必须清空预测站点名称下拉框
        this.formRef.current.setFieldsValue({
            siteCode: [],
        });
        console.log(value)
        // 先保存，在调用
        this.setState(
            {
                webInfo: value, // 来源编码
                siteCode: [], // 清空预测站点名称筛选项
            },
            () => {
                this.otherSite(); // 站点名称
            }
        );
    };
    changeName2 = (value, data) => {
        const ls = [];
        if (value.indexOf("all") != -1) {
            // 说明选中了全选
            value.splice(value.indexOf("all"), 1);
            this.state.optionSource.forEach(function (ele) {
                ls.push(ele.webCode);
            });
            value = ls;

        }
        // 先保存，在调用
        this.setState(
          {
              webInfo2: value, // 来源编码
              siteCode2: [], // 清空预测站点名称筛选项
              removeArr:[],
          },
          () => {
              this.otherSite2(); // 站点名称
          }
        );
    };
    // 站点名称
    changeSite = (event, data) => {
        const arr = [];
        if (event.indexOf("all") != -1) {
            event.splice(event.indexOf("all"), 1);
            this.state.optionSite.forEach(function (ele) {
                arr.push(ele.siteCode);
            });
            event = arr;
            this.formRef.current.setFieldsValue({
                siteCode: arr,
            });
        }
        this.setState({
            siteCode: event, // 来源编码
        });
    };
    // 站点名称
    changeSite2 = (event, data) => {
        const arr = [];
        if (event.indexOf("all") != -1) {
            event.splice(event.indexOf("all"), 1);
            this.state.optionSite.forEach(function (ele) {
                arr.push(ele.siteCode);
            });
            event = arr;
            this.formRef.current.setFieldsValue({
                siteCode: arr,
            });
        }
        this.setState({
            siteCode2: event, // 来源编码
            leftBox:event
        });
    };
    changeRemove = (event, data) => {
        console.log(event)
        this.setState({
            removeArr: event,
            rightBox:event,
        });
    };

    changeSearch = (event, data) => {
        console.log(event.target.value)
        let input = event.target.value
        let arr = this.state.optionSite2
        arr = arr.filter(it => it.siteName.indexOf(input) > -1)

        this.setState({
            filteredText:input,
            filteredOptionSite:arr
        })
    }

    exportArr(form) {
        return axios({
            // 用axios发送post请求
            method: "post",
            url: lyPrefix + "/deptwave-system/bas-forecast-from-website/excel", // 请求地址
            data: form, // 参数
            responseType: "blob", // 表明返回服务器返回的数据类型
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
        });
    }

    exportExcel(form) {
        return axios({
            // 用axios发送post请求
            method: "post",
            url: lyPrefix + "/deptwave-system/bas-forecast-from-website/excel", // 请求地址
            data: form, // 参数
            responseType: "blob", // 表明返回服务器返回的数据类型
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
        });
    }

    //弹出框打开
    addUser = async (values) => {
        this.setState({
            isModalOpen: true,
        });
    };
    // 点击确定关闭
    //导出
    handleOk3 = async () => {
        const {measureTimeStart2, measureEndTime2,checkedArr} = this.state;
        const {webInfo2} = this.state;

        console.log(measureTimeStart2,measureEndTime2,webInfo2)

        let siteCode2 = checkedArr.map((item) =>{
            return item.value
        })
        this.exportExcel({
            measureTimeStart:measureTimeStart2,
            measureTimeEnd:measureEndTime2,
            webCode: webInfo2,
            siteCode:siteCode2,
        }).then((res) => {
            const link = document.createElement("a");
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.download = "其他站点水位表.xlsx"; //下载的文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        this.setState({
            isModalOpen: false,
        });
    };
    //点击取消关闭
    handleCancel3 = async () => {
        let optionSite2 = this.state.defaultOptionSite2
        let checkedArr = this.state.defaultCheckArr

        this.setState({
            isModalOpen: false,
            optionSite2:optionSite2,
            checkedArr:checkedArr,
        });
    }
    //添加到新站点
    keyCode = (event) => {
        let zd = JSON.parse(JSON.stringify(this.state.checkedArr))
        this.state.optionSite2.map((item) => {
            if (this.state.siteCode2.includes(item.siteCode)) {
                zd.push({
                    label: item.siteName,
                    value: item.siteCode,
                })
            }
        })

        let arr = this.state.optionSite2
        arr = arr.filter(item => this.state.siteCode2.indexOf(item.siteCode) === -1)

        // console.log(zd)
        this.setState({
            optionSite2:arr,
            checkedArr:zd,
            siteCode2:[],
            removeArr:[],
            leftBox:[],
            rightBox:[],
            checkEer: true,
        },
          () => {
              console.log(zd)
              // this.state.checkedArr = zd
              console.log(this.state.checkedArr)
          });
    }
    //移除
    remove = () => {
        let leftArr = JSON.parse(JSON.stringify(this.state.optionSite2))
        console.log(this.state.removeArr)
        let arr = this.state.checkedArr
        arr = arr.filter(item => this.state.removeArr.indexOf(item.value) === -1)

        this.state.checkedArr.map((item) => {
            if (this.state.removeArr.includes(item.value)) {
                leftArr.unshift({
                    siteName: item.label,
                    siteCode: item.value,
                })
            }
        })

        console.log(leftArr)
        this.setState({
            removeArr:[],
            leftBox:[],
            rightBox:[],
            checkedArr: arr,
            optionSite2:leftArr
        },() => {
            console.log(arr)
            // this.state.checkedArr = zd
            console.log(this.state.checkedArr)
        })
    }


    render() {
        const {data, optionSource, optionSite, optionSite2,isModalOpen, checkedArr, checkEer,filteredText,filteredOptionSite} = this.state;
        const {defaultPageSize, defaultCurrent, total} = this.state.pagination;
        // 设置禁用时间 （今日之后的时间不可选择 || 2022.12.15 之前的日期也不能选）
        const disabledDate = (current) => {
            let date = new Date('2022-12-15');
            return current > Date.now() || current < new Date(date)// 精确到小时
        };
        return (
            <div>
                {/* 顶部筛选条件 */}
                <Form ref={this.formRef}>
                    <Row>
                        <Col span={6}>
                            <Item label="数据来源:" name="forecastSite">
                                <Select
                                    mode="multiple"
                                    showSearch
                                    allowClear
                                    style={{width: "80%"}}
                                    placeholder="请选择数据来源"
                                    onChange={this.changeName}
                                >
                                    <Option value="all" key="all">
                                        全选
                                    </Option>
                                    {optionSource &&
                                        optionSource.map((item) => {
                                            return <Option key={item.webCode}  >{item.webName}</Option>;
                                        })}
                                </Select>
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item label="站点名称:" name="siteCode">
                                <Select
                                    mode="multiple"
                                    showSearch
                                    allowClear
                                    style={{width: "80%"}}
                                    placeholder="请选择预测站点名称"
                                    onChange={this.changeSite}
                                    className="SpecialSelect"
                                    filterOption={(input, option) =>
                                      (option?.siteName ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {optionSite.length > 0 && (
                                        <Option value="all" key="all" siteName={"all"}>
                                            全选
                                        </Option>
                                    )}
                                    {optionSite &&
                                        optionSite.map((item) => {
                                            return (
                                                <Option key={item.siteCode} siteName={item.siteName}>{item.siteName}</Option>
                                            );
                                        })}
                                </Select>
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item label="时间:">
                                <RangePicker
                                    showTime={{format: "HH"}}
                                    format="YYYY-MM-DD HH"
                                    onChange={this.onChangeTime}
                                    disabledDate={disabledDate}
                                />
                            </Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Button onClick={this.submitParam} type="primary">
                                查询
                            </Button>
                            <Button
                                style={{marginLeft: "20px"}}
                                type="primary"
                                onClick={() => {
                                    this.addUser();
                                }}
                            >
                                {/*  onClick={() => {*/}
                                {/*  this.execl();*/}
                                {/*}}*/}
                                导出
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                </Form>
                <Modal
                    closable={false}
                    width={'800px'}
                    destroyOnClose
                    open={isModalOpen}
                    delete={false}
                    onOk={this.handleOk3}
                    onCancel={this.handleCancel3}
                    style={{border: 'none'}}

                >
                    <Layout style={{border: 'none'}}>
                        <Header style={{background: '#fff', padding: '0px', display: "flex",}}>
                            <Title level={5} style={{color: '#18aff1'}}>选择时间：</Title>
                            <Item style={{marginLeft: '60px'}}>
                                <RangePicker
                                    showTime={{format: 'HH'}}
                                    format="YYYY-MM-DD HH"
                                    onChange={this.onChangeTime2}
                                    disabledDate={disabledDate}
                                />
                            </Item>
                        </Header>
                        <Content style={{background: '#fff',border:'none'}}>
                            <Title level={5} style={{color: '#18aff1'}}>选择站点：</Title>
                            <Content style={{display: "flex", justifyContent: 'space-between'}}>
                                <div style={{
                                    border: '1px solid #e9e9e9',
                                    width: '500px',
                                    height: '600px',
                                    display: "flex",
                                }}>
                                    <div style={{width: '250px', height: '600px'}}>
                                        <Item label="数据来源:" name="forecastSite"
                                              style={{marginTop: '10px', width: '260px', marginLeft: '10px'}}>
                                            <Select
                                                mode="multiple"
                                                showSearch
                                                allowClear
                                                style={{width: "80%"}}
                                                onChange={this.changeName2}
                                            >
                                                <Option value="all" key="all">
                                                    全选
                                                </Option>
                                                {optionSource &&
                                                    optionSource.map((item) => {
                                                        return <Option key={item.webCode}>{item.webName}</Option>;
                                                    })}
                                            </Select>
                                        </Item>
                                    </div>
                                    <div style={{
                                        borderLeft: '1px solid #e9e9e9',
                                        width: '250px',
                                        height: '600px',
                                        position: 'relative',

                                    }}>
                                        <Item label="站点名称:" name="siteCode"
                                              style={{marginTop: '10px', width: '260px', marginLeft: '10px'}}>
                                            {/*<Select*/}
                                            {/*    mode="multiple"*/}
                                            {/*    showSearch={true}*/}
                                            {/*    allowClear*/}
                                            {/*    style={{width: "80%"}}*/}
                                            {/*    onChange={this.changeSite}*/}
                                            {/*    className="SpecialSelect"*/}
                                            {/*>*/}
                                            {/*    {optionSite.length > 0 && (*/}
                                            {/*        <Option value="all" key="all">*/}
                                            {/*            全选*/}
                                            {/*        </Option>*/}
                                            {/*    )}*/}
                                            {/*    {optionSite &&*/}
                                            {/*        optionSite.map((item) => {*/}
                                            {/*            return (*/}
                                            {/*                <Option key={item.siteName}>{item.siteName}</Option>*/}
                                            {/*            );*/}
                                            {/*        })}*/}
                                            {/*</Select>*/}
                                            <Input className="SpecialInput" placeholder="搜索站点" onChange={this.changeSearch}/>
                                        </Item>
                                        <div
                                            style={{width: '100%', height: '480px', overflow: 'auto',
                                                padding: '10px'}}>
                                            {/*checked={}*/}
                                            <Checkbox.Group
                                                options={
                                                    optionSite2.filter(it => it.siteName.indexOf(filteredText)>-1).map((item => {
                                                        return {
                                                            label: item.siteName,
                                                            value: item.siteCode,
                                                        }
                                                    }))

                                                }
                                                vlaue={this.state.checkEer}
                                                value={this.state.leftBox}
                                                onChange={this.changeSite2}/>
                                        </div>
                                        <Button type="primary" size='small'
                                                style={{position: 'absolute', bottom: '20px', right: '20px'}}
                                                onClick={() => {
                                                    this.keyCode();
                                                }}>
                                            添加
                                        </Button>
                                    </div>
                                </div>
                                <div style={{border: '1px solid #e9e9e9', width: '220px', height: '600px'}}>
                                    <div style={{
                                        background: '#f2f2f2',
                                        width: '100%',
                                        height: '50px',
                                        display: "flex",
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0 10px'
                                    }}>
                                        <Title level={5} style={{color: '#18aff1', fontSize: '14px'}}>
                                            已选 {checkedArr.length}/{optionSite2.length + checkedArr.length}
                                        </Title>
                                        <Button onClick={this.remove} type="primary"
                                                style={{  border: 'none'}}
                                                size='small'>
                                            移除
                                        </Button>
                                    </div>
                                    <div
                                        style={{width: '100%', height: '480px', overflow: 'auto', marginTop: '20px',padding: '10px'}}>

                                        {/*    checkedArr.forEach(item => {*/}
                                        {/*    return {*/}
                                        {/*    label: item.siteName,*/}
                                        {/*    value: item.siteCode,*/}
                                        {/*}*/}
                                        {/*})*/}
                                        {/*    checked={!this.state.checkEer}*/}
                                        <Checkbox.Group
                                            options={
                                                checkedArr
                                            }
                                            onChange={this.changeRemove}
                                            value={this.state.rightBox}
                                            vlaue={!this.state.checkEer}>
                                        </Checkbox.Group>
                                    </div>
                                </div>
                            </Content>
                        </Content>

                    </Layout>
                </Modal>

                <Spin spinning={this.state.tableLoading} tip="加载中...">
                    {/* table 表格 */}
                    <Table
                        bordered
                        className="TableStyle"
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        scroll={{y: 420}}
                    />
                    {/* 分页器 */}
                    <Pagination
                        style={{float: "right", marginTop: "40px"}}
                        pageSize={defaultPageSize}
                        current={defaultCurrent}
                        total={total}
                        onChange={this.onChangeBankPerson}
                    />
                </Spin>
            </div>
        );
    }
}
