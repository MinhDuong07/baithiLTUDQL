import { useState } from "react";
import { getCurrentUser, login } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await login(values);
            if (response) {
                localStorage.setItem("token", response);
                message.success("Đăng nhập thành công!");
                const user = await getCurrentUser();
                console.log("User info:", user);

                const role = user.roles.length > 0 ? user.roles[0].name : null;
                if (role === "ADMIN") {
                    navigate("/page/admin");
                } else {
                    navigate("/page");
                }
            }
        } catch {
            message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex justify="center" align="center" style={{ height: "100vh", background: "#f4f6f9" }}>
            <Card
                style={{
                    width: 400,
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    background: "white",
                }}
            >
                <Title level={2} style={{ textAlign: "center", marginBottom: 20, color: "#333" }}>
                    Đăng nhập
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Nhập mật khẩu"
                            size="large"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                        style={{
                            background: "#1677ff",
                            borderRadius: "6px",
                            transition: "0.3s",
                        }}
                    >
                        Đăng nhập
                    </Button>
                </Form>

                <Text style={{ display: "block", textAlign: "center", marginTop: 15 }}>
                    Chưa có tài khoản?{" "}
                    <Link to="/register" style={{ color: "#1677ff", fontWeight: "500" }}>
                        Đăng ký ngay
                    </Link>
                </Text>
            </Card>
        </Flex>
    );
}

export default Login;
