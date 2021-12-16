const timeForm = {
  hourToMin: function(str) {
    let arr = str.split(":");
    let x = 0;
    x = arr[0] * 60 * 1 + arr[1] * 1;
    return x;
  },
  minToHour: function(mun) {
    let hour = "",
      min = "";
    hour =
      Math.floor(parseInt(mun) / 60) < 10
        ? "0" + Math.floor(parseInt(mun) / 60)
        : Math.floor(parseInt(mun) / 60);
    min = mun % 60 < 10 ? "0" + (mun % 60) : mun % 60;
    return hour + ":" + min;
  },
  dateFormat: function(fmt, date) {
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      let ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }
};
export default timeForm;
