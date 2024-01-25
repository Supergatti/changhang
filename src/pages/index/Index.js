import React, { Component } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Space,
  Modal,
  Input,
  message,
  Button,
} from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.css";
import { BrowserRouter, withRouter } from "react-router-dom";

import {
  clearToken,
  setId,
  getId,
  clearId,
  getRole,
  setRole,
  clearRole,
} from "../../utils/auth";
import { getUser, updateUserPwd, checkUserPwd } from "../../services/project"; // 获取前挡用户

import headPortrait from "./headPortrait.png"; // 用户头像图片（默认）

const { Header, Sider, Content, Footer } = Layout;

class Index extends Component {
  state = {
    pwd: "", // 旧密码
    pwd1: "", // 第一次输入密码
    pwd2: "", // 第二次输入密码
    isModalOpen2: false,
    isModalOpen3: false,
    collapsed: false,
    // userName: sessionStorage.getItem("userName") || "你好",
    userName: "",
    roleCode: getRole(),
  };

  UNSAFE_componentWillMount() {
    if (sessionStorage.getItem("isModalOpen3")) {
      this.setState({
        isModalOpen3: sessionStorage.getItem("isModalOpen3"),
      });
    }
  }
  //页面初始化
  componentDidMount = () => {
    // this.getUser();
  };
  // 组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps(nextProps) {
    this.getUser();
  }
  getUser = async () => {
    const res = await getUser();
    console.log(res);
    if (res.code == 401) {
      clearToken(); // 清除token
      clearId(); // 清除id
      clearRole(); // 清除角色code
      sessionStorage.removeItem("userName"); // 清除保存到本地的用户名
      // this.props.history.push({ pathname: `/` }); // 页面跳转
    } else if (res.code == 200) {
      setId(res.content.id); // 保存用户id
      setRole(res.content.roleCode); // 用户角色code
      sessionStorage.setItem("userName", res.content.userName); // 保存用户名称  userName
      this.setState({
        roleCode: res.content.roleCode,
        userName: res.content.userName,
      });
    }
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  //菜单跳转
  menuOnClick = (path) => {
    this.props.history.push(path);
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleMenuClick = (val) => {
    if (val.key === "0") {
      //修改密码
      this.setState({
        isModalOpen2: true,
      });
    } else {
      //退出登录
      clearToken(); // 清除token
      clearId(); // 清除id
      clearRole(); // 清除角色code
      sessionStorage.removeItem("isModalOpen3"); // 清除该用户第一次登录保存的值
      this.props.history.push({ pathname: `/` }); // 页面跳转
    }
  };
  // 修改用户密码确定，取消
  handleOk2 = async (values) => {
    let str = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; // 必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-20之间
    const id = getId();
    const userName = sessionStorage.getItem("userName"); 
    if (
      this.state.pwd.toString().trim().length < 6 ||
      this.state.pwd.toString().trim().length > 20
    ) {
      message.info("请输入格式正确的旧密码");
      return;
    }
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
    // 先判断旧密码是否正确，正确才会执行修改密码的功能
    checkUserPwd({
      id,
      userPsd: this.state.pwd,
    }).then((res) => {
      if (res.code == 200) {
        updateUserPwd({
          id,
          userPsd: this.state.pwd2,userName
        }).then((res) => {
          if (res.code == 200) {
            message.success("密码修改成功");
            this.setState({
              isModalOpen2: false,
              isModalOpen3: false,
              pwd: "",
              pwd1: "",
              pwd2: "",
            });
            sessionStorage.removeItem("isModalOpen3");
          }
        });
      } else {
        message.error(res.message);
      }
    });
  };
  handleCancel2 = async (values) => {
    this.setState({
      isModalOpen2: false, // 修改密码弹框
      isModalOpen3: false,
      pwd: "", // 旧密码
      pwd1: "", // 第一次输入密码
      pwd2: "", // 第二次输入密码
    });
    sessionStorage.removeItem("isModalOpen3"); // 清除该用户第一次登录保存的值
  };

  handleCancel3 = async () => {
    //退出登录
    clearToken(); // 清除token
    clearId(); // 清除id
    clearRole(); // 清除角色code
    sessionStorage.removeItem("isModalOpen3"); // 清除该用户第一次登录保存的值
    this.props.history.push({ pathname: `/` }); // 页面跳转
  };

  // 旧密码
  changePasswordOld = (event) => {
    this.setState({
      pwd: event.target.value,
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

  render() {
    const { collapsed, isModalOpen2, roleCode, isModalOpen3 } = this.state;

    const items = [
      {
        label: "修改密码",
        key: "0",
      },
      {
        label: "退出登录",
        key: "1",
      },
    ];
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu
            collapsible
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => this.menuOnClick("/BasFileUpload")}
            >
              数据导入
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/WaterLevel")}
            >
              历史水位信息
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/BasForecastRecord")}
            >
              水位预测
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/WaterSiteForecast")}
            >
              水位误差分析
            </Menu.Item>
            {/* <Menu.Item
              key="5"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/WaterSiteForecastOther")}
            >
              水动力模型误差分析
            </Menu.Item> */}

            <Menu.Item
              key="6"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/OtherWaterLevel")}
            >
              其他站点水位
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/ManualForecast")}
            >
              人工预测水位
            </Menu.Item>

            <Menu.Item
              key="8"
              icon={<VideoCameraOutlined />}
              onClick={() => this.menuOnClick("/SevenDays")}
            >
              7天水位预测对比
            </Menu.Item>
            {roleCode == "RO_01" && (
              <Menu.Item
                key="9"
                icon={<UserOutlined />}
                onClick={() => this.menuOnClick("/UserManage")}
              >
                用户管理
              </Menu.Item>
            )}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="right-name">
              <Dropdown
                menu={{ items, onClick: this.handleMenuClick }}
                trigger={["hover"]}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    lineHeight: "initial",
                    height: "35px",
                    display: "inline-block",
                  }}
                >
                  <Space>
                    <img
                      src={headPortrait}
                      style={{ width: "30px", height: "30px" }}
                    />
                    您好,{this.state.userName ? this.state.userName : "您好"}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
              height: "calc(100% - 64px)",
              overflow: "auto",
            }}
          >
            <div className="site-layout-background" style={{ padding: 24 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>

        {/* 修改密码弹框  */}
        <Modal
          destroyOnClose
          width="300px"
          title="设置密码"
          open={isModalOpen2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <div>
            <span style={{ width: "70px", display: "inline-block" }}>
              旧密码：
            </span>
            <Input.Password
              style={{ width: "180px" }}
              onChange={(event) => this.changePasswordOld(event)}
              placeholder="请输入旧登录密码"
            />
          </div>
          <div>
            <span style={{ width: "70px", display: "inline-block" }}>
              新密码：
            </span>
            <Input.Password
              style={{ width: "180px", "margin-top": "10px" }}
              onChange={(event) => this.changePassword1(event)}
              placeholder="请输入新登录密码"
            />
          </div>
          <div>
            <span style={{ width: "70px", display: "inline-block" }}>
              确定密码：
            </span>
            <Input.Password
              style={{ width: "180px", "margin-top": "10px" }}
              onChange={(event) => this.changePassword2(event)}
              placeholder="请再次输入登录密码"
            />
          </div>
        </Modal>

        {/* 用户首次登录时展示的弹框 */}
        <Modal
          className="firstUser"
          destroyOnClose
          width="400px"
          title="修改密码"
          open={isModalOpen3}
          onOk={this.handleOk2}
          onCancel={this.handleCancel3}
          footer=""
        >
          <div>
            <Input.Password
              style={{ width: "180px" }}
              onChange={(event) => this.changePasswordOld(event)}
              placeholder="请输入旧登录密码"
            />
          </div>
          <div>
            <Input.Password
              style={{ width: "180px", "margin-top": "10px" }}
              onChange={(event) => this.changePassword1(event)}
              placeholder="请输入新登录密码"
            />
          </div>
          <div>
            <Input.Password
              style={{ width: "180px", "margin-top": "10px" }}
              onChange={(event) => this.changePassword2(event)}
              placeholder="请再次输入登录密码"
            />
          </div>
          <div style={{ "margin-top": "20px", "text-align": "right" }}>
            <Button
              onClick={() => {
                this.handleOk2();
              }}
              type="primary"
            >
              确定
            </Button>
          </div>
        </Modal>
      </Layout>
    );
  }
}
export default withRouter(Index);
