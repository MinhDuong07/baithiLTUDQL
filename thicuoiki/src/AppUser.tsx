import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Typography, Button, Layout, Input, Menu, Modal, message, Space, InputNumber, Select } from "antd";

import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import UserProfile from "./pages/UserProfile";
import CartPage from "./pages/CartPage";

import { Navigate, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import { readRoles } from "./utils/localstorage";
import { getCurrentUser } from "./api/auth.api";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const AppUser = () => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUserData() {
          try {
            const userData = await getCurrentUser();
            setUser(userData);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin user:", error);
          }
        }
        fetchUserData();
      }, []);



    const toggleModal = (idx: number, target: boolean) => {
        setIsModalOpen((prev) => {
            const newState = [...prev];
            newState[idx] = target;
            return newState;
        });
    };
    // Lấy quyền người dùng
    const role = readRoles() || "ROLE_USER";

    const menuItems = [
        { key: "item01", label: "Trang chủ",  href: "/page/home", roles: ["ROLE_USER"] },
        { key: "item02", label: "Sản phẩm",  href: "/page/product", roles: ["ROLE_USER"] },
        { key: "item04", label: "Dịch Vụ",  href: "/page/services", roles: ["ROLE_USER"] },
        { key: "item05", label: "Tang Lễ Phật Giáo", href: "/page/buddhist-funeral", roles: ["ROLE_USER"] },
        { key: "item06", label: "Tang Lễ Công Giáo", href: "/page/catholic-funeral", roles: ["ROLE_USER"] },
        { key: "item07", label: "Quy Trình Sản Xuất Quan Tài", href: "/page/coffin-production", roles: ["ROLE_USER"] },
        { key: "item08", label: "Liên Hệ", href: "/page/contactform", roles: ["ROLE_USER"] },
       
      ];
      
      // Lọc menu theo quyền user
      const filteredMenuItems = menuItems.filter(item => (item.roles ?? []).includes(role));
    return (
        <Layout>
            <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "0 20px", height: "80px", borderBottom: "1px solid #ddd" }}>
    <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
        <Link to="/page/home">
            <img src="https://traihomthienduc.com/upload/giaodien/logo.png" alt="Logo" style={{ height: "70px", cursor: "pointer", marginLeft: 50 }} />
        </Link>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Icon giỏ hàng */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => toggleModal(1, true)}
          />
        </div>

        {/* Icon người dùng và tên */}
        <div
        style={{
          display: "flex",
          alignItems: "center",
          width: 100,
        }}
      >
        <Button type="primary" onClick={() => toggleModal(0, true)}>
          <UserOutlined />
        </Button>
        <span
          style={{
            fontWeight: "bold",
            fontSize: 12,
            marginLeft: 8, // 👈 khoảng cách bên trái icon
            whiteSpace: "nowrap",
          }}
        >
          {user?.username || "Tài khoản"}
        </span>
      </div>

      </div>
</Header>
            {/* Thanh menu */}
            <Menu mode="horizontal" theme="dark" style={{ display: "flex", justifyContent: "center" }}>
            {filteredMenuItems.map((item) => (
                <Menu.Item key={item.key}>
                  <Link to={item.href}>{item.label}</Link>
                </Menu.Item>
              ))} 
            </Menu>
            {/* Danh sách sản phẩm */}
            <Content style={{ padding: "20px", background: "#fff" }}>
                <Outlet/>
            </Content>

            {/* MODAL PROFILE */}
            <Modal
              title="Thông tin tài khoản"
              open={isModalOpen[0]}
              onCancel={() => toggleModal(0, false)}
              width={800}
              footer={null} // Ẩn nút Ok và Cancel
            >
              <UserProfile />
            </Modal>
            {/* MODAL CART */}
            <Modal
              title="Giỏ hàng của bạn"
              open={isModalOpen[1]}
              onCancel={() => toggleModal(1, false)}
              width={800}
              footer={null} // Ẩn nút Ok và Cancel
            >
              <CartPage isModalOpenCart={isModalOpen[1]} />
            </Modal>
        </Layout>
    );
};

export default AppUser;
