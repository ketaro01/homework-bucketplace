import React from 'react';
import styled from 'styled-components';

const LoadingWrap = styled.div`
  > img {
    width: 100px;
  }
`;

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
