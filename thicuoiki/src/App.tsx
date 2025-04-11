import { Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Modal, Space, Typography } from "antd";
import { UserOutlined, ShoppingCartOutlined, AppstoreOutlined, HomeOutlined, UnorderedListOutlined, ShopOutlined, DropboxOutlined, SolutionOutlined } from "@ant-design/icons";
import { readRoles } from "./utils/localstorage";
import { getCurrentUser } from "./api/auth.api";
import UserProfile from "./pages/UserProfile";

const { Header, Sider, Content } = Layout;

const role = readRoles() || "ROLE_USER";
const menuItems = [
  {
    key: "item08",
    label: "Bảng điều khiển",
    icon: <HomeOutlined />,
    href: "/page/admin/homeadmin",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item01",
    label: "Sản phẩm",
    icon: <AppstoreOutlined />, // Có thể thay bằng <DropboxOutlined /> nếu muốn icon thùng hàng
    href: "/page/admin/product",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item02",
    label: "Danh mục",
    icon: <UnorderedListOutlined />,
    href: "/page/admin/category",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item03",
    label: "Đơn hàng",
    icon: <SolutionOutlined />,
    href: "/page/admin/order",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item04",
    label: "Nhập hàng",
    icon: <DropboxOutlined />,
    href: "/page/admin/stockentry",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item05",
    label: "Khách hàng",
    icon: <UserOutlined />,
    href: "/page/admin/customer",
    roles: ["ROLE_ADMIN"]
  },
  {
    key: "item06",
    label: "Nhà cung cấp",
    icon: <ShopOutlined />,
    href: "/page/admin/supplier",
    roles: ["ROLE_ADMIN"]
  },
  
];

const filteredMenuItems = menuItems.filter(item => (item.roles ?? []).includes(role));

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <Layout style={{ width: "100vw", height: "100vh", backgroundColor: "#F5F5F5" }}>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", backgroundColor: "#FFFFFF", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
      <a href="/page/admin/homeadmin" target="_blank" rel="noopener noreferrer">
        <img
          src="https://traihomthienduc.com/upload/giaodien/logo.png"
          alt="Logo"
          style={{ height: 60, marginBottom: -20, marginLeft: 20 }} // 👈 Dịch sang phải 16px
        />
      </a>
      <Space size="small" align="center" style={{ width: 'auto', justifyContent: 'flex-start' }}>
        <Button type="primary" icon={<UserOutlined />} onClick={() => setIsModalOpen(true)} />
        <span style={{ fontWeight: "bold", marginLeft: 1 }}>
          {user?.username || "Tài khoản"}
        </span>
      </Space>
      </Header>

      <Layout>
        <Sider style={{ backgroundColor: "#FFFFFF", paddingTop: 20, borderRight: "1px solid #E0E0E0", width: "250px" }}>
          <Menu theme="light" defaultSelectedKeys={["item08"]} mode="inline">
            {filteredMenuItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} style={{ color: "#1E88E5" }}>
                <Link to={item.href} style={{ color: "inherit" }}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Content style={{ padding: 24, backgroundColor: "#FAFAFA", minHeight: "calc(100vh - 70px)", width: "calc(100% - 250px)" }}>
          <Outlet />
        </Content>
      </Layout>

      <Modal
        title="Thông tin tài khoản"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} // Ẩn OK và Cancel
        width={800}
      >
        <UserProfile />
      </Modal>

    </Layout>
  );
};

export default App;