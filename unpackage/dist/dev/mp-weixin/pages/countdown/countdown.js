"use strict";
var store_index = require("../../store/index.js");
var common_vendor = require("../../common/vendor.js");
const clock = () => "../../components/clock.js";
const _sfc_main = {
  components: {
    clock
  },
  data() {
    return {
      countdownTime: "",
      dateInfo: "",
      hours: "00",
      minute: "00",
      second: "00",
      workOffTime: "18:00",
      workOffTimeToMillisecond: 0,
      timeIntervalId: 0
    };
  },
  created() {
    this.dateInfo = this.formateweek(new Date().getUTCDay());
    this.workOffTime = store_index.store.state.workOffTime || "18:00";
  },
  methods: {
    bindTimeChange: function(e) {
      this.workOffTime = e.detail.value;
      store_index.store.commit("setWorkOffTime", this.workOffTime);
    },
    workOffTimeChange() {
      clearInterval(this.timeIntervalId);
      let time = new Date();
      let workOffTimeArray = this.workOffTime.split(":");
      time.setHours(workOffTimeArray[0]);
      time.setMinutes(workOffTimeArray[1]);
      time.setSeconds(0);
      this.workOffTimeToMillisecond = time.getTime() - new Date().getTime() > 0 ? time.getTime() - new Date().getTime() : 0;
      this.startInterval();
    },
    workOffTimeToMillisecondChange() {
      this.hours = this.formate(Math.floor(this.workOffTimeToMillisecond / 1e3 / 60 / 60 % 24));
      this.minute = this.formate(Math.floor(this.workOffTimeToMillisecond / 1e3 / 60 % 60));
      this.second = this.formate(Math.floor(this.workOffTimeToMillisecond / 1e3 % 60));
    },
    startInterval() {
      this.timeIntervalId = setInterval(() => {
        if (this.workOffTimeToMillisecond > 0) {
          this.workOffTimeToMillisecond -= 1e3;
        } else {
          clearInterval(this.timeIntervalId);
        }
      }, 1e3);
    },
    formateweek(number) {
      let week = ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"];
      return "\u4ECA\u5929" + week[number];
    },
    formate(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num + "";
      }
    }
  },
  watch: {
    workOffTime: {
      handler: "workOffTimeChange",
      immediate: true
    },
    workOffTimeToMillisecond: {
      handler: "workOffTimeToMillisecondChange",
      immediate: true
    }
  },
  computed: {}
};
if (!Array) {
  const _component_clock = common_vendor.resolveComponent("clock");
  _component_clock();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.hours),
    b: common_vendor.t($data.minute),
    c: common_vendor.t($data.second),
    d: common_vendor.t($data.dateInfo),
    e: common_vendor.t($data.workOffTime),
    f: $data.workOffTime,
    g: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
