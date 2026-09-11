import React from 'react';
import HeroSection from '../../components/home/HeroSection/HeroSection';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Khối tìm kiếm to đùng trên cùng */}
      <HeroSection />
      
      {/* Các khối danh sách việc làm sẽ thêm vào đây sau */}
    </div>
  );
};

export default Home;