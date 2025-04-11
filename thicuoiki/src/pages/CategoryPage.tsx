import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Modal, TableColumnType, message, Form } from "antd";
import { Category, fetchCategories, createCategory, updateCategory, deleteCategory } from "../api/category.api";
import { EditOutlined, DeleteOutlined, PlusOutlined, UnorderedListOutlined  } from "@ant-design/icons";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({ name: "" });
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.id.toString().includes(searchQuery)
  );

  const CategoryTableColumnsType: TableColumnType<Category>[] = [
    {
      title: "Mã danh mục",
      dataIndex: "id",
      key: "id",
      width: 50, // 👈 Giảm chiều rộng
      align: "right",
      onHeaderCell: () => ({ style: { textAlign: "left" } }),
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "left",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => showDeleteModal(record)}
          />
        </Space>
      ),
    },
  ];
  

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      message.error("Không thể tải danh sách danh mục!");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      if (currentCategory.id) {
        const response = await updateCategory(currentCategory.id, { name: currentCategory.name! });
        if (response?.category) {
          message.success(response.message ?? "Cập nhật thành công!");
        } else {
          message.error(response?.message ?? "Cập nhật thất bại!");
        }
      } else {
        const response = await createCategory({ name: currentCategory.name! });
        if (response?.category) {
          message.success(response.message ?? "Thêm danh mục thành công!");
        } else {
          message.error(response?.message ?? "Thêm danh mục thất bại!");
        }
      }
      setCurrentCategory({ name: "" });
      setIsModalOpen(false);
      loadCategories();
    } catch (error: any) {
      console.error("Lỗi khi lưu danh mục:", error);
      message.error("Có lỗi xảy ra khi lưu danh mục!");
    }
  };
  

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const showDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
      try {
        const response = await deleteCategory(categoryToDelete.id);
        if (response?.isSuccess) {
          message.success(response.message ?? "Xóa thành công!");
        } else {
          message.error(response?.message ?? "Xóa thất bại!");
        }
        setIsDeleteModalOpen(false);
        loadCategories();
      } catch (error: any) {
        console.error("Lỗi khi xóa danh mục:", error);
        message.error(error?.response?.data?.message ?? "Xóa thất bại do lỗi không xác định!");
      }
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
  <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 20 }}>
  <UnorderedListOutlined
        style={{
          color: "#1890ff",     // Màu xanh dương (chuyên nghiệp)
          fontSize: 28,         // Tăng kích thước cho nổi bật
          marginRight: 10,
          backgroundColor: "#e6f7ff",  // Viền nền nhẹ
          borderRadius: "50%",
          padding: 6
        }}
      />
    Quản lý danh mục</h2>
  
  {/* Thêm đường kẻ ngang */}
  <hr style={{ borderTop: '1px solid #f0f0f0', marginBottom: '20px' }} />

  {/* Input tìm kiếm */}
  <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
    <Input
      placeholder="🔍 Tìm kiếm theo mã, tên danh mục"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ width: '300px', marginRight: '10px' }}
    />
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => setIsModalOpen(true)}
      style={{ padding: '10px 10px', marginLeft: 'auto' }}
    >
    </Button>
  </div>

  {/* Bảng danh mục */}
  <Table
    dataSource={filteredCategories}
    loading={loading}
    rowKey="id"
    columns={CategoryTableColumnsType}
    rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
    pagination={{ pageSize: 6 }}
    style={{ width: '100%' }}
  />
  
  {/* CSS cho bảng */}
  <style>
    {`
      .even-row { background-color: #f5f5f5; }
      .odd-row { background-color: #ffffff; }
    `}
  </style>

      {/* Modal thêm/sửa danh mục */}
      <Modal
        title={currentCategory.id ? "✏️ Chỉnh sửa danh mục" : "➕ Thêm danh mục"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút "Hủy"
        width={500}
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input
              placeholder="Nhập tên danh mục..."
              value={currentCategory.name}
              onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="⚠️ Xác nhận xóa"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="🗑️ Xóa"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút "Hủy"
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#ff4d4f" }}>
          Bạn có chắc chắn muốn xóa danh mục "<span style={{ color: "#000" }}>{categoryToDelete?.name}</span>" không?
        </p>
      </Modal>

    </div>
  );
};

export default CategoryPage;
