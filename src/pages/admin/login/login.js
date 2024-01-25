import React, { Component } from "react";
import { Button, Form, Input, message } from "antd";
import { captchaImage, loginGo } from "../../../services/project";
import { setToken } from "../../../utils/auth";
import "./login.css";
export default class login extends Component {
  // this.props.history.push({ pathname: `/BasFileUpload` }); // 页面跳转
  constructor() {
    super();
    this.state = {
      username: "", // 用户名
      userPsd: "", // 密码
      img: "", // 图片流
      uuid: "", // uuid
      code: "", // code验证码
    };
  }
  componentDidMount = () => {
    // this.captchaImage();
  };
  // 获取验证码
  captchaImage = async () => {
    const res = await captchaImage();
    if (res.code == 200) {
      this.setState({
        img: "data:image/png;base64,".concat(res.content.img),
        uuid: res.content.uuid,
      });
    }
  };
  render() {
    this.props.history.push({ pathname: `/BasFileUpload` }); // 页面跳转
    const { img } = this.state;
    // 提交表单且数据验证成功后回调事件
    const onFinish = (values) => {
      // const { uuid } = this.state;
      loginGo({
        // uuid,
        password: values.password,
        username: values.username,
        // code: values.code,
      }).then((res) => {
        if (res.code == 200) {
          setToken(res.content.token); // 将返回的token保存到本地

          // 判断当前用户是否为第一次登录该系统
          if (res.content.isFirstLogin == 0) {
            let isModalOpen3 = true;
            sessionStorage.setItem("isModalOpen3", isModalOpen3);
          }
          this.props.history.push({ pathname: `/BasFileUpload` }); // 页面跳转
        } else {
          message.error(res.message);
        }
      });
    };
    // 提交表单且数据验证失败后回调事件
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <div className="Bigbox">
        <p className="title">航道水位预测系统</p>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ width: "368px" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input style={{ height: "40px" }} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              style={{ height: "40px" }}
              placeholder="请输入密码"
            />
          </Form.Item>

          {/* <div className="surround">
            <Form.Item
              className="special"
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码!",
                },
              ]}
            >
              <Input style={{ height: "40px" }} placeholder="请输入验证码" />
            </Form.Item>
            {img && <img src={img} onClick={() => {this.captchaImage();}} />}
          </div> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{ height: "40px" }} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
