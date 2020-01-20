import React, { useState } from 'react';
import styled from 'styled-components';
import PictureList from '../components/PictureList';

const PictureMainBox = styled.div`
  position: relative;
  width: 1256px;
  height: 100%;
  background-color: #ffffff;
  .top-bar {
    position: absolute;
    top: 30px;
    width: 100%;
    height: 24px;
    .scrap-box {
      display: flex;
      align-items: center;
      margin-left: 59px;
      > button {
        cursor: pointer;
        width: 24px;
        height: 24px;
        border: none;
        outline:none;
        background-color: transparent;
        background-image: url('/img/bt-checkbox-checked.png');
        background-position: center center;
        opacity: 1;
        transition: opacity 0.2s;
        &:hover, &:active {
          opacity: 0.6;
        }
      }
      label {
        cursor: pointer;
        margin-left: 6px;
        font-size: 15px;
      }
    }
  }
`;

const PictureContainer = () => {
  const [viewScrap, setViewScrap] = useState(false);
  const handleOnClickScrap = () => {
    setViewScrap(!viewScrap);
  };
  console.log(viewScrap);
  return (
    <PictureMainBox>
      <div className="top-bar">
        <div className="scrap-box">
          <button className="scrap-btn" id="scrap_btn" onClick={handleOnClickScrap} />
          <label htmlFor="scrap_btn">스크랩한 것만 보기</label>
        </div>
        <PictureList />
      </div>
    </PictureMainBox>
  );
};

export default PictureContainer;
