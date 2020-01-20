const helper = {
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