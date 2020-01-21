import React, { useState } from 'react';
import PictureList from '../components/PictureList';
import { PictureMainBox, ScrapButton } from '../styled';

const PictureContainer = () => {
  const [viewScrap, setViewScrap] = useState(false);

  // 스크립 모아보기 버튼 이벤트
  const handleOnClickScrap = () => {
    setViewScrap(!viewScrap);
  };

  return (
    <PictureMainBox>
      <div className="top-bar">
        <div className="scrap-box">
          <ScrapButton viewScrap={viewScrap} id="scrap_btn" onClick={handleOnClickScrap} />
          <label htmlFor="scrap_btn">스크랩한 것만 보기</label>
        </div>
        <PictureList viewScrap={viewScrap} />
      </div>
    </PictureMainBox>
  );
};

export default PictureContainer;
