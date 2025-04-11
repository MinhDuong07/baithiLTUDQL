import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Select, Form, InputNumber, message, Input, Row, Col } from "antd";
import { fetchProduct } from "../api/product.api";
import { fetchSupplier } from "../api/supplier.api";
import { fetchStockEntries, createStockEntry, updateStockEntry, deleteStockEntry } from "../api/stock_entry.api";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined, DropboxOutlined } from "@ant-design/icons";

const { Option } = Select;

const StockEntryPage: React.FC = () => {
  
  interface StockEntry {
    id: number;
    product?: { id: number; name: string };
    supplier?: { id: number; name: string };
    quantity: number;
    price: number;
    entryDate?: string;
    
  }
  
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);

  interface Product {
    id: number;
    name: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  interface Supplier {
    
    id: number;
    name: string;
  }

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchId, setSearchId] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<StockEntry[]>([]);
  const [currentSupplier, setCurrentSupplier] = useState<{ id?: number; name?: string; address?: string; phone?: string; email?: string } | null>(null);


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteEntry, setDeleteEntry] = useState<{ id: number; product?: { name: string }; supplier?: { name: string }; quantity: number; price: number } | null>(null);

  const handleDeleteClick = (entry: { id: number; product?: { name: string }; supplier?: { name: string }; quantity: number; price: number }) => {
    setDeleteEntry(entry);
    const supplier = suppliers.find(s => s.id === entry.supplier?.id);
    if (supplier) {
      setCurrentSupplier({
        id: supplier.id,
        name: supplier.name,
        // Add other supplier properties if available
      });
    }
    setIsDeleteModalOpen(true);
  };
  
  useEffect(() => {
    loadStockEntries();
    loadProducts();
    loadSuppliers();
  }, []);

  const loadStockEntries = async () => {
    setLoading(true);
    const data = await fetchStockEntries();
    setStockEntries(data.stock_entries);
    setFilteredEntries(data.stock_entries);
    setLoading(false);
  };

  const loadProducts = async () => {
    const data = await fetchProduct();
    setProducts(data);
  };

  const loadSuppliers = async () => {
    const data = await fetchSupplier();
    setSuppliers(data.suppliers);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (values.id) {
        const response = await updateStockEntry(values.id, values);
        if(response?.stock_entry){
          message.success(response?.message);
        }else{
          message.error(response?.message);
        }
      } else {
        const response = await createStockEntry(values);
        if(response?.isSuccess){
          message.success(response?.message);
        }else{
          message.error(response?.message);
        }
      }
      setIsModalOpen(false);
      loadStockEntries();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Lỗi khi lưu nhập kho:", error);
    }
  };

  const handleEdit = (entry: StockEntry) => {
    form.setFieldsValue({
      id: entry.id,
      productId: entry.product?.id,
      supplierId: entry.supplier?.id,
      quantity: entry.quantity,
      price: entry.price,
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!deleteEntry) return;
  
    try {
      const response = await deleteStockEntry(deleteEntry.id);
      if(response?.isSuccess){
        message.success(response?.message);
      }else{
        message.error(response?.message);
      }
      loadStockEntries();
    } catch (error) {
      message.error("Lỗi khi xóa nhập kho!");
      console.error("Lỗi khi xóa:", error);
    }
  
    setIsDeleteModalOpen(false);
  };

  const columns = [
    { title: "Mã nhập hàng", dataIndex: "id", key: "id", width: 80, align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { title: "Tên sản phẩm", dataIndex: ["product", "name"], key: "product" },
    { title: "Nhà cung cấp", dataIndex: ["supplier", "name"], key: "supplier", width: 250 },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity", align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }) , width: 120, sorter: (a: StockEntry, b: StockEntry) => a.quantity - b.quantity},
    { 
      title: "Giá nhập (VNĐ)", 
      dataIndex: "price", 
      key: "price", 
      width: 120,
      align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }) , // Căn phải giá nhập
      sorter: (a: StockEntry, b: StockEntry) => a.price - b.price,
      render: (price: number) => 
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
    },

    { 
      title: "Ngày nhập", 
      dataIndex: "entryDate", 
      key: "entryDate", 
      width: 120, 
      align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }), // Căn phải ngày nhập
      render: (date: string) => dayjs(date).format("YYYY-MM-DD") // Định dạng Năm - Tháng - Ngày
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: unknown, record: StockEntry) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchId(value);
    if (!value) {
      setFilteredEntries(stockEntries); 
    } else {
      setFilteredEntries(stockEntries.filter((entry) => entry.id.toString().includes(value)));
    }
  };

  return (
    <div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <DropboxOutlined style={{ color: "#1890ff",     // Màu xanh dương (chuyên nghiệp)
                  fontSize: 28,         // Tăng kích thước cho nổi bật
                  marginRight: 10,
                  backgroundColor: "#e6f7ff",  // Viền nền nhẹ
                  borderRadius: "50%",
                  padding: 6 }} />
        <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          Quản lý lịch sử nhập hàng
        </h2>
      </div>


  <hr style={{ borderTop: '1px solid #f0f0f0', marginBottom: '20px' }} />

  {/* Thanh tìm kiếm & Nút thêm */}
  <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
    <Input
      placeholder="🔍 Tìm kiếm theo mã nhập hàng..."
      value={searchId}
      onChange={handleSearch}
      style={{ width: 300, marginRight: 10 }}
    />
    <Col span={18} style={{ textAlign: 'right' }}>
      <Button
        type="primary"
        style={{
          width: "100%", maxWidth: "30px"
        }}
        onClick={() => {
          form.resetFields();
          setIsModalOpen(true);
        }}
        size="middle"
      >
        +
      </Button>
    </Col>
    </div>

      <Table 
        dataSource={filteredEntries} 
        loading={loading} 
        rowKey="id" 
        columns={columns} 
        rowClassName={(_, index) => (index % 2 === 0 ? "gray-row" : "white-row")} 
        pagination={{pageSize: 6}}
      />

      <style>
        {`
          .gray-row {
            background-color: #f5f5f5; /* Màu xám nhạt */
          }
          .white-row {
            background-color: #ffffff; /* Màu trắng */
          }
          .gray-row:hover,
          .white-row:hover {
            background-color: #e0e0e0 !important; /* Màu khi hover */
          }
        `}
      </style>
      <Modal
        title={form.getFieldValue("id") ? "✏️ Chỉnh sửa đơn nhập hàng" : "➕ Thêm đơn nhập hàng"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút Hủy
      >
        <Form form={form} layout="vertical">
          {/* Mã nhập hàng (ẩn) */}
          <Form.Item name="id" hidden>
            <InputNumber />
          </Form.Item>

          <Row gutter={16}>
            {/* Chọn sản phẩm */}
            <Col span={12}>
              <Form.Item
                name="productId"
                label="Sản phẩm"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
              >
                <Select placeholder="Chọn sản phẩm">
                  {products.map((product) => (
                    <Option key={product.id} value={product.id}>
                      {product.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Chọn nhà cung cấp */}
            <Col span={12}>
              <Form.Item
                name="supplierId"
                label="Nhà cung cấp"
                rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp!" }]}
              >
                <Select placeholder="Chọn nhà cung cấp">
                  {suppliers.map((supplier) => (
                    <Option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Số lượng */}
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>

            {/* Giá nhập */}
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá nhập"
                rules={[{ required: true, message: "Vui lòng nhập giá nhập!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập giá nhập" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="⚠️ Xác nhận xóa đơn nhập hàng"
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="🗑️ Xóa"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ff4d4f", marginBottom: 10 }}>
          Bạn có chắc chắn muốn xóa đơn nhập hàng này không?
        </div>
        <p style={{ fontSize: "14px", color: "#595959", marginLeft: 5 }}>
          Hành động này không thể hoàn tác. Vui lòng xác nhận trước khi tiếp tục.
        </p>
        <div style={{ fontSize: "15px", lineHeight: 1.6, paddingLeft: 10 }}>
          <p><strong>🏷️ Mã nhập hàng:</strong> {deleteEntry?.id}</p>
          <p><strong>🏢 Tên sản phẩm:</strong> {deleteEntry?.product?.name}</p>
          <p><strong>🏢 Nhà cung cấp:</strong> {deleteEntry?.supplier?.name}</p> 
          <p><strong>🔢 Số lượng:</strong> {deleteEntry?.quantity}</p>
          <p><strong>💰 Giá nhập:</strong> {deleteEntry?.price}</p>
        </div>
      </Modal>

    </div>
  );
};

export default StockEntryPage;
