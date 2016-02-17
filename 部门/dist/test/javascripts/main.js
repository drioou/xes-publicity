! function(e, a, n, t) {
  function i() {
    var e = n(".layer-loading"),
      a = n(".container");
    n(".percentage").text("100%"), e.addClass("hide"), a.removeClass("hide"), setTimeout(function() {
      e.hide()
    }, 600)
  }
  var s = ["./audios/bgm.mp3", "./images/lizhi_logo.png", "./images/lizhi_shadow.png", "./images/page1_title.png", "./images/page1_bg.png", "./images/bing_head.png", "./images/bing_body.png", "./images/page2_title.png", "./images/zhou.png", "./images/kun.png", "./images/cake.png", "./images/page3_bg.png", "./images/duang.png", "./images/chenglong_body.png", "./images/chenglong_head.png", "./images/page4_title.png", "./images/page4_bg.png", "./images/envelope_back.png", "./images/envelope_front.png", "./images/paper.png", "./images/page5_title.png", "./images/page5_bg.png", "./images/rocket.png", "./images/yan1.png", "./images/yan2.png", "./images/yan3.png", "./images/yan4.png", "./images/page6_title.png", "./images/page6_bg.png", "./images/star.png", "./images/page7_title.png", "./images/page7_bg.png", "./images/xidada.png", "./images/xidada_hand.png", "./images/page8_title.png", "./images/langya_bg.png", "./images/langya.png", "./images/yangshi.png", "./images/page9_title.png", "./images/wu1.png", "./images/wu2.png", "./images/wu3.png", "./images/wu4.png", "./images/wu5.png", "./images/wu6.png", "./images/wu7.png", "./images/runway_start.png", "./images/runway_body.png"],
    g = loader(s);
  g.on("progress", function(e) {
    n(".percentage").text(e + "%")
  }), g.on("success", function() {
    i()
  }), setTimeout(function() {
    i()
  }, 5e3);
  var r = new t({
    el: "#rundown",
    data: {
      speed: 0,
      translateDuration: 4e4,
      rotateDuration: 2500,
      currentPage: 0,
      scrollEl: n(".scrollWrap"),
      scrollX: "",
      runwayLen: parseInt(n(".pageWrap").css("width")) - 640,
      interval: 0,
      canRun: !1,
      lizhi: n(".run .lizhi-logo"),
      bgm: !0,
      shareLayer: !1,
      isEnd: !1,
      audio: n("#bgm")[0]
    },
    ready: function() {
      var e = this;
      n(window).height() < 960 && (n(".page").addClass("scale"), n(".end-inner").addClass("scale")), window.addEventListener("deviceorientation", e.setSpeed, !1), n(".scrollWrap").on("webkitTransitionEnd", function() {
        e.stop()
      }), e.audio.addEventListener("ended", function() {
        e.audio.play()
      })
    },
    methods: {
      handelInterval: function() {
        var e = this;
        e.interval = setInterval(function() {
          var a = e.getCurrentX(); - 450 > a && (e.currentPage = 1), -1300 > a && (e.currentPage = 2), -1500 > a && (e.currentPage = 3), -2900 > a && (e.currentPage = 4), -3600 > a && (e.currentPage = 5), -4360 > a && (e.currentPage = 6), -5400 > a && (e.currentPage = 7), -6400 > a && (e.currentPage = 8), -7100 > a && (e.currentPage = 9), -9100 > a && (e.currentPage = 10), -10279 > a && (e.currentPage = 11)
        }, 500)
      },
      setSpeed: function(e) {
        if (this.canRun) {
          var a = parseInt(e.gamma / 10);
          a > 0 ? this.speed = 1 : 0 > a ? this.speed = -1 : this.speed = 0
        }
      },
      getCurrentX: function() {
        var e = this,
          a = n(e.scrollEl).css("transform").match(/matrix\((.*)\)/),
          t = a ? a[1].split(",")[4] : 0;
        return parseInt(t)
      },
      rotate: function() {
        var e = this,
          a = e.getCurrentX();
        if (!(e.speed < 0 && 0 == a || e.speed > 0 && a == e.runwayLen)) {
          var t = parseInt(n.Velocity.hook(n(e.lizhi), "rotateZ"));
          if (e.speed > 0 && 0 > t) {
            var i = 360 + t;
            n.Velocity.hook(n(e.lizhi), "rotateZ", i + "deg"), t = i
          } else if (e.speed < 0 && t > 0) {
            var i = -360 + t;
            n.Velocity.hook(n(e.lizhi), "rotateZ", i + "deg"), t = i
          }
          var s = (360 - Math.abs(t)) / 360 * e.rotateDuration || e.rotateDuration;
          n(e.lizhi).velocity({
            rotateZ: function() {
              return e.speed > 0 ? 360 : -360
            }
          }, {
            duration: s,
            easing: "linear",
            complete: function() {
              n.Velocity.hook(n(e.lizhi), "rotateZ", 0), e.rotate()
            },
            mobileHA: !0
          })
        }
      },
      translate: function() {
        var e, a = this,
          t = a.getCurrentX(),
          i = a.speed > 0 ? "toRight" : "toLeft";
        a.speed > 0 ? (e = (a.runwayLen - Math.abs(parseInt(t))) / a.runwayLen * a.translateDuration / 1e3, n(a.scrollEl).find(".guide").addClass("hide").find(".tip").addClass("hide")) : a.speed < 0 && (e = Math.abs(parseInt(t)) / a.runwayLen * a.translateDuration / 1e3), n(a.scrollEl).css({
          "-webkit-transition-duration": e + "s"
        }), n(a.scrollEl).addClass(i), a.handelInterval()
      },
      stop: function() {
        var e = this,
          a = n(e.scrollEl).css("transform"),
          t = Math.abs(e.getCurrentX());
        e.scrollX = "none" == a ? "translateX(0)" : a, n(e.scrollEl).removeClass("toRight").removeClass("toLeft"), n(e.scrollEl).css({
          "-webkit-transform": e.scrollX
        }), n(e.lizhi).velocity("stop", !0), clearInterval(e.interval), t == e.runwayLen && e.end()
      },
      toggleShow: function() {
        var e = this,
          a = e.currentPage;
        n("#page" + a).addClass("animated"), n(".page").each(function(e, t) {
          e > a - 2 && a + 2 > e ? n(t).removeClass("hide") : n(t).addClass("hide").removeClass("animated")
        })
      },
      replay: function() {
        window.location.reload()
      },
      end: function() {
        this.isEnd = !this.End
      },
      start: function() {
        this.canRun = !0, this.bgm = !0, n(".guide").addClass("hide"), n(".tip-click").addClass("hide"), setTimeout(function() {
          n(".tip-click").hide(), n(".guide").hide()
        }, 300), n("#bgm")[0].play()
      },
      toggleBGM: function() {
        this.bgm = !this.bgm;
        var e = n("#bgm")[0];
        this.bgm ? e.play() : e.pause()
      },
      toggleShareLayer: function() {
        this.shareLayer = !this.shareLayer
      }
    }
  });
  r.$watch("speed", function() {
    this.canRun && (this.stop(), 0 != this.speed && (this.rotate(), this.translate()))
  }), r.$watch("currentPage", function() {
    this.toggleShow()
  });
  n.ajax({
    url: "http://h5.lizhi.fm/getJSConfig",
    data: {
      url: "http://h5.lizhi.fm/congra/"
    },
    type: "GET",
    dataType: "json",
    success: function(e) {
      wx.config({
        debug: !1,
        appId: e.appId,
        timestamp: e.timestamp,
        nonceStr: e.nonceStr,
        signature: e.signature,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "showOptionMenu", "hideOptionMenu"]
      }), wx.ready(function() {
        var e = {
          title: "滚动吧，荔枝君！",
          link: "http://h5.lizhi.fm/congra/",
          imgUrl: "http://h5.lizhi.fm/congra/images/wx_share.png",
          desc: "据统计，能看懂5页的是85后，看懂7页的是90后，95后全都懂！滚不动的，嗯...蜀黍，不约！"
        };
        wx.onMenuShareTimeline(e), wx.onMenuShareAppMessage(e)
      })
    },
    error: function() {}
  })
}(window, document, jQuery, Vue);
// if( $("#page9.animate") ){
//   $(".container").hide();
//   $(".end").show();
// }
