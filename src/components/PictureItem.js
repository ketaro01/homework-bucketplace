import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemBox, PictureItemBox, ItemScrapButton } from '../styled';

class PictureItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnClickScrap = this.handleOnClickScrap.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  handleOnClickScrap() {
    const { item, onClickScrap } = this.props;
    onClickScrap(item);
  }
  render() {
    const { item, isScrap } = this.props;
    const { image_url, nickname, profile_image_url, description } = item;
    return (
      <ItemBox>
        <div className="user-info">
          <img src={profile_image_url} alt="avata" width={36} height={36}/>
          <span>{nickname}</span>
        </div>
        <PictureItemBox>
          <img src={image_url} alt={description}/>
          <ItemScrapButton isScrap={isScrap} onClick={this.handleOnClickScrap}/>
        </PictureItemBox>
      </ItemBox>
    );
  }
}

PictureItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    image_url: PropTypes.string,
    nickname: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
  isScrap: PropTypes.bool,
  onClickScrap: PropTypes.func.isRequired,
};

PictureItem.defaultProps = {
  item: {},
  isScrap: false,
};

export default PictureItem;
