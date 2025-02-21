import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const BuddhistFuneral: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px 80px", // Giảm padding trên để chữ sát lề trên hơn
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <Title
        level={1}
        style={{
          fontSize: "36px",
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "0px", // Đảm bảo tiêu đề không có khoảng cách thừa phía trên
        }}
      >
      </Title>
      <Paragraph
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          textAlign: "justify",
          margin: "0 10px",
        }}
      >
        Tang lễ thường gắn liền với những quy định, nghi thức thờ cúng, kiêng cữ nhất định. Lễ tang được thực hiện
        theo những tập quán cổ truyền của dân tộc và thể hiện quan niệm của cộng đồng về cái chết, thế giới người chết,
        quan hệ giữa người chết và người sống. Và có những hình thức mai táng khác nhau tùy theo tập quán của từng nơi,
        từng cư dân và theo từng tôn giáo nữa. Bài viết lần này Trại hòm Thiện Đức xin giới thiệu về các nghi thức cần
        có của một Tang lễ Phật Giáo đúng nghĩa.
      </Paragraph>

      {/* Căn giữa poster bằng flexbox */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="https://traihomthienduc.com/upload/images/tang-le-phat-giao-1.png"
          alt="Poster Tang Lễ Phật Giáo"
          style={{
            width: "100%", // Chiếm toàn bộ chiều rộng container
            maxWidth: "800px", // Giới hạn kích thước tối đa
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

       {/* Đoạn văn bản bổ sung dưới poster */}
       <div style={{ marginTop: "20px", textAlign: "left" }}>
       <Title level={3}>Tinh thần của tang lễ Phật Giáo</Title>
        <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "justify" }}>
          Tang lễ không được làm cầu thả mà phải chuẩn bị trước lúc sanh thời. Không cần linh đình mà cần phải giản dị
          chừng nào hay chừng nấy. Mặc người ta đàm tiếu. Kẻ ngu thường cười người trí. Đây là việc thường của bọn ngu
          phu.
        </Paragraph>
        <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "justify" }}>
          Nghi thức Tang Lễ Phật giáo nhằm tới mục đích đơn giản gọn gàng, ít tốn kém, không theo tập tục mê tín của thế
          gian, như đốt giấy tiền vàng bạc, nhà kho v.v…
        </Paragraph>
        <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "justify" }}>
          Tang Lễ cần được cử hành trang nghiêm, yên tịnh, đơn giản ít tốn kém tiền bạc thì giờ, không nên cậy giàu khoe
          của, tổ chức linh đình, hoặc không tiền mà cầu danh cố làm cho thiên hạ khen là đám ma lớn, con cháu có hiếu,
          rồi đi vay mượn nợ nần phải bán nhà bán đất để trả thì thật là khờ dại vô cùng.
        </Paragraph>
      </div>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Title level={3}>Nghi thức tang lễ phật giáo</Title>
      </div>

       {/* Thêm poster dưới phần "Nghi thức tang lễ Phật Giáo" */}
       <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="https://traihomthienduc.com/upload/images/tang-le-phat-giao-2.png(1).jpg"
          alt="Nghi thức Tang Lễ Phật Giáo"
          style={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <Paragraph style={{ fontSize: "20px", lineHeight: "1.8", textAlign: "justify" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>1 - Trị quan nhập liệm:</div> Một người mất (chết), trút hơi thở cuối cùng. Sau đó ít nhất là 4 giờ, tốt hơn hết là sau 24 giờ, được tắm rửa sạch sẽ, đưa vào một cái hòm gỗ (quan tài)
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>2 - Phục hồn:</div> Thiết lập một bàn thờ Linh có linh ảnh, bài vị, bát nhang. Thỉnh vong linh an vị, để cho thần thức định tỉnh nhận rõ sự việc đang phải lìa thể xác.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>3 - Khai kinh - Tiến linh:</div> Thiết lập bàn Phật, thỉnh Phật chứng minh và siêu độ sự ra đi của vong giả.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>4 - Phát tang:</div> Ðể cho bà con thân bằng quyến thuộc có cơ hội từ giả biệt luận với vong giả. Một hình thức ghi nhớ ơn đức, hiếu hạnh trong gia tộc.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>5 - Triêu điện:</div> Trong thời gian chưa chôn, các lễ cúng cho hương linh gọi là “điện”. Vậy triêu điện là một lễ cúng buổi sáng gần ngày đưa đám, thường dành riêng cho bà con muốn làm một lễ cúng riêng, đọc ai điếu, lời từ biệt.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>6 - Tịch điện:</div> Lễ cúng buổi tối gần ngày đưa đám, thường giành cho con cháu nội tộc, để con cháu có cơ hội nói lên ơn nghĩa, những hình ảnh thân thương, tưởng niệm đến công hạnh của người quá cố.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>7 - Triệu tổ:</div> Lễ này thường được cử hành trước ngày di quan khoảng 2 hôm trở lại. Tang quyến thỉnh linh vị, di ảnh, bát nhang đầy đủ lễ vật đến tự đường (nhà thờ họ). Ðặt linh vị trên một cái bàn nhỏ đối diện án thờ gia tiên.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>8 - Sái tịnh, nhiễu quan và quy y linh:</div> Trong lúc đại chúng đang tụng chú Ðại Bi, vị chủ sám dùng bình Cam Lồ vào tẩy tịnh quan tài, chú Ðại Bi vừa dứt, sám chủ thán: “Giác tánh viên minh, tùng lai trạm tịch; bổn lai nhơn ngã chi huyễn tướng, hà hữu sanh tử chi giả danh? Nhơn tối sơ nhất niệm sái thù, tùng mộng tưởng hữu tư sanh diệt
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>9 - Cáo đạo lộ:</div> Lễ này thường nhờ một người hộ tang đứng cúng, được cử hành trước một hôm đưa đám, đặt bàn cúng  trước cữa ngõ, ý nghĩa xin hộ đàng cho đám táng được yên ổn thuận lợi.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>10 - Khiển điện:</div> Lễ này cúng trước khi di quan, thường dành cho bằng hữu tỏ bày tâm sự, tình cảm với hương linh qua điếu văn.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>11 - Di quan (động quan):</div> Lễ di chuyển quan tài đi chôn hay hỏa táng, một lễ có nhiều xúc động nhất. Trong lễ này Gia trì sư thường đội nón Tỳ Lư và cầm tích trượng để hướng dẩn hương linh.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>12 - Tế độ trung:</div> Cúng giữa đường, lễ này với ý nghĩa: Trước tiên vì đường sá xa xôi, nghỉ xả hơi cho âm công (người gánh đám) lấy sức, đãi đằng ăn uống.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>13 - Trị huyệt:</div> Một lễ làm tinh sạch huyệt, trước khi hạ quan tài.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>14 - Tạ thổ thần:</div> Lễ khấn vái thổ thần và những hương linh của những ngôi mộ chung quanh. Nay có huơng linh. . . cùng chung cư trú tại địa phận này.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>15 - Nhiễu mộ:</div> Lễ này cử hành sau khi an táng xong; bái biệt hương linh, tạ chư Tăng, và quan khách đi dự đám táng.
        </Paragraph>
        <Paragraph>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>16 - An linh:</div> Khi về đến nhà, chùa, an vị hương linh để hương khói thờ phụng. Ngày trước đưa về nhà, phải thiết bàn thờ riêng trong hai năm hoặc ít nhất là 100 ngày, sau mới được nhập vào bàn thờ chung với tổ tiên. Ngoài ra còn có lễ đề phan vị, đề thần chú, lễ khai môn (mở cửa mã): sau khi chôn ba ngày làm lễ khai môn để hương linh được phép ra vào.
          Và để chuẩn bị được các nghi thức bàn bản theo đúng lễ tang Phật Giáo, gia quyến cần được nhờ đến sự hỗ trợ của các đơn vị chuyên tổ chức tang lễ. Bởi ở các cơ sở mai táng sẽ mang đến cho gia đình một tang lễ nghiêm trang và đúng các nghi thức tôn giáo của từng gia đình.
        </Paragraph>
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
       <Title level={3}>Trại hòm Thiện Đức – Cơ sở mai táng tốt nhất dành cho gia đình của bạn!</Title>
        <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "justify" }}>
        Trại hòm Thiện Đức với đội ngũ nhân viên có nhiều kinh nghiệm và kỹ năng, sẽ mang đến cho gia đình bạn một tang lễ Phật Giáo đúng cách nhất. Với sự “Tận tâm – Lịch sự - nhã nhặn – thân thiện” như kim chỉ nam giúp cho Thiện Đức được cùng đồng hành với gia quyến để tiễn đưa người đã khuất về với cõi vĩnh hằng thật trang trọng.
        Hãy liên hệ với chúng tôi – cơ sở mai táng Thiện Đức hân hạnh được cùng chia sẻ nỗi buồn này với gia quyến bằng các khâu chuẩn bị tang lễ Phật Giáo tốt nhất cho gia quyến.
        </Paragraph>
      </div>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
       <Title level={3}>Vì sao gia đình bạn nên lựa chọn dịch vụ tại Trại Hòm Thiện Đức?</Title>
        <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", textAlign: "justify" }}>
        Nơi luôn đặt lợi ích của khách hàng lên hàng đầu – Cam kết 100% hài lòng
        Báo gói dịch vụ rõ ràng, minh bạch, bán đúng sản phẩm gia đình chọn
        Với những dịch vụ mai táng chuyên nghiệp, chỉnh chu giúp cho lễ an táng của gia chủ thật sự trang trọng.
        Giá cả phù hợp với những chi phí tại gốc, không qua trung gian, Thiện Đức nhận thanh toán sau tang lễ
        Đúng giờ trong các lễ nghi của lễ an táng.
        Với sứ mệnh: “Tận tâm – Lịch sự - nhã nhặn – thân thiện”. Trại hòm Thiện Đức rất mong được phục vụ, chia sẻ cùng nỗi buồn với gia quyến trong những ngày đau buồn của gia đình. Để được biết thêm thông tin chi tiết về sản phẩm dịch vụ tại trại hòm Thiện Đức quý khách hàng vui lòng liên hệ qua hotline 0902.99.40.99 hoặc fanpage của Trại Hòm Thiện Đức
        </Paragraph>
      </div>
    </div>
  );
};

export default BuddhistFuneral;
