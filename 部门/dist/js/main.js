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
                    var a = e.getCurrentX(); - 450 > a && (e.currentPage = 1), -1300 > a && (e.currentPage = 2), -1500 > a && (e.currentPage = 3), -2900 > a && (e.currentPage = 4), -3600 > a && (e.currentPage = 5), -4360 > a && (e.currentPage = 6), -5400 > a && (e.currentPage = 7), -6400 > a && (e.currentPage = 8), -7100 > a && (e.currentPage = 9)
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiEgZnVuY3Rpb24oZSwgYSwgbiwgdCkge1xuICAgIGZ1bmN0aW9uIGkoKSB7XG4gICAgICAgIHZhciBlID0gbihcIi5sYXllci1sb2FkaW5nXCIpLFxuICAgICAgICAgICAgYSA9IG4oXCIuY29udGFpbmVyXCIpO1xuICAgICAgICBuKFwiLnBlcmNlbnRhZ2VcIikudGV4dChcIjEwMCVcIiksIGUuYWRkQ2xhc3MoXCJoaWRlXCIpLCBhLnJlbW92ZUNsYXNzKFwiaGlkZVwiKSwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGUuaGlkZSgpXG4gICAgICAgIH0sIDYwMClcbiAgICB9XG4gICAgdmFyIHMgPSBbXCIuL2F1ZGlvcy9iZ20ubXAzXCIsIFwiLi9pbWFnZXMvbGl6aGlfbG9nby5wbmdcIiwgXCIuL2ltYWdlcy9saXpoaV9zaGFkb3cucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTFfdGl0bGUucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTFfYmcucG5nXCIsIFwiLi9pbWFnZXMvYmluZ19oZWFkLnBuZ1wiLCBcIi4vaW1hZ2VzL2JpbmdfYm9keS5wbmdcIiwgXCIuL2ltYWdlcy9wYWdlMl90aXRsZS5wbmdcIiwgXCIuL2ltYWdlcy96aG91LnBuZ1wiLCBcIi4vaW1hZ2VzL2t1bi5wbmdcIiwgXCIuL2ltYWdlcy9jYWtlLnBuZ1wiLCBcIi4vaW1hZ2VzL3BhZ2UzX2JnLnBuZ1wiLCBcIi4vaW1hZ2VzL2R1YW5nLnBuZ1wiLCBcIi4vaW1hZ2VzL2NoZW5nbG9uZ19ib2R5LnBuZ1wiLCBcIi4vaW1hZ2VzL2NoZW5nbG9uZ19oZWFkLnBuZ1wiLCBcIi4vaW1hZ2VzL3BhZ2U0X3RpdGxlLnBuZ1wiLCBcIi4vaW1hZ2VzL3BhZ2U0X2JnLnBuZ1wiLCBcIi4vaW1hZ2VzL2VudmVsb3BlX2JhY2sucG5nXCIsIFwiLi9pbWFnZXMvZW52ZWxvcGVfZnJvbnQucG5nXCIsIFwiLi9pbWFnZXMvcGFwZXIucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTVfdGl0bGUucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTVfYmcucG5nXCIsIFwiLi9pbWFnZXMvcm9ja2V0LnBuZ1wiLCBcIi4vaW1hZ2VzL3lhbjEucG5nXCIsIFwiLi9pbWFnZXMveWFuMi5wbmdcIiwgXCIuL2ltYWdlcy95YW4zLnBuZ1wiLCBcIi4vaW1hZ2VzL3lhbjQucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTZfdGl0bGUucG5nXCIsIFwiLi9pbWFnZXMvcGFnZTZfYmcucG5nXCIsIFwiLi9pbWFnZXMvc3Rhci5wbmdcIiwgXCIuL2ltYWdlcy9wYWdlN190aXRsZS5wbmdcIiwgXCIuL2ltYWdlcy9wYWdlN19iZy5wbmdcIiwgXCIuL2ltYWdlcy94aWRhZGEucG5nXCIsIFwiLi9pbWFnZXMveGlkYWRhX2hhbmQucG5nXCIsIFwiLi9pbWFnZXMvcGFnZThfdGl0bGUucG5nXCIsIFwiLi9pbWFnZXMvbGFuZ3lhX2JnLnBuZ1wiLCBcIi4vaW1hZ2VzL2xhbmd5YS5wbmdcIiwgXCIuL2ltYWdlcy95YW5nc2hpLnBuZ1wiLCBcIi4vaW1hZ2VzL3BhZ2U5X3RpdGxlLnBuZ1wiLCBcIi4vaW1hZ2VzL3d1MS5wbmdcIiwgXCIuL2ltYWdlcy93dTIucG5nXCIsIFwiLi9pbWFnZXMvd3UzLnBuZ1wiLCBcIi4vaW1hZ2VzL3d1NC5wbmdcIiwgXCIuL2ltYWdlcy93dTUucG5nXCIsIFwiLi9pbWFnZXMvd3U2LnBuZ1wiLCBcIi4vaW1hZ2VzL3d1Ny5wbmdcIiwgXCIuL2ltYWdlcy9ydW53YXlfc3RhcnQucG5nXCIsIFwiLi9pbWFnZXMvcnVud2F5X2JvZHkucG5nXCJdLFxuICAgICAgICBnID0gbG9hZGVyKHMpO1xuICAgIGcub24oXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIG4oXCIucGVyY2VudGFnZVwiKS50ZXh0KGUgKyBcIiVcIilcbiAgICB9KSwgZy5vbihcInN1Y2Nlc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGkoKVxuICAgIH0pLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpKClcbiAgICB9LCA1ZTMpO1xuICAgIHZhciByID0gbmV3IHQoe1xuICAgICAgICBlbDogXCIjcnVuZG93blwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZUR1cmF0aW9uOiA0ZTQsXG4gICAgICAgICAgICByb3RhdGVEdXJhdGlvbjogMjUwMCxcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgICAgc2Nyb2xsRWw6IG4oXCIuc2Nyb2xsV3JhcFwiKSxcbiAgICAgICAgICAgIHNjcm9sbFg6IFwiXCIsXG4gICAgICAgICAgICBydW53YXlMZW46IHBhcnNlSW50KG4oXCIucGFnZVdyYXBcIikuY3NzKFwid2lkdGhcIikpIC0gNjQwLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IDAsXG4gICAgICAgICAgICBjYW5SdW46ICExLFxuICAgICAgICAgICAgbGl6aGk6IG4oXCIucnVuIC5saXpoaS1sb2dvXCIpLFxuICAgICAgICAgICAgYmdtOiAhMCxcbiAgICAgICAgICAgIHNoYXJlTGF5ZXI6ICExLFxuICAgICAgICAgICAgaXNFbmQ6ICExLFxuICAgICAgICAgICAgYXVkaW86IG4oXCIjYmdtXCIpWzBdXG4gICAgICAgIH0sXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcztcbiAgICAgICAgICAgIG4od2luZG93KS5oZWlnaHQoKSA8IDk2MCAmJiAobihcIi5wYWdlXCIpLmFkZENsYXNzKFwic2NhbGVcIiksIG4oXCIuZW5kLWlubmVyXCIpLmFkZENsYXNzKFwic2NhbGVcIikpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZW9yaWVudGF0aW9uXCIsIGUuc2V0U3BlZWQsICExKSwgbihcIi5zY3JvbGxXcmFwXCIpLm9uKFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3AoKVxuICAgICAgICAgICAgfSksIGUuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGUuYXVkaW8ucGxheSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBoYW5kZWxJbnRlcnZhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBlLmdldEN1cnJlbnRYKCk7IC0gNDUwID4gYSAmJiAoZS5jdXJyZW50UGFnZSA9IDEpLCAtMTMwMCA+IGEgJiYgKGUuY3VycmVudFBhZ2UgPSAyKSwgLTE1MDAgPiBhICYmIChlLmN1cnJlbnRQYWdlID0gMyksIC0yOTAwID4gYSAmJiAoZS5jdXJyZW50UGFnZSA9IDQpLCAtMzYwMCA+IGEgJiYgKGUuY3VycmVudFBhZ2UgPSA1KSwgLTQzNjAgPiBhICYmIChlLmN1cnJlbnRQYWdlID0gNiksIC01NDAwID4gYSAmJiAoZS5jdXJyZW50UGFnZSA9IDcpLCAtNjQwMCA+IGEgJiYgKGUuY3VycmVudFBhZ2UgPSA4KSwgLTcxMDAgPiBhICYmIChlLmN1cnJlbnRQYWdlID0gOSlcbiAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U3BlZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5SdW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBwYXJzZUludChlLmdhbW1hIC8gMTApO1xuICAgICAgICAgICAgICAgICAgICBhID4gMCA/IHRoaXMuc3BlZWQgPSAxIDogMCA+IGEgPyB0aGlzLnNwZWVkID0gLTEgOiB0aGlzLnNwZWVkID0gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDdXJyZW50WDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBhID0gbihlLnNjcm9sbEVsKS5jc3MoXCJ0cmFuc2Zvcm1cIikubWF0Y2goL21hdHJpeFxcKCguKilcXCkvKSxcbiAgICAgICAgICAgICAgICAgICAgdCA9IGEgPyBhWzFdLnNwbGl0KFwiLFwiKVs0XSA6IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcm90YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGEgPSBlLmdldEN1cnJlbnRYKCk7XG4gICAgICAgICAgICAgICAgaWYgKCEoZS5zcGVlZCA8IDAgJiYgMCA9PSBhIHx8IGUuc3BlZWQgPiAwICYmIGEgPT0gZS5ydW53YXlMZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gcGFyc2VJbnQobi5WZWxvY2l0eS5ob29rKG4oZS5saXpoaSksIFwicm90YXRlWlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnNwZWVkID4gMCAmJiAwID4gdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAzNjAgKyB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbi5WZWxvY2l0eS5ob29rKG4oZS5saXpoaSksIFwicm90YXRlWlwiLCBpICsgXCJkZWdcIiksIHQgPSBpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5zcGVlZCA8IDAgJiYgdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gLTM2MCArIHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuLlZlbG9jaXR5Lmhvb2sobihlLmxpemhpKSwgXCJyb3RhdGVaXCIsIGkgKyBcImRlZ1wiKSwgdCA9IGlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9ICgzNjAgLSBNYXRoLmFicyh0KSkgLyAzNjAgKiBlLnJvdGF0ZUR1cmF0aW9uIHx8IGUucm90YXRlRHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG4oZS5saXpoaSkudmVsb2NpdHkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuc3BlZWQgPiAwID8gMzYwIDogLTM2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogXCJsaW5lYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLlZlbG9jaXR5Lmhvb2sobihlLmxpemhpKSwgXCJyb3RhdGVaXCIsIDApLCBlLnJvdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9iaWxlSEE6ICEwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUsIGEgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB0ID0gYS5nZXRDdXJyZW50WCgpLFxuICAgICAgICAgICAgICAgICAgICBpID0gYS5zcGVlZCA+IDAgPyBcInRvUmlnaHRcIiA6IFwidG9MZWZ0XCI7XG4gICAgICAgICAgICAgICAgYS5zcGVlZCA+IDAgPyAoZSA9IChhLnJ1bndheUxlbiAtIE1hdGguYWJzKHBhcnNlSW50KHQpKSkgLyBhLnJ1bndheUxlbiAqIGEudHJhbnNsYXRlRHVyYXRpb24gLyAxZTMsIG4oYS5zY3JvbGxFbCkuZmluZChcIi5ndWlkZVwiKS5hZGRDbGFzcyhcImhpZGVcIikuZmluZChcIi50aXBcIikuYWRkQ2xhc3MoXCJoaWRlXCIpKSA6IGEuc3BlZWQgPCAwICYmIChlID0gTWF0aC5hYnMocGFyc2VJbnQodCkpIC8gYS5ydW53YXlMZW4gKiBhLnRyYW5zbGF0ZUR1cmF0aW9uIC8gMWUzKSwgbihhLnNjcm9sbEVsKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcIi13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvblwiOiBlICsgXCJzXCJcbiAgICAgICAgICAgICAgICB9KSwgbihhLnNjcm9sbEVsKS5hZGRDbGFzcyhpKSwgYS5oYW5kZWxJbnRlcnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBhID0gbihlLnNjcm9sbEVsKS5jc3MoXCJ0cmFuc2Zvcm1cIiksXG4gICAgICAgICAgICAgICAgICAgIHQgPSBNYXRoLmFicyhlLmdldEN1cnJlbnRYKCkpO1xuICAgICAgICAgICAgICAgIGUuc2Nyb2xsWCA9IFwibm9uZVwiID09IGEgPyBcInRyYW5zbGF0ZVgoMClcIiA6IGEsIG4oZS5zY3JvbGxFbCkucmVtb3ZlQ2xhc3MoXCJ0b1JpZ2h0XCIpLnJlbW92ZUNsYXNzKFwidG9MZWZ0XCIpLCBuKGUuc2Nyb2xsRWwpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogZS5zY3JvbGxYXG4gICAgICAgICAgICAgICAgfSksIG4oZS5saXpoaSkudmVsb2NpdHkoXCJzdG9wXCIsICEwKSwgY2xlYXJJbnRlcnZhbChlLmludGVydmFsKSwgdCA9PSBlLnJ1bndheUxlbiAmJiBlLmVuZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBhID0gZS5jdXJyZW50UGFnZTtcbiAgICAgICAgICAgICAgICBuKFwiI3BhZ2VcIiArIGEpLmFkZENsYXNzKFwiYW5pbWF0ZWRcIiksIG4oXCIucGFnZVwiKS5lYWNoKGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZSA+IGEgLSAyICYmIGEgKyAyID4gZSA/IG4odCkucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpIDogbih0KS5hZGRDbGFzcyhcImhpZGVcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlZFwiKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFbmQgPSAhdGhpcy5FbmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5SdW4gPSAhMCwgdGhpcy5iZ20gPSAhMCwgbihcIi5ndWlkZVwiKS5hZGRDbGFzcyhcImhpZGVcIiksIG4oXCIudGlwLWNsaWNrXCIpLmFkZENsYXNzKFwiaGlkZVwiKSwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbihcIi50aXAtY2xpY2tcIikuaGlkZSgpLCBuKFwiLmd1aWRlXCIpLmhpZGUoKVxuICAgICAgICAgICAgICAgIH0sIDMwMCksIG4oXCIjYmdtXCIpWzBdLnBsYXkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZUJHTTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZ20gPSAhdGhpcy5iZ207XG4gICAgICAgICAgICAgICAgdmFyIGUgPSBuKFwiI2JnbVwiKVswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmJnbSA/IGUucGxheSgpIDogZS5wYXVzZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlU2hhcmVMYXllcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZUxheWVyID0gIXRoaXMuc2hhcmVMYXllclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgci4kd2F0Y2goXCJzcGVlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYW5SdW4gJiYgKHRoaXMuc3RvcCgpLCAwICE9IHRoaXMuc3BlZWQgJiYgKHRoaXMucm90YXRlKCksIHRoaXMudHJhbnNsYXRlKCkpKVxuICAgIH0pLCByLiR3YXRjaChcImN1cnJlbnRQYWdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZVNob3coKVxuICAgIH0pO1xuICAgIG4uYWpheCh7XG4gICAgICAgIHVybDogXCJodHRwOi8vaDUubGl6aGkuZm0vZ2V0SlNDb25maWdcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9oNS5saXpoaS5mbS9jb25ncmEvXCJcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB3eC5jb25maWcoe1xuICAgICAgICAgICAgICAgIGRlYnVnOiAhMSxcbiAgICAgICAgICAgICAgICBhcHBJZDogZS5hcHBJZCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGUudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgIG5vbmNlU3RyOiBlLm5vbmNlU3RyLFxuICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogZS5zaWduYXR1cmUsXG4gICAgICAgICAgICAgICAganNBcGlMaXN0OiBbXCJvbk1lbnVTaGFyZVRpbWVsaW5lXCIsIFwib25NZW51U2hhcmVBcHBNZXNzYWdlXCIsIFwic2hvd09wdGlvbk1lbnVcIiwgXCJoaWRlT3B0aW9uTWVudVwiXVxuICAgICAgICAgICAgfSksIHd4LnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmu5rliqjlkKfvvIzojZTmnp3lkJvvvIFcIixcbiAgICAgICAgICAgICAgICAgICAgbGluazogXCJodHRwOi8vaDUubGl6aGkuZm0vY29uZ3JhL1wiLFxuICAgICAgICAgICAgICAgICAgICBpbWdVcmw6IFwiaHR0cDovL2g1LmxpemhpLmZtL2NvbmdyYS9pbWFnZXMvd3hfc2hhcmUucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6IFwi5o2u57uf6K6h77yM6IO955yL5oeCNemhteeahOaYrzg15ZCO77yM55yL5oeCN+mhteeahOaYrzkw5ZCO77yMOTXlkI7lhajpg73mh4LvvIHmu5rkuI3liqjnmoTvvIzll68uLi7onIDpu43vvIzkuI3nuqbvvIFcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgd3gub25NZW51U2hhcmVUaW1lbGluZShlKSwgd3gub25NZW51U2hhcmVBcHBNZXNzYWdlKGUpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fVxuICAgIH0pXG59KHdpbmRvdywgZG9jdW1lbnQsIGpRdWVyeSwgVnVlKTtcbiJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
