"use strict";
var common_vendor = require("../../common/vendor.js");
let canvas = null;
const _sfc_main = {
  data() {
    return {
      showFlg: 0,
      score: 0,
      overFlg: false,
      levelAry: [
        {
          id: 0,
          title: "\u7B80\u5355",
          bulletSpeed: 100,
          planeSpeed: 400
        },
        {
          id: 1,
          title: "\u4E2D\u7B49",
          bulletSpeed: 200,
          planeSpeed: 300
        },
        {
          id: 2,
          title: "\u56F0\u96BE",
          bulletSpeed: 300,
          planeSpeed: 200
        },
        {
          id: 3,
          title: "\u5730\u72F1",
          bulletSpeed: 400,
          planeSpeed: 100
        },
        {
          id: 4,
          title: "\u795E\u964D",
          bulletSpeed: 30,
          planeSpeed: 80
        }
      ],
      myPlaneInfo: {
        x: 0,
        y: 0,
        showFlg: true
      },
      planeList: [],
      windowWidth: 0,
      windowHeight: 0,
      bulletList: [],
      boomList: [],
      gameTimer: 0,
      bulletTimer: 0,
      planeTimer: 0
    };
  },
  onReady() {
    canvas = common_vendor.index.createCanvasContext("myCanvas", this);
    let _this = this;
    common_vendor.index.getSystemInfo({
      success(res) {
        _this.windowWidth = res.windowWidth;
        _this.windowHeight = res.windowHeight;
        _this.setdefaultPostion();
      }
    });
  },
  methods: {
    setDifficulty(bulletSpeed, planeSpeed) {
      this.showFlg = 1;
      this.gameTimer = setInterval(() => {
        this.gameBegin();
      }, 17);
      this.bulletTimer = setInterval(() => {
        this.createBullet();
      }, bulletSpeed);
      this.planeTimer = setInterval(() => {
        this.createPlane();
      }, planeSpeed);
    },
    touchMove(e) {
      this.setMyPlanePosition(e);
    },
    touchStart(e) {
      this.setMyPlanePosition(e);
    },
    setMyPlanePosition(e) {
      if (this.myPlaneInfo.showFlg) {
        this.myPlaneInfo.x = (e.touches[0].x || e.touches[0].pageX) - 30;
        this.myPlaneInfo.y = (e.touches[0].y || e.touches[0].pageY) - 18;
      }
    },
    gameAgain() {
      this.overFlg = false;
      this.score = 0;
      this.showFlg = 0;
      this.myPlaneInfo.showFlg = true;
      this.setdefaultPostion();
    },
    gameBegin() {
      if (this.myPlaneInfo.showFlg) {
        canvas.drawImage("/static/planeGame/plane.png", this.myPlaneInfo.x, this.myPlaneInfo.y, 60, 36);
      } else {
        canvas.drawImage("/static/planeGame/boom2.png", this.myPlaneInfo.x, this.myPlaneInfo.y, 60, 36);
      }
      this.draw();
      canvas.draw();
    },
    draw() {
      this.bulletList = this.bulletList.map((e) => {
        if (e.y - 12 >= 0) {
          e.y = e.y - 12;
          return e;
        }
      }).filter((e) => e);
      this.planeList = this.planeList.map((e) => {
        if (e.y + e.speed <= this.windowHeight) {
          e.y = e.y + e.speed;
          let bulletIndex = this.bulletList.findIndex((be) => {
            return this.crash(e, be, false);
          });
          if (bulletIndex > -1) {
            this.boomList.push({
              x: e.x,
              y: e.y,
              time: 100
            });
            this.bulletList.splice(bulletIndex, 1);
            this.score++;
          } else if (this.crash(e, this.myPlaneInfo, true)) {
            this.boomList.push({
              x: e.x,
              y: e.y,
              time: 100
            });
            clearInterval(this.planeTimer);
            clearInterval(this.bulletTimer);
            this.myPlaneInfo.showFlg = false;
          } else {
            return e;
          }
        }
      }).filter((e) => e);
      if (this.myPlaneInfo.showFlg == false && this.planeList.length == 0) {
        clearInterval(this.gameTimer);
        this.overFlg = true;
      }
      this.boomList = this.boomList.map((e) => {
        if (e.time - 10 > 0) {
          e.time = e.time - 10;
          return e;
        }
      }).filter((e) => e);
      for (let s of this.planeList) {
        canvas.drawImage("/static/planeGame/enemy.png", s.x, s.y, 23, 30);
      }
      for (let s of this.bulletList) {
        canvas.drawImage("/static/planeGame/bullet.png", s.x - 3, s.y - 11, 6, 22);
      }
      for (let s of this.boomList) {
        canvas.drawImage("/static/planeGame/boom1.png", s.x, s.y, 23, 30);
      }
    },
    createBullet() {
      this.bulletList.push({
        x: this.myPlaneInfo.x + 30,
        y: this.myPlaneInfo.y
      });
    },
    createPlane() {
      this.planeList.push({
        x: (this.windowWidth - 23) * Math.random(),
        y: -30,
        speed: Math.random() * 3 + 2
      });
    },
    crash(plane, obj, myPlaneFlg) {
      if (this.myPlaneInfo.showFlg) {
        if (myPlaneFlg) {
          if (plane.x > obj.x + 60 || plane.x + 23 < obj.x || plane.y > obj.y + 36 || plane.y + 30 < obj.y) {
            return false;
          } else {
            return true;
          }
        } else {
          if (plane.x > obj.x + 6 || plane.x + 23 < obj.x || plane.y > obj.y + 22 || plane.y + 30 < obj.y) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return false;
      }
    },
    setdefaultPostion() {
      this.myPlaneInfo.x = this.windowWidth / 2 - 30;
      this.myPlaneInfo.y = this.windowHeight - 60;
    },
    replaceGame() {
    },
    touchend() {
    }
  },
  onUnload() {
    clearInterval(this.gameTimer);
    clearInterval(this.bulletTimer);
    clearInterval(this.planeTimer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.levelAry, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.id,
        c: common_vendor.o(($event) => $options.setDifficulty(item.bulletSpeed, item.planeSpeed))
      };
    }),
    b: $data.showFlg == 0,
    c: common_vendor.t($data.score * 10),
    d: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    e: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    f: common_vendor.o((...args) => $options.touchend && $options.touchend(...args)),
    g: $data.overFlg === true
  }, $data.overFlg === true ? {
    h: common_vendor.t($data.score * 10),
    i: common_vendor.o((...args) => $options.gameAgain && $options.gameAgain(...args))
  } : {}, {
    j: $data.showFlg == 1
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
