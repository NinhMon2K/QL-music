// let numeral = require("numeral");

// import VueNumerals from "vue-numerals";

// numeral.register("locale", "vi", {
//   delimiters: {
//     thousands: ".",
//     decimal: ",",
//   },
//   ordinal: () => ".",
// });

export default {
  //   formatNumberss: (num) => {
  //     if (num) {
  //       let degit = 0,
  //         buildDegit = 0;
  //       return numeral(Number(num)).format("0," + buildDegit.toFixed(degit));
  //     } else {
  //       return "";
  //     }
  //   },

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
