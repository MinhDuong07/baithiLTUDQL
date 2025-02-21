import React from "react";

const CatholicFuneral: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px 80px", // Giảm padding trên để chữ sát lề trên hơn
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <p style={{ fontSize: "20px", lineHeight: "1.6" }}>
        Công Giáo (Kito Giáo) và Phật Giáo là hai tôn giáo lớn nhất tại Việt Nam, 
        nó ảnh hưởng nhiều đến sự khác biệt về nghi thức giữa 2 tôn giáo. Người theo Công Giáo 
        đặt niềm tin vào Chúa Giêsu Kitô. Người cũng sẽ làm chứng cho niềm hy vọng phục sinh 
        của các tín đồ Kitô giáo sau khi qua đời. Các nghi thức tang lễ Công Giáo cũng nhắc 
        những người tham dự nhớ đến lòng thương xót và sự phán xét của Thiên Chúa. Đồng thời 
        thể hiện mong muốn của con người luôn hướng về Thiên Chúa khi gặp khủng hoảng.
      </p>
      <p style={{ fontSize: "20px", lineHeight: "1.6" }}>
        Với người Công giáo, nghi thức tổ chức tang lễ cũng có những ý nghĩa đặc biệt. 
        Vậy, nghi thức tang lễ Công Giáo như thế nào là đúng?
      </p>

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        Những điều cần chuẩn bị cho một tang lễ Công Giáo trước khi người thân qua đời.
      </div>

      {/* Thêm poster bên dưới */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="https://traihomthienduc.com/upload/images/tang-le-cong-giao-1.jpg"
          alt="Poster Tang Lễ Phật Giáo"
          style={{
            width: "100%", // Chiếm toàn bộ chiều rộng container
            maxWidth: "800px", // Giới hạn kích thước tối đa
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      <div style={{ fontSize: "20px", lineHeight: "1.6", marginTop: "20px", textAlign: "justify" }}>
        <p>
          Đặc biệt với người Công giáo, nghi thức tang lễ luôn được cẩn trọng tổ chức một cách trang nghiêm nhất. 
          Vì muốn linh hồn người đã khuất sẽ được thanh thản mà về với Chúa Kito. Nên thế, khi người bệnh còn đang 
          hấp hối thì người nhà, con cháu và cộng đồng Công giáo sẽ thực hiện thoa dầu xung quanh giường của người đó 
          nhằm giúp họ cảm thấy được an lòng hơn.
        </p>
        <p>
          Khi nhà có người thân đã qua đời, ở nhà thờ Công giáo sẽ thực hiện đánh chuông để thông báo tin buồn 
          cho toàn thể giáo xứ và người dân trong khu xóm biết. Tiếng chuông sẽ được đánh theo quy ước: 
          <b> Nam thất – Nữ cửu</b>, tức là nam đánh 7 tiếng chuông, nữ đánh 9 tiếng chuông.
        </p>
        <p>
          Một đặc điểm mà người Công giáo rất trọng (thể hiện tinh thần đoàn kết cao) khi có người qua đời đó là 
          việc đọc kinh, cầu nguyện và giúp đỡ gia đình có người vừa mất. Họ sẵn sàng tạm gác công việc của mình lại 
          để cùng tụng kinh tại nhà thờ hay tại chính nhà mình.
        </p>
        <p>
          Đối với người đã mất, thi thể sẽ được tiến hành nghi thức <b>mộc dược</b>, dùng rượu hoặc trà để tắm rửa vệ sinh nhẹ nhàng, 
          sau đó sẽ được thay đồ nghiêm chỉnh. Móng chân, móng tay của người đã khuất cũng được cắt tỉa sạch sẽ, 
          quần áo được chuẩn bị tinh tươm để bỏ vào hòm khi nhập quan. Nghi thức này với mục đích để người đã khuất 
          rửa sạch bụi trần mà yên tâm lưu hành đến cõi thiên đàng.
        </p>
        <p>
          Sau khi vệ sinh xong, người mất sẽ được để ở gian trước nhà, đầu nhìn ra cửa, tất cả các tấm kính trong nhà 
          đều được phủ bằng giấy báo, tủ đồ được phủ bằng vải trắng, bốn góc tường tẩm dầu và gia đình người thân 
          cần chuẩn bị thực hiện các công việc như: liên hệ nhờ giáo xứ chọn giờ phù hợp làm lễ, 
          chuẩn bị đầy đủ sách kinh dùng trong Thánh lễ và cầu nguyện, di ảnh người mất kích thước <b>25x30</b>, giấy báo tử, 
          sổ tang và phân công công việc trong tang lễ kĩ càng,…
        </p>

        <div style={{ fontSize: "22px" }}>
          Cùng tìm hiểu kỹ hơn qua nghi thức tang lễ Công Giáo qua bài viết dưới đây:
        </div>
        <div style={{ fontSize: "22px", textAlign: "left", fontWeight: "bold" }}>
            Nghi thức tang lễ Công Giáo
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="https://traihomthienduc.com/upload/images/tang-le-cong-giao-2.png"
          alt="Nghi thức tang lễ Công Giáo"
          style={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        1 - Nghi thức cầu nguyện cho người hấp hối (trước khi tang lễ diễn ra)
      </div>
      <p>
        Là một nghi thức của người Công Giáo nằm trong bộ nghi thức của Tang lễ Công Giáo. Khi gia đình có người thân bệnh nặng, nguy kịch thì gia đình sẽ mời Cha xứ đến ban phép lành, người thân phải chuẩn bị trước, để người sắp qua đời nhận được rước Mình Thánh Chúa nhiều lần.
        Gợi ý nghi thức cầu nguyện cho người sắp mất:
        Người thân có thể đọc Kinh dọn mình chết lành. Trong thời gian có người bệnh nặng, gia đình nên thỉnh thoảng đọc kinh này để cùng cầu nguyện với người bệnh. Ngoài ra cũng có thể thực hiện nghi thức phó dâng linh
      </p>
      
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        2 - Nghi thức nhập liệm trong tang lễ Công Giáo
      </div>
      <p>
        Khác với các nghi thức của Phật Giáo, nghi thức tang lễ Công Giáo người thân không dùng đồ để gọi linh hồn người đã khuất về nhập hòm mà chỉ đọc kinh thánh, cầu nguyện mong cho linh hồn người mất sẽ được siêu thoát và về với vòng tay chở che của Chúa.
        Thời gian diễn ra Nghi thức tẩm liệm sẽ được gia đình gia quyến quyết định, lúc đó tất cả anh em người thân trong gia đình và những người trong công giáo sẽ thực hiện đọc kinh và hát thánh ca trước khi Cha sở làm lễ nhập liệm.
        Cha xứ sẽ tiến hành làm lễ bằng cách vẩy “nước thánh” lên người đã mất. Hòm đựng người mất sẽ được đặt giữa nhà, sau khi nhập liệm xong thì con cháu người thân mới bắt đầu mặc áo tang.
        Bàn thờ để ngay sau hòm có đặt di ảnh người mất và bát hương, bên ngoài thắp 6 cây nến: bên trái 3 cây – bên phải 3 cây và ở giữa là một bình hoa huệ trắng. Phía sau là bức hình Chúa Giêsu và dòng chữ: tôi tin xác loài người ngày sau sống lại. 
      </p>
      
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        3 - Nghi thức động quan trong tang lễ Công Giáo
      </div>
      <p>
        Trong suốt 3 ngày diễn ra tang lễ, gia đình & bạn bè của gia quyến đều viếng thăm và đọc kinh nguyện thay phiên xung quanh hòm người đã mất. Và cho đến trước khi thực hiện nghi thức động quan, gia đình và người thân vẫn quy tụ và tiếp tục đọc kinh thánh cầu nguyện quanh hòm người mất.
        Sau đó, anh em đạo tỳ sẽ làm lễ bái quan. Trên đầu áo quan, gia đình người thân sẽ đặt tiền thường ít hay nhiều tùy thuộc vào điều kiện kinh tế của họ.
      </p>
      
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        4 - Nghi thức di quan trong tang lễ Công Giáo
      </div>
      <p>
        Nghi lễ cuối cùng của một tang lễ Công giáo đó là thực hiện lễ di quan. Trước khi thực hiện nghi lễ di quan để đưa tiễn người mất đoạn đường cuối cùng, Cha xứ sẽ thực hiện nghi thức Phục vụ thánh thể. Trong quá trình di quan, sẽ có 3 người đàn ông cầm thánh giá nến cao gồm: cây trượng đài có hình thánh giá, cây trượng đài gắn nến hoặc đèn dầu.
        Tiếp đó là người cầm cờ tang có màu tím hoặc màu đen (thông thường là màu đen), kèn trống. Tiếp sau nữa là người cầm lư hương, người cầm di ảnh người mất, hòm quan và cuối cùng là đoàn anh em, con cháu, người thân, hàng xóm đi theo sau.
        Sau khi tiễn đưa người mất đoạn đường cuối cùng để trở về với Chúa trời, những người thân, anh em xóm giềng sẽ thực hiện đọc kinh cầu nguyện cho người chết trong suốt 3 ngày liên tiếp kể từ ngày an táng.
      </p>
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        5 - Những lưu ý khi thực hiện các nghi thức trong tang lễ Công Giáo
      </div>
      <p>
        Khi tổ chức cũng như đến thăm viếng trong một tang lễ Công Giáo cần lưu ý một số điều:
        Tang lễ cần tổ chức đơn giản, đặc biệt tránh việc khóc lóc trong khi thực hiện các nghi lễ. Tuyệt nhiên không cúng tế bằng các sinh vật, tránh tổ chức chức ăn uống thịt rượu, kèn trống linh đình.
        Tất cả anh em, họ hàng, làng xóm đều nghiêm túc, thành kính đọc kinh cầu nguyện cho người mất, khách đến đến phúng viếng đều cần giữ nét mặt trang nghiêm, lịch sự để cùng chia buồn với gia đình người đã mất.
      </p>
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        Cơ sở mai táng Thiện Đức – Nơi giúp gia quyến chuẩn bị tốt nhất một tang lễ hoàn hảo!
      </div>
      <p>
        Đến với cơ sở mai táng Thiện Đức, gia đình bạn sẽ được chia sẻ, giảm bớt gánh nặng đau buồn trong lúc mất đi người thân để hoàn tất một tang lễ công giáo trang nghiêm nhất.
        Hãy để Thiện Đức cùng đồng hành cùng gia đình bạn trong các khâu chuẩn bị một tang lễ chỉnh chu và hoàn thiện nhất để gia đình an tâm bên cạnh và đưa tiễn người thân đến nơi an nghỉ trong tình yêu của Chúa Kitô.
      </p>
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        Vì sao gia đình bạn nên lựa chọn dịch vụ tại Trại Hòm Thiện Đức?
      </div>
      <p>
        Nơi luôn đặt lợi ích của khách hàng lên hàng đầu – Cam kết 100% hài lòng
        Báo gói dịch vụ rõ ràng, minh bạch, bán đúng sản phẩm gia đình chọn
        Với những dịch vụ mai táng chuyên nghiệp, chỉnh chu giúp cho lễ an táng của gia chủ thật sự trang trọng.
        Giá cả phù hợp với những chi phí tại gốc, không qua trung gian, Thiện Đức nhận thanh toán sau tang lễ
        Đúng giờ trong các lễ nghi của lễ an táng.
        Với sứ mệnh: “Tận tâm – Lịch sự - nhã nhặn – thân thiện”. Trại hòm Thiện Đức rất mong được phục vụ, chia sẻ cùng nỗi buồn với gia quyến trong những ngày đau buồn của gia đình. Để được biết thêm thông tin chi tiết về sản phẩm dịch vụ tại trại hòm Thiện Đức quý khách hàng vui lòng liên hệ qua hotline 0902.99.40.99 hoặc fanpage của Trại Hòm Thiện Đức
      </p>
    </div>
    
  );
};

export default CatholicFuneral;
