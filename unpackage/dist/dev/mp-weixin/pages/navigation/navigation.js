"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      nickName: "",
      itemList: [
        {
          id: 1,
          text: "\u8FD8\u6709\u591A\u4E45\u4E0B\u73ED\uFF1F",
          url: "/pages/countdown/countdown"
        },
        {
          id: 2,
          text: "\u6253\u98DE\u673A",
          url: "/pages/planeGame/planeGame"
        },
        {
          id: 3,
          text: "\u4E66\u5E97\u5730\u56FE",
          url: ""
        },
        {
          id: 4,
          text: "\u5F85\u5F00\u53D1\u3002\u3002\u3002",
          url: ""
        }
      ],
      messageAry: ["\u529F\u80FD\u5F85\u5F00\u53D1\u3002\u3002\u3002", "\u8BF4\u4E86\u6CA1\u505A\u5B8C\u5462\u3002\u3002\u3002", "\u522B\u70B9\u4E86\u3002\u3002\u3002", "\u4F60\u6162\u6162\u70B9\u5427\u3002"]
    };
  },
  onLoad() {
    this.nickName = store_index.store.state.nickName;
    if (this.nickName) {
      common_vendor.index.showToast({
        title: `\u6B22\u8FCE${this.nickName}`,
        duration: 2e3,
        icon: "none"
      });
    }
  },
  methods: {
    handlerGoPage(url) {
      if (url == "") {
        if (this.messageAry.length > 0) {
          common_vendor.index.showToast({
            title: this.messageAry[0],
            duration: 2e3,
            icon: "none"
          });
          this.messageAry.shift();
        }
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.itemList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.id,
        c: common_vendor.o(($event) => $options.handlerGoPage(item.url))
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
