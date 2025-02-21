import { Card } from "antd";

const Home = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      {/* Banner */}
      <div style={{ width: "100%", height: "200px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", background: "#000" }}>
        <img 
          src="https://traihomthienduc.com/upload/images/Artboard%201.png" 
          alt="Banner" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </div>
      {/* Thông điệp dưới banner */}
      <h2 style={{ color: "red" }}>DỊCH VỤ TANG LỄ THIỆN ĐỨC</h2>
      <h2 style={{ color: "red" }}>GIỮ TRỌN CHỮ ĐỨC - GÓI TRỌN CHỮ TÂM</h2>
      <p>
        Trại hòm <strong>THIỆN ĐỨC</strong> phục vụ theo phương châm <strong>"TẬN TÂM - CHU ĐÁO - CHẤT LƯỢNG"</strong> và mang đến dịch vụ tang lễ phù hợp 
        cho mọi gia đình khi có người thân qua đời.
      </p>
      <p>
        <strong>THIỆN ĐỨC</strong> sẽ giúp gia quyến tổ chức một tang lễ chuyên nghiệp, trang trọng, chu toàn để đưa người thân về cõi vĩnh hằng 
        cùng mức chi phí hợp lý đúng lễ nghi từng tôn giáo và mỗi gia đình. Điều này đã được khẳng định qua hơn 30 năm kinh nghiệm 
        trong nghề và uy tín được xây dựng bằng niềm tin của thân nhân người đã khuất.
      </p>

       {/* Thêm 2 poster dưới chữ (một cái trên, một cái dưới) */}
       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
        <img 
          src="https://traihomthienduc.com/upload/images/231021(1).jpg" 
          alt="Poster 1" 
          style={{ width: "60%", height: "auto", borderRadius: "5px" }}
        />
        <img 
          src="https://traihomthienduc.com/upload/images/1(3).jpg" 
          alt="Poster 2" 
          style={{ width: "60%", height: "auto", borderRadius: "5px" }}
        />
        <img 
          src="https://traihomthienduc.com/upload/images/3(3).jpg" 
          alt="Poster 3" 
          style={{ width: "60%", height: "auto", borderRadius: "5px" }}
        />
      </div>
      {/* Thêm thông tin dưới poster */}
      <div style={{ textAlign: "left", marginTop: "20px", maxWidth: "80%", margin: "auto" }}>
        <p>
          <strong>• Thế mạnh của dịch vụ mai táng Thiện Đức</strong> là có xưởng sản xuất và phòng sơn bóng 2K riêng biệt, vì vậy quan tài ở Thiện Đức đều được chính tay chủ cơ sở chọn lựa, các thợ làm lành nghề với kinh nghiệm nhiều năm. Từ đó đảm bảo:
        </p>
        <ul>
          <li>Gỗ thật và đúng 100%, chất lượng đảm bảo tuyệt đối.</li>
          <li>Quan tài thiết kế đẹp, trang trọng, thi công tỉ mỉ, cẩn thận đến từng chi tiết.</li>
          <li>Giúp giảm thiểu chi phí một cách tối đa nhất vì gỗ và xưởng sản xuất quan tài đều của chính Cơ sở Thiện Đức.</li>
        </ul>
        <p>
          <strong>• Dịch vụ mai táng Thiện Đức</strong> làm tang lễ đã nhiều năm qua, do đó quý khách hãy yên tâm về các khâu tổ chức. Quy trình đã được chuẩn hóa, nhanh gọn nhưng vẫn đảm bảo lễ nghi, trang trọng, tư vấn phù hợp với các hình thức tang lễ và điều kiện, chi phí của từng gia đình.
        </p>
        <p>
          <strong>• Cam kết:</strong> Dịch vụ mai táng Thiện Đức nói gỗ nào bán đúng gỗ đó, dịch vụ nào theo đúng dịch vụ đó, để có được sự hài lòng của quý khách luôn là động lực của dịch vụ mai táng Thiện Đức ngày càng đi lên.
        </p>
      </div>
    </div>
  );
};

export default Home;
