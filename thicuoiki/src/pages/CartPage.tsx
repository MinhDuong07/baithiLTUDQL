import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, InputNumber, Modal, Form, Input, Select } from "antd";
import { fetchCart, removeFromCart, clearCart, CartItem, updateCartItemQuantity } from "../api/cart.api";
import { fetchCustomerByUserId } from "../api/customer.api";
import { createOrder, OrderRequestDTO } from "../api/order.api";
import { getCurrentUser } from "../api/auth.api";

const { Option } = Select;

const CartPage: React.FC<{ isModalOpenCart: boolean }> = ({ isModalOpenCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "COD",
    notes: "",
  });

  useEffect(() => {
    if (isModalOpenCart) {
      loadCart();
      loadCustomerInfo();
    }
  }, [isModalOpenCart]);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      if (data) {
        setCartItems(data.cartItems);
        setTotalCartPrice(data.totalCartPrice);
      }
    } catch {
      message.error("Có lỗi khi tải giỏ hàng.");
    }
  };

  const loadCustomerInfo = async () => {
    try {
      await getCurrentUser();
      const userId = localStorage.getItem("userId");
      if (userId) {
        const customer = await fetchCustomerByUserId(parseInt(userId));
        if (customer) {
          setCustomerInfo((prev) => ({
            ...prev,
            fullName: customer.fullName,
            address: customer.address,
            phone: customer.phone,
          }));
        }
      }
    } catch {
      message.error("Không thể tải thông tin khách hàng.");
    }
  };

  const handleOrder = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    if (!customerInfo.fullName || !customerInfo.address || !customerInfo.phone) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    const orderRequest: OrderRequestDTO = {
      customerName: customerInfo.fullName,
      shippingAddress: customerInfo.address,
      phoneNumber: customerInfo.phone,
      notes: customerInfo.notes,
      paymentMethod: customerInfo.paymentMethod,
      cartItems,
    };

    try {
      const data = await createOrder(orderRequest);
      if (data?.order) {
        message.success(data.message);
        await clearCart();
        setCartItems([]);
        setTotalCartPrice(0);
        setIsModalOpen(false);
      } else {
        message.error(data?.message);
      }
    } catch {
      message.error("Lỗi khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (value: string) => {
    setCustomerInfo({ ...customerInfo, paymentMethod: value });
  };

  const handleQuantityChange = async (value: number | null, record: CartItem) => {
    if (value && value > 0) {
      const response = await updateCartItemQuantity({ productId: record.product.id, quantity: value });
      message.success(response?.message)
      loadCart();
    }
  };

  const handleRemoveItem = async (productId: number) => {
    const response = await removeFromCart(productId);
    message.success(response?.message)
    loadCart();
  };

  const columns = [
    { title: "Mã sản phẩm", dataIndex: ["product", "id"], key: "id", align: "right", width: 100, onHeaderCell: () => ({ style: { textAlign: "left" } }) },
    { 
      title: "Hình ảnh", 
      dataIndex: ["product", "image"], 
      key: "image", 
      render: (image: string) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
    },
    { title: "Tên sản phẩm", dataIndex: ["product", "name"], key: "name" },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "price",
      render: (value: any) => value.toLocaleString('vi-VN') + " đ"
    },
    
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={text}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: ( record: CartItem) => (
        <Space>
          <Button onClick={() => handleRemoveItem(record.product.id)} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "100%", overflowX: "auto", padding: "16px" }}>
      <Table 
        dataSource={cartItems} 
        columns={columns} 
        rowKey="id" 
        scroll={{ x: "max-content" }} 
        pagination={{pageSize: 5}}
      />
      <div style={{ marginTop: 16, fontSize: 18 }}>
        <strong>Tổng tiền: {totalCartPrice.toLocaleString()} VND</strong>
      </div>
      <Button 
        type="primary" 
        onClick={handleOrder} 
        style={{ marginTop: 16 }} 
        disabled={cartItems.length === 0}
      >
        Đặt hàng
      </Button>

      <Modal
        title="🛒 Thông tin đặt hàng"
        open={isModalOpen}
        onOk={handleModalOk}
        okText="Lưu"
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setIsModalOpen(false)} // ✅ BẮT BUỘC để dấu X hoạt động!
        confirmLoading={loading}
        centered
        width={600}
      >

  <Form layout="vertical">
    <Form.Item
      label={<strong>Họ và tên</strong>}
      name="fullName"
      rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
    >
      <Input
        placeholder="Nhập họ và tên"
        name="fullName"
        value={customerInfo.fullName}
        onChange={handleInputChange}
      />
    </Form.Item>

    <Form.Item
      label={<strong>Địa chỉ</strong>}
      name="address"
      rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
    >
      <Input
        placeholder="Nhập địa chỉ nhận hàng"
        name="address"
        value={customerInfo.address}
        onChange={handleInputChange}
      />
    </Form.Item>

    <Form.Item
      label={<strong>Số điện thoại</strong>}
      name="phone"
      rules={[
        { required: true, message: "Vui lòng nhập số điện thoại!" },
        { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
      ]}
    >
      <Input
        placeholder="VD: 0901234567"
        name="phone"
        value={customerInfo.phone}
        onChange={handleInputChange}
      />
    </Form.Item>

    <Form.Item
      label={<strong>Phương thức thanh toán</strong>}
      name="paymentMethod"
      rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}
    >
      <Select
        placeholder="Chọn phương thức"
        value={customerInfo.paymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <Option value="COD">Thanh toán khi nhận hàng (COD)</Option>
      </Select>
    </Form.Item>

    <Form.Item label={<strong>Ghi chú (nếu có)</strong>} name="notes">
      <Input.TextArea
        rows={3}
        placeholder="Nhập ghi chú cho đơn hàng (nếu có)"
        name="notes"
        value={customerInfo.notes}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default CartPage;
