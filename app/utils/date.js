const date = {
  getRoundTimeStr: () => {
    const date = new Date();
    const times = Math.round(date.getTime() / 1000);
    // 获取10000 ~ 99999之间的随机数
    const min = 1000;
    const max = 99999;
    const diff = max - min;
    const num = Math.round(Math.random() * diff) + min;
    return String(times) + num;
  },
};

export default date;
