! function(e, a, n, t) {
  function i() {
    var e = n(".layer-loading"),
      a = n(".container");
    n(".percentage").text("100%"), e.addClass("hide"), a.removeClass("hide"), setTimeout(function() {
      e.hide()
    }, 600)
  }
  var s = ["../../audios/bgm.mp3", "../../images/p1-1.png", "../../images/p1-3.png", "../../images/p1-bg.png", "../../images/p2-1.png", "../../images/p2-2.png", "../../images/p2-bg.png", "../../images/p2_title.png", "../../images/zhou.png", "../../images/kun.png", "../../images/cake.png", "../../images/p3.png", "../../images/p3-title.png", "../../images/p3-x.png", "../../images/p4-1.png", "../../images/p4-title.png", "../../images/p4-bg.png", "../../images/p4-left.png", "../../images/p4-right.png", "../../images/p5-camer.png", "../../images/p5-title.png", "../../images/p5-yellow.png", "../../images/p5-pink.png", "../../images/p6.png", "../../images/p6-title.png", "../../images/p7.png", "../../images/p8.png", "../../images/p8-left.png", "../../images/p8-right.png", "../../images/p9.png", "../../images/p9-title.png", "../../images/p10.png", "../../images/p10-1.png", "../../images/p10-2.png", "../../images/p10-3.png", "../../images/p10-4.png", "../../images/p10-title.png", "../../images/p11-bg.png", "../../images/peach.png", "../../images/flag-end.png", "../../images/fire.png", "../../images/end-right.png", "../../images/phone2.png", "../../images/end-bg.png", "../../images/end-left.png", "../../images/share.png", "../../images/runway_start.png", "../../images/runway_body.png"],
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
          var a = e.getCurrentX(); - 200 > a && (e.currentPage = 1), -1100 > a && (e.currentPage = 2), -2000 > a && (e.currentPage = 3), -2800 > a && (e.currentPage = 4), -3600 > a && (e.currentPage = 5), -4660 > a && (e.currentPage = 6), -5400 > a && (e.currentPage = 7), -6100 > a && (e.currentPage = 8),
               -7100 > a && (e.currentPage = 9),
               -8500 > a && (e.currentPage = 10),
               -8900 > a && (e.currentPage = 11)
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
        this.canRun = !0, this.bgm = !0, n(".guide").addClass("hide"), n(".tip-click").addClass("hide"), n(".monkey").addClass("hide"),  setTimeout(function() {
          n(".tip-click").hide(), n(".guide").hide(), n(".monkey").hide()
        }), n("#bgm")[0].play()
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
}(window, document, jQuery, Vue);
// if( $("#page9.animate") ){
//   $(".container").hide();
//   $(".end").show();
// }
