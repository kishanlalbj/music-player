import { Button, Card, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAsync, loginAsync } from "../app/slices/auth";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    dispatch(loginAsync({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrentUserAsync()).unwrap();
      navigate("/");
    } else navigate("/login");
  }, [dispatch, isLoggedIn, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <Card title="Login" style={{ width: "445px" }}>
          <Form
            name="basic"
            layout="vertical"
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
