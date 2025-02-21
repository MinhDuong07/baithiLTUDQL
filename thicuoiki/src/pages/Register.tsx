import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card, Flex } from "antd";

const { Title, Text } = Typography;

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string; email: string; phone: string }) => {
        setLoading(true);
        try {
            const response = await register(values);
            if (response.statusCodeValue === 400 && response.body?.errors) {
                Object.keys(response.body.errors).forEach((key) => {
                    message.error(response.body.errors[key]);
                });
            } else {
                message.success("🎉 Đăng ký thành công! Chuyển hướng...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: "100vh",
                background: "#f4f6f9",
                padding: "20px",
            }}
        >
            <Card
                style={{
                    width: 400,
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    background: "#fff",
                }}
            >
                <Title level={2} style={{ textAlign: "center", color: "#333", marginBottom: 20 }}>
                    Đăng ký tài khoản
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" },
                        ]}
                    >
                        <Input placeholder="Nhập email" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                            { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" size="large" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                        style={{ borderRadius: "6px", fontSize: "16px", fontWeight: "500" }}
                    >
                        Đăng ký
                    </Button>
                </Form>

                <Text style={{ display: "block", textAlign: "center", marginTop: 15, fontSize: "14px" }}>
                    Đã có tài khoản?{" "}
                    <Link to="/login" style={{ color: "#1677ff", fontWeight: "500" }}>
                        Đăng nhập ngay
                    </Link>
                </Text>
            </Card>
        </Flex>
    );
}

export default Register;
