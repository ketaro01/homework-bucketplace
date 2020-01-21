import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoadingComp from './LoadingComp';
import PictureItem from './PictureItem';
import { getPictureUrl } from '../lib/config';
import helper from '../lib/helper';
import http from '../lib/http';
import storage from '../lib/storage';

const PictureBoxWrap = styled.div`
  width: calc(100% - 120px);
  margin: 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ITEM_SCRAP_LIST = 'ITEM_SCRAP_LIST';

class PictureList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictureData: [], // 사진 data list
      picIndex: 1, // 사진 data index
      isFinish: false, // 모든 데이터 로드 flag
      onLoad: true, // 중복 호출을 방지하기 위한 flag
      scrapList: {}, // 스크랩 list
    };

    this.getData = this.getData.bind(this);
    this.onScrollThrottling = this.onScrollThrottling.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnClickScrap = this.handleOnClickScrap.bind(this);
  }

  componentDidMount() {
    // 스크롤 이벤트 추가
    document.addEventListener('scroll', this.handleOnScroll);
    // index 에 해당하는 json load
    this.getData(this.state.picIndex);
    // 스크랩 정보 로드.
    this.setState({ scrapList: storage.get(ITEM_SCRAP_LIST) || {} });
  }

  componentWillUnmount() {
    // 이벤트 제거
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  // 스크롤 이벤트
  async handleOnScroll(e) {
    const { onLoad, isFinish } = this.state;
    const { viewScrap } = this.props;

    if (!e.target || !onLoad || isFinish || viewScrap) return;

    const doc = document.documentElement;
    const scroll = doc.scrollTop;
    const currentScrollSize = scroll + 20; // 최하단이 아닌 -20px 접근까지 허용.
    const scrollSize = doc.scrollHeight - doc.offsetHeight + 1;
    if (currentScrollSize >= scrollSize) {
      this.setState({ onLoad: false });
      this.onScrollThrottling(this.state.picIndex, () => {
        this.setState({ onLoad: true })
      });
    }
  };

  // 중복되는 스크롤 이벤트를 방지하기 위해 쓰로틀링 처리
  onScrollThrottling = helper.throttling(async (index, callback) => {
    await this.getData(index);
    callback();
  }, 1000);

  async getData(index) {
    const { picIndex, isFinish } = this.state;

    // 모든 데이터를 로드 한 경우 return;
    if (isFinish) return;

    // index url 가져옴.
    const url = getPictureUrl(index);

    try {
      const response = await http().get(url);
      if (response.status === 200) {
        this.setState({ picIndex: picIndex + 1 });
        await this.setState({ pictureData: this.state.pictureData.concat(response.data) });
      }
    } catch(e) {
      // error or 파일이 없는 경우
      if (e.response && e.response.status === 403) {
        // 더이상 파일이 없는 경우 finish
        this.setState({ isFinish: true });
      }
    }
  }

  handleOnClickScrap(item) {
    const storageValues = storage.get(ITEM_SCRAP_LIST);

    // 값이 존재하지 않거나 잘못된 value 가 들어가 있는 경우 초기화
    const itemScrapList = (typeof storageValues !== 'object' || !storageValues) ? {} : storageValues;

    let nextItemList = {};
    if (!itemScrapList[item.id]) {
      // 스크랩 정보가 없는 경우 추가. 서버에서 가져오지 않은 데이터를 찾아야 할 수 있으므로 전체 item 정보를 저장.
      nextItemList = Object.assign({}, itemScrapList, { [item.id]: JSON.stringify(item) });
    } else {
      // 스크랩 정보가 있는 경우 삭제.
      nextItemList = itemScrapList;
      delete nextItemList[item.id];
    }
    // 추가/삭제 처리가 끝난 데이터를 storage, state 에 저장
    storage.set(ITEM_SCRAP_LIST, nextItemList);
    this.setState({ scrapList: nextItemList });
  }

  render() {
    const { pictureData, scrapList } = this.state;
    const { viewScrap } = this.props;
    return (
      <PictureBoxWrap>
        {!viewScrap
          ? pictureData.map((item) => <PictureItem item={item} isScrap={!!scrapList[item.id]} key={item.id} onClickScrap={this.handleOnClickScrap} />)
          : Object.keys(scrapList).map((key) => {
            const item = JSON.parse(scrapList[key]);
            return <PictureItem item={item} isScrap={!!scrapList[item.id]} key={item.id} onClickScrap={this.handleOnClickScrap} />
          })}
        {!this.state.onLoad && <LoadingComp />}
      </PictureBoxWrap>
    );
  }
}

PictureList.propTypes = {
  viewScrap: PropTypes.bool,
};

PictureList.defaultProps = {
  viewScrap: false,
};

export default PictureList;
