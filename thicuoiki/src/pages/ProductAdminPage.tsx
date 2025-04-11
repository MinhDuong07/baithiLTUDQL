import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Space, Input, Modal, InputNumber, Select, Form, message, Card, Row, Col, Descriptions, Tag } from "antd";
import { Product, fetchProduct, createProduct, updateProduct, deleteProduct } from "../api/product.api";
import { Category, fetchCategories } from "../api/category.api";
import moment from "moment";
import { addToCart } from "../api/cart.api";
import { readRoles } from "../utils/localstorage";
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Option } = Select;

// Custom InputNumber component để loại bỏ các thuộc tính không mong muốn
const CustomInputNumber = ({ value, onChange, ...props }: any) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current.input;
      if (inputElement) {
        inputElement.removeAttribute('autocomplete');
        inputElement.removeAttribute('role');
        inputElement.removeAttribute('aria-valuemin');
        inputElement.removeAttribute('aria-valuenow');
        inputElement.removeAttribute('step');
        inputElement.removeAttribute('class');
      }
    }
  }, []);

  return <InputNumber ref={inputRef} value={value} onChange={onChange} {...props} />;
};

const ProductAdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});

  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    image: "",
    woodType: "",
    size: "",
    category: { id: 1, name: "" },
    status: "available",
  });

  useEffect(() => {
    loadCategories();
    const timeout = setTimeout(() => {
      loadProducts();
    }, 300); // Chỉ tìm kiếm sau khi người dùng ngừng nhập 0.3s
  
    return () => clearTimeout(timeout); // Hủy bỏ timeout khi searchTerm thay đổi
  }, [searchTerm]);
  

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProduct();
      let filteredProducts = Array.isArray(data) ? data : [];
  
      if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.id.toString().includes(searchTerm) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
    setLoading(false);
  };
  

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const handleSave = async () => {
    if (!currentProduct.name || !currentProduct.price || currentProduct.price <= 0) {
      alert("Tên sản phẩm và giá không được để trống và giá phải lớn hơn 0!");
      return;
    }

    if (currentProduct.id) {
      const response = await updateProduct(currentProduct.id, currentProduct);
      message.success(response?.message)
    } else {
      const response = await createProduct(currentProduct);
      message.success(response?.message)
    }

    setCurrentProduct({
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      image: "",
      woodType: "",
      size: "",
      category: { id: categories[0]?.id || 1, name: "" },
      status: "available",
    });

    setIsModalOpen(false);
    loadProducts();
  };

  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsConfirmModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        const response = await deleteProduct(selectedProduct.id);
        if(response?.isSuccess){
                      message.success(response?.message);
                    }else{
                      message.error(response?.message);
                    }
        setIsConfirmModalOpen(false);
        loadProducts();

      } catch (error: any) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        // if (error.response?.status === 400) {
        //   message.error(error.response.data.message);
        // } else {
        //   message.error("Không thể xóa sản phẩm này. Sản phẩm đang được sử dụng ở nơi khác.");
        // }
      }
    }
  };

  const handleDetail = (product: Product) => {
    setCurrentProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddToCart = async (productId: number) => {
    const quantity = selectedQuantities[productId] || 1; // Nếu chưa chọn, mặc định là 1
    try {
      const response = await addToCart({ productId, quantity });
      if (response) {
        message.success("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        message.error("Thêm sản phẩm vào giỏ hàng thất bại.");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm vào giỏ hàng.");
    }
  };

  const handleQuantityChange = (productId: number, quantity: number | null) => {
    if (quantity !== null && quantity > 0) {
      setSelectedQuantities((prev) => ({ ...prev, [productId]: quantity }));
    }
  };

  const role = readRoles() || "USER";

  const columns = [
    { 
      title: "Mã sản phẩm", 
      dataIndex: "id", 
      key: "id", 
      width: 100,
      sorter: (a: Product, b: Product) => a.id - b.id,
      align: "right", onHeaderCell: () => ({ style: { textAlign: "center" } }), // Căn phải cho số
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? <img src={image} alt="Sản phẩm" style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }} /> : "Không có ảnh",
      align: "center", // Căn giữa cho hình ảnh
    },
    { 
      title: "Tên sản phẩm", 
      dataIndex: "name", 
      key: "name",
      align: "left", onHeaderCell: () => ({ style: { textAlign: "center" } }), // Căn trái cho chữ
    },
    { 
      title: "Giá", 
      dataIndex: "price", 
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      align: "right", onHeaderCell: () => ({ style: { textAlign: "center" } }), // Căn phải cho số
      render: (price: number) => `${price.toLocaleString()} VND`, // Định dạng số tiền
    },
    { 
      title: "Số lượng", 
      dataIndex: "quantity", 
      key: "quantity",
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
      align: "right", // Căn phải cho số
    },
    { 
      title: "Chất liệu", 
      dataIndex: "woodType", 
      key: "woodType",
      align: "left", // Căn trái cho chữ
    },
    { 
      title: "Kích thước", 
      dataIndex: "size", 
      key: "size",
      align: "left", // Căn trái cho chữ
    },
    { 
      title: "Danh mục", 
      dataIndex: ["category", "name"], 
      key: "category",
      filters: categories.map(category => ({
        text: category.name,
        value: category.id,
      })),
      onFilter: (value: any, record: any) => record.category?.id === value,
      align: "left", // Căn trái cho chữ
    },
    { 
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status",
      align: "left", // Căn trái cho chữ
    },
    
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button type="primary"  danger icon={<DeleteOutlined />} onClick={() => confirmDelete(record)}></Button>
          <Button icon={<EyeOutlined />} onClick={() => handleDetail(record)}></Button>
        </Space>
      ),
      align: "center", // Căn giữa cho hành động
    },
  ];

  return (
    <div>
       <Card
       title={<span style={{ fontSize: "24px", fontWeight: "bold" }}>
              <AppstoreOutlined 
                style={{
                  color: "#1890ff",     // Màu xanh dương (chuyên nghiệp)
                  fontSize: 28,         // Tăng kích thước cho nổi bật
                  marginRight: 10,
                  backgroundColor: "#e6f7ff",  // Viền nền nhẹ
                  borderRadius: "50%",
                  padding: 6
                }}
              />
              Quản lý sản phẩm</span>}
              bordered={false}
              style={{ marginBottom: 20, padding: 20, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={18}>
            <Input
              placeholder="🔍 Tìm kiếm theo mã hoặc tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              size="middle" // Tăng kích thước nút
            >
            </Button>
        </Col>

        </Row>
        <Table 
        dataSource={products} 
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
      </Card>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal
        title={currentProduct.id ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
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
  <Form layout="vertical">
    <Row gutter={20}>
      {/* Cột 1: Thông tin chung */}
      <Col span={14}>
        <Card title="📋 Thông tin sản phẩm">
          <Form.Item label="Tên sản phẩm">
            <Input
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              placeholder="Nhập tên sản phẩm"
            />
          </Form.Item>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Giá">
                <InputNumber
                  min={0}
                  value={currentProduct.price}
                  onChange={(value) => setCurrentProduct({ ...currentProduct, price: value || 0 })}
                  style={{ width: "100%" }}
                  placeholder="Nhập giá sản phẩm"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số lượng">
                <InputNumber
                  min={0}
                  value={currentProduct.quantity}
                  onChange={(value) => setCurrentProduct({ ...currentProduct, quantity: value || 0 })}
                  style={{ width: "100%" }}
                  placeholder="Nhập số lượng"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Chất liệu">
                <Input
                  value={currentProduct.woodType}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, woodType: e.target.value })}
                  placeholder="Nhập chất liệu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Kích thước">
                <Input
                  value={currentProduct.size}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, size: e.target.value })}
                  placeholder="Nhập kích thước"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả">
            <Input.TextArea
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
              placeholder="Mô tả sản phẩm"
              rows={3}
            />
          </Form.Item>
        </Card>
      </Col>

      {/* Cột 2: Ảnh & Danh mục */}
      <Col span={10}>
        <Card title="📸 Ảnh sản phẩm">
          {currentProduct.image ? (
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img
                src={currentProduct.image}
                alt="Ảnh sản phẩm"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  background: "#fff",
                }}
              />
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#aaa" }}>Chưa có ảnh</p>
          )}

          <Form.Item>
            <Input
              value={currentProduct.image}
              onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
              placeholder="Dán link ảnh hoặc chọn ảnh"
            />
          </Form.Item>
        </Card>

        <Card title="📂 Danh mục & Trạng thái">
          <Form.Item label="Danh mục">
            <Select
              value={currentProduct.category?.id}
              onChange={(value) =>
                setCurrentProduct({
                  ...currentProduct,
                  category: { id: value, name: categories.find((c) => c.id === value)?.name || "" },
                })
              }
              style={{ width: "100%" }}
              placeholder="Chọn danh mục"
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Trạng thái">
            <Select
              value={currentProduct.status}
              onChange={(value) => setCurrentProduct({ ...currentProduct, status: value })}
              style={{ width: "100%" }}
              placeholder="Chọn trạng thái"
            >
              <Select.Option value="Còn hàng">Còn hàng</Select.Option>
              <Select.Option value="Hết hàng">Hết hàng</Select.Option>
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  </Form>
</Modal>


      {/* Modal chi tiết sản phẩm */}
      <Modal
  title="🎮 Chi tiết sản phẩm"
  open={isDetailModalOpen}
  onCancel={() => setIsDetailModalOpen(false)}
  footer={null}
  width={900}
>
  <Row gutter={[24, 24]}>
    {/* Cột trái: ảnh sản phẩm */}
    <Col xs={24} md={10}>
    <div style={{ marginTop: 50 }}>
      {currentProduct.image ? (
        <img
          src={currentProduct.image}
          alt="Ảnh sản phẩm"
          onClick={() => window.open(currentProduct.image, "_blank")}
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: 12,
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          }}
        />
      ) : (
        <div
          style={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            color: "#999",
            fontStyle: "italic",
          }}
        >
          Không có ảnh
        </div>
      )}
      </div>
    </Col>

    {/* Cột phải: thông tin sản phẩm */}
    <Col xs={24} md={14}>
      <Descriptions
        column={1}
        size="middle"
        bordered
        labelStyle={{ fontWeight: "bold", backgroundColor: "#fafafa", width: 140 }}
        contentStyle={{ backgroundColor: "#fff" }}
      >
        <Descriptions.Item label="Mã sản phẩm">{currentProduct.id}</Descriptions.Item>
        <Descriptions.Item label="Tên sản phẩm">{currentProduct.name}</Descriptions.Item>
        <Descriptions.Item label="Giá">
          {(currentProduct.price ?? 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">{currentProduct.quantity}</Descriptions.Item>
        <Descriptions.Item label="Chất liệu">{currentProduct.woodType}</Descriptions.Item>
        <Descriptions.Item label="Kích thước">{currentProduct.size}</Descriptions.Item>
        <Descriptions.Item label="Danh mục">{currentProduct.category?.name}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={currentProduct.status === "Còn hàng" ? "green" : "red"}>
            {currentProduct.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {moment(currentProduct.addedAt).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {moment(currentProduct.updatedAt).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">
          <div style={{ whiteSpace: "pre-line" }}>
            {currentProduct.description || "Không có mô tả"}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Col>
  </Row>
</Modal>





      {/* Modal xác nhận xóa */}
      <Modal
        title="⚠️ Xác nhận xóa sản phẩm"
        open={isConfirmModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText="🗑️ Xóa"
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ style: { display: "none" } }} // Ẩn nút hủy, chỉ dùng dấu X
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#ff4d4f" }}>
          Bạn có chắc chắn muốn xóa sản phẩm sau không?
        </p>
        <p style={{ fontSize: "15px", paddingLeft: "10px" }}>
          <p><strong>🏷️ Mã sản phẩm:</strong> {selectedProduct?.id}</p>
          <strong>📦 Tên sản phẩm:</strong> {selectedProduct?.name}
        </p>
      </Modal>

    </div>
  );
};

export default ProductAdminPage;
