import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, List, Card, Button, Tooltip, Typography, Space, Row, Col, Flex,message, Table } from "antd";
import { fetchAllOrders, fetchOrderById, deleteOrder, Order, updateOrderStatus, createOrderAdmin, OrderRequestDTO } from "../api/order.api";
import { EyeOutlined, DeleteOutlined, PlusOutlined, SolutionOutlined } from "@ant-design/icons";
import { fetchProduct, Product } from "../api/product.api";


const AdminOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchProduct, setSearchProduct] = useState("");

  

  const [form] = Form.useForm();
  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    const data = await fetchAllOrders();
    if (data) {
      setOrders(data.orders);
      setFilteredOrders(data.orders);

      //message.success(data.message);
    } else {
      message.error("Không thể tải danh sách đơn hàng.");
    }
  };
  const loadProducts = async () => {
    const data = await fetchProduct();
    setProducts(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchId(value);
    if (!value) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.id.toString().includes(value)));
    }
  };

  const handleViewOrder = async (orderId: number) => {
    const order = await fetchOrderById(orderId);
    if (order) {
      setSelectedOrder(order.order);
      setIsModalVisible(true);
    } else {
      message.error("Không thể lấy chi tiết đơn hàng.");
    }
  };


  const handleDeleteOrder = async (orderId: number) => {
    const response = await deleteOrder(orderId);
    if (response?.isSuccess) {
      message.success(response.message);
      loadOrders();
    } else {
      message.error(response?.message);
    }
  };
  const handleUpdateStatus = async (orderId: number, status: string) => {
    const response = await updateOrderStatus(orderId, status);
    if (response?.isSuccess) {
      message.success(response.message);
      loadOrders();
    } else {
      message.error(response?.message);
    }
  };
  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      const existingProductIndex = prevSelected.findIndex((item) => item.product.id === product.id);
  
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        const updatedSelected = [...prevSelected];
        updatedSelected[existingProductIndex].quantity += 1;
        return updatedSelected;
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào danh sách
        return [...prevSelected, { product, quantity: 1 }];
      }
    });
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const newSelected = [...selectedProducts];
    newSelected[index].quantity = quantity;
    setSelectedProducts(newSelected);
  };

  const handleCreateOrder = async () => {
    try {
      const values = await form.validateFields();
  
      const orderRequest: OrderRequestDTO = {
        customerName: values.customerName,
        shippingAddress: values.shippingAddress,
        phoneNumber: values.phoneNumber,
        paymentMethod: values.paymentMethod,
        cartItems: selectedProducts.map((item, index) => ({
          id: index + 1,  // Tạo ID tạm thời
          product: item.product, // Đưa nguyên product vào
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity, // Tính tổng tiền
        })),
      };
    
      const response = await createOrderAdmin(orderRequest);
      if (response) {
        message.success(response.message);
        setIsCreateModalVisible(false);
        loadOrders();
        form.resetFields();
        setSelectedProducts([]);
      } else {
        message.error("Lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
    }
  };
  
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase()) || p.id.toString().includes(searchProduct)
  );
  const handleRemoveProduct = (index: number) => {
    const newSelected = [...selectedProducts];
    newSelected.splice(index, 1);
    setSelectedProducts(newSelected);
  };

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id", align: "right", width: 100,  onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { 
      title: "Ngày đặt hàng", 
      dataIndex: "createdDate", 
      key: "createdDate", 
      align: "right",  
      onHeaderCell: () => ({ style: { textAlign: "left" } }),
      render: (date: string) => new Date(date).toISOString().split("T")[0] 
    },
    
    { title: "Khách hàng", dataIndex: "customerName", key: "customerName" },
    { title: "Địa chỉ", dataIndex: "shippingAddress", key: "shippingAddress" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber", align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { title: "Trạng thái", dataIndex: "status", key: "status" ,
      render: (_: unknown, record: Order) => (
        <Space>
          <Select defaultValue={record.status} onChange={(status) => handleUpdateStatus(record.id, status)}>
            <Select.Option value="PENDING">Chờ xử lý</Select.Option>
            <Select.Option value="SHIPPED">Đang giao</Select.Option>
            <Select.Option value="DELIVERED">Đã giao</Select.Option>
          </Select>
         
        </Space>
      ),
    },
    { 
      title: "Tổng tiền", 
      align: "right",  onHeaderCell: () => ({ style: { textAlign: "left" } }),
      dataIndex: "totalPrice", 
      key: "totalPrice",
      sorter: (a: Order, b: Order) => a.totalPrice - b.totalPrice, 
      render: (price: number) => 
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
    },
    {
      title: "Thao tác",
      key: "hành động",
      render: (_: unknown, record: Order) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewOrder(record.id)} 
          />
          
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteOrder(record.id)} 
          />
        </Space>
      ),
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <SolutionOutlined style={{ color: "#1890ff",     // Màu xanh dương (chuyên nghiệp)
                  fontSize: 28,         // Tăng kích thước cho nổi bật
                  marginRight: 10,
                  backgroundColor: "#e6f7ff",  // Viền nền nhẹ
                  borderRadius: "50%",
                  padding: 6 }} />
        <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          Quản lý đơn hàng
        </h2>
      </div>
      <hr style={{ borderTop: '1px solid #f0f0f0', marginBottom: '20px' }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <Input
          placeholder="🔍 Tìm kiếm theo mã đơn hàng"
          value={searchId}
          onChange={handleSearch}
          style={{
            width: 250,
            maxWidth: "100%",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalVisible(true)}
          style={{
            borderRadius: 6,
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          }}
        >
        </Button>
      </div>

      <Table
        dataSource={filteredOrders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        rowClassName={(_, index) => (index % 2 === 0 ? "gray-row" : "white-row")}
      />

      <style>
            {`
              .gray-row {
                background-color: #f5f5f5 !important;
              }
            `}
          </style>

      <Modal
  title={
    <span style={{ fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center" }}>
      🧾 Chi tiết đơn hàng
    </span>
  }
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
  bodyStyle={{ padding: "20px 24px" }}
>
  {selectedOrder && (
    <div style={{ lineHeight: 1.8, fontSize: 16 }}>
      <p><b>👤 Tên khách hàng:</b> {selectedOrder.customerName}</p>
      <p><b>📍 Địa chỉ giao hàng:</b> {selectedOrder.shippingAddress}</p>
      <p><b>📞 Số điện thoại:</b> {selectedOrder.phoneNumber}</p>
      <p>
        <b>💰 Tổng giá tiền:</b>{" "}
        <span style={{ color: "#cf1322", fontWeight: "bold" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(selectedOrder.totalPrice)}
        </span>
      </p>

      <h4 style={{ marginTop: 20, fontSize: 18 }}>🛒 Chi tiết sản phẩm:</h4>
      <ul style={{ paddingLeft: 20 }}>
        {selectedOrder?.orderDetails && selectedOrder.orderDetails.length > 0 ? (
          selectedOrder.orderDetails.map((item) => (
            <li key={item.id} style={{ marginBottom: 6 }}>
              {item.product.name} – {item.quantity} x{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.totalPrice)}
            </li>
          ))
        ) : (
          <p>Không có chi tiết đơn hàng.</p>
        )}
      </ul>
    </div>
  )}
</Modal>


      
      {/* Modal tạo đơn hàng */}
   
{/*ở đây*/}

<Modal
  title="Tạo đơn hàng mới"
  open={isCreateModalVisible}
  onCancel={() => setIsCreateModalVisible(false)} // Dấu X vẫn hoạt động
  width={1000} // Mở rộng Modal
  footer={[
    <Button key="submit" type="primary" onClick={handleCreateOrder}>
      Lưu
    </Button>,
  ]} // Ẩn nút Cancel, chỉ giữ nút Lưu
>

  <Row gutter={20}>
    {/* Cột nhập thông tin khách hàng */}
    <Col span={12}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="customerName"
          label="Tên khách hàng"
          rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="shippingAddress"
          label="Địa chỉ giao hàng"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="paymentMethod"
          label="Phương thức thanh toán"
          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}
        >
          <Select placeholder="Chọn phương thức thanh toán">
            <Select.Option value="CASH_ON_DELIVERY">Thanh toán khi nhận hàng</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Col>

    {/* Cột hiển thị sản phẩm */}
    <Col span={12}>
      <Input.Search
        placeholder="🔍 Tìm sản phẩm theo ID hoặc tên"
        onChange={(e) => setSearchProduct(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <List
        dataSource={filteredProducts}
        style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}
        renderItem={(product) => (
          <List.Item style={{ padding: 0 }}>
            <Card
              style={{ width: "100%", height: 80, display: "flex", alignItems: "center" }}
              bodyStyle={{ display: "flex", alignItems: "center", padding: 10, width: "100%" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5, marginRight: 10 }}
              />
              <div style={{ flex: 1, paddingRight: 5 }}>
                <Tooltip title={product.name}>
                  <Typography.Text strong ellipsis={{ tooltip: product.name }} style={{ maxWidth: 150, display: "block" }}>
                    {product.name}
                  </Typography.Text>
                </Tooltip>
                <Typography.Text type="secondary">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                </Typography.Text>
              </div>
              <Button type="primary" size="small" onClick={() => handleAddProduct(product)}>
                Thêm
              </Button>
            </Card>
          </List.Item>
        )}
      />

      <Typography.Title level={4} style={{ marginTop: 10 }}>
        🛒 Sản phẩm đã chọn:
      </Typography.Title>

      <List
        dataSource={selectedProducts}
        style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}
        renderItem={(item, index) => (
          <List.Item style={{ padding: 0 }}>
            <Card
              style={{ width: "100%", height: 80, display: "flex", alignItems: "center" }}
              bodyStyle={{ display: "flex", alignItems: "center", padding: 10, width: "100%" }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5, marginRight: 10 }}
              />

              <Flex vertical style={{ flex: 1 }}>
                <Tooltip title={item.product.name}>
                  <Typography.Text strong ellipsis={{ tooltip: item.product.name }} style={{ maxWidth: 150 }}>
                    {item.product.name}
                  </Typography.Text>
                </Tooltip>
                <Typography.Text type="secondary">
                  Đơn giá:{" "}
                  <strong>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.product.price)}
                  </strong>
                </Typography.Text>
              </Flex>

              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                style={{ width: 60, marginRight: 10, textAlign: "center" }}
              />

              <Typography.Text strong style={{ color: "#ff4d4f", width: 120, textAlign: "right" }}>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  item.product.price * item.quantity
                )}
              </Typography.Text>

              <Button type="default" danger size="small" onClick={() => handleRemoveProduct(index)}>
                Xóa
              </Button>
            </Card>
          </List.Item>
        )}
      />

      {/* Tổng giá trị đơn hàng */}
      <Typography.Title level={3} style={{ textAlign: "right", marginTop: 20 }}>
        Tổng giá trị đơn hàng:{" "}
        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
          selectedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0)
        )}
      </Typography.Title>
    </Col>
  </Row>
</Modal>;

    </div>
  );
};

export default AdminOrderPage;
