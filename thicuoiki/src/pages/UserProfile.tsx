import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth.api";
import { fetchCustomerByUserId, updateCustomerForUser } from "../api/customer.api";
import { Customer } from "../api/customer.api";
import { 
  Card, Spin, Typography, Button, Modal, Form, Input, message, 
  Row, Space, Avatar, Divider, Col 
} from "antd";
import { LogoutOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import UserOrderPage from "./UserOrderPage";

const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);

        if (userData && userData.id) {
          const customerData = await fetchCustomerByUserId(userData.id);
          setCustomer(customerData);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleEdit = () => {
    if (customer) {
      form.setFieldsValue(customer);
      setIsModalOpen(true);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = await form.validateFields();
      if (customer) {
        const response = await updateCustomerForUser(customer.id, updatedData);
        if (response) {
          setCustomer(response.customer);
          if(response?.customer){
                    message.success(response?.message);
                  }else{
                    message.error(response?.message);
                  }
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    message.success("Đăng xuất thành công");
    window.location.href = "/";
  };

  const handleViewOrders = async () => {
    setIsOrderModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card bordered={false} className="shadow-lg rounded-lg p-6 bg-white">
  {/* Tiêu đề và nút đăng xuất */}
  <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
    <Title level={2} style={{ margin: 0 }}>👤 Hồ sơ của tôi</Title>
    <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
      Đăng Xuất
    </Button>
  </Row>

  <Divider />

  {/* Thông tin người dùng */}
  <Row gutter={24}>
    {/* Cột avatar và username */}
    <Col span={8}>
      <Card bordered className="text-center" style={{ borderRadius: 12 }}>
        <Space direction="vertical" align="center" size="middle">
          <Avatar size={100} icon={<UserOutlined />} />
          <Title level={4} style={{ marginBottom: 0 }}>{user?.username}</Title>
          <Text type="secondary">📧 {user?.email}</Text>
        </Space>
      </Card>
    </Col>

    {/* Cột thông tin cá nhân */}
    <Col span={16}>
      <Card
        title="📝 Thông Tin Cá Nhân"
        extra={
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Chỉnh Sửa
          </Button>
        }
        bordered
        style={{ borderRadius: 12 }}
      >
        <p style={{ marginBottom: 10 }}>
          <Text strong>👤 Tên:</Text> {customer?.fullName}
        </p>
        <p style={{ marginBottom: 10 }}>
          <Text strong>📞 Số Điện Thoại:</Text> {customer?.phone}
        </p>
        <p style={{ marginBottom: 0 }}>
          <Text strong>🏠 Địa Chỉ:</Text> {customer?.address}
        </p>
      </Card>
    </Col>
  </Row>

  <Divider />

  {/* Nút xem đơn hàng */}
  <Row justify="end">
    <Button onClick={handleViewOrders}>
      🧾 Xem Đơn Hàng
    </Button>
  </Row>
</Card>


      {/* Modal - Xem danh sách đơn hàng */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            🧾 <span style={{ fontWeight: 600 }}>Danh Sách Đơn Hàng</span>
          </div>
        }
        open={isOrderModalOpen}
        onCancel={() => setIsOrderModalOpen(false)}
        footer={null}
        centered
        width={900} // Mở rộng để vừa hiển thị bảng đẹp hơn
        bodyStyle={{ padding: 24, backgroundColor: "#fafafa", borderRadius: "8px" }}
      >
        <div style={{ marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "#555" }}>
            Đây là các đơn hàng gần đây của bạn. Nhấn vào từng đơn để xem chi tiết.
          </p>
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <UserOrderPage />
        </div>
      </Modal>


      {/* Modal - Chỉnh sửa thông tin khách hàng */}
      <Modal
        title="✏️ Chỉnh Sửa Thông Tin"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        centered
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ paddingTop: 10 }}
        >
          <Form.Item
            label={<strong>👤 Họ Tên</strong>}
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên đầy đủ" />
          </Form.Item>

          <Form.Item
            label={<strong>📞 Số Điện Thoại</strong>}
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input placeholder="VD: 0987654321" maxLength={10} />
          </Form.Item>

          <Form.Item
            label={<strong>🏠 Địa Chỉ</strong>}
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea
              placeholder="Nhập địa chỉ nơi ở"
              autoSize={{ minRows: 2, maxRows: 4 }}
              showCount
              maxLength={255}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default UserProfile;