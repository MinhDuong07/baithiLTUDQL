import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Typography, Button, Input, Select, Space, InputNumber, message, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchProduct, Product } from "../api/product.api";
import { fetchCategories, Category } from "../api/category.api";
import { addToCart } from "../api/cart.api";

const { Title, Text } = Typography;
const { Option } = Select;

const ProductUserPage = () => {
    const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchProduct().then((data) => setProducts(data));
        fetchCategories().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        let filtered = products;

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category.id === selectedCategory);
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    const handleQuantityChange = (productId: number, quantity: number | null) => {
        if (quantity !== null) {
            setSelectedQuantities((prev) => ({ ...prev, [productId]: quantity }));
        }
    };

    const handleAddToCart = async (productId: number) => {
        const quantity = selectedQuantities[productId] || 1;
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

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    return (
        <div style={{ padding: "20px", background: "#f8f8f8", minHeight: "100vh" }}>
            {/* Thanh tìm kiếm và bộ lọc */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    prefix={<SearchOutlined />}
                    style={{ width: 400 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder="Tất cả danh mục"
                    allowClear
                    onChange={(value) => setSelectedCategory(value || null)}
                >
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Danh sách sản phẩm dạng thẻ */}
            <Row gutter={[16, 16]}>
                {filteredProducts.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: 10,
                                overflow: "hidden",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                            }}
                            cover={
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width="100%"
                                    height={180}
                                    style={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                                />
                            }
                        >
                            <Title level={5} style={{ marginBottom: 8 }}>{product.name}</Title>
                            <Text strong style={{ color: "red", display: "block" }}>
                                {product.price.toLocaleString()}đ
                            </Text>
                            <div style={{ marginTop: 10 }}>
                                <Space>
                                    <InputNumber
                                        min={1}
                                        defaultValue={1}
                                        value={selectedQuantities[product.id] || 1}
                                        onChange={(value) => handleQuantityChange(product.id, value)}
                                        style={{ width: 60 }}
                                    />
                                    <Button onClick={() => handleAddToCart(product.id)} type="primary">
                                        🛒
                                    </Button>
                                    <Button type="default" onClick={() => handleViewDetails(product)}>
                                        🔍
                                    </Button>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal Hiển Thị Chi Tiết Sản Phẩm */}
            <Modal
                title="Chi Tiết Sản Phẩm"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedProduct && (
                    <div style={{ textAlign: "center" }}>
                        <Image src={selectedProduct.image} alt={selectedProduct.name} width={200} />
                        <Title level={4}>{selectedProduct.name}</Title>
                        <Text strong style={{ color: "red", fontSize: 18 }}>
                            {selectedProduct.price.toLocaleString()}đ
                        </Text>
                        <p>{selectedProduct.description}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductUserPage;
