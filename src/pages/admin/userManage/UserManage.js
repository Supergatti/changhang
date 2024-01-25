import React, { Component } from "react";
import axios from "axios";
import { lyPrefix } from "../../../utils/config";
import {
  Form,
  Divider,
  Button,
  Table,
  Select,
  Col,
  Row,
  Spin,
  message,
  Pagination,
  Modal,
  Icon,
  Input,
  Switch,
  Radio,
} from "antd";

import {
  getUserList,
  deleteUser,
  updateUserPwd,
  updateUserRole,
  getRoleList,
  insertUser,
  updateUserValid,
} from "../../../services/project";

import { getToken } from "../../../utils/auth";
const { Option } = Select;
const { Item } = Form;
const { confirm } = Modal;

export default class BasForecastRecord extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      role: "",
      userName: "",

      nameLike: "", // 用户名称筛选

      userRole: "",
      isValid: "1", // 0 禁用 1启用
      roleCode: "", // 角色code
      roleName: "", // 角色名称

      isModalOpen1: false,

      id: "", // 用户id
      pwd1: "", // 第一次输入密码
      pwd2: "", // 第二次输入密码
      isModalOpen2: false,
      isModalOpen3: false,

      roleList: [],
      children: [],
      data: [],
      pagination: {
        defaultPageSize: 10,
        current: 1,
        total: 0,
      },
      relationModel: false,
      param: {},

      current: "1", // 页码
      pageNumber: "10", // 每页条数
    };
  }
  columns = [
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "创建人",
      dataIndex: "createUserName",
      key: "createUserName",
      align: "center",
    },
    {
      title: "创建日期",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
    },
    {
      title: "所属角色",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
    },
    {
      title: "启用状态",
      key: "isValid",
      dataIndex: "isValid",
      align: "center",
      render: (text, record) => (
        <div>
          <Switch
            className="switch"
            defaultChecked={text == "1" ? true : false}
            onChange={() => {
              this.changeStatus(record);
            }}
          />
        </div>
      ),
    },
    {
      width: "350px",
      title: "操作",
      key: "forecastResult",
      dataIndex: "forecastResult",
      align: "center",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              this.editRole(record);
            }}
          >
            修改角色
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="link"
            onClick={() => {
              this.editPassword(record);
            }}
          >
            修改密码
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="link"
            onClick={() => {
              this.del(record);
            }}
          >
            {record.isDelete == "0" ? "删除用户" : "已删除"}
          </Button>
        </div>
      ),
    },
  ];
  //查看请求事件
  opop = (e) => {
    this.props.history.push({ pathname: `/BasForecastRecordDetails/${e.id}` });
  };
  //删除请求事件
  del = async (e) => {
    if (e.isDelete == 0) {
      confirm({
        icon: <Icon type="exclamation-circle" theme="filled" />,
        content: "是否删除该记录",
        onOk: async () => {
          deleteUser({ id: e.id }).then((res) => {
            if (res) {
              this.initTableData(10, 1);
            }
          });
        },
      });
    }
  };
  //页面初始化
  componentDidMount = () => {
    this.initTableData(10, 1);
    this.getRoleList();
  };

  getRoleList = async () => {
    const res = await getRoleList();
    this.setState({
      roleList: res.content,
    });
  };

  //初始化表格
  initTableData = async () => {
    const { nameLike, current, pageNumber } = this.state;
    const roleCode = this.state.children;
    const res = await getUserList({
      page: current,
      size: pageNumber,
      nameLike,
      roleCode,
    });
    if (res.code == 200) {
      this.setState({
        data: res.content.records,
        pagination: {
          defaultPageSize: pageNumber,
          defaultCurrent: res.content.current,
          total: res.content.total,
        },
      });
    }
  };
  //点击分页请求方法
  onChangeBankPerson = async (current, pageNumber) => {
    this.setState(
      {
        pageNumber: pageNumber,
        current: current,
      },
      () => {
        this.initTableData();
      }
    );
  };
  //选择角色
  handleChange = (value, data) => {
    this.setState({
      roleCode: data.value, // 角色code
      roleName: data.children, // 角色名称
    });
  };

  handleChange1 = (value) => {
    this.setState({
      children: value,
    });
  };
  changeName = (event) => {
    this.setState({
      nameLike: event.target.value,
    });
  };
  // 第一次输入密码
  changePassword1 = (event) => {
    this.setState({
      pwd1: event.target.value,
    });
  };
  // 再次输入密码
  changePassword2 = (event) => {
    this.setState({
      pwd2: event.target.value,
    });
  };

  //查询
  submitParam = async (values) => {
    this.setState(
      {
        current: "1", // 页码
        pageNumber: "10", // 每页条数
      },
      () => {
        this.initTableData();
      }
    );
  };
  downloadExcel(form) {
    return axios({
      // 用axios发送post请求
      method: "post",
      url: lyPrefix + "/deptwave-system/sys-user/excel", // 请求地址
      data: form, // 参数
      responseType: "blob", // 表明返回服务器返回的数据类型
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    });
  }
  // 导出
  exportExcel = async (values) => {
    const { nameLike } = this.state;
    const roleCode = this.state.children;
    this.downloadExcel({ roleCode, nameLike }).then((res) => {
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.download = "用户管理表.xlsx"; //下载的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  addUser = async (values) => {
    this.setState({
      isModalOpen3: true,
    });
  };
  changeStatus = async (values) => {
    confirm({
      icon: <Icon type="exclamation-circle" theme="filled" />,
      content: "确定修改该用户的启用状态吗？",
      onOk: async () => {
        let id = values.id.toString();
        let isValid = "";
        if (values.isValid == "1") {
          isValid = "0";
        } else {
          isValid = "1";
        }
        updateUserValid({ id, isValid }).then((res) => {
          if (res.code == 200) {
          } else {
            message.error(res.message);
          }
          this.setState({
            data: [],
          });
          this.initTableData();
        });
      },
      onCancel: async () => {
        this.setState({
          data: [],
        });
        this.initTableData();
      },
    });
  };
  changeStatus2 = async (values) => {
    if (values) {
      this.setState({
        isValid: "1",
      });
    } else {
      this.setState({
        isValid: "0",
      });
    }
  };

  // 修改用户角色（弹框）
  editRole = async (values) => {
    this.setState({
      id: values.id,
      isModalOpen1: true,
      userRole: values.roleCode,
    });
  };
  changeUserRole = async (e) => {
    let userName = "";
    const { roleList } = this.state;
    for (let j = 0; j < roleList.length; j++) {
      if (roleList[j].roleCcode == e.target.value) {
        userName = roleList[j].roleName;
      }
    }
    this.setState({
      userRole: e.target.value,
      userName: userName,
    });
  };
  // 修改角色 确定，取消
  handleOk1 = async (values) => {
    const { userName, userRole, id } = this.state;
    updateUserRole({
      roleCode: userRole,
      roleName: userName,
      id,
    }).then((res) => {
      if (res.code == 200) {
        this.setState({
          id: "",
          userName: "",
          userRole: "",
          isModalOpen1: false,
          current: "1", // 页码
          pageNumber: "10", // 每页条数
        });
        this.initTableData();
      }
    });
  };
  handleCancel1 = async (values) => {
    this.setState({
      id: "",
      userName: "",
      userRole: "",
      isModalOpen1: false,
    });
  };
  // 修改用户密码（弹框）
  editPassword = async (values) => {
    this.setState({
      id: values.id,
      userName: values.userName,
      isModalOpen2: true,
    });
  };
  // 修改用户密码确定，取消
  handleOk2 = async (values) => {
    let str = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; // 必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-20之间
    if (!str.test(this.state.pwd1)) {
      message.info("密码要求至少8位，包含大小写字母，数字和特殊符号");
      return;
    }
    if (
      this.state.pwd1.toString().trim() !== this.state.pwd2.toString().trim()
    ) {
      message.info("两次输入的密码不一致！");
      return;
    }
    updateUserPwd({
      id: this.state.id,
      userPsd: this.state.pwd2,
      userName: this.state.userName,
    }).then((res) => {
      if (res.code == 200) {
        this.setState({
          isModalOpen2: false,
          id: "",
          pwd1: "",
          pwd2: "",
          current: "1", // 页码
          pageNumber: "10", // 每页条数
          userName: "",
        });
        this.initTableData();
      }
    });
  };
  handleCancel2 = async (values) => {
    this.setState({
      isModalOpen2: false,
      pwd1: "",
      pwd2: "",
      userName: "",
    });
  };
  // 新增用户确定，取消
  handleOk3 = async (values) => {
    let str = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; // 必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-20之间
    const { userName, roleCode, roleName, isValid } = this.state;
    if (userName == "") {
      message.info("请输入用户名称");
      return;
    } else if (roleCode == "") {
      message.info("请选择所属角色");
      return;
    } else if (!str.test(this.state.pwd1)) {
      message.info("密码要求至少8位，包含大小写字母，数字和特殊符号");
      return;
    }
    if (
      this.state.pwd1.toString().trim() !== this.state.pwd2.toString().trim()
    ) {
      message.info("两次输入的密码不一致！");
      return;
    }

    insertUser({
      userName,
      roleCode,
      roleName,
      userPsd: this.state.pwd2,
      isValid,
      isDelete: "0",
    }).then((res) => {
      if (res.code == 200) {
        this.setState({
          data: [],
          isModalOpen3: false,
          userName: "",
          roleCode: "",
          roleName: "",
          pwd1: "",
          pwd2: "",
          isValid: "1",
          current: "1", // 页码
          pageNumber: "10", // 每页条数
        });
        this.initTableData();
      } else {
        // 新增失败
        message.error("用户名重复，请更换用户名");
      }
    });
  };
  handleCancel3 = async (values) => {
    this.setState({
      userName: "",
      roleCode: "",
      roleName: "",
      pwd1: "",
      pwd2: "",
      isValid: "1",
      isModalOpen3: false,
    });
  };

  // 新增用户 -用户名称
  nickname(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  render() {
    const {
      data,
      roleList,
      spinning,
      userRole,
      isModalOpen1,
      isModalOpen2,
      isModalOpen3,
    } = this.state;
    const { defaultPageSize, defaultCurrent, total } = this.state.pagination;
    return (
      <div>
        <Spin spinning={spinning} tip="Loading...">
          <Row>
            <Col span={8}>
              <Item label="所属角色" name="forecastSite">
                <Select
                  mode="multiple"
                  showSearch
                  allowClear
                  style={{ width: "80%" }}
                  placeholder="请选择"
                  onChange={this.handleChange1}
                >
                  {roleList &&
                    roleList.map((item) => {
                      return (
                        <Option key={item.roleCcode}>{item.roleName}</Option>
                      );
                    })}
                </Select>
              </Item>
            </Col>
            <Col span={8}>
              <Item label="用户名称">
                <Input
                  style={{ width: "80%" }}
                  onChange={(event) => this.changeName(event)}
                />
              </Item>
            </Col>
            <Col span={8}>
              <Button
                onClick={this.submitParam}
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
              <Button
                className="margin-left-10"
                onClick={this.exportExcel}
                type="primary"
                htmlType="submit"
              >
                导出
              </Button>
              <Button
                className="margin-left-20"
                onClick={this.addUser}
                type="primary"
                htmlType="submit"
              >
                新增用户
              </Button>
            </Col>
          </Row>
          <Divider />

          <Table
            bordered
            columns={this.columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 420 }}
          />
          <Pagination
            style={{ float: "right", marginTop: "40px" }}
            defaultPageSize={defaultPageSize}
            current={defaultCurrent}
            total={total}
            onChange={this.onChangeBankPerson}
          />

          <Modal
            title="修改角色"
            open={isModalOpen1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
          >
            <Radio.Group onChange={this.changeUserRole} value={userRole}>
              {roleList &&
                roleList.map((item) => {
                  return <Radio value={item.roleCcode}>{item.roleName}</Radio>;
                })}
            </Radio.Group>
          </Modal>

          <Modal
            destroyOnClose
            width="300px"
            title="设置密码"
            open={isModalOpen2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
          >
            <div>
              <Input.Password
                style={{ width: "200px" }}
                onChange={(event) => this.changePassword1(event)}
                placeholder="设置新的登录密码"
              />
            </div>
            <div>
              <Input.Password
                style={{ width: "200px", "margin-top": "10px" }}
                onChange={(event) => this.changePassword2(event)}
                placeholder="请再次输入登录密码"
              />
            </div>
          </Modal>

          <Modal
            title="新增用户"
            destroyOnClose
            open={isModalOpen3}
            onOk={this.handleOk3}
            onCancel={this.handleCancel3}
          >
            <Form
              ref={this.formRef}
              labelAlign="right"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item name="用户名称" label="用户名称">
                <Input
                  style={{ width: "200px" }}
                  onChange={(event) => this.nickname(event)}
                  placeholder="用户名称"
                />
              </Form.Item>

              <Form.Item name="所属角色" label="所属角色">
                <Select
                  style={{ width: "80%" }}
                  placeholder="请选择"
                  onChange={this.handleChange}
                >
                  {roleList &&
                    roleList.map((item) => {
                      return (
                        <Option key={item.roleCcode}>{item.roleName}</Option>
                      );
                    })}
                </Select>
              </Form.Item>

              <Form.Item name="新密码" label="新密码">
                <Input.Password
                  style={{ width: "200px" }}
                  onChange={(event) => this.changePassword1(event)}
                  placeholder="设置登录密码"
                />
              </Form.Item>

              <Form.Item name="确认密码" label="确认密码">
                <Input.Password
                  style={{ width: "200px" }}
                  onChange={(event) => this.changePassword2(event)}
                  placeholder="请再次输入登录密码"
                />
              </Form.Item>

              <Form.Item name="启用状态" label="启用状态">
                <Switch
                  defaultChecked
                  onChange={(e) => {
                    this.changeStatus2(e);
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Spin>
      </div>
    );
  }
}
