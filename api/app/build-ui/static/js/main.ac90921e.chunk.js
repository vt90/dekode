(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{167:function(e,t,n){e.exports=n(329)},18:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={ON_GET_ADDRESSES_INIT:"@ON_GET_ADDRESSES_INIT",ON_GET_ADDRESSES_SUCCESS:"@ON_GET_ADDRESSES_SUCCESS",ON_GET_ADDRESSES_FAILURE:"@ON_GET_ADDRESSES_FAILURE",ON_GET_ADDRESSES_DETAILS_INIT:"@ON_GET_ADDRESSES_DETAILS_INIT",ON_GET_ADDRESSES_DETAILS_SUCCESS:"@ON_GET_ADDRESSES_DETAILS_SUCCESS",ON_GET_ADDRESSES_DETAILS_FAILURE:"@ON_GET_ADDRESSES_DETAILS_FAILURE",ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT:"@ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT",ON_GET_ADDRESSES_TRANSACTIONS_FLOW_SUCCESS:"@ON_GET_ADDRESSES_TRANSACTIONS_FLOW_SUCCESS",ON_GET_ADDRESSES_TRANSACTIONS_FLOW_FAILURE:"@ON_GET_ADDRESSES_TRANSACTIONS_FLOW_FAILURE",ON_SELECT_ADDRESS:"@ON_SELECT_ADDRESS"}},21:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={ON_NOTIFICATION_SUCCESS_INIT:"@ON_NOTIFICATION_SUCCESS_INIT",ON_NOTIFICATION_WARNING_INIT:"@ON_NOTIFICATION_WARNING_INIT",ON_NOTIFICATION_ERROR_INIT:"@ON_NOTIFICATION_ERROR_INIT",ON_NOTIFICATION_CLOSE:"@ON_NOTIFICATION_CLOSE",NOTIFICATION_TYPES:{SUCCESS:1,WARNING:2,ERROR:3}}},326:function(e,t,n){},329:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(17),o=n.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c,s=n(42),l=n(43),E=n(45),S=n(44),u=n(46),d=n(102),_=n(33),O=n(1043),N=n(28),I=n(79),T=n(1042),A=n(22),f=n(83),p=n.n(f),m=n(135),D=n.n(m),b=n(34),C=n.n(b),R=n(111),h=n.n(R),v=n(132),g=n.n(v),F=n(41),y=n.n(F),j=n(134),L=n.n(j),G=n(133),k=n.n(G),w=function(e){return{toolbar:{backgroundColor:"#FFF","& h6":{fontWeight:300}},searchForm:{minWidth:500,maxWidth:"100%","& button":{"& *":{color:"#FFF"}}}}},U=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(E.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(r)))).state={searchAddress:""},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.selectedAddress;this.setState({searchAddress:e})}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.props.selectedAddress;e&&e.selectedAddress&&t!==e.selectedAddress&&this.setState({searchAddress:e.selectedAddress})}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,a=t.classes,i=t.goToAddressDetails,o=this.state.searchAddress;return r.a.createElement("div",null,r.a.createElement(p.a,{position:"static",color:"default",className:a.toolbar},r.a.createElement(g.a,{className:"wrap-content"},r.a.createElement(y.a,{variant:"h6",color:"primary",className:"flex align-center"},r.a.createElement(k.a,null),"\xa0DEKODE"),"\xa0\xa0",r.a.createElement(T.a,{to:"/"},r.a.createElement(y.a,{variant:"subtitle1",color:"textSecondary",className:"flex align-center"},r.a.createElement(L.a,null)," \xa0 Dashboard")),r.a.createElement("span",{className:"fill-flex"},"\xa0"),r.a.createElement(C.a,{elevation:4,className:"flex align-center ".concat(a.searchForm)},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),i(o)},className:"fill-flex"},r.a.createElement(h.a,{style:{padding:"6px 12px"},fullWidth:!0,value:o,onChange:function(t){return e.setState({searchAddress:t.target.value})},placeholder:"Search for address",InputProps:{disableUnderline:!0}})),r.a.createElement(D.a,{variant:"contained",color:"primary",type:"submit"},"Search")))),n)}}]),t}(a.Component),x=Object(A.withStyles)(w)(U),W=n(25),P=n(5),B=n.n(P),M=n(140),Y=n.n(M),z=n(125),J=n.n(z),H=n(107),K=n.n(H),$=n(141),q=n.n($),Q=n(139),V=n.n(Q),X=n(137),Z=n.n(X),ee=n(138),te=n.n(ee),ne=n(136),ae=n.n(ne),re=n(77),ie=n.n(re),oe={vertical:"top",horizontal:"right"},ce=function(e){return r.a.createElement(K.a,Object.assign({},e,{direction:"left"}))},se=Object(A.withStyles)(function(e){var t;return{close:{width:4*e.spacing.unit,height:4*e.spacing.unit,padding:0},notificationIcon:(t={borderRadius:"50%",backgroundColor:"#FFFFFF",boxShadow:" 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)"},Object(W.a)(t,e.breakpoints.up("md"),{position:"absolute",top:e.spacing.unit,left:-1*e.spacing.unit*2,width:4*e.spacing.unit,height:4*e.spacing.unit}),Object(W.a)(t,e.breakpoints.down("sm"),{top:6,position:"relative"}),t),notificationSuccess:{color:e.palette.secondary.main},notificationWarning:{color:e.palette.secondary.main},notificationError:{color:e.palette.error.main},"snackbar-success":{"& >div":{background:e.palette.secondary.main}},"snackbar-error":{"& >div":{background:e.palette.error.main}}}})(function(e){var t,n=e.classes,a=e.notification,i=e.onNotificationClose;switch(a.type){case"success":t=r.a.createElement(Z.a,{classes:{root:B()(n.notificationIcon,n.notificationSuccess)}});break;case"warning":t=r.a.createElement(te.a,{classes:{root:B()(n.notificationIcon,n.notificationWarning)}});break;default:t=r.a.createElement(V.a,{classes:{root:B()(n.notificationIcon,n.notificationError)}})}var o=null;return ae()(a.notification)?o=a.notification:ie()(a.notification)&&(o=a.notification.message||a.notification.errorMessage),r.a.createElement(Y.a,{open:!!a,onClose:i,message:r.a.createElement("span",null,t,"\xa0",o),autoHideDuration:4e3,anchorOrigin:oe,className:"".concat(n["snackbar-".concat(a.type)]," ").concat(n.snackbar),TransitionComponent:ce,action:[r.a.createElement(J.a,{key:"close",color:"inherit",className:n.close,onClick:i},r.a.createElement(q.a,null))]})}),le=n(1040),Ee=Object(_.b)(function(e){return{location:e.router.location}})(le.a),Se=n(108),ue=n.n(Se),de=n(72),_e=ue()({loader:function(){return Promise.all([n.e(0),n.e(4),n.e(2)]).then(n.bind(null,1039))},loading:de.a}),Oe=ue()({loader:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,1041))},loading:de.a}),Ne=[{path:"/address/:address",component:_e,exact:!0,isAvailable:function(){return!0}},{path:"/",exact:!0,component:Oe,isAvailable:function(){return!0}}],Ie=function(e){function t(){return Object(s.a)(this,t),Object(E.a)(this,Object(S.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this.props,n=t.goToAddressDetails,i=t.selectedAddress,o=t.notification,c=t.onNotificationClose,s=Ne.filter(function(t){return function(e,t){return void 0===e.isAvailable||e.isAvailable(t)}(t,e)}),l=r.a.createElement(Ee,null,s.map(function(e,t){return r.a.createElement(d.a,{key:t,exact:e.exact,path:e.path,name:e.name,component:e.component})}),r.a.createElement(d.a,{render:function(){return r.a.createElement("div",null,"Not existing")}}));return r.a.createElement(a.Fragment,null,o?r.a.createElement(se,{notification:o,onNotificationClose:c}):null,r.a.createElement(x,{selectedAddress:i,goToAddressDetails:n},l))}}]),t}(a.Component),Te=Object(_.b)(function(e){return{selectedAddress:e.addresses.selectedAddress,notification:e.notification.notification}},function(e){return{onNotificationClose:function(){return e(I.a())},goToAddressDetails:function(t){return e(Object(N.b)("/address/".concat(t)))}}})(Ie),Ae=Object(O.a)(Te),fe=n(29),pe=n(1038),me=n(144),De=n.n(me),be=n(145),Ce=n(19),Re=n(18),he={addressInfoList:[],isLoading:null,selectedAddress:null,addressDetails:null,transactionsFlow:null,levelsBefore:1,levelsAfter:1,blockchainId:2},ve=n(21),ge=(c={},Object(W.a)(c,ve.a.ON_NOTIFICATION_SUCCESS_INIT,function(e,t){var n=t.payload;return Object(Ce.a)({},e,{notification:n,notificationType:ve.a.NOTIFICATION_TYPES.SUCCESS})}),Object(W.a)(c,ve.a.ON_NOTIFICATION_WARNING_INIT,function(e,t){var n=t.payload;return Object(Ce.a)({},e,{notification:n,notificationType:ve.a.NOTIFICATION_TYPES.WARNING})}),Object(W.a)(c,ve.a.ON_NOTIFICATION_ERROR_INIT,function(e,t){var n=t.payload;return Object(Ce.a)({},e,{notification:n,notificationType:ve.a.NOTIFICATION_TYPES.ERROR})}),Object(W.a)(c,ve.a.ON_NOTIFICATION_CLOSE,function(e){return Object(Ce.a)({},e,{notification:null,notificationType:null})}),c),Fe={notification:null,notificationType:null},ye=De()(),je=Object(fe.c)({form:pe.a,router:N.d,addresses:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case Re.a.ON_GET_ADDRESSES_INIT:return Object(Ce.a)({},e,{isLoading:Re.a.ON_GET_ADDRESSES_INIT});case Re.a.ON_GET_ADDRESSES_SUCCESS:return Object(Ce.a)({},e,{isLoading:null,addressInfoList:a});case Re.a.ON_GET_ADDRESSES_DETAILS_INIT:return Object(Ce.a)({},e,{isLoading:Re.a.ON_GET_ADDRESSES_DETAILS_INIT,addressDetails:null});case Re.a.ON_GET_ADDRESSES_DETAILS_SUCCESS:return Object(Ce.a)({},e,{isLoading:null,addressDetails:a});case Re.a.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT:return Object(Ce.a)({},e,{isLoading:Re.a.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_INIT,levelsBefore:a.levelsBefore,levelsAfter:a.levelsAfter,blockchainId:a.blockchainId,transactionsFlow:null});case Re.a.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_SUCCESS:return Object(Ce.a)({},e,{transactionsFlow:a,isLoading:null});case Re.a.ON_GET_ADDRESSES_FAILURE:case Re.a.ON_GET_ADDRESSES_DETAILS_FAILURE:case Re.a.ON_GET_ADDRESSES_TRANSACTIONS_FLOW_FAILURE:return Object(Ce.a)({},e,{isLoading:null});case Re.a.ON_SELECT_ADDRESS:return Object(Ce.a)({},e,{selectedAddress:a});default:return e}},notification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0;return ge[t.type]?ge[t.type](e,t):e}});var Le=n(147),Ge=n.n(Le),ke=n(150),we=n.n(ke),Ue=n(148),xe=n.n(Ue),We=n(149),Pe=n.n(We),Be=n(40),Me=n(110),Ye=n.n(Me),ze=n(73),Je=n.n(ze).a,He={palette:{primary:{main:Ye.a[500],dark:Ye.a[800]},secondary:{light:"#B3E5FC",main:"#09D0FF",dark:"#01A9EE"},error:{main:Je[500]},background:{default:"#F7F7F7"}},overrides:{}},Ke=(n(326),Object(A.createGenerateClassName)()),$e=Object(Be.create)(Object(A.jssPreset)());$e.options.insertionPoint=document.getElementById("jss-insertion-point");var qe=Object(A.createMuiTheme)(He),Qe=function(e){var t=Object(N.c)(ye),n=[be.a,t],a=[fe.a.apply(void 0,n)],r=fe.d;return Object(fe.e)(je,e,r.apply(void 0,a))}(),Ve=r.a.createElement(_.a,{store:Qe},r.a.createElement(xe.a,{jss:$e,generateClassName:Ke},r.a.createElement(A.MuiThemeProvider,{theme:qe},r.a.createElement(we.a,null),r.a.createElement(Ge.a,{utils:Pe.a},r.a.createElement(N.a,{history:ye},r.a.createElement(Ae,null))))));o.a.render(Ve,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},72:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(142),o=n.n(i);t.a=function(){return r.a.createElement("div",{className:"flex justify-center layout-padding",style:{width:"100%",padding:20}},r.a.createElement(o.a,{size:46,color:"secondary"}))}},79:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return i});var a=n(21),r=function(e){return{type:a.a.ON_NOTIFICATION_ERROR_INIT,payload:{notification:e,type:"error"}}},i=function(){return{type:a.a.ON_NOTIFICATION_CLOSE}}}},[[167,6,5]]]);
//# sourceMappingURL=main.ac90921e.chunk.js.map