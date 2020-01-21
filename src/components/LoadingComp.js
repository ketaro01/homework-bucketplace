import React from 'react';
import { LoadingWrap } from '../styled';

/**
 * 날짜 : 2020.01.21
 * 내용 : 하단부 로딩 바
 */
const LoadingComp = () => {
  return (
    <LoadingWrap>
      <img src="/img/loading.gif" alt="loading" />
    </LoadingWrap>
  );
};

export default LoadingComp;
