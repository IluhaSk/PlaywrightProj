typeof SiebelApp.S_App == "undefined" && (SiebelJS.Namespace("SiebelApp.S_App"), SiebelApp.S_App = function () {
    function ht() {
        F = new SiebelApp.PopupPModel({
                GetName: function () {
                    return "PopupPxy"
                }
            }),
        F.Init()
    }
    function pt(e, t) {
        q[e] = t
    }
    function dt() {
        var e,
        n;
        for (var r in b)
            b.hasOwnProperty(r) && b[r].indexOf("Search") != -1 && (e = CCFMiscUtil_CreatePropSet(), e.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_GET_APPLET")), e.SetProperty(t.get("SWE_APPLET_STR"), b[r]), SiebelApp.S_App.CallServer(e, n, !0, {
                    async: !0
                }))
    }
    function vt(e) {
        var t = e.GetProperty("SAFL");
        CCFMiscUtil_StringToArray(t, b)
    }
    function mt(r) {
        ct.prototype.GetAppPropertySet = function () {
            return r.Clone()
        };
        var i = r.GetChild(0);
        if (i.GetType() !== n)
            throw new Error("Wrong propSet type in Application Context");
        this.SetSelfProps(i);
        var s = SiebelApp.Environment;
        s !== undefined && Xt.call(this, i);
        var o = i.GetChildCount(),
        u = t.get("SWE_PST_LOADURL"),
        a = t.get("SWE_PST_STR_CACHE"),
        f = t.get("SWE_PST_NEW_NAV_CTRL_MGR"),
        l = t.get("SWE_PST_NAV_CTRL_INFO"),
        c = t.get("SWE_PST_SERVICE_SHADOWS"),
        h = t.get("SWE_PST_AUTOM_INFO"),
        p = t.get("SWE_PST_ACCESSIBILITY_INFO"),
        d = t.get("SWE_PST_NEW_TIMER"),
        v = t.get("SWE_PST_NEW_LOCALE"),
        m = t.get("SWE_PST_STYLESHEET"),
        g = t.get("SWE_UIDEF_THEME_INFO"),
        y = t.get("SWE_UIDEF_PAGE_TRANSITION_INFO"),
        b = t.get("SWE_PST_MSG"),
        w = t.get("SWE_PST_ROW_CNT_TMPL"),
        E = t.get("SWE_PST_PORTLET_APP"),
        S = t.get("SWE_PROP_VALUE"),
        T = t.get("SWE_PROP_NAME"),
        N = t.get("SWE_RPC_PROP_COMMAND_MGR"),
        C = t.get("SWE_PST_NEW_BUSCOMP"),
        k = t.get("SWE_PST_NEW_APPLET"),
        A = t.get("SWE_PST_NEW_LIST_APPLET"),
        O = t.get("SWE_PST_NEW_TREEAPPLET"),
        M = SiebelApp.S_App.BusComp,
        _ = r.GetProperty(t.get("SWE_RPC_PROP_STATUS")),
        D = t.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT"),
        P = t.get("SWE_PST_CNTRL_LIST"),
        H = t.get("SWE_PST_ICON_LIST"),
        B = t.get("SA_APPLET_DIC");
        for (var j = 0; j < o; j++) {
            var F = i.GetChild(j),
            I = F.GetType(),
            q = e.Curry(ct.prototype.DefineAccessor, SiebelApp.Environment.constructor
                    .prototype, F);
            switch (I) {
            case B:
                vt.call(this, F);
                break;
            case u:
                q("GetClientFrameName", "SWE_PROP_NAME"),
                q("GetClientURL", "SWE_PROP_VALUE"),
                SiebelApp.Environment.constructor.prototype.GetClientFrame = function () {
                    return $('[name="' + SiebelApp.Environment.GetClientFrameName() + '"]')[0]
                };
                break;
            case m:
                q("GetStyleSheetName", "SWE_PROP_VALUE");
                break;
            case a:
                var R = F.GetProperty(S);
                R && this.AppendToStrCache(R);
                break;
            case f:
                var U = F.GetChildCount();
                U > 0 && (x.Initialize(F), x.ProcessObjectInfo(F.GetChildByType(l)));
                break;
            case y:
                var R = F.GetProperty(S);
                R && SiebelApp.LayoutTransitionsMgr.setTransition(R);
                break;
            case p:
                q("GetScreenNavTitle", "SWE_PROP_SCREEN_NAV_TITLE"),
                q("GetDetailCategoryTitle", "SWE_PROP_DETAIL_CATEGORY_TITLE");
                break;
            case h:
                F.PropertyExists(t.get("SWE_PROP_AUTOM_OT")) && q("GetObjectType", "SWE_PROP_AUTOM_OT"),
                F.PropertyExists(t.get("SWE_PROP_AUTOM_RN")) && q("GetRepstrName", "SWE_PROP_AUTOM_RN"),
                F.PropertyExists(t.get("SWE_PROP_AUTOM_UN")) && q("GetUIName", "SWE_PROP_AUTOM_UN");
                break;
            case c:
                var z = F.EnumProperties(!0);
                do
                    L[z] = F.GetProperty(z);
                while (z = F.EnumProperties(!1));
                break;
            case d:
                gt.call(this, F);
                break;
            case v:
                var W = F.GetChildCount();
                W > 0 && SiebelApp.S_App.LocaleObject.InitLocale(F.GetChild(0));
                break;
            case b:
                var X = F.GetProperty(T),
                R = F.GetProperty(S);
                X && R && qt.call(this, X, R);
                break;
            case E:
                var V = new SiebelApp.S_App.PortletSessionMgr;
                V.ProcessPortletInfo(F);
                break;
            case w:
                var J = F.GetProperty(T),
                K = F.GetProperty(S);
                J && K && pt.call(this, J, K);
                break;
            case N:
                SiebelApp.S_App.IsRwd() && this.GetCmdMgr().ProcessRWDNotifications(F);
                break;
            case C:
                SiebelApp.S_App.IsRwd() && (buscomp = new M, buscomp.ProcessObjectInfo(F.GetChild(0)));
                break;
            case k:
            case A:
            case O:
                if (SiebelApp.S_App.IsRwd()) {
                    var Q = e.PrepareModuleInfo(F);
                    (function () {
                        var e = F,
                        t = buscomp;
                        if (_ === D) {
                            var n = new $.Deferred;
                            deferreds.push(n.promise())
                        }
                        require(Q, function () {
                            try {
                                _ !== D ? Ut.call(SiebelApp.S_App, e, t) : (Rt.call(SiebelApp.S_App, e, t), n.resolveWith(SiebelApp.S_App, ["SA Applet Object Info"]))
                            } catch (r) {
                                SiebelJS.Log(r)
                            }
                            e = null
                        })
                    })()
                }
                break;
            case H:
                SiebelApp.S_App.IsRwd() && zt.call(this, F);
                break;
            case P:
                SiebelApp.S_App.IsRwd() && (nt = F);
                break;
            default:
                SiebelJS.Debug("[SetProtoAPIs] : Missing handler for type [" + I + "]")
            }
        }
        s !== undefined && yt(),
        i = null
    }
    function gt(e) {
        var t = new SiebelApp.S_App.SweTimer;
        SiebelApp.S_App.SetTimer(t),
        SiebelApp.S_App.GetTimer().CreateTimerHookMap(e),
        SiebelApp.S_App.SetEnablePerfHooks(!0),
        SiebelApp.S_App.GetTimer().SetSessionID()
    }
    function yt() {
        var e = SiebelApp.S_App.constructor.prototype,
        t = SiebelApp.Environment.constructor.prototype;
        for (var n in t)
            typeof t[n] == "function" && (e[n] = t[n])
    }
    function bt(e) {
        var t = e;
        this.GetBaseURL = function () {
            return t
        }
    }
    function wt(n, r, i, s, o, u, a, f) {
        var l,
        c = f === "Page" ? "Page" : "View";
        this.uiStatus.Busy({
            target: this.GetTargetViewContainer(),
            mask: !0
        }),
        SiebelApp.S_App.NotifyTimer("TimeGoTo" + c, [n, "Start Goto" + c]);
        var h = !0,
        p;
        if (!e.IsEmpty(i)) {
            l = e.DecodeFromQueryString(i, !0);
            var d = l.GetProperty(t.get("SWE_VIEW_ARG"));
            e.IsEmpty(n) && e.IsEmpty(r) && !e.IsEmpty(d) && (!this.GetActiveView() || d !== this.GetActiveView().GetName()) && !l.GetProperty(t.get("SWE_ARG_KEEP_CONTEXT")) && l.SetProperty(t.get("SWE_ARG_KEEP_CONTEXT"), "0"),
            i.indexOf("SWEF=1") != -1 && (a = !0)
        } else
            l = CCFMiscUtil_CreatePropSet();
        if (this.GetDiscardUserState())
            this.GetPopupPM().Get("state") === t.get("POPUP_STATE_VISIBLE") && this.GetPopupPM().ExecuteMethod("SetPopupVisible", !1);
        else if (!o && !this.CanLeaveMainView())
            return h = !1, this.uiStatus.Free(), h;
        SiebelApp.S_App.NotifyTimer("TimeGoTo" + c, [n, c + " Cache Ready"]),
        e.IsEmpty(l.GetProperty(t.get("SWE_CMD_ARG"))) && l.SetProperty(t.get("SWE_CMD_ARG"), c === "View" ? t.get("SWE_GOTO_VIEW") : t.get("SWE_GOTO_PAGE")),
        l.GetProperty(t.get("SWE_ARG_KEEP_CONTEXT")) || l.SetProperty(t.get("SWE_ARG_KEEP_CONTEXT"), "1"),
        this.SetDefaultArgs(l),
        e.IsEmpty(n) || (n = n.split("&").join("%26"), l.SetProperty(c === "View" ? t.get("SWE_VIEW_ARG") : t.get("SWE_PAGE_ARG"), n)),
        SiebelApp.S_App.IsRwd() && SiebelApp.S_App.PortletSessionMgr && (p = this.GetAckApplet()) && l.SetProperty(t.get("SWE_APPLET_STR"), p),
        e.IsEmpty(l.GetProperty(t.get("SWE_COUNT_STR"))) ? l.SetProperty(t.get("SWE_COUNT_STR"), this.GetSWEReqCount()) : ct.prototype.GetSWEReqCount = function () {
            return l.GetProperty(t.get("SWE_COUNT_STR"))
        },
        a && (l.SetProperty("SWEF", "1"), l.SetProperty("SWEHo", window.location.host), l.SetProperty(t.get("PROP_TARGET"), s));
        var v = Array.prototype.slice.call(arguments),
        m = e.EncodeToQueryString(l, e.IsEmpty(i)),
        g = {};
        return g.url = this.GetPageURL(),
        g.data = m.split(" ").join("%20"),
        g.type = "POST",
        g.contentType = "application/x-www-form-urlencoded",
        g.async = !u,
        g.context = this,
        g.successfncallback = function () {
            var e = new $.Deferred,
            t = Array.prototype.slice.call(arguments);
            t.length = t.length + 1,
            t[t.length - 1] = v;
            var n = this.ProcessResponse.apply(this, t);
            return n.done(function () {
                SiebelApp.S_App.ProcessError(),
                SiebelApp.S_App.uiStatus.Free(),
                e.resolve()
            }),
            e.promise()
        },
        g.errfncb = Kt,
        SiebelApp.AjaxRequestMgr.Ajax(g),
        g = null,
        h
    }
    function Et() {
        $("#_sweview").addClass("siebui-indent-content")
    }
    function St() {
        $("#_sweview").addClass("siebui-dashboard-content-indent")
    }
    function xt() {
        $("#SS_ChatUI").addClass("siebui-chat-pane")
    }
    function Tt(e) {
        clearTimeout(ut),
        ut = e
    }
    function Nt() {
        return ut
    }
    function Ct(e) {
        rt.ExecuteMethod("ProcessProperties", e),
        rt.ExecuteMethod("ExecuteUIUpdate")
    }
    function kt(e) {
        var n = e.GetProperty(t.get("SWE_PROP_NEW_PAGE_NAME")),
        r = SiebelAppFacade.ComponentMgr.FindComponent({
                id: n
            });
        r && (r.ExecuteMethod("ProcessProperties", e), r.ExecuteMethod("ExecuteUIUpdate"))
    }
    function Lt() {
        var e = SiebelApp.S_App.GetActivePageComp();
        e && (e.GetPM && e.GetPM() && e.GetPM().EndLife(), SiebelAppFacade.ComponentMgr.DeleteComponent(e, this), SiebelApp.S_App.SetActivePageComp(null))
    }
    function At(e, n) {
        var r,
        i,
        s = t.get("SWE_RPC_PROP_ERROR_CODE"),
        o = t.get("SWE_RPC_PROP_ERROR_MSG"),
        u = t.get("SWE_RPC_PROP_ERRORS"),
        a = e.GetChildCount();
        if (!n || typeof n.AddErrorMsgText != "function")
            n = this;
        if (a > 0 && this.ErrorObject.GetIndex(n) > -1)
            for (var f = 0; f < a; f++) {
                var l = e.GetChild(f),
                c = l.GetType();
                if (c == u) {
                    for (var h = 0, p = l.GetChildCount(); h < p; h++) {
                        var d = l.GetChild(h);
                        r = d.GetProperty(s),
                        i = d.GetProperty(o),
                        r && i && SiebelApp.S_App.ErrorObject &&
                        n.AddErrorMsgText(r, i, !0)
                    }
                    break
                }
            }
    }
    function Ot(n) {
        var r = n.GetProperty(t.get("SWE_RPC_PROP_URL")),
        i = "",
        s = "",
        o = !1,
        u = n.GetProperty(t.get("PROP_TARGET"));
        !e.IsEmpty(r) && !e.IsEmpty(u) && (i = n.GetProperty(t.get("SWE_RPC_PROP_VIEW")), s = n.GetProperty(t.get("SWE_RPC_PROP_VIEW_ID")), SiebelApp.S_App.GetActiveView() && SiebelApp.S_App.GetActiveView().GetName() == i && (o = !0), o ? SiebelApp.S_App.RefreshView(i, s, r, u) : SiebelApp.S_App.GotoView(i, s, r, u))
    }
    function Mt() {
        if (R) {
            R = !1;
            if (W)
                V ? this.RefreshView(W, X, U, z) : (this.GotoView(W, X, U, z), SiebelApp.S_App.uiStatus.m_gbusy > 1 && SiebelApp.S_App.uiStatus.Free());
            else {
                var e = !1;
                SiebelApp.S_App.IsRwd() && (e = !0);
                var t = this.GotoURL(U, z, e);
                t && typeof t.done == "function" && t.done(function () {
                    this.uiStatus.Free()
                })
            }
        }
    }
    function _t(n, r, i, s, f) {
        n = n.split(".");
        var l = "";
        e.IsEmpty(i) || (l = n[n.length - 1], l = l.replace(/_/g, " ").substring(0, l.length - 3));
        if (n[n.length - 1] === "_sweview")
            n = "_svf0", r.push({
                func: this.OnLoadViewContent,
                tgt: n
            });
        else if (n[n.length - 1] === "_sweclient" || n[n.length - 1] === "SiebAppContainer" || l === i) {
            r.push({
                func: this.OnLoadAppletContent,
                tgt: n,
                uiobject: i
            });
            var c;
            if (SiebelApp.S_App.IsRwd())
                var c = $(n);
            else
                c = $("[name=" + n[n.length - 1] + "]"), c.length === 0 && (c = $("[id=" + n[n.length - 1] + "]"));
            ct.prototype.GetTargetViewContainer = function () {
                return c
            },
            ct.prototype.SetNextTargetViewContainer = function (n) {
                if (SiebelApp.S_App.IsRwd())
                    c = $("#SiebAppContainer");
                else {
                    c = $("[name=" + n + "]"),
                    c.length === 0 && (c = $("[id=" + n[n.length - 1] + "]"));
                    if (c.length === 0 && n !== "top") {
                        $(_swecontent).append("<div name='" + n + "'/>"),
                        c = $("[name=" + n + "]");
                        var r = {
                            autoOpen: !1,
                            modal: !0,
                            close: function (e, t) {
                                c.remove()
                            },
                            beforeClose: function (n, r) {
                                var i = $(n.target),
                                s = i.attr("frag_app"),
                                f = i.attr("frag_view");
                                if (e.IsEmpty(f) && e.IsEmpty(s))
                                    return;
                                i.removeAttr("frag_app").removeAttr("frag_view");
                                var l = CCFMiscUtil_CreatePropSet(),
                                c = CCFMiscUtil_CreatePropSet(),
                                h = {
                                    async: !0,
                                    opdecode: !1,
                                    mask: !1
                                };
                                l.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_LOGOFF")),
                                l.SetProperty("SWEF", "1"),
                                e.IsEmpty(f) || (f = f.split("%20").join(" "), l.SetProperty(t.get("SWE_VIEW_ARG"), e.UrlDecode(f))),
                                e.IsEmpty(s) || (s = s.split("%20").join(" "), l.SetProperty(t.get("SWEApp"), e.UrlDecode(s))),
                                SiebelApp.S_App.CallServer(l, c, !1, h);
                                if (!e.IsEmpty(f)) {
                                    SiebelApp.S_App.GetActiveView().GetName() == f && (SiebelApp.S_App.GetActiveView().EndLife(), SiebelApp.S_App.SetActiveView(o)),
                                    delete u[f],
                                    delete a[f];
                                    var p = SiebelAppFacade.ComponentMgr.FindComponent({
                                            id: f
                                        });
                                    p && (p.GetPM && p.GetPM() && p.GetPM().EndLife(), SiebelAppFacade.ComponentMgr.DeleteComponent(p, SiebelApp.S_App))
                                }
                            }
                        },
                        i = c.dialog(r);
                        i.dialog("open");
                        if (e.IsTrue(SiebelApp.S_App.IsAutoOn())) {
                            var s = c.parent().find(".ui-icon-closethick");
                            s.length > 0 && s.attr({
                                ot: "button",
                                rn: "SampleTarget_PopupClose",
                                un: "PopupClose"
                            })
                        }
                    }
                }
            }
        } else
            n.length === 1 && SiebelApp.S_App.IsRwd() ? (n = SiebelApp.S_App.ViewTarget(), r.push({
                    func: this.OnLoadViewContent,
                    tgt: n
                })) : !e.IsTrue(s) && e.IsEmpty(i) ? (n = n[n.length - 1], r.push({
                    func: this.OnLoadExternalObject,
                    tgt: n
                })) : (n = n[n.length - 1], e.IsEmpty(i) || (f === "View" ? r.push({
                        func: this.OnLoadViewContent,
                        tgt: n,
                        uiobject: i
                    }) : r.push({
                        func: this.OnLoadAppletContent,
                        tgt: n,
                        uiobject: i
                    })));
        return this.SetNextTargetViewContainer(n),
        n
    }
    function Dt(e) {
        var t = new $.Deferred;
        return SiebelApp.contentUpdater.AddCallBack(e, function () {
            t.resolveWith(this, ["AppletLayoutDone"])
        }, this),
        this.GetTargetViewContainer().attr("src", e),
        SiebelApp.contentUpdater.loadContent(),
        t.promise()
    }
    function Pt(n) {
        var r,
        i,
        s,
        o,
        u,
        a,
        f,
        l,
        c,
        h,
        p = null,
        d = null,
        v = !1;
        return c = n.GetProperty(t.get("SWE_RPC_PROP_STATUS")),
        c === t.get("SWE_RPC_PROP_CONFIRM_DIALOG") && (r = n.GetProperty(t.get("SWE_CONFIRM_TEXT_STR")), s = e.Confirm(r), s ? i = n.GetProperty(t.get("SWE_OK_METHOD_STR")) : i = n.GetProperty(t.get("SWE_CANCEL_METHOD_STR")), i && (u = n.GetProperty(t.get("SWE_VIEW_ID_STR")), f = n.GetProperty(t.get("SWE_APPLET_STR")), s ? l = n.GetChildByType(t.get("SWE_OK_METHOD_ARGS_STR")) : l = n.GetChildByType(t.get("SWE_CANCEL_METHOD_ARGS_STR")), l = l || CCFMiscUtil_CreatePropSet(), e.IsEmpty(u) && (p = this.GetMainView()), p && (d = p.GetApplet(f)) ? v = d.InvokeMethod(i, l) : (o = n.GetProperty(t.get("SWE_SERVICE")), o ? (l.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_INVOKE_METHOD_STR")), l.SetProperty(t.get("SWE_SERVICE"), o), l.SetProperty(t.get("SWE_METHOD_STR"), i)) : (a = n.GetProperty(t.get("SWE_VIEW_ARG")), l.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_INVOKE_METHOD_STR")), l.SetProperty(t.get("SWE_VIEW_ID_STR"), u), l.SetProperty(t.get("SWE_VIEW_ARG"), a), l.SetProperty(t.get("SWE_APPLET_STR"), f), l.SetProperty(t.get("SWE_METHOD_STR"), i)), h = CCFMiscUtil_CreatePropSet(), SiebelApp.S_App.CallServer(l, h, !0))), v = !0),
        v
    }
    function Ht() {
        var t = this.GetCmdMgr();
        t.GetRefreshTB() && (t.UpdateUIControls(), t.SetRefreshTB(!1));
        var n = this.GetActiveView();
        e.IsEmpty(n) || n.ExecuteUIUpdate();
        for (var r in B) {
            var i = B[r];
            i.ExecuteUIUpdate()
        }
    }
    function Bt() {
        var t = this.GetActiveView();
        e.IsEmpty(t) || t.ResetUIUpdateStates()
    }
    function jt(n) {
        var r = this.GetActiveView(),
        i = e.IsEmpty(r) ? {}
         : r.GetAppletMap(),
        s = n.GetChildCount();
        for (var o = 0; o < s; o++) {
            var u = n.GetChild(o),
            a = u.GetProperty(t.get("SWE_PROP_VAR_NAME")),
            f = u.GetType();
            if (f === t.get("SWE_APPLET_PM_PS")) {
                for (var l in i)
                    i[l].GetVarName() === a && i[l].GetPModel().HandleResponsePS(u);
                for (var c in B)
                    B[c].GetVarName() === a && B[c].GetPModel().HandleResponsePS(u)
            }
        }
    }
    function Ft(n) {
        if (n.GetType() !== t.get("SWE_RPC_PROP_NOTIFICATION"))
            return !1;
        var r = this.GetActiveView(),
        i = this.GetActiveBusObj(),
        s = e.IsEmpty(r) ? {}
         : r.GetAppletMap(),
        o = n.GetChildCount();
        for (var u = 0; u < o; u++) {
            var a = n.GetChild(u),
            f = a.GetProperty(t.get("SWE_PROP_BC")),
            l = a.GetProperty(t.get("SWE_PROP_BC_NOTI_ZONE")),
            c = e.IsEmpty(i) ? null : i.GetBusComp(f);
            if (c && (!l || l == i.GetZone())) {
                c.HandleServerNotifications(a);
                for (var h in s)
                    !e.IsEmpty(s[h].GetBusComp()) && s[h].GetBusComp().GetVarName() === f && !(s[h].GetPModel()instanceof JSSPropertySet) && s[h].GetPModel() && s[h].GetPModel().HandleNotify(a);
                x.HandleNotify(a)
            } else
                for (var p in B)
                    if (B.hasOwnProperty(p)) {
                        var d = B[p];
                        !e.IsEmpty(d.GetBusComp()) && d.GetBusComp().GetVarName() === f && (c = d.GetBusComp(), c.HandleServerNotifications(a), d.GetPModel().HandleNotify(a))
                    }
        }
    }
    function It(n, r) {
        var f = new
            $.Deferred,
        l = [],
        c;
        this.SetSelfProps(n),
        SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && SiebelApp.S_App.GetTimer().TimePopupApplet("", "Process Object Info Start");
        var h = SiebelApp.Environment;
        h && Xt.call(this, n);
        var p = n.GetChildByType("api"),
        d = n.GetProperty(t.get("SWE_RPC_PROP_STATUS")),
        v = t.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT");
        if (p !== null) {
            var m = p.EnumChildren(!0);
            if (m !== null) {
                var g = t.get("SWE_PST_NEW_VIEW"),
                y = t.get("SWE_PST_NEW_BUSOBJ"),
                b = t.get("SWE_PST_STR_CACHE"),
                w = t.get("SWE_PST_NEW_NAV_CTRL_MGR"),
                E = t.get("SWE_PST_NAV_CTRL_INFO"),
                S = t.get("SWE_PROP_VALUE"),
                T = t.get("SWE_PST_BUSOBJ_INFO"),
                N = t.get("SWE_PST_VIEW_INFO"),
                C = t.get("SWE_PST_CLEAR_MV"),
                k = t.get("SWE_PST_EXT_OBJ_INFO"),
                L = t.get("SWE_PST_ICON_LIST"),
                A = t.get("SWE_PST_NEW_BUSCOMP"),
                O = SiebelApp.S_App.BusComp,
                M = SiebelApp.S_App.Applet,
                _ = SiebelApp.S_App.ListApplet,
                D = SiebelApp.S_App.Playbarapplet,
                P,
                H = t.get("SWE_PST_NEW_APPLET"),
                B = t.get("SWE_PST_NEW_LIST_APPLET"),
                j = t.get("SWE_PST_NEW_TREEAPPLET"),
                F = t.get("SWE_RPC_PROP_COMMAND_MGR"),
                I = null;
                do {
                    var q = m.GetType();
                    switch (q) {
                    case A:
                        P = new O,
                        P.ProcessObjectInfo(m.GetChild(0));
                        break;
                    case H:
                    case B:
                    case j:
                        if (m) {
                            var R = m.GetChild(0);
                            R && R.GetProperty("n") === "Task Watch Window Applet" && R.GetChildByType("cdi") && R.GetChildByType("cdi").SetProperty("js", CCFMiscUtil_ArrayToString(["siebel/taskwatchwindowpm.js", "siebel/taskwatchwindowpr.js"]))
                        }
                        var U = e.PrepareModuleInfo(m);
                        (function () {
                            var e = m,
                            t = P,
                            n = new $.Deferred;
                            l.push(n.promise());
                            var r = function () {
                                SiebelApp.S_App.AppInitPromise().done(function () {
                                    try {
                                        d !== v ? (Ut.call(SiebelApp.S_App, e, t), n.resolveWith(SiebelApp.S_App, [""])) : (Rt.call(SiebelApp.S_App, e, t), n.resolveWith(SiebelApp.S_App, ["SA Applet Object Info"]))
                                    } catch (r) {
                                        SiebelJS.Log(r)
                                    }
                                    e = m = null
                                })
                            };
                            U.length ? require(U, r) : r()
                        })();
                        break;
                    case y:
                        var z = !1,
                        W = "";
                        r instanceof JSSPropertySet && e.IsTrue(r.GetProperty("SWEF")) ? (z = !0, W = r.GetProperty(t.get("SWE_VIEW_ARG"))) : !e.IsEmpty(r) && r.length == 8 && !e.IsEmpty(r[3]) && (e.IsTrue(r[6]) || r[2] != null && r[2].indexOf("SWEF=1") != -1) && (z = !0, W = r[0]);
                        if (!z)
                            this.InitializeBO(m);
                        else {
                            var X = new SiebelApp.S_App.BusObj;
                            X.ProcessObjectInfo(m.GetChild(0)),
                            a[W] = X
                        }
                        break;
                    case C:
                        this.ClearMainView(),
                        this.ClearBusObj();
                        break;
                    case T:
                        i.ProcessObjectInfo(m);
                        break;
                    case g:
                        SiebelApp.S_App.IsRwd() && Lt.call();
                        var z = !1;
                        r instanceof JSSPropertySet && e.IsTrue(r.GetProperty("SWEF")) ? z = !0 : !e.IsEmpty(r) && r.length == 8 && !e.IsEmpty(r[3]) && (e.IsTrue(r[6]) || r[2] != null && r[2].indexOf("SWEF=1") != -1) && (z = !0);
                        if (!z)
                            o = s = SiebelAppFacade.ProxyFactory.MakeObject(q), SiebelAppFacade.ComponentMgr.RegisterLevel(s, this), l.push(s.GetFilesAndProcessObjectInfo(m.GetChild(0)));
                        else {
                            var V = SiebelAppFacade.ProxyFactory.MakeObject(q);
                            SiebelAppFacade.ComponentMgr.RegisterLevel(V, this);
                            var R = m.GetChild(0);
                            if (R) {
                                var J = R.GetProperty("n");
                                u[J] = V
                            }
                            l.push(V.GetFilesAndProcessObjectInfo(m.GetChild(0)))
                        }
                        break;
                    case N:
                        e.IsEmpty(s) || l.push(s.GetFilesAndProcessObjectInfo(m));
                        break;
                    case w:
                        var K = m.GetChildCount();
                        K > 0 && x.ProcessObjectInfo(m.GetChild(0));
                        break;
                    case E:
                        SiebelApp.S_App.IsRwd() ? c = m.Clone() : (x.HandleResponsePS(m.Clone()), x.ProcessObjectInfo(m));
                        break;
                    case k:
                        var Q = m.GetProperty(t.get("SWE_PST_EXT_OBJ_INFO")),
                        G = SiebelApp.S_App.getExtObject(Q);
                        G ? G.HandleNotify(m.GetChild(0)) : (G = SiebelApp.S_App.RegisterExtObject(m), G && (G.Setup(m.GetChild(0)), Q === "Dashboard" ? St.call(this) : Q === "ChatPane" ? xt.call(this) : Et.call(this), (Q !== "Dashboard" || n.GetProperty(t.get("SWE_RPC_PROP_VIEW_ID")) !== "Dashboard") && G.Show()));
                        break;
                    case L:
                        zt.call(this, m);
                        break;
                    case F:
                        SiebelApp.S_App.IsRwd() && this.GetCmdMgr().ProcessRWDNotifications(m);
                        break;
                    default:
                    }
                } while (m = p.EnumChildren(!1))
            }
        }
        SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && (SiebelApp.S_App.GetTimer().TimeGoToView("", "Processed Object Info"), SiebelApp.S_App.GetTimer().TimePopupApplet("", "Processed Object Info"));
        var Y = this;
        return l.length > 0 ? $.when.apply($, l).done(function () {
            f.resolveWith(Y, ["API "])
        }) : f.resolveWith(Y, ["API "]),
        SiebelApp.S_App.IsRwd() && c && f.done(function () {
            x.HandleResponsePS(c),
            x.ProcessObjectInfo(c)
        }),
        f.promise()
    }
    function qt(e, t) {
        SiebelApp.S_App.LocaleObject && SiebelApp.S_App.LocaleObject.AddLocalString(e, t)
    }
    function Rt(n, r) {
        var i,
        s = n.GetChild(0).Clone();
        i = SiebelAppFacade.ProxyFactory.MakeObject(n.GetType());
        if (i) {
            r && i.SetBusComp(r),
            i.SetName(s.GetProperty(t.get("SWE_PROP_NAME")));
            var o = {
                callback: i.ProcessObjectInfo,
                scope: i,
                input: {
                    ps: s
                }
            };
            SiebelAppFacade.ComponentMgr.MakeComponent(this, s, i, o),
            SiebelAppFacade.ComponentMgr.CompleteComponent(this, s, i),
            e.IsTrue(n.GetProperty(t.get("SWE_PST_STANDALONE_APPLET"))) && (B[i.GetName()] = i, i.SetIsStandAlone(!0), i.SetAppletActive(!0, i)),
            i.Initialize()
        }
    }
    function Ut(n, r) {
        var i,
        s = n.GetChild(0).Clone(),
        o = s.GetProperty(t.get("SWE_PROP_NAME")),
        u = o === "About View Applet";
        i = SiebelAppFacade.ProxyFactory.MakeObject(n.GetType());
        if (i) {
            r && i.SetBusComp(r);
            if (e.IsTrue(n.GetProperty(t.get("SWE_PST_STANDALONE_APPLET"))) && B[o]) {
                var a = SiebelAppFacade.ComponentMgr.FindComponent({
                        id: o
                    });
                a && SiebelAppFacade.ComponentMgr.DeleteComponent(a, this),
                B[o].EndLife()
            }
            if (n.GetType() === t.get("SWE_PST_NEW_LIST_APPLET") || u) {
                i.SetName(o),
                u && (s.SetProperty(t.get("SWE_UIDEF_PM_CTR"), "siebel/aboutviewpm"), s.SetProperty(t.get("SWE_UIDEF_PR_CTR"), "siebel/aboutviewpr"));
                var f = {
                    callback: i.ProcessObjectInfo,
                    scope: i,
                    input: {
                        ps: s
                    }
                };
                SiebelAppFacade.ComponentMgr.MakeComponent(this, s, i, f),
                SiebelAppFacade.ComponentMgr.CompleteComponent(this, s, i)
            } else
                i.ProcessObjectInfo(s), SiebelAppFacade.ComponentMgr.MakeComponent(this, s, i);
            e.IsTrue(n.GetProperty(t.get("SWE_PST_STANDALONE_APPLET"))) && (B[i.GetName()] = i, i.SetIsStandAlone(!0), SiebelApp.S_App.PortletSessionMgr && i.SetAppletActive(!0, i)),
            SiebelApp.S_App.GetPopupPM().Get("state") !== t.get("POPUP_STATE_VISIBLE") && (i.Initialize(), SiebelAppFacade.ComponentMgr.FindComponent({
                    id: i.GetName()
                }).Show(), i.ShowOnly(), i.ShowSelection(), this.ClearErrorMsg(), i.HasCustomShadow() && i.shadow && typeof i.shadow.OnLoad == "function" && i.shadow.OnLoad())
        }
    }
    function zt(e) {
        var n,
        r = [],
        i = e.GetType();
        if (i != t.get("SWE_PST_ICON_LIST"))
            return;
        n = e.GetProperty(t.get("SWE_PROP_NAME"));
        if (
            n) {
            var s = e.GetChildCount();
            for (var o = 0; o < s; o++) {
                var u = e.GetChild(o),
                a = u.GetType();
                if (a == t.get("SWE_PST_ICON")) {
                    var f = Wt.call(this, u);
                    r.push(f)
                }
            }
            H[n] = r
        }
    }
    function Wt(n) {
        if (e.IsEmpty(n))
            return;
        var r = {};
        return r.iconName = n.GetProperty(t.get("SWE_PROP_NAME")),
        r.iconImage = n.GetProperty(t.get("SWE_PROP_ICON_IMG")),
        r
    }
    function Xt(e) {
        SiebelApp.Environment.SetProtoAPIs(e)
    }
    function Vt() {
        M || (M = new SiebelApp.S_App.Menu(this), M.CreatePM("AppMenuPR", SiebelAppFacade.AppMenuPM), M.ShowMenuControl())
    }
    function $t() {
        var e = SiebelApp.S_App.ViewTarget();
        SiebelApp.S_App.OnLoadViewContainer(e),
        this.GetAckPage() ? SiebelApp.S_App.GotoPage(this.GetAckPage(), "", "", null) : this.GetRefreshViewURL() ? SiebelApp.S_App.GotoView("", "", this.GetRefreshViewURL(), null) : this.GetAckView() && SiebelApp.S_App.GotoView(this.GetAckView(), "", "", null),
        SiebelApp.S_App.PortletSessionMgr || this.InitializeGlobalMenu();
        var n = SiebelAppFacade.ComponentMgr.FindComponent({
                id: t.get("SWE_PST_COMM_TOOLBAR")
            });
        if (SiebelApp.S_App.CommToolbar && !n) {
            var r = CCFMiscUtil_CreatePropSet();
            r.SetProperty(t.get("SWE_UIDEF_PM_CTR"), "siebel/commToolbarpmodel"),
            r.SetProperty(t.get("SWE_UIDEF_PR_CTR"), "siebel/commToolbarprender"),
            SiebelAppFacade.ComponentMgr.MakeComponent(this, r, SiebelApp.S_App.CommToolbar),
            (n = SiebelAppFacade.ComponentMgr.FindComponent({
                        id: t.get("SWE_PST_COMM_TOOLBAR")
                    })) && n.Show()
        }
        this.GetCmdMgr().Show()
    }
    function Jt() {
        clearTimeout(Q);
        var e = this.HeartBeatInterval() || -1;
        if (e > 0 && (!IsOfflineModeEnabled() || !this.GetOfflineMode())) {
            var n = CCFMiscUtil_CreatePropSet(),
            r = CCFMiscUtil_CreatePropSet(),
            i = {};
            e *= 1e3,
            r.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_PROP_HEARTBEAT")),
            i.opdecode = !1,
            i.HB = !0,
            i.cb = i.errcb = function () {
                Jt.call(SiebelApp.S_App)
            },
            Q = setTimeout(function () {
                    SiebelApp.S_App.CallServer(r, n, !0, i)
                }, e)
        }
    }
    function Kt(n, r, i) {
        var s = this.lp || {},
        o = this.outputPS,
        u = this.scope || SiebelApp.S_App;
        try {
            typeof s.errcb == "function" ? (s.args = s.args || [], s.errcb.apply(s.scope || null, s.args)) : s.scope !== "undefined" && s.scope !== undefined && typeof s.scope.PostExecute == "function" && (s.args = s.args || [], o.SetProperty(t.get("AJAX_FAIL_ERR"), r), s.args.push(o), s.scope.PostExecute.apply(s.scope || null, s.args))
        } catch (a) {
            SiebelJS.Log(a.message)
        }
        finally {
            s.HB && r === "error" && (SiebelApp.S_App.uiStatus.Free(), e.Alert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_AJAX_ERR"))),
            u.uiStatus.Free(!0)
        }
    }
    function Gt(e, t) {
        var n;
        return this.shadow && typeof this.shadow.OnPreInvokeMethod == "function" ? (n = this.shadow.OnPreInvokeMethod(e, t), n === "CancelOperation" ? !1 : !0) : !0
    }
    function Yt(e, t) {
        this.shadow && typeof this.shadow.OnInvokeMethod == "function" && this.shadow.OnInvokeMethod(e, t)
    }
    function en() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {}
    }
    function tn() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function an() {
        return nn
    }
    function fn(t, n) {
        nn = t,
        xn(),
        nn ? (SiebelApp.S_App.uiStatus.Free(), Nn(n)) : (Sn(), e.IsEmpty(n) || e.Alert(n))
    }
    function ln() {
        return rn === null && (rn = SiebelApp.WebSocketManager.CreateWSHandler(t.get("WS_COMPONENT_TYPE_INLINE_EDIT")), rn.SetAlertOnFail(!1), rn.timeoutID = null, rn.OnClose = cn, rn.OnFail = hn, rn.OnMessage = pn, mn()),
        rn
    }
    function cn() {
        SiebelJS.Debug("[DISA][Warning] DISA was closed during file editing."),
        dn(),
        An(),
        Sn()
    }
    function hn() {
        dn(),
        An()
    }
    function pn(e, n) {
        var r = SiebelApp.S_App.LocaleObject,
        i = e[t.get("WS_INLINEEDIT_DISA_READY")];
        if (i === !0) {
            on === !1 ? An() : Ln(),
            vn();
            return
        }
        if (nn || sn) {
            vn.call(this);
            if (e instanceof Blob)
                bn(e, n);
            else {
                var s = e[t.get("WS_MSG_TYPE_IN_ERROR")];
                if (s) {
                    var o = r.GetLocalString(s);
                    o ? fn(!1, o) : fn(!1, s),
                    SiebelApp.S_App.uiStatus.Free();
                    return
                }
                var u = e[t.get("WS_INLINEEDIT_FILE_TRANSFERRED")];
                if (u === !0) {
                    wn(),
                    sn ? nn = !1 : En(),
                    SiebelApp.S_App.uiStatus.Free();
                    return
                }
                var a = e[t.get("WS_INLINEEDIT_UPLOAD_STATUS")],
                f = !0,
                l;
                switch (a) {
                case t.get("WS_INLINEEDIT_NEEDUPLOAD_FILESTILLOPEN"):
                    f = !1,
                    l = r.GetLocalString("IDS_ATT_CLOSE_CONFIRM");
                    break;
                case t.get("WS_INLINEEDIT_NONEEDUPLOAD"):
                    break;
                case t.get("WS_INLINEEDIT_FILEERROR"):
                    wn(),
                    l = r.GetLocalString("IDS_ATT_UPLOAD_FAILED");
                    break;
                case t.get("WS_INLINEEDIT_NONEEDUPLOAD_FILESTILLOPEN"):
                    f = !1,
                    l = r.GetLocalString("IDS_ATT_CLOSE_CONFIRM");
                    break;
                default:
                }
                fn(!f, l),
                SiebelApp.S_App.uiStatus.Free()
            }
        }
    }
    function dn() {
        vn(),
        nn && (nn = !1, SiebelApp.S_App.uiStatus.Free(), wn())
    }
    function vn() {
        rn && rn.timeoutID && (window.clearTimeout(rn.timeoutID), rn.timeoutID = null)
    }
    function mn() {
        un = {},
        un[t.get("SWE_PROP_SESSION_RANDOM_NUMBER")] = SiebelApp.S_App.GetSRN(),
        e.IsEmpty(SiebelApp.S_App.GetTabId()) || (un[t.get("SWE_PROP_BROWSER_TAB_ID")] = SiebelApp.S_App.GetTabId()),
        un[t.get("SWE_CMD_ARG")] = t.get("SWE_CMD_INVOKE_METHOD_STR"),
        un[t.get("SWE_METHOD_STR")] = "AttachAttachment",
        un[t.get("SWE_VIEW_RPC_ARG")] = "1"
    }
    function gn(e, t) {
        un[e] = t.toString()
    }
    function yn() {
        return Math.random().toString(36).slice(-10)
    }
    function bn(n, r) {
        var i = 'Content-Disposition: form-data; name="',
        s = '"\r\n\r\n',
        o = "\r\n",
        u = yn(),
        a = "--" + u,
        f = "";
        for (var l in un)
            un.hasOwnProperty(l) && (f += a + o, f += i + l + s + un[l] + o);
        var h = new Blob([f]),
        p = a + o;
        p += i + t.get("SWE_FILE_NAME_STR") + '"; filename="' + r + '"\r\n',
        p += "Content-Type: application/octet-stream\r\n\r\n";
        var d = new Blob([p]),
        v = "\r\n" + a + "--\r\n",
        m = new Blob([v]),
        g = new Blob([h, d, n, m]),
        y = new FileReader;
        y.onload = function () {
            var n = en();
            n.onreadystatechange = function () {
                fn(!1);
                if (this.readyState === 4 && this.status === 200) {
                    var e = SiebelApp.S_App.GetActiveView().GetActiveApplet();
                    e.InvokeMethod("WriteRecord", CCFMiscUtil_CreatePropSet())
                }
            };
            var r = SiebelApp.S_App.GetPageURL() + c + t.get("SWE_PROP_SESSION_RANDOM_NUMBER") + "=" + SiebelApp.S_App.GetSRN();
            e.IsEmpty(SiebelApp.S_App.GetTabId()) || (r += "&" + t.get("SWE_PROP_BROWSER_TAB_ID") + t.get("SWE_ARG_EQUAL") + SiebelApp.S_App.GetTabId()),
            n.open("POST", r, !1),
            n.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + u);
            var i = y.result;
            n.send(i),
            xn(),
            SiebelApp.S_App.uiStatus.Free()
        },
        y.readAsArrayBuffer(g)
    }
    function wn() {
        var e = $("#downloadFileChooseDialog");
        e.length > 0 && e.dialog("close")
    }
    function En() {
        var e = $("#uploadFileDialogContent");
        e.length > 0 && (e.find("#uploadReminder").show(), e.find("#uploadMessage").hide(), e.dialog("widget").find(".ui-dialog-titlebar .ui-dialog-titlebar-close").styleShow(), e.dialog("widget").find("#finishButton").styleShow(), e.dialog("widget").find("#okButton").styleHide(), e.dialog("open"))
    }
    function Sn() {
        var e = $("#uploadFileDialogContent");
        e.length > 0 && e.dialog("close")
    }
    function xn() {
        var e = $("#uploadFileDialogContent");
        e.length > 0 && (e.dialog("widget").find("button").removeClass("appletButtonDis").addClass("appletButton").prop("disabled", !1), e.dialog("widget").find(".ui-dialog-titlebar .ui-dialog-titlebar-close").prop("disabled", !1))
    }
    function Tn() {
        var e = $("#uploadFileDialogContent");
        e.length > 0 && (e.dialog("widget").find("button").removeClass("appletButton").addClass("appletButtonDis").prop("disabled", !0), e.dialog("widget").find(".ui-dialog-titlebar .ui-dialog-titlebar-close").prop("disabled", !0))
    }
    function Nn(e) {
        var t = $("#uploadFileDialogContent");
        t.length > 0 && (t.find("#uploadMessage").html(e), t.dialog("widget").find(".ui-dialog-titlebar .ui-dialog-titlebar-close").styleHide(), t.find("#uploadReminder").styleHide(), t.find("#uploadMessage").styleShow(), t.dialog("widget").find("#finishButton").styleHide(), t.dialog("widget").find("#okButton").styleShow(), t.dialog("open"))
    }
    function Cn() {
        SiebelApp.S_App.uiStatus.Busy({
            mask: !0
        }),
        Tn();
        var e = ln(),
        n = {};
        n[t.get("WS_MSG_COMMAND")] = t.get("WS_MSG_CMD_UPLOAD_FILE"),
        e.SendMessage(n),
        e.timeoutID = setTimeout(function () {
                SiebelJS.Debug("[DISA][Warning] Uploading file from DISA time out."),
                SiebelApp.S_App.uiStatus.Free(),
                fn(!1)
            }, t.get("WS_INLINEEDIT_UPLOADFILE_TIMEOUT"))
    }
    function kn() {
        var e = ln(),
        n = {};
        n[t.get("WS_MSG_COMMAND")] = t.get("WS_INLINEEDIT_DISA_READY"),
        e.SendMessage(n),
        e.timeoutID = setTimeout(function () {
                SiebelJS.Debug("[DISA][Warning] Ping disa timeout."),
                An()
            }, 3e3)
    }
    function Ln() {
        var e = $("#downloadFileChooseDialog");
        e.length > 0 && (e.parent().find("#editBtnHint").styleHide(), e.parent().find("#editButton").removeClass("appletButtonDis").addClass("appletButton").removeAttr("disabled").attr("tabindex", "0").focus())
    }
    function An() {
        var e = $("#downloadFileChooseDialog");
        e.length > 0 && (e.parent().find("#editBtnHint").styleShow(), e.parent().find("#editButton").removeClass("appletButton").addClass("appletButtonDis").prop("disabled", !0).attr("tabindex", "-1"))
    }
    function On(t, n) {
        var r = function () {
            if (this.readyState === 4)
                if (this.status === 200 || this.status === 204) {
                    var t = Zt.encode(this.response);
                    SiebelApp.MobileFileMgr.WriteTempWithFlag({
                        filename: n,
                        content: t,
                        append: !1,
                        success: function () {
                            SiebelApp.S_App.uiStatus.Free(),
                            SiebelApp.MobileFileMgr.OpenTempFile({
                                filename: n,
                                displayFileName: n
                            })
                        },
                        error: function () {
                            SiebelApp.S_App.uiStatus.Free(),
                            e.Alert(locale.GetLocalString("IDS_ATT_CREATE_FILE_PATH_ERROR"))
                        }
                    })
                }
        },
        i = function () {
            SiebelApp.S_App.uiStatus.Busy({});
            var e = en() || tn();
            e.onreadystatechange = r,
            e.open("GET", t),
            e.responseType = "arraybuffer",
            e.send()
        };
        SiebelApp.AttachmentMgr.PreviewInMAF ? SiebelApp.AttachmentMgr.PreviewInMAF(t, n) : i()
    }
    var e = SiebelJS.Dependency("SiebelApp.Utils"),
    t = SiebelJS.Dependency("SiebelApp.Constants"),
    n = t.get("SWE_PST_APP_INFO"),
    r,
    i,
    s,
    o,
    u = {},
    a = {},
    f = t.get("SWE_FIELD_STR"),
    l = t.get("SWE_RPC_PROP_URL"),
    c = t.get("SWE_ARG_START"),
    h = t.get("SWE_RPC_PROP_FILEDOWNLOADSAVE"),
    p = t.get("SWE_METHOD_SAVE_QUERY"),
    d = t.get("SWE_METHOD_SAVE_QUERY_AS"),
    v = t.get("SWE_METHOD_POST_CHANGES"),
    m = t.get("SWE_TARGET_TOP"),
    g = t.get("SWE_BCF_FIELD"),
    y = [],
    b = [],
    w = [],
    E = [],
    S = [],
    x,
    T = {},
    N = [],
    C,
    k = [],
    L = {},
    A,
    O = !1,
    M = null,
    _,
    D = {},
    P = !1,
    H = {},
    B = {},
    j = null,
    F,
    I = !0,
    q = {},
    R = !1,
    U = "",
    z = "",
    W = "",
    X = "",
    V = !1,
    J = !1,
    K = !0,
    Q = !1,
    G = null,
    Y = !1,
    Z = 0,
    et = null,
    tt = [],
    nt,
    rt = null,
    it = null,
    st = {},
    ot = !1,
    ut = null,
    at = $.Deferred(),
    ft = at.promise(),
    lt = {},
    ct = function () {
        var e;
        ct = function () {
            return e
        },
        ct.prototype = this,
        e = new ct,
        e.uiStatus = new SiebelApp.UIStatus,
        e.constructor = ct;
        var t = new SiebelApp.CommandManager(e);
        ct.prototype.GetCmdMgr = function () {
            return t
        };
        var n = new SiebelApp.ScriptDebuggerManager(e);
        return ct.prototype.GetScriptDebuggerMgr = function () {
            return n
        },
        SiebelAppFacade.ComponentMgr.RegisterLevel(e),
        e
    };
    r = new ct,
    ct.prototype.IsPreviewMode = function () {
        return ot
    },
    ct.prototype.SetPreviewMode = function (e) {
        ot = e,
        this.uiStatus.SetProgressBarState(e)
    },
    ct.prototype.SetExternalActiveApplet = function (e) {
        G = e
    },
    ct.prototype.GetExternalActiveApplet = function (e) {
        return G
    },
    ct.prototype.SetShowNewPage = function (e) {
        Y = e
    },
    ct.prototype.GetShowNewPage = function () {
        return Y
    },
    ct.prototype.GetRowCounterTemplateMap = function (e) {
        return q[e]
    },
    ct.prototype.IsExternalApplet = function (t) {
        return !e.IsEmpty(B[t.GetName()])
    },
    ct.prototype.RemoveApplet = function (e) {
        this.GetExternalActiveApplet() === e && this.SetExternalActiveApplet(null),
        delete B[e.GetName()];
        var t = SiebelAppFacade.ComponentMgr.FindComponent({
                id: e.GetName()
            });
        t && SiebelAppFacade.ComponentMgr.DeleteComponent(t, this),
        e.EndLife && e.EndLife(),
        delete e
    },
    ct.prototype.GetPopupPM = function () {
        return F
    },
    ct.prototype.GetMsgBarPM = function () {
        return j
    },
    ct.prototype.GetIconMap = function () {
        return H
    },
    ct.prototype.GetCancelId = function () {
        return Z
    },
    ct.prototype.PushPostBack = function (e, t) {
        N.push({
            callBack: e,
            object: t
        })
    },
    ct.prototype.DefineAccessor = function (n, r, i, s, o) {
        s = t.get(s);
        var u = null;
        r.PropertyExists(s) && (u = r.GetProperty(s)),
        o === !0 && (u = SiebelApp.S_App.LookupStringCache(u));
        if (!e.IsEmpty(u) || typeof n[i] != "function")
            n[i] = function () {
                return u
            };
        r = null
    },
    ct.prototype.GetActiveBusObj = function () {
        return i
    },
    ct.prototype.SetActiveBusObj = function (e) {
        i = e
    },
    ct.prototype.AppInitPromise = function () {
        return ft
    },
    ct.prototype.AppInitDeferred = function () {
        return at
    },
    ct.prototype.GetActiveView = function () {
        return s
    },
    ct.prototype.IsViewFragment = function (e) {
        return u.hasOwnProperty(e)
    },
    ct.prototype.GetFragmentBO = function (e) {
        return a[e]
    },
    ct.prototype.SetActiveView = function (e) {
        s = e
    },
    ct.prototype.SetLayoutLoaded = function (e, t, n, r) {},
    ct.prototype.SetLayoutUnloaded = function () {},
    ct.prototype.SetThreadbarSpan = function () {},
    ct.prototype.ViewUINotLoaded = function () {},
    ct.prototype.ProcessRPCInfo = function (e) {},
    ct.prototype.OnUnload = function () {
        SiebelJS.Debug("On Unload")
    },
    ct.prototype.GetActivePageComp = function () {
        return it
    },
    ct.prototype.SetActivePageComp = function (e) {
        it = e
    },
    ct.prototype.REPCHK_MRV1 = function () {
        return J
    },
    ct.prototype.isStringCacheEnabled = function () {
        return K
    },
    ct.prototype.GetAppObjTree = function (e) {
        var t = [];
        return e = !!e && !$.isEmptyObject(e) ? e : this,
        t.push(e),
        t
    },
    ct.prototype.SetSelfProps = function (n) {
        var r = e.Curry(ct.prototype.DefineAccessor, ct.prototype, n);
        r("GetUserName", "SWE_PROP_USER_ID"),
        r("GetName", "SWE_PROP_NAME"),
        r("GetAckView", "SWE_PROP_ACK_VIEW"),
        r("GetAckPage", "SWE_PROP_ACK_PAGE"),
        SiebelApp.S_App.IsRwd() && r("GetAckApplet", "SWE_APPLET_STR"),
        r("GetRefreshViewURL", "SWE_PROP_REFRESH_VIEW_URL"),
        r("HeartBeatInterval", "SWE_PROP_HB_INTERVAL"),
        r("GetCookieName", "SWE_PROP_COOKIE_NAME"),
        r("GetUAN", "SWE_PROP_URL_APP_NAME"),
        r("GetULC", "SWE_PROP_URL_APP_LANG"),
        r("GetSessionId", "SWE_RPC_PROP_SESSION_NUMBER"),
        r("GetSRN", "SWE_PROP_SESSION_RANDOM_NUMBER"),
        r("UseCookie", "SWE_RPC_PROP_USE_COOKIE"),
        r("UseSecureCookie", "SWE_RPC_PROP_USE_SECURE_COOKIE"),
        r("GetPageURL", "SWE_PROP_PAGEURL"),
        r("GetAppExtension", "SWE_PROP_APPEXT"),
        r("GetVirtualDir", "SWE_PROP_VDIR"),
        r("GetLoginTimeStamp", "SWE_PROP_LOGIN_TIMESTAMP"),
        r("GetScriptDir", "SWE_PROP_SCRIPT_DIR"),
        r("GetSWEReqCount", "SWE_PROP_REQ_COUNT"),
        r("GetSWEReqCount", "SWE_COUNT_STR"),
        r("GetStandAloneClient", "SWE_PROP_STANDALONE_CLIENT"),
        r("GetAccessibilityEnhanced", "SWE_PROP_ACCESSIBILITY_ENHANCED"),
        r("GetHtmlPopupName", "SWE_PROP_HTML_POPUP_NAME"),
        r("GetPopupHDBrowser", "SWE_PROP_POPUP_HDBrowser"),
        r("GetCheckSum", "SWE_PROP_CHECKSUM"),
        r("GetCancelQueryTimeout", "SWE_PROP_CANCEL_QUERY_TIME_OUT"),
        r("GetPopupConSize", "SWE_PROP_POPUP_CON_SIZE"),
        r("GetStrictDate", "SWE_PROP_STRICT_DATE"),
        r("IsUIEnableDateError", "SWE_PROP_IS_ENABLE_UI_DATE_ERROR_DETECT"),
        r("UseAnsiCtrls", "SWE_PROP_USE_ANSI_CONTROLS"),
        r("IsMobileApplication", "SWE_IS_MOBILE_APPLICATION"),
        r("IsAutoOn", "SWE_IS_AUTO_ON"),
        r("IsEditSeedData", "SWE_IS_EDITSEEDDATA"),
        r("GetRequiredIndicator", "SWE_PROP_ICON_REQ_INDICATOR"),
        r("WPName", "SWE_PROP_WP_NAME"),
        r("ViewTarget", "SWE_VIEW_TARGET"),
        r("IsSui", "SWE_PROP_SUI_THEME"),
        r("IsUPTEnabled", "SWE_PROP_ENABLE_UPT"),
        r("IsInputCaptureEnabled", "UPT_INPUT_CAPTURE"),
        r("GetBusyTimer", "SWE_BUSY_TIMER"),
        r("IsListNavSync", "SWE_FORCE_SYNC_LIST_NAVIGATION"),
        r("GetEnableElasticGrid", "SWE_ENABLE_ELASTIC_GRID"),
        r("IsLabelResponsive", "SWE_RESPONSIVE_LABEL"),
        r("GetEnableLookAhead", "SWE_ENABLE_LOOK_AHEAD_SEARCH"),
        r("GetRecordingState", "SWE_PROP_KWD_RECORDING_STATE"),
        r("GetSessionWarnTimeout", "SWE_PROP_SESSION_WARN_TIMEOUT"),
        r("GetSessionTimeout", "SWE_PROP_SESSION_TIMEOUT"),
        r("GetTabId", "SWE_PROP_BROWSER_TAB_ID"),
        ct.prototype.GetScreenNavTitle = function () {
            return ""
        },
        ct.prototype.GetDetailCategoryTitle = function () {
            return ""
        },
        bt.call(this, this.GetVirtualDir());
        var i = n.GetProperty(t.get("SWE_MINOR_REL_VER1"));
        e.IsTrue(i) && (J = !0),
        n.PropertyExists(t.get("SWE_ENABLE_STRING_CACHE")) && (i = n.GetProperty(t.get("SWE_ENABLE_STRING_CACHE")), K = e.IsTrue(i)),
        i = n.GetProperty(t.get("SWE_PROP_PHONE_LEADING_ZERO"));
        if (i) {
            var s,
            o = " ";
            s = i.toString().split(",");
            for (var u = 0, a = s.length; u < a; u++) {
                var f = s[u];
                f && f[0] !== "+" && (f = "+" + f),
                lt[f] = o
            }
        }
    },
    ct.prototype.GetType = function () {
        return t.get("SWE_COMPOSER_APPLICATIONCONTEXT_TYPE")
    },
    ct.prototype.GetChildren = function () {
        var e = [],
        t = this.NavCtrlMngr(),
        n = this.GetCmdMgr(),
        r = n ? n.GetToolbar() : null,
        i = this.GetBusObj();
        return i && !$.isEmptyObject(i) && e.push(i),
        i = this.GetActiveView(),
        i && !$.isEmptyObject(i) && e.push(i),
        i = M,
        i && !$.isEmptyObject(i) && e.push(i),
        t && (i = t.GetscreenNavigationPM().Get("GetTabInfo"), i && !$.isEmptyObject(i) && e.push(i), i = t.GetdetailNavigationPM().Get("GetTabInfo"), i && !$.isEmptyObject(i) && e.push(i), i = t.GetPDQPM().ExecuteMethod("GetPDQItem"), i && !$.isEmptyObject(i) && e.push(i)),
        r && (i = r.ExecuteMethod("GetToolbarItems"), i && !$.isEmptyObject(i) && e.push(i)),
        i = B,
        i && !$.isEmptyObject(i) && e.push(i),
        t = null,
        n = null,
        i = null,
        e
    },
    ct.prototype.IsPhoneLeadingZeroAllowed = function (e) {
        return lt[e] ? !0 : !1
    },
    ct.prototype.SetCanInvokeMap = function (t) {
        var n = t.EnumProperties(!0);
        do
            st[n] = e.IsTrue(t.GetProperty(n));
        while (n = t.EnumProperties(!1))
    },
    ct.prototype.AppendToStrCache = function (e) {
        if (e && e !== "") {
            var t = [];
            CCFMiscUtil_StringToArray(e, t),
            w = w.concat(t)
        }
    },
    ct.prototype.AppendToLocalStrCache = function (e) {
        if (SiebelApp.S_App.isStringCacheEnabled()) {
            var n = SiebelApp.Utils.IndexOf(S, e);
            return n === -1 && (S.push(e), n = S.length - 1),
            t.get("SWE_INDEX_PREFIX") + n
        }
        return e
    },
    ct.prototype.LookupStringCache = function (e) {
        var n = "";
        return SiebelApp.S_App.isStringCacheEnabled() ? (e >= 0 && e < w.length ? n = w[e] : e && e[0] === t.get("SWE_INDEX_PREFIX") && (e = e.substring(1, e.length), n = S[e]), n) : e
    },
    ct.prototype.GetStringCache = function () {
        return w
    },
    ct.prototype.SetStringCache = function (e) {
        w = e
    },
    ct.prototype.GetSessionWLMethods = function () {
        return E
    },
    ct.prototype.GetNavLevel = function () {
        return tt
    },
    ct.prototype.GetPMPropSet = function () {
        return et
    },
    ct.prototype.SetPMPropSet = function (e) {
        et = et === null ? e : et,
        tt = tt.length === 0 ? (et ? et.GetProperty(t.get("SWE_NAV_EXPANDED_LEVEL")) || "" : "").split(",") : tt
    },
    ct.prototype.SetDiscardUserState = function (e) {
        P = e
    },
    ct.prototype.GetDiscardUserState = function () {
        return P
    },
    ct.prototype.GotoView = function (e, t, n, r, i, s, o) {
        return wt.call(this, e, t, n, r, i, s, o, "View")
    },
    ct.prototype.GotoPage = function (e, t, n, r, i, s, o) {
        return wt.call(this, e, t, n, r, i, s, o, "Page")
    },
    ct.prototype.HideLayout = function (e) {
        if (typeof e == "string")
            if (e.match(/SS_OpenUIReportPane/) || e.match(/SS_TaskUIPane/))
                $("#_sweview").removeClass("siebui-indent-content");
            else if (e.match(/TaskAssistant/)) {
                $("#_sweview").removeClass("siebui-indent-content");
                var t = SiebelApp.S_App.getExtObject("TaskAssistant");
                t && t.ExecuteMethod("Hide")
            } else if (e.match(/Dashboard/)) {
                $("#_sweview").removeClass("siebui-dashboard-content-indent");
                var t = SiebelApp.S_App.getExtObject("Dashboard");
                t && SiebelApp.S_App.UnregisterExtObject("Dashboard")
            } else if (e.match(/SS_ChatUI/))
                $("#SS_ChatUI").removeClass("siebui-chat-pane");
            else if (e.match(/CommunicationPanel/)) {
                var t = SiebelApp.S_App.getExtObject("CommunicationPanel");
                t && t.ExecuteMethod("Hide")
            }
        $("#" + e).html(""),
        SiebelApp.EventManager.fireEvent("forceResize")
    },
    ct.prototype.GenerateSrvrReq = function (n) {
        var r = CCFMiscUtil_CreatePropSet();
        r.SetProperty(t.get("SWE_CMD_ARG"), n),
        r.SetProperty(t.get("SWE_ARG_KEEP_CONTEXT"), "1"),
        this.SetDefaultArgs
        (r),
        r.SetProperty(t.get("SWE_COUNT_STR"), SiebelApp.S_App.GetSWEReqCount()),
        SiebelApp.S_App.OfflineCallMethod("GetSRN", r);
        var i = e.EncodeToQueryString(r, !1),
        s = SiebelApp.S_App.GetPageURL() + t.get("SWE_ARG_START") + i;
        return s
    },
    ct.prototype.CanLeaveMainView = function () {
        var e = !0,
        t = this.GetActiveView();
        return t && !t.SetActiveApplet(null) && (e = !1),
        e
    },
    ct.prototype.GetSWEReqCount = function () {
        return "1"
    },
    ct.prototype.GetRequestDefault = function () {
        var e = CCFMiscUtil_CreatePropSet();
        return this.SetDefaultArgs(e),
        e.SetProperty(t.get("SWE_VIEW_ID_ARG"), ""),
        e
    },
    ct.prototype.SetDefaultArgs = function (n) {
        n.SetProperty(t.get("SWE_VIEW_RPC_ARG"), "1"),
        n.SetProperty(t.get("SWE_PROP_SESSION_RANDOM_NUMBER"), this.GetSRN()),
        e.IsEmpty(SiebelApp.S_App.GetTabId()) || n.SetProperty(t.get("SWE_PROP_BROWSER_TAB_ID"), this.GetTabId());
        var r = this.GetSWEReqCount();
        isNaN(r) || n.SetProperty(t.get("SWE_COUNT_STR"), r);
        if (!this.GetPopupPM().IsPopupStarted() && this.GetActiveView() && this.GetActiveView().GetActiveApplet() && !this.GetPopupPM().Get("isCurrencyOpen") && !e.IsTrue(n.GetProperty(t.get("SWE_BUSINESS_SERVICE")))) {
            e.IsEmpty(n.GetProperty(t.get("SWE_ACTIVE_APPLET_STR"))) && n.SetProperty(t.get("SWE_ACTIVE_APPLET_STR"), this.GetActiveView().GetActiveApplet().GetName());
            var i = n.GetProperty(t.get("SWE_APPLET_STR")),
            s = !e.IsEmpty(B[i]);
            e.IsEmpty(n.GetProperty(t.get("SWE_ACTIVE_VIEW_STR"))) && !s && n.SetProperty(t.get("SWE_ACTIVE_VIEW_STR"), this.GetActiveView().GetName())
        } else !e.IsTrue(n.GetProperty(t.get("SWE_BUSINESS_SERVICE"))) && !n.GetProperty(t.get("SWE_ACTIVE_APPLET_STR")) && SiebelApp.S_App.PortletSessionMgr && G && n.SetProperty(t.get("SWE_ACTIVE_APPLET_STR"), G.GetName());
        this.GetActiveView() != null && !e.IsEmpty(n.GetProperty(t.get("SWE_VIEW_ARG"))) && (e.IsTrue(this.GetActiveView().IsFragment()) && n.SetProperty("SWEF", "1"), e.IsEmpty(this.GetActiveView().GetApp()) || n.SetProperty("SWEApp", this.GetActiveView().GetApp()))
    },
    ct.prototype.OnLoadViewContent = function (n, r) {
        try {
            SiebelApp.EventManager.cleanListners("gridresize"),
            SiebelApp.EventManager.fireEvent("preload");
            var i;
            e.IsEmpty(r) ? i = this.GetActiveView() : (i = u[r], SiebelApp.S_App.SetActiveView(i));
            if (!e.IsEmpty(i)) {
                e.IsTrue(SiebelApp.S_App.GetAccessibilityEnhanced()) && e.IsEmpty(r) && $("[name= _sweview]").attr({
                    role: "main",
                    title: s.GetViewSummary()
                }),
                i.SetTarget(n),
                i.Initialize();
                if (SiebelApp.S_App.IsRwd()) {
                    var o = "[id=" + SiebelApp.S_App.ViewTarget() + "]";
                    typeof i.GetRepstrName == "function" && $(o).attr("rn", i.GetRepstrName()),
                    typeof i.GetUIName == "function" && $(o).attr("un", i.GetUIName()),
                    typeof i.GetObjectType == "function" && $(o).attr("ot", i.GetObjectType())
                } else
                    typeof i.GetRepstrName == "function" && $("[name=_sweview]").attr("rn", i.GetRepstrName()), typeof i.GetUIName == "function" && $("[name=_sweview]").attr("un", i.GetUIName())
            } else
                SiebelApp.S_App.NavCtrlMgr.Show(!0);
            if (SiebelApp.S_App.IsMobileApplication() !== "true") {
                var a = SiebelApp.S_App.IsRwd(),
                f = SiebelApp.S_App.NavCtrlMgr.GetscreenNavigationPM(),
                l = a ? $("#" + f.Get("placeholder") + ".siebui-nav-tree") : $("#_swescrnbar");
                if (f && !l.hasClass("addshowactivated")) {
                    var c = SiebelApp.S_App.GetDirection(),
                    h = '<a href="#" id="sidebarOpenButton" title="Open Sidebar" class="sidebarNavButton hidden"' + (e.IsTrue(SiebelApp.S_App.IsAutoOn()) ? t.get("SWE_PROP_AUTOM_OT") + '="Link" ' + t.get("SWE_PROP_AUTOM_RN") + '="Tree Open SideBar" ' : "") + ">" + "</a>",
                    p = a ? $("#" + SiebelApp.S_App.ViewTarget()) : $("#_swecontent"),
                    d = $("#" + f.Get("placeholder") + ".siebui-nav-tree");
                    l.prepend(h),
                    l.addClass(c ? "siebui-rtl-screenbar addshowactivated" : "addshowactivated"),
                    p.removeClass("siebui-max-width"),
                    h = '<a href="#" class="sidebarNavButton" id="sidebarCloseButton" title="' + SiebelApp.S_App.LocaleObject.GetLocalString("TREE_CLOSE_SIDEBAR") + '" ' + (e.IsTrue(SiebelApp.S_App.IsAutoOn()) ? t.get("SWE_PROP_AUTOM_OT") + '="Button" ' + t.get("SWE_PROP_AUTOM_RN") + '="Tree Close SideBar" ' : "") + ">" + "</a>",
                    d.prepend(h);
                    var v = $("#sidebarOpenButton"),
                    m = $("#sidebarCloseButton");
                    e.IsTrue(SiebelApp.S_App.IsAutoOn()) && $("#sidebarOpenButton").data("data-autom-parent", "SiebScreenTabs"),
                    m.on("click", function (e) {
                        l.addClass("siebui-closed"),
                        v.removeClass("hidden"),
                        a && m.addClass("hidden"),
                        m.css("Display", "none"),
                        p.addClass("siebui-max-width"),
                        $("[id^='gview_s']").resize()
                    }),
                    v.on("click", function (e) {
                        l.removeClass("siebui-closed"),
                        v.addClass("hidden"),
                        a && m.removeClass("hidden"),
                        p.removeClass("siebui-max-width").addClass(c ? "siebui-rtl-content" : ""),
                        d.css("display", ""),
                        $("[id^='gview_s']").resize()
                    })
                }
            }
            var g = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: t.get("SWE_PST_COMM_TOOLBAR")
                });
            if (SiebelApp.S_App.CommToolbar && !g) {
                var y = CCFMiscUtil_CreatePropSet();
                y.SetProperty(t.get("SWE_UIDEF_PM_CTR"), "siebel/commToolbarpmodel"),
                y.SetProperty(t.get("SWE_UIDEF_PR_CTR"), "siebel/commToolbarprender"),
                SiebelAppFacade.ComponentMgr.MakeComponent(this, y, SiebelApp.S_App.CommToolbar),
                (g = SiebelAppFacade.ComponentMgr.FindComponent({
                            id: t.get("SWE_PST_COMM_TOOLBAR")
                        })) && g.Show()
            }
            SiebelApp.S_App.IsRwd() && this.GetCmdMgr().Show(),
            this.GetActiveView() && this.GetActiveView().GetInvokeMethod() && this.GetCmdMgr().InvokeCommand(this.GetActiveView().GetInvokeMethod())
        } catch (b) {
            SiebelJS.Log(b)
        }
        finally {
            SiebelApp.EventManager.fireEvent("postload"),
            this.uiStatus.Free();
            var w = $("#_sweview").find("iframe");
            w.length > 1 && w.addClass("siebui-multi-frame"),
            w = null
        }
    },
    ct.prototype.OnLoadExternalObject = function (e) {
        try {
            switch (e) {
            case "SS_TaskUIPane":
                if ($("#taskList").hasClass("tasklist1")) {
                    var t = SiebelApp.S_App.getExtObject("TaskUIPane");
                    t && (Et.call(this), t.Show())
                }
                break;
            case "TaskAssistant":
                var t = SiebelApp.S_App.getExtObject("TaskAssistant");
                t && (Et.call(this), t.Show());
                break;
            case "Dashboard":
                var t = SiebelApp.S_App.getExtObject("Dashboard");
                t && (St.call(this), t.Show());
                break;
            case "SS_OpenUIReportPane":
                if ($("#reportList").hasClass("siebui-report-list")) {
                    var t = SiebelApp.S_App.getExtObject("ReportPane");
                    t && (Et.call(this), t.Show())
                }
                break;
            case "SS_ChatUI":
                var t = SiebelApp.S_App.getExtObject("ChatPane");
                t && (xt.call(this), t.Show());
                break;
            case "CommunicationPanel":
                var t = SiebelApp.S_App.getExtObject("CommunicationPanel");
                t && t.Show()
            }
        } catch (
            n) {
            SiebelJS.Log(n)
        }
        finally {
            SiebelApp.EventManager.fireEvent("forceResize"),
            SiebelApp.EventManager.fireEvent("posteoiload"),
            this.uiStatus.Free()
        }
    },
    ct.prototype.RegisterExtObject = function (e) {
        var n = e.GetProperty(t.get("SWE_PST_EXT_OBJ_INFO")),
        r = this.getExtObject(n);
        if (r)
            return r.Object;
        r = {};
        switch (n) {
        case "TaskUIPane":
            var i = new SiebelAppFacade.TaskPresentationModel;
            i.Init(),
            r.TYPE = n,
            r.Object = i;
            break;
        case "TaskAssistant":
            var s = new SiebelAppFacade.TaskAssistPlayerPM;
            s.Init(),
            r.TYPE = n,
            r.Object = s;
            break;
        case "Dashboard":
            var o = new SiebelAppFacade.DashboardPM;
            o.Init(),
            r.TYPE = n,
            r.Object = o;
            break;
        case "ReportPane":
            var u = new SiebelAppFacade.ReportPresentationModel;
            u.Init(),
            r.TYPE = n,
            r.Object = u;
            break;
        case "ChatPane":
            var a = new SiebelAppFacade.ChatPresentationModel;
            a.Init(),
            r.TYPE = n,
            r.Object = a;
            break;
        case "CommunicationPanel":
            var f = new SiebelAppFacade.CommunicationPanelPM;
            f.Init(),
            r.TYPE = n,
            r.Object = f
        }
        return k.push(r),
        r.Object
    },
    ct.prototype.getExtObject = function (e) {
        var t = k.length;
        for (var n = 0; n < t; n++)
            if (k[n].TYPE === e)
                return k[n].Object;
        return null
    },
    ct.prototype.UnregisterExtObject = function (e) {
        var t = k.length;
        for (var n = 0; n < t; n++)
            if (k[n].TYPE === e) {
                k.splice(n, 1);
                return
            }
    },
    ct.prototype.CanInvokeMethod = function (e) {
        var t = !0;
        return st.hasOwnProperty(e) && (t = st[e]),
        SiebelApp.UserActionRecorder ? e === "ShowNonTrackableElement" ? t = !SiebelApp.UserActionRecorder.GetInvalidElState() : e === "HideNonTrackableElement" && (t = SiebelApp.UserActionRecorder.GetInvalidElState()) : this.GetScriptDebuggerMgr().IsMethodSupported(e) && (t = this.GetScriptDebuggerMgr().CanInvokeMethod(e)),
        t
    },
    ct.prototype.LogOff = function () {
        var n = this.GetActiveView();
        if (n && !n.SetActiveApplet(null))
            return !1;
        if (!SiebelApp.S_App.GetTimer())
            return this.OnUnLoadApp(), !0;
        var r = this,
        i = {};
        i.type = "POST";
        var s = SiebelApp.S_App.GetTimer().GetLogBuffer(),
        o = SiebelApp.S_App.GetPageURL(),
        u = SiebelApp.S_App.GetSRN(),
        a = "SWECmd=InvokeMethod&SWEMethod=WritePerfLog&SRN=" + u + "&" + t.get("SWE_PERF_LOG_DATA") + "=" + URLEncode(s);
        e.IsEmpty(SiebelApp.S_App.GetTabId()) || (a += "&" + t.get("SWE_PROP_BROWSER_TAB_ID") + t.get("SWE_ARG_EQUAL") + SiebelApp.S_App.GetTabId()),
        $.ajax({
            type: "POST",
            url: o,
            data: a,
            processData: !1,
            complete: r.OnUnLoadApp
        })
    },
    ct.prototype.OnUnLoadApp = function () {
        var n = "",
        r = "1",
        i = new Date;
        n = n + SiebelApp.S_App.GetPageURL() + "?SWECmd=Logoff&SWETS=" + i.valueOf() + "&SWEPreLd=" + r,
        e.IsEmpty(SiebelApp.S_App.GetTabId()) || (n += "&" + t.get("SWE_PROP_BROWSER_TAB_ID") + t.get("SWE_ARG_EQUAL") + SiebelApp.S_App.GetTabId()),
        SiebelApp.S_App.IsConfigMode() ? top.location.replace(n) : window.location.replace(n)
    },
    ct.prototype.SetCancelableRPCInfo = function (e, n) {
        var r = SiebelApp.S_App.GetActiveView();
        SiebelApp.S_App.GetCancelQueryTimeout() > -1 && "ExecuteNamedQuery" === e && r && r.CanCancelQuery() && n.SetProperty(t.get("SWE_PROP_CANCELABLE_RPC"), "1")
    },
    ct.prototype.InvokeMethod = function (n, r, i) {
        var s = !0;
        r = r || CCFMiscUtil_CreatePropSet();
        var o = r.Clone(),
        u = this.GetMainView();
        s = Gt.call(this, n, o);
        if (!s)
            return !1;
        var a = {},
        f = this;
        typeof i == "object" || i === !0 || i === !1 ? (a.scope = this, a.args = [], a.args.push(n), a.args.push(o), a.async = typeof i.async == "boolean" ? i.async : i, a.selfbusy = i.selfbusy || !1, a.mask = i.mask || !1, a.cb = function () {
            var e = Array.prototype.slice.call(arguments),
            t;
            e.push(f.PostExecute.apply(f, arguments)),
            typeof i.scope != "undefined" && typeof i.scope.cb == "function" && i.scope.cb.apply(i.scope || null, e),
            e[0] === "ExecuteNamedQuery" && (SiebelApp.S_App.uiStatus.Free(), t = SiebelApp.S_App.GetPopupPM(), t && ($("div[name=popup]").removeData("InitDlg"), t.ExecuteMethod("OnExecuteQuery"))),
            ["StartRecording", "PauseRecording", "CancelRecording", "ResumeRecording", "StopRecording"].indexOf(e[0]) !== -1 && SiebelApp.UserActionRecorder.NotifyStateChange(e[0])
        }) : a = undefined;
        switch (n) {
        case "StartRecording":
        case "PauseRecording":
        case "ResumeRecording":
        case "CancelRecording":
        case "StopRecording":
            var l,
            c;
            l = CCFMiscUtil_CreatePropSet(),
            l.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_INVOKE_METHOD_STR")),
            l.SetProperty(t.get("SWE_METHOD_STR"), n),
            l.SetProperty(t.get("UPT_EVENT_SOURCE"), "Recording"),
            l.SetProperty("Event Context", n),
            SiebelApp.S_App.CallServer(l, c, !0, a);
            break;
        case "ShowNonTrackableElement":
            SiebelApp.UserActionRecorder && SiebelApp.UserActionRecorder.GetRec() && (SiebelApp.UserActionRecorder.GetInvalidElState() ? SiebelApp.UserActionRecorder.SetInvalidElState(!1) : (SiebelApp.UserActionRecorder.SetInvalidElState(!0), SiebelApp.UserActionRecorder.IdentifyInvalidEl()));
            break;
        case "HideNonTrackableElement":
            SiebelApp.UserActionRecorder && SiebelApp.UserActionRecorder.SetInvalidElState(!1);
            break;
        case "ShowRecordedScripts":
            SiebelApp.UserActionRecorder && SiebelApp.UserActionRecorder.ShowHideAutomationApplet();
            break;
        case "DisplayContextHelp":
            SiebelApp.ContextHelpMgr && SiebelApp.ContextHelpMgr.DisplayHelpFrame();
            break;
        case "Query":
            var h = r.Applet;
            delete r.Applet,
            h.GetBusComp().HandleQuery(r),
            Yt.call(this, n, o);
            break;
        case "ExecuteNamedQuery":
            var m = CCFMiscUtil_CreatePropSet();
            o.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_INVOKE_METHOD_STR")),
            o.SetProperty(t.get("SWE_METHOD_STR"), n),
            o.SetProperty(t.get("SWE_INPUT_PROP_SET_STR"), o.EncodeAsString()),
            o.SetProperty(t.get("SWE_VIEW_RPC_ARG"), "1"),
            SiebelApp.S_App.uiStatus.Busy({
                timeOut: !1,
                mask: !0,
                loadMsg: !0
            });
            var g;
            if (u) {
                g = u.GetActiveApplet();
                if (g && g.GetBusComp()) {
                    var y = CCFMiscUtil_CreatePropSet();
                    if (!g.InvokeMethod("ImplicitCommit", y)) {
                        s = !1;
                        break
                    }
                }
                if (g) {
                    this.SetCancelableRPCInfo(n, o);
                    var b = o.GetProperty(t.get("SWE_PROP_CANCELABLE_RPC"));
                    if (e.IsTrue(b)) {
                        scope = g;
                        var w = setTimeout(function () {
                                scope.ProcessCancelQueryPopup(),
                                scope = null
                            }, 1e3 * parseInt(SiebelApp.S_App.GetCancelQueryTimeout(), 10));
                        Tt.call(this, w)
                    }
                }
            }
            SiebelApp.S_App.CallServer(o, m, !0, a),
            typeof i == "undefined" && SiebelApp.S_App.uiStatus.Free();
            break;
        case "CanLeaveMainView":
            s = this.CanLeaveMainView(),
            Yt.call(this, n, o);
            break;
        case "NextApplet":
            u && u.CycleActiveApplet(!1),
            Yt.call(this, n, o);
            break;
        case "PrevApplet":
            u && u.CycleActiveApplet(!0),
            Yt.call(this, n, o);
            break;
        case "GotoAppletMenu":
            if (u) {
                var E = u.GetActiveApplet();
                E.GetMenu() && E.GetMenu().OnMenuInvoke(t.get("APPLET_NAME"), t.get("SWE_PREPARE_APPLET_MENU"), t.get("SWE_MENU_APPLET"))
            }
            Yt
            .call(this, n, o);
            break;
        case "GotoApplicationMenu":
            if (M) {
                var S = M.GetPM().Get("GetPlaceHolder");
                $("#" + S).children().eq(0).children().eq(0).focus()
            }
            Yt.call(this, n, o);
            break;
        case "GotoCTIToolBar":
            var x = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: t.get("SWE_PST_COMM_TOOLBAR")
                });
            x && x.ExecuteMethod("HandleGotoCTIToolbar"),
            Yt.call(this, n, o);
            break;
        case "GotoChatPane":
            var T = SiebelApp.S_App.getExtObject("ChatPane");
            T && T.ExecuteMethod("SetFocus"),
            Yt.call(this, n, o);
            break;
        case "GotoSelectedTreeNode":
            this.CanLeaveMainView() && u && u.GotoSelectedTreeNode();
            break;
        case "ViewList":
            SiebelApp.S_App.NavCtrlMgr.GetVisPM().GetRenderer().SetFocus(),
            Yt.call(this, n, o);
            break;
        case "Logoff":
            s = this.LogOff();
            break;
        case "GotoScrnTab":
            SiebelApp.S_App.NavCtrlMgr.FocusNavLink(t.get("SWE_SCREEN_NAV_CONTROL_STR"));
            break;
        case "GotoViewTab":
            SiebelApp.S_App.NavCtrlMgr.FocusNavLink(t.get("SWE_DET_VIEW_NAV_CONTROL_STR"));
            break;
        case "GotoSubViewTab":
            SiebelApp.S_App.IsRwd() ? SiebelApp.S_App.NavCtrlMgr.FocusNavLink(t.get("SWE_DET_SUB_VIEW_NAV_CONTROL_STR")) : $("#s_vctrl_div_tabView ul  li ").children().eq(0).focus();
            break;
        default:
            if (this.GetScriptDebuggerMgr().IsMethodSupported(n))
                return s = this.GetScriptDebuggerMgr().InvokeMethod(n), s;
            if (n === p || n === d) {
                var g;
                u && (g = u.GetActiveApplet());
                if (g && g.GetBusComp() && g.GetBusComp().IsInQueryState()) {
                    var y = CCFMiscUtil_CreatePropSet();
                    g.InvokeMethod(v, y)
                }
            }
            var N;
            N = this.CallServerApp(n, o, a);
            if (typeof i == "undefined") {
                var r = [];
                return r.push(n),
                r.push(o),
                r.push(N),
                s = this.PostExecute.apply(this, r),
                SiebelApp.S_App.uiStatus.Free(),
                s
            }
        }
        return s
    },
    ct.prototype.PostExecute = function (n, r, i) {
        var s = Nt.call(this),
        o = r.GetProperty(t.get("SWE_PROP_CANCELABLE_RPC"));
        e.IsTrue(o) && !e.IsEmpty(s) && clearTimeout(s);
        if (i === null)
            return !1;
        if (n == "GetProfileAttr") {
            var u;
            u = r.GetPropertyAsStr("attrName");
            if (u == "GetJSAddBarDisable")
                if (strResult == "FALSE" || strResult == "False")
                    return !1
        }
        var a = Yt.call(this, n, r);
        return a
    },
    ct.prototype.SWECount = 0,
    ct.prototype.OnLoadViewContainer = function (n) {
        (function () {
            var r = $("[name=" + n + "]");
            SiebelApp.S_App.IsRwd() && (n ? r = $("#" + n) : SiebelApp.S_App.PortletSessionMgr && (r = $("body"))),
            ct.prototype.GetTargetViewContainer = function () {
                return r
            },
            ct.prototype.SetNextTargetViewContainer = function (n) {
                if (SiebelApp.S_App.IsRwd())
                    r = $("#SiebAppContainer");
                else {
                    r = $("[name=" + n + "]"),
                    r.length === 0 && $("#" + n[n.length - 1]);
                    if (r.length === 0 && n !== "top") {
                        $(_swecontent).append("<div name='" + n + "'/>"),
                        r = $("[name=" + n + "]");
                        var i = {
                            autoOpen: !1,
                            modal: !0,
                            close: function (e, t) {
                                r.remove()
                            },
                            beforeClose: function (n, r) {
                                var i = $(n.target),
                                s = i.attr("frag_app"),
                                f = i.attr("frag_view");
                                if (e.IsEmpty(f) && e.IsEmpty(s))
                                    return;
                                i.removeAttr("frag_app").removeAttr("frag_view");
                                var l = CCFMiscUtil_CreatePropSet(),
                                c = CCFMiscUtil_CreatePropSet(),
                                h = {
                                    async: !0,
                                    opdecode: !1,
                                    mask: !1
                                };
                                l.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_LOGOFF")),
                                l.SetProperty("SWEF", "1"),
                                e.IsEmpty(f) || (f = f.split("%20").join(" "), l.SetProperty(t.get("SWE_VIEW_ARG"), e.UrlDecode(f))),
                                e.IsEmpty(s) || (s = s.split("%20").join(" "), l.SetProperty(t.get("SWEApp"), e.UrlDecode(s))),
                                SiebelApp.S_App.CallServer(l, c, !1, h);
                                if (!e.IsEmpty(f)) {
                                    SiebelApp.S_App.GetActiveView().GetName() == f && (SiebelApp.S_App.GetActiveView().EndLife(), SiebelApp.S_App.SetActiveView(o)),
                                    delete u[f],
                                    delete a[f];
                                    var p = SiebelAppFacade.ComponentMgr.FindComponent({
                                            id: f
                                        });
                                    p && (p.GetPM && p.GetPM() && p.GetPM().EndLife(), SiebelAppFacade.ComponentMgr.DeleteComponent(p, SiebelApp.S_App))
                                }
                            }
                        },
                        s = r.dialog(i);
                        s.dialog("open");
                        if (e.IsTrue(SiebelApp.S_App.IsAutoOn())) {
                            var f = r.parent().find(".ui-icon-closethick");
                            f.length > 0 && f.attr({
                                ot: "button",
                                rn: "SampleTarget_PopupClose",
                                un: "PopupClose"
                            })
                        }
                    }
                }
            },
            ct.prototype.updateTargetViewContainer = function (n, r, i, s) {
				/*if (SiebelApp.contentUpdater.callBackMap[n] !== undefined && SiebelApp.contentUpdater.callBackMap[n].map(el => el.handler.toString().replace(/\r?\n/g, "")).includes('function () {                        o.resolveWith(this, ["LayoutDone"]),                        r === !0 && this.OnLoadViewContent(),                        SiebelApp.S_App.IsRwd() && i === !0 && this.OnLoadPageContent(),                        SiebelApp.LayoutTransitionsMgr && typeof SiebelApp.LayoutTransitionsMgr.ShowTransition == "function" && SiebelApp.LayoutTransitionsMgr.ShowTransition(e)                    }')){
					return;
				}*///ADUSALIN
                var o = new $.Deferred,
                u,
                a,
                f;
                SiebelApp.contentUpdater.AddCallBack(n, function (e) {
                    return function () {
                        o.resolveWith(this, ["LayoutDone"]),
                        r === !0 && this.OnLoadViewContent(),
                        SiebelApp.S_App.IsRwd() && i === !0 && this.OnLoadPageContent(),
                        SiebelApp.LayoutTransitionsMgr && typeof SiebelApp.LayoutTransitionsMgr.ShowTransition == "function" && SiebelApp.LayoutTransitionsMgr.ShowTransition(e)
                    }
                }
                    (this.GetTargetViewContainer().attr("id")), this, s),
                SiebelApp.LayoutTransitionsMgr && typeof SiebelApp.LayoutTransitionsMgr.Setup == "function" && SiebelApp.LayoutTransitionsMgr.Setup(this.GetTargetViewContainer().attr("id")),
                this.GetTargetViewContainer().attr("src", n),
                u = e.DecodeFromQueryString(n);
                if (e.IsTrue(u.GetProperty(t.get("SWEF")))) {
                    a = u.GetProperty(t.get("SWEApp")),
                    f = u.GetProperty(t.get("SWE_VIEW_ARG")),
                    e.IsEmpty(a) || this.GetTargetViewContainer().attr("frag_app", a);
                    if (!e.IsEmpty(f)) {
                        this.GetTargetViewContainer().attr("frag_view", f);
                        var l = $("#_sweview"),
                        c = l.offset(),
                        h = l.height(),
                        p = l.width();
                        this.GetTargetViewContainer().dialog("widget").css({
                            height: h + "px",
                            width: p + "px",
                            margin: 0,
                            top: c.top + "px",
                            left: c.left + "px"
                        })
                    }
                }
                return SiebelApp.contentUpdater.loadContent(null, null, null, s),
                o.promise()
            }
        })();
        if (SiebelApp.S_App.IsMsgBarEnabled() && j === null) {
            var r = function () {},
            i = new r;
            i.GetName = function () {
                return "MsgBarPxy"
            },
            j = new SiebelAppFacade.MsgBrdCstPresentationModel(i);
            var s = CCFMiscUtil_CreatePropSet();
            s.SetProperty("SWE_OUI_RENDERER", "MsgBrdCstPhyRenderer"),
            j.Init(),
            j.Setup(s.Clone()),
            j.Show()
        }
    },
    ct.prototype.GetLayoutURL = function (n, r, i, s, o, u) {
        var a = t.get("SWE_RPC_PROP_NEW_LAYOUT"),
        f = t.get("SWE_ARG_EQUAL"),
        l = t.get("SWE_ARG_DELIM"),
        c = s.GetProperty(t.get("SWE_LAYOUT_IDENTIFIER")) || "",
        h = s.GetProperty(t.get("SWE_RPC_PROP_VIEW")),
        p = s.GetProperty(t.get("SWE_LAYOUT_URL_SUFFIX")) || "";
        c = URLEncode(c);
        if (n === a) {
            var d;
            return d = this.GetPageURL() + t.get("SWE_ARG_START") + t.get("SWE_CMD_ARG") + f + (e.IsEmpty(o) ? t.get("SWE_GET_VIEW_LAYOUT") : t.get("SWE_GET_APPLET_LAYOUT")) + l + t.get("SWE_VIEW_ARG") + f + r + l + t.get("SWE_VIEW_ID_ARG") + f + i + l + t.get("SWE_VIEW_CHK_SUM_ARG") + f + this.GetCheckSum() + l + t.get("SWE_APPLET_STR") + f + (o || "") + l + t.get("SWE_LAYOUT_IDENTIFIER") + f + c + (!e.IsEmpty(o) && navigator.userAgent.indexOf("Trident") >= 0 ? l + "_" + f + (new Date).getTime() : "") + p,
            d
        }
    },
    ct.prototype.NavCtrlMngr = function () {
        return x
    },
    ct.prototype.GetDrilldownURL = function (n) {
        this.SetDefaultArgs(n),
        n.SetProperty(t.get("SWE_COUNT_STR"), this.GetSWEReqCount
            ()),
        n.SetProperty(t.get("SWE_VIEW_ID_ARG"), ""),
        n.SetProperty(t.get("SWE_METHOD_STR"), t.get("SWE_CMD_DRILLDOWN_STR")),
        n.SetProperty(t.get("SWE_REQ_ROW_ID_STR"), "1"),
        n.SetProperty(t.get("SWE_ACTIVE_VIEW_STR"), this.GetActiveView().GetName()),
        n.SetProperty(t.get("SWE_VIEW_ARG"), this.GetActiveView().GetName()),
        n.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_CMD_INVOKE_METHOD_STR")),
        n.SetProperty(t.get("SWE_POPUP_VECTOR_STR"), "");
        var r = e.EncodeToQueryString(n);
        return this.GetAppExtension() + "?" + r
    },
    ct.prototype.DelegateResponse = function (r, i, s, o) {
        var a = new $.Deferred,
        f = [],
        h = [],
        p = null;
        SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && (SiebelApp.S_App.GetTimer().TimeGoToView("", "Have Object Info"), SiebelApp.S_App.GetTimer().TimeServerNotification("Received Server Notifications"), SiebelApp.S_App.GetTimer().TimePopupApplet("", "Have Object Info"));
        var d = t.get("SWE_RPC_PROP_NEW_LAYOUT"),
        v = t.get("SWE_RPC_PROP_NEW_APPLET_LAYOUT"),
        m = t.get("SWE_RPC_PROP_REFRESH_LAYOUT"),
        g = t.get("SWE_RPC_PROP_CONFIRM_DIALOG"),
        y = t.get("SWE_RPC_PROP_NEW_PAGE"),
        b = t.get("SWE_RPC_PROP_NEW_POPUP"),
        w = t.get("SWE_RPC_PROP_CLOSE_POPUP"),
        E = t.get("SWE_PST_NAV_CTRL_INFO"),
        S = t.get("SWE_RPC_PROP_NOTIFICATION"),
        T = t.get("SWE_PST_EXT_OBJ_INFO"),
        N = t.get("SWE_RPC_PROP_COMMAND_MGR"),
        C = t.get("SWE_HIST_OUI_UPDATE_INFO"),
        k = t.get("SWE_OUI_PRINT_DATA"),
        L = t.get("SWE_PST_CLIENT_DESCRIPTOR_INFO"),
        A = t.get("SWE_RPC_PROP_TOGGLE_LAYOUT"),
        O = t.get("SWE_RPC_PROP_STATUS_ERROR"),
        M = t.get("SWE_RPC_PROP_TARGET"),
        D = t.get("SWE_RPC_APPLET_NOTIFICATIONS"),
        P = t.get("SWE_APPLICATION_PM_PS"),
        H = t.get("SWE_RPC_VIEW_NOTIFICATIONS"),
        B = t.get("SWE_RPC_APP_NOTIFICATIONS"),
        j = t.get("SWE_RPC_PAGE_NOTIFICATIONS"),
        F = t.get("SWE_PROP_TOGGLE_CONFIG_MODE"),
        I = t.get("SWE_RPC_HIDE_BROWSER_FRAME"),
        q = CCFMiscUtil_CreatePropSet(),
        R = SiebelAppFacade.EJSAdapter;
        r instanceof JSSPropertySet ? q = r : q.DecodeFromString(r);
        if (e.IsTrue(q.GetProperty(t.get("SWERESPONSE_ERROR_STR"))))
            return e.Alert(q.GetProperty(t.get("SWERESPONSE_ERROR_MSG"))), this.uiStatus.Free(), a.resolve(), a.promise();
        if (!e.IsEmpty(q.GetProperty(t.get("SWE_RPC_PROP_ALERT_MSG")))) {
            var U = HtmlDecode(q.GetProperty(t.get("SWE_RPC_PROP_ALERT_MSG")));
            if (!e.IsEmpty(q.GetProperty(t.get("SWE_RPC_PROP_TIMEOUT")))) {
                $("#_sweclient").styleHide();
                var z = document.getElementById("_sweview");
                z.parentNode.removeChild(z),
                setTimeout(function (e, t) {
                    t.Alert(e)
                }
                    .bind(this, U, e), 0)
            } else
                e.Alert(U)
        }
        var W = q.GetProperty(t.get("SWE_RPC_PROP_STATUS")),
        X = this.GetPopupPM();
        W === w ? X.ExecuteMethod("ProcessClearPopup", q) : W === O && X.SetProperty("forceClosePopup", !0);
        var V = q.GetProperty(t.get("SWE_PROP_SESSION_RANDOM_NUMBER"));
        V && W === O && this.GetSRN && e.IsEmpty(this.GetSRN()) && (ct.prototype.GetSRN = function () {
            return V
        }),
        W === O && At.call(this, q, i);
        var J = e.Curry(ct.prototype.DefineAccessor, ct.prototype, q);
        J("GetSWEReqCount", "SWE_PROP_REQ_COUNT"),
        J("GetSWEReqCount", "SWE_COUNT_STR");
        var K = null,
        Q = null,
        G = null,
        Y,
        Z = q.GetChildCount();
        for (var et = 0; et < Z; et++) {
            var tt = q.GetChild(et),
            nt = tt.GetType();
            switch (nt) {
            case H:
                SiebelApp.S_App.IsRwd() && this.GetActiveView() && this.GetActiveView().DispatchNotification(tt);
                break;
            case B:
                SiebelApp.S_App.IsRwd() && Ct.call(this, tt);
                break;
            case j:
                SiebelApp.S_App.IsRwd() && kt.call(this, tt);
                break;
            case S:
                Ft.call(this, tt);
                break;
            case D:
                jt.call(this, tt);
                break;
            case n:
                K = tt;
                if (K !== null) {
                    var rt = K.GetChildByType(t.get("SWE_PST_STR_CACHE"));
                    rt !== null && this.AppendToStrCache(rt.GetProperty(t.get("SWE_PROP_VALUE")));
                    if (e.IsTrue(this.IsAutoOn())) {
                        var it = K.GetChildByType(t.get("SWE_PROP_PICK_CACHE"));
                        SiebelApp.S_App.TranslationTable && it !== null && SiebelApp.S_App.TranslationTable.CreateCache(it)
                    }
                }
                break;
            case E:
                x.HandleResponsePS(tt.Clone()),
                x.ProcessObjectInfo(tt);
                break;
            case T:
                var st = this.getExtObject(tt.GetProperty(t.get("SWE_PST_EXT_OBJ_INFO")));
                st ? st.HandleNotify(tt.GetChild(0)) : (st = this.RegisterExtObject(tt), st && st.Setup(tt.GetChild(0)));
                break;
            case N:
                SiebelApp.S_App.IsRwd() ? this.GetCmdMgr().ProcessRWDNotifications(tt) : this.GetCmdMgr().ProcessNotifications(tt);
                break;
            case C:
                _.ProcessObjectInfo(tt);
                break;
            case P:
                this.SetPMPropSet(tt.Clone());
                break;
            case k:
                var ot = q.GetChildByType(L);
                R.GenerareEJSPrint(tt, ot)
            }
        }
        if (q.GetProperty(t.get("SWE_ALARM_NOTI"))) {
            var ut = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: "Alarm Reminder Applet"
                });
            ut && ut.GetPM().ExecuteMethod("notifyAlarm")
        }
        var at,
        ft;
        switch (W) {
        case d:
            if (SiebelApp.S_App.IsRwd())
                K && (G = K.GetChildByType(t.get("SWE_PST_NEW_VIEW")), G ? (Q = G.GetChildByType(t.get("SWE_PST_VIEW_INFO")), Q && (Y = Q.GetProperty(t.get("SWE_PROP_TMPL_ITM_HOLDER")))) : Y = "External." + q.GetProperty("ViewId")), at = _t.call(this, Y, h), f.push(this.ProcessNewLayout(q, at)), p = "refreshview";
            else {
                var lt = !1,
                ht;
                o instanceof JSSPropertySet && e.IsTrue(o.GetProperty("SWEF")) ? (at = o.GetProperty(M), ht = o.GetProperty(t.get("SWE_VIEW_ARG")), lt = !0) : !e.IsEmpty(o) && o.length == 8 && !e.IsEmpty(o[3]) && (e.IsTrue(o[6]) || o[2] != null && o[2].indexOf("SWEF=1") != -1) ? (at = o[3], lt = !0, e.IsEmpty(o[0]) || (ht = o[0])) : at = q.GetProperty(M),
                at = _t.call(this, at, h, ht, lt, "View"),
                f.push(this.ProcessNewLayout(q, at, lt)),
                p = "refreshview"
            }
            break;
        case v:
            at = _t.call(this, q.GetProperty(M), h, q.GetProperty(t.get("SWE_APPLET_STR")), !1, "Applet"),
            f.push(this.ProcessNewAppletLayout(q, at)),
            p = "newappletlayout";
            break;
        case A:
            f = f.concat(this.GetActiveView().HandleRefreshLayout(q, h)),
            p = "toggleappletlayout";
            break;
        case m:
            if (SiebelApp.S_App.IsRwd())
                K && (G = K.GetChildByType(t.get("SWE_PST_NEW_VIEW")), G ? (Q = G.GetChildByType(t.get("SWE_PST_VIEW_INFO")), Q && (Y = Q.GetProperty(t.get("SWE_PROP_TMPL_ITM_HOLDER")))) : (Q = K.GetChildByType(t.get("SWE_PST_VIEW_INFO")), Q && (Y = Q.GetProperty(t.get("SWE_PROP_TMPL_ITM_HOLDER"))))), at = _t.call(this, Y, h);
            else {
                var lt = !1,
                ht = q.GetProperty(t.get("SWE_RPC_PROP_VIEW"));
                if (this.IsViewFragment(ht)) {
                    lt = !0;
                    var pt = u[ht];
                    at = pt.GetTarget()
                } else
                    at = q.GetProperty(M);
                at = _t.call(this, at, h, ht, lt, "View")
            }
            var dt = "";
            o instanceof JSSPropertySet && (dt = o.GetProperty("SWEMethod")),
            ft = this.ProcessRefreshLayout(q, at, dt),
            ft !== !1 ? (f.push(ft), p = "refreshlayout") : h.pop();
            break;
        case g:
            Pt.call(this, q);
            break;
        case y:
            if (e.IsTrue(q.GetProperty(t.get("SWE_RPC_FULL_REFRESH"))))
                window.location.reload();
            else {
                this.SetShowNewPage(!0),
                SiebelApp.S_App.IsRwd() ? q.GetProperty("ViewId") ? at = _t.call(this, "External." + q.GetProperty("ViewId"), h) : at = _t.call(this, "", h) : at = _t.call(this, q.GetProperty(M), h),
                ft = this.ProcessNewPage(q, at),
                ft !== !1 ? (f.push(ft), p = "refreshpage") : h.pop();
                if (SiebelApp.S_App.IsRwd() && !q.GetProperty("ViewId")) {
                    var vt = q.GetChildByType(t.get("SWE_PST_PAGE_INFO"));
                    if (vt) {
                        var mt = vt.GetProperty(t.get("SWE_PROP_NEW_PAGE_NAME"));
                        if (mt != null) {
                            Lt.call();
                            var gt = function () {},
                            yt = new gt;
                            yt.GetName = function () {
                                return mt
                            },
                            e.PrepareModuleInfo(vt),
                            vt.GetProperty(t.get("SWE_UIDEF_PM_CTR")) || vt.SetPropertyStr(t.get("SWE_UIDEF_PM_CTR"), "siebel/webpgpm"),
                            vt.GetProperty(t.get("SWE_UIDEF_PR_CTR")) || vt.SetPropertyStr(t.get("SWE_UIDEF_PR_CTR"), "siebel/webpgpr"),
                            SiebelAppFacade.ComponentMgr.MakeComponent(SiebelApp.S_App, vt, yt),
                            pageComp = SiebelAppFacade.ComponentMgr.FindComponent({
                                    id: yt.GetName()
                                }),
                            this.SetActivePageComp(pageComp)
                        }
                    }
                }
            }
            break;
        case b:
            p = this.ProcessNewPopup(q);
            break;
        case O:
            X.SetProperty("forceClosePopup", !1);
            break;
        case I:
            if (SiebelApp.S_App.IsRwd()) {
                Y = q.GetProperty("ViewId"),
                SWEHideBrowserFrame(Y);
                switch (Y) {
                case "SS_TaskUIPane":
                    SiebelApp.S_App.UnregisterExtObject("TaskUIPane");
                    break;
                case "TaskAssistant":
                    SiebelApp.S_App.UnregisterExtObject("TaskAssistant");
                    break;
                case "SS_OpenUIReportPane":
                    SiebelApp.S_App.UnregisterExtObject("ReportPane")
                }
            }
            break;
        case F:
            if (this.IsConfigMode())
                SiebelApp.UIInteractionMgr.CommitOnToggle();
            else {
                var bt = SiebelApp.S_App.GetBaseURL() + "composer.htm";
                window.location.replace(bt)
            }
            break;
        case "DownloadFileOnly":
            var wt = q.GetProperty(l),
            Et = wt.split(c),
            St = SiebelApp.S_App.GetPageURL() + c,
            xt = Et[1];
            if (St && xt) {
                var Tt = !1;
                localStorage && (Tt = localStorage.getItem("isAdfmContainer"));
                if (!Tt) {
                    var Nt = "",
                    Dt = xt.split("&"),
                    It = Dt.length;
                    for (var et = 0; et < It; et++) {
                        var qt = Dt[et].split("=");
                        qt.length >= 2 && (Nt += '<input type="hidden" name="' + qt[0] + '" value="' + qt[1] + '" />')
                    }
                    var Rt = SiebelAppFacade.ComponentMgr.FindComponent({
                            id: "Send External Communication Applet"
                        }),
                    Ut;
                    Rt !== null && (Ut = Rt.GetPM()),
                    Ut && Ut.ExecuteMethod("getInDISASendMail") ? Ut.ExecuteMethod("DownloadFiles", Et, St) : jQuery('<form action="' + St + '" method="get"' + ">" + Nt + "</form>").appendTo("body").submit().html("").remove()
                } else {
                    var zt = St + xt,
                    Wt = q.GetProperty("FileTitle"),
                    Xt = q.GetProperty("FileExt"),
                    Vt = Wt + (Xt ? "." + Xt : "");
                    On.call(this, zt, Vt)
                }
            }
            break;
        default:
        }
        return Z > 0 && (e.IsEmpty(K) || W === A ? Ht.call(this) : W !== b && Bt.call(this)),
        SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && SiebelApp.S_App.GetTimer().TimeServerNotification("Processed Server Notifications"),
        f.push(this.GetFilesAndProcessObjectInfo(q, o)),
        W === b && f.length > 0 && f[f.length - 1].done(function () {
            Ht.call(SiebelApp.S_App)
        }),
        this.InvokeCallBack(),
        e.IsEmpty(_) || _.ManipulateHistoryState(),
        SiebelApp.S_App.OUIPerfReporter && SiebelApp.S_App.OUIPerfReporter.RefreshData(q),
        W === w && Ot(q),
        q = null,
        f.length > 0 ? $.when.apply($, f).done(function () {
            SiebelApp.S_App.ProcessCallbacks(p, h),
            a.resolve(),
            e.IsTrue(SiebelApp.S_App.IsAutoOn()) && ["toggleappletlayout", "refreshpopup", "refreshpage", "refreshview", "refreshlayout", "newappletlayout"].indexOf(p) !== -1 && SiebelApp.UserActionRecorder.IdentifyInvalidEl()
        }) : (SiebelApp.S_App.NavCtrlMgr.Show(!0), a.resolve()),
        (e.IsEmpty(K) || SiebelApp.S_App.IsRwd() && W === y) && Mt.call(this),
        a.promise()
    },
    ct.prototype.ProcessCallbacks = function (e, t) {
        e === "refreshpopup" && SiebelApp.S_App.GetPopupPM().SetProperty("CanProcessLayout", !0),
        e !== "newappletlayout" && SiebelApp.S_App.NavCtrlMgr.Show(!0);
        for (var n = 0, r = t.length; n < r; n++)
            t[n].func.call(SiebelApp.S_App, t[n].tgt, t[n].uiobject);
        SiebelApp.EventManager.fireEvent(e)
    },
    ct.prototype.ProcessNewPopup = function (e) {
        return this.SetShowNewPage(!0),
        this.GetPopupPM().SetProperty("CanProcessLayout", !1),
        this.GetPopupPM().ExecuteMethod("ProcessNewPopup", e),
        "refreshpopup"
    },
    ct.prototype.ProcessResponse = function (e, t, n, r) {
        return arguments[2] && arguments[2].getResponseHeader("swerpc") != "true" ? (window.location.replace(SiebelApp.S_App.GetPageURL()), !0) : this.GetFilesAndDelegateResponse(e, t, n, r)
    },
    ct.prototype.SetURLToGo = function (e, t, n, r, i, s) {
        if (n || !R)
            R = !0, U = e, z = t, W = r, X = i, V = s
    },
    ct.prototype.RefreshView = function (t, n, r, i) {
        var s = null,
        o = CCFMiscUtil_CreatePropSet();
        e.IsEmpty(n) ? (s = e.DecodeFromQueryString(r), SiebelApp.S_App.CallServer(s, o, !0), this.ProcessError()) : SiebelApp.S_App.GotoURL(r, i)
    },
    ct.prototype.GotoURL = function (e, t, n) {
        var r = this.GetPageURL() + e.split(this.GetAppExtension())[1];
        if (t !== m)
            return this.updateTargetViewContainer(r, !1, n);
        window.location.replace(r)
    },
    ct.prototype.OnLoadAppletContent = function (e, t) {
        SiebelAppFacade.ComponentMgr.FindComponent({
            id: t
        }).Show();
        var n = B[t];
        n.ShowOnly(),
        n.ShowSelection(),
        this.ClearErrorMsg(),
        n.HasCustomShadow() && n.shadow && typeof n.shadow.OnLoad == "function" && n.shadow.OnLoad(),
        this.uiStatus.Busy(),
        this.uiStatus.Free()
    },
    ct.prototype.ProcessNewLayout = function (e, n, r) {
        this.GetPopupPM().Get("state") !== t.get("POPUP_STATE_UNLOADED") && this.GetPopupPM().ExecuteMethod("ClearPopup");
        var i = e.GetProperty(t.get("SWE_RPC_PROP_VIEW")),
        s = e.GetProperty(t.get("SWE_RPC_PROP_APPLET")) || e.GetProperty(t.get("SWE_APPLET_STR")),
        o = e.GetProperty(t.get("SWE_RPC_PROP_VIEW_ID"));
        i = encodeURI(i).split("&").join("%26");
        var u = this.GetLayoutURL(t.get("SWE_RPC_PROP_NEW_LAYOUT"), i, o, e, s, r);
        return SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && SiebelApp.S_App.GetTimer().TimeGoToView(i, "Call GetViewLayout"),
        this.updateTargetViewContainer(u)
    },
    ct.prototype.ProcessNewAppletLayout = function (e, n) {
        SiebelApp.S_App.uiStatus.ShowOnLoadIndicator();
        var r = e.GetProperty(t.get("SWE_RPC_PROP_APPLET")) || e.GetProperty(t.get("SWE_APPLET_STR")),
        i = this.GetLayoutURL(t.get("SWE_RPC_PROP_NEW_LAYOUT"), "", "", e, r);
        return Dt.call(this, i)
    },
    ct.prototype.ProcessRefreshLayout = function (n, r, i) {
        SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && SiebelApp.S_App.GetTimer().TimeRefreshView("", "", "Start RefreshView");
        var s = n.GetProperty(t.get("SWE_RPC_PROP_VIEW")),
        o = n.GetProperty(t.get("SWE_VIEW_ID_STR")) || "";
        if (s !== this.GetActiveView().GetName() || e.IsEmpty(s))
            return !1;
        s = s.split(" ").join("%20").split("&").join("%26");
        var u = SiebelApp.S_App.GetLayoutURL(t.get("SWE_RPC_PROP_NEW_LAYOUT"), s, o, n);
        return SiebelApp.S_App.GetEnablePerfHooks() && SiebelApp.S_App.GetTimer() && SiebelApp.S_App.GetTimer().TimeGoToView("", "View Cache Ready"),
        this.updateTargetViewContainer(u, !1, !1, i)
    },
    ct.prototype.ProcessNewPage = function (n, r) {
        var i = !1,
        s = n.GetProperty(t.get("SWE_RPC_PROP_URL")),
        o = n.GetProperty(t.get("SWE_RPC_PROP_VIEW")),
        u = n.GetProperty(t.get("SWE_RPC_PROP_VIEW_ID")),
        a = n.GetProperty(t.get("SWE_RPC_PROP_TARGET")),
        f = n.GetProperty(t.get("SWE_RPC_PROP_TIMEOUT")),
        l = "";
        n.PropertyExists(t.get("SWE_LAYOUT_URL_SUFFIX")) && (l = n.GetProperty(t.get("SWE_LAYOUT_URL_SUFFIX")));
        var c = !e.IsEmpty(l) && l.indexOf("SWEF=1") != -1;
        SiebelApp.S_App.IsRwd() && e.IsTrue(n.GetProperty(t.get("SWE_RPC_FULL_REFRESH"))) && window.location.reload(),
        a.length == 1 && SiebelApp.S_App.IsRwd() && (a = SiebelApp.S_App.ViewTarget()),
        s += l;
        if (a && !c && a.indexOf("_sweview") > -1) {
            SiebelApp.EventManager.fireEvent("refreshurl");
            var h = this.GetActiveView();
            e.IsEmpty(h) || h.SetActiveAppletInternal(null)
        }
        if (!e.IsEmpty(o) && e.IsEmpty(u)) {
            var h = this.GetActiveView();
            if (!e.IsEmpty(h) && h.GetName() !== o && s.match("SWECmd=GotoPostedAction"))
                return this.GotoView(o, "", s, a), SiebelApp.S_App.uiStatus.Free(), !1
        } else {
            if (f && SiebelApp.S_App.PortletSessionMgr)
                return window.location.replace(this.GetPageURL() + "?" + SiebelApp.S_App.PortletSessionMgr.GetInstance().GetAction()), !1;
            if (f && a.indexOf("top") != -1 & s.indexOf("SWECmd=Login") != -1) {
                var p = this;
                return setTimeout(function () {
                    p.IsConfigMode() ? top.location.replace(s) : window.location.replace(s)
                }, 1),
                !1
            }
        }
        return this.uiStatus.Busy({
            target: this.GetTargetViewContainer(),
            mask: !0
        }),
        this.SetURLToGo(s, a, !1, o, u, i),
        !1
    },
    ct.prototype.InvokeCallBack = function () {
        while (N.length > 0) {
            var e = {};
            e = N.pop(),
            e.callBack.call(e.object)
        }
    },
    ct.prototype.GetFilesAndDelegateResponse = function (n, r, i, s) {
        var o = new $.Deferred,
        u = null,
        a = t.get("SWE_PST_CLIENT_DESCRIPTOR_INFO"),
        f = CCFMiscUtil_CreatePropSet();
        f.DecodeFromString(n);
        var l = f.GetChildByType(a);
        if (l !== null) {
            var c = e.PrepareModuleInfo(f);
            if (c.length > 0) {
                var h = this;
                require(c, function () {
                    try {
                        u = h.DelegateResponse(f, r, i, s)
                    } catch (e) {
                        SiebelJS.Log(e)
                    }
                    l = null,
                    u.done(function () {
                        o.resolve()
                    })
                })
            } else
                u = this.DelegateResponse(f, r, i, s), l = null, u.done(function () {
                    o.resolve()
                })
        } else
            u = this.DelegateResponse(f, r, i, s), l = null, u.done(function () {
                o.resolve()
            });
        return o.promise()
    },
    ct.prototype.GetFilesAndProcessObjectInfo = function (t, n) {
        var r = new $.Deferred,
        i = null,
        s = t.GetChildByType("api");
        if (s !== null) {
            var o = e.GetFileInfoFromPropSet(t);
            if (o.length > 0) {
                var u = this;
                require(o, function () {
                    try {
                        i = It.call(u, t, n)
                    } catch (e) {
                        SiebelJS.Log(e)
                    }
                    s = null,
                    i.done(function () {
                        r.resolveWith(this, ["Process Object"])
                    })
                })
            } else
                i = It.call(this, t, n), s = null, i.done(function () {
                    r.resolveWith(this, ["Process Object"])
                });
            o = null
        } else
            s = null, r.resolveWith(this, ["Process Object"]);
        return r.promise()
    },
    ct.prototype.InitializeBO = function (e) {
        this.ClearExistingViewAndBO(),
        i = new SiebelApp.S_App.BusObj,
        i.ProcessObjectInfo(e.GetChild(0))
    },
    ct.prototype.ClearExistingViewAndBO = function () {
        !e.IsEmpty(i) && !e.IsEmpty(s) && s.GetBusObj() === i && (this.ClearMainView(), this.ClearBusObj())
    },
    ct.prototype.GetFilesAndInitExecContext = function (r, i) {
        var s = CCFMiscUtil_CreatePropSet();
        s.DecodeFromString(r);
        var o = e.GetFileInfoFromPropSet(s),
        u = s.GetChildByType(n);
        if (o.length > 0) {
            bt.call(this, u.GetProperty(t.get("SWE_PROP_VDIR")));
            var a = this.GetBaseURL() + SIEBEL_BUILD;
            require.config({
                baseUrl: a,
                waitSeconds: 30,
                paths: {
                    "jquery.ui.widget": "../scripts/3rdParty/jquery-ui/current/ui/jquery.ui.widget"
                }
            }),
            require.exec("for(var reg in contexts['_'].registry){if(contexts['_'].registry.hasOwnProperty(reg)){contexts['_'].registry[reg].enable();} useInteractive = true;}"),
            o = e.PrepareModuleInfo(u, !1);
            if (o.length > 0) {
                var f = this;
                SiebelRequire(o, null, null, function () {
                    try {
                        require.exec("for(var reg in contexts['_'].registry){if(contexts['_'].registry.hasOwnProperty(reg)){contexts['_'].registry[reg].enable();} useInteractive = true;}"),
                        f.InitExecContext(s, i)
                    } catch (e) {
                        SiebelJS.Log(e)
                    }
                    s = null
                })
            } else
                this.InitExecContext(s, i), s = null
        } else
            this.InitExecContext(s, i), s = null;
        u = o = null
    },
    ct.prototype.InitExecContext = function (r, i) {
        SiebelApp.EventManager.addListner("AppInit", this.PushClientPref, this),
        SiebelApp.S_App.ErrorObject.DecorateErrorCapability(this),
        ht(),
        _ = new SiebelApp.S_App.HistoryMgr,
        x = SiebelApp.S_App.NavCtrlMgr;
        var s = r.GetChildByType(n);
        ct.prototype.IsRwd = function () {
            return e.IsTrue(s.GetProperty(t.get("SWE_IS_RWD")))
        },
        ct.prototype.GetWTLanguages = function () {
            return s.GetChildByType(t.get("SWE_WEBTOOLS_LANGUAGES"))
        },
        ct.prototype.IsConfigMode = function () {
            return e.IsTrue(s.GetProperty(t.get("SWE_PROP_CONFIG_MODE")))
        },
        this.SetPreviewMode(e.IsTrue(s.GetProperty(t.get("SWE_PROP_PREVIEW_MODE")))),
        ct.prototype.GetActiveWSName = function () {
            return s.GetProperty(t.get("SWE_PROP_WORK_SPACE"))
        },
        ct.prototype.IsMsgBarEnabled = function () {
            return e.IsTrue(s.GetProperty(t.get("SWE_IS_MSGBAR_ENABLED")))
        },
        ct.prototype.GetWebSocketSrvrPort = function () {
            return s.GetProperty(t.get("SWE_WEBSOCKET_SERVER_PORT"))
        },
        mt.call(this, r),
        SiebelApp.S_App.IsRwd() && this.PushClientPref();
        var o = SiebelApp.S_App.WPName();
        if (o != null) {
            var u = function () {},
            a = new u;
            a.GetName = function () {
                return o
            },
            rt = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: a.GetName()
                }),
            rt || (s.GetProperty(t.get("SWE_UIDEF_PM_CTR")) || s.SetPropertyStr(t.get("SWE_UIDEF_PM_CTR"), "siebel/webpgpm"), s.GetProperty(t.get("SWE_UIDEF_PR_CTR")) || s.SetPropertyStr(t.get("SWE_UIDEF_PR_CTR"), "siebel/webpgpr"), SiebelAppFacade.ComponentMgr.MakeComponent(SiebelApp.S_App, s, a), rt = SiebelAppFacade.ComponentMgr.FindComponent({
                        id: a.GetName()
                    })),
            rt.Show()
        }
        var s = r.GetChild(0);
        if (s.GetType() === n) {
            var f = s.GetProperty(t.get("SWE_PROP_WLM_STRING"));
            E = f && f.length ? f.split(",") : []
        }
        SiebelApp.EventManager.addListner("refreshview", this.InitSessionTimeoutWarning, this),
        i ? this.ProcessResponse(i) : SiebelApp.S_App.IsRwd() ? $t.call(this) : this.LoadClientContainer()
    },
    ct.prototype.InitSessionTimeoutWarning = function () {
        if (SiebelApp.S_App.GetSessionWarnTimeout()) {
            var e =
                parseInt(SiebelApp.S_App.GetSessionWarnTimeout(), 10),
            t = parseInt(SiebelApp.S_App.GetSessionTimeout(), 10);
            e && typeof e == "number" && isFinite(e) && e > 0 && StartTimer((t - e) * 1e3, Math.floor(e / 60), e % 60, Math.floor(t / 60), t % 60),
            SiebelApp.EventManager.removeListner("refreshview", this.InitSessionTimeoutWarning, this)
        }
    },
    ct.prototype.LoadClientContainer = function () {
        SiebelApp.contentUpdater.updateSrc(this.GetClientFrame(), this.GetPageURL() + this.GetClientURL().split(this.GetAppExtension())[1])
    },
    ct.prototype.PushClientPref = function (n) {
        var r = this.GetService(t.get("SWE_OUI_CLIENT_PREF_SERVICE"));
        if (!e.IsEmpty(r)) {
            var i = SiebelApp.S_App.NewPropertySet(),
            s = "Mobile=" + SiebelAppFacade.DecisionManager.IsTouch(),
            o = $(window).height();
            s = s + ",Viewport:width=" + $(window).width() + ",Viewport:height=" + o,
            window.localStorage.removeItem("RowCountScale");
            var u = localStorage.getItem("viewPort");
            e.IsEmpty(u) || (s = u);
            if (n)
                for (var a in n)
                    n.hasOwnProperty(a) && (s += "," + a + "=" + n[a]);
            i.SetProperty(t.get("SWE_OUI_CLIENT_PREF"), s),
            r.InvokeMethod("SetClientCapability", i, {
                npr: !1,
                async: !0,
                cb: function () {}
            })
        }
        if (IsOfflineModeEnabled()) {
            var f = SiebelApp.S_App;
            f.LoadMafResources && f.LoadMafResources()
        }
        dt.call(this)
    },
    ct.prototype.InitializeGlobalMenu = function () {
        this.GetTargetViewContainer ? Vt.call(this) : SiebelApp.EventManager.addListner("AppInit", Vt, this)
    },
    ct.prototype.GetLabel = function () {
        return ""
    },
    ct.prototype.RegisterControl = function (e, t) {
        T && (T[e] = t)
    },
    ct.prototype.GetControlClassInstance = function (e) {
        if (T)
            return T[e]
    },
    ct.prototype.RegisterConstructorAgainstKey = function (e, t) {
        D && (D[e] = t)
    },
    ct.prototype.GetConstructorFromKey = function (e) {
        if (D)
            return D[e]
    },
    ct.prototype.CallServer = function (n, r, i, s) {
        var o = (this.HeartBeatInterval ? this.HeartBeatInterval() : -1) || -1;
        if (o > 0 && !navigator.onLine && (!IsOfflineModeEnabled() || !this.GetOfflineMode()))
            return SiebelApp.S_App.uiStatus.Free(), e.Alert(SiebelApp.S_App.LocaleObject.GetLocalString("IDS_CLIENT_AJAX_ERR")), !1;
        s = $.extend({
                selfbusy: !1,
                mask: !0,
                async: !1,
                opdecode: !0
            }, s);
        if (!s.selfbusy) {
            var u = {};
            s.target && (u.target = s.target),
            s.mask && (u.mask = s.mask),
            this.uiStatus.Busy(u)
        }
        r = r || CCFMiscUtil_CreatePropSet();
        if (e.IsTrue(n.GetProperty(t.get("SWE_PROP_CANCELABLE_RPC")))) {
            var a = Math.floor((new Date).getTime() / 1e3),
            f = parseInt(Z);
            while (a <= f)
                a++;
            Z = "" + a,
            n.SetProperty(t.get("SWSE_CANCEL_ID"), Z)
        }
        String(n.GetProperty(t.get("SWSE_CMD_STR"))) !== t.get("SWSE_CANCEL_QUERY") && this.SetDefaultArgs(n);
        var l = e.EncodeToQueryString(n),
        c = new Date,
        h = null;
        l = l + "&" + t.get("SWE_TIME_STAMP") + "=" + c.getTime(),
        this.SetInputPS(n),
        h = {
            url: this.GetPageURL(),
            data: l.split(" ").join("%20"),
            type: "POST",
            async: s.async,
            contentType: "application/x-www-form-urlencoded",
            successfncallback: this.OnSuccessCallServer,
            errfncb: Kt,
            context: {
                scope: this,
                lp: s,
                outputPS: r,
                nPR: i,
                request: n
            }
        },
        SiebelApp.AjaxRequestMgr.Ajax(h),
        h = null
    },
    ct.prototype.OnSuccessCallServer = function (t, n, r) {
        var i = this.lp,
        s = this.outputPS,
        o = this.scope,
        u = this.nPR,
        a = this.request,
        f = new $.Deferred;
        if (u === !0 && r && typeof r.getResponseHeader == "function" && r.status !== 204) {
            if (r.getResponseHeader("swerpc") === null) {
                var l = window.location.href;
                return l.indexOf("SWECmd=Login") == -1 ? (window.location.reload(), !0) : (window.location.replace(SiebelApp.S_App.GetPageURL()), !0)
            }
            if (r.getResponseHeader("swerpc").toLowerCase() != "true")
                return window.location.replace(SiebelApp.S_App.GetPageURL()), !0
        }
        i.HB ? t === "OK" && (u = !1, SiebelApp.S_App.uiStatus.Free()) : Jt.call(o);
        if (!e.IsEmpty(t)) {
            if (u === !0) {
                var c = i && i.scope || this,
                h = o.ProcessResponse(t, c, null, a);
                h.done(function () {
                    SiebelApp.S_App.ProcessError(),
                    f.resolve()
                })
            } else
                f.resolve();
            i.opdecode === !0 && (s.DecodeFromString(t), SiebelApp.S_App.OUIPerfReporter && SiebelApp.S_App.OUIPerfReporter.RefreshData(s)),
            typeof i.cb == "function" ? (i.args = i.args || [], i.opdecode === !0 ? i.args.push(s) : i.args.push(t), i.cb.apply(i.scope || null, i.args)) : typeof i.scope != "undefined" && typeof i.scope.PostExecute == "function" && (i.args = i.args || [], i.args.push(s), i.scope.PostExecute.apply(i.scope || null, i.args))
        } else
            f.resolve();
        return f.done(function () {
            (i && !i.selfbusy || !i) && o.uiStatus.Free()
        }),
        f.promise()
    },
    ct.prototype.SetStaticPickValues = function (e, t) {
        y[e] = t
    },
    ct.prototype.GetStaticPickValues = function (e) {
        return y[e]
    },
    ct.prototype.SetActiveView = function (e) {
        s = e
    },
    ct.prototype.SetActiveBO = function (e) {
        i = e
    },
    ct.prototype.ClearMainView = function () {
        if (s && typeof s.EndLife == "function") {
            var e = SiebelAppFacade.ComponentMgr.FindComponent({
                    id: s.GetName()
                });
            s.EndLife(),
            e && (e.GetPM && e.GetPM() && e.GetPM().EndLife(), SiebelAppFacade.ComponentMgr.DeleteComponent(e, this))
        }
        this.GetPopupPM().ExecuteMethod("ProcessClearPopup"),
        SiebelApp.S_App.ClearErrorMsg(),
        o = s = null
    },
    ct.prototype.ClearBusObj = function () {
        i && typeof i.EndLife == "function" && i.EndLife(),
        i = null
    },
    ct.prototype.SeblTrace = function (e, t) {},
    ct.prototype.GetBusObj = function (e) {
        var t = this.GetActiveView();
        return !e && t ? t.GetBusObj() : t && t.GetBusObj().GetName() === e ? t.GetBusObj() : null
    },
    ct.prototype.GetBoundedBO = function (e) {
        var t = this.GetActiveView();
        return t && t.GetName() === e ? this.GetActiveBusObj() : this.IsViewFragment(e) ? this.GetFragmentBO(e) : null
    },
    ct.prototype.GetProfileAttr = function (e) {
        var t,
        n;
        return e ? (t = CCFMiscUtil_CreatePropSet(), t.SetType("GetProfileAttr"), t.SetProperty("attrName", e), n = this.CallServerApp("GetProfileAttr", t), n === null ? null : this.HasErrorMsg() ? (this.ProcessError(), !1) : n) : (this.SetErrorMsg("AppErrInvalidAttrName"), null)
    },
    ct.prototype.SetProfileAttr = function (e, t) {
        if (!e)
            return this.SetErrorMsg("AppErrInvalidAttrName"), !1;
        t = t || "";
        var n = CCFMiscUtil_CreatePropSet();
        return n.SetType("SetProfileAttr"),
        n.SetProperty("attrName", e),
        n.SetProperty("value", t),
        t = this.CallServerApp("SetProfileAttr", n),
        t === null ? null : this.HasErrorMsg() ? (this.ProcessError(), !1) : !0
    },
    ct.prototype.GetMainView = function () {
        return this.GetActiveView()
    },
    ct.prototype.CallServerApp = function (e, t, n) {
        var r,
        i = CCFMiscUtil_CreatePropSet(),
        s,
        o;
        return o = t.EncodeAsString(),
        r = CCFMiscUtil_CreatePropSet(),
        r.SetProperty("SWECmd", "InvokeMethod"),
        r.SetProperty("SWEMethod", e),
        r.SetProperty("SWEIPS", o),
        SiebelApp.S_App.CallServer(r, i, !0),
        s = i.GetProperty("Result"),
        s
    },
    ct.prototype.NewPropertySet =
    function () {
        return CCFMiscUtil_CreatePropSet()
    };
    var Qt = {};
    ct.prototype.RemoveService = function (e) {
        Qt[e.GetName()] && delete Qt[e.GetName()]
    },
    ct.prototype.KeepAliveServer = function () {
        var e = CCFMiscUtil_CreatePropSet(),
        n = CCFMiscUtil_CreatePropSet(),
        r = {};
        n.SetProperty(t.get("SWE_CMD_ARG"), t.get("SWE_PROP_PING")),
        r.selfbusy = !1,
        SiebelApp.S_App.CallServer(n, e, !1, r)
    },
    ct.prototype.GetService = function (t) {
        if (e.IsEmpty(t))
            return !1;
        var n = Qt[t];
        return e.IsEmpty(n) ? (n = new SiebelApp.Service, n.SetName(t), Qt[n.GetName()] = n, L[t] && typeof window[L[t]] == "function" && new window[L[t]](n), n) : (n.AddRef(), n)
    },
    ct.prototype.ShowModalDialog = function (e, t, n) {
        return window.showModalDialog(e, t, n)
    },
    ct.prototype.CreateJSShadow = function (e, t) {
        if (!t)
            return !1;
        var n = [];
        CCFMiscUtil_StringToArray(t, n);
        if (n.length < 2)
            return !1;
        $.ajaxSetup({
            async: !1
        });
        var r = function (e, t) {},
        i = n.length;
        for (var s = 1; s < i; s++)
            $.getScript(n[s], r);
        return $.ajaxSetup({
            async: !0
        }),
        typeof window[n[0]] == "function" ? (new window[n[0]](e), !0) : !1
    };
    var Zt = {};
    (function (e) {
        "use strict";
        Zt.encode = function (t) {
            if (!t)
                return "";
            var n = new Uint8Array(t),
            r,
            i = n.length,
            s = "";
            for (r = 0; r < i; r += 3)
                s += e[n[r] >> 2], s += e[(n[r] & 3) << 4 | n[r + 1] >> 4], s += e[(n[r + 1] & 15) << 2 | n[r + 2] >> 6], s += e[n[r + 2] & 63];
            return i % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : i % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="),
            s
        },
        Zt.decode = function (t) {
            var n = t.length * .75,
            r = t.length,
            i,
            s = 0,
            o,
            u,
            a,
            f;
            t[t.length - 1] === "=" && (n--, t[t.length - 2] === "=" && n--);
            var l = new Uint8Array(n);
            for (i = 0; i < r; i += 4)
                o = e.indexOf(t[i]), u = e.indexOf(t[i + 1]), a = e.indexOf(t[i + 2]), f = e.indexOf(t[i + 3]), l[s++] = o << 2 | u >> 4, l[s++] = (u & 15) << 4 | a >> 2, l[s++] = (a & 3) << 6 | f & 63;
            return l
        }
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    var nn = !1,
    rn = null,
    sn = !1,
    on = !1,
    un;
    return ct.prototype.DownloadFile = function (n, r) {
        var i = SiebelApp.S_App.LocaleObject,
        s = n.GetProperty(l),
        o = s.split(c),
        u = n.GetProperty(h);
        typeof u == "undefined" && (u = !1),
        on = u;
        var a = SiebelApp.S_App.GetPageURL() + c,
        f = o[1];
        !e.IsEmpty(f) && !e.IsEmpty(SiebelApp.S_App.GetTabId()) && (f += "&" + t.get("SWE_PROP_BROWSER_TAB_ID") + "=" + SiebelApp.S_App.GetTabId());
        var p = n.GetProperty("FileTitle"),
        d = n.GetProperty("FileExt"),
        v = p + (d ? "." + d : "");
        sn = n.GetProperty(t.get("SWE_FA_FILE_READONLY_FLG")) === "true";
        var m = function () {
            if (a && f) {
                var e = "",
                n = f.split("&"),
                r = n.length;
                for (var i = 0; i < r; i++) {
                    var s = n[i].split("=");
                    s.length >= 2 && (s[0] === t.get("SWE_PROP_SESSION_RANDOM_NUMBER") && (s[1] = SiebelApp.S_App.GetSRN()), e += '<input type="hidden" name="' + s[0] + '" value="' + s[1] + '" />')
                }
                if (SiebelApp.S_App.IsMobileApplication() === "true" && window.navigator.standalone) {
                    var o = a + f,
                    u = document.createElement("a");
                    u.setAttribute("href", o);
                    var l = document.createEvent("HTMLEvents");
                    l.initEvent("click", !0, !0),
                    u.dispatchEvent(l),
                    u = null
                } else
                    jQuery('<form action="' + a + '" method="get"' + ' target="_blank"' + ">" + e + "</form>").appendTo("body").submit().html("").remove()
            }
        },
        g = !1;
        localStorage && (g = localStorage.getItem("isAdfmContainer"));
        if (g) {
            var y = a + f;
            On.call(this, y, v);
            return
        }
        var b = function () {
            var e = function () {
                if (this.readyState === 4 && this.status === 200) {
                    nn = !0;
                    var e = ln();
                    if (sn) {
                        var n = {};
                        n[t.get("WS_INLINEEDIT_FILE_READONLY")] = !0,
                        e.SendMessage(this.response, v, n)
                    } else
                        e.SendMessage(this.response, v);
                    var i = t.get("SWE_VIEW_ARG"),
                    s = t.get("SWE_APPLET_STR"),
                    o = t.get("SWE_ROW_IDS_STR"),
                    u = t.get("SWE_BCF_FIELD");
                    gn(i, SiebelApp.S_App.GetActiveView().GetName()),
                    gn(s, r.GetProperty(s)),
                    gn(o, r.GetProperty(o)),
                    gn(u, r.GetProperty(u))
                }
            };
            SiebelApp.S_App.uiStatus.Busy({
                mask: !0
            });
            var n = a + f,
            i = en();
            i.onreadystatechange = e,
            i.open("GET", n),
            i.responseType = "blob",
            i.send()
        },
        w = function () {
            var t = $("#downloadFileChooseDialog");
            if (t.length <= 0) {
                var n = "<div id='downloadFileChooseDialog' style='padding:10px;'></div>";
                t = $(n)
            }
            var r = i.GetLocalString("IDS_CLIENT_FILE_DOWNLOAD"),
            s;
            on == 0 ? s = i.GetLocalString("IDS_DISA_DISABLE_EDIT_FILE") : sn ? s = i.GetLocalString("IDS_READONLY_FILE_DOWNLOAD_PROMPT") : s = i.GetLocalString("IDS_IAE_FILE_DOWNLOAD_PROMPT"),
            s = e.replaceAll(s, "%1", v);
            var o = i.GetLocalString("IDS_EDIT_BUTTON_DISABLED_HINT");
            on == 0 && (o = ""),
            o = "<div id='editBtnHint' class='siebui-disa-iae-hint'>" + o + "</div>",
            t.text(s).append(o);
            var u = [{
                    text: i.GetLocalString("IDS_CLIENT_DOWNLOAD"),
                    id: "downloadButton",
                    click: function () {
                        m(),
                        $(this).dialog("close")
                    }
                }, {
                    text: i.GetLocalString("IDS_CLIENT_CANCEL"),
                    id: "cancelButton",
                    click: function () {
                        $(this).dialog("close")
                    }
                }
            ];
            SiebelApp.WebSocketManager && SiebelApp.WebSocketManager.IsWebSocketSupported() && u.unshift({
                text: i.GetLocalString("IDS_CLIENT_EDIT"),
                id: "editButton",
                click: function () {
                    sn || E(),
                    b()
                }
            }),
            t.dialog({
                title: r,
                modal: !0,
                autoOpen: !1,
                minWidth: 350,
                buttons: u,
                open: function () {
                    SiebelApp.WebSocketManager && SiebelApp.WebSocketManager.IsWebSocketSupported() && kn()
                }
            }),
            t.parent().find(".ui-dialog-titlebar-close").attr("title", i.GetLocalString("IDS_MSG_CLOSE")),
            t.parent().find("button").addClass("siebui-ctrl-btn").addClass("appletButton"),
            t.parent().find("#editBtnHint").styleHide(),
            t.parent().find("#editButton").removeClass("appletButton").addClass("appletButtonDis").prop("disabled", !0).attr("tabindex", "-1");
            if (e.IsTrue(SiebelApp.S_App.IsAutoOn())) {
                var a = t.parent().find(".ui-icon-closethick");
                a.length > 0 && a.attr({
                    ot: "button",
                    rn: "PopupClose",
                    un: "PopupClose"
                });
                var f = t.parent().find("#downloadButton");
                f.length > 0 && f.attr({
                    ot: "button",
                    rn: "IAEDownload",
                    un: i.GetLocalString("IDS_CLIENT_DOWNLOAD")
                });
                var l = t.parent().find("#cancelButton");
                l.length > 0 && l.attr({
                    ot: "button",
                    rn: "IAECancel",
                    un: i.GetLocalString("IDS_CLIENT_CANCEL")
                });
                var c = t.parent().find("#editButton");
                c.length > 0 && c.attr({
                    ot: "button",
                    rn: "IAEEdit",
                    un: i.GetLocalString("IDS_CLIENT_EDIT")
                })
            }
            t.dialog("open")
        },
        E = function () {
            var t = $("#uploadFileDialogContent");
            if (t.length <= 0) {
                var n = "<div id='uploadFileDialogContent' style='padding:10px;'></div>";
                t = $(n)
            }
            var r = i.GetLocalString("IDS_ATT_FILE_UPLOAD_TITLE"),
            s = "<div id='uploadReminder'>";
            s += i.GetLocalString("IDS_ATT_FILE_UPLOAD_REMINDER"),
            s = s.replace("%1", v),
            s += "</div>",
            s += "<div id = 'uploadMessage'>",
            s += "</div>",
            t.html(s);
            var o = [{
                    text: i.GetLocalString("IDS_ATT_FILE_FINISH"),
                    id: "finishButton",
                    "class": "siebui-ctrl-btn appletButton",
                    click: function () {
                        an() &&
                        Cn()
                    }
                }, {
                    text: i.GetLocalString("IDS_ATT_FILE_OK"),
                    id: "okButton",
                    "class": "siebui-ctrl-btn appletButton",
                    click: function () {
                        En()
                    }
                }
            ];
            t.dialog({
                title: r,
                modal: !0,
                autoOpen: !1,
                beforeClose: function () {
                    return an() ? e.Confirm(i.GetLocalString("IDS_SWE_POPUP_CLOSEBYX_WARNING")) ? (fn(!1), !0) : !1 : !0
                },
                dialogClass: "siebui-upload-file-dialog-popup",
                buttons: o
            }),
            t.parent().find(".ui-dialog-titlebar-close").attr("title", i.GetLocalString("IDS_MSG_CLOSE")),
            t.find("#uploadMessage").hide(),
            t.dialog("widget").find("#okButton").hide();
            if (e.IsTrue(SiebelApp.S_App.IsAutoOn())) {
                var u = t.parent().find(".ui-icon-closethick");
                u.length > 0 && u.attr({
                    ot: "button",
                    rn: "PopupClose",
                    un: "PopupClose"
                });
                var a = t.parent().find("#finishButton");
                a.length > 0 && a.attr({
                    ot: "button",
                    rn: "IAEFinish",
                    un: i.GetLocalString("IDS_ATT_FILE_FINISH")
                });
                var f = t.parent().find("#okButton");
                f.length > 0 && f.attr({
                    ot: "button",
                    rn: "IAEOK",
                    un: i.GetLocalString("IDS_ATT_FILE_OK")
                })
            }
        };
        w()
    },
    ct.prototype.GetAppletControlInstance = function (e, n, r, i, s) {
        var o = new SiebelApp.S_App.AppletControl,
        u = CCFMiscUtil_CreatePropSet();
        return u.SetType(t.get("SWE_PST_CNTRL")),
        o.ProcessObjectInfo(u),
        o.GetName = function () {
            return e
        },
        o.GetUIType = function () {
            return n
        },
        o.GetDisplayName = function () {
            return r
        },
        o.GetWidth = function () {
            return i
        },
        o.GetHeight = function () {
            return s
        },
        o.GetMaxSize = function () {
            return 1e3
        },
        o.IsSortable = function () {
            return !0
        },
        o.GetFieldName = function () {
            return ""
        },
        o.GetIconMap = function () {
            return ""
        },
        o.GetDisplayFormat = function () {
            return ""
        },
        o.GetInputName = function () {
            return ""
        },
        o.GetDefaultMethod = function () {
            return ""
        },
        o.GetSpanPrefix = function () {
            return ""
        },
        o.GetValue = function () {
            return ""
        },
        o.IsClientCtrl = function () {
            return !0
        },
        o
    },
    ct.prototype.GetInputPS = function () {
        return C
    },
    ct.prototype.SetInputPS = function (e) {
        C = e
    },
    ct.prototype.GetCSParam = function () {
        var e = {};
        return e.async = !0,
        e
    },
    ct.prototype.SetEnablePerfHooks = function (e) {
        O = e
    },
    ct.prototype.GetEnablePerfHooks = function () {
        return O
    },
    ct.prototype.GetTimer = function () {
        return A
    },
    ct.prototype.SetTimer = function (e) {
        A = e
    },
    ct.prototype.NotifyTimer = function (e, t) {
        O && A && A[e].apply(A, t)
    },
    ct.prototype.OfflineCallMethod = function () {},
    ct.prototype.Drilldown = function (e) {
        var n = e || window.event;
        n.preventDefault && n.preventDefault(),
        n.returnValue = !1,
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        var r = new Date,
        i = n.currentTarget || n.srcElement,
        s = i.href + "&" + t.get("SWE_TIME_STAMP") + "=" + r.getTime();
        return this.GotoView("", "", s, ""),
        !1
    },
    ct.prototype.TriggerUPTEvent = function (n) {
        var r,
        i,
        s;
        if (!e.IsTrue(SiebelApp.S_App.IsUPTEnabled()) || !n)
            return;
        e.IsEmpty(n.GetProperty(t.get("UPT_EVENT_NAME"))) && n.SetProperty(t.get("UPT_EVENT_NAME"), t.get("UPT_EVENT_NAME_TEXT")),
        e.IsEmpty(n.GetProperty(t.get("UPT_EVENT_SOURCE"))) && n.SetProperty(t.get("UPT_EVENT_SOURCE"), t.get("UPT_SOURCE_TEXT")),
        r = CCFMiscUtil_CreatePropSet(),
        s = n.EncodeAsString(),
        r.SetProperty(t.get("SWE_CMD_ARG"), t.get("UPT_CMD_NAME")),
        r.SetProperty(t.get("SWE_PROP_UPT_STR"), s),
        SiebelApp.S_App.CallServer(r, i, !0)
    },
    ct.prototype.OnLoadPageContent = function () {
        var e = SiebelApp.S_App.GetActivePageComp();
        e && e.Show()
    },
    r
})

module.exports = SiebelApp.S_App;