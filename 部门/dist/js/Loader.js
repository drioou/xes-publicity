function Loader(t) {
    this.resources = {}, this.resourcesLen = t.length, this.counter = 0, this.timer = {}, this.init(t)
}
Loader.prototype = {
    init: function(t) {
        var e = this;
        e.setRes(t), e.fetch(e.resources), Loader.prototype = utils.mixin(Loader.prototype, Events.prototype)
    },
    setRes: function(t) {
        var e = this;
        t.forEach(function(t, n) {
            var r = e.getFileName(t),
                i = e.getFileExt(t),
                o = e.getNodeType(i),
                s = {
                    ext: i,
                    type: o,
                    path: t
                };
            e.resources[r] = s
        })
    },
    getFileName: function(t) {
        return t.slice(t.lastIndexOf("/") + 1).replace(/\?.*$/, "").toLowerCase()
    },
    getFileExt: function(t) {
        return t.slice(t.lastIndexOf(".") + 1, t.length).toLowerCase()
    },
    getNodeType: function(t) {
        var e = {
            img: ["jpg", "jpeg", "gif", "png", "bmp"],
            audio: ["ogg", "wav", "mp3", "aac"]
        };
        for (var n in e)
            if (e[n].indexOf(t) > -1) return n
    },
    fetchImg: function(t) {
        var e = this,
            n = new Image;
        n.style.display = "none", n.onload = function() {
            e.count()
        }, n.src = t
    },
    fetchAudio: function(t) {
        var e = this,
            n = new Audio;
        n.preload = "auto";
        var r = function() {
            return function() {
                n.readyState > 0 && (clearInterval(e.timer[t]), e.timer[t] = null, e.count())
            }
        }();
        e.timer[t] = setInterval(r, 100), n.src = t
    },
    fetch: function(t) {
        for (var e in t) switch (t[e].type) {
            case "img":
                this.fetchImg(t[e].path);
                break;
            case "audio":
                this.fetchAudio(t[e].path)
        }
    },
    count: function() {
        if (this.counter++, this.counter === this.resourcesLen) this.trigger("success");
        else {
            var t = parseInt(this.counter / this.resourcesLen * 100);
            this.trigger("progress", t)
        }
    }
};
var Events = function() {};
Events.prototype = {
    constructor: Event,
    eventMap: {},
    trigger: function(t, e) {
        this.eventMap[t] && this.eventMap[t].forEach(function(t) {
            t.call(this, e)
        })
    },
    on: function(t, e) {
        this.eventMap[t] ? this.eventMap[t].push(e) : this.eventMap[t] = [e]
    }
};
var utils = {
        mixin: function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }
    },
    loader = function() {
        return function(t) {
            return new Loader(t)
        }
    }();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTG9hZGVyKHQpIHtcbiAgICB0aGlzLnJlc291cmNlcyA9IHt9LCB0aGlzLnJlc291cmNlc0xlbiA9IHQubGVuZ3RoLCB0aGlzLmNvdW50ZXIgPSAwLCB0aGlzLnRpbWVyID0ge30sIHRoaXMuaW5pdCh0KVxufVxuTG9hZGVyLnByb3RvdHlwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBlID0gdGhpcztcbiAgICAgICAgZS5zZXRSZXModCksIGUuZmV0Y2goZS5yZXNvdXJjZXMpLCBMb2FkZXIucHJvdG90eXBlID0gdXRpbHMubWl4aW4oTG9hZGVyLnByb3RvdHlwZSwgRXZlbnRzLnByb3RvdHlwZSlcbiAgICB9LFxuICAgIHNldFJlczogZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgZSA9IHRoaXM7XG4gICAgICAgIHQuZm9yRWFjaChmdW5jdGlvbih0LCBuKSB7XG4gICAgICAgICAgICB2YXIgciA9IGUuZ2V0RmlsZU5hbWUodCksXG4gICAgICAgICAgICAgICAgaSA9IGUuZ2V0RmlsZUV4dCh0KSxcbiAgICAgICAgICAgICAgICBvID0gZS5nZXROb2RlVHlwZShpKSxcbiAgICAgICAgICAgICAgICBzID0ge1xuICAgICAgICAgICAgICAgICAgICBleHQ6IGksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG8sXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZS5yZXNvdXJjZXNbcl0gPSBzXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRGaWxlTmFtZTogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5zbGljZSh0Lmxhc3RJbmRleE9mKFwiL1wiKSArIDEpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnRvTG93ZXJDYXNlKClcbiAgICB9LFxuICAgIGdldEZpbGVFeHQ6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQuc2xpY2UodC5sYXN0SW5kZXhPZihcIi5cIikgKyAxLCB0Lmxlbmd0aCkudG9Mb3dlckNhc2UoKVxuICAgIH0sXG4gICAgZ2V0Tm9kZVR5cGU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIGUgPSB7XG4gICAgICAgICAgICBpbWc6IFtcImpwZ1wiLCBcImpwZWdcIiwgXCJnaWZcIiwgXCJwbmdcIiwgXCJibXBcIl0sXG4gICAgICAgICAgICBhdWRpbzogW1wib2dnXCIsIFwid2F2XCIsIFwibXAzXCIsIFwiYWFjXCJdXG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIG4gaW4gZSlcbiAgICAgICAgICAgIGlmIChlW25dLmluZGV4T2YodCkgPiAtMSkgcmV0dXJuIG5cbiAgICB9LFxuICAgIGZldGNoSW1nOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBlID0gdGhpcyxcbiAgICAgICAgICAgIG4gPSBuZXcgSW1hZ2U7XG4gICAgICAgIG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiLCBuLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZS5jb3VudCgpXG4gICAgICAgIH0sIG4uc3JjID0gdFxuICAgIH0sXG4gICAgZmV0Y2hBdWRpbzogZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgZSA9IHRoaXMsXG4gICAgICAgICAgICBuID0gbmV3IEF1ZGlvO1xuICAgICAgICBuLnByZWxvYWQgPSBcImF1dG9cIjtcbiAgICAgICAgdmFyIHIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuLnJlYWR5U3RhdGUgPiAwICYmIChjbGVhckludGVydmFsKGUudGltZXJbdF0pLCBlLnRpbWVyW3RdID0gbnVsbCwgZS5jb3VudCgpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KCk7XG4gICAgICAgIGUudGltZXJbdF0gPSBzZXRJbnRlcnZhbChyLCAxMDApLCBuLnNyYyA9IHRcbiAgICB9LFxuICAgIGZldGNoOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIGUgaW4gdCkgc3dpdGNoICh0W2VdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpbWdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSW1nKHRbZV0ucGF0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXVkaW9cIjpcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoQXVkaW8odFtlXS5wYXRoKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ZXIrKywgdGhpcy5jb3VudGVyID09PSB0aGlzLnJlc291cmNlc0xlbikgdGhpcy50cmlnZ2VyKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdCA9IHBhcnNlSW50KHRoaXMuY291bnRlciAvIHRoaXMucmVzb3VyY2VzTGVuICogMTAwKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInByb2dyZXNzXCIsIHQpXG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIEV2ZW50cyA9IGZ1bmN0aW9uKCkge307XG5FdmVudHMucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBFdmVudCxcbiAgICBldmVudE1hcDoge30sXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24odCwgZSkge1xuICAgICAgICB0aGlzLmV2ZW50TWFwW3RdICYmIHRoaXMuZXZlbnRNYXBbdF0uZm9yRWFjaChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICB0LmNhbGwodGhpcywgZSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIG9uOiBmdW5jdGlvbih0LCBlKSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYXBbdF0gPyB0aGlzLmV2ZW50TWFwW3RdLnB1c2goZSkgOiB0aGlzLmV2ZW50TWFwW3RdID0gW2VdXG4gICAgfVxufTtcbnZhciB1dGlscyA9IHtcbiAgICAgICAgbWl4aW46IGZ1bmN0aW9uKHQsIGUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gaW4gZSkgZS5oYXNPd25Qcm9wZXJ0eShuKSAmJiAodFtuXSA9IGVbbl0pO1xuICAgICAgICAgICAgcmV0dXJuIHRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbG9hZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExvYWRlcih0KVxuICAgICAgICB9XG4gICAgfSgpO1xuIl0sImZpbGUiOiJMb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
