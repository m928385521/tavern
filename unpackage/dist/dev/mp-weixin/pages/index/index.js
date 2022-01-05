"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    getuserinfo() {
      let _this = this;
      common_vendor.index.getUserProfile({
        desc: "\u9700\u8981\u4F60\u7684\u4FE1\u606F",
        lang: "zh-CN",
        success(res) {
          console.log(res, "\u8FD4\u56DE\u7ED3\u679C");
          store_index.store.commit("setNickName", res.userInfo.nickName);
          console.log(store_index.store.state.nickName, "store\u7ED3\u679C");
          _this.gotonext();
        }
      });
    },
    gotonext() {
      common_vendor.index.navigateTo({
        url: "/pages/navigation/navigation",
        complete(res) {
          console.log(res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.gotonext && $options.gotonext(...args)),
    b: common_vendor.o((...args) => $options.getuserinfo && $options.getuserinfo(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
