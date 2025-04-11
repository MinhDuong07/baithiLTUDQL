import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Modal, Form, message } from "antd";
import { Supplier, fetchSupplier, createSupplier, updateSupplier, deleteSupplier } from "../api/supplier.api";
import { EditOutlined, DeleteOutlined, ShopOutlined } from "@ant-design/icons";

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Partial<Supplier>>({});
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await fetchSupplier();
      
      // Kiểm tra nếu data là mảng thì bỏ qua
      if (Array.isArray(data)) {
        setSuppliers([]);
        console.warn("Dữ liệu không hợp lệ:", data);
      } else if (Array.isArray(data.suppliers)) {
        setSuppliers(data.suppliers);
      } else {
        setSuppliers([]);
      }
  
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSave = async () => {
    try {
        const values = await form.validateFields();
        if (currentSupplier.id) {
          const response =await updateSupplier(currentSupplier.id, values);
          if(response?.supplier){
                            message.success(response?.message);
                          }else{
                            message.error(response?.message);
                          }
        } else {
          const response =await createSupplier(values);
          if(response?.supplier){
            message.success(response?.message);
          }else{
            message.error(response?.message);
          }
        }
        setIsModalOpen(false);
        loadSuppliers();
      } catch (error: any) {
        if (error.response?.status === 400) {
          message.error(error.response.data.message); // Hiển thị thông báo từ backend
        } else {
          message.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
      }
  };

  const handleEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    form.setFieldsValue(supplier);
    setIsModalOpen(true);
  };

  const confirmDelete = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsDeleteModalOpen(true);
    console.log("Đang mở modal xóa:", supplier); // Kiểm tra xem hàm có chạy không
  };

  const handleDelete = async () => {
  try {
    const response = await deleteSupplier(currentSupplier.id!);
    if (response?.supplier) {
      message.success(response?.message);
    } else {
      message.error(response?.message);
    }
    setIsDeleteModalOpen(false); // Đóng modal
    loadSuppliers();
  } catch (error) {
    message.error("Có lỗi xảy ra khi xóa nhà cung cấp.");
    setIsDeleteModalOpen(false); // Đóng modal ngay cả khi có lỗi
  }
};

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.id.toString().includes(searchText)
  );

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 20 }}>
      <ShopOutlined
        style={{
          color: "#1890ff",              // Màu tím sang trọng
          fontSize: 26,
          marginRight: 10,
          backgroundColor: "#f9f0ff",   // Nền tím nhạt
          borderRadius: "50%",
          padding: 6
        }}
      />
        Quản lý nhà cung cấp
      </h2>

      <hr style={{ borderTop: '1px solid #f0f0f0', marginBottom: '20px' }} />
  
      {/* Thanh tìm kiếm và nút thêm */}
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Input
          placeholder="🔍 Tìm kiếm theo mã nhà cung cấp..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, borderRadius: "6px" }}
        />
        <Button 
          type="primary" 
          style={{ width: "100%", maxWidth: "30px" }}
          onClick={() => { setCurrentSupplier({}); form.resetFields(); setIsModalOpen(true); }}
          size="middle"
        >
          +
        </Button>
      </Space>
  
      {/* Bảng dữ liệu */}
      <Table
        dataSource={filteredSuppliers}
        loading={loading}
        rowKey="id"
        rowClassName={(_, index) => (index % 2 === 0 ? "gray-row" : "white-row")}
        pagination={{ pageSize: 6 }}
        columns={[
          { title: "Mã NCC", dataIndex: "id", key: "id", width: 100, align: "right", onHeaderCell: () => ({ style: { textAlign: "left" } }) },
          { title: "Tên", dataIndex: "name", key: "name" },
          { title: "Địa chỉ", dataIndex: "address", key: "address" },
          { title: "Số điện thoại", dataIndex: "phone", key: "phone", align: "center" },
          { title: "Email", dataIndex: "email", key: "email" },
          {
            title: "Thao tác",
            key: "actions",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  style={{ backgroundColor: "#1890ff", borderRadius: "6px" }}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  danger
                  style={{ borderRadius: "6px" }}
                  onClick={() => confirmDelete(record)}
                />
              </Space>
            ),
          },
        ]}
      />
  
      <style>
        {`
          .gray-row { background-color: #f9f9f9 !important; }
          .white-row { background-color: #ffffff !important; }
        `}
      </style>
  
      {/* Modal Thêm/Sửa Nhà Cung Cấp */}
      <Modal
        title={currentSupplier.id ? "✏️ Chỉnh sửa nhà cung cấp" : "➕ Thêm nhà cung cấp"}
        open={isModalOpen}
        onOk={handleSave} 
        onCancel={() => setIsModalOpen(false)} // Chỉ giữ onCancel để nút "X" hoạt động
        width={700}
        footer={[
          <Button key="submit" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="name" 
            label="Tên nhà cung cấp" 
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="Nhập tên nhà cung cấp" />
          </Form.Item>
  
          <Form.Item name="address" label="Địa chỉ"> 
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
  
          <Form.Item 
            name="phone" 
            label="Số điện thoại" 
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
  
          <Form.Item name="email" label="Email"> 
            <Input type="email" placeholder="Nhập email" />
          </Form.Item>
        </Form>
      </Modal>
  
      {/* Modal Xác Nhận Xóa */}
      <Modal
        title="⚠️ Xác nhận xóa nhà cung cấp"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="🗑️ Xóa"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút hủy, chỉ còn dấu X
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#ff4d4f", marginBottom: 10 }}>
          Bạn có chắc chắn muốn xóa nhà cung cấp này không?
        </p>
        <div style={{ fontSize: "15px", lineHeight: 1.6, paddingLeft: 10 }}>
          <p><strong>🏷️ Mã NCC:</strong> {currentSupplier?.id}</p>
          <p><strong>🏢 Tên:</strong> {currentSupplier?.name}</p>
          <p><strong>📍 Địa chỉ:</strong> {currentSupplier?.address}</p>
          <p><strong>📞 Số điện thoại:</strong> {currentSupplier?.phone}</p>
          <p><strong>📧 Email:</strong> {currentSupplier?.email}</p>
        </div>
      </Modal>


    </div>
  );
  
};

export default SupplierPage;
