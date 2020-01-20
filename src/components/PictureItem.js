import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemBox = styled.div`
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

const PictureItemBox = styled.div`
  position: relative;
  width: 268px;
  height: 268px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  > button {
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
  }
`;

class PictureItem extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const { item, isScrap } = this.props;
    const { id, image_url, nickname, profile_image_url, description } = item;
    return (
      <ItemBox>
        <div className="user-info">
          <img src={profile_image_url} alt="avata" width={36} height={36}/>
          <span>{nickname}</span>
        </div>
        <PictureItemBox isScrap={isScrap} >
          <img src={image_url} alt={description}/>
          <button />
        </PictureItemBox>
      </ItemBox>
    );
  }
}

PictureItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  isScrap: PropTypes.bool,
};

PictureItem.defaultProps = {
  item: {},
  isScrap: false,
};

export default PictureItem;
