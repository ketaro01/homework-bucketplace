import styled from 'styled-components';

export const PictureMainBox = styled.div`
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
      label {
        cursor: pointer;
        margin-left: 6px;
        font-size: 15px;
      }
    }
  }
`;

export const ScrapButton = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  border: none;
  outline:none;
  background-color: transparent;
  background-image: url('/img/${props => props.viewScrap ? 'bt-checkbox-checked' : 'white'}.png');
  background-position: center center;
  opacity: 1;
  transition: opacity 0.2s;
  &:hover, &:active {
    opacity: 0.6;
  }
`;

export const PictureBoxWrap = styled.div`
  width: calc(100% - 120px);
  margin: 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ItemBox = styled.div`
  width: 268px;
  margin-bottom: 30px;
  .user-info {
    display: flex;
    align-items: center;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
    > span {
      margin-left: 10px;
    }
  }
`;

export const PictureItemBox = styled.div`
  position: relative;
  width: 268px;
  height: 268px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

export const ItemScrapButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url(${props => props.isScrap ? '/img/blue.png' : '/img/on-img.png'});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 1;
  transition: opacity 0.2s;
  &:hover, &:active {
    opacity: 0.6;
  }
`;

export const LoadingWrap = styled.div`
  > img {
    width: 100px;
  }
`;
