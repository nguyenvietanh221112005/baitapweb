import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import '../styles/HomePage.css';
import Navbar from '../pages/Navbar';  

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Dữ liệu banner
  const banners = [
    'https://shopvnb.com/uploads/images/tin_tuc/kich-thuoc-san-pickleball-3-1717631144.webp',
    'https://sonsanepoxy.vn/wp-content/uploads/2024/07/Thi-c%C3%B4ng-s%C3%A2n-Pickleball-11.png',
    'https://sukavietnam.com/wp-content/uploads/2024/09/sukavietnam.com-hinh-anh-mau-san-pickleball-dep-1.webp'
  ];

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập chưa
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/'); // Chuyển về HomeLogin nếu chưa đăng nhập
    } else {
      setUser(JSON.parse(storedUser));
    }

    // Chuyển ảnh banner mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [navigate, banners.length]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa thông tin user
    navigate('/'); // Chuyển về trang HomeLogin
    alert('Đã đăng xuất thành công');
  };

  return (
    <div className="home-page">
      <Helmet>
        <title>Pickleball Arena - Trang Người Dùng</title>
        <meta name="description" content="Sân chơi Pickleball chất lượng cao với các tiện nghi hiện đại" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* Sửa lại phần navbar */}
      <Navbar />

      {/* Video bên trái và ảnh chuyển tiếp bên phải */}
      <div className="carousel-section">
        <div className="content-container">
          {/* Phần video bên trái */}
          <div className="promo-video">
            <h3>Video</h3>
            <div className="videos">
              <iframe 
                src="https://www.youtube.com/embed/IzSYlr3VI1A?si=AwuJLBlgRzAkoNn1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
              <iframe 
                src="https://www.youtube.com/embed/PXB-0aMuVsQ?si=5ZRW72zv04HCGlgi" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
              <iframe 
                src="https://www.youtube.com/embed/hmddYEy-E1U?si=UZPsLEcVO9rqFeHS" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Phần ảnh chuyển tiếp bên phải */}
          <div className="carousel">
            <div className="carousel-content">
              <h2 className="carousel-title">Chào mừng đến với Pickleball Arena</h2>
              <p className="carousel-description">
                Trải nghiệm sân chơi Pickleball chất lượng cao với các tiện nghi hiện đại
              </p>
            </div>
            <img 
              src={banners[currentBanner]} 
              alt={`Banner ${currentBanner + 1}`} 
              className="carousel-image" 
            />
          </div>
        </div>
      </div>

      {/* Thông Tin Sân Pickleball */}
      <div className="court-info">
        <h2>Thông Tin Sân Pickleball</h2>
        <p><strong>Tên Sân:</strong> Pickleball Arena</p>
        <p><strong>Địa Chỉ:</strong> số 20 Hoàng Quốc Việt </p>
        <p><strong>Số Điện Thoại:</strong> +84 376125660</p>
        <p><strong>Giờ Mở Cửa:</strong> 8:00 AM - 12:00 PM</p>
      </div>
    </div>
  );
}

export default HomePage;
