import React, { Component } from 'react'
import { Form, Divider,  Button,  DatePicker, Table, Select, Col, Row, Spin,message ,Pagination
  ,Modal,Icon
} from 'antd';
import { basWaterLevelForecast ,queryDataByTypeCode,addbasWaterLevelForecast,delWaterLevelForecast} from "../../../services/products";
import {dateFormat} from "../../../utils/commonUtil"
const { Option } = Select
const { Item } = Form;
const { confirm } = Modal;

export default class BasForecastRecord extends Component {
  formRef = React.createRef()
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
            measureTimeStart: null,
            measureTimeEnd: null,
        },
          forecastTime: "", // 预测时间
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
          <Button type="primary" onClick={() => { this.opop(record) }}>查看</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={() => { this.del(record) }}>删除</Button>
          </div>

        ),
      }
    ]
    //查看请求事件
    opop = e => {
      this.props.history.push({ pathname: `/BasForecastRecordDetails/${e.id}` })
    }
     //删除请求事件
     del = async(e) => {

      confirm({
        icon: <Icon type="exclamation-circle" theme="filled" />,
        content: '是否删除该记录',
        onOk: async () => {
          delWaterLevelForecast(e.id).then(res => {
            if (res) {
              this.initTableData(10,1)
            }
          })
        },
      });
    }

    //页面初始化
    componentDidMount =() => {
      this.initSelectData();
      this.initTableData(10,1)
    }
    //初始化表格
    initTableData = async(pageNumber,current) =>{
        const { measureTimeStart, measureTimeEnd } = this.state.param;
        const { forecastTime } = this.state;
      const res = await basWaterLevelForecast({
          page:current,
          size:pageNumber,
          measureTimeStart,
          measureTimeEnd,
          forecastTime,
      })
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
      const ls =[]
      let forecastSiteName = ""
      if(value.indexOf("all") != -1){
        if(value.length != this.state.children.length){
          this.state.children.forEach(function(ele) {
            ls.push(ele.dataName)
            forecastSiteName = forecastSiteName + ele.dataCode+",";
          });
          value = ls;
          this.formRef.current.setFieldsValue({
            forecastSite : ls,
          })
        }else{
          this.formRef.current.setFieldsValue({
            forecastSite : [],
          })
        }
      }else{
        for(var i=0; i< data.length; i++){
          forecastSiteName = forecastSiteName + data[i].children+",";
        }
      }
      forecastSiteName = forecastSiteName.substring(0,forecastSiteName.length-1)
        this.setState({
            forecastSite:value,
            forecastSiteName
          })
    }
    //时间框点击获取值
    onChange = (value, dateString)=> {
        // console.log(value,dateString)
        this.setState({
            forecastTime:dateString
          })
    }
    //预测按钮事件
    submitParam = async(values) =>{
        const {forecastSite,forecastTime} = values
        this.setState({
          forecastSite,
          forecastTime,
          spinning:true
        })
        const forecastSiteName = this.state.forecastSiteName
        const res = await addbasWaterLevelForecast({
            forecastSite:forecastSite.toString(),
            forecastTime,
            forecastSiteName
        })
        if(res.code == 200){
          message.success("预测成功")
            this.initTableData(10,1)
        }else{
          message.error(res.message)
          this.setState({
            spinning:false
          })
        }
        this.setState({
          spinning:false
        })

    }
    //获取选中得时间信息
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

  render() {
      const {data,children,spinning} = this.state
      const {defaultPageSize,defaultCurrent,total} = this.state.pagination
      //时间
      const disabledDate = (current) => {
          return current > new Date();
      };


      return (
        <div>
          <Spin spinning ={spinning} tip="Loading...">
            <Form
                ref={this.formRef}
                onFinish={this.submitParam}
                >
                <Row>
                    <Col span={8}>
                        <Item
                        rules={[{ required: true, message: '请选择预测站点名称!' }]}
                        label = "预测站点名称"
                        name = "forecastSite"
                        >
                        <Select
                            mode="multiple"
                            allowClear
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="请选择预测站点名称"
                            onChange={this.handleChange}
                            >
                            {children && children.map((item) => {
                                return (
                                    <Option key={item.dataName}>
                                        {item.dataCode}
                                    </Option>
                                )
                            })}
                            <Option value='all' key='all'>全选</Option>
                        </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                        label = "预测开始时间"
                        rules={[{ required: true, message: '请选择预测开始时间!' }]}

                        >
                        <DatePicker
                            onChange={this.onChangeTime}
                            disabledDate={disabledDate}
                        />
                            {/*showTime={{ format: 'HH' }}*/}
                            {/*format="YYYY-MM-DD HH"*/}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" htmlType="submit">预测</Button>
                    </Col>
                </Row>
                <Divider />
            </Form>
            <Table  columns={this.columns} dataSource = {data} pagination={false} scroll={{ y: 420 }}/>
            <Pagination
                style={{float:'right', marginTop: "40px"}}
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
