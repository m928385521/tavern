"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "clock",
  data() {
    return {
      hoursAge: 0,
      minuteAge: 0,
      secondAge: 0,
      nowTime: "",
      intervarId: 0
    };
  },
  created() {
    this.intervarId = setInterval(() => {
      this.nowTime = new Date().toLocaleTimeString("chinese", {
        hour12: false
      });
    }, 1e3);
    this.initClockData();
  },
  methods: {
    initClockData() {
      this.hoursAge = new Date().getHours() / 12 * 360 + new Date().getMinutes() / 2 + 90;
      this.minuteAge = new Date().getMinutes() / 60 * 360 + new Date().getSeconds() / 10 + 90;
      this.secondAge = new Date().getSeconds() / 60 * 360 + 90;
    },
    timeChange() {
      this.secondAge += 6;
    }
  },
  watch: {
    nowTime: {
      handler: "timeChange",
      immediate: true
    }
  },
  computed: {
    hoursStyle() {
      return `transform: rotate(${this.hoursAge}deg);`;
    },
    minuteStyle() {
      return `transform: rotate(${this.minuteAge}deg);`;
    },
    secondStyle() {
      return `transform: rotate(${this.secondAge}deg);`;
    }
  },
  destroyed() {
    clearInterval(intervarId);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.hoursStyle),
    b: common_vendor.s($options.minuteStyle),
    c: common_vendor.s($options.secondStyle)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
