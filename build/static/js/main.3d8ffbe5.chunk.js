(this["webpackJsonpchess-1"]=this["webpackJsonpchess-1"]||[]).push([[0],{56:function(e,t,n){},61:function(e,t,n){},64:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c=n(9),o=n.n(c),r=n(45),i=n.n(r),a=(n(56),n(12)),s=n(15),l=n(0),u=n.n(l),d=n(1),b=n(46),j=n.n(b),p=n(40),O=n(33),f=n.p+"static/media/chessMove.25525989.mp3",h=n.p+"static/media/chessCapture.7d1fc293.mp3",m=n.p+"static/media/newGame.e759e3ac.mp3",g=n.p+"static/media/checkMate.e759e3ac.mp3",x=(n(61),n(51)),v=n(48),A=n(25),P=n(26),_=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_API_KEY:"AIzaSyD314Z-3YQeBW-BZU4hrabl_q7t1qhcYk8",REACT_APP_AUTH_DOMAIN:"qazi-lichess.firebaseapp.com",REACT_APP_PROJECT_ID:"qazi-lichess",REACT_APP_STORAGE_BUCKET:"qazi-lichess.appspot.com",REACT_APP_MESSAGING_SENDER_ID:"602553329342",REACT_APP_APP_ID:"1:602553329342:web:90e88a4de59d16c21360ef",REACT_APP_MEASUREMENT_ID:"G-WPEHFV5HZG"}),E={apiKey:_.REACT_APP_FIREBASE_API_KEY,authDomain:_.REACT_APP_AUTH_DOMAIN,projectId:_.REACT_APP_PROJECT_ID,storageBucket:_.REACT_APP_STORAGE_BUCKET,messagingSenderId:_.REACT_APP_MESSAGING_SENDER_ID,appId:_.REACT_APP_APP_ID,measurementId:_.REACT_APP_MEASUREMENT_ID},C=Object(v.a)(E),S=Object(P.b)(C),y=(Object(x.a)(C),Object(A.e)(C)),R=new P.a,w=function(){Object(P.d)(S,R).then((function(e){var t=P.a.credentialFromResult(e),n=t.accessToken,c=e.user;console.log("signed in successfully! ",t,n,c)})).catch((function(e){var t=e.code,n=e.message,c=e.email,o=P.a.credentialFromError(e);console.log("error ",e,t,n,c,o)}))},T=n(10),B="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",k="DEa2F0wP3xBZjtjHNit6";var I={container:{backgroundColor:"#161512",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",padding:"10px 20px 20px"},button:{backgroundColor:"transparent",fontSize:50,border:"none",cursor:"pointer"},movesContainer:{display:"flex",backgroundColor:"#262421",width:400,maxWidth:"90vw",height:"calc(20vw + 20vh)",minHeight:250,justifyContent:"space-between",overflowY:"scroll",margin:"max(0.8vw, 30px) 0 5px"},movesText:{fontSize:20,color:"white"}},M=function(){var e=Object(c.useState)(new p),t=Object(a.a)(e,2),n=t[0],o=t[1],r=Object(c.useState)([]),i=Object(a.a)(r,2),l=i[0],b=i[1],x=Object(c.useState)("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),v=Object(a.a)(x,2),_=v[0],E=v[1],C=Object(c.useState)([]),R=Object(a.a)(C,2),w=R[0],M=R[1],D=Object(c.useState)(k),N=Object(a.a)(D,2),z=N[0],F=(N[1],Object(c.useState)(B)),G=Object(a.a)(F,2),q=G[0],H=G[1],K=(Object(c.useRef)(null),Object(c.useState)("w")),U=Object(a.a)(K,2),L=U[0],W=U[1],Q=Object(c.useState)(560),Y=Object(a.a)(Q,2),J=Y[0],Z=Y[1],V=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(A.b)(y,"games",t),Object(A.g)(n,{position:B,pgn:[],moves:[]},{merge:!0}),e.next=4,Object(A.c)(n);case 4:c=e.sent,console.log(c.data()),console.log(l),b(c.data().moves),ie({id:"newGame"});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){return Object(A.f)(Object(A.b)(y,"games",k),(function(e){H(e.data().position),E(e.data().pgn)}))}),[]);var X,$=Object(O.a)(f,{sprite:{move:[170,300]}}),ee=Object(a.a)($,1)[0],te=Object(O.a)(h,{sprite:{capture:[250,300]}}),ne=Object(a.a)(te,1)[0],ce=Object(O.a)(g,{sprite:{checkMate:[0,1e3]}}),oe=Object(a.a)(ce,1)[0],re=Object(O.a)(m,{sprite:{newGame:[0,1e3]}}),ie=Object(a.a)(re,1)[0],ae=[{name:S.currentUser.displayName},{name:"Adil Dzelilovic"}];return Object(T.jsxs)("div",{style:I.container,children:[Object(T.jsx)("div",{children:ae.map((function(e,t){var n=e.name;return Object(T.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(T.jsx)("img",{src:S.currentUser.photoURL,alt:"",style:{height:45,marginRight:10,borderRadius:"50%",resizeMode:"contain"}}),Object(T.jsx)("h2",{style:{color:"#BABABA",padding:10,fontSize:"max(calc(0.9vw + 0.9vh), 16px)",backgroundColor:n.includes("Adil")&&"w"===L||n.includes("Qazi")&&"b"===L?"#384722":"#262421"},children:n},t)]})}))}),Object(T.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(T.jsx)(j.a,{position:q,transitionDuration:100,calcWidth:function(e){var t=e.screenWidth;t<=J+40&&Z(t-40)},onDrop:function(e){var t=e.sourceSquare,n=e.targetSquare;e.piece;!function(e,t,n){var c=new p,r=(0!==_.length&&c.load_pgn(_),c.move({from:e,to:t,promotion:"q"}));if(o(c),b(c.history()),r){W(c.fen().split(" ")[1]);var i="w"===c.fen().split(" ")[1]?{sideMadeLastMove:"black",sideToMove:"white"}:{sideMadeLastMove:"white",sideToMove:"black"},a=i.sideMadeLastMove,s=i.sideToMove;console.log("".concat(a," just played ").concat(r.san,"... now it's ").concat(s," to move..."));var l=r.flags;r.san.includes("#")&&oe({id:"checkMate"}),"c"===l||"e"===l?ne({id:"capture"}):ee({id:"move"});var u=Object(A.b)(y,"games",k);Object(A.g)(u,{position:c.fen(),moves:c.history(),pgn:c.pgn()},{merge:!0})}}(t,n)},width:J,boardStyle:{margin:"0 2vw max(2vw, 20px)"}}),Object(T.jsxs)("div",{children:[Object(T.jsx)("button",{style:{fontSize:20,padding:"7px 10px",borderRadius:"5px",backgroundColor:"#2F2E2C",color:"#BABABA",cursor:"pointer"},id:"start",onClick:function(){return V(z)},children:"New Game"}),Object(T.jsx)("button",{style:{fontSize:20,padding:"7px 10px",borderRadius:"5px",backgroundColor:"#2F2E2C",color:"#BABABA",cursor:"pointer"},id:"start",onClick:function(){return Object(P.e)(S).then((function(){return console.log("signed out successfully!")})).catch((function(e){return console.log(e)}))},children:"Sign Out"})]})]}),Object(T.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(T.jsxs)("div",{style:I.movesContainer,children:[Object(T.jsx)("div",{style:{flex:1,backgroundColor:"#302E2C",textAlign:"center"},children:function(e){var t=e.length%2===0?e.length/2:Math.ceil(e.length/2);return Array.from(Array(t).keys()).map((function(e){return e+1})).map((function(e){return Object(T.jsx)("p",{style:{color:"#BABABA",fontSize:20},children:e})}))}(l)}),Object(T.jsx)("div",{className:"notation",style:{flex:2,marginLeft:10},children:(X=l,X.filter((function(e,t){return t%2===0})).map((function(e){return Object(T.jsx)("p",{style:{color:"#BABABA",fontSize:20},children:e})})))}),Object(T.jsx)("div",{className:"notation",style:{flex:2},children:function(e){return e.filter((function(e,t){return t%2!==0})).map((function(e){return Object(T.jsx)("p",{style:{color:"#BABABA",fontSize:20},children:e})}))}(l)})]}),Object(T.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"min(1vw, 30px)"},children:[Object(T.jsx)("button",{style:I.button,onClick:Object(d.a)(u.a.mark((function e(){var t,c,o,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.undo(),console.log(t),null!==t){e.next=4;break}return e.abrupt("return");case 4:return c=Object(A.b)(y,"games",k),e.next=7,Object(A.c)(c);case 7:o=e.sent,r=o.data().undoMovesHistory,Object(A.g)(c,{undoMovesHistory:[].concat(Object(s.a)(r),[t])},{merge:!0}),M([].concat(Object(s.a)(w),[t]));case 11:case"end":return e.stop()}}),e)}))),children:"\ud83d\udc48"}),Object(T.jsx)("button",{style:I.button,onClick:function(){var e=Object(s.a)(w);if(0!==e.length){var t=e.pop(),c=t.flags,o=t.from,r=t.to;"c"===c||"e"===c?ne({id:"capture"}):ee({id:"move"}),M(e),n.move({from:o,to:r})}},children:"\ud83d\udc49"})]})]})]})},D=n(41),N=n(14);n(64);function z(){return Object(T.jsxs)("div",{className:"container",children:[Object(T.jsx)("h2",{style:{color:"white"},children:"\u265f \ufe0fQazi's Lichess Clone..."}),Object(T.jsx)("div",{className:"login-buttons",children:Object(T.jsxs)("button",{className:"login-provider-button",onClick:w,children:[Object(T.jsx)("img",{src:"https://img.icons8.com/color/48/000000/google-logo.png",alt:"google icon"}),Object(T.jsx)("span",{children:" Continue with Google"})]})})]})}var F=function(){return Object(T.jsx)(D.a,{children:Object(T.jsxs)(N.c,{children:[Object(T.jsx)(N.a,{path:"/play/:gameId",component:M}),Object(T.jsx)(N.a,{path:"",component:M})]})})},G=function(){return Object(T.jsx)(D.a,{children:Object(T.jsx)(N.c,{children:Object(T.jsx)(N.a,{path:"",component:z})})})},q=function(){var e=Object(c.useState)(null),t=Object(a.a)(e,2),n=t[0],o=t[1];return Object(P.c)(S,(function(e){e?(console.log("user logged in"),o(!0)):(console.log("user logged out"),o(!1))})),n?F():G()},H=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,71)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),r(e),i(e)}))};i.a.render(Object(T.jsx)(o.a.StrictMode,{children:Object(T.jsx)(q,{})}),document.getElementById("root")),H()}},[[69,1,2]]]);
//# sourceMappingURL=main.3d8ffbe5.chunk.js.map