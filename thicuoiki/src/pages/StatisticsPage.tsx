import { useEffect, useState } from "react";
import { 
  Card, 
  Table, 
  Typography, 
  Spin, 
  Row, 
  Col, 
  Statistic, 
  Divider,
  Space
} from "antd";
import {
  fetchOverviewStats,
  fetchRevenueByCategory,
  fetchProductSales,
  OverviewStats,
  RevenueByCategory,
  ProductSales,
} from "../api/statistics.api";
import { 
  Column 
} from "@ant-design/plots"; // Bỏ Pie đi
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  DollarOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const StatisticsPage: React.FC = () => {
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [revenueByCategory, setRevenueByCategory] = useState<RevenueByCategory[]>([]);
  const [productSales, setProductSales] = useState<ProductSales[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [overview, revenue, sales] = await Promise.all([
          fetchOverviewStats(),
          fetchRevenueByCategory(),
          fetchProductSales(),
        ]);

        setOverviewStats(overview);
        setRevenueByCategory(revenue);
        setProductSales(sales);
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  // Cấu hình biểu đồ cột doanh thu theo danh mục
  const revenueColumnConfig = {
    data: revenueByCategory,
    xField: 'categoryName',
    yField: 'totalRevenue',
    colorField: 'categoryName', // Ánh xạ theo tên danh mục để đổi màu
    color: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262fd', '#78D3F8', '#9661BC', '#F6903D'], // Mảng màu
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        fontSize: 12,
        textAlign: 'center',
      },
    },
  };
  

  // Cấu hình bảng sản phẩm bán chạy
  const productSalesColumns = [
    { 
      title: "Tên sản phẩm", 
      dataIndex: "productName", 
      key: "productName",
      render: (text: string) => <Text strong>{text}</Text>
    },
    { 
      title: "Số lượng bán", 
      dataIndex: "quantitySold", 
      key: "quantitySold",
      align: "right",
      onHeaderCell: () => ({ style: { textAlign: "left" } }),
      sorter: (a: ProductSales, b: ProductSales) => a.quantitySold - b.quantitySold,
      render: (qty: number) => <Text type="success">{qty}</Text>
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        <span style={{ color: '#1890ff' }}>📊</span> Bảng Thống Kê
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Thống kê tổng quan */}
          <Card 
            title={<Title level={4}>📈 Thống kê tổng quan</Title>}
            style={{ 
              borderRadius: 8, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Tổng số đơn hàng"
                  value={overviewStats?.totalOrders || 0}
                  prefix={<ShoppingCartOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Tổng số khách hàng"
                  value={overviewStats?.totalCustomers || 0}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Tổng doanh thu"
                  value={overviewStats?.totalRevenue || 0}
                  prefix={<DollarOutlined />}
                  suffix="VNĐ"
                  formatter={(value) => value.toLocaleString()}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Col>
            </Row>
          </Card>

          {/* Doanh thu theo danh mục - Chỉ giữ biểu đồ cột */}
          <Card 
            title={<Title level={4}>📦 Doanh thu theo danh mục</Title>}
            style={{ 
              borderRadius: 8, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
          > 
            <Column {...revenueColumnConfig} height={300} />
            <Divider />
            <Table
              dataSource={revenueByCategory}
              columns={[
                { 
                  title: "Danh mục", 
                  dataIndex: "categoryName", 
                  key: "categoryName",
                  render: (text: string) => <Text strong>{text}</Text>
                },
                { 
                  title: "Doanh thu (VNĐ)", 
                  dataIndex: "totalRevenue", 
                  key: "totalRevenue",
                  align: "right",
                  render: (text: number) => (
                    <Text type="success">{text.toLocaleString()} VNĐ</Text>
                  ),
                  sorter: (a: RevenueByCategory, b: RevenueByCategory) => a.totalRevenue - b.totalRevenue,
                  onHeaderCell: () => ({ style: { textAlign: "left" } })
                },
              ]}
              rowKey="categoryName"
              pagination={false}
              style={{ marginTop: 16 }}
              rowClassName={(_, index) =>
                index % 2 === 0 ? "table-row-even" : "table-row-odd"
              }
            />
          </Card>

          {/* Sản phẩm bán chạy */}
          <Card 
            title={<Title level={4}>🔥 Sản phẩm bán chạy nhất</Title>}
            style={{ 
              borderRadius: 8, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
          >
            <Table
              dataSource={productSales}
              columns={productSalesColumns}
              rowKey="productName"
              pagination={{ pageSize: 5 }}
              rowClassName={(_, index) =>
                index % 2 === 0 ? "table-row-even" : "table-row-odd"
              }
            />
          </Card>
          <style>
    {`
      /* Đặt màu nền xen kẽ cho các hàng trong bảng */
      .table-row-even td {
        background-color: #f9f9f9;
      }

      .table-row-odd td {
        background-color: #e9e9e9;
      }

      /* Hiệu ứng hover cho các hàng trong bảng */
      .ant-table-tbody > tr:hover > td {
        background-color: #d0d0d0 !important;
      }

      /* Tùy chỉnh border và bo góc */
      .ant-table-bordered .ant-table-cell {
        border-color: #ddd;
      }

      .ant-card {
        border-radius: 10px;
        overflow: hidden;
      }
    `}
  </style>
        </Space>
      )}
    </div>
  );
};

// CSS tùy chỉnh
const customStyles = `
  .table-row-animated {
    transition: all 0.3s;
  }
  .table-row-animated:hover {
    background-color: #fafafa;
    transform: translateY(-2px);
  }
`;

export default StatisticsPage;