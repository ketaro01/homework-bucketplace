const helper = {
  /**
   * 날짜 : 2020.01.21
   * 내용 : 쓰로틀링
   * @param f {function} : 쓰로틀링 callback 함수
   * @param interval {number} : 인터벌
   */
  throttling(f, interval = 300) {
    let isPending = false;
    return (...params) => {
      if (!isPending) {
        isPending = !!setTimeout(
          () => {
            f(...params);
            isPending = false;
          },
          interval,
        );
      }
    };
  },
};

export default helper;