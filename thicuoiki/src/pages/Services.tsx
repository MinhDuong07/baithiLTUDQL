import React, { useState } from "react";
import { Row, Col, Card, Typography, Button, Modal } from "antd";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

interface Service {
    title: string;
    description: string;
    details: string;
    price: string;
    duration: string;
    image: string;
}

const services: Service[] = [
    {
        title: "Dịch Vụ Hỏa Táng",
        description: "Hỏa táng chuyên nghiệp, đảm bảo trang nghiêm.",
        details: "Dịch vụ hỏa táng giúp giảm tác động môi trường và tiết kiệm diện tích đất nghĩa trang. Chúng tôi cung cấp quy trình hỏa táng an toàn, hợp vệ sinh và đảm bảo sự trang nghiêm cho người đã khuất.",
        price: "10.000.000 VNĐ",
        duration: "2 giờ",
        image: "/images/image1.jpg"
    },
    {
        title: "Dịch Vụ An Táng",
        description: "Tổ chức tang lễ theo phong tục truyền thống.",
        details: "Chúng tôi hỗ trợ tổ chức lễ an táng theo các nghi thức truyền thống và tôn giáo khác nhau, đảm bảo sự trang trọng và chu toàn cho người thân của bạn.",
        price: "20.000.000 VNĐ",
        duration: "4 giờ",
        image: "/images/image4.jpg"
    },
    {
        title: "Dịch Vụ Trang Trí Tang Lễ",
        description: "Trang trí hoa và vật phẩm phù hợp.",
        details: "Dịch vụ trang trí tang lễ của chúng tôi bao gồm hoa tươi, phông nền, băng rôn và các vật phẩm khác nhằm tạo không gian trang nghiêm, ấm cúng.",
        price: "5.000.000 VNĐ",
        duration: "1 giờ",
        image: "/images/image3.jpg"
    },
    {
        title: "Nhà Quàn & Lễ Tang",
        description: "Cung cấp không gian tổ chức lễ tang.",
        details: "Chúng tôi cung cấp phòng tang lễ rộng rãi, trang nghiêm với đầy đủ tiện nghi để gia đình có thể tổ chức lễ viếng, cầu siêu, tưởng niệm một cách trọn vẹn.",
        price: "15.000.000 VNĐ",
        duration: "24 giờ",
        image: "/images/image2.jpg"
    },
    {
        title: "Dịch Vụ Phật Giáo",
        description: "Tổ chức lễ theo nghi thức Phật Giáo.",
        details: "Chúng tôi hỗ trợ tổ chức lễ tang theo nghi thức Phật giáo bao gồm tụng kinh, cầu siêu, cúng dường và các nghi lễ khác để tiễn đưa người đã khuất.",
        price: "12.000.000 VNĐ",
        duration: "3 giờ",
        image: "/images/image6.jpg"
    },
    {
        title: "Dịch Vụ Công Giáo",
        description: "Tổ chức lễ theo nghi thức Công Giáo.",
        details: "Dịch vụ tổ chức tang lễ theo Công Giáo bao gồm Thánh lễ an táng, cầu nguyện và thực hiện các nghi thức tôn giáo nhằm tiễn đưa người thân về nơi an nghỉ cuối cùng.",
        price: "12.000.000 VNĐ",
        duration: "3 giờ",
        image: "/images/image5.jpg"
    },
];

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const showModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{
            textAlign: "center",
            padding: "50px 20px",
            backgroundSize: "cover",
        }}>
            <Title level={2} style={{ fontWeight: "bold" }}>Dịch Vụ Mai Táng</Title>
            <Text style={{ display: "block", marginBottom: "20px", color: "#141414" }}>Chuyên Nghiệp - Uy Tín - Trọn Gói</Text>

            <Row gutter={[24, 24]}>
                {services.map((service, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                hoverable
                                cover={<img alt={service.title} src={service.image} style={{ height: "200px", objectFit: "cover" }} />}
                                style={{
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onClick={() => showModal(service)}
                            >
                                <Title level={4}>{service.title}</Title>
                                <Text>{service.description}</Text>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            <Modal title={selectedService?.title} open={isModalOpen} onCancel={handleCancel} footer={null}>
                {selectedService && (
                    <>
                        <img src={selectedService.image} alt={selectedService.title} style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }} />
                        <Paragraph><b>Mô tả:</b> {selectedService.details}</Paragraph>
                        <Paragraph><b>Giá tham khảo:</b> {selectedService.price}</Paragraph>
                        <Paragraph><b>Thời gian thực hiện:</b> {selectedService.duration}</Paragraph>
                        <Paragraph>
                            <b>Thông tin liên hệ:</b><br />
                            📞 Hotline: 0909 999 999<br />
                            📧 Email: dichvumaitang@example.com<br />
                            📍 Địa chỉ: 123 Đường An Bình, Quận 1, TP. HCM
                        </Paragraph>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Services;
