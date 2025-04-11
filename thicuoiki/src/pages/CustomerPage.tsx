import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Modal, Form, message, Card, Row, Col } from "antd";
import { Customer, fetchAllCustomers, createCustomer, updateCustomer, deleteCustomer } from "../api/customer.api";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";


const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Partial<Customer>>({});
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCustomers();
      setCustomers(Array.isArray(data?.customers) ? data.customers : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (currentCustomer.id) {
        const response = await updateCustomer(currentCustomer.id, values);
        if(response?.customer){
          message.success(response?.message);
        }else{
          message.error(response?.message);
        }

      } else {
        const response = await createCustomer(values);
        if(response?.customer){
          message.success(response?.message);
        }else{
          message.error(response?.message);
        }

      }
      setIsModalOpen(false);
      loadCustomers();
    } catch {
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleEdit = (customer: Customer) => {
    setCurrentCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalOpen(true);
  };

  const confirmDelete = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (currentCustomer.id) {
      const response = await deleteCustomer(currentCustomer.id);
      if(response?.isSuccess){
          message.success(response.message);
      }else{
        message.error(response?.message)
      }

      loadCustomers();
    }
    setIsDeleteModalOpen(false);
  };

  const filteredCustomers = customers.filter(c =>
    (c.fullName?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
    (c.phone?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
    (c.id?.toString() || "").includes(searchText) ||
    (c.address?.toLowerCase() || "").includes(searchText)
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <style>
      {`
        .gray-row {
          background-color: #f5f5f5 !important;
        }
      `}
    </style>
    <Card title={<span style={{ fontSize: "24px", fontWeight: "bold" }}>
    <UserOutlined
        style={{
          color: "#1890ff",     // Màu xanh dương (chuyên nghiệp)
          fontSize: 28,         // Tăng kích thước cho nổi bật
          marginRight: 10,
          backgroundColor: "#e6f7ff",  // Viền nền nhẹ
          borderRadius: "50%",
          padding: 6
        }}
      />
      Quản lý khách hàng</span>}
      bordered={false}
      style={{ marginBottom: 20, padding: 20 }}>
  <Row gutter={[16, 16]} justify="space-between" align="middle">
    <Col xs={24} sm={16}>
      <Input
        placeholder="🔍 Tìm kiếm theo mã, tên, số điện thoại, địa chỉ"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}
      />
    </Col>
    <Col xs={24} sm={8} style={{ textAlign: "right" }}>
    <Button
      type="primary"
      onClick={() => {
        setCurrentCustomer({});
        form.resetFields();
        setIsModalOpen(true);
      }}
      style={{ width: "100%", maxWidth: "30px" }} // Giảm kích thước nút
      size="middle"  // Đặt kích thước nhỏ cho nút
    >
      +
    </Button>

    </Col>
  </Row>
</Card>

<Table
  dataSource={filteredCustomers}
  loading={loading}
  rowKey="id"
  pagination={{ pageSize: 6 }}
  rowClassName={(_, index) => (index % 2 === 0 ? "gray-row" : "")} // Thêm màu xen kẽ
  columns={[
    { title: "Mã khách hàng", dataIndex: "id", key: "id", align: "right", width: 120, onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { title: "Tên", dataIndex: "fullName", key: "fullName" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone", align: "right", onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(record)}
          />
        </Space>
      ),
    }
  ]}
/>

<Modal
  title={currentCustomer.id ? "✏️ Chỉnh sửa khách hàng" : "➕ Thêm khách hàng"}
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  width={700} // Mở rộng modal cho thoáng
  footer={[
    <Button key="submit" type="primary" onClick={handleSave}>
      {currentCustomer.id ? "Lưu" : "Lưu"}
    </Button>,
  ]}
>
  <Card bordered={false}>
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        {/* Cột 1: Tên khách hàng */}
        <Col span={12}>
          <Form.Item
            name="fullName"
            label="👤 Tên khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
        </Col>

        {/* Cột 2: Số điện thoại */}
        <Col span={12}>
          <Form.Item
            name="phone"
            label="📞 Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải có đúng 10 chữ số" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>

      {/* Địa chỉ (Full width) */}
      <Form.Item name="address" label="📍 Địa chỉ">
        <Input.TextArea rows={2} placeholder="Nhập địa chỉ khách hàng" />
      </Form.Item>
    </Form>
  </Card>
</Modal>

{/* Modal xác nhận xóa */}
<Modal
  title="⚠️ Xác nhận xóa khách hàng"
  open={isDeleteModalOpen}
  onOk={handleDelete}
  onCancel={() => setIsDeleteModalOpen(false)}
  okText="🗑️ Xóa"
  okButtonProps={{ danger: true }}
  cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút "Hủy"
>
  <p style={{ fontSize: "16px", fontWeight: "bold", color: "#ff4d4f" }}>
    Bạn có chắc chắn muốn xóa khách hàng này không?
  </p>
  <p><strong>🏷️ Mã khách hàng:</strong> {currentCustomer?.id?.toString()}</p>
  <p><strong>👤 Tên:</strong> {currentCustomer.fullName}</p>
  <p><strong>📞 Số điện thoại:</strong> {currentCustomer.phone}</p>
  <p><strong>📍 Địa chỉ:</strong> {currentCustomer.address}</p>
</Modal>
    </div>
  );
};

export default CustomerPage;
