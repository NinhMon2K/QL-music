export default {
  formatNumber: (num) => {
    if (num) {
      return num.format();
    } else {
      return "";
    }
  },
};

Number.prototype.format = function () {
  let n = 0,
    x = 3;
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&.");
};

