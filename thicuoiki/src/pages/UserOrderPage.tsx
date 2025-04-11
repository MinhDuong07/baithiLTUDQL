import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { fetchUserOrders, fetchUserOrderById, Order } from "../api/order.api";

const UserOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await fetchUserOrders();
    console.log("Fetched orders:", data);
    if (data) setOrders(data);
    else message.error("Không thể tải danh sách đơn hàng.");
  };

  const handleViewOrder = async (orderId: number) => {
    const order = await fetchUserOrderById(orderId);
    if (order) {
      setSelectedOrder(order);
      setIsModalVisible(true);
    } else {
      message.error("Không thể lấy chi tiết đơn hàng.");
    }
  };

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id", align: "right", onHeaderCell: () => ({ style: { textAlign: "left" } }), },
    {
      title: "Hình ảnh",
      key: "productImage",
      render: (_: any, record: Order) => {
        const firstImage = record.orderDetails?.[0]?.product?.image;
        return (
          <img
            src={firstImage || "/default-product.png"}
            alt="Ảnh sản phẩm"
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              objectFit: "cover",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        );
      },
    },
    { title: "Khách hàng", dataIndex: "customerName", key: "customerName" },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      onHeaderCell: () => ({ style: { textAlign: "left" } }),
      render: (value: number) => `${value.toLocaleString("vi-VN")} đ`,
    },    
    { title: "Trạng thái", dataIndex: "status", key: "status", },
    {
      title: "Thao tác",
      key: "actions",
      render: ( record: Order) => <Button onClick={() => handleViewOrder(record.id)}>Xem</Button>,
    },
  ];

  return (
    <div>
      <h2>Đơn hàng của tôi</h2>
      <Table dataSource={orders} columns={columns} rowKey="id" />
      <Modal title="Chi tiết đơn hàng" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        {selectedOrder && (
          <div>
            <p><b>Địa chỉ:</b> {selectedOrder.shippingAddress}</p>
            <p><b>Tổng tiền:</b> {selectedOrder.totalPrice} VND</p>
            <h4>Chi tiết sản phẩm:</h4>
            <div>
              {selectedOrder.orderDetails.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 12,
                    borderBottom: "1px solid #f0f0f0",
                    paddingBottom: 8,
                  }}
                >
                  <img
                    src={item.product.image || "/default-product.png"}
                    alt={item.product.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0 }}><b>{item.product.name}</b></p>
                    <p style={{ margin: 0 }}>
                      {item.quantity} x {item.product.price.toLocaleString()} VND ={" "}
                      <b>{item.totalPrice.toLocaleString()} VND</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserOrderPage;
