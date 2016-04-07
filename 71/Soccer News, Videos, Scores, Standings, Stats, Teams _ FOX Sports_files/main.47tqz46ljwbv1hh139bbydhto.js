/*!
 * massrel/stream-js 0.9.4
 *
 * Copyright 2012 Mass Relevance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this work except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 */ (function () {
    (function (a) {
        function g(a, b) {
            if (a && a.charAt(0) === "." && b) {
                b = b.split("/"), b = b.slice(0, b.length - 1), a = b.concat(a.split("/"));
                var c, d;
                for (c = 0; d = a[c]; c++) if (d === ".") a.splice(c, 1), c -= 1;
                else if (d === "..") {
                    if (c === 1 && (a[2] === ".." || a[0] === "..")) break;
                    c > 0 && (a.splice(c - 1, 2), c -= 2)
                }
                a = a.join("/")
            }
            return a
        }
        function h(b, c) {
            return function () {
                return f.apply(a, d.call(arguments, 0).concat([b, c]))
            }
        }
        function i(a) {
            return function (b) {
                return g(b, a)
            }
        }
        function j(a) {
            return function (c) {
                b[a] = c
            }
        }
        function k(d) {
            if (c.hasOwnProperty(d)) {
                var f = c[d];
                delete c[d], e.apply(a, f)
            }
            return b[d]
        }
        function l(a, b) {
            var c, d, e = a.indexOf("!");
            return e !== -1 ? (c = g(a.slice(0, e), b), a = a.slice(e + 1), d = k(c), d && d.normalize ? a = d.normalize(a, i(b)) : a = g(a, b)) : a = g(a, b), {
                f: c ? c + "!" + a : a,
                n: a,
                p: d
            }
        }
        var b = {}, c = {}, d = [].slice,
            e, f;
        if (typeof define == "function") return;
        e = function (d, e, f, g) {
            var i = [],
                m, n, o, p, q, r;
            g || (g = d);
            if (typeof f == "function") {
                !e.length && f.length && (e = ["require", "exports", "module"]);
                for (p = 0; p < e.length; p++) {
                    r = l(e[p], g), o = r.f;
                    if (o === "require") i[p] = h(d);
                    else if (o === "exports") i[p] = b[d] = {}, m = !0;
                    else if (o === "module") n = i[p] = {
                        id: d,
                        uri: "",
                        exports: b[d]
                    };
                    else if (b.hasOwnProperty(o) || c.hasOwnProperty(o)) i[p] = k(o);
                    else {
                        if (!r.p) throw d + " missing " + o;
                        r.p.load(r.n, h(g, !0), j(o), {}), i[p] = b[o]
                    }
                }
                q = f.apply(b[d], i), d && (n && n.exports !== a ? b[d] = n.exports : m || (b[d] = q))
            } else d && (b[d] = f)
        }, requirejs = f = function (b, c, d, g) {
            return typeof b == "string" ? k(l(b, c).f) : (b.splice || (c.splice ? (b = c, c = arguments[2]) : b = []), g ? e(a, b, c, d) : setTimeout(function () {
                e(a, b, c, d)
            }, 15), f)
        }, f.config = function () {
            return f
        }, require || (require = f), define = function (a, b, d) {
            b.splice || (d = b, b = []), define.unordered ? c[a] = [a, b, d] : e(a, b, d)
        }, define.amd = {
            jQuery: !0
        }
    })(), define("globals", {
        host: "tweetriver.com",
        timeout: 1e4,
        protocol: document.location.protocol === "https:" ? "https" : "http"
    }), define("helpers", ["globals"], function (a) {
        var b = {}, c = encodeURIComponent;
        b.step_through = function (a, c, d) {
            a = b.is_array(a) ? a : [a];
            var e = a.length - 1;
            if (e >= 0) for (; e >= 0; e--) {
                var f = a[e];
                for (var g = 0, h = c.length; g < h; g++) c[g].call(d, f)
            }
        }, b.extend = function (a, b) {
            var c;
            for (c in b) typeof a[c] == "undefined" && (a[c] = b[c]);
            return a
        }, b.api_url = function (b, c) {
            return c = c || a.host, a.protocol + "://" + c + b
        };
        var d = 0;
        a._json_callbacks = {}, b.jsonp_factory = function (c, e, f, g, h, i) {
            var j = f + ++d,
                k = !1,
                l;
            a._json_callbacks[j] = function (c) {
                typeof h == "function" ? h(c) : b.is_array(h) && h.length > 0 && helpers.step_through(c, h, g), delete a._json_callbacks[j], k = !0, clearTimeout(l)
            }, e.push(["jsonp", "massrel._json_callbacks." + j]);
            var m = b.load(c + "?" + b.to_qs(e));
            l = setTimeout(function () {
                k || (a._json_callbacks[j] = function () {
                    delete a._json_callbacks[j]
                }, typeof i == "function" && i(), m.stop())
            }, a.timeout)
        }, b.is_array = Array.isArray || function (a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        };
        var e = document.getElementsByTagName("head")[0] || document.body;
        b.load = function (a, b) {
            var c = document.createElement("script");
            c.type = "text/javascript", c.src = a;
            var d = !1;
            return c.onload = c.onreadystatechange = function () {
                !d && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (d = !0, c.onload = c.onreadystatechange = null, e && c.parentNode && e.removeChild(c), typeof b == "function" && b())
            }, e.insertBefore(c, e.firstChild), {
                stop: function () {
                    c.onload = c.onreadystatechange = null, e && c.parentNode && e.removeChild(c), c.src = "#"
                }
            }
        }, b.to_qs = function (a) {
            var d = [],
                e;
            if (a && a.length) {
                for (var f = 0, g = a.length; f < g; f++) {
                    e = a[f][1];
                    if (b.is_array(e)) {
                        for (var h = 0, i = e.length; h < i; h++) e[h] = c(e[h] || "");
                        e = e.join(",")
                    } else e !== undefined && e !== null ? e = c(e) : e = "";
                    d.push(c(a[f][0]) + "=" + e)
                }
                return d.join("&")
            }
            return ""
        };
        var f = /\+\d{4} \d{4}$/,
            g = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\+\d{4})$/;
        return b.fix_date = b.fix_twitter_date = function (a) {
            if (f.test(a)) {
                a = a.split(" ");
                var b = a.pop();
                a.splice(3, 0, b), a = a.join(" ")
            } else g.test(a) && (a = a.replace(g, "$1/$2/$3 $4:$5:$6 $7"));
            return a
        }, b.parse_params = function () {
            raw = {}, queryString = window.location.search.substring(1), queryString.charAt(0) == "?" && (queryString = queryString.substring(1));
            if (queryString.length > 0) {
                queryString = queryString.replace(/\+/g, " ");
                var a = queryString.split(/[&;]/g);
                for (var b = 0; b < a.length; b++) {
                    var c = a[b].split("="),
                        d = decodeURIComponent(c[0]),
                        e = c.length > 1 ? decodeURIComponent(c[1]) : "";
                    if (d in raw) {
                        var f = raw[d];
                        typeof f != "string" ? raw[d].push(e) : (raw[d] = [], raw[d].push(f), raw[d].push(e))
                    } else raw[d] = e
                }
            }
            return raw
        }, b
    }), define("account", ["helpers"], function (a) {
        function c(a) {
            this.user = a
        }
        var b = encodeURIComponent;
        return c.prototype.meta_url = function () {
            return a.api_url("/" + b(this.user) + ".json")
        }, c.prototype.meta = function () {
            var b, c, d;
            if (typeof arguments[0] == "function") c = arguments[0], d = arguments[1], b = {};
            else {
                if (typeof arguments[0] != "object") throw new Error("incorrect arguments");
                b = arguments[0], c = arguments[1], d = arguments[2]
            }
            var e = this.buildMetaParams(b);
            return a.jsonp_factory(this.meta_url(), e, "meta_", this, c, d), this
        }, c.prototype.buildMetaParams = function (b) {
            b = b || {};
            var c = [];
            b.quick_stats && c.push(["quick_stats", "1"]);
            if (b.streams) {
                var d = a.is_array(b.streams) ? b.streams : [b.streams];
                c.push(["streams", d.join(",")])
            }
            return c
        }, c.prototype.toString = function () {
            return this.user
        }, c
    }), define("meta_poller", ["helpers"], function (a) {
        function b(b, c) {
            var d = this,
                e = function () {
                    b.meta({
                        disregard: d.disregard
                    }, function (b) {
                        a.step_through(b, d._listeners, d), f()
                    }, function () {
                        f()
                    })
                }, f = function () {
                    h = setTimeout(e, d.frequency)
                }, g = !1,
                h;
            this._listeners = [], c = c || {}, this.disregard = c.diregard || null, this.frequency = (c.frequency || 30) * 1e3, this.start = function () {
                return g || (g = !0, e()), this
            }, this.stop = function () {
                return clearTimeout(h), g = !1, this
            }
        }
        return b.prototype.data = function (a) {
            return this._listeners.push(a), this
        }, b.prototype.each = b.prototype.data, b
    }), define("poller_queue", ["helpers"], function (a) {
        function b(b, c) {
            function k() {
                i = j.total, setTimeout(function () {
                    if (j.poller.enabled && j.total === i && e.length > 0 && d.length === 0) {
                        var a = Math.min(Math.floor(e.length * Math.random()), e.length - 1),
                            b = e[a];
                        d.push(b), j.total += 1, j.enqueued += 1, j.reused += 1, l()
                    }
                    k()
                }, c.history_timeout * 1e3)
            }
            function l() {
                if (!g && d.length > 0 && typeof f == "function") {
                    var a = ++h;
                    j.enqueued -= 1, j.count += 1;
                    var b = d.shift();
                    g = !0, f.call(j, b, function () {
                        a === h && (g = !1, setTimeout(l, 0))
                    }), c.history_size > 0 && !b.__recycled && (c.history_size === e.length && e.shift(), b.__recycled = !0, e.push(b))
                }
            }
            this.poller = b, c = a.extend(c || {}, {
                history_size: 0,
                history_timeout: b.frequency / 1e3
            });
            var d = [],
                e = [],
                f = null,
                g = !1,
                h = 0,
                i = 0;
            this.total = 0, this.enqueued = 0, this.count = 0, this.reused = 0;
            var j = this;
            b.batch(function (a) {
                var b = a.length,
                    c = b - 1;
                for (; c >= 0; c--) d.push(a[c]);
                j.total += b, j.enqueued += b, l()
            }), c.history_size > 0 && k(), this.next = function (a) {
                !g && typeof a == "function" && (f = a, l())
            }
        }
        return b
    }), define("poller", ["helpers", "poller_queue"], function (a, b) {
        function c(a, b) {
            this.stream = a, this._callbacks = [], this._enumerators = [], this._bound_enum = !1, this._t = null, b = b || {}, this.limit = b.limit || null, this.since_id = b.since_id || null, this.start_id = b.start_id || null, this.replies = !! b.replies, this.geo_hint = !! b.geo_hint, this.frequency = (b.frequency || 30) * 1e3, this.catch_up = b.catch_up !== undefined ? b.catch_up : !1, this.enabled = !1, this.alive = !0, this.alive_instance = 0, this.consecutive_errors = 0
        }
        return c.prototype.poke = function (a) {
            return !this.alive && this.enabled && (this._t = null, this.start()), this
        }, c.prototype.batch = function (a) {
            return this._callbacks.push(a), this
        }, c.prototype.each = function (a) {
            return this._enumerators.push(a), this
        }, c.prototype.start = function () {
            function d() {
                c.alive = !1;
                if (!c.enabled || b !== c.alive_instance) return;
                c.stream.load(c.params({
                    since_id: c.since_id
                }), function (b) {
                    c.alive = !0, c.consecutive_errors = 0;
                    var e = c.catch_up && b.length === c.limit;
                    if (b.length > 0) {
                        c.since_id = b[0].entity_id, c.start_id || (c.start_id = b[b.length - 1].entity_id);
                        for (var f = 0, g = c._callbacks.length; f < g; f++) c._callbacks[f].call(c, b);
                        a.step_through(b, c._enumerators, c)
                    }
                    c._t = setTimeout(d, e ? 0 : c.frequency)
                }, function () {
                    c.consecutive_errors += 1, c.poke()
                })
            }
            if (this._t) return this;
            this.enabled = !0;
            var b = this.alive_instance = this.alive_instance + 1,
                c = this;
            return d(), this
        }, c.prototype.stop = function () {
            return clearTimeout(this._t), this._t = null, this.enabled = !1, this
        }, c.prototype.queue = function (a) {
            var c = new b(this);
            return c.next(a), this
        }, c.prototype.more = function (a, b) {
            var c = this,
                d = function () {
                    c.stream.load(c.params({
                        start_id: c.start_id
                    }), function (b) {
                        b.length > 0 && (c.start_id = b[b.length - 1].entity_id), a(b)
                    }, function () {
                        typeof b == "function" && b()
                    })
                };
            return d(), this
        }, c.prototype.params = function (b) {
            return a.extend({
                limit: this.limit,
                replies: this.replies,
                geo_hint: this.geo_hint
            }, b || {})
        }, c
    }), define("stream", ["helpers", "poller", "meta_poller"], function (a, b, c) {
        function e() {
            var a = arguments.length === 1 ? arguments[0].split("/") : arguments;
            this.account = a[0], this.stream_name = a[1], this._enumerators = []
        }
        var d = encodeURIComponent;
        return e.prototype.stream_url = function () {
            return a.api_url("/" + d(this.account) + "/" + d(this.stream_name) + ".json")
        }, e.prototype.meta_url = function () {
            return a.api_url("/" + d(this.account) + "/" + d(this.stream_name) + "/meta.json")
        }, e.prototype.load = function (b, c, d) {
            b = a.extend(b || {}, {});
            var e = this.buildParams(b);
            return a.jsonp_factory(this.stream_url(), e, "_", this, c || this._enumerators, d), this
        }, e.prototype.buildParams = function (a) {
            a = a || {};
            var b = [];
            return a.limit && b.push(["limit", a.limit]), a.since_id ? b.push(["since_id", a.since_id]) : (a.start_id || a.start) && b.push(["start", a.start_id || a.start]), a.replies && b.push(["replies", "1"]), a.geo_hint && b.push(["geo_hint", "1"]), b
        }, e.prototype.each = function (a) {
            return this._enumerators.push(a), this
        }, e.prototype.poller = function (a) {
            return new b(this, a)
        }, e.prototype.meta = function () {
            var b, c, d;
            if (typeof arguments[0] == "function") c = arguments[0], d = arguments[1], b = {};
            else {
                if (typeof arguments[0] != "object") throw new Error("incorrect arguments");
                b = arguments[0], c = arguments[1], d = arguments[2]
            }
            var e = this.buildMetaParams(b);
            return a.jsonp_factory(this.meta_url(), e, "meta_", this, c, d), this
        }, e.prototype.buildMetaParams = function (a) {
            a = a || {};
            var b = [];
            return a.disregard && b.push(["disregard", a.disregard]), b
        }, e.prototype.metaPoller = function (a) {
            return new c(this, a)
        }, e
    }), define("context", ["helpers"], function (a) {
        function b(a) {
            this.status = a, this.source = {
                facebook: !1,
                twitter: !1,
                message: !1
            }, this.known = !1, this.intents = !1
        }
        return b.create = function (c, d) {
            c = c || {};
            var e = new b(c);
            return d = a.extend(d || {}, {
                intents: !0,
                retweeted_by: !0
            }), c.id_str && c.text && c.entities && (e.source.twitter = e.known = !0), c.facebook_id ? (e.source.facebook = !0, e.known = typeof c.message == "string") : c.network === "massrelevance" && (e.source.message = e.known = !0), e.source.twitter && c.retweeted_status && d.retweeted_by && (e.retweet = !0, e.retweeted_by_user = c.user, e.status = c.retweeted_status), e
        }, b
    }), define("vendor/massrel", ["globals", "helpers", "stream", "account", "poller", "meta_poller", "poller_queue", "context"], function (a, b, c, d, e, f, g, h) {
        var i = window.massrel;
        return typeof i == "undefined" ? i = window.massrel = a : b.extend(i, a), i.Stream = c, i.Account = d, i.Poller = e, i.MetaPoller = f, i.PollerQueue = g, i.Context = h, i.helpers = b, i.define = define, i.require = require, i.requirejs = requirejs, i
    })
})(),
function () {
    var a = {};
    a.VERSION = "1.0.beta.6", a.helpers = {}, a.partials = {}, a.registerHelper = function (a, b, c) {
        c && (b.not = c), this.helpers[a] = b
    }, a.registerPartial = function (a, b) {
        this.partials[a] = b
    }, a.registerHelper("helperMissing", function (a) {
        if (arguments.length === 2) return undefined;
        throw new Error("Could not find property '" + a + "'")
    });
    var b = Object.prototype.toString,
        c = "[object Function]";
    a.registerHelper("blockHelperMissing", function (a, d) {
        var e = d.inverse || function () {}, f = d.fn,
            g = "",
            h = b.call(a);
        h === c && (a = a.call(this));
        if (a === !0) return f(this);
        if (a === !1 || a == null) return e(this);
        if (h === "[object Array]") {
            if (a.length > 0) for (var i = 0, j = a.length; i < j; i++) g += f(a[i]);
            else g = e(this);
            return g
        }
        return f(a)
    }), a.registerHelper("each", function (a, b) {
        var c = b.fn,
            d = b.inverse,
            e = "";
        if (a && a.length > 0) for (var f = 0, g = a.length; f < g; f++) e += c(a[f]);
        else e = d(this);
        return e
    }), a.registerHelper("if", function (d, e) {
        var f = b.call(d);
        return f === c && (d = d.call(this)), !d || a.Utils.isEmpty(d) ? e.inverse(this) : e.fn(this)
    }), a.registerHelper("unless", function (b, c) {
        var d = c.fn,
            e = c.inverse;
        return c.fn = e, c.inverse = d, a.helpers["if"].call(this, b, c)
    }), a.registerHelper("with", function (a, b) {
        return b.fn(a)
    }), a.registerHelper("log", function (b) {
        a.log(b)
    }), a.Exception = function (a) {
        var b = Error.prototype.constructor.apply(this, arguments);
        for (var c in b) b.hasOwnProperty(c) && (this[c] = b[c]);
        this.message = b.message
    }, a.Exception.prototype = new Error, a.SafeString = function (a) {
        this.string = a
    }, a.SafeString.prototype.toString = function () {
        return this.string.toString()
    },
    function () {
        var b = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, c = /&(?!\w+;)|[<>"'`]/g,
            d = /[&<>"'`]/,
            e = function (a) {
                return b[a] || "&amp;"
            };
        a.Utils = {
            escapeExpression: function (b) {
                return b instanceof a.SafeString ? b.toString() : b == null || b === !1 ? "" : d.test(b) ? b.replace(c, e) : b
            },
            isEmpty: function (a) {
                return typeof a == "undefined" ? !0 : a === null ? !0 : a === !1 ? !0 : Object.prototype.toString.call(a) === "[object Array]" && a.length === 0 ? !0 : !1
            }
        }
    }(), a.Compiler = function () {}, a.JavaScriptCompiler = function () {},
    function (b, c) {
        b.OPCODE_MAP = {
            appendContent: 1,
            getContext: 2,
            lookupWithHelpers: 3,
            lookup: 4,
            append: 5,
            invokeMustache: 6,
            appendEscaped: 7,
            pushString: 8,
            truthyOrFallback: 9,
            functionOrFallback: 10,
            invokeProgram: 11,
            invokePartial: 12,
            push: 13,
            assignToHash: 15,
            pushStringParam: 16
        }, b.MULTI_PARAM_OPCODES = {
            appendContent: 1,
            getContext: 1,
            lookupWithHelpers: 2,
            lookup: 1,
            invokeMustache: 3,
            pushString: 1,
            truthyOrFallback: 1,
            functionOrFallback: 1,
            invokeProgram: 3,
            invokePartial: 1,
            push: 1,
            assignToHash: 1,
            pushStringParam: 1
        }, b.DISASSEMBLE_MAP = {};
        for (var d in b.OPCODE_MAP) {
            var e = b.OPCODE_MAP[d];
            b.DISASSEMBLE_MAP[e] = d
        }
        b.multiParamSize = function (a) {
            return b.MULTI_PARAM_OPCODES[b.DISASSEMBLE_MAP[a]]
        }, b.prototype = {
            compiler: b,
            disassemble: function () {
                var a = this.opcodes,
                    c, d, e = [],
                    f, g, h;
                for (var i = 0, j = a.length; i < j; i++) {
                    c = a[i];
                    if (c === "DECLARE") g = a[++i], h = a[++i], e.push("DECLARE " + g + " = " + h);
                    else {
                        f = b.DISASSEMBLE_MAP[c];
                        var k = b.multiParamSize(c),
                            l = [];
                        for (var m = 0; m < k; m++) d = a[++i], typeof d == "string" && (d = '"' + d.replace("\n", "\\n") + '"'), l.push(d);
                        f = f + " " + l.join(" "), e.push(f)
                    }
                }
                return e.join("\n")
            },
            guid: 0,
            compile: function (a, b) {
                this.children = [], this.depths = {
                    list: []
                }, this.options = b;
                var c = this.options.knownHelpers;
                this.options.knownHelpers = {
                    helperMissing: !0,
                    blockHelperMissing: !0,
                    each: !0,
                    "if": !0,
                    unless: !0,
                    "with": !0,
                    log: !0
                };
                if (c) for (var d in c) this.options.knownHelpers[d] = c[d];
                return this.program(a)
            },
            accept: function (a) {
                return this[a.type](a)
            },
            program: function (a) {
                var b = a.statements,
                    c;
                this.opcodes = [];
                for (var d = 0, e = b.length; d < e; d++) c = b[d], this[c.type](c);
                return this.isSimple = e === 1, this.depths.list = this.depths.list.sort(function (a, b) {
                    return a - b
                }), this
            },
            compileProgram: function (a) {
                var b = (new this.compiler).compile(a, this.options),
                    c = this.guid++;
                this.usePartial = this.usePartial || b.usePartial, this.children[c] = b;
                for (var d = 0, e = b.depths.list.length; d < e; d++) {
                    depth = b.depths.list[d];
                    if (depth < 2) continue;
                    this.addDepth(depth - 1)
                }
                return c
            },
            block: function (a) {
                var b = a.mustache,
                    c, d, e, f, g = this.setupStackForMustache(b),
                    h = this.compileProgram(a.program);
                a.program.inverse && (f = this.compileProgram(a.program.inverse), this.declare("inverse", f)), this.opcode("invokeProgram", h, g.length, !! b.hash), this.declare("inverse", null), this.opcode("append")
            },
            inverse: function (a) {
                var b = this.setupStackForMustache(a.mustache),
                    c = this.compileProgram(a.program);
                this.declare("inverse", c), this.opcode("invokeProgram", null, b.length, !! a.mustache.hash), this.declare("inverse", null), this.opcode("append")
            },
            hash: function (a) {
                var b = a.pairs,
                    c, d;
                this.opcode("push", "{}");
                for (var e = 0, f = b.length; e < f; e++) c = b[e], d = c[1], this.accept(d), this.opcode("assignToHash", c[0])
            },
            partial: function (a) {
                var b = a.id;
                this.usePartial = !0, a.context ? this.ID(a.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", b.original), this.opcode("append")
            },
            content: function (a) {
                this.opcode("appendContent", a.string)
            },
            mustache: function (a) {
                var b = this.setupStackForMustache(a);
                this.opcode("invokeMustache", b.length, a.id.original, !! a.hash), a.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
            },
            ID: function (a) {
                this.addDepth(a.depth), this.opcode("getContext", a.depth), this.opcode("lookupWithHelpers", a.parts[0] || null, a.isScoped || !1);
                for (var b = 1, c = a.parts.length; b < c; b++) this.opcode("lookup", a.parts[b])
            },
            STRING: function (a) {
                this.opcode("pushString", a.string)
            },
            INTEGER: function (a) {
                this.opcode("push", a.integer)
            },
            BOOLEAN: function (a) {
                this.opcode("push", a.bool)
            },
            comment: function () {},
            pushParams: function (a) {
                var b = a.length,
                    c;
                while (b--) c = a[b], this.options.stringParams ? (c.depth && this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.string)) : this[c.type](c)
            },
            opcode: function (a, c, d, e) {
                this.opcodes.push(b.OPCODE_MAP[a]), c !== undefined && this.opcodes.push(c), d !== undefined && this.opcodes.push(d), e !== undefined && this.opcodes.push(e)
            },
            declare: function (a, b) {
                this.opcodes.push("DECLARE"), this.opcodes.push(a), this.opcodes.push(b)
            },
            addDepth: function (a) {
                if (a === 0) return;
                this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a))
            },
            setupStackForMustache: function (a) {
                var b = a.params;
                return this.pushParams(b), a.hash && this.hash(a.hash), this.ID(a.id), b
            }
        }, c.prototype = {
            nameLookup: function (a, b, d) {
                return /^[0-9]+$/.test(b) ? a + "[" + b + "]" : c.isValidJavaScriptVariableName(b) ? a + "." + b : a + "['" + b + "']"
            },
            appendToBuffer: function (a) {
                return this.environment.isSimple ? "return " + a + ";" : "buffer += " + a + ";"
            },
            initializeBuffer: function () {
                return this.quotedString("")
            },
            namespace: "Handlebars",
            compile: function (a, b, c, d) {
                this.environment = a, this.options = b || {}, this.name = this.environment.name, this.isChild = !! c, this.context = c || {
                    programs: [],
                    aliases: {
                        self: "this"
                    },
                    registers: {
                        list: []
                    }
                }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.compileChildren(a, b);
                var e = a.opcodes,
                    f;
                this.i = 0;
                for (i = e.length; this.i < i; this.i++) f = this.nextOpcode(0), f[0] === "DECLARE" ? (this.i = this.i + 2, this[f[1]] = f[2]) : (this.i = this.i + f[1].length, this[f[0]].apply(this, f[1]));
                return this.createFunctionContext(d)
            },
            nextOpcode: function (a) {
                var c = this.environment.opcodes,
                    d = c[this.i + a],
                    e, f, g, h;
                if (d === "DECLARE") return e = c[this.i + 1], f = c[this.i + 2], ["DECLARE", e, f];
                e = b.DISASSEMBLE_MAP[d], g = b.multiParamSize(d), h = [];
                for (var i = 0; i < g; i++) h.push(c[this.i + i + 1 + a]);
                return [e, h]
            },
            eat: function (a) {
                this.i = this.i + a.length
            },
            preamble: function () {
                var a = [];
                this.useRegister("foundHelper");
                if (!this.isChild) {
                    var b = this.namespace,
                        c = "helpers = helpers || " + b + ".helpers;";
                    this.environment.usePartial && (c = c + " partials = partials || " + b + ".partials;"), a.push(c)
                } else a.push("");
                this.environment.isSimple ? a.push("") : a.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = a
            },
            createFunctionContext: function (b) {
                var c = this.stackVars;
                this.isChild || (c = c.concat(this.context.registers.list)), c.length > 0 && (this.source[1] = this.source[1] + ", " + c.join(", "));
                if (!this.isChild) {
                    var d = [];
                    for (var e in this.context.aliases) this.source[1] = this.source[1] + ", " + e + "=" + this.context.aliases[e]
                }
                this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
                var f = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
                for (var g = 0, h = this.environment.depths.list.length; g < h; g++) f.push("depth" + this.environment.depths.list[g]);
                if (b) return f.push(this.source.join("\n  ")), Function.apply(this, f);
                var i = "function " + (this.name || "") + "(" + f.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
                return a.log(a.logger.DEBUG, i + "\n\n"), i
            },
            appendContent: function (a) {
                this.source.push(this.appendToBuffer(this.quotedString(a)))
            },
            append: function () {
                var a = this.popStack();
                this.source.push("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
            },
            appendEscaped: function () {
                var a = this.nextOpcode(1),
                    b = "";
                this.context.aliases.escapeExpression = "this.escapeExpression", a[0] === "appendContent" && (b = " + " + this.quotedString(a[1][0]), this.eat(a)), this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + b))
            },
            getContext: function (a) {
                this.lastContext !== a && (this.lastContext = a)
            },
            lookupWithHelpers: function (a, b) {
                if (a) {
                    var c = this.nextStack();
                    this.usingKnownHelper = !1;
                    var d;
                    !b && this.options.knownHelpers[a] ? (d = c + " = " + this.nameLookup("helpers", a, "helper"), this.usingKnownHelper = !0) : b || this.options.knownHelpersOnly ? d = c + " = " + this.nameLookup("depth" + this.lastContext, a, "context") : (this.register("foundHelper", this.nameLookup("helpers", a, "helper")), d = c + " = foundHelper || " + this.nameLookup("depth" + this.lastContext, a, "context")), d += ";", this.source.push(d)
                } else this.pushStack("depth" + this.lastContext)
            },
            lookup: function (a) {
                var b = this.topStack();
                this.source.push(b + " = (" + b + " === null || " + b + " === undefined || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context") + ");")
            },
            pushStringParam: function (a) {
                this.pushStack("depth" + this.lastContext), this.pushString(a)
            },
            pushString: function (a) {
                this.pushStack(this.quotedString(a))
            },
            push: function (a) {
                this.pushStack(a)
            },
            invokeMustache: function (a, b, c) {
                this.populateParams(a, this.quotedString(b), "{}", null, c, function (a, b, c) {
                    this.usingKnownHelper || (this.context.aliases.helperMissing = "helpers.helperMissing", this.context.aliases.undef = "void 0", this.source.push("else if(" + c + "=== undef) { " + a + " = helperMissing.call(" + b + "); }"), a !== c && this.source.push("else { " + a + " = " + c + "; }"))
                })
            },
            invokeProgram: function (a, b, c) {
                var d = this.programExpression(this.inverse),
                    e = this.programExpression(a);
                this.populateParams(b, null, e, d, c, function (a, b, c) {
                    this.usingKnownHelper || (this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing", this.source.push("else { " + a + " = blockHelperMissing.call(" + b + "); }"))
                })
            },
            populateParams: function (a, b, c, d, e, f) {
                var g = e || this.options.stringParams || d || this.options.data,
                    h = this.popStack(),
                    i, j = [],
                    k, l, m;
                g ? (this.register("tmp1", c), m = "tmp1") : m = "{ hash: {} }";
                if (g) {
                    var n = e ? this.popStack() : "{}";
                    this.source.push("tmp1.hash = " + n + ";")
                }
                this.options.stringParams && this.source.push("tmp1.contexts = [];");
                for (var o = 0; o < a; o++) k = this.popStack(), j.push(k), this.options.stringParams && this.source.push("tmp1.contexts.push(" + this.popStack() + ");");
                d && (this.source.push("tmp1.fn = tmp1;"), this.source.push("tmp1.inverse = " + d + ";")), this.options.data && this.source.push("tmp1.data = data;"), j.push(m), this.populateCall(j, h, b || h, f, c !== "{}")
            },
            populateCall: function (a, b, c, d, e) {
                var f = ["depth0"].concat(a).join(", "),
                    g = ["depth0"].concat(c).concat(a).join(", "),
                    h = this.nextStack();
                if (this.usingKnownHelper) this.source.push(h + " = " + b + ".call(" + f + ");");
                else {
                    this.context.aliases.functionType = '"function"';
                    var i = e ? "foundHelper && " : "";
                    this.source.push("if(" + i + "typeof " + b + " === functionType) { " + h + " = " + b + ".call(" + f + "); }")
                }
                d.call(this, h, g, b), this.usingKnownHelper = !1
            },
            invokePartial: function (a) {
                params = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"], this.options.data && params.push("data"), this.pushStack("self.invokePartial(" + params.join(", ") + ");")
            },
            assignToHash: function (a) {
                var b = this.popStack(),
                    c = this.topStack();
                this.source.push(c + "['" + a + "'] = " + b + ";")
            },
            compiler: c,
            compileChildren: function (a, b) {
                var c = a.children,
                    d, e;
                for (var f = 0, g = c.length; f < g; f++) {
                    d = c[f], e = new this.compiler, this.context.programs.push("");
                    var h = this.context.programs.length;
                    d.index = h, d.name = "program" + h, this.context.programs[h] = e.compile(d, b, this.context)
                }
            },
            programExpression: function (a) {
                if (a == null) return "self.noop";
                var b = this.environment.children[a],
                    c = b.depths.list,
                    d = [b.index, b.name, "data"];
                for (var e = 0, f = c.length; e < f; e++) depth = c[e], depth === 1 ? d.push("depth0") : d.push("depth" + (depth - 1));
                return c.length === 0 ? "self.program(" + d.join(", ") + ")" : (d.shift(), "self.programWithDepth(" + d.join(", ") + ")")
            },
            register: function (a, b) {
                this.useRegister(a), this.source.push(a + " = " + b + ";")
            },
            useRegister: function (a) {
                this.context.registers[a] || (this.context.registers[a] = !0, this.context.registers.list.push(a))
            },
            pushStack: function (a) {
                return this.source.push(this.nextStack() + " = " + a + ";"), "stack" + this.stackSlot
            },
            nextStack: function () {
                return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), "stack" + this.stackSlot
            },
            popStack: function () {
                return "stack" + this.stackSlot--
            },
            topStack: function () {
                return "stack" + this.stackSlot
            },
            quotedString: function (a) {
                return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
            }
        };
        var f = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),
            g = c.RESERVED_WORDS = {};
        for (var h = 0, i = f.length; h < i; h++) g[f[h]] = !0;
        c.isValidJavaScriptVariableName = function (a) {
            return !c.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1
        }
    }(a.Compiler, a.JavaScriptCompiler), a.VM = {
        template: function (b) {
            var c = {
                escapeExpression: a.Utils.escapeExpression,
                invokePartial: a.VM.invokePartial,
                programs: [],
                program: function (b, c, d) {
                    var e = this.programs[b];
                    return d ? a.VM.program(c, d) : e ? e : (e = this.programs[b] = a.VM.program(c), e)
                },
                programWithDepth: a.VM.programWithDepth,
                noop: a.VM.noop
            };
            return function (d, e) {
                return e = e || {}, b.call(c, a, d, e.helpers, e.partials, e.data)
            }
        },
        programWithDepth: function (a, b, c) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function (c, e) {
                return e = e || {}, a.apply(this, [c, e.data || b].concat(d))
            }
        },
        program: function (a, b) {
            return function (c, d) {
                return d = d || {}, a(c, d.data || b)
            }
        },
        noop: function () {
            return ""
        },
        invokePartial: function (b, c, d, e, f, g) {
            options = {
                helpers: e,
                partials: f,
                data: g
            };
            if (b === undefined) throw new a.Exception("The partial " + c + " could not be found");
            if (b instanceof Function) return b(d, options);
            if (!a.compile) throw new a.Exception("The partial " + c + " could not be compiled when running in runtime-only mode");
            return f[c] = a.compile(b), f[c](d, options)
        }
    }, a.template = a.VM.template, define("vendor/handlebars", [], function () {
        return a
    })
}(), define("hbs", {
    load: function (a) {
        throw new Error("Dynamic load not allowed: " + a)
    }
});
if (typeof window == "undefined" || window === null) window = {
    twttr: {}
};
window.twttr == null && (window.twttr = {});
if (typeof twttr == "undefined" || twttr === null) twttr = {};
(function () {
    function b(a, b) {
        return b = b || "", typeof a != "string" && (a.global && b.indexOf("g") < 0 && (b += "g"), a.ignoreCase && b.indexOf("i") < 0 && (b += "i"), a.multiline && b.indexOf("m") < 0 && (b += "m"), a = a.source), new RegExp(a.replace(/#\{(\w+)\}/g, function (a, b) {
            var c = twttr.txt.regexen[b] || "";
            return typeof c != "string" && (c = c.source), c
        }), b)
    }
    function c(a, b) {
        return a.replace(/#\{(\w+)\}/g, function (a, c) {
            return b[c] || ""
        })
    }
    function d(a, b, c) {
        var d = String.fromCharCode(b);
        return c !== b && (d += "-" + String.fromCharCode(c)), a.push(d), a
    }
    function q(a) {
        var b = {};
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }
    function u(a, b, c) {
        return c ? !a || a.match(b) && RegExp["$&"] === a : typeof a == "string" && a.match(b) && RegExp["$&"] === a
    }
    twttr.txt = {}, twttr.txt.regexen = {};
    var a = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    twttr.txt.htmlEscape = function (b) {
        return b && b.replace(/[&"'><]/g, function (b) {
            return a[b]
        })
    };
    var e = String.fromCharCode,
        f = [e(32), e(133), e(160), e(5760), e(6158), e(8232), e(8233), e(8239), e(8287), e(12288)];
    d(f, 9, 13), d(f, 8192, 8202);
    var g = [e(65534), e(65279), e(65535)];
    d(g, 8234, 8238), twttr.txt.regexen.spaces_group = b(f.join("")), twttr.txt.regexen.spaces = b("[" + f.join("") + "]"), twttr.txt.regexen.invalid_chars_group = b(g.join("")), twttr.txt.regexen.punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
    var h = [];
    d(h, 1024, 1279), d(h, 1280, 1319), d(h, 11744, 11775), d(h, 42560, 42655), d(h, 1425, 1471), d(h, 1473, 1474), d(h, 1476, 1477), d(h, 1479, 1479), d(h, 1488, 1514), d(h, 1520, 1524), d(h, 64274, 64296), d(h, 64298, 64310), d(h, 64312, 64316), d(h, 64318, 64318), d(h, 64320, 64321), d(h, 64323, 64324), d(h, 64326, 64335), d(h, 1552, 1562), d(h, 1568, 1631), d(h, 1646, 1747), d(h, 1749, 1756), d(h, 1758, 1768), d(h, 1770, 1775), d(h, 1786, 1788), d(h, 1791, 1791), d(h, 1872, 1919), d(h, 2208, 2208), d(h, 2210, 2220), d(h, 2276, 2302), d(h, 64336, 64433), d(h, 64467, 64829), d(h, 64848, 64911), d(h, 64914, 64967), d(h, 65008, 65019), d(h, 65136, 65140), d(h, 65142, 65276), d(h, 8204, 8204), d(h, 3585, 3642), d(h, 3648, 3662), d(h, 4352, 4607), d(h, 12592, 12677), d(h, 43360, 43391), d(h, 44032, 55215), d(h, 55216, 55295), d(h, 65441, 65500), d(h, 12449, 12538), d(h, 12540, 12542), d(h, 65382, 65439), d(h, 65392, 65392), d(h, 65296, 65305), d(h, 65313, 65338), d(h, 65345, 65370), d(h, 12353, 12438), d(h, 12441, 12446), d(h, 13312, 19903), d(h, 19968, 40959), d(h, 173824, 177983), d(h, 177984, 178207), d(h, 194560, 195103), d(h, 12291, 12291), d(h, 12293, 12293), d(h, 12347, 12347), twttr.txt.regexen.nonLatinHashtagChars = b(h.join(""));
    var i = [];
    d(i, 192, 214), d(i, 216, 246), d(i, 248, 255), d(i, 256, 591), d(i, 595, 596), d(i, 598, 599), d(i, 601, 601), d(i, 603, 603), d(i, 611, 611), d(i, 616, 616), d(i, 623, 623), d(i, 626, 626), d(i, 649, 649), d(i, 651, 651), d(i, 699, 699), d(i, 7680, 7935), twttr.txt.regexen.latinAccentChars = b(i.join("")), twttr.txt.regexen.hashSigns = /[#＃]/, twttr.txt.regexen.hashtagAlpha = b(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i), twttr.txt.regexen.hashtagAlphaNumeric = b(/[a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}]/i), twttr.txt.regexen.endHashtagMatch = b(/^(?:#{hashSigns}|:\/\/)/), twttr.txt.regexen.hashtagBoundary = b(/(?:^|$|[^&a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}])/), twttr.txt.regexen.validHashtag = b(/(#{hashtagBoundary})(#{hashSigns})(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi), twttr.txt.regexen.validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|RT:?)/, twttr.txt.regexen.atSigns = /[@＠]/, twttr.txt.regexen.validMentionOrList = b("(#{validMentionPrecedingChars})(#{atSigns})([a-zA-Z0-9_]{1,20})(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?", "g"), twttr.txt.regexen.validReply = b(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/), twttr.txt.regexen.endMentionMatch = b(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/), twttr.txt.regexen.validUrlPrecedingChars = b(/(?:[^A-Za-z0-9@＠$#＃#{invalid_chars_group}]|^)/), twttr.txt.regexen.invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/, twttr.txt.regexen.invalidDomainChars = c("#{punct}#{spaces_group}#{invalid_chars_group}", twttr.txt.regexen), twttr.txt.regexen.validDomainChars = b(/[^#{invalidDomainChars}]/), twttr.txt.regexen.validSubdomain = b(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/), twttr.txt.regexen.validDomainName = b(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/), twttr.txt.regexen.validGTLD = b(/(?:(?:aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)(?=[^0-9a-zA-Z]|$))/), twttr.txt.regexen.validCCTLD = b(/(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)(?=[^0-9a-zA-Z]|$))/), twttr.txt.regexen.validPunycode = b(/(?:xn--[0-9a-z]+)/), twttr.txt.regexen.validDomain = b(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/), twttr.txt.regexen.validAsciiDomain = b(/(?:(?:[a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi), twttr.txt.regexen.invalidShortDomain = b(/^#{validDomainName}#{validCCTLD}$/), twttr.txt.regexen.validPortNumber = b(/[0-9]+/), twttr.txt.regexen.validGeneralUrlPathChars = b(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~|&#{latinAccentChars}]/i), twttr.txt.regexen.validUrlBalancedParens = b(/\(#{validGeneralUrlPathChars}+\)/i), twttr.txt.regexen.validUrlPathEndingChars = b(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i), twttr.txt.regexen.validUrlPath = b("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:@#{validGeneralUrlPathChars}+/))", "i"), twttr.txt.regexen.validUrlQueryChars = /[a-z0-9!?\*'\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i, twttr.txt.regexen.validUrlQueryEndingChars = /[a-z0-9_&=#\/]/i, twttr.txt.regexen.extractUrl = b("((#{validUrlPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))", "gi"), twttr.txt.regexen.validTcoUrl = /^https?:\/\/t\.co\/[a-z0-9]+/i, twttr.txt.regexen.validateUrlUnreserved = /[a-z0-9\-._~]/i, twttr.txt.regexen.validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i, twttr.txt.regexen.validateUrlSubDelims = /[!$&'()*+,;=]/i, twttr.txt.regexen.validateUrlPchar = b("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])", "i"), twttr.txt.regexen.validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i, twttr.txt.regexen.validateUrlUserinfo = b("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*", "i"), twttr.txt.regexen.validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i, twttr.txt.regexen.validateUrlIpv4 = b(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i), twttr.txt.regexen.validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i, twttr.txt.regexen.validateUrlIp = b("(?:#{validateUrlIpv4}|#{validateUrlIpv6})", "i"), twttr.txt.regexen.validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i, twttr.txt.regexen.validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i, twttr.txt.regexen.validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i, twttr.txt.regexen.validateUrlDomain = b(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i), twttr.txt.regexen.validateUrlHost = b("(?:#{validateUrlIp}|#{validateUrlDomain})", "i"), twttr.txt.regexen.validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, twttr.txt.regexen.validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, twttr.txt.regexen.validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, twttr.txt.regexen.validateUrlUnicodeDomain = b(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i), twttr.txt.regexen.validateUrlUnicodeHost = b("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})", "i"), twttr.txt.regexen.validateUrlPort = /[0-9]{1,5}/, twttr.txt.regexen.validateUrlUnicodeAuthority = b("(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?", "i"), twttr.txt.regexen.validateUrlAuthority = b("(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?", "i"), twttr.txt.regexen.validateUrlPath = b(/(\/#{validateUrlPchar}*)*/i), twttr.txt.regexen.validateUrlQuery = b(/(#{validateUrlPchar}|\/|\?)*/i), twttr.txt.regexen.validateUrlFragment = b(/(#{validateUrlPchar}|\/|\?)*/i), twttr.txt.regexen.validateUrlUnencoded = b("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$", "i");
    var j = "tweet-url",
        k = "list-slug",
        l = "username",
        m = "hashtag",
        n = ' rel="nofollow"',
        o = {
            urlClass: !0,
            listClass: !0,
            usernameClass: !0,
            hashtagClass: !0,
            usernameUrlBase: !0,
            listUrlBase: !0,
            hashtagUrlBase: !0,
            usernameUrlBlock: !0,
            listUrlBlock: !0,
            hashtagUrlBlock: !0,
            linkUrlBlock: !0,
            usernameIncludeSymbol: !0,
            suppressLists: !0,
            suppressNoFollow: !0,
            suppressDataScreenName: !0,
            urlEntities: !0,
            before: !0
        }, p = {
            disabled: !0,
            readonly: !0,
            multiple: !0,
            checked: !0
        };
    twttr.txt.linkToHashtag = function (a, b, d) {
        var e = {
            hash: b.substring(a.indices[0], a.indices[0] + 1),
            preText: "",
            text: twttr.txt.htmlEscape(a.hashtag),
            postText: "",
            extraHtml: d.suppressNoFollow ? "" : n
        };
        for (var f in d) d.hasOwnProperty(f) && (e[f] = d[f]);
        return c('#{before}<a href="#{hashtagUrlBase}#{text}" title="##{text}" class="#{urlClass} #{hashtagClass}"#{extraHtml}>#{hash}#{preText}#{text}#{postText}</a>', e)
    }, twttr.txt.linkToMentionAndList = function (a, b, d) {
        var e = b.substring(a.indices[0], a.indices[0] + 1),
            f = {
                at: d.usernameIncludeSymbol ? "" : e,
                at_before_user: d.usernameIncludeSymbol ? e : "",
                user: twttr.txt.htmlEscape(a.screenName),
                slashListname: twttr.txt.htmlEscape(a.listSlug),
                extraHtml: d.suppressNoFollow ? "" : n,
                preChunk: "",
                postChunk: ""
            };
        for (var g in d) d.hasOwnProperty(g) && (f[g] = d[g]);
        if (a.listSlug && !d.suppressLists) {
            var h = f.chunk = c("#{user}#{slashListname}", f);
            return f.list = twttr.txt.htmlEscape(h.toLowerCase()), c('#{before}#{at}<a class="#{urlClass} #{listClass}" href="#{listUrlBase}#{list}"#{extraHtml}>#{preChunk}#{at_before_user}#{chunk}#{postChunk}</a>', f)
        }
        return f.chunk = f.user, f.dataScreenName = d.suppressDataScreenName ? "" : c('data-screen-name="#{chunk}" ', f), c('#{before}#{at}<a class="#{urlClass} #{usernameClass}" #{dataScreenName}href="#{usernameUrlBase}#{chunk}"#{extraHtml}>#{preChunk}#{at_before_user}#{chunk}#{postChunk}</a>', f)
    }, twttr.txt.linkToUrl = function (a, b, d) {
        var e = a.url,
            f = e,
            g = twttr.txt.htmlEscape(f);
        if (d.urlEntities && d.urlEntities[e] && d.urlEntities[e].display_url) {
            var f = d.urlEntities[e].display_url,
                h = d.urlEntities[e].expanded_url;
            d.title || (d.title = h);
            var i = f.replace(/…/g, "");
            if (h.indexOf(i) != -1) {
                var j = h.indexOf(i),
                    k = {
                        displayUrlSansEllipses: i,
                        beforeDisplayUrl: h.substr(0, j),
                        afterDisplayUrl: h.substr(j + i.length),
                        precedingEllipsis: f.match(/^…/) ? "…" : "",
                        followingEllipsis: f.match(/…$/) ? "…" : ""
                    };
                $.each(k, function (a, b) {
                    k[a] = twttr.txt.htmlEscape(b)
                }), k.invisible = d.invisibleTagAttrs, g = c("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", k)
            } else g = f
        }
        var l = {
            htmlAttrs: d.htmlAttrs,
            url: twttr.txt.htmlEscape(e),
            linkText: g
        };
        return c('<a href="#{url}"#{htmlAttrs}>#{linkText}</a>', l)
    }, twttr.txt.autoLinkEntities = function (a, b, c) {
        c = q(c || {}), c.suppressNoFollow || (c.rel = "nofollow"), c.urlClass && (c["class"] = c.urlClass), c.urlClass = c.urlClass || j, c.hashtagClass = c.hashtagClass || m, c.hashtagUrlBase = c.hashtagUrlBase || "https://twitter.com/#!/search?q=%23", c.listClass = c.listClass || k, c.usernameClass = c.usernameClass || l, c.usernameUrlBase = c.usernameUrlBase || "https://twitter.com/", c.listUrlBase = c.listUrlBase || "https://twitter.com/", c.before = c.before || "", c.htmlAttrs = twttr.txt.extractHtmlAttrsFromOptions(c), c.invisibleTagAttrs = c.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";
        var d, e, f;
        if (c.urlEntities) {
            d = {};
            for (e = 0, f = c.urlEntities.length; e < f; e++) d[c.urlEntities[e].url] = c.urlEntities[e];
            c.urlEntities = d
        }
        var g = "",
            h = 0;
        for (var e = 0; e < b.length; e++) {
            var i = b[e];
            g += a.substring(h, i.indices[0]), i.url ? g += twttr.txt.linkToUrl(i, a, c) : i.hashtag ? g += twttr.txt.linkToHashtag(i, a, c) : i.screenName && (g += twttr.txt.linkToMentionAndList(i, a, c)), h = i.indices[1]
        }
        return g += a.substring(h, a.length), g
    }, twttr.txt.extractHtmlAttrsFromOptions = function (a) {
        var b = "";
        for (var d in a) {
            var e = a[d];
            if (o[d]) continue;
            p[d] && (e = e ? d : null);
            if (e == null) continue;
            b += c(' #{k}="#{v}" ', {
                k: twttr.txt.htmlEscape(d),
                v: twttr.txt.htmlEscape(e.toString())
            })
        }
        return b
    }, twttr.txt.autoLink = function (a, b) {
        var c = twttr.txt.extractEntitiesWithIndices(a, {
            extractUrlWithoutProtocol: !1
        });
        return twttr.txt.autoLinkEntities(a, c, b)
    }, twttr.txt.autoLinkUsernamesOrLists = function (a, b) {
        var c = twttr.txt.extractMentionsOrListsWithIndices(a);
        return twttr.txt.autoLinkEntities(a, c, b)
    }, twttr.txt.autoLinkHashtags = function (a, b) {
        var c = twttr.txt.extractHashtagsWithIndices(a);
        return twttr.txt.autoLinkEntities(a, c, b)
    }, twttr.txt.autoLinkUrlsCustom = function (a, b) {
        var c = twttr.txt.extractUrlsWithIndices(a, {
            extractUrlWithoutProtocol: !1
        });
        return twttr.txt.autoLinkEntities(a, c, b)
    }, twttr.txt.removeOverlappingEntities = function (a) {
        a.sort(function (a, b) {
            return a.indices[0] - b.indices[0]
        });
        var b = a[0];
        for (var c = 1; c < a.length; c++) b.indices[1] > a[c].indices[0] ? (a.splice(c, 1), c--) : b = a[c]
    }, twttr.txt.extractEntitiesWithIndices = function (a, b) {
        var c = twttr.txt.extractUrlsWithIndices(a, b).concat(twttr.txt.extractMentionsOrListsWithIndices(a)).concat(twttr.txt.extractHashtagsWithIndices(a, {
            checkUrlOverlap: !1
        }));
        return c.length == 0 ? [] : (twttr.txt.removeOverlappingEntities(c), c)
    }, twttr.txt.extractMentions = function (a) {
        var b = [],
            c = twttr.txt.extractMentionsWithIndices(a);
        for (var d = 0; d < c.length; d++) {
            var e = c[d].screenName;
            b.push(e)
        }
        return b
    }, twttr.txt.extractMentionsWithIndices = function (a) {
        var b = [],
            c = twttr.txt.extractMentionsOrListsWithIndices(a);
        for (var d = 0; d < c.length; d++) mentionOrList = c[d], mentionOrList.listSlug == "" && b.push({
            screenName: mentionOrList.screenName,
            indices: mentionOrList.indices
        });
        return b
    }, twttr.txt.extractMentionsOrListsWithIndices = function (a) {
        if (!a || !a.match(twttr.txt.regexen.atSigns)) return [];
        var b = [],
            c = 0;
        return a.replace(twttr.txt.regexen.validMentionOrList, function (d, e, f, g, h, i, j) {
            var k = j.slice(i + d.length);
            if (!k.match(twttr.txt.regexen.endMentionMatch)) {
                h = h || "";
                var l = a.indexOf(f + g + h, c);
                c = l + g.length + h.length + 1, b.push({
                    screenName: g,
                    listSlug: h,
                    indices: [l, c]
                })
            }
        }), b
    }, twttr.txt.extractReplies = function (a) {
        if (!a) return null;
        var b = a.match(twttr.txt.regexen.validReply);
        return !b || RegExp.rightContext.match(twttr.txt.regexen.endMentionMatch) ? null : b[1]
    }, twttr.txt.extractUrls = function (a, b) {
        var c = [],
            d = twttr.txt.extractUrlsWithIndices(a, b);
        for (var e = 0; e < d.length; e++) c.push(d[e].url);
        return c
    }, twttr.txt.extractUrlsWithIndices = function (a, b) {
        b || (b = {
            extractUrlsWithoutProtocol: !0
        });
        if (!a || (b.extractUrlsWithoutProtocol ? !a.match(/\./) : !a.match(/:/))) return [];
        var c = [];
        while (twttr.txt.regexen.extractUrl.exec(a)) {
            var d = RegExp.$2,
                e = RegExp.$3,
                f = RegExp.$4,
                g = RegExp.$5,
                h = RegExp.$7,
                i = twttr.txt.regexen.extractUrl.lastIndex,
                j = i - e.length;
            if (!f) {
                if (!b.extractUrlsWithoutProtocol || d.match(twttr.txt.regexen.invalidUrlWithoutProtocolPrecedingChars)) continue;
                var k = null,
                    l = !1,
                    m = 0;
                g.replace(twttr.txt.regexen.validAsciiDomain, function (a) {
                    var b = g.indexOf(a, m);
                    m = b + a.length, k = {
                        url: a,
                        indices: [j + b, j + m]
                    }, l = a.match(twttr.txt.regexen.invalidShortDomain), l || c.push(k)
                });
                if (k == null) continue;
                h && (l && c.push(k), k.url = e.replace(g, k.url), k.indices[1] = i)
            } else e.match(twttr.txt.regexen.validTcoUrl) && (e = RegExp.lastMatch, i = j + e.length), c.push({
                url: e,
                indices: [j, i]
            })
        }
        return c
    }, twttr.txt.extractHashtags = function (a) {
        var b = [],
            c = twttr.txt.extractHashtagsWithIndices(a);
        for (var d = 0; d < c.length; d++) b.push(c[d].hashtag);
        return b
    }, twttr.txt.extractHashtagsWithIndices = function (a, b) {
        b || (b = {
            checkUrlOverlap: !0
        });
        if (!a || !a.match(twttr.txt.regexen.hashSigns)) return [];
        var c = [],
            d = 0;
        a.replace(twttr.txt.regexen.validHashtag, function (b, e, f, g, h, i) {
            var j = i.slice(h + b.length);
            if (j.match(twttr.txt.regexen.endHashtagMatch)) return;
            var k = a.indexOf(f + g, d);
            d = k + g.length + 1, c.push({
                hashtag: g,
                indices: [k, d]
            })
        });
        if (b.checkUrlOverlap) {
            var e = twttr.txt.extractUrlsWithIndices(a);
            if (e.length > 0) {
                var f = c.concat(e);
                twttr.txt.removeOverlappingEntities(f), c = [];
                for (var g = 0; g < f.length; g++) f[g].hashtag && c.push(f[g])
            }
        }
        return c
    }, twttr.txt.modifyIndicesFromUnicodeToUTF16 = function (a, b) {
        twttr.txt.convertUnicodeIndices(a, b, !1)
    }, twttr.txt.modifyIndicesFromUTF16ToUnicode = function (a, b) {
        twttr.txt.convertUnicodeIndices(a, b, !0)
    }, twttr.txt.convertUnicodeIndices = function (a, b, c) {
        if (b.length == 0) return;
        var d = 0,
            e = 0;
        b.sort(function (a, b) {
            return a.indices[0] - b.indices[0]
        });
        var f = 0,
            g = b[0];
        while (d < a.length) {
            if (g.indices[0] == (c ? d : e)) {
                var h = g.indices[1] - g.indices[0];
                g.indices[0] = c ? e : d, g.indices[1] = g.indices[0] + h, f++;
                if (f == b.length) break;
                g = b[f]
            }
            var i = a.charCodeAt(d);
            55296 <= i && i <= 56319 && d < a.length - 1 && (i = a.charCodeAt(d + 1), 56320 <= i && i <= 57343 && d++), e++, d++
        }
    }, twttr.txt.splitTags = function (a) {
        var b = a.split("<"),
            c, d = [],
            e;
        for (var f = 0; f < b.length; f += 1) {
            e = b[f];
            if (!e) d.push("");
            else {
                c = e.split(">");
                for (var g = 0; g < c.length; g += 1) d.push(c[g])
            }
        }
        return d
    }, twttr.txt.hitHighlight = function (a, b, c) {
        var d = "em";
        b = b || [], c = c || {};
        if (b.length === 0) return a;
        var e = c.tag || d,
            f = ["<" + e + ">", "</" + e + ">"],
            g = twttr.txt.splitTags(a),
            h, i, j = "",
            k = 0,
            l = g[0],
            m = 0,
            n = 0,
            o = !1,
            p = l,
            q = [],
            r, s, t, u, v;
        for (h = 0; h < b.length; h += 1) for (i = 0; i < b[h].length; i += 1) q.push(b[h][i]);
        for (r = 0; r < q.length; r += 1) {
            s = q[r], t = f[r % 2], u = !1;
            while (l != null && s >= m + l.length) j += p.slice(n), o && s === m + p.length && (j += t, u = !0), g[k + 1] && (j += "<" + g[k + 1] + ">"), m += p.length, n = 0, k += 2, l = g[k], p = l, o = !1;
            !u && l != null ? (v = s - m, j += p.slice(n, v) + t, n = v, r % 2 === 0 ? o = !0 : o = !1) : u || (u = !0, j += t)
        }
        if (l != null) {
            n < p.length && (j += p.slice(n));
            for (r = k + 1; r < g.length; r += 1) j += r % 2 === 0 ? g[r] : "<" + g[r] + ">"
        }
        return j
    };
    var r = 140,
        s = [e(65534), e(65279), e(65535), e(8234), e(8235), e(8236), e(8237), e(8238)];
    twttr.txt.isInvalidTweet = function (a) {
        if (!a) return "empty";
        if (a.length > r) return "too_long";
        for (var b = 0; b < s.length; b++) if (a.indexOf(s[b]) >= 0) return "invalid_characters";
        return !1
    }, twttr.txt.isValidTweetText = function (a) {
        return !twttr.txt.isInvalidTweet(a)
    }, twttr.txt.isValidUsername = function (a) {
        if (!a) return !1;
        var b = twttr.txt.extractMentions(a);
        return b.length === 1 && b[0] === a.slice(1)
    };
    var t = b(/^#{validMentionOrList}$/);
    twttr.txt.isValidList = function (a) {
        var b = a.match(t);
        return !!b && b[1] == "" && !! b[4]
    }, twttr.txt.isValidHashtag = function (a) {
        if (!a) return !1;
        var b = twttr.txt.extractHashtags(a);
        return b.length === 1 && b[0] === a.slice(1)
    }, twttr.txt.isValidUrl = function (a, b, c) {
        b == null && (b = !0), c == null && (c = !0);
        if (!a) return !1;
        var d = a.match(twttr.txt.regexen.validateUrlUnencoded);
        if (!d || d[0] !== a) return !1;
        var e = d[1],
            f = d[2],
            g = d[3],
            h = d[4],
            i = d[5];
        return (!c || u(e, twttr.txt.regexen.validateUrlScheme) && e.match(/^https?$/i)) && u(g, twttr.txt.regexen.validateUrlPath) && u(h, twttr.txt.regexen.validateUrlQuery, !0) && u(i, twttr.txt.regexen.validateUrlFragment, !0) ? b && u(f, twttr.txt.regexen.validateUrlUnicodeAuthority) || !b && u(f, twttr.txt.regexen.validateUrlAuthority) : !1
    }, typeof module != "undefined" && module.exports && (module.exports = twttr.txt)
})(), define("vendor/twitter-text", function () {}), define("/templates/helpers/autoLink.akll2jtdu76jcraxy3h59b1cm.js", ["vendor/handlebars", "vendor/twitter-text"], function (a) {
    function b(a) {
        var b = {
            target: "_blank",
            usernameIncludeSymbol: !0
        };
        return this.source.twitter ? (window.twttr && twttr.tfw && (b.usernameUrlBase = "https://twitter.com/intent/user?screen_name="), this.status.entities && (this.status.entities.urls && (b.urlEntities = this.status.entities.urls), this.status.entities.media && (b.urlEntities = (b.urlEntities || []).concat(this.status.entities.media))), twttr.txt.autoLink(a, b)) : twttr.txt.autoLinkUrlsCustom(a, b)
    }
    return a.registerHelper("autoLink", b), b
}), define("hbs!content-stream/templates/status-facebook.html", ["hbs", "vendor/handlebars", "/templates/helpers/autoLink.akll2jtdu76jcraxy3h59b1cm.js"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function p(a, b) {
            var d = "",
                e;
            return d += '\n    <a href="http://www.facebook.com/profile.php?id=', i = c.status, e = i || a.status, e = e === null || e === undefined || e === !1 ? e : e.from, e = e === null || e === undefined || e === !1 ? e : e.id, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "status.from.id", {
                hash: {}
            })), d += o(e) + '&v=wall" class="massrel-avatar"><img src="//graph.facebook.com/', i = c.status, e = i || a.status, e = e === null || e === undefined || e === !1 ? e : e.from, e = e === null || e === undefined || e === !1 ? e : e.id, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "status.from.id", {
                hash: {}
            })), d += o(e) + "/picture?type=", i = c.status, e = i || a.status, e = e === null || e === undefined || e === !1 ? e : e.massrel_imgType, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "status.massrel_imgType", {
                hash: {}
            })), d += o(e) + '" alt="" /></a>\n  ', d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k = this,
            l = "function",
            m = c.helperMissing,
            n = void 0,
            o = this.escapeExpression;
        f += '<div class="massrel-status massrel-status-facebook" data-massrel-network="fb" data-massrel-id="', i = c.status, g = i || b.status, g = g === null || g === undefined || g === !1 ? g : g.facebook_id, typeof g === l ? g = g.call(b, {
            hash: {}
        }) : g === n && (g = m.call(b, "status.facebook_id", {
            hash: {}
        })), f += o(g) + '">\n  ', i = c.avatars, g = i || b.avatars, h = c["if"], j = k.program(1, p, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += '\n  <div class="massrel-content">\n    <div class="massrel-author">\n      <a href="http://www.facebook.com/profile.php?id=', i = c.status, g = i || b.status, g = g === null || g === undefined || g === !1 ? g : g.from, g = g === null || g === undefined || g === !1 ? g : g.id, typeof g === l ? g = g.call(b, {
            hash: {}
        }) : g === n && (g = m.call(b, "status.from.id", {
            hash: {}
        })), f += o(g) + '&v=wall" class="massrel-screen-name">', i = c.status, g = i || b.status, g = g === null || g === undefined || g === !1 ? g : g.from, g = g === null || g === undefined || g === !1 ? g : g.name, typeof g === l ? g = g.call(b, {
            hash: {}
        }) : g === n && (g = m.call(b, "status.from.name", {
            hash: {}
        })), f += o(g) + '</a>\n    </div>\n    <div class="massrel-text">', i = c.status, g = i || b.status, g = g === null || g === undefined || g === !1 ? g : g.message, i = c.autoLink, h = i || b.autoLink, typeof h === l ? g = h.call(b, g, {
            hash: {}
        }) : h === n ? g = m.call(b, "autoLink", g, {
            hash: {}
        }) : g = h;
        if (g || g === 0) f += g;
        return f += '</div>\n    <div class="massrel-meta">\n      <div class="massrel-permalink">\n        <a href="http://www.facebook.com/profile.php?id=', i = c.status, g = i || b.status, g = g === null || g === undefined || g === !1 ? g : g.from, g = g === null || g === undefined || g === !1 ? g : g.id, typeof g === l ? g = g.call(b, {
            hash: {}
        }) : g === n && (g = m.call(b, "status.from.id", {
            hash: {}
        })), f += o(g) + '&v=wall" class="massrel-network massrel-network-facebook">via Facebook</a>\n      </div>\n    </div>\n  </div>\n</div>\n', f
    });
    return b.registerPartial("content-stream_templates_status-facebook.html", c), c
}), define("/templates/helpers/prettyDate.a1w2o2iqhfhv4dqdm72mmwm81.js", ["vendor/handlebars", "vendor/massrel"], function (a, b) {
    function c(a, b) {
        var c = new Date((a || "").replace(/-/g, "/").replace(/[TZ][^hu]/g, " ")),
            d = ((new Date).getTime() - c.getTime()) / 1e3,
            e = Math.floor(d / 86400),
            f = ((new Date).getFullYear() - c.getFullYear()) * 12 + ((new Date).getMonth() + 1) - (c.getMonth() + 1),
            g = {
                basic: {
                    justNow: "a moment ago",
                    oneMinuteAgo: "1 min ago",
                    minutesAgo: " mins ago",
                    oneHourAgo: "1 hour ago",
                    hoursAgo: " hours ago",
                    yesterday: "yesterday",
                    daysAgo: " days ago",
                    oneWeekAgo: "1 week ago",
                    weeksAgo: " weeks ago",
                    oneMonthAgo: "last month",
                    monthsAgo: "months ago",
                    oneYearAgo: "last year",
                    yearsAgo: "years ago"
                },
                concise: {
                    justNow: "now",
                    oneMinuteAgo: "1m",
                    minutesAgo: "m",
                    oneHourAgo: "1h",
                    hoursAgo: "h",
                    yesterday: "1d",
                    daysAgo: "d",
                    oneWeekAgo: "1w",
                    weeksAgo: "w",
                    oneMonthAgo: "1mo",
                    monthsAgo: "mo",
                    oneYearAgo: "1y",
                    yearsAgo: "y"
                }
            }, h;
        return b = b && typeof b == "string" ? b : "basic", h = g[b], isNaN(e) || e < 0 ? h.justNow : e === 0 && (d < 60 && h.justNow || d < 120 && h.oneMinuteAgo || d < 3600 && Math.floor(d / 60) + h.minutesAgo || d < 7200 && h.oneHourAgo || d < 86400 && Math.floor(d / 3600) + h.hoursAgo) || f === 0 && (e === 1 && h.yesterday || e < 7 && e + h.daysAgo || e < 14 && h.oneWeekAgo || e < 31 && Math.ceil(e / 7) + h.weeksAgo) || f === 1 && h.oneMonthAgo || f < 12 && f + h.monthsAgo || f === 12 && h.oneYearAgo || Math.floor(f / 12) + h.yearsAgo
    }
    function d(a, d) {
        return a = b.helpers.fix_twitter_date(a), c(a, d)
    }
    return a.registerHelper("prettyDate", d), d
}), define("hbs!content-stream/templates/status-twitter.html", ["hbs", "vendor/handlebars", "/templates/helpers/autoLink.akll2jtdu76jcraxy3h59b1cm.js", "/templates/helpers/prettyDate.a1w2o2iqhfhv4dqdm72mmwm81.js"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function q(a, b) {
            var c = "",
                d;
            return c += " massrel-status-type-", d = a, typeof d === m ? d = d.call(a, {
                hash: {}
            }) : d === o && (d = n.call(a, "this", {
                hash: {}
            })), c += p(d), c
        }
        function r(a, b) {
            return '\n  <div class="massrel-status-type-marker"></div>\n  '
        }
        function s(a, b) {
            var d = "",
                e;
            return d += '\n    <a href="https://twitter.com/intent/user?screen_name=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.screen_name", {
                hash: {}
            })), d += p(e) + '" class="massrel-avatar">\n      <img src="', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.profile_image_url_https, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.profile_image_url_https", {
                hash: {}
            })), d += p(e) + '" alt="" />\n    </a>\n  ', d
        }
        function t(a, b) {
            var d = "",
                e;
            return d += '\n        <a href="https://twitter.com/intent/user?screen_name=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.screen_name", {
                hash: {}
            })), d += p(e) + '" class="massrel-primary-name">', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.name", {
                hash: {}
            })), d += p(e) + '</a>\n        <span class="massrel-secondary-name">@', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.screen_name", {
                hash: {}
            })), d += p(e) + "</span>\n      ", d
        }
        function u(a, b) {
            var d = "",
                e;
            return d += '\n        <a href="https://twitter.com/intent/user?screen_name=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.screen_name", {
                hash: {}
            })), d += p(e) + '" class="massrel-primary-name">', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.screen_name", {
                hash: {}
            })), d += p(e) + '</a>\n        <span class="massrel-secondary-name">', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.user, e = e === null || e === undefined || e === !1 ? e : e.name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.user.name", {
                hash: {}
            })), d += p(e) + "</span>\n      ", d
        }
        function v(a, b) {
            var d = "",
                e;
            return d += '\n        <span class="massrel-retweeted-by">by <a href="https://twitter.com/intent/user?screen_name=', j = c.retweeted_by_user, e = j || a.retweeted_by_user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "retweeted_by_user.screen_name", {
                hash: {}
            })), d += p(e) + '" class="massrel-retweeted-by-user">', j = c.retweeted_by_user, e = j || a.retweeted_by_user, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "retweeted_by_user.screen_name", {
                hash: {}
            })), d += p(e) + "</a></span>\n      ", d
        }
        function w(a, b) {
            var d = "",
                e;
            return d += '\n        <div class="massrel-intents ', j = c.intents_show, e = j || a.intents_show, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "intents_show", {
                hash: {}
            })), d += p(e) + " ", j = c.intents_position, e = j || a.intents_position, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "intents_position", {
                hash: {}
            })), d += p(e) + '">\n           <a href="https://twitter.com/intent/tweet?in_reply_to=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.id_str, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.id_str", {
                hash: {}
            })), d += p(e) + '" class="massrel-intent massrel-intent-reply">Reply</a>\n           <a href="https://twitter.com/intent/retweet?tweet_id=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.id_str, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.id_str", {
                hash: {}
            })), d += p(e) + '" class="massrel-intent massrel-intent-retweet">Retweet</a>\n           <a href="https://twitter.com/intent/favorite?tweet_id=', j = c.status, e = j || a.status, e = e === null || e === undefined || e === !1 ? e : e.id_str, typeof e === m ? e = e.call(a, {
                hash: {}
            }) : e === o && (e = n.call(a, "status.id_str", {
                hash: {}
            })), d += p(e) + '" class="massrel-intent massrel-intent-favorite">Favorite</a>\n        </div>\n      ', d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k, l = this,
            m = "function",
            n = c.helperMissing,
            o = void 0,
            p = this.escapeExpression;
        f += '<div class="massrel-status massrel-status-twitter\n    ', j = c.types, g = j || b.types, h = c.each, k = l.program(1, q, e), k.hash = {}, k.fn = k, k.inverse = l.noop, g = h.call(b, g, k);
        if (g || g === 0) f += g;
        f += '" data-massrel-network="twt" data-massrel-id="', j = c.status, g = j || b.status, g = g === null || g === undefined || g === !1 ? g : g.id_str, typeof g === m ? g = g.call(b, {
            hash: {}
        }) : g === o && (g = n.call(b, "status.id_str", {
            hash: {}
        })), f += p(g) + '">\n  ', j = c.type_markers, g = j || b.type_markers, h = c["if"], k = l.program(3, r, e), k.hash = {}, k.fn = k, k.inverse = l.noop, g = h.call(b, g, k);
        if (g || g === 0) f += g;
        f += "\n  ", j = c.avatars, g = j || b.avatars, h = c["if"], k = l.program(5, s, e), k.hash = {}, k.fn = k, k.inverse = l.noop, g = h.call(b, g, k);
        if (g || g === 0) f += g;
        f += '\n  <div class="massrel-content">\n    <p class="massrel-author">\n      ', j = c.real_name_first, g = j || b.real_name_first, h = c["if"], k = l.program(7, t, e), k.hash = {}, k.fn = k, k.inverse = l.program(9, u, e), g = h.call(b, g, k);
        if (g || g === 0) f += g;
        f += "\n      ", j = c.retweet, g = j || b.retweet, h = c["if"], k = l.program(11, v, e), k.hash = {}, k.fn = k, k.inverse = l.noop, g = h.call(b, g, k);
        if (g || g === 0) f += g;
        f += '\n    </p>\n    <div class="massrel-text">', j = c.status, g = j || b.status, g = g === null || g === undefined || g === !1 ? g : g.text, j = c.autoLink, h = j || b.autoLink, typeof h === m ? g = h.call(b, g, {
            hash: {}
        }) : h === o ? g = n.call(b, "autoLink", g, {
            hash: {}
        }) : g = h;
        if (g || g === 0) f += g;
        f += '</div>\n    <div class="massrel-meta">\n      <div class="massrel-permalink">\n        <a href="https://twitter.com/', j = c.status, g = j || b.status, g = g === null || g === undefined || g === !1 ? g : g.user, g = g === null || g === undefined || g === !1 ? g : g.screen_name, typeof g === m ? g = g.call(b, {
            hash: {}
        }) : g === o && (g = n.call(b, "status.user.screen_name", {
            hash: {}
        })), f += p(g) + "/status/", j = c.status, g = j || b.status, g = g === null || g === undefined || g === !1 ? g : g.id_str, typeof g === m ? g = g.call(b, {
            hash: {}
        }) : g === o && (g = n.call(b, "status.id_str", {
            hash: {}
        })), f += p(g) + '" data-date="', j = c.status, g = j || b.status, g = g === null || g === undefined || g === !1 ? g : g.created_at, typeof g === m ? g = g.call(b, {
            hash: {}
        }) : g === o && (g = n.call(b, "status.created_at", {
            hash: {}
        })), f += p(g) + '" class="massrel-created-at massrel-relative-date">', j = c.date_format, g = j || b.date_format, j = c.status, h = j || b.status, h = h === null || h === undefined || h === !1 ? h : h.created_at, j = c.prettyDate, i = j || b.prettyDate, typeof i === m ? g = i.call(b, h, g, {
            hash: {}
        }) : i === o ? g = n.call(b, "prettyDate", h, g, {
            hash: {}
        }) : g = i, f += p(g) + "</a>\n      </div>\n      ", j = c.intents, g = j || b.intents, h = c["if"], k = l.program(13, w, e), k.hash = {}, k.fn = k, k.inverse = l.noop, g = h.call(b, g, k);
        if (g || g === 0) f += g;
        return f += "\n    </div>\n  </div>\n</div>\n", f
    });
    return b.registerPartial("content-stream_templates_status-twitter.html", c), c
}), define("hbs!content-stream/templates/stream.html", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function p(a, b) {
            var d = "",
                e;
            return d += '\n  <div class="stream-subheader">', i = c.subheader, e = i || a.subheader, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "subheader", {
                hash: {}
            })), d += o(e) + "</div>\n  ", d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k = this,
            l = "function",
            m = c.helperMissing,
            n = void 0,
            o = this.escapeExpression;
        f += '<div class="content-stream">\n  ', i = c.subheader, g = i || b.subheader, h = c["if"], j = k.program(1, p, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        return f += '\n  <div class="stream-body"></div>\n</div>\n', f
    });
    return b.registerPartial("content-stream_templates_stream.html", c), c
}), define("content-stream/uilist", ["vendor/jquery", "vendor/massrel"], function (a, b) {
    function c(d, e) {
        this.elList = a(d), this.existing = [], e = b.helpers.extend(e || {}, {
            limit: 10,
            renderer: c.defaultRenderer,
            beforeInsert: c.noop,
            afterInsert: c.noop,
            beforeRemove: c.noop,
            afterRemove: c.noop
        }), b.helpers.extend(this, e)
    }
    return c.prototype.insert_ = function (b, c) {
        var d = this.renderer(c) || "",
            e = a("<div />").html(d).children();
        while (this.existing.length >= this.limit) this.remove(this.existing.shift());
        return this.beforeInsert(e), this.elList[b](e), this.afterInsert(e), this.existing.push(e), this
    }, c.prototype.append = function (a) {
        return this.insert_("append", a)
    }, c.prototype.prepend = function (a) {
        return this.insert_("prepend", a)
    }, c.prototype.remove = function (a) {
        this.beforeRemove(a), a.remove(), this.afterRemove(a)
    }, c.prototype.itemRenderer = function (a) {
        return typeof a == "function" && (this.renderer = a), this
    }, c.defaultRenderer = function (a) {
        return a.toString()
    }, c.noop = function () {}, c
}), define("content-stream/main", ["vendor/jquery", "vendor/massrel", "hbs!./templates/status-facebook.html", "hbs!./templates/status-twitter.html", "hbs!./templates/stream.html", "./uilist", "vendor/twitter-text"], function (a, b, c, d, e, f) {
    function g(b, c) {

        var http_url = 'http://embedly.massrelevance.com/1/preview';
        var https_url = 'https://d1gbi9ec0ujnws.cloudfront.net/1/preview';

        var d = window.location.protocol === "https:" ? https_url : http_url,
            e = "fd577f7497bf11e0b95d4040d3dc5c07",
            f = window.location.protocol === "https:",
            g = "500";
        b = a.isArray(b) ? b.join() : b, a.ajax({
            url: d,
            data: {
                key: e,
                secure: f,
                urls: b,
                maxwidth: g
            },
            dataType: a.support.cors ? "json" : "jsonp",
            success: function (a) {
                a && typeof c == "function" && c(a)
            },
            cache: true
        })
    }
    function h(b) {
        this.beforeInsertCbs = [], this.afterInsertCbs = [], this.animate_initial_statuses = !0, this.avatar_resolution = "small", a.extend(this, b)
    }
    return h.prototype.renderStatus = function (a) {
        if (a.source.twitter) return d(a);
        if (a.source.facebook) return c(a);
        throw new Error("unknown render context: " + a.source)
    }, h.prototype.embedMedia = function (b) {
        var c = this;
        if (!c.embed_media) return;
        b.find(".massrel-text a").each(function () {
            if (!a(this).hasClass("tweet-url")) var c = a(this).attr("href"),
                d = g([c], function (a) {
                    if (a[0].images && a[0].images.length > 0) {
                        var c = a[0].images[0].url;
                        b.find(".massrel-text").append('<br /><img class="tweeted-image" src="' + c + '" />')
                    }
                })
        })
    }, h.prototype.setContainerClasses = function () {
        var a = this.$container.find(".content-stream");
        this.avatars && a.addClass("avatars"), this.type_markers && a.addClass("type-markers"), this.highlight_rows && a.addClass("highlight-rows")
    }, h.prototype.applyStatusSettings = function (a) {
        var b = this;
        a.types = [], a.avatars = b.avatars, a.intents = !! b.intents, a.intents && (a.intents_show = b.intents.show, a.intents_position = b.intents.position), a.date_format = b.date_format, a.real_name_first = b.name_order === "real_user", a.type_markers = b.type_markers
    }, h.prototype.inside = function (a) {
        return this.$container = a, this
    }, h.prototype.beforeInsert = function (a) {
        return this.beforeInsertCbs.push(a), this
    }, h.prototype.afterInsert = function (a) {
        return this.afterInsertCbs.push(a), this
    }, h.prototype.updateResolution = function (a) {
        var b = this;
        if (typeof b.avatar_resolution == "undefined") return b;
        if (a.source.twitter) {
            var c = {
                small: "_normal",
                medium: "_bigger",
                large: "_reasonably_small",
                huge: ""
            }, d = a.status.user.profile_image_url;
            a.status.user.profile_image_url = d.replace("_normal", c[b.avatar_resolution])
        } else if (a.source.facebook) {
            var e = {
                small: "square",
                medium: "small",
                large: "normal",
                huge: "large"
            };
            a.status.massrel_imgType = e[b.avatar_resolution]
        }
        return b
    }, h.prototype.start = function (a) {
        var c, d, g = this,
            h = !0,
            i;
        g.$container.prepend(e(g)), g.setContainerClasses(), d = new b.Stream(a || g.stream_name), c = new f(g.$container.find(".stream-body"), {
            limit: g.limit,
            renderer: g.renderStatus,
            beforeInsert: function (a) {
                for (var b = 0; b < g.beforeInsertCbs.length; b++) g.beforeInsertCbs[b](a)
            },
            afterInsert: function (a) {
                for (var b = 0; b < g.afterInsertCbs.length; b++) g.afterInsertCbs[b](a)
            }
        }), g.beforeInsert(function (a) {
            h && a.css({
                display: "none",
                opacity: 0
            })
        }), g.afterInsert(function (a) {
            h ? a.slideDown().animate({
                opacity: 1
            }) : a.show(), g.embedMedia(a)
        }), g.animate_initial_statuses || c.elList.hide(), d.poller({
            frequency: g.frequency,
            limit: g.limit,
            replies: g.reply_parents ? 1 : 0
        }).queue(function (a, d) {
            var e = b.Context.create(a);
            g.updateResolution(e), i === undefined && (i = this.total), this.count < i && !g.animate_initial_statuses && (h = !1), e.known && (g.applyStatusSettings(e), a.in_reply_to && e.types.push("reply"), c.prepend(e), a.in_reply_to && (e = b.Context.create(a.in_reply_to), e.known && (g.applyStatusSettings(e), e.types.push("reply-parent"), c.prepend(e)))), this.count >= i && (h = !0, g.animate_initial_statuses || c.elList.show()), this.count < i && !g.animate_initial_statuses ? d() : setInterval(d, g.step_interval * 1e3)
        }).start()
    }, h
}), define("content-stream", ["content-stream/main"], function (a) {
    return a
}), define("hbs!button-bar/templates/button-bar.html", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function p(a, b) {
            var d = "",
                e;
            return d += '\n<a href="', i = c.tweet, e = i || a.tweet, e = e === null || e === undefined || e === !1 ? e : e.url, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "tweet.url", {
                hash: {}
            })), d += o(e) + '" \n  class="button twitter-button twitter-tweet-button">\n  <span class="bird"></span>\n  ', i = c.tweet, e = i || a.tweet, e = e === null || e === undefined || e === !1 ? e : e.button_text, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "tweet.button_text", {
                hash: {}
            })), d += o(e) + "\n</a>\n", d
        }
        function q(a, b) {
            var d = "",
                e;
            return d += '\n<a href="https://twitter.com/intent/user?screen_name=', i = c.follow, e = i || a.follow, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "follow.screen_name", {
                hash: {}
            })), d += o(e) + '"\n  class="button twitter-button twitter-follow-button">\n  <span class="bird"></span>\n  Follow @', i = c.follow, e = i || a.follow, e = e === null || e === undefined || e === !1 ? e : e.screen_name, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "follow.screen_name", {
                hash: {}
            })), d += o(e) + "\n</a>\n", d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k = this,
            l = "function",
            m = c.helperMissing,
            n = void 0,
            o = this.escapeExpression;
        i = c.tweet, g = i || b.tweet, h = c["if"], j = k.program(1, p, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += "\n\n", i = c.follow, g = i || b.follow, h = c["if"], j = k.program(3, q, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        return f += "\n", f
    });
    return b.registerPartial("button-bar_templates_button-bar.html", c), c
}), define("button-bar/main", ["hbs!./templates/button-bar.html"], function (a) {
    var b = function (c) {
        var d;
        if (!c) return;
        return c.tweet.url = b.toTweetURL(c.tweet), c.follow && c.follow.screen_name && c.follow.screen_name.length > 1 && c.follow.screen_name[0] == "@" && (c.follow.screen_name = c.follow.screen_name.substring(1)), c.tweet && !c.tweet.button_text && delete c.tweet, c.follow && !c.follow.screen_name && delete c.follow, a(c)
    };
    return b.toTweetURL = function (a) {
        var b = "https://twitter.com/intent/tweet?";
        for (var c in a) {
            var d = a[c];
            c == "hashtags" && d && d[0] == "#" && (d = d.substring(1)), d && (b += c + "=" + escape(d) + "&")
        }
        return b
    }, b
}), define("button-bar", ["button-bar/main"], function (a) {
    return a
}), define("hbs!background/templates/background.css", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        c = c || a.helpers;
        var f = "",
            g, h, i = this,
            j = "function",
            k = c.helperMissing,
            l = void 0;
        f += "/* vim: set ft=css: */\nhtml {\n  background: url('", h = c.image, g = h || b.image, typeof g === j ? g = g.call(b, {
            hash: {}
        }) : g === l && (g = k.call(b, "image", {
            hash: {}
        }));
        if (g || g === 0) f += g;
        return f += "') fixed;\n}\n\nhtml.center {\n  background-repeat: no-repeat;\n  background-position: center;\n}\n", f
    });
    return b.registerPartial("background_templates_background.css", c), c
}), define("hbs!background/templates/img.html", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        c = c || a.helpers;
        var f = "",
            g, h, i = this,
            j = "function",
            k = c.helperMissing,
            l = void 0,
            m = this.escapeExpression;
        return f += '<img id="user-background-image" src="', h = c.image, g = h || b.image, typeof g === j ? g = g.call(b, {
            hash: {}
        }) : g === l && (g = k.call(b, "image", {
            hash: {}
        })), f += m(g) + '">\n', f
    });
    return b.registerPartial("background_templates_img.html", c), c
}), define("background/main", ["vendor/jquery", "hbs!./templates/background.css", "hbs!./templates/img.html"], function (a, b, c) {
    function h() {
        f = {
            width: g.width(),
            height: g.height(),
            aspect: g.width() / g.height()
        }, f.aspect < e.aspect ? d.css({
            width: "auto",
            height: "100%",
            top: "0",
            left: (f.width - f.height * e.aspect) / 2 + "px"
        }) : d.css({
            width: "100%",
            height: "auto",
            top: (f.height - f.width / e.aspect) / 2 + "px",
            left: 0
        })
    }
    var d, e, f, g = a(window);
    return function (f) {
        if (!f || !f.image) {
            a("html").addClass("no-user-background");
            return
        }
        f.position === "stretch" ? (a("html").append(c(f)), d = a("#user-background-image"), d.hide().load(function () {
            e = {
                width: d.width(),
                height: d.height(),
                aspect: d.width() / d.height()
            }, d.css({
                position: "fixed",
                "z-index": "-100"
            }), g.resize(h).trigger("resize"), d.show()
        })) : (a("head").append("<style>" + b(f) + "</style>"), a("html").addClass(f.position).addClass("user-background"))
    }
}), define("background", ["background/main"], function (a) {
    return a
}), define("hbs!header/templates/header.html", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function p(a, b) {
            var d = "",
                e;
            return d += '\n		<img id="logo" src="', i = c.logo, e = i || a.logo, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "logo", {
                hash: {}
            })), d += o(e) + '">\n		', d
        }
        function q(a, b) {
            var d = "",
                e;
            return d += '\n	  <h1 id="title">', i = c.title, e = i || a.title, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "title", {
                hash: {}
            })), d += o(e) + "</h1>\n		", d
        }
        function r(a, b) {
            var d = "",
                e;
            return d += '\n	  <h2 id="subtitle">', i = c.subtitle, e = i || a.subtitle, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "subtitle", {
                hash: {}
            })), d += o(e) + "</h2>\n		", d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k = this,
            l = "function",
            m = c.helperMissing,
            n = void 0,
            o = this.escapeExpression;
        f += '<header class="package package-header">\n	<div class="bar">\n		', i = c.logo, g = i || b.logo, h = c["if"], j = k.program(1, p, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += "\n	\n		", i = c.title, g = i || b.title, h = c["if"], j = k.program(3, q, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += "\n	\n		", i = c.subtitle, g = i || b.subtitle, h = c["if"], j = k.program(5, r, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        return f += "\n	</div>\n</header>\n", f
    });
    return b.registerPartial("header_templates_header.html", c), c
}), define("header/main", ["hbs!./templates/header.html"], function (a) {
    return function (b) {
        if (!b) return;
        return a(b)
    }
}), define("header", ["header/main"], function (a) {
    return a
}), define("hbs!footer/templates/footer.html", ["hbs", "vendor/handlebars"], function (a, b) {
    var c = b.template(function (a, b, c, d, e) {
        function p(a, b) {
            var d = "",
                e;
            return d += '\n        <span class="sponsor-text">', i = c.text, e = i || a.text, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "text", {
                hash: {}
            })), d += o(e) + "</span>\n        ", d
        }
        function q(a, b) {
            var d = "",
                e, f;
            d += "\n          ", i = c.url, e = i || a.url, f = c["if"], j = k.program(4, r, b), j.hash = {}, j.fn = j, j.inverse = k.program(6, s, b), e = f.call(a, e, j);
            if (e || e === 0) d += e;
            return d += "\n        ", d
        }
        function r(a, b) {
            var d = "",
                e;
            d += '\n          <a href="', i = c.url, e = i || a.url, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "url", {
                hash: {}
            }));
            if (e || e === 0) d += e;
            return d += '"><span class="sponsor-name">', i = c.name, e = i || a.name, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "name", {
                hash: {}
            })), d += o(e) + "</span></a>\n          ", d
        }
        function s(a, b) {
            var d = "",
                e;
            return d += '\n          <span class="sponsor-name">', i = c.name, e = i || a.name, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "name", {
                hash: {}
            })), d += o(e) + "</span>\n          ", d
        }
        function t(a, b) {
            var d = "",
                e, f;
            d += "\n        ", i = c.url, e = i || a.url, f = c["if"], j = k.program(9, u, b), j.hash = {}, j.fn = j, j.inverse = k.program(11, v, b), e = f.call(a, e, j);
            if (e || e === 0) d += e;
            return d += "\n      ", d
        }
        function u(a, b) {
            var d = "",
                e;
            d += '\n        <a href="', i = c.url, e = i || a.url, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "url", {
                hash: {}
            }));
            if (e || e === 0) d += e;
            return d += '"><img class="sponsor-image" src="', i = c.image, e = i || a.image, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "image", {
                hash: {}
            })), d += o(e) + '"></a>\n        ', d
        }
        function v(a, b) {
            var d = "",
                e;
            return d += '\n        <img class="sponsor-image" src="', i = c.image, e = i || a.image, typeof e === l ? e = e.call(a, {
                hash: {}
            }) : e === n && (e = m.call(a, "image", {
                hash: {}
            })), d += o(e) + '">\n        ', d
        }
        c = c || a.helpers;
        var f = "",
            g, h, i, j, k = this,
            l = "function",
            m = c.helperMissing,
            n = void 0,
            o = this.escapeExpression;
        f += '<footer class="package package-footer">\n	<div class="bar">\n		<div id="logo-mr"><span>powered by Mass Relevance</span></div>\n    <div id="sponsor">\n      <span class="sponsor-prefix">\n        ', i = c.text, g = i || b.text, h = c["if"], j = k.program(1, p, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += "\n        ", i = c.name, g = i || b.name, h = c["if"], j = k.program(3, q, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        f += "\n      </span>\n      ", i = c.image, g = i || b.image, h = c["if"], j = k.program(8, t, e), j.hash = {}, j.fn = j, j.inverse = k.noop, g = h.call(b, g, j);
        if (g || g === 0) f += g;
        return f += "\n    </div>\n	</div>\n</footer>\n", f
    });
    return b.registerPartial("footer_templates_footer.html", c), c
}), define("footer/main", ["hbs!./templates/footer.html"], function (a) {
    return function (b) {
        if (!b) return;
        return a(b)
    }
}), define("footer", ["footer/main"], function (a) {
    return a
}), define("analytics/main", ["require", "vendor/twitter-widgets"], function (a) {
    function c(a) {
        var c;
        for (var d = 0; d < b; d++) c = a.slice(0), c[0] = d + "." + c[0], _gaq.push(c)
    }
    function d(a) {
        if (!a) return;
        var c = "" + b;
        _gaq.push([c + "._setAccount", a]), b++
    }
    function e() {
        d("UA-8779735-6")
    }
    function f() {
        var a = [].slice.call(arguments);
        a.unshift("_trackPageview"), c(a)
    }
    function g() {
        var a = [].slice.call(arguments);
        a.unshift("_trackEvent"), c(a)
    }
    var b = 0;
    return window._gaq = window._gaq || [], a(["vendor/google-analytics"]), window.twttr && twttr.ready(function () {
        var a = function (a) {
            if (a) {
                var b = a.region;
                c(["_trackEvent", "twitterintent", a.type, b])
            }
        }, b = function (a) {
            if (a) {
                var b = "tweet";
                c(["_trackEvent", "twitterintent", a.type, b])
            }
        }, d = function (a) {
            b(a)
        }, e = function (a) {
            if (a) {
                var b = a.data.source_tweet_id;
                c(["_trackEvent", "twitterintent", a.type, b])
            }
        }, f = function (a) {
            if (a) {
                var b = a.data.user_id + " (" + a.data.screen_name + ")";
                c(["_trackEvent", "twitterintent", a.type, b])
            }
        };
        twttr.events.bind("click", a), twttr.events.bind("tweet", b), twttr.events.bind("retweet", e), twttr.events.bind("favorite", d), twttr.events.bind("follow", f)
    }), {
        addAccount: d,
        addProductsAccount: e,
        trackPageView: f,
        trackEvent: g
    }
}), define("analytics", ["analytics/main"], function (a) {
    return a
}), define("vendor/product", ["vendor/jquery", "vendor/massrel"], function (a, b) {
    function e(a) {
        var b, d;
        if (a) this.slug = a;
        else {
            b = c.parse_params();
            if (!b.config) throw new Error("no config slug provided");
            this.slug = b.config
        }
        if (/^#config!/.test(location.hash) && window.JSON) {
            d = location.hash.replace(/^#config!/, "");
            try {
                this.setConfig(JSON.parse(d)), this.slug = this._config.full_name
            } catch (e) {}
        }
    }
    var c = b.helpers,
        d = /^css!/;
    e.prototype.url = function () {
        return c.api_url("/v/" + this.slug + ".json")
    }, e.prototype.config = function (a, b) {
        this._config ? a.call(this, this._config) : this._load(a, b)
    }, e.prototype.setConfig = function (a) {
        this._config = a;
        var b, d, f;
        typeof a.css == "string" ? b = [a.css] : c.is_array(a.css) && (b = a.css);
        if (b) for (d = 0, f = b.length; d < f; d++) e.useCSS(b[d]);
        a.theme && e.setTheme(a.theme)
    }, e.prototype._load = function (a, b) {
        var d = [],
            e = this;
        c.jsonp_factory(this.url(), d, "_", this, function (b) {
            e.setConfig(b), a.call(e, b)
        }, b)
    }, e.setTheme = function (b) {
        a("html").addClass(b)
    }, e.useCSS = function (a) {
        var b;
        d.test(a) ? (b = a.replace(d, ""), e.loadCSS(b)) : e.injectCSS(a)
    }, e.loadCSS = function (a) {
        var b = document.createElement("link");
        b.type = "text/css", b.rel = "stylesheet", b.href = a, document.getElementsByTagName("head")[0].appendChild(b)
    }, e.injectCSS = function (a) {
        var b = document.createElement("style");
        b.type = "text/css", document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet ? b.styleSheet.cssText = a : b.innerHTML = a
    }, b.Product = e
}), define("main", ["vendor/jquery", "vendor/massrel", "content-stream", "button-bar", "background", "header", "footer", "analytics", "vendor/product"], function (a, b, c, d, e, f, g, h) {
    function i(b) {
        this.$container = a(".container"), this.$navigation = a(".navigation"), this.$socialTop = a(".social-top"), this.$socialBottom = a(".social-bottom");
        var c = {
            header: {
                title: "Mass Streams",
                subtitle: "",
                logo: "http://massrelevance.staging.wpengine.com/wp-content/uploads/2012/03/mr.com_logo5.png"
            },
            footer: {
                name: "",
                text: "",
                image: ""
            },
            theme: "dark",
            tabs: "left",
            limit: 5,
            frequency: 15,
            step_interval: 2,
            avatars: !0,
            panels: {
                stream_name: "bdainton/woot",
                title: "Woot"
            },
            intents: {
                show: "hover",
                position: "left"
            },
            date_format: "basic",
            name_order: "user_real",
            embed_media: !0,
            avatar_resolution: "small"
        };
        this.config = a.extend(c, b), this.config.theme === "" && (this.config.theme = "dark")
    }
    i.prototype.setStream = function (b, d) {
        var e = new c(a.extend({}, this.config, d));
        e.inside(b).start()
    }, i.prototype.setPanels = function () {
        var b, c = '<li><a href="javascript:void(0);"></a></li>',
            d = '<div class="panel"></div>';
        this.config.stream_name && (this.config.panels = {
            stream_name: this.config.stream_name
        }), a.isArray(this.config.panels) || (this.config.panels = [this.config.panels]);
        for (b = 0; b < this.config.panels.length; b++) {
            var e = this.config.panels[b];
            e.title = e.title || "Stream " + (b + 1), a(c).appendTo(this.$navigation).children().text(e.title), this.setStream(a(d).appendTo(".panels"), e)
        }
        this.config.panels.length === 1 && a(this.$navigation).remove(), a(".panels").css("top", a(".header").height()), a(window).resize(function () {
            a(".stream").css("top", a(".header").height())
        }), a("#logo").load(function () {
            a(".panels").css("top", a(".header").height())
        }), a(".panels").css("bottom", a(".footer").height())
    }, i.prototype.setNavigation = function () {
        a(".panel:first").show(), this.config.panels.length > 1 && (this.$navigation.css("float", this.config.tabs), this.$navigation.find("li:first").addClass("selected"), this.$navigation.find("li:last").addClass("last"), this.$navigation.find("a").click(function () {
            return a(this).parent().addClass("selected").siblings().removeClass("selected"), a(".panel").hide().eq(a(this).parent().index()).show(), !1
        }))
    }, i.prototype.setTheme = function () {
        a("body").addClass(this.config.theme)
    }, i.prototype.setHeader = function () {
        this.config.header ? a(".header").prepend(f(this.config.header)) : this.config.panels.length <= 1 && a(".nav-wrapper").remove()
    }, i.prototype.setFooter = function () {
        this.config.footer && a(".footer").append(g(this.config.footer))
    }, i.prototype.setButtonBars = function () {
        if (this.config.button_bar_top) {
            var b = a(".social-top");
            b.append(d(this.config.button_bar_top)).show()
        }
        if (this.config.button_bar_bottom) {
            var c = a(".social-bottom");
            c.append(d(this.config.button_bar_bottom)).show()
        }
    }, i.prototype.app = function () {
        e(this.config.background), this.setButtonBars(), this.setHeader(), this.setTheme(), this.setFooter(), this.setPanels(), this.setNavigation()
    }, (new b.Product).config(function (b) {
        h.addProductsAccount(), h.addAccount(b.ga_client_account), h.trackPageView();
        var c = new i(b);
        a(document).ready(function () {
            c.app()
        })
    })
});
