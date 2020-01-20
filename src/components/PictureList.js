import React, { Component } from 'react';
import styled from 'styled-components';
import PictureItem from './PictureItem';
import LoadingComp from './LoadingComp';
import http from '../lib/http';
import { getPictureUrl } from '../lib/config';
import helper from '../lib/helper';

const PictureBoxWrap = styled.div`
  width: calc(100% - 120px);
  margin: 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;


class PictureList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pictureData: [],
      picIndex: 1,
      isFinish: false,
      onLoad: true,
    };
    this.getData = this.getData.bind(this);
    this.onScrollThrottling = this.onScrollThrottling.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    this.getData(this.state.picIndex);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  async onScroll(e) {
    const { onLoad, isFinish } = this.state;

    if (!e.target || !onLoad || isFinish) return;

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

  onScrollThrottling = helper.throttling(async (index, callback) => {
    await this.getData(index);
    callback();
  }, 750);

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
        await this.setState({ pictureData: [...this.state.pictureData, ...response.data] });
      }
    } catch(e) {
      // error or 파일이 없는 경우
      if (e.response && e.response.status === 403) {
        // 더이상 파일이 없는 경우 finish
        this.setState({ isFinish: true });
      }
    }
  }

  render() {
    return (
      <PictureBoxWrap>
        {this.state.pictureData.map((item) => <PictureItem item={item} key={item.id} />)}
        {!this.state.onLoad && <LoadingComp />}
      </PictureBoxWrap>
    );
  }
}

export default PictureList;
