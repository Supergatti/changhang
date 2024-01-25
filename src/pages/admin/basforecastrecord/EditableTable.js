import React, { useState ,useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography ,Pagination,message} from 'antd';
import {dateFormat} from "../../../utils/commonUtil"
import { basForecastResultPage,modifyBasForecastResult } from "../../../services/products";
const originData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber precision ={2} controls = {false}/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入修改后的 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = (props) => {
    useEffect(() => {
        initTableData(10,1)
    }, [])
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [pageNumber,setPageNumber] = useState(10);
  const [defaultCurrent,setDefaultCurrent] = useState(1);
  const [total,setTotal] = useState(0);
  const isEditing = (record) => record.id === editingKey?true:false;

  const edit = (record) => {
    form.setFieldsValue({
      forecastLevel: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id) => {
    const row = await form.validateFields();
    //请求后端进行修改
    const ref =  await modifyBasForecastResult({id,forecastLevel:row.forecastLevel})
    if(ref.code == 200){
      message.success('修改成功');
      initTableData(10,1)
    }else{
      message.error(ref.message);
    }
    setEditingKey('');
  };
//初始化表格
const initTableData = async(pageNumber,current) =>{
        const forecastId = props.forecastId
        const res = await basForecastResultPage({forecastId,page:current,size:pageNumber})
        if(res.code == 200){
            setData(res.content.records)
            setPageNumber(pageNumber)
            setTotal(res.content.total)
        }
}
//点击分页请求方法
const onChangeBankPerson = async(current,pageNumber) =>{
    setDefaultCurrent(current)
    setPageNumber(pageNumber)
    initTableData(pageNumber,current);
    cancel()
} 
  const columns = [
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
        title: '预测水位',
        key: 'forecastLevel',
        dataIndex: 'forecastLevel',
        width: '30%',
        editable: true,
      },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);//判断是否为要编辑的行
        return editable ? (
          <span>
            <a
              href="#"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="是否取消编辑?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          // Typography排版    Typography.Link   排版自定义组件
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'forecastLevel' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
       <Table
            pagination={false}
            components={{
                body: {
                    cell: EditableCell,
                },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{ y: 280 }}
        />
        <Pagination  
                style={{float:'right'}}  
                defaultPageSize={pageNumber} 
                current = {defaultCurrent}
                total = {total} 
                onChange = {onChangeBankPerson}
            />
    </Form>
  );
};
export default EditableTable