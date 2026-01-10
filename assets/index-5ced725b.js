(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();/**
* @vue/shared v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gd(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ae={},Es=[],In=()=>{},cv=()=>!1,Uu=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),zd=t=>t.startsWith("onUpdate:"),dt=Object.assign,Kd=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},wb=Object.prototype.hasOwnProperty,Ie=(t,e)=>wb.call(t,e),te=Array.isArray,bs=t=>Ka(t)==="[object Map]",no=t=>Ka(t)==="[object Set]",dg=t=>Ka(t)==="[object Date]",se=t=>typeof t=="function",rt=t=>typeof t=="string",bn=t=>typeof t=="symbol",Ce=t=>t!==null&&typeof t=="object",uv=t=>(Ce(t)||se(t))&&se(t.then)&&se(t.catch),lv=Object.prototype.toString,Ka=t=>lv.call(t),_b=t=>Ka(t).slice(8,-1),hv=t=>Ka(t)==="[object Object]",Hd=t=>rt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Go=Gd(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bu=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Ib=/-\w/g,gn=Bu(t=>t.replace(Ib,e=>e.slice(1).toUpperCase())),Eb=/\B([A-Z])/g,ai=Bu(t=>t.replace(Eb,"-$1").toLowerCase()),$u=Bu(t=>t.charAt(0).toUpperCase()+t.slice(1)),Wl=Bu(t=>t?`on${$u(t)}`:""),Kr=(t,e)=>!Object.is(t,e),Uc=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},dv=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},qu=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let fg;const ju=()=>fg||(fg=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Wd(t){if(te(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],i=rt(r)?Ab(r):Wd(r);if(i)for(const s in i)e[s]=i[s]}return e}else if(rt(t)||Ce(t))return t}const bb=/;(?![^(]*\))/g,Tb=/:([^]+)/,Sb=/\/\*[^]*?\*\//g;function Ab(t){const e={};return t.replace(Sb,"").split(bb).forEach(n=>{if(n){const r=n.split(Tb);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Ur(t){let e="";if(rt(t))e=t;else if(te(t))for(let n=0;n<t.length;n++){const r=Ur(t[n]);r&&(e+=r+" ")}else if(Ce(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Cb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",kb=Gd(Cb);function fv(t){return!!t||t===""}function Rb(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=Ha(t[r],e[r]);return n}function Ha(t,e){if(t===e)return!0;let n=dg(t),r=dg(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=bn(t),r=bn(e),n||r)return t===e;if(n=te(t),r=te(e),n||r)return n&&r?Rb(t,e):!1;if(n=Ce(t),r=Ce(e),n||r){if(!n||!r)return!1;const i=Object.keys(t).length,s=Object.keys(e).length;if(i!==s)return!1;for(const o in t){const a=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!Ha(t[o],e[o]))return!1}}return String(t)===String(e)}function Qd(t,e){return t.findIndex(n=>Ha(n,e))}const pv=t=>!!(t&&t.__v_isRef===!0),ps=t=>rt(t)?t:t==null?"":te(t)||Ce(t)&&(t.toString===lv||!se(t.toString))?pv(t)?ps(t.value):JSON.stringify(t,gv,2):String(t),gv=(t,e)=>pv(e)?gv(t,e.value):bs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,i],s)=>(n[Ql(r,s)+" =>"]=i,n),{})}:no(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ql(n))}:bn(e)?Ql(e):Ce(e)&&!te(e)&&!hv(e)?String(e):e,Ql=(t,e="")=>{var n;return bn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Wt;class Nb{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Wt,!e&&Wt&&(this.index=(Wt.scopes||(Wt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Wt;try{return Wt=this,e()}finally{Wt=n}}}on(){++this._on===1&&(this.prevScope=Wt,Wt=this)}off(){this._on>0&&--this._on===0&&(Wt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function xb(){return Wt}let Re;const Yl=new WeakSet;class mv{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Wt&&Wt.active&&Wt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Yl.has(this)&&(Yl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vv(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,pg(this),wv(this);const e=Re,n=En;Re=this,En=!0;try{return this.fn()}finally{_v(this),Re=e,En=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Xd(e);this.deps=this.depsTail=void 0,pg(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Yl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Lh(this)&&this.run()}get dirty(){return Lh(this)}}let yv=0,zo,Ko;function vv(t,e=!1){if(t.flags|=8,e){t.next=Ko,Ko=t;return}t.next=zo,zo=t}function Yd(){yv++}function Jd(){if(--yv>0)return;if(Ko){let e=Ko;for(Ko=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;zo;){let e=zo;for(zo=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function wv(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function _v(t){let e,n=t.depsTail,r=n;for(;r;){const i=r.prevDep;r.version===-1?(r===n&&(n=i),Xd(r),Db(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}t.deps=e,t.depsTail=n}function Lh(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Iv(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Iv(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ca)||(t.globalVersion=ca,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Lh(t))))return;t.flags|=2;const e=t.dep,n=Re,r=En;Re=t,En=!0;try{wv(t);const i=t.fn(t._value);(e.version===0||Kr(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{Re=n,En=r,_v(t),t.flags&=-3}}function Xd(t,e=!1){const{dep:n,prevSub:r,nextSub:i}=t;if(r&&(r.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Xd(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Db(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let En=!0;const Ev=[];function gr(){Ev.push(En),En=!1}function mr(){const t=Ev.pop();En=t===void 0?!0:t}function pg(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Re;Re=void 0;try{e()}finally{Re=n}}}let ca=0;class Pb{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Zd{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Re||!En||Re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Re)n=this.activeLink=new Pb(Re,this),Re.deps?(n.prevDep=Re.depsTail,Re.depsTail.nextDep=n,Re.depsTail=n):Re.deps=Re.depsTail=n,bv(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Re.depsTail,n.nextDep=void 0,Re.depsTail.nextDep=n,Re.depsTail=n,Re.deps===n&&(Re.deps=r)}return n}trigger(e){this.version++,ca++,this.notify(e)}notify(e){Yd();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Jd()}}}function bv(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)bv(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Fh=new WeakMap,Mi=Symbol(""),Vh=Symbol(""),ua=Symbol("");function Dt(t,e,n){if(En&&Re){let r=Fh.get(t);r||Fh.set(t,r=new Map);let i=r.get(n);i||(r.set(n,i=new Zd),i.map=r,i.key=n),i.track()}}function or(t,e,n,r,i,s){const o=Fh.get(t);if(!o){ca++;return}const a=c=>{c&&c.trigger()};if(Yd(),e==="clear")o.forEach(a);else{const c=te(t),u=c&&Hd(n);if(c&&n==="length"){const l=Number(r);o.forEach((h,d)=>{(d==="length"||d===ua||!bn(d)&&d>=l)&&a(h)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(ua)),e){case"add":c?u&&a(o.get("length")):(a(o.get(Mi)),bs(t)&&a(o.get(Vh)));break;case"delete":c||(a(o.get(Mi)),bs(t)&&a(o.get(Vh)));break;case"set":bs(t)&&a(o.get(Mi));break}}Jd()}function us(t){const e=_e(t);return e===t?e:(Dt(e,"iterate",ua),pn(t)?e:e.map(Tn))}function Gu(t){return Dt(t=_e(t),"iterate",ua),t}function Mr(t,e){return yr(t)?Li(t)?Ls(Tn(e)):Ls(e):Tn(e)}const Ob={__proto__:null,[Symbol.iterator](){return Jl(this,Symbol.iterator,t=>Mr(this,t))},concat(...t){return us(this).concat(...t.map(e=>te(e)?us(e):e))},entries(){return Jl(this,"entries",t=>(t[1]=Mr(this,t[1]),t))},every(t,e){return nr(this,"every",t,e,void 0,arguments)},filter(t,e){return nr(this,"filter",t,e,n=>n.map(r=>Mr(this,r)),arguments)},find(t,e){return nr(this,"find",t,e,n=>Mr(this,n),arguments)},findIndex(t,e){return nr(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return nr(this,"findLast",t,e,n=>Mr(this,n),arguments)},findLastIndex(t,e){return nr(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return nr(this,"forEach",t,e,void 0,arguments)},includes(...t){return Xl(this,"includes",t)},indexOf(...t){return Xl(this,"indexOf",t)},join(t){return us(this).join(t)},lastIndexOf(...t){return Xl(this,"lastIndexOf",t)},map(t,e){return nr(this,"map",t,e,void 0,arguments)},pop(){return Io(this,"pop")},push(...t){return Io(this,"push",t)},reduce(t,...e){return gg(this,"reduce",t,e)},reduceRight(t,...e){return gg(this,"reduceRight",t,e)},shift(){return Io(this,"shift")},some(t,e){return nr(this,"some",t,e,void 0,arguments)},splice(...t){return Io(this,"splice",t)},toReversed(){return us(this).toReversed()},toSorted(t){return us(this).toSorted(t)},toSpliced(...t){return us(this).toSpliced(...t)},unshift(...t){return Io(this,"unshift",t)},values(){return Jl(this,"values",t=>Mr(this,t))}};function Jl(t,e,n){const r=Gu(t),i=r[e]();return r!==t&&!pn(t)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.done||(s.value=n(s.value)),s}),i}const Mb=Array.prototype;function nr(t,e,n,r,i,s){const o=Gu(t),a=o!==t&&!pn(t),c=o[e];if(c!==Mb[e]){const h=c.apply(t,s);return a?Tn(h):h}let u=n;o!==t&&(a?u=function(h,d){return n.call(this,Mr(t,h),d,t)}:n.length>2&&(u=function(h,d){return n.call(this,h,d,t)}));const l=c.call(o,u,r);return a&&i?i(l):l}function gg(t,e,n,r){const i=Gu(t);let s=n;return i!==t&&(pn(t)?n.length>3&&(s=function(o,a,c){return n.call(this,o,a,c,t)}):s=function(o,a,c){return n.call(this,o,Mr(t,a),c,t)}),i[e](s,...r)}function Xl(t,e,n){const r=_e(t);Dt(r,"iterate",ua);const i=r[e](...n);return(i===-1||i===!1)&&nf(n[0])?(n[0]=_e(n[0]),r[e](...n)):i}function Io(t,e,n=[]){gr(),Yd();const r=_e(t)[e].apply(t,n);return Jd(),mr(),r}const Lb=Gd("__proto__,__v_isRef,__isVue"),Tv=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(bn));function Fb(t){bn(t)||(t=String(t));const e=_e(this);return Dt(e,"has",t),e.hasOwnProperty(t)}class Sv{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return s;if(n==="__v_raw")return r===(i?s?Hb:Rv:s?kv:Cv).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=te(e);if(!i){let c;if(o&&(c=Ob[n]))return c;if(n==="hasOwnProperty")return Fb}const a=Reflect.get(e,n,Mt(e)?e:r);if((bn(n)?Tv.has(n):Lb(n))||(i||Dt(e,"get",n),s))return a;if(Mt(a)){const c=o&&Hd(n)?a:a.value;return i&&Ce(c)?ki(c):c}return Ce(a)?i?ki(a):Ms(a):a}}class Av extends Sv{constructor(e=!1){super(!1,e)}set(e,n,r,i){let s=e[n];const o=te(e)&&Hd(n);if(!this._isShallow){const u=yr(s);if(!pn(r)&&!yr(r)&&(s=_e(s),r=_e(r)),!o&&Mt(s)&&!Mt(r))return u||(s.value=r),!0}const a=o?Number(n)<e.length:Ie(e,n),c=Reflect.set(e,n,r,Mt(e)?e:i);return e===_e(i)&&(a?Kr(r,s)&&or(e,"set",n,r):or(e,"add",n,r)),c}deleteProperty(e,n){const r=Ie(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&r&&or(e,"delete",n,void 0),i}has(e,n){const r=Reflect.has(e,n);return(!bn(n)||!Tv.has(n))&&Dt(e,"has",n),r}ownKeys(e){return Dt(e,"iterate",te(e)?"length":Mi),Reflect.ownKeys(e)}}class Vb extends Sv{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Ub=new Av,Bb=new Vb,$b=new Av(!0);const Uh=t=>t,bc=t=>Reflect.getPrototypeOf(t);function qb(t,e,n){return function(...r){const i=this.__v_raw,s=_e(i),o=bs(s),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=i[t](...r),l=n?Uh:e?Ls:Tn;return!e&&Dt(s,"iterate",c?Vh:Mi),{next(){const{value:h,done:d}=u.next();return d?{value:h,done:d}:{value:a?[l(h[0]),l(h[1])]:l(h),done:d}},[Symbol.iterator](){return this}}}}function Tc(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function jb(t,e){const n={get(i){const s=this.__v_raw,o=_e(s),a=_e(i);t||(Kr(i,a)&&Dt(o,"get",i),Dt(o,"get",a));const{has:c}=bc(o),u=e?Uh:t?Ls:Tn;if(c.call(o,i))return u(s.get(i));if(c.call(o,a))return u(s.get(a));s!==o&&s.get(i)},get size(){const i=this.__v_raw;return!t&&Dt(_e(i),"iterate",Mi),i.size},has(i){const s=this.__v_raw,o=_e(s),a=_e(i);return t||(Kr(i,a)&&Dt(o,"has",i),Dt(o,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const o=this,a=o.__v_raw,c=_e(a),u=e?Uh:t?Ls:Tn;return!t&&Dt(c,"iterate",Mi),a.forEach((l,h)=>i.call(s,u(l),u(h),o))}};return dt(n,t?{add:Tc("add"),set:Tc("set"),delete:Tc("delete"),clear:Tc("clear")}:{add(i){!e&&!pn(i)&&!yr(i)&&(i=_e(i));const s=_e(this);return bc(s).has.call(s,i)||(s.add(i),or(s,"add",i,i)),this},set(i,s){!e&&!pn(s)&&!yr(s)&&(s=_e(s));const o=_e(this),{has:a,get:c}=bc(o);let u=a.call(o,i);u||(i=_e(i),u=a.call(o,i));const l=c.call(o,i);return o.set(i,s),u?Kr(s,l)&&or(o,"set",i,s):or(o,"add",i,s),this},delete(i){const s=_e(this),{has:o,get:a}=bc(s);let c=o.call(s,i);c||(i=_e(i),c=o.call(s,i)),a&&a.call(s,i);const u=s.delete(i);return c&&or(s,"delete",i,void 0),u},clear(){const i=_e(this),s=i.size!==0,o=i.clear();return s&&or(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=qb(i,t,e)}),n}function ef(t,e){const n=jb(t,e);return(r,i,s)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?r:Reflect.get(Ie(n,i)&&i in r?n:r,i,s)}const Gb={get:ef(!1,!1)},zb={get:ef(!1,!0)},Kb={get:ef(!0,!1)};const Cv=new WeakMap,kv=new WeakMap,Rv=new WeakMap,Hb=new WeakMap;function Wb(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Qb(t){return t.__v_skip||!Object.isExtensible(t)?0:Wb(_b(t))}function Ms(t){return yr(t)?t:tf(t,!1,Ub,Gb,Cv)}function Nv(t){return tf(t,!1,$b,zb,kv)}function ki(t){return tf(t,!0,Bb,Kb,Rv)}function tf(t,e,n,r,i){if(!Ce(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=Qb(t);if(s===0)return t;const o=i.get(t);if(o)return o;const a=new Proxy(t,s===2?r:n);return i.set(t,a),a}function Li(t){return yr(t)?Li(t.__v_raw):!!(t&&t.__v_isReactive)}function yr(t){return!!(t&&t.__v_isReadonly)}function pn(t){return!!(t&&t.__v_isShallow)}function nf(t){return t?!!t.__v_raw:!1}function _e(t){const e=t&&t.__v_raw;return e?_e(e):t}function Yb(t){return!Ie(t,"__v_skip")&&Object.isExtensible(t)&&dv(t,"__v_skip",!0),t}const Tn=t=>Ce(t)?Ms(t):t,Ls=t=>Ce(t)?ki(t):t;function Mt(t){return t?t.__v_isRef===!0:!1}function ot(t){return xv(t,!1)}function Jb(t){return xv(t,!0)}function xv(t,e){return Mt(t)?t:new Xb(t,e)}class Xb{constructor(e,n){this.dep=new Zd,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:_e(e),this._value=n?e:Tn(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||pn(e)||yr(e);e=r?e:_e(e),Kr(e,n)&&(this._rawValue=e,this._value=r?e:Tn(e),this.dep.trigger())}}function Se(t){return Mt(t)?t.value:t}const Zb={get:(t,e,n)=>e==="__v_raw"?t:Se(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const i=t[e];return Mt(i)&&!Mt(n)?(i.value=n,!0):Reflect.set(t,e,n,r)}};function Dv(t){return Li(t)?t:new Proxy(t,Zb)}class eT{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Zd(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ca-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Re!==this)return vv(this,!0),!0}get value(){const e=this.dep.track();return Iv(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function tT(t,e,n=!1){let r,i;return se(t)?r=t:(r=t.get,i=t.set),new eT(r,i,n)}const Sc={},nu=new WeakMap;let _i;function nT(t,e=!1,n=_i){if(n){let r=nu.get(n);r||nu.set(n,r=[]),r.push(t)}}function rT(t,e,n=Ae){const{immediate:r,deep:i,once:s,scheduler:o,augmentJob:a,call:c}=n,u=P=>i?P:pn(P)||i===!1||i===0?ar(P,1):ar(P);let l,h,d,f,m=!1,_=!1;if(Mt(t)?(h=()=>t.value,m=pn(t)):Li(t)?(h=()=>u(t),m=!0):te(t)?(_=!0,m=t.some(P=>Li(P)||pn(P)),h=()=>t.map(P=>{if(Mt(P))return P.value;if(Li(P))return u(P);if(se(P))return c?c(P,2):P()})):se(t)?e?h=c?()=>c(t,2):t:h=()=>{if(d){gr();try{d()}finally{mr()}}const P=_i;_i=l;try{return c?c(t,3,[f]):t(f)}finally{_i=P}}:h=In,e&&i){const P=h,W=i===!0?1/0:i;h=()=>ar(P(),W)}const T=xb(),D=()=>{l.stop(),T&&T.active&&Kd(T.effects,l)};if(s&&e){const P=e;e=(...W)=>{P(...W),D()}}let O=_?new Array(t.length).fill(Sc):Sc;const N=P=>{if(!(!(l.flags&1)||!l.dirty&&!P))if(e){const W=l.run();if(i||m||(_?W.some((Z,J)=>Kr(Z,O[J])):Kr(W,O))){d&&d();const Z=_i;_i=l;try{const J=[W,O===Sc?void 0:_&&O[0]===Sc?[]:O,f];O=W,c?c(e,3,J):e(...J)}finally{_i=Z}}}else l.run()};return a&&a(N),l=new mv(h),l.scheduler=o?()=>o(N,!1):N,f=P=>nT(P,!1,l),d=l.onStop=()=>{const P=nu.get(l);if(P){if(c)c(P,4);else for(const W of P)W();nu.delete(l)}},e?r?N(!0):O=l.run():o?o(N.bind(null,!0),!0):l.run(),D.pause=l.pause.bind(l),D.resume=l.resume.bind(l),D.stop=D,D}function ar(t,e=1/0,n){if(e<=0||!Ce(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Mt(t))ar(t.value,e,n);else if(te(t))for(let r=0;r<t.length;r++)ar(t[r],e,n);else if(no(t)||bs(t))t.forEach(r=>{ar(r,e,n)});else if(hv(t)){for(const r in t)ar(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&ar(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Wa(t,e,n,r){try{return r?t(...r):t()}catch(i){zu(i,e,n)}}function Yn(t,e,n,r){if(se(t)){const i=Wa(t,e,n,r);return i&&uv(i)&&i.catch(s=>{zu(s,e,n)}),i}if(te(t)){const i=[];for(let s=0;s<t.length;s++)i.push(Yn(t[s],e,n,r));return i}}function zu(t,e,n,r=!0){const i=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ae;if(e){let a=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const l=a.ec;if(l){for(let h=0;h<l.length;h++)if(l[h](t,c,u)===!1)return}a=a.parent}if(s){gr(),Wa(s,null,10,[t,c,u]),mr();return}}iT(t,n,i,r,o)}function iT(t,e,n,r=!0,i=!1){if(i)throw t;console.error(t)}const jt=[];let On=-1;const Ts=[];let Lr=null,gs=0;const Pv=Promise.resolve();let ru=null;function rf(t){const e=ru||Pv;return t?e.then(this?t.bind(this):t):e}function sT(t){let e=On+1,n=jt.length;for(;e<n;){const r=e+n>>>1,i=jt[r],s=la(i);s<t||s===t&&i.flags&2?e=r+1:n=r}return e}function sf(t){if(!(t.flags&1)){const e=la(t),n=jt[jt.length-1];!n||!(t.flags&2)&&e>=la(n)?jt.push(t):jt.splice(sT(e),0,t),t.flags|=1,Ov()}}function Ov(){ru||(ru=Pv.then(Lv))}function oT(t){te(t)?Ts.push(...t):Lr&&t.id===-1?Lr.splice(gs+1,0,t):t.flags&1||(Ts.push(t),t.flags|=1),Ov()}function mg(t,e,n=On+1){for(;n<jt.length;n++){const r=jt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;jt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Mv(t){if(Ts.length){const e=[...new Set(Ts)].sort((n,r)=>la(n)-la(r));if(Ts.length=0,Lr){Lr.push(...e);return}for(Lr=e,gs=0;gs<Lr.length;gs++){const n=Lr[gs];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Lr=null,gs=0}}const la=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Lv(t){const e=In;try{for(On=0;On<jt.length;On++){const n=jt[On];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),Wa(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;On<jt.length;On++){const n=jt[On];n&&(n.flags&=-2)}On=-1,jt.length=0,Mv(),ru=null,(jt.length||Ts.length)&&Lv()}}let Et=null,Fv=null;function iu(t){const e=Et;return Et=t,Fv=t&&t.type.__scopeId||null,e}function ir(t,e=Et,n){if(!e||t._n)return t;const r=(...i)=>{r._d&&au(-1);const s=iu(e);let o;try{o=t(...i)}finally{iu(s),r._d&&au(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Zl(t,e){if(Et===null)return t;const n=Qu(Et),r=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[s,o,a,c=Ae]=e[i];s&&(se(s)&&(s={mounted:s,updated:s}),s.deep&&ar(o),r.push({dir:s,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function yi(t,e,n,r){const i=t.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(gr(),Yn(c,n,8,[t.el,a,t,e]),mr())}}function Bc(t,e){if(Ot){let n=Ot.provides;const r=Ot.parent&&Ot.parent.provides;r===n&&(n=Ot.provides=Object.create(r)),n[t]=e}}function Kn(t,e,n=!1){const r=oS();if(r||As){let i=As?As._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&se(e)?e.call(r&&r.proxy):e}}const aT=Symbol.for("v-scx"),cT=()=>Kn(aT);function Ho(t,e,n){return Vv(t,e,n)}function Vv(t,e,n=Ae){const{immediate:r,deep:i,flush:s,once:o}=n,a=dt({},n),c=e&&r||!e&&s!=="post";let u;if(fa){if(s==="sync"){const f=cT();u=f.__watcherHandles||(f.__watcherHandles=[])}else if(!c){const f=()=>{};return f.stop=In,f.resume=In,f.pause=In,f}}const l=Ot;a.call=(f,m,_)=>Yn(f,l,m,_);let h=!1;s==="post"?a.scheduler=f=>{sn(f,l&&l.suspense)}:s!=="sync"&&(h=!0,a.scheduler=(f,m)=>{m?f():sf(f)}),a.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,l&&(f.id=l.uid,f.i=l))};const d=rT(t,e,a);return fa&&(u?u.push(d):c&&d()),d}function uT(t,e,n){const r=this.proxy,i=rt(t)?t.includes(".")?Uv(r,t):()=>r[t]:t.bind(r,r);let s;se(e)?s=e:(s=e.handler,n=e);const o=Qa(this),a=Vv(i,s.bind(r),n);return o(),a}function Uv(t,e){const n=e.split(".");return()=>{let r=t;for(let i=0;i<n.length&&r;i++)r=r[n[i]];return r}}const lT=Symbol("_vte"),hT=t=>t.__isTeleport,dT=Symbol("_leaveCb");function of(t,e){t.shapeFlag&6&&t.component?(t.transition=e,of(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Bv(t,e){return se(t)?(()=>dt({name:t.name},e,{setup:t}))():t}function $v(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const su=new WeakMap;function Wo(t,e,n,r,i=!1){if(te(t)){t.forEach((m,_)=>Wo(m,e&&(te(e)?e[_]:e),n,r,i));return}if(Ss(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Wo(t,e,n,r.component.subTree);return}const s=r.shapeFlag&4?Qu(r.component):r.el,o=i?null:s,{i:a,r:c}=t,u=e&&e.r,l=a.refs===Ae?a.refs={}:a.refs,h=a.setupState,d=_e(h),f=h===Ae?cv:m=>Ie(d,m);if(u!=null&&u!==c){if(yg(e),rt(u))l[u]=null,f(u)&&(h[u]=null);else if(Mt(u)){u.value=null;const m=e;m.k&&(l[m.k]=null)}}if(se(c))Wa(c,a,12,[o,l]);else{const m=rt(c),_=Mt(c);if(m||_){const T=()=>{if(t.f){const D=m?f(c)?h[c]:l[c]:c.value;if(i)te(D)&&Kd(D,s);else if(te(D))D.includes(s)||D.push(s);else if(m)l[c]=[s],f(c)&&(h[c]=l[c]);else{const O=[s];c.value=O,t.k&&(l[t.k]=O)}}else m?(l[c]=o,f(c)&&(h[c]=o)):_&&(c.value=o,t.k&&(l[t.k]=o))};if(o){const D=()=>{T(),su.delete(t)};D.id=-1,su.set(t,D),sn(D,n)}else yg(t),T()}}}function yg(t){const e=su.get(t);e&&(e.flags|=8,su.delete(t))}ju().requestIdleCallback;ju().cancelIdleCallback;const Ss=t=>!!t.type.__asyncLoader,qv=t=>t.type.__isKeepAlive;function fT(t,e){jv(t,"a",e)}function pT(t,e){jv(t,"da",e)}function jv(t,e,n=Ot){const r=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(Ku(e,r,n),n){let i=n.parent;for(;i&&i.parent;)qv(i.parent.vnode)&&gT(r,e,n,i),i=i.parent}}function gT(t,e,n,r){const i=Ku(e,t,r,!0);zv(()=>{Kd(r[e],i)},n)}function Ku(t,e,n=Ot,r=!1){if(n){const i=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{gr();const a=Qa(n),c=Yn(e,n,t,o);return a(),mr(),c});return r?i.unshift(s):i.push(s),s}}const Er=t=>(e,n=Ot)=>{(!fa||t==="sp")&&Ku(t,(...r)=>e(...r),n)},mT=Er("bm"),Gv=Er("m"),yT=Er("bu"),vT=Er("u"),wT=Er("bum"),zv=Er("um"),_T=Er("sp"),IT=Er("rtg"),ET=Er("rtc");function bT(t,e=Ot){Ku("ec",t,e)}const Kv="components";function Hv(t,e){return ST(Kv,t,!0,e)||t}const TT=Symbol.for("v-ndc");function ST(t,e,n=!0,r=!1){const i=Et||Ot;if(i){const s=i.type;if(t===Kv){const a=hS(s,!1);if(a&&(a===e||a===gn(e)||a===$u(gn(e))))return s}const o=vg(i[t]||s[t],e)||vg(i.appContext[t],e);return!o&&r?s:o}}function vg(t,e){return t&&(t[e]||t[gn(e)]||t[$u(gn(e))])}function AT(t,e,n,r){let i;const s=n&&n[r],o=te(t);if(o||rt(t)){const a=o&&Li(t);let c=!1,u=!1;a&&(c=!pn(t),u=yr(t),t=Gu(t)),i=new Array(t.length);for(let l=0,h=t.length;l<h;l++)i[l]=e(c?u?Ls(Tn(t[l])):Tn(t[l]):t[l],l,void 0,s&&s[l])}else if(typeof t=="number"){i=new Array(t);for(let a=0;a<t;a++)i[a]=e(a+1,a,void 0,s&&s[a])}else if(Ce(t))if(t[Symbol.iterator])i=Array.from(t,(a,c)=>e(a,c,void 0,s&&s[c]));else{const a=Object.keys(t);i=new Array(a.length);for(let c=0,u=a.length;c<u;c++){const l=a[c];i[c]=e(t[l],l,c,s&&s[c])}}else i=[];return n&&(n[r]=i),i}function YF(t,e,n={},r,i){if(Et.ce||Et.parent&&Ss(Et.parent)&&Et.parent.ce){const u=Object.keys(n).length>0;return e!=="default"&&(n.name=e),ue(),wn(Pt,null,[bt("slot",n,r&&r())],u?-2:64)}let s=t[e];s&&s._c&&(s._d=!1),ue();const o=s&&Wv(s(n)),a=n.key||o&&o.key,c=wn(Pt,{key:(a&&!bn(a)?a:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&t._===1?64:-2);return!i&&c.scopeId&&(c.slotScopeIds=[c.scopeId+"-s"]),s&&s._c&&(s._d=!0),c}function Wv(t){return t.some(e=>da(e)?!(e.type===vr||e.type===Pt&&!Wv(e.children)):!0)?t:null}const Bh=t=>t?fw(t)?Qu(t):Bh(t.parent):null,Qo=dt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Bh(t.parent),$root:t=>Bh(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>af(t),$forceUpdate:t=>t.f||(t.f=()=>{sf(t.update)}),$nextTick:t=>t.n||(t.n=rf.bind(t.proxy)),$watch:t=>uT.bind(t)}),eh=(t,e)=>t!==Ae&&!t.__isScriptSetup&&Ie(t,e),CT={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:c}=t;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return r[e];case 2:return i[e];case 4:return n[e];case 3:return s[e]}else{if(eh(r,e))return o[e]=1,r[e];if(i!==Ae&&Ie(i,e))return o[e]=2,i[e];if(Ie(s,e))return o[e]=3,s[e];if(n!==Ae&&Ie(n,e))return o[e]=4,n[e];$h&&(o[e]=0)}}const u=Qo[e];let l,h;if(u)return e==="$attrs"&&Dt(t.attrs,"get",""),u(t);if((l=a.__cssModules)&&(l=l[e]))return l;if(n!==Ae&&Ie(n,e))return o[e]=4,n[e];if(h=c.config.globalProperties,Ie(h,e))return h[e]},set({_:t},e,n){const{data:r,setupState:i,ctx:s}=t;return eh(i,e)?(i[e]=n,!0):r!==Ae&&Ie(r,e)?(r[e]=n,!0):Ie(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:i,props:s,type:o}},a){let c;return!!(n[a]||t!==Ae&&a[0]!=="$"&&Ie(t,a)||eh(e,a)||Ie(s,a)||Ie(r,a)||Ie(Qo,a)||Ie(i.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ie(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function wg(t){return te(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let $h=!0;function kT(t){const e=af(t),n=t.proxy,r=t.ctx;$h=!1,e.beforeCreate&&_g(e.beforeCreate,t,"bc");const{data:i,computed:s,methods:o,watch:a,provide:c,inject:u,created:l,beforeMount:h,mounted:d,beforeUpdate:f,updated:m,activated:_,deactivated:T,beforeDestroy:D,beforeUnmount:O,destroyed:N,unmounted:P,render:W,renderTracked:Z,renderTriggered:J,errorCaptured:ye,serverPrefetch:$e,expose:xe,inheritAttrs:yt,components:tr,directives:tn,filters:kr}=e;if(u&&RT(u,r,null),o)for(const ve in o){const ge=o[ve];se(ge)&&(r[ve]=ge.bind(n))}if(i){const ve=i.call(n,n);Ce(ve)&&(t.data=Ms(ve))}if($h=!0,s)for(const ve in s){const ge=s[ve],yn=se(ge)?ge.bind(n,n):se(ge.get)?ge.get.bind(n,n):In,xn=!se(ge)&&se(ge.set)?ge.set.bind(n):In,je=tt({get:yn,set:xn});Object.defineProperty(r,ve,{enumerable:!0,configurable:!0,get:()=>je.value,set:kt=>je.value=kt})}if(a)for(const ve in a)Qv(a[ve],r,n,ve);if(c){const ve=se(c)?c.call(n):c;Reflect.ownKeys(ve).forEach(ge=>{Bc(ge,ve[ge])})}l&&_g(l,t,"c");function Xe(ve,ge){te(ge)?ge.forEach(yn=>ve(yn.bind(n))):ge&&ve(ge.bind(n))}if(Xe(mT,h),Xe(Gv,d),Xe(yT,f),Xe(vT,m),Xe(fT,_),Xe(pT,T),Xe(bT,ye),Xe(ET,Z),Xe(IT,J),Xe(wT,O),Xe(zv,P),Xe(_T,$e),te(xe))if(xe.length){const ve=t.exposed||(t.exposed={});xe.forEach(ge=>{Object.defineProperty(ve,ge,{get:()=>n[ge],set:yn=>n[ge]=yn,enumerable:!0})})}else t.exposed||(t.exposed={});W&&t.render===In&&(t.render=W),yt!=null&&(t.inheritAttrs=yt),tr&&(t.components=tr),tn&&(t.directives=tn),$e&&$v(t)}function RT(t,e,n=In){te(t)&&(t=qh(t));for(const r in t){const i=t[r];let s;Ce(i)?"default"in i?s=Kn(i.from||r,i.default,!0):s=Kn(i.from||r):s=Kn(i),Mt(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[r]=s}}function _g(t,e,n){Yn(te(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Qv(t,e,n,r){let i=r.includes(".")?Uv(n,r):()=>n[r];if(rt(t)){const s=e[t];se(s)&&Ho(i,s)}else if(se(t))Ho(i,t.bind(n));else if(Ce(t))if(te(t))t.forEach(s=>Qv(s,e,n,r));else{const s=se(t.handler)?t.handler.bind(n):e[t.handler];se(s)&&Ho(i,s,t)}}function af(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!n&&!r?c=e:(c={},i.length&&i.forEach(u=>ou(c,u,o,!0)),ou(c,e,o)),Ce(e)&&s.set(e,c),c}function ou(t,e,n,r=!1){const{mixins:i,extends:s}=e;s&&ou(t,s,n,!0),i&&i.forEach(o=>ou(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=NT[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const NT={data:Ig,props:Eg,emits:Eg,methods:Lo,computed:Lo,beforeCreate:Ut,created:Ut,beforeMount:Ut,mounted:Ut,beforeUpdate:Ut,updated:Ut,beforeDestroy:Ut,beforeUnmount:Ut,destroyed:Ut,unmounted:Ut,activated:Ut,deactivated:Ut,errorCaptured:Ut,serverPrefetch:Ut,components:Lo,directives:Lo,watch:DT,provide:Ig,inject:xT};function Ig(t,e){return e?t?function(){return dt(se(t)?t.call(this,this):t,se(e)?e.call(this,this):e)}:e:t}function xT(t,e){return Lo(qh(t),qh(e))}function qh(t){if(te(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ut(t,e){return t?[...new Set([].concat(t,e))]:e}function Lo(t,e){return t?dt(Object.create(null),t,e):e}function Eg(t,e){return t?te(t)&&te(e)?[...new Set([...t,...e])]:dt(Object.create(null),wg(t),wg(e??{})):e}function DT(t,e){if(!t)return e;if(!e)return t;const n=dt(Object.create(null),t);for(const r in e)n[r]=Ut(t[r],e[r]);return n}function Yv(){return{app:null,config:{isNativeTag:cv,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let PT=0;function OT(t,e){return function(r,i=null){se(r)||(r=dt({},r)),i!=null&&!Ce(i)&&(i=null);const s=Yv(),o=new WeakSet,a=[];let c=!1;const u=s.app={_uid:PT++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:fS,get config(){return s.config},set config(l){},use(l,...h){return o.has(l)||(l&&se(l.install)?(o.add(l),l.install(u,...h)):se(l)&&(o.add(l),l(u,...h))),u},mixin(l){return s.mixins.includes(l)||s.mixins.push(l),u},component(l,h){return h?(s.components[l]=h,u):s.components[l]},directive(l,h){return h?(s.directives[l]=h,u):s.directives[l]},mount(l,h,d){if(!c){const f=u._ceVNode||bt(r,i);return f.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),h&&e?e(f,l):t(f,l,d),c=!0,u._container=l,l.__vue_app__=u,Qu(f.component)}},onUnmount(l){a.push(l)},unmount(){c&&(Yn(a,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(l,h){return s.provides[l]=h,u},runWithContext(l){const h=As;As=u;try{return l()}finally{As=h}}};return u}}let As=null;const MT=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${gn(e)}Modifiers`]||t[`${ai(e)}Modifiers`];function LT(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ae;let i=n;const s=e.startsWith("update:"),o=s&&MT(r,e.slice(7));o&&(o.trim&&(i=n.map(l=>rt(l)?l.trim():l)),o.number&&(i=n.map(qu)));let a,c=r[a=Wl(e)]||r[a=Wl(gn(e))];!c&&s&&(c=r[a=Wl(ai(e))]),c&&Yn(c,t,6,i);const u=r[a+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Yn(u,t,6,i)}}const FT=new WeakMap;function Jv(t,e,n=!1){const r=n?FT:e.emitsCache,i=r.get(t);if(i!==void 0)return i;const s=t.emits;let o={},a=!1;if(!se(t)){const c=u=>{const l=Jv(u,e,!0);l&&(a=!0,dt(o,l))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!s&&!a?(Ce(t)&&r.set(t,null),null):(te(s)?s.forEach(c=>o[c]=null):dt(o,s),Ce(t)&&r.set(t,o),o)}function Hu(t,e){return!t||!Uu(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ie(t,e[0].toLowerCase()+e.slice(1))||Ie(t,ai(e))||Ie(t,e))}function th(t){const{type:e,vnode:n,proxy:r,withProxy:i,propsOptions:[s],slots:o,attrs:a,emit:c,render:u,renderCache:l,props:h,data:d,setupState:f,ctx:m,inheritAttrs:_}=t,T=iu(t);let D,O;try{if(n.shapeFlag&4){const P=i||r,W=P;D=Mn(u.call(W,P,l,h,f,d,m)),O=a}else{const P=e;D=Mn(P.length>1?P(h,{attrs:a,slots:o,emit:c}):P(h,null)),O=e.props?a:VT(a)}}catch(P){Yo.length=0,zu(P,t,1),D=bt(vr)}let N=D;if(O&&_!==!1){const P=Object.keys(O),{shapeFlag:W}=N;P.length&&W&7&&(s&&P.some(zd)&&(O=UT(O,s)),N=Fs(N,O,!1,!0))}return n.dirs&&(N=Fs(N,null,!1,!0),N.dirs=N.dirs?N.dirs.concat(n.dirs):n.dirs),n.transition&&of(N,n.transition),D=N,iu(T),D}const VT=t=>{let e;for(const n in t)(n==="class"||n==="style"||Uu(n))&&((e||(e={}))[n]=t[n]);return e},UT=(t,e)=>{const n={};for(const r in t)(!zd(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function BT(t,e,n){const{props:r,children:i,component:s}=t,{props:o,children:a,patchFlag:c}=e,u=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?bg(r,o,u):!!o;if(c&8){const l=e.dynamicProps;for(let h=0;h<l.length;h++){const d=l[h];if(o[d]!==r[d]&&!Hu(u,d))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?bg(r,o,u):!0:!!o;return!1}function bg(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(e[s]!==t[s]&&!Hu(n,s))return!0}return!1}function $T({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Xv={},Zv=()=>Object.create(Xv),ew=t=>Object.getPrototypeOf(t)===Xv;function qT(t,e,n,r=!1){const i={},s=Zv();t.propsDefaults=Object.create(null),tw(t,e,i,s);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=r?i:Nv(i):t.type.props?t.props=i:t.props=s,t.attrs=s}function jT(t,e,n,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=t,a=_e(i),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const l=t.vnode.dynamicProps;for(let h=0;h<l.length;h++){let d=l[h];if(Hu(t.emitsOptions,d))continue;const f=e[d];if(c)if(Ie(s,d))f!==s[d]&&(s[d]=f,u=!0);else{const m=gn(d);i[m]=jh(c,a,m,f,t,!1)}else f!==s[d]&&(s[d]=f,u=!0)}}}else{tw(t,e,i,s)&&(u=!0);let l;for(const h in a)(!e||!Ie(e,h)&&((l=ai(h))===h||!Ie(e,l)))&&(c?n&&(n[h]!==void 0||n[l]!==void 0)&&(i[h]=jh(c,a,h,void 0,t,!0)):delete i[h]);if(s!==a)for(const h in s)(!e||!Ie(e,h))&&(delete s[h],u=!0)}u&&or(t.attrs,"set","")}function tw(t,e,n,r){const[i,s]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Go(c))continue;const u=e[c];let l;i&&Ie(i,l=gn(c))?!s||!s.includes(l)?n[l]=u:(a||(a={}))[l]=u:Hu(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(s){const c=_e(n),u=a||Ae;for(let l=0;l<s.length;l++){const h=s[l];n[h]=jh(i,c,h,u[h],t,!Ie(u,h))}}return o}function jh(t,e,n,r,i,s){const o=t[n];if(o!=null){const a=Ie(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&se(c)){const{propsDefaults:u}=i;if(n in u)r=u[n];else{const l=Qa(i);r=u[n]=c.call(null,e),l()}}else r=c;i.ce&&i.ce._setProp(n,r)}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===ai(n))&&(r=!0))}return r}const GT=new WeakMap;function nw(t,e,n=!1){const r=n?GT:e.propsCache,i=r.get(t);if(i)return i;const s=t.props,o={},a=[];let c=!1;if(!se(t)){const l=h=>{c=!0;const[d,f]=nw(h,e,!0);dt(o,d),f&&a.push(...f)};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}if(!s&&!c)return Ce(t)&&r.set(t,Es),Es;if(te(s))for(let l=0;l<s.length;l++){const h=gn(s[l]);Tg(h)&&(o[h]=Ae)}else if(s)for(const l in s){const h=gn(l);if(Tg(h)){const d=s[l],f=o[h]=te(d)||se(d)?{type:d}:dt({},d),m=f.type;let _=!1,T=!0;if(te(m))for(let D=0;D<m.length;++D){const O=m[D],N=se(O)&&O.name;if(N==="Boolean"){_=!0;break}else N==="String"&&(T=!1)}else _=se(m)&&m.name==="Boolean";f[0]=_,f[1]=T,(_||Ie(f,"default"))&&a.push(h)}}const u=[o,a];return Ce(t)&&r.set(t,u),u}function Tg(t){return t[0]!=="$"&&!Go(t)}const cf=t=>t==="_"||t==="_ctx"||t==="$stable",uf=t=>te(t)?t.map(Mn):[Mn(t)],zT=(t,e,n)=>{if(e._n)return e;const r=ir((...i)=>uf(e(...i)),n);return r._c=!1,r},rw=(t,e,n)=>{const r=t._ctx;for(const i in t){if(cf(i))continue;const s=t[i];if(se(s))e[i]=zT(i,s,r);else if(s!=null){const o=uf(s);e[i]=()=>o}}},iw=(t,e)=>{const n=uf(e);t.slots.default=()=>n},sw=(t,e,n)=>{for(const r in e)(n||!cf(r))&&(t[r]=e[r])},KT=(t,e,n)=>{const r=t.slots=Zv();if(t.vnode.shapeFlag&32){const i=e._;i?(sw(r,e,n),n&&dv(r,"_",i,!0)):rw(e,r)}else e&&iw(t,e)},HT=(t,e,n)=>{const{vnode:r,slots:i}=t;let s=!0,o=Ae;if(r.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:sw(i,e,n):(s=!e.$stable,rw(e,i)),o=e}else e&&(iw(t,e),o={default:1});if(s)for(const a in i)!cf(a)&&o[a]==null&&delete i[a]},sn=XT;function WT(t){return QT(t)}function QT(t,e){const n=ju();n.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:c,setText:u,setElementText:l,parentNode:h,nextSibling:d,setScopeId:f=In,insertStaticContent:m}=t,_=(p,g,v,S=null,I=null,k=null,B=void 0,F=null,M=!!g.dynamicChildren)=>{if(p===g)return;p&&!Eo(p,g)&&(S=E(p),kt(p,I,k,!0),p=null),g.patchFlag===-2&&(M=!1,g.dynamicChildren=null);const{type:R,ref:ee,shapeFlag:q}=g;switch(R){case Wu:T(p,g,v,S);break;case vr:D(p,g,v,S);break;case $c:p==null&&O(g,v,S,B);break;case Pt:tr(p,g,v,S,I,k,B,F,M);break;default:q&1?W(p,g,v,S,I,k,B,F,M):q&6?tn(p,g,v,S,I,k,B,F,M):(q&64||q&128)&&R.process(p,g,v,S,I,k,B,F,M,Y)}ee!=null&&I?Wo(ee,p&&p.ref,k,g||p,!g):ee==null&&p&&p.ref!=null&&Wo(p.ref,null,k,p,!0)},T=(p,g,v,S)=>{if(p==null)r(g.el=a(g.children),v,S);else{const I=g.el=p.el;g.children!==p.children&&u(I,g.children)}},D=(p,g,v,S)=>{p==null?r(g.el=c(g.children||""),v,S):g.el=p.el},O=(p,g,v,S)=>{[p.el,p.anchor]=m(p.children,g,v,S,p.el,p.anchor)},N=({el:p,anchor:g},v,S)=>{let I;for(;p&&p!==g;)I=d(p),r(p,v,S),p=I;r(g,v,S)},P=({el:p,anchor:g})=>{let v;for(;p&&p!==g;)v=d(p),i(p),p=v;i(g)},W=(p,g,v,S,I,k,B,F,M)=>{if(g.type==="svg"?B="svg":g.type==="math"&&(B="mathml"),p==null)Z(g,v,S,I,k,B,F,M);else{const R=p.el&&p.el._isVueCE?p.el:null;try{R&&R._beginPatch(),$e(p,g,I,k,B,F,M)}finally{R&&R._endPatch()}}},Z=(p,g,v,S,I,k,B,F)=>{let M,R;const{props:ee,shapeFlag:q,transition:Q,dirs:ne}=p;if(M=p.el=o(p.type,k,ee&&ee.is,ee),q&8?l(M,p.children):q&16&&ye(p.children,M,null,S,I,nh(p,k),B,F),ne&&yi(p,null,S,"created"),J(M,p,p.scopeId,B,S),ee){for(const ke in ee)ke!=="value"&&!Go(ke)&&s(M,ke,null,ee[ke],k,S);"value"in ee&&s(M,"value",null,ee.value,k),(R=ee.onVnodeBeforeMount)&&Pn(R,S,p)}ne&&yi(p,null,S,"beforeMount");const le=YT(I,Q);le&&Q.beforeEnter(M),r(M,g,v),((R=ee&&ee.onVnodeMounted)||le||ne)&&sn(()=>{R&&Pn(R,S,p),le&&Q.enter(M),ne&&yi(p,null,S,"mounted")},I)},J=(p,g,v,S,I)=>{if(v&&f(p,v),S)for(let k=0;k<S.length;k++)f(p,S[k]);if(I){let k=I.subTree;if(g===k||uw(k.type)&&(k.ssContent===g||k.ssFallback===g)){const B=I.vnode;J(p,B,B.scopeId,B.slotScopeIds,I.parent)}}},ye=(p,g,v,S,I,k,B,F,M=0)=>{for(let R=M;R<p.length;R++){const ee=p[R]=F?Fr(p[R]):Mn(p[R]);_(null,ee,g,v,S,I,k,B,F)}},$e=(p,g,v,S,I,k,B)=>{const F=g.el=p.el;let{patchFlag:M,dynamicChildren:R,dirs:ee}=g;M|=p.patchFlag&16;const q=p.props||Ae,Q=g.props||Ae;let ne;if(v&&vi(v,!1),(ne=Q.onVnodeBeforeUpdate)&&Pn(ne,v,g,p),ee&&yi(g,p,v,"beforeUpdate"),v&&vi(v,!0),(q.innerHTML&&Q.innerHTML==null||q.textContent&&Q.textContent==null)&&l(F,""),R?xe(p.dynamicChildren,R,F,v,S,nh(g,I),k):B||ge(p,g,F,null,v,S,nh(g,I),k,!1),M>0){if(M&16)yt(F,q,Q,v,I);else if(M&2&&q.class!==Q.class&&s(F,"class",null,Q.class,I),M&4&&s(F,"style",q.style,Q.style,I),M&8){const le=g.dynamicProps;for(let ke=0;ke<le.length;ke++){const Ee=le[ke],Ht=q[Ee],Nt=Q[Ee];(Nt!==Ht||Ee==="value")&&s(F,Ee,Ht,Nt,I,v)}}M&1&&p.children!==g.children&&l(F,g.children)}else!B&&R==null&&yt(F,q,Q,v,I);((ne=Q.onVnodeUpdated)||ee)&&sn(()=>{ne&&Pn(ne,v,g,p),ee&&yi(g,p,v,"updated")},S)},xe=(p,g,v,S,I,k,B)=>{for(let F=0;F<g.length;F++){const M=p[F],R=g[F],ee=M.el&&(M.type===Pt||!Eo(M,R)||M.shapeFlag&198)?h(M.el):v;_(M,R,ee,null,S,I,k,B,!0)}},yt=(p,g,v,S,I)=>{if(g!==v){if(g!==Ae)for(const k in g)!Go(k)&&!(k in v)&&s(p,k,g[k],null,I,S);for(const k in v){if(Go(k))continue;const B=v[k],F=g[k];B!==F&&k!=="value"&&s(p,k,F,B,I,S)}"value"in v&&s(p,"value",g.value,v.value,I)}},tr=(p,g,v,S,I,k,B,F,M)=>{const R=g.el=p?p.el:a(""),ee=g.anchor=p?p.anchor:a("");let{patchFlag:q,dynamicChildren:Q,slotScopeIds:ne}=g;ne&&(F=F?F.concat(ne):ne),p==null?(r(R,v,S),r(ee,v,S),ye(g.children||[],v,ee,I,k,B,F,M)):q>0&&q&64&&Q&&p.dynamicChildren&&p.dynamicChildren.length===Q.length?(xe(p.dynamicChildren,Q,v,I,k,B,F),(g.key!=null||I&&g===I.subTree)&&ow(p,g,!0)):ge(p,g,v,ee,I,k,B,F,M)},tn=(p,g,v,S,I,k,B,F,M)=>{g.slotScopeIds=F,p==null?g.shapeFlag&512?I.ctx.activate(g,v,S,B,M):kr(g,v,S,I,k,B,M):Nn(p,g,M)},kr=(p,g,v,S,I,k,B)=>{const F=p.component=sS(p,S,I);if(qv(p)&&(F.ctx.renderer=Y),aS(F,!1,B),F.asyncDep){if(I&&I.registerDep(F,Xe,B),!p.el){const M=F.subTree=bt(vr);D(null,M,g,v),p.placeholder=M.el}}else Xe(F,p,g,v,I,k,B)},Nn=(p,g,v)=>{const S=g.component=p.component;if(BT(p,g,v))if(S.asyncDep&&!S.asyncResolved){ve(S,g,v);return}else S.next=g,S.update();else g.el=p.el,S.vnode=g},Xe=(p,g,v,S,I,k,B)=>{const F=()=>{if(p.isMounted){let{next:q,bu:Q,u:ne,parent:le,vnode:ke}=p;{const nn=aw(p);if(nn){q&&(q.el=ke.el,ve(p,q,B)),nn.asyncDep.then(()=>{p.isUnmounted||F()});return}}let Ee=q,Ht;vi(p,!1),q?(q.el=ke.el,ve(p,q,B)):q=ke,Q&&Uc(Q),(Ht=q.props&&q.props.onVnodeBeforeUpdate)&&Pn(Ht,le,q,ke),vi(p,!0);const Nt=th(p),vn=p.subTree;p.subTree=Nt,_(vn,Nt,h(vn.el),E(vn),p,I,k),q.el=Nt.el,Ee===null&&$T(p,Nt.el),ne&&sn(ne,I),(Ht=q.props&&q.props.onVnodeUpdated)&&sn(()=>Pn(Ht,le,q,ke),I)}else{let q;const{el:Q,props:ne}=g,{bm:le,m:ke,parent:Ee,root:Ht,type:Nt}=p,vn=Ss(g);if(vi(p,!1),le&&Uc(le),!vn&&(q=ne&&ne.onVnodeBeforeMount)&&Pn(q,Ee,g),vi(p,!0),Q&&Fe){const nn=()=>{p.subTree=th(p),Fe(Q,p.subTree,p,I,null)};vn&&Nt.__asyncHydrate?Nt.__asyncHydrate(Q,p,nn):nn()}else{Ht.ce&&Ht.ce._def.shadowRoot!==!1&&Ht.ce._injectChildStyle(Nt);const nn=p.subTree=th(p);_(null,nn,v,S,p,I,k),g.el=nn.el}if(ke&&sn(ke,I),!vn&&(q=ne&&ne.onVnodeMounted)){const nn=g;sn(()=>Pn(q,Ee,nn),I)}(g.shapeFlag&256||Ee&&Ss(Ee.vnode)&&Ee.vnode.shapeFlag&256)&&p.a&&sn(p.a,I),p.isMounted=!0,g=v=S=null}};p.scope.on();const M=p.effect=new mv(F);p.scope.off();const R=p.update=M.run.bind(M),ee=p.job=M.runIfDirty.bind(M);ee.i=p,ee.id=p.uid,M.scheduler=()=>sf(ee),vi(p,!0),R()},ve=(p,g,v)=>{g.component=p;const S=p.vnode.props;p.vnode=g,p.next=null,jT(p,g.props,S,v),HT(p,g.children,v),gr(),mg(p),mr()},ge=(p,g,v,S,I,k,B,F,M=!1)=>{const R=p&&p.children,ee=p?p.shapeFlag:0,q=g.children,{patchFlag:Q,shapeFlag:ne}=g;if(Q>0){if(Q&128){xn(R,q,v,S,I,k,B,F,M);return}else if(Q&256){yn(R,q,v,S,I,k,B,F,M);return}}ne&8?(ee&16&&me(R,I,k),q!==R&&l(v,q)):ee&16?ne&16?xn(R,q,v,S,I,k,B,F,M):me(R,I,k,!0):(ee&8&&l(v,""),ne&16&&ye(q,v,S,I,k,B,F,M))},yn=(p,g,v,S,I,k,B,F,M)=>{p=p||Es,g=g||Es;const R=p.length,ee=g.length,q=Math.min(R,ee);let Q;for(Q=0;Q<q;Q++){const ne=g[Q]=M?Fr(g[Q]):Mn(g[Q]);_(p[Q],ne,v,null,I,k,B,F,M)}R>ee?me(p,I,k,!0,!1,q):ye(g,v,S,I,k,B,F,M,q)},xn=(p,g,v,S,I,k,B,F,M)=>{let R=0;const ee=g.length;let q=p.length-1,Q=ee-1;for(;R<=q&&R<=Q;){const ne=p[R],le=g[R]=M?Fr(g[R]):Mn(g[R]);if(Eo(ne,le))_(ne,le,v,null,I,k,B,F,M);else break;R++}for(;R<=q&&R<=Q;){const ne=p[q],le=g[Q]=M?Fr(g[Q]):Mn(g[Q]);if(Eo(ne,le))_(ne,le,v,null,I,k,B,F,M);else break;q--,Q--}if(R>q){if(R<=Q){const ne=Q+1,le=ne<ee?g[ne].el:S;for(;R<=Q;)_(null,g[R]=M?Fr(g[R]):Mn(g[R]),v,le,I,k,B,F,M),R++}}else if(R>Q)for(;R<=q;)kt(p[R],I,k,!0),R++;else{const ne=R,le=R,ke=new Map;for(R=le;R<=Q;R++){const rn=g[R]=M?Fr(g[R]):Mn(g[R]);rn.key!=null&&ke.set(rn.key,R)}let Ee,Ht=0;const Nt=Q-le+1;let vn=!1,nn=0;const _o=new Array(Nt);for(R=0;R<Nt;R++)_o[R]=0;for(R=ne;R<=q;R++){const rn=p[R];if(Ht>=Nt){kt(rn,I,k,!0);continue}let Dn;if(rn.key!=null)Dn=ke.get(rn.key);else for(Ee=le;Ee<=Q;Ee++)if(_o[Ee-le]===0&&Eo(rn,g[Ee])){Dn=Ee;break}Dn===void 0?kt(rn,I,k,!0):(_o[Dn-le]=R+1,Dn>=nn?nn=Dn:vn=!0,_(rn,g[Dn],v,null,I,k,B,F,M),Ht++)}const ug=vn?JT(_o):Es;for(Ee=ug.length-1,R=Nt-1;R>=0;R--){const rn=le+R,Dn=g[rn],lg=g[rn+1],hg=rn+1<ee?lg.el||cw(lg):S;_o[R]===0?_(null,Dn,v,hg,I,k,B,F,M):vn&&(Ee<0||R!==ug[Ee]?je(Dn,v,hg,2):Ee--)}}},je=(p,g,v,S,I=null)=>{const{el:k,type:B,transition:F,children:M,shapeFlag:R}=p;if(R&6){je(p.component.subTree,g,v,S);return}if(R&128){p.suspense.move(g,v,S);return}if(R&64){B.move(p,g,v,Y);return}if(B===Pt){r(k,g,v);for(let q=0;q<M.length;q++)je(M[q],g,v,S);r(p.anchor,g,v);return}if(B===$c){N(p,g,v);return}if(S!==2&&R&1&&F)if(S===0)F.beforeEnter(k),r(k,g,v),sn(()=>F.enter(k),I);else{const{leave:q,delayLeave:Q,afterLeave:ne}=F,le=()=>{p.ctx.isUnmounted?i(k):r(k,g,v)},ke=()=>{k._isLeaving&&k[dT](!0),q(k,()=>{le(),ne&&ne()})};Q?Q(k,le,ke):ke()}else r(k,g,v)},kt=(p,g,v,S=!1,I=!1)=>{const{type:k,props:B,ref:F,children:M,dynamicChildren:R,shapeFlag:ee,patchFlag:q,dirs:Q,cacheIndex:ne}=p;if(q===-2&&(I=!1),F!=null&&(gr(),Wo(F,null,v,p,!0),mr()),ne!=null&&(g.renderCache[ne]=void 0),ee&256){g.ctx.deactivate(p);return}const le=ee&1&&Q,ke=!Ss(p);let Ee;if(ke&&(Ee=B&&B.onVnodeBeforeUnmount)&&Pn(Ee,g,p),ee&6)Rt(p.component,v,S);else{if(ee&128){p.suspense.unmount(v,S);return}le&&yi(p,null,g,"beforeUnmount"),ee&64?p.type.remove(p,g,v,Y,S):R&&!R.hasOnce&&(k!==Pt||q>0&&q&64)?me(R,g,v,!1,!0):(k===Pt&&q&384||!I&&ee&16)&&me(M,g,v),S&&De(p)}(ke&&(Ee=B&&B.onVnodeUnmounted)||le)&&sn(()=>{Ee&&Pn(Ee,g,p),le&&yi(p,null,g,"unmounted")},v)},De=p=>{const{type:g,el:v,anchor:S,transition:I}=p;if(g===Pt){z(v,S);return}if(g===$c){P(p);return}const k=()=>{i(v),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(p.shapeFlag&1&&I&&!I.persisted){const{leave:B,delayLeave:F}=I,M=()=>B(v,k);F?F(p.el,k,M):M()}else k()},z=(p,g)=>{let v;for(;p!==g;)v=d(p),i(p),p=v;i(g)},Rt=(p,g,v)=>{const{bum:S,scope:I,job:k,subTree:B,um:F,m:M,a:R}=p;Sg(M),Sg(R),S&&Uc(S),I.stop(),k&&(k.flags|=8,kt(B,p,g,v)),F&&sn(F,g),sn(()=>{p.isUnmounted=!0},g)},me=(p,g,v,S=!1,I=!1,k=0)=>{for(let B=k;B<p.length;B++)kt(p[B],g,v,S,I)},E=p=>{if(p.shapeFlag&6)return E(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const g=d(p.anchor||p.el),v=g&&g[lT];return v?d(v):g};let G=!1;const $=(p,g,v)=>{let S;p==null?g._vnode&&(kt(g._vnode,null,null,!0),S=g._vnode.component):_(g._vnode||null,p,g,null,null,null,v),g._vnode=p,G||(G=!0,mg(S),Mv(),G=!1)},Y={p:_,um:kt,m:je,r:De,mt:kr,mc:ye,pc:ge,pbc:xe,n:E,o:t};let ae,Fe;return e&&([ae,Fe]=e(Y)),{render:$,hydrate:ae,createApp:OT($,ae)}}function nh({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function vi({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function YT(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ow(t,e,n=!1){const r=t.children,i=e.children;if(te(r)&&te(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=Fr(i[s]),a.el=o.el),!n&&a.patchFlag!==-2&&ow(o,a)),a.type===Wu&&(a.patchFlag!==-1?a.el=o.el:a.__elIndex=s+(t.type===Pt?1:0)),a.type===vr&&!a.el&&(a.el=o.el)}}function JT(t){const e=t.slice(),n=[0];let r,i,s,o,a;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(i=n[n.length-1],t[i]<u){e[r]=i,n.push(r);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,t[n[a]]<u?s=a+1:o=a;u<t[n[s]]&&(s>0&&(e[r]=n[s-1]),n[s]=r)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function aw(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:aw(e)}function Sg(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function cw(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?cw(e.subTree):null}const uw=t=>t.__isSuspense;function XT(t,e){e&&e.pendingBranch?te(t)?e.effects.push(...t):e.effects.push(t):oT(t)}const Pt=Symbol.for("v-fgt"),Wu=Symbol.for("v-txt"),vr=Symbol.for("v-cmt"),$c=Symbol.for("v-stc"),Yo=[];let an=null;function ue(t=!1){Yo.push(an=t?null:[])}function ZT(){Yo.pop(),an=Yo[Yo.length-1]||null}let ha=1;function au(t,e=!1){ha+=t,t<0&&an&&e&&(an.hasOnce=!0)}function lw(t){return t.dynamicChildren=ha>0?an||Es:null,ZT(),ha>0&&an&&an.push(t),t}function Ve(t,e,n,r,i,s){return lw(C(t,e,n,r,i,s,!0))}function wn(t,e,n,r,i){return lw(bt(t,e,n,r,i,!0))}function da(t){return t?t.__v_isVNode===!0:!1}function Eo(t,e){return t.type===e.type&&t.key===e.key}const hw=({key:t})=>t??null,qc=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?rt(t)||Mt(t)||se(t)?{i:Et,r:t,k:e,f:!!n}:t:null);function C(t,e=null,n=null,r=0,i=null,s=t===Pt?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&hw(e),ref:e&&qc(e),scopeId:Fv,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Et};return a?(lf(c,n),s&128&&t.normalize(c)):n&&(c.shapeFlag|=rt(n)?8:16),ha>0&&!o&&an&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&an.push(c),c}const bt=eS;function eS(t,e=null,n=null,r=0,i=null,s=!1){if((!t||t===TT)&&(t=vr),da(t)){const a=Fs(t,e,!0);return n&&lf(a,n),ha>0&&!s&&an&&(a.shapeFlag&6?an[an.indexOf(t)]=a:an.push(a)),a.patchFlag=-2,a}if(dS(t)&&(t=t.__vccOpts),e){e=tS(e);let{class:a,style:c}=e;a&&!rt(a)&&(e.class=Ur(a)),Ce(c)&&(nf(c)&&!te(c)&&(c=dt({},c)),e.style=Wd(c))}const o=rt(t)?1:uw(t)?128:hT(t)?64:Ce(t)?4:se(t)?2:0;return C(t,e,n,r,i,o,s,!0)}function tS(t){return t?nf(t)||ew(t)?dt({},t):t:null}function Fs(t,e,n=!1,r=!1){const{props:i,ref:s,patchFlag:o,children:a,transition:c}=t,u=e?nS(i||{},e):i,l={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&hw(u),ref:e&&e.ref?n&&s?te(s)?s.concat(qc(e)):[s,qc(e)]:qc(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Pt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Fs(t.ssContent),ssFallback:t.ssFallback&&Fs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&of(l,c.clone(l)),l}function dw(t=" ",e=0){return bt(Wu,null,t,e)}function JF(t,e){const n=bt($c,null,t);return n.staticCount=e,n}function vt(t="",e=!1){return e?(ue(),wn(vr,null,t)):bt(vr,null,t)}function Mn(t){return t==null||typeof t=="boolean"?bt(vr):te(t)?bt(Pt,null,t.slice()):da(t)?Fr(t):bt(Wu,null,String(t))}function Fr(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Fs(t)}function lf(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(te(e))n=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),lf(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!ew(e)?e._ctx=Et:i===3&&Et&&(Et.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else se(e)?(e={default:e,_ctx:Et},n=32):(e=String(e),r&64?(n=16,e=[dw(e)]):n=8);t.children=e,t.shapeFlag|=n}function nS(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=Ur([e.class,r.class]));else if(i==="style")e.style=Wd([e.style,r.style]);else if(Uu(i)){const s=e[i],o=r[i];o&&s!==o&&!(te(s)&&s.includes(o))&&(e[i]=s?[].concat(s,o):o)}else i!==""&&(e[i]=r[i])}return e}function Pn(t,e,n,r=null){Yn(t,e,7,[n,r])}const rS=Yv();let iS=0;function sS(t,e,n){const r=t.type,i=(e?e.appContext:t.appContext)||rS,s={uid:iS++,vnode:t,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Nb(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:nw(r,i),emitsOptions:Jv(r,i),emit:null,emitted:null,propsDefaults:Ae,inheritAttrs:r.inheritAttrs,ctx:Ae,data:Ae,props:Ae,attrs:Ae,slots:Ae,refs:Ae,setupState:Ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=LT.bind(null,s),t.ce&&t.ce(s),s}let Ot=null;const oS=()=>Ot||Et;let cu,Gh;{const t=ju(),e=(n,r)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};cu=e("__VUE_INSTANCE_SETTERS__",n=>Ot=n),Gh=e("__VUE_SSR_SETTERS__",n=>fa=n)}const Qa=t=>{const e=Ot;return cu(t),t.scope.on(),()=>{t.scope.off(),cu(e)}},Ag=()=>{Ot&&Ot.scope.off(),cu(null)};function fw(t){return t.vnode.shapeFlag&4}let fa=!1;function aS(t,e=!1,n=!1){e&&Gh(e);const{props:r,children:i}=t.vnode,s=fw(t);qT(t,r,s,e),KT(t,i,n||e);const o=s?cS(t,e):void 0;return e&&Gh(!1),o}function cS(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,CT);const{setup:r}=n;if(r){gr();const i=t.setupContext=r.length>1?lS(t):null,s=Qa(t),o=Wa(r,t,0,[t.props,i]),a=uv(o);if(mr(),s(),(a||t.sp)&&!Ss(t)&&$v(t),a){if(o.then(Ag,Ag),e)return o.then(c=>{Cg(t,c,e)}).catch(c=>{zu(c,t,0)});t.asyncDep=o}else Cg(t,o,e)}else pw(t,e)}function Cg(t,e,n){se(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ce(e)&&(t.setupState=Dv(e)),pw(t,n)}let kg;function pw(t,e,n){const r=t.type;if(!t.render){if(!e&&kg&&!r.render){const i=r.template||af(t).template;if(i){const{isCustomElement:s,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:c}=r,u=dt(dt({isCustomElement:s,delimiters:a},o),c);r.render=kg(i,u)}}t.render=r.render||In}{const i=Qa(t);gr();try{kT(t)}finally{mr(),i()}}}const uS={get(t,e){return Dt(t,"get",""),t[e]}};function lS(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,uS),slots:t.slots,emit:t.emit,expose:e}}function Qu(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Dv(Yb(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Qo)return Qo[n](t)},has(e,n){return n in e||n in Qo}})):t.proxy}function hS(t,e=!0){return se(t)?t.displayName||t.name:t.name||e&&t.__name}function dS(t){return se(t)&&"__vccOpts"in t}const tt=(t,e)=>tT(t,e,fa);function gw(t,e,n){try{au(-1);const r=arguments.length;return r===2?Ce(e)&&!te(e)?da(e)?bt(t,null,[e]):bt(t,e):bt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&da(n)&&(n=[n]),bt(t,e,n))}finally{au(1)}}const fS="3.5.26";/**
* @vue/runtime-dom v3.5.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let zh;const Rg=typeof window<"u"&&window.trustedTypes;if(Rg)try{zh=Rg.createPolicy("vue",{createHTML:t=>t})}catch{}const mw=zh?t=>zh.createHTML(t):t=>t,pS="http://www.w3.org/2000/svg",gS="http://www.w3.org/1998/Math/MathML",sr=typeof document<"u"?document:null,Ng=sr&&sr.createElement("template"),mS={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const i=e==="svg"?sr.createElementNS(pS,t):e==="mathml"?sr.createElementNS(gS,t):n?sr.createElement(t,{is:n}):sr.createElement(t);return t==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:t=>sr.createTextNode(t),createComment:t=>sr.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>sr.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,i,s){const o=n?n.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===s||!(i=i.nextSibling)););else{Ng.innerHTML=mw(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=Ng.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},yS=Symbol("_vtc");function vS(t,e,n){const r=t[yS];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const uu=Symbol("_vod"),yw=Symbol("_vsh"),XF={name:"show",beforeMount(t,{value:e},{transition:n}){t[uu]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):bo(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),bo(t,!0),r.enter(t)):r.leave(t,()=>{bo(t,!1)}):bo(t,e))},beforeUnmount(t,{value:e}){bo(t,e)}};function bo(t,e){t.style.display=e?t[uu]:"none",t[yw]=!e}const wS=Symbol(""),_S=/(?:^|;)\s*display\s*:/;function IS(t,e,n){const r=t.style,i=rt(n);let s=!1;if(n&&!i){if(e)if(rt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&jc(r,a,"")}else for(const o in e)n[o]==null&&jc(r,o,"");for(const o in n)o==="display"&&(s=!0),jc(r,o,n[o])}else if(i){if(e!==n){const o=r[wS];o&&(n+=";"+o),r.cssText=n,s=_S.test(n)}}else e&&t.removeAttribute("style");uu in t&&(t[uu]=s?r.display:"",t[yw]&&(r.display="none"))}const xg=/\s*!important$/;function jc(t,e,n){if(te(n))n.forEach(r=>jc(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=ES(t,e);xg.test(n)?t.setProperty(ai(r),n.replace(xg,""),"important"):t[r]=n}}const Dg=["Webkit","Moz","ms"],rh={};function ES(t,e){const n=rh[e];if(n)return n;let r=gn(e);if(r!=="filter"&&r in t)return rh[e]=r;r=$u(r);for(let i=0;i<Dg.length;i++){const s=Dg[i]+r;if(s in t)return rh[e]=s}return e}const Pg="http://www.w3.org/1999/xlink";function Og(t,e,n,r,i,s=kb(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Pg,e.slice(6,e.length)):t.setAttributeNS(Pg,e,n):n==null||s&&!fv(n)?t.removeAttribute(e):t.setAttribute(e,s?"":bn(n)?String(n):n)}function Mg(t,e,n,r,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?mw(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=fv(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function Br(t,e,n,r){t.addEventListener(e,n,r)}function bS(t,e,n,r){t.removeEventListener(e,n,r)}const Lg=Symbol("_vei");function TS(t,e,n,r,i=null){const s=t[Lg]||(t[Lg]={}),o=s[e];if(r&&o)o.value=r;else{const[a,c]=SS(e);if(r){const u=s[e]=kS(r,i);Br(t,a,u,c)}else o&&(bS(t,a,o,c),s[e]=void 0)}}const Fg=/(?:Once|Passive|Capture)$/;function SS(t){let e;if(Fg.test(t)){e={};let r;for(;r=t.match(Fg);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):ai(t.slice(2)),e]}let ih=0;const AS=Promise.resolve(),CS=()=>ih||(AS.then(()=>ih=0),ih=Date.now());function kS(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Yn(RS(r,n.value),e,5,[r])};return n.value=t,n.attached=CS(),n}function RS(t,e){if(te(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Vg=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,NS=(t,e,n,r,i,s)=>{const o=i==="svg";e==="class"?vS(t,r,o):e==="style"?IS(t,n,r):Uu(e)?zd(e)||TS(t,e,n,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):xS(t,e,r,o))?(Mg(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Og(t,e,r,o,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!rt(r))?Mg(t,gn(e),r,s,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Og(t,e,r,o))};function xS(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Vg(e)&&se(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Vg(e)&&rt(n)?!1:e in t}const Vs=t=>{const e=t.props["onUpdate:modelValue"]||!1;return te(e)?n=>Uc(e,n):e};function DS(t){t.target.composing=!0}function Ug(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const dr=Symbol("_assign");function Bg(t,e,n){return e&&(t=t.trim()),n&&(t=qu(t)),t}const sh={created(t,{modifiers:{lazy:e,trim:n,number:r}},i){t[dr]=Vs(i);const s=r||i.props&&i.props.type==="number";Br(t,e?"change":"input",o=>{o.target.composing||t[dr](Bg(t.value,n,s))}),(n||s)&&Br(t,"change",()=>{t.value=Bg(t.value,n,s)}),e||(Br(t,"compositionstart",DS),Br(t,"compositionend",Ug),Br(t,"change",Ug))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:i,number:s}},o){if(t[dr]=Vs(o),t.composing)return;const a=(s||t.type==="number")&&!/^0\d/.test(t.value)?qu(t.value):t.value,c=e??"";a!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||i&&t.value.trim()===c)||(t.value=c))}},ZF={deep:!0,created(t,e,n){t[dr]=Vs(n),Br(t,"change",()=>{const r=t._modelValue,i=pa(t),s=t.checked,o=t[dr];if(te(r)){const a=Qd(r,i),c=a!==-1;if(s&&!c)o(r.concat(i));else if(!s&&c){const u=[...r];u.splice(a,1),o(u)}}else if(no(r)){const a=new Set(r);s?a.add(i):a.delete(i),o(a)}else o(vw(t,s))})},mounted:$g,beforeUpdate(t,e,n){t[dr]=Vs(n),$g(t,e,n)}};function $g(t,{value:e,oldValue:n},r){t._modelValue=e;let i;if(te(e))i=Qd(e,r.props.value)>-1;else if(no(e))i=e.has(r.props.value);else{if(e===n)return;i=Ha(e,vw(t,!0))}t.checked!==i&&(t.checked=i)}const e2={deep:!0,created(t,{value:e,modifiers:{number:n}},r){const i=no(e);Br(t,"change",()=>{const s=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?qu(pa(o)):pa(o));t[dr](t.multiple?i?new Set(s):s:s[0]),t._assigning=!0,rf(()=>{t._assigning=!1})}),t[dr]=Vs(r)},mounted(t,{value:e}){qg(t,e)},beforeUpdate(t,e,n){t[dr]=Vs(n)},updated(t,{value:e}){t._assigning||qg(t,e)}};function qg(t,e){const n=t.multiple,r=te(e);if(!(n&&!r&&!no(e))){for(let i=0,s=t.options.length;i<s;i++){const o=t.options[i],a=pa(o);if(n)if(r){const c=typeof a;c==="string"||c==="number"?o.selected=e.some(u=>String(u)===String(a)):o.selected=Qd(e,a)>-1}else o.selected=e.has(a);else if(Ha(pa(o),e)){t.selectedIndex!==i&&(t.selectedIndex=i);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function pa(t){return"_value"in t?t._value:t.value}function vw(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const PS={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},jg=(t,e)=>{const n=t._withKeys||(t._withKeys={}),r=e.join(".");return n[r]||(n[r]=i=>{if(!("key"in i))return;const s=ai(i.key);if(e.some(o=>o===s||PS[o]===s))return t(i)})},OS=dt({patchProp:NS},mS);let Gg;function MS(){return Gg||(Gg=WT(OS))}const LS=(...t)=>{const e=MS().createApp(...t),{mount:n}=e;return e.mount=r=>{const i=VS(r);if(!i)return;const s=e._component;!se(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,FS(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function FS(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function VS(t){return rt(t)?document.querySelector(t):t}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ms=typeof document<"u";function ww(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function US(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&ww(t.default)}const we=Object.assign;function oh(t,e){const n={};for(const r in e){const i=e[r];n[r]=Sn(i)?i.map(t):t(i)}return n}const Jo=()=>{},Sn=Array.isArray;function zg(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}const _w=/#/g,BS=/&/g,$S=/\//g,qS=/=/g,jS=/\?/g,Iw=/\+/g,GS=/%5B/g,zS=/%5D/g,Ew=/%5E/g,KS=/%60/g,bw=/%7B/g,HS=/%7C/g,Tw=/%7D/g,WS=/%20/g;function hf(t){return t==null?"":encodeURI(""+t).replace(HS,"|").replace(GS,"[").replace(zS,"]")}function QS(t){return hf(t).replace(bw,"{").replace(Tw,"}").replace(Ew,"^")}function Kh(t){return hf(t).replace(Iw,"%2B").replace(WS,"+").replace(_w,"%23").replace(BS,"%26").replace(KS,"`").replace(bw,"{").replace(Tw,"}").replace(Ew,"^")}function YS(t){return Kh(t).replace(qS,"%3D")}function JS(t){return hf(t).replace(_w,"%23").replace(jS,"%3F")}function XS(t){return JS(t).replace($S,"%2F")}function ga(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const ZS=/\/$/,eA=t=>t.replace(ZS,"");function ah(t,e,n="/"){let r,i={},s="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=e.slice(0,c),s=e.slice(c,a>0?a:e.length),i=t(s.slice(1))),a>=0&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=iA(r??e,n),{fullPath:r+s+o,path:r,query:i,hash:ga(o)}}function tA(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Kg(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function nA(t,e,n){const r=e.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&Us(e.matched[r],n.matched[i])&&Sw(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Us(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Sw(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!rA(t[n],e[n]))return!1;return!0}function rA(t,e){return Sn(t)?Hg(t,e):Sn(e)?Hg(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function Hg(t,e){return Sn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function iA(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const Rr={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Hh=function(t){return t.pop="pop",t.push="push",t}({}),ch=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function sA(t){if(!t)if(ms){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),eA(t)}const oA=/^[^#]+#/;function aA(t,e){return t.replace(oA,"#")+e}function cA(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Yu=()=>({left:window.scrollX,top:window.scrollY});function uA(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=cA(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Wg(t,e){return(history.state?history.state.position-e:-1)+t}const Wh=new Map;function lA(t,e){Wh.set(t,e)}function hA(t){const e=Wh.get(t);return Wh.delete(t),e}function dA(t){return typeof t=="string"||t&&typeof t=="object"}function Aw(t){return typeof t=="string"||typeof t=="symbol"}let Ge=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Cw=Symbol("");Ge.MATCHER_NOT_FOUND+"",Ge.NAVIGATION_GUARD_REDIRECT+"",Ge.NAVIGATION_ABORTED+"",Ge.NAVIGATION_CANCELLED+"",Ge.NAVIGATION_DUPLICATED+"";function Bs(t,e){return we(new Error,{type:t,[Cw]:!0},e)}function rr(t,e){return t instanceof Error&&Cw in t&&(e==null||!!(t.type&e))}const fA=["params","query","hash"];function pA(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of fA)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function gA(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<n.length;++r){const i=n[r].replace(Iw," "),s=i.indexOf("="),o=ga(s<0?i:i.slice(0,s)),a=s<0?null:ga(i.slice(s+1));if(o in e){let c=e[o];Sn(c)||(c=e[o]=[c]),c.push(a)}else e[o]=a}return e}function Qg(t){let e="";for(let n in t){const r=t[n];if(n=YS(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Sn(r)?r.map(i=>i&&Kh(i)):[r&&Kh(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function mA(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Sn(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const yA=Symbol(""),Yg=Symbol(""),Ju=Symbol(""),kw=Symbol(""),Qh=Symbol("");function To(){let t=[];function e(r){return t.push(r),()=>{const i=t.indexOf(r);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Vr(t,e,n,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,c)=>{const u=d=>{d===!1?c(Bs(Ge.NAVIGATION_ABORTED,{from:n,to:e})):d instanceof Error?c(d):dA(d)?c(Bs(Ge.NAVIGATION_GUARD_REDIRECT,{from:e,to:d})):(o&&r.enterCallbacks[i]===o&&typeof d=="function"&&o.push(d),a())},l=s(()=>t.call(r&&r.instances[i],e,n,u));let h=Promise.resolve(l);t.length<3&&(h=h.then(u)),h.catch(d=>c(d))})}function uh(t,e,n,r,i=s=>s()){const s=[];for(const o of t)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(ww(c)){const u=(c.__vccOpts||c)[e];u&&s.push(Vr(u,n,r,o,a,i))}else{let u=c();s.push(()=>u.then(l=>{if(!l)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=US(l)?l.default:l;o.mods[a]=l,o.components[a]=h;const d=(h.__vccOpts||h)[e];return d&&Vr(d,n,r,o,a,i)()}))}}return s}function vA(t,e){const n=[],r=[],i=[],s=Math.max(e.matched.length,t.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(t.matched.find(u=>Us(u,a))?r.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(u=>Us(u,c))||i.push(c))}return[n,r,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let wA=()=>location.protocol+"//"+location.host;function Rw(t,e){const{pathname:n,search:r,hash:i}=e,s=t.indexOf("#");if(s>-1){let o=i.includes(t.slice(s))?t.slice(s).length:1,a=i.slice(o);return a[0]!=="/"&&(a="/"+a),Kg(a,"")}return Kg(n,t)+r+i}function _A(t,e,n,r){let i=[],s=[],o=null;const a=({state:d})=>{const f=Rw(t,location),m=n.value,_=e.value;let T=0;if(d){if(n.value=f,e.value=d,o&&o===m){o=null;return}T=_?d.position-_.position:0}else r(f);i.forEach(D=>{D(n.value,m,{delta:T,type:Hh.pop,direction:T?T>0?ch.forward:ch.back:ch.unknown})})};function c(){o=n.value}function u(d){i.push(d);const f=()=>{const m=i.indexOf(d);m>-1&&i.splice(m,1)};return s.push(f),f}function l(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(we({},d.state,{scroll:Yu()}),"")}}function h(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",l),document.removeEventListener("visibilitychange",l)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",l),document.addEventListener("visibilitychange",l),{pauseListeners:c,listen:u,destroy:h}}function Jg(t,e,n,r=!1,i=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:i?Yu():null}}function IA(t){const{history:e,location:n}=window,r={value:Rw(t,n)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(c,u,l){const h=t.indexOf("#"),d=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+c:wA()+t+c;try{e[l?"replaceState":"pushState"](u,"",d),i.value=u}catch(f){console.error(f),n[l?"replace":"assign"](d)}}function o(c,u){s(c,we({},e.state,Jg(i.value.back,c,i.value.forward,!0),u,{position:i.value.position}),!0),r.value=c}function a(c,u){const l=we({},i.value,e.state,{forward:c,scroll:Yu()});s(l.current,l,!0),s(c,we({},Jg(r.value,c,null),{position:l.position+1},u),!1),r.value=c}return{location:r,state:i,push:a,replace:o}}function EA(t){t=sA(t);const e=IA(t),n=_A(t,e.state,e.location,e.replace);function r(s,o=!0){o||n.pauseListeners(),history.go(s)}const i=we({location:"",base:t,go:r,createHref:aA.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}let Ri=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var st=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(st||{});const bA={type:Ri.Static,value:""},TA=/[a-zA-Z0-9_]/;function SA(t){if(!t)return[[]];if(t==="/")return[[bA]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(f){throw new Error(`ERR (${n})/"${u}": ${f}`)}let n=st.Static,r=n;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,c,u="",l="";function h(){u&&(n===st.Static?s.push({type:Ri.Static,value:u}):n===st.Param||n===st.ParamRegExp||n===st.ParamRegExpEnd?(s.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),s.push({type:Ri.Param,value:u,regexp:l,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function d(){u+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==st.ParamRegExp){r=n,n=st.EscapeNext;continue}switch(n){case st.Static:c==="/"?(u&&h(),o()):c===":"?(h(),n=st.Param):d();break;case st.EscapeNext:d(),n=r;break;case st.Param:c==="("?n=st.ParamRegExp:TA.test(c)?d():(h(),n=st.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case st.ParamRegExp:c===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+c:n=st.ParamRegExpEnd:l+=c;break;case st.ParamRegExpEnd:h(),n=st.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,l="";break;default:e("Unknown state");break}}return n===st.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),h(),o(),i}const Xg="[^/]+?",AA={sensitive:!1,strict:!1,start:!0,end:!0};var Bt=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(Bt||{});const CA=/[.+*?^${}()[\]/\\]/g;function kA(t,e){const n=we({},AA,e),r=[];let i=n.start?"^":"";const s=[];for(const u of t){const l=u.length?[]:[Bt.Root];n.strict&&!u.length&&(i+="/");for(let h=0;h<u.length;h++){const d=u[h];let f=Bt.Segment+(n.sensitive?Bt.BonusCaseSensitive:0);if(d.type===Ri.Static)h||(i+="/"),i+=d.value.replace(CA,"\\$&"),f+=Bt.Static;else if(d.type===Ri.Param){const{value:m,repeatable:_,optional:T,regexp:D}=d;s.push({name:m,repeatable:_,optional:T});const O=D||Xg;if(O!==Xg){f+=Bt.BonusCustomRegExp;try{`${O}`}catch(P){throw new Error(`Invalid custom RegExp for param "${m}" (${O}): `+P.message)}}let N=_?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;h||(N=T&&u.length<2?`(?:/${N})`:"/"+N),T&&(N+="?"),i+=N,f+=Bt.Dynamic,T&&(f+=Bt.BonusOptional),_&&(f+=Bt.BonusRepeatable),O===".*"&&(f+=Bt.BonusWildcard)}l.push(f)}r.push(l)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=Bt.BonusStrict}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function a(u){const l=u.match(o),h={};if(!l)return null;for(let d=1;d<l.length;d++){const f=l[d]||"",m=s[d-1];h[m.name]=f&&m.repeatable?f.split("/"):f}return h}function c(u){let l="",h=!1;for(const d of t){(!h||!l.endsWith("/"))&&(l+="/"),h=!1;for(const f of d)if(f.type===Ri.Static)l+=f.value;else if(f.type===Ri.Param){const{value:m,repeatable:_,optional:T}=f,D=m in u?u[m]:"";if(Sn(D)&&!_)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const O=Sn(D)?D.join("/"):D;if(!O)if(T)d.length<2&&(l.endsWith("/")?l=l.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);l+=O}}return l||"/"}return{re:o,score:r,keys:s,parse:a,stringify:c}}function RA(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===Bt.Static+Bt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===Bt.Static+Bt.Segment?1:-1:0}function Nw(t,e){let n=0;const r=t.score,i=e.score;for(;n<r.length&&n<i.length;){const s=RA(r[n],i[n]);if(s)return s;n++}if(Math.abs(i.length-r.length)===1){if(Zg(r))return 1;if(Zg(i))return-1}return i.length-r.length}function Zg(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const NA={strict:!1,end:!0,sensitive:!1};function xA(t,e,n){const r=kA(SA(t.path),n),i=we(r,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function DA(t,e){const n=[],r=new Map;e=zg(NA,e);function i(h){return r.get(h)}function s(h,d,f){const m=!f,_=tm(h);_.aliasOf=f&&f.record;const T=zg(e,h),D=[_];if("alias"in h){const P=typeof h.alias=="string"?[h.alias]:h.alias;for(const W of P)D.push(tm(we({},_,{components:f?f.record.components:_.components,path:W,aliasOf:f?f.record:_})))}let O,N;for(const P of D){const{path:W}=P;if(d&&W[0]!=="/"){const Z=d.record.path,J=Z[Z.length-1]==="/"?"":"/";P.path=d.record.path+(W&&J+W)}if(O=xA(P,d,T),f?f.alias.push(O):(N=N||O,N!==O&&N.alias.push(O),m&&h.name&&!nm(O)&&o(h.name)),xw(O)&&c(O),_.children){const Z=_.children;for(let J=0;J<Z.length;J++)s(Z[J],O,f&&f.children[J])}f=f||O}return N?()=>{o(N)}:Jo}function o(h){if(Aw(h)){const d=r.get(h);d&&(r.delete(h),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(h);d>-1&&(n.splice(d,1),h.record.name&&r.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return n}function c(h){const d=MA(h,n);n.splice(d,0,h),h.record.name&&!nm(h)&&r.set(h.record.name,h)}function u(h,d){let f,m={},_,T;if("name"in h&&h.name){if(f=r.get(h.name),!f)throw Bs(Ge.MATCHER_NOT_FOUND,{location:h});T=f.record.name,m=we(em(d.params,f.keys.filter(N=>!N.optional).concat(f.parent?f.parent.keys.filter(N=>N.optional):[]).map(N=>N.name)),h.params&&em(h.params,f.keys.map(N=>N.name))),_=f.stringify(m)}else if(h.path!=null)_=h.path,f=n.find(N=>N.re.test(_)),f&&(m=f.parse(_),T=f.record.name);else{if(f=d.name?r.get(d.name):n.find(N=>N.re.test(d.path)),!f)throw Bs(Ge.MATCHER_NOT_FOUND,{location:h,currentLocation:d});T=f.record.name,m=we({},d.params,h.params),_=f.stringify(m)}const D=[];let O=f;for(;O;)D.unshift(O.record),O=O.parent;return{name:T,path:_,params:m,matched:D,meta:OA(D)}}t.forEach(h=>s(h));function l(){n.length=0,r.clear()}return{addRoute:s,resolve:u,removeRoute:o,clearRoutes:l,getRoutes:a,getRecordMatcher:i}}function em(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function tm(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:PA(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function PA(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function nm(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function OA(t){return t.reduce((e,n)=>we(e,n.meta),{})}function MA(t,e){let n=0,r=e.length;for(;n!==r;){const s=n+r>>1;Nw(t,e[s])<0?r=s:n=s+1}const i=LA(t);return i&&(r=e.lastIndexOf(i,r-1)),r}function LA(t){let e=t;for(;e=e.parent;)if(xw(e)&&Nw(t,e)===0)return e}function xw({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function rm(t){const e=Kn(Ju),n=Kn(kw),r=tt(()=>{const c=Se(t.to);return e.resolve(c)}),i=tt(()=>{const{matched:c}=r.value,{length:u}=c,l=c[u-1],h=n.matched;if(!l||!h.length)return-1;const d=h.findIndex(Us.bind(null,l));if(d>-1)return d;const f=im(c[u-2]);return u>1&&im(l)===f&&h[h.length-1].path!==f?h.findIndex(Us.bind(null,c[u-2])):d}),s=tt(()=>i.value>-1&&$A(n.params,r.value.params)),o=tt(()=>i.value>-1&&i.value===n.matched.length-1&&Sw(n.params,r.value.params));function a(c={}){if(BA(c)){const u=e[Se(t.replace)?"replace":"push"](Se(t.to)).catch(Jo);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:tt(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function FA(t){return t.length===1?t[0]:t}const VA=Bv({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:rm,setup(t,{slots:e}){const n=Ms(rm(t)),{options:r}=Kn(Ju),i=tt(()=>({[sm(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[sm(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=e.default&&FA(e.default(n));return t.custom?s:gw("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},s)}}}),UA=VA;function BA(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function $A(t,e){for(const n in e){const r=e[n],i=t[n];if(typeof r=="string"){if(r!==i)return!1}else if(!Sn(i)||i.length!==r.length||r.some((s,o)=>s.valueOf()!==i[o].valueOf()))return!1}return!0}function im(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const sm=(t,e,n)=>t??e??n,qA=Bv({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Kn(Qh),i=tt(()=>t.route||r.value),s=Kn(Yg,0),o=tt(()=>{let u=Se(s);const{matched:l}=i.value;let h;for(;(h=l[u])&&!h.components;)u++;return u}),a=tt(()=>i.value.matched[o.value]);Bc(Yg,tt(()=>o.value+1)),Bc(yA,a),Bc(Qh,i);const c=ot();return Ho(()=>[c.value,a.value,t.name],([u,l,h],[d,f,m])=>{l&&(l.instances[h]=u,f&&f!==l&&u&&u===d&&(l.leaveGuards.size||(l.leaveGuards=f.leaveGuards),l.updateGuards.size||(l.updateGuards=f.updateGuards))),u&&l&&(!f||!Us(l,f)||!d)&&(l.enterCallbacks[h]||[]).forEach(_=>_(u))},{flush:"post"}),()=>{const u=i.value,l=t.name,h=a.value,d=h&&h.components[l];if(!d)return om(n.default,{Component:d,route:u});const f=h.props[l],m=f?f===!0?u.params:typeof f=="function"?f(u):f:null,T=gw(d,we({},m,e,{onVnodeUnmounted:D=>{D.component.isUnmounted&&(h.instances[l]=null)},ref:c}));return om(n.default,{Component:T,route:u})||T}}});function om(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const jA=qA;function GA(t){const e=DA(t.routes,t),n=t.parseQuery||gA,r=t.stringifyQuery||Qg,i=t.history,s=To(),o=To(),a=To(),c=Jb(Rr);let u=Rr;ms&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=oh.bind(null,E=>""+E),h=oh.bind(null,XS),d=oh.bind(null,ga);function f(E,G){let $,Y;return Aw(E)?($=e.getRecordMatcher(E),Y=G):Y=E,e.addRoute(Y,$)}function m(E){const G=e.getRecordMatcher(E);G&&e.removeRoute(G)}function _(){return e.getRoutes().map(E=>E.record)}function T(E){return!!e.getRecordMatcher(E)}function D(E,G){if(G=we({},G||c.value),typeof E=="string"){const g=ah(n,E,G.path),v=e.resolve({path:g.path},G),S=i.createHref(g.fullPath);return we(g,v,{params:d(v.params),hash:ga(g.hash),redirectedFrom:void 0,href:S})}let $;if(E.path!=null)$=we({},E,{path:ah(n,E.path,G.path).path});else{const g=we({},E.params);for(const v in g)g[v]==null&&delete g[v];$=we({},E,{params:h(g)}),G.params=h(G.params)}const Y=e.resolve($,G),ae=E.hash||"";Y.params=l(d(Y.params));const Fe=tA(r,we({},E,{hash:QS(ae),path:Y.path})),p=i.createHref(Fe);return we({fullPath:Fe,hash:ae,query:r===Qg?mA(E.query):E.query||{}},Y,{redirectedFrom:void 0,href:p})}function O(E){return typeof E=="string"?ah(n,E,c.value.path):we({},E)}function N(E,G){if(u!==E)return Bs(Ge.NAVIGATION_CANCELLED,{from:G,to:E})}function P(E){return J(E)}function W(E){return P(we(O(E),{replace:!0}))}function Z(E,G){const $=E.matched[E.matched.length-1];if($&&$.redirect){const{redirect:Y}=$;let ae=typeof Y=="function"?Y(E,G):Y;return typeof ae=="string"&&(ae=ae.includes("?")||ae.includes("#")?ae=O(ae):{path:ae},ae.params={}),we({query:E.query,hash:E.hash,params:ae.path!=null?{}:E.params},ae)}}function J(E,G){const $=u=D(E),Y=c.value,ae=E.state,Fe=E.force,p=E.replace===!0,g=Z($,Y);if(g)return J(we(O(g),{state:typeof g=="object"?we({},ae,g.state):ae,force:Fe,replace:p}),G||$);const v=$;v.redirectedFrom=G;let S;return!Fe&&nA(r,Y,$)&&(S=Bs(Ge.NAVIGATION_DUPLICATED,{to:v,from:Y}),je(Y,Y,!0,!1)),(S?Promise.resolve(S):xe(v,Y)).catch(I=>rr(I)?rr(I,Ge.NAVIGATION_GUARD_REDIRECT)?I:xn(I):ge(I,v,Y)).then(I=>{if(I){if(rr(I,Ge.NAVIGATION_GUARD_REDIRECT))return J(we({replace:p},O(I.to),{state:typeof I.to=="object"?we({},ae,I.to.state):ae,force:Fe}),G||v)}else I=tr(v,Y,!0,p,ae);return yt(v,Y,I),I})}function ye(E,G){const $=N(E,G);return $?Promise.reject($):Promise.resolve()}function $e(E){const G=z.values().next().value;return G&&typeof G.runWithContext=="function"?G.runWithContext(E):E()}function xe(E,G){let $;const[Y,ae,Fe]=vA(E,G);$=uh(Y.reverse(),"beforeRouteLeave",E,G);for(const g of Y)g.leaveGuards.forEach(v=>{$.push(Vr(v,E,G))});const p=ye.bind(null,E,G);return $.push(p),me($).then(()=>{$=[];for(const g of s.list())$.push(Vr(g,E,G));return $.push(p),me($)}).then(()=>{$=uh(ae,"beforeRouteUpdate",E,G);for(const g of ae)g.updateGuards.forEach(v=>{$.push(Vr(v,E,G))});return $.push(p),me($)}).then(()=>{$=[];for(const g of Fe)if(g.beforeEnter)if(Sn(g.beforeEnter))for(const v of g.beforeEnter)$.push(Vr(v,E,G));else $.push(Vr(g.beforeEnter,E,G));return $.push(p),me($)}).then(()=>(E.matched.forEach(g=>g.enterCallbacks={}),$=uh(Fe,"beforeRouteEnter",E,G,$e),$.push(p),me($))).then(()=>{$=[];for(const g of o.list())$.push(Vr(g,E,G));return $.push(p),me($)}).catch(g=>rr(g,Ge.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function yt(E,G,$){a.list().forEach(Y=>$e(()=>Y(E,G,$)))}function tr(E,G,$,Y,ae){const Fe=N(E,G);if(Fe)return Fe;const p=G===Rr,g=ms?history.state:{};$&&(Y||p?i.replace(E.fullPath,we({scroll:p&&g&&g.scroll},ae)):i.push(E.fullPath,ae)),c.value=E,je(E,G,$,p),xn()}let tn;function kr(){tn||(tn=i.listen((E,G,$)=>{if(!Rt.listening)return;const Y=D(E),ae=Z(Y,Rt.currentRoute.value);if(ae){J(we(ae,{replace:!0,force:!0}),Y).catch(Jo);return}u=Y;const Fe=c.value;ms&&lA(Wg(Fe.fullPath,$.delta),Yu()),xe(Y,Fe).catch(p=>rr(p,Ge.NAVIGATION_ABORTED|Ge.NAVIGATION_CANCELLED)?p:rr(p,Ge.NAVIGATION_GUARD_REDIRECT)?(J(we(O(p.to),{force:!0}),Y).then(g=>{rr(g,Ge.NAVIGATION_ABORTED|Ge.NAVIGATION_DUPLICATED)&&!$.delta&&$.type===Hh.pop&&i.go(-1,!1)}).catch(Jo),Promise.reject()):($.delta&&i.go(-$.delta,!1),ge(p,Y,Fe))).then(p=>{p=p||tr(Y,Fe,!1),p&&($.delta&&!rr(p,Ge.NAVIGATION_CANCELLED)?i.go(-$.delta,!1):$.type===Hh.pop&&rr(p,Ge.NAVIGATION_ABORTED|Ge.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),yt(Y,Fe,p)}).catch(Jo)}))}let Nn=To(),Xe=To(),ve;function ge(E,G,$){xn(E);const Y=Xe.list();return Y.length?Y.forEach(ae=>ae(E,G,$)):console.error(E),Promise.reject(E)}function yn(){return ve&&c.value!==Rr?Promise.resolve():new Promise((E,G)=>{Nn.add([E,G])})}function xn(E){return ve||(ve=!E,kr(),Nn.list().forEach(([G,$])=>E?$(E):G()),Nn.reset()),E}function je(E,G,$,Y){const{scrollBehavior:ae}=t;if(!ms||!ae)return Promise.resolve();const Fe=!$&&hA(Wg(E.fullPath,0))||(Y||!$)&&history.state&&history.state.scroll||null;return rf().then(()=>ae(E,G,Fe)).then(p=>p&&uA(p)).catch(p=>ge(p,E,G))}const kt=E=>i.go(E);let De;const z=new Set,Rt={currentRoute:c,listening:!0,addRoute:f,removeRoute:m,clearRoutes:e.clearRoutes,hasRoute:T,getRoutes:_,resolve:D,options:t,push:P,replace:W,go:kt,back:()=>kt(-1),forward:()=>kt(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:Xe.add,isReady:yn,install(E){E.component("RouterLink",UA),E.component("RouterView",jA),E.config.globalProperties.$router=Rt,Object.defineProperty(E.config.globalProperties,"$route",{enumerable:!0,get:()=>Se(c)}),ms&&!De&&c.value===Rr&&(De=!0,P(i.location).catch(Y=>{}));const G={};for(const Y in Rr)Object.defineProperty(G,Y,{get:()=>c.value[Y],enumerable:!0});E.provide(Ju,Rt),E.provide(kw,Nv(G)),E.provide(Qh,c);const $=E.unmount;z.add(E),E.unmount=function(){z.delete(E),z.size<1&&(u=Rr,tn&&tn(),tn=null,c.value=Rr,De=!1,ve=!1),$()}}};function me(E){return E.reduce((G,$)=>G.then(()=>$e($)),Promise.resolve())}return Rt}function zA(){return Kn(Ju)}const KA="/football-team-manager/assets/logo-cdc58341.png",ro=ot(localStorage.getItem("user_role")||null),lu=ot(localStorage.getItem("guest_member_id")?parseInt(localStorage.getItem("guest_member_id")):null),Xu={ADMIN:"admin",GUEST:"guest"},Dw=tt(()=>ro.value===Xu.ADMIN),Pw=tt(()=>ro.value===Xu.GUEST),HA=tt(()=>ro.value!==null),Ow=tt(()=>Dw.value?{canViewDashboard:!0,canViewMembers:!0,canViewMatches:!0,canViewFinance:!0,canViewAttendance:!0,canViewMyPayments:!0,canViewLeaveRequest:!1,canViewLeaveManagement:!0,canAddMember:!0,canEditMember:!0,canDeleteMember:!0,canAddMatch:!0,canEditMatch:!0,canDeleteMatch:!0,canAddTransaction:!0,canDeleteTransaction:!0,canManageFirebase:!0,canExportData:!0,canPayFund:!0,canPayFine:!0,canRequestLeave:!1,canApproveLeave:!0,canViewAllPayments:!0,canManageQRCode:!0}:Pw.value?{canViewDashboard:!0,canViewMembers:!1,canViewMatches:!1,canViewFinance:!1,canViewAttendance:!0,canViewMyPayments:!0,canViewLeaveRequest:!0,canAddMember:!1,canEditMember:!1,canDeleteMember:!1,canAddMatch:!1,canEditMatch:!1,canDeleteMatch:!1,canAddTransaction:!1,canDeleteTransaction:!1,canManageFirebase:!1,canExportData:!1,canPayFund:!0,canPayFine:!0,canRequestLeave:!0}:{}),WA=(t,e=null)=>{ro.value=t,localStorage.setItem("user_role",t),t===Xu.GUEST&&e?(lu.value=e,localStorage.setItem("guest_member_id",e)):(lu.value=null,localStorage.removeItem("guest_member_id"))},QA=()=>{ro.value=null,lu.value=null,localStorage.removeItem("user_role"),localStorage.removeItem("guest_member_id")},YA=t=>Ow.value[t]||!1,Mw=()=>({currentRole:ro,guestMemberId:lu,isAdmin:Dw,isGuest:Pw,isAuthenticated:HA,permissions:Ow,setRole:WA,logout:QA,checkPermission:YA,ROLES:Xu}),JA={class:"sidebar"},XA={class:"sidebar-nav"},ZA={__name:"Sidebar",setup(t){const{permissions:e}=Mw();return(n,r)=>{const i=Hv("router-link");return ue(),Ve("aside",JA,[r[8]||(r[8]=C("div",{class:"sidebar-header"},[C("div",{class:"logo"},[C("img",{src:KA,alt:"Tinh Hoa FC",class:"logo-image"}),C("span",{class:"logo-text"},"Tinh Hoa FC")])],-1)),C("nav",XA,[bt(i,{to:"/dashboard",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[0]||(r[0]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("rect",{x:"3",y:"3",width:"7",height:"7"}),C("rect",{x:"14",y:"3",width:"7",height:"7"}),C("rect",{x:"14",y:"14",width:"7",height:"7"}),C("rect",{x:"3",y:"14",width:"7",height:"7"})],-1),C("span",null,"Dashboard",-1)])]),_:1}),Se(e).canViewMembers?(ue(),wn(i,{key:0,to:"/members",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[1]||(r[1]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),C("circle",{cx:"9",cy:"7",r:"4"}),C("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),C("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})],-1),C("span",null,"Thành Viên",-1)])]),_:1})):vt("",!0),Se(e).canViewMatches?(ue(),wn(i,{key:1,to:"/matches",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[2]||(r[2]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("circle",{cx:"12",cy:"12",r:"10"}),C("path",{d:"M12 2 L12 22"}),C("path",{d:"M2 12 L22 12"})],-1),C("span",null,"Trận Đấu",-1)])]),_:1})):vt("",!0),Se(e).canViewAttendance?(ue(),wn(i,{key:2,to:"/attendance",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[3]||(r[3]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),C("path",{d:"M3 9h18"}),C("path",{d:"M9 21V9"})],-1),C("span",null,"Điểm Danh",-1)])]),_:1})):vt("",!0),Se(e).canViewMyPayments?(ue(),wn(i,{key:3,to:"/my-payments",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[4]||(r[4]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("circle",{cx:"12",cy:"12",r:"10"}),C("path",{d:"M12 6v6l4 2"})],-1),C("span",null,"Đóng Quỹ/Phạt",-1)])]),_:1})):vt("",!0),Se(e).canViewLeaveRequest?(ue(),wn(i,{key:4,to:"/leave-request",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[5]||(r[5]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),C("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),C("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),C("line",{x1:"3",y1:"10",x2:"21",y2:"10"})],-1),C("span",null,"Xin Nghỉ",-1)])]),_:1})):vt("",!0),Se(e).canViewLeaveManagement?(ue(),wn(i,{key:5,to:"/leave-management",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[6]||(r[6]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),C("polyline",{points:"14 2 14 8 20 8"}),C("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),C("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),C("polyline",{points:"10 9 9 9 8 9"})],-1),C("span",null,"Quản Lý Xin Nghỉ",-1)])]),_:1})):vt("",!0),Se(e).canViewFinance?(ue(),wn(i,{key:6,to:"/finance",class:"nav-item","active-class":"active"},{default:ir(()=>[...r[7]||(r[7]=[C("svg",{class:"nav-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("line",{x1:"12",y1:"1",x2:"12",y2:"23"}),C("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})],-1),C("span",null,"Tài Chính",-1)])]),_:1})):vt("",!0)])])}}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},eC=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Fw={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,u=c?t[i+2]:0,l=s>>2,h=(s&3)<<4|a>>4;let d=(a&15)<<2|u>>6,f=u&63;c||(f=64,o||(d=64)),r.push(n[l],n[h],n[d],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Lw(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const u=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||u==null||h==null)throw new tC;const d=s<<2|a>>4;if(r.push(d),u!==64){const f=a<<4&240|u>>2;if(r.push(f),h!==64){const m=u<<6&192|h;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nC=function(t){const e=Lw(t);return Fw.encodeByteArray(e,!0)},hu=function(t){return nC(t).replace(/\./g,"")},Vw=function(t){try{return Fw.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function du(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!rC(n)||(t[n]=du(t[n],e[n]));return t}function rC(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sC=()=>iC().__FIREBASE_DEFAULTS__,oC=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},aC=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Vw(t[1]);return e&&JSON.parse(e)},df=()=>{try{return sC()||oC()||aC()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Uw=()=>{var t;return(t=df())===null||t===void 0?void 0:t.config},cC=t=>{var e;return(e=df())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[hu(JSON.stringify(n)),hu(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function hC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(qe())}function ff(){var t;const e=(t=df())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dC(){return typeof self=="object"&&self.self===self}function Bw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function pf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $w(){const t=qe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function fC(){return!ff()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ma(){try{return typeof indexedDB=="object"}catch{return!1}}function pC(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gC="FirebaseError";class zt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=gC,Object.setPrototypeOf(this,zt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ts.prototype.create)}}class ts{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?mC(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new zt(i,a,r)}}function mC(t,e){return t.replace(yC,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const yC=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function vC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Yh(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(cm(s)&&cm(o)){if(!Yh(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function cm(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function _s(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Fo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function qw(t,e){const n=new wC(t,e);return n.subscribe.bind(n)}class wC{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");_C(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=lh),i.error===void 0&&(i.error=lh),i.complete===void 0&&(i.complete=lh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _C(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(t){return t&&t._delegate?t._delegate:t}class Jn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new uC;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bC(e))try{this.getOrInitializeService({instanceIdentifier:Ii})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Ii){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ii){return this.instances.has(e)}getOptions(e=Ii){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:EC(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ii){return this.component?this.component.multipleInstances?e:Ii:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function EC(t){return t===Ii?void 0:t}function bC(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new IC(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf=[];var de;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(de||(de={}));const jw={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},SC=de.INFO,AC={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},CC=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=AC[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zu{constructor(e){this.name=e,this._logLevel=SC,this._logHandler=CC,this._userLogHandler=null,gf.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}function kC(t){gf.forEach(e=>{e.setLogLevel(t)})}function RC(t,e){for(const n of gf){let r=null;e&&e.level&&(r=jw[e.level]),t===null?n.userLogHandler=null:n.userLogHandler=(i,s,...o)=>{const a=o.map(c=>{if(c==null)return null;if(typeof c=="string")return c;if(typeof c=="number"||typeof c=="boolean")return c.toString();if(c instanceof Error)return c.message;try{return JSON.stringify(c)}catch{return null}}).filter(c=>c).join(" ");s>=(r??i.logLevel)&&t({level:de[s].toLowerCase(),message:a,args:o,type:i.name})}}}const NC=(t,e)=>e.some(n=>t instanceof n);let um,lm;function xC(){return um||(um=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function DC(){return lm||(lm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Gw=new WeakMap,Jh=new WeakMap,zw=new WeakMap,hh=new WeakMap,mf=new WeakMap;function PC(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Hr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Gw.set(n,t)}).catch(()=>{}),mf.set(e,t),e}function OC(t){if(Jh.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Jh.set(t,e)}let Xh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Jh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||zw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Hr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function MC(t){Xh=t(Xh)}function LC(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(dh(this),e,...n);return zw.set(r,e.sort?e.sort():[e]),Hr(r)}:DC().includes(t)?function(...e){return t.apply(dh(this),e),Hr(Gw.get(this))}:function(...e){return Hr(t.apply(dh(this),e))}}function FC(t){return typeof t=="function"?LC(t):(t instanceof IDBTransaction&&OC(t),NC(t,xC())?new Proxy(t,Xh):t)}function Hr(t){if(t instanceof IDBRequest)return PC(t);if(hh.has(t))return hh.get(t);const e=FC(t);return e!==t&&(hh.set(t,e),mf.set(e,t)),e}const dh=t=>mf.get(t);function VC(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=Hr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Hr(o.result),c.oldVersion,c.newVersion,Hr(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const UC=["get","getKey","getAll","getAllKeys","count"],BC=["put","add","delete","clear"],fh=new Map;function hm(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fh.get(e))return fh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=BC.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||UC.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&c.done]))[0]};return fh.set(e,s),s}MC(t=>({...t,get:(e,n,r)=>hm(e,n)||t.get(e,n,r),has:(e,n)=>!!hm(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qC(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function qC(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zh="@firebase/app",dm="0.9.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi=new Zu("@firebase/app"),jC="@firebase/app-compat",GC="@firebase/analytics-compat",zC="@firebase/analytics",KC="@firebase/app-check-compat",HC="@firebase/app-check",WC="@firebase/auth",QC="@firebase/auth-compat",YC="@firebase/database",JC="@firebase/database-compat",XC="@firebase/functions",ZC="@firebase/functions-compat",e1="@firebase/installations",t1="@firebase/installations-compat",n1="@firebase/messaging",r1="@firebase/messaging-compat",i1="@firebase/performance",s1="@firebase/performance-compat",o1="@firebase/remote-config",a1="@firebase/remote-config-compat",c1="@firebase/storage",u1="@firebase/storage-compat",l1="@firebase/firestore",h1="@firebase/firestore-compat",d1="firebase",f1="9.23.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr="[DEFAULT]",p1={[Zh]:"fire-core",[jC]:"fire-core-compat",[zC]:"fire-analytics",[GC]:"fire-analytics-compat",[HC]:"fire-app-check",[KC]:"fire-app-check-compat",[WC]:"fire-auth",[QC]:"fire-auth-compat",[YC]:"fire-rtdb",[JC]:"fire-rtdb-compat",[XC]:"fire-fn",[ZC]:"fire-fn-compat",[e1]:"fire-iid",[t1]:"fire-iid-compat",[n1]:"fire-fcm",[r1]:"fire-fcm-compat",[i1]:"fire-perf",[s1]:"fire-perf-compat",[o1]:"fire-rc",[a1]:"fire-rc-compat",[c1]:"fire-gcs",[u1]:"fire-gcs-compat",[l1]:"fire-fst",[h1]:"fire-fst-compat","fire-js":"fire-js",[d1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=new Map,ya=new Map;function fu(t,e){try{t.container.addComponent(e)}catch(n){qi.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kw(t,e){t.container.addOrOverwriteComponent(e)}function Yr(t){const e=t.name;if(ya.has(e))return qi.debug(`There were multiple attempts to register component ${e}.`),!1;ya.set(e,t);for(const n of Qr.values())fu(n,t);return!0}function Hw(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function g1(t,e,n=Wr){Hw(t,e).clearInstance(n)}function m1(){ya.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},fr=new ts("app","Firebase",y1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let v1=class{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fr.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=f1;function yf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Wr,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw fr.create("bad-app-name",{appName:String(i)});if(n||(n=Uw()),!n)throw fr.create("no-options");const s=Qr.get(i);if(s){if(Yh(n,s.options)&&Yh(r,s.config))return s;throw fr.create("duplicate-app",{appName:i})}const o=new TC(i);for(const c of ya.values())o.addComponent(c);const a=new v1(n,r,o);return Qr.set(i,a),a}function w1(t=Wr){const e=Qr.get(t);if(!e&&t===Wr&&Uw())return yf();if(!e)throw fr.create("no-app",{appName:t});return e}function _1(){return Array.from(Qr.values())}async function Ww(t){const e=t.name;Qr.has(e)&&(Qr.delete(e),await Promise.all(t.container.getProviders().map(n=>n.delete())),t.isDeleted=!0)}function Hn(t,e,n){var r;let i=(r=p1[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qi.warn(a.join(" "));return}Yr(new Jn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function Qw(t,e){if(t!==null&&typeof t!="function")throw fr.create("invalid-log-argument");RC(t,e)}function Yw(t){kC(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I1="firebase-heartbeat-database",E1=1,va="firebase-heartbeat-store";let ph=null;function Jw(){return ph||(ph=VC(I1,E1,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(va)}}}).catch(t=>{throw fr.create("idb-open",{originalErrorMessage:t.message})})),ph}async function b1(t){try{return await(await Jw()).transaction(va).objectStore(va).get(Xw(t))}catch(e){if(e instanceof zt)qi.warn(e.message);else{const n=fr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});qi.warn(n.message)}}}async function fm(t,e){try{const r=(await Jw()).transaction(va,"readwrite");await r.objectStore(va).put(e,Xw(t)),await r.done}catch(n){if(n instanceof zt)qi.warn(n.message);else{const r=fr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});qi.warn(r.message)}}}function Xw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T1=1024,S1=30*24*60*60*1e3;class A1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new k1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=pm();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const s=new Date(i.date).valueOf();return Date.now()-s<=S1}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=pm(),{heartbeatsToSend:n,unsentEntries:r}=C1(this._heartbeatsCache.heartbeats),i=hu(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function pm(){return new Date().toISOString().substring(0,10)}function C1(t,e=T1){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),gm(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),gm(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class k1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ma()?pC().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await b1(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return fm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return fm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function gm(t){return hu(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R1(t){Yr(new Jn("platform-logger",e=>new $C(e),"PRIVATE")),Yr(new Jn("heartbeat",e=>new A1(e),"PRIVATE")),Hn(Zh,dm,t),Hn(Zh,dm,"esm2017"),Hn("fire-js","")}R1("");const N1=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:zt,SDK_VERSION:ci,_DEFAULT_ENTRY_NAME:Wr,_addComponent:fu,_addOrOverwriteComponent:Kw,_apps:Qr,_clearComponents:m1,_components:ya,_getProvider:Hw,_registerComponent:Yr,_removeServiceInstance:g1,deleteApp:Ww,getApp:w1,getApps:_1,initializeApp:yf,onLog:Qw,registerVersion:Hn,setLogLevel:Yw},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x1{constructor(e,n){this._delegate=e,this.firebase=n,fu(e,new Jn("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Ww(this._delegate)))}_getService(e,n=Wr){var r;this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&((r=i.getComponent())===null||r===void 0?void 0:r.instantiationMode)==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:n})}_removeServiceInstance(e,n=Wr){this._delegate.container.getProvider(e).clearInstance(n)}_addComponent(e){fu(this._delegate,e)}_addOrOverwriteComponent(e){Kw(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D1={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},mm=new ts("app-compat","Firebase",D1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P1(t){const e={},n={__esModule:!0,initializeApp:s,app:i,registerVersion:Hn,setLogLevel:Yw,onLog:Qw,apps:null,SDK_VERSION:ci,INTERNAL:{registerComponent:a,removeApp:r,useAsService:c,modularAPIs:N1}};n.default=n,Object.defineProperty(n,"apps",{get:o});function r(u){delete e[u]}function i(u){if(u=u||Wr,!am(e,u))throw mm.create("no-app",{appName:u});return e[u]}i.App=t;function s(u,l={}){const h=yf(u,l);if(am(e,h.name))return e[h.name];const d=new t(h,n);return e[h.name]=d,d}function o(){return Object.keys(e).map(u=>e[u])}function a(u){const l=u.name,h=l.replace("-compat","");if(Yr(u)&&u.type==="PUBLIC"){const d=(f=i())=>{if(typeof f[h]!="function")throw mm.create("invalid-app-argument",{appName:l});return f[h]()};u.serviceProps!==void 0&&du(d,u.serviceProps),n[h]=d,t.prototype[h]=function(...f){return this._getService.bind(this,l).apply(this,u.multipleInstances?f:[])}}return u.type==="PUBLIC"?n[h]:null}function c(u,l){return l==="serverAuth"?null:l}return n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(){const t=P1(x1);t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:Zw,extendNamespace:e,createSubscribe:qw,ErrorFactory:ts,deepExtend:du});function e(n){du(t,n)}return t}const O1=Zw();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym=new Zu("@firebase/app-compat"),M1="@firebase/app-compat",L1="0.2.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F1(t){Hn(M1,L1,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */if(dC()&&self.firebase!==void 0){ym.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);const t=self.firebase.SDK_VERSION;t&&t.indexOf("LITE")>=0&&ym.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}const cn=O1;F1();var V1="firebase",U1="9.23.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */cn.registerVersion(V1,U1,"app-compat");function vf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}const So={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},ls={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B1(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend."}}function e_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $1=B1,q1=e_,t_=new ts("auth","Firebase",e_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu=new Zu("@firebase/auth");function j1(t,...e){pu.logLevel<=de.WARN&&pu.warn(`Auth (${ci}): ${t}`,...e)}function Gc(t,...e){pu.logLevel<=de.ERROR&&pu.error(`Auth (${ci}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t,...e){throw wf(t,...e)}function Tt(t,...e){return wf(t,...e)}function n_(t,e,n){const r=Object.assign(Object.assign({},q1()),{[e]:n});return new ts("auth","Firebase",r).create(e,{appName:t.name})}function so(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&At(t,"argument-error"),n_(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function wf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return t_.create(t,...e)}function x(t,e,...n){if(!t)throw wf(e,...n)}function $n(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Gc(e),new Error(e)}function An(t,e){t||$n(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _f(){return vm()==="http:"||vm()==="https:"}function vm(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G1(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_f()||Bw()||"connection"in navigator)?navigator.onLine:!0}function z1(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(e,n){this.shortDelay=e,this.longDelay=n,An(n>e,"Short delay should be less than long delay!"),this.isMobile=hC()||pf()}get(){return G1()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(t,e){An(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;$n("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;$n("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;$n("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K1={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H1=new Ya(3e4,6e4);function it(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ct(t,e,n,r,i={}){return i_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=io(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),r_.fetch()(s_(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function i_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},K1),e);try{const i=new W1(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Vo(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Vo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Vo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Vo(t,"user-disabled",o);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw n_(t,l,u);At(t,l)}}catch(i){if(i instanceof zt)throw i;At(t,"network-request-failed",{message:String(i)})}}async function br(t,e,n,r,i={}){const s=await ct(t,e,n,r,i);return"mfaPendingCredential"in s&&At(t,"multi-factor-auth-required",{_serverResponse:s}),s}function s_(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?If(t.config,i):`${t.config.apiScheme}://${i}`}class W1{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Tt(this.auth,"network-request-failed")),H1.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Vo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Tt(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q1(t,e){return ct(t,"POST","/v1/accounts:delete",e)}async function Y1(t,e){return ct(t,"POST","/v1/accounts:update",e)}async function J1(t,e){return ct(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function X1(t,e=!1){const n=X(t),r=await n.getIdToken(e),i=el(r);x(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Xo(gh(i.auth_time)),issuedAtTime:Xo(gh(i.iat)),expirationTime:Xo(gh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function gh(t){return Number(t)*1e3}function el(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Gc("JWT malformed, contained fewer than 3 sections"),null;try{const i=Vw(n);return i?JSON.parse(i):(Gc("Failed to decode base64 JWT payload"),null)}catch(i){return Gc("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Z1(t){const e=el(t);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof zt&&ek(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function ek({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xo(this.lastLoginAt),this.creationTime=Xo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _a(t){var e;const n=t.auth,r=await t.getIdToken(),i=await wr(t,J1(n,{idToken:r}));x(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ik(s.providerUserInfo):[],a=rk(t.providerData,o),c=t.isAnonymous,u=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new o_(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function nk(t){const e=X(t);await _a(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rk(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ik(t){return t.map(e=>{var{providerId:n}=e,r=vf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sk(t,e){const n=await i_(t,{},async()=>{const r=io({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=s_(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",r_.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Z1(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return x(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await sk(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ia;return r&&(x(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(x(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(x(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ia,this.toJSON())}_performRefresh(){return $n("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nr(t,e){x(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fi{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=vf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new o_(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await wr(this,this.stsTokenManager.getToken(this.auth,e));return x(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return X1(this,e)}reload(){return nk(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fi(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await _a(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await wr(this,Q1(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,c,u,l;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(i=n.email)!==null&&i!==void 0?i:void 0,f=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,m=(o=n.photoURL)!==null&&o!==void 0?o:void 0,_=(a=n.tenantId)!==null&&a!==void 0?a:void 0,T=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,D=(u=n.createdAt)!==null&&u!==void 0?u:void 0,O=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:N,emailVerified:P,isAnonymous:W,providerData:Z,stsTokenManager:J}=n;x(N&&J,e,"internal-error");const ye=Ia.fromJSON(this.name,J);x(typeof N=="string",e,"internal-error"),Nr(h,e.name),Nr(d,e.name),x(typeof P=="boolean",e,"internal-error"),x(typeof W=="boolean",e,"internal-error"),Nr(f,e.name),Nr(m,e.name),Nr(_,e.name),Nr(T,e.name),Nr(D,e.name),Nr(O,e.name);const $e=new Fi({uid:N,auth:e,email:d,emailVerified:P,displayName:h,isAnonymous:W,photoURL:m,phoneNumber:f,tenantId:_,stsTokenManager:ye,createdAt:D,lastLoginAt:O});return Z&&Array.isArray(Z)&&($e.providerData=Z.map(xe=>Object.assign({},xe))),T&&($e._redirectEventId=T),$e}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ia;i.updateFromServerResponse(n);const s=new Fi({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await _a(s),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm=new Map;function un(t){An(t instanceof Function,"Expected a class definition");let e=wm.get(t);return e?(An(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,wm.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}a_.type="NONE";const $s=a_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(t,e,n){return`firebase:${t}:${e}:${n}`}class Cs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Vi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Vi("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Fi._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Cs(un($s),e,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||un($s);const o=Vi(r,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const h=Fi._fromJSON(e,l);u!==s&&(a=h),s=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Cs(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Cs(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(l_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(c_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(h_(e))return"Blackberry";if(d_(e))return"Webos";if(Ef(e))return"Safari";if((e.includes("chrome/")||u_(e))&&!e.includes("edge/"))return"Chrome";if(Ja(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function c_(t=qe()){return/firefox\//i.test(t)}function Ef(t=qe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function u_(t=qe()){return/crios\//i.test(t)}function l_(t=qe()){return/iemobile/i.test(t)}function Ja(t=qe()){return/android/i.test(t)}function h_(t=qe()){return/blackberry/i.test(t)}function d_(t=qe()){return/webos/i.test(t)}function oo(t=qe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ok(t=qe()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function ak(t=qe()){var e;return oo(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ck(){return $w()&&document.documentMode===10}function f_(t=qe()){return oo(t)||Ja(t)||d_(t)||h_(t)||/windows phone/i.test(t)||l_(t)}function uk(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(t,e=[]){let n;switch(t){case"Browser":n=_m(qe());break;case"Worker":n=`${_m(qe())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ci}/${r}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lk(t){return(await ct(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function g_(t,e){return ct(t,"GET","/v2/recaptchaConfig",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im(t){return t!==void 0&&t.getResponse!==void 0}function Em(t){return t!==void 0&&t.enterprise!==void 0}class m_{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hk(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function bf(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Tt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",hk().appendChild(r)})}function y_(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const dk="https://www.google.com/recaptcha/enterprise.js?render=",fk="recaptcha-enterprise",pk="NO_RECAPTCHA";class v_{constructor(e){this.type=fk,this.auth=Je(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{g_(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const u=new m_(c);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,o(u.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;Em(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(u=>{o(u)}).catch(()=>{o(pk)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!n&&Em(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}bf(dk+a).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function Jr(t,e,n,r=!1){const i=new v_(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mk{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bm(this),this.idTokenSubscription=new bm(this),this.beforeStateQueue=new gk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=t_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=un(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Cs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await _a(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=z1()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?X(e):null;return n&&x(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(un(e))})}async initializeRecaptchaConfig(){const e=await g_(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new m_(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new v_(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ts("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&un(e)||this._popupRedirectResolver;x(n,this,"argument-error"),this.redirectPersistenceManager=await Cs.create(this,[un(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return x(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof n=="function"?e.addObserver(n,r,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=p_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&j1(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Je(t){return X(t)}class bm{constructor(e){this.auth=e,this.observer=null,this.addObserver=qw(n=>this.observer=n)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function yk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(un);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function vk(t,e,n){const r=Je(t);x(r._canInitEmulator,r,"emulator-config-failed"),x(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),s=w_(e),{host:o,port:a}=wk(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||_k()}function w_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function wk(t){const e=w_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Tm(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Tm(o)}}}function Tm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function _k(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return $n("not implemented")}_getIdTokenResponse(e){return $n("not implemented")}_linkToIdToken(e,n){return $n("not implemented")}_getReauthenticationResolver(e){return $n("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function __(t,e){return ct(t,"POST","/v1/accounts:resetPassword",it(t,e))}async function I_(t,e){return ct(t,"POST","/v1/accounts:update",e)}async function Ik(t,e){return ct(t,"POST","/v1/accounts:update",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mh(t,e){return br(t,"POST","/v1/accounts:signInWithPassword",it(t,e))}async function tl(t,e){return ct(t,"POST","/v1/accounts:sendOobCode",it(t,e))}async function Ek(t,e){return tl(t,e)}async function yh(t,e){return tl(t,e)}async function vh(t,e){return tl(t,e)}async function bk(t,e){return tl(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tk(t,e){return br(t,"POST","/v1/accounts:signInWithEmailLink",it(t,e))}async function Sk(t,e){return br(t,"POST","/v1/accounts:signInWithEmailLink",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea extends ao{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ea(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Ea(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const i=await Jr(e,r,"signInWithPassword");return mh(e,i)}else return mh(e,r).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const s=await Jr(e,r,"signInWithPassword");return mh(e,s)}else return Promise.reject(i)});case"emailLink":return Tk(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return I_(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Sk(e,{idToken:n,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pr(t,e){return br(t,"POST","/v1/accounts:signInWithIdp",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ak="http://localhost";class Xn extends ao{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):At("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=vf(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Xn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return pr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,pr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,pr(e,n)}buildRequest(){const e={requestUri:Ak,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=io(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ck(t,e){return ct(t,"POST","/v1/accounts:sendVerificationCode",it(t,e))}async function kk(t,e){return br(t,"POST","/v1/accounts:signInWithPhoneNumber",it(t,e))}async function Rk(t,e){const n=await br(t,"POST","/v1/accounts:signInWithPhoneNumber",it(t,e));if(n.temporaryProof)throw Vo(t,"account-exists-with-different-credential",n);return n}const Nk={USER_NOT_FOUND:"user-not-found"};async function xk(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return br(t,"POST","/v1/accounts:signInWithPhoneNumber",it(t,n),Nk)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui extends ao{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Ui({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Ui({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return kk(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Rk(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return xk(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!n&&!i&&!s?null:new Ui({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Pk(t){const e=_s(Fo(t)).link,n=e?_s(Fo(e)).deep_link_id:null,r=_s(Fo(t)).deep_link_id;return(r?_s(Fo(r)).link:null)||r||n||e||t}class nl{constructor(e){var n,r,i,s,o,a;const c=_s(Fo(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(r=c.oobCode)!==null&&r!==void 0?r:null,h=Dk((i=c.mode)!==null&&i!==void 0?i:null);x(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Pk(e);try{return new nl(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(){this.providerId=ui.PROVIDER_ID}static credential(e,n){return Ea._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=nl.parseLink(n);return x(r,"argument-error"),Ea._fromEmailAndCode(e,r.code,r.tenantId)}}ui.PROVIDER_ID="password";ui.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ui.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends Tr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class ks extends co{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return x("providerId"in n&&"signInMethod"in n,"argument-error"),Xn._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return x(e.idToken||e.accessToken,"argument-error"),Xn._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return ks.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return ks.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:a}=e;if(!r&&!i&&!n&&!s||!a)return null;try{return new ks(a)._credential({idToken:n,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends co{constructor(){super("facebook.com")}static credential(e){return Xn._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ln.credential(e.oauthAccessToken)}catch{return null}}}Ln.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ln.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends co{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Xn._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Fn.credentialFromTaggedObject(e)}static credentialFromError(e){return Fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Fn.credential(n,r)}catch{return null}}}Fn.GOOGLE_SIGN_IN_METHOD="google.com";Fn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends co{constructor(){super("github.com")}static credential(e){return Xn._fromParams({providerId:Vn.PROVIDER_ID,signInMethod:Vn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vn.credentialFromTaggedObject(e)}static credentialFromError(e){return Vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vn.credential(e.oauthAccessToken)}catch{return null}}}Vn.GITHUB_SIGN_IN_METHOD="github.com";Vn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ok="http://localhost";class qs extends ao{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return pr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,pr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,pr(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=n;return!r||!i||!s||r!==i?null:new qs(r,s)}static _create(e,n){return new qs(e,n)}buildRequest(){return{requestUri:Ok,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mk="saml.";class gu extends Tr{constructor(e){x(e.startsWith(Mk),"argument-error"),super(e)}static credentialFromResult(e){return gu.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return gu.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=qs.fromJSON(e);return x(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:r}=e;if(!n||!r)return null;try{return qs._create(r,n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends co{constructor(){super("twitter.com")}static credential(e,n){return Xn._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Un.credential(n,r)}catch{return null}}}Un.TWITTER_SIGN_IN_METHOD="twitter.com";Un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zc(t,e){return br(t,"POST","/v1/accounts:signUp",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Fi._fromIdTokenResponse(e,r,i),o=Sm(r);return new mn({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Sm(r);return new mn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Sm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lk(t){var e;const n=Je(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new mn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await zc(n,{returnSecureToken:!0}),i=await mn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu extends zt{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,mu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new mu(e,n,r,i)}}function E_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?mu._fromErrorAndOperation(t,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fk(t,e){const n=X(t);await rl(!0,n,e);const{providerUserInfo:r}=await Y1(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),i=b_(r||[]);return n.providerData=n.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function Tf(t,e,n=!1){const r=await wr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return mn._forOperation(t,"link",r)}async function rl(t,e,n){await _a(e);const r=b_(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";x(r.has(n)===t,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T_(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const s=await wr(t,E_(r,i,e,t),n);x(s.idToken,r,"internal-error");const o=el(s.idToken);x(o,r,"internal-error");const{sub:a}=o;return x(t.uid===a,r,"user-mismatch"),mn._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&At(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S_(t,e,n=!1){const r="signIn",i=await E_(t,r,e),s=await mn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function il(t,e){return S_(Je(t),e)}async function A_(t,e){const n=X(t);return await rl(!1,n,e.providerId),Tf(n,e)}async function C_(t,e){return T_(X(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vk(t,e){return br(t,"POST","/v1/accounts:signInWithCustomToken",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uk(t,e){const n=Je(t),r=await Vk(n,{token:e,returnSecureToken:!0}),i=await mn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?Sf._fromServerResponse(e,n):"totpInfo"in n?Af._fromServerResponse(e,n):At(e,"internal-error")}}class Sf extends Xa{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new Sf(n)}}class Af extends Xa{constructor(e){super("totp",e)}static _fromServerResponse(e,n){return new Af(n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(t,e,n){var r;x(((r=n.url)===null||r===void 0?void 0:r.length)>0,t,"invalid-continue-uri"),x(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(x(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(x(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bk(t,e,n){var r;const i=Je(t),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};if(!((r=i._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const o=await Jr(i,s,"getOobCode",!0);n&&Rs(i,o,n),await yh(i,o)}else n&&Rs(i,s,n),await yh(i,s).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");const a=await Jr(i,s,"getOobCode",!0);n&&Rs(i,a,n),await yh(i,a)}else return Promise.reject(o)})}async function $k(t,e,n){await __(X(t),{oobCode:e,newPassword:n})}async function qk(t,e){await Ik(X(t),{oobCode:e})}async function k_(t,e){const n=X(t),r=await __(n,{oobCode:e}),i=r.requestType;switch(x(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":x(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":x(r.mfaInfo,n,"internal-error");default:x(r.email,n,"internal-error")}let s=null;return r.mfaInfo&&(s=Xa._fromServerResponse(Je(n),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function jk(t,e){const{data:n}=await k_(X(t),e);return n.email}async function Gk(t,e,n){var r;const i=Je(t),s={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((r=i._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const u=await Jr(i,s,"signUpPassword");o=zc(i,u)}else o=zc(i,s).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const l=await Jr(i,s,"signUpPassword");return zc(i,l)}else return Promise.reject(u)});const a=await o.catch(u=>Promise.reject(u)),c=await mn._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(c.user),c}function zk(t,e,n){return il(X(t),ui.credential(e,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kk(t,e,n){var r;const i=Je(t),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function o(a,c){x(c.handleCodeInApp,i,"argument-error"),c&&Rs(i,a,c)}if(!((r=i._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const a=await Jr(i,s,"getOobCode",!0);o(a,n),await vh(i,a)}else o(s,n),await vh(i,s).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const c=await Jr(i,s,"getOobCode",!0);o(c,n),await vh(i,c)}else return Promise.reject(a)})}function Hk(t,e){const n=nl.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function Wk(t,e,n){const r=X(t),i=ui.credentialWithLink(e,n||wa());return x(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),il(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qk(t,e){return ct(t,"POST","/v1/accounts:createAuthUri",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yk(t,e){const n=_f()?wa():"http://localhost",r={identifier:e,continueUri:n},{signinMethods:i}=await Qk(X(t),r);return i||[]}async function Jk(t,e){const n=X(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&Rs(n.auth,i,e);const{email:s}=await Ek(n.auth,i);s!==t.email&&await t.reload()}async function Xk(t,e,n){const r=X(t),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&Rs(r.auth,s,n);const{email:o}=await bk(r.auth,s);o!==t.email&&await t.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zk(t,e){return ct(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eR(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=X(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await wr(r,Zk(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function tR(t,e){return R_(X(t),e,null)}function nR(t,e){return R_(X(t),null,e)}async function R_(t,e,n){const{auth:r}=t,s={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(s.email=e),n&&(s.password=n);const o=await wr(t,I_(r,s));await t._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rR(t){var e,n;if(!t)return null;const{providerId:r}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},s=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(t!=null&&t.idToken)){const o=(n=(e=el(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Ns(s,a)}}if(!r)return null;switch(r){case"facebook.com":return new iR(s,i);case"github.com":return new sR(s,i);case"google.com":return new oR(s,i);case"twitter.com":return new aR(s,i,t.screenName||null);case"custom":case"anonymous":return new Ns(s,null);default:return new Ns(s,r,i)}}class Ns{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class N_ extends Ns{constructor(e,n,r,i){super(e,n,r),this.username=i}}class iR extends Ns{constructor(e,n){super(e,"facebook.com",n)}}class sR extends N_{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class oR extends Ns{constructor(e,n){super(e,"google.com",n)}}class aR extends N_{constructor(e,n,r){super(e,"twitter.com",n,r)}}function cR(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:rR(n)}class Ni{constructor(e,n,r){this.type=e,this.credential=n,this.auth=r}static _fromIdtoken(e,n){return new Ni("enroll",e,n)}static _fromMfaPendingCredential(e){return new Ni("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,r;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return Ni._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return Ni._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e,n,r){this.session=e,this.hints=n,this.signInResolver=r}static _fromError(e,n){const r=Je(e),i=n.customData._serverResponse,s=(i.mfaInfo||[]).map(a=>Xa._fromServerResponse(r,a));x(i.mfaPendingCredential,r,"internal-error");const o=Ni._fromMfaPendingCredential(i.mfaPendingCredential);return new Cf(o,s,async a=>{const c=await a._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const u=Object.assign(Object.assign({},i),{idToken:c.idToken,refreshToken:c.refreshToken});switch(n.operationType){case"signIn":const l=await mn._fromIdTokenResponse(r,n.operationType,u);return await r._updateCurrentUser(l.user),l;case"reauthenticate":return x(n.user,r,"internal-error"),mn._forOperation(n.user,n.operationType,u);default:At(r,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function uR(t,e){var n;const r=X(t),i=e;return x(e.customData.operationType,r,"argument-error"),x((n=i.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,r,"argument-error"),Cf._fromError(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lR(t,e){return ct(t,"POST","/v2/accounts/mfaEnrollment:start",it(t,e))}function hR(t,e){return ct(t,"POST","/v2/accounts/mfaEnrollment:finalize",it(t,e))}function dR(t,e){return ct(t,"POST","/v2/accounts/mfaEnrollment:withdraw",it(t,e))}class kf{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(r=>Xa._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new kf(e)}async getSession(){return Ni._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,n){const r=e,i=await this.getSession(),s=await wr(this.user,r._process(this.user.auth,i,n));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await wr(this.user,dR(this.user.auth,{idToken:r,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==n),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const wh=new WeakMap;function fR(t){const e=X(t);return wh.has(e)||wh.set(e,kf._fromUser(e)),wh.get(e)}const yu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(yu,"1"),this.storage.removeItem(yu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pR(){const t=qe();return Ef(t)||oo(t)}const gR=1e3,mR=10;class D_ extends x_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=pR()&&uk(),this.fallbackToPolling=f_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ck()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,mR):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},gR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}D_.type="LOCAL";const Rf=D_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_ extends x_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}P_.type="SESSION";const ji=P_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new sl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async u=>u(n.origin,s)),c=await yR(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}sl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const u=Za("",20);i.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const d=h;if(d.data.eventId===u)switch(d.data.status){case"ack":clearTimeout(l),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(l),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function wR(t){et().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function _R(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function IR(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function ER(){return Nf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_="firebaseLocalStorageDb",bR=1,vu="firebaseLocalStorage",M_="fbase_key";class ec{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ol(t,e){return t.transaction([vu],e?"readwrite":"readonly").objectStore(vu)}function TR(){const t=indexedDB.deleteDatabase(O_);return new ec(t).toPromise()}function ed(){const t=indexedDB.open(O_,bR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(vu,{keyPath:M_})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(vu)?e(r):(r.close(),await TR(),e(await ed()))})})}async function Am(t,e,n){const r=ol(t,!0).put({[M_]:e,value:n});return new ec(r).toPromise()}async function SR(t,e){const n=ol(t,!1).get(e),r=await new ec(n).toPromise();return r===void 0?null:r.value}function Cm(t,e){const n=ol(t,!0).delete(e);return new ec(n).toPromise()}const AR=800,CR=3;class L_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ed(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>CR)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Nf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sl._getInstance(ER()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await _R(),!this.activeServiceWorker)return;this.sender=new vR(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||IR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ed();return await Am(e,yu,"1"),await Cm(e,yu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Am(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>SR(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ol(i,!1).getAll();return new ec(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),AR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}L_.type="LOCAL";const ba=L_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kR(t,e){return ct(t,"POST","/v2/accounts/mfaSignIn:start",it(t,e))}function RR(t,e){return ct(t,"POST","/v2/accounts/mfaSignIn:finalize",it(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NR=500,xR=6e4,Ac=1e12;class DR{constructor(e){this.auth=e,this.counter=Ac,this._widgets=new Map}render(e,n){const r=this.counter;return this._widgets.set(r,new PR(e,this.auth.name,n||{})),this.counter++,r}reset(e){var n;const r=e||Ac;(n=this._widgets.get(r))===null||n===void 0||n.delete(),this._widgets.delete(r)}getResponse(e){var n;const r=e||Ac;return((n=this._widgets.get(r))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const r=e||Ac;return(n=this._widgets.get(r))===null||n===void 0||n.execute(),""}}class PR{constructor(e,n,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;x(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=OR(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},xR)},NR))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function OR(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<t;r++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h=y_("rcb"),MR=new Ya(3e4,6e4),LR="https://www.google.com/recaptcha/api.js?";class FR{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=et().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return x(VR(n),e,"argument-error"),this.shouldResolveImmediately(n)&&Im(et().grecaptcha)?Promise.resolve(et().grecaptcha):new Promise((r,i)=>{const s=et().setTimeout(()=>{i(Tt(e,"network-request-failed"))},MR.get());et()[_h]=()=>{et().clearTimeout(s),delete et()[_h];const a=et().grecaptcha;if(!a||!Im(a)){i(Tt(e,"internal-error"));return}const c=a.render;a.render=(u,l)=>{const h=c(u,l);return this.counter++,h},this.hostLanguage=n,r(a)};const o=`${LR}?${io({onload:_h,render:"explicit",hl:n})}`;bf(o).catch(()=>{clearTimeout(s),i(Tt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=et().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function VR(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class UR{async load(e){return new DR(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="recaptcha",BR={theme:"light",type:"image"};let $R=class{constructor(e,n=Object.assign({},BR),r){this.parameters=n,this.type=F_,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Je(r),this.isInvisible=this.parameters.size==="invisible",x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;x(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new UR:new FR,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),r=n.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){x(!this.parameters.sitekey,this.auth,"argument-error"),x(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),x(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(r=>r(n)),typeof e=="function")e(n);else if(typeof e=="string"){const r=et()[e];typeof r=="function"&&r(n)}}}assertNotDestroyed(){x(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){x(_f()&&!Nf(),this.auth,"internal-error"),await qR(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await lk(this.auth);x(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return x(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function qR(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=Ui._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function jR(t,e,n){const r=Je(t),i=await al(r,e,X(n));return new xf(i,s=>il(r,s))}async function GR(t,e,n){const r=X(t);await rl(!1,r,"phone");const i=await al(r.auth,e,X(n));return new xf(i,s=>A_(r,s))}async function zR(t,e,n){const r=X(t),i=await al(r.auth,e,X(n));return new xf(i,s=>C_(r,s))}async function al(t,e,n){var r;const i=await n.verify();try{x(typeof i=="string",t,"argument-error"),x(n.type===F_,t,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return x(o.type==="enroll",t,"internal-error"),(await lR(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{x(o.type==="signin",t,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return x(a,t,"missing-multi-factor-info"),(await kR(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Ck(t,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{n._reset()}}async function KR(t,e){await Tf(X(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gi=class Kc{constructor(e){this.providerId=Kc.PROVIDER_ID,this.auth=Je(e)}verifyPhoneNumber(e,n){return al(this.auth,e,X(n))}static credential(e,n){return Ui._fromVerification(e,n)}static credentialFromResult(e){const n=e;return Kc.credentialFromTaggedObject(n)}static credentialFromError(e){return Kc.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:r}=e;return n&&r?Ui._fromTokenResponse(n,r):null}};Gi.PROVIDER_ID="phone";Gi.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(t,e){return e?un(e):(x(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df extends ao{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return pr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return pr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return pr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function HR(t){return S_(t.auth,new Df(t),t.bypassAuthState)}function WR(t){const{auth:e,user:n}=t;return x(n,e,"internal-error"),T_(n,new Df(t),t.bypassAuthState)}async function QR(t){const{auth:e,user:n}=t;return x(n,e,"internal-error"),Tf(n,new Df(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return HR;case"linkViaPopup":case"linkViaRedirect":return QR;case"reauthViaPopup":case"reauthViaRedirect":return WR;default:At(this.auth,"internal-error")}}resolve(e){An(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){An(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YR=new Ya(2e3,1e4);async function JR(t,e,n){const r=Je(t);so(t,e,Tr);const i=ns(r,n);return new cr(r,"signInViaPopup",e,i).executeNotNull()}async function XR(t,e,n){const r=X(t);so(r.auth,e,Tr);const i=ns(r.auth,n);return new cr(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function ZR(t,e,n){const r=X(t);so(r.auth,e,Tr);const i=ns(r.auth,n);return new cr(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class cr extends V_{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,cr.currentPopupAction&&cr.currentPopupAction.cancel(),cr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){An(this.filter.length===1,"Popup operations only handle one event");const e=Za();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,cr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,YR.get())};e()}}cr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eN="pendingRedirect",Zo=new Map;class tN extends V_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Zo.get(this.auth._key());if(!e){try{const r=await nN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Zo.set(this.auth._key(),e)}return this.bypassAuthState||Zo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nN(t,e){const n=B_(e),r=U_(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}async function Pf(t,e){return U_(t)._set(B_(e),"true")}function rN(){Zo.clear()}function Of(t,e){Zo.set(t._key(),e)}function U_(t){return un(t._redirectPersistence)}function B_(t){return Vi(eN,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iN(t,e,n){return sN(t,e,n)}async function sN(t,e,n){const r=Je(t);so(t,e,Tr),await r._initializationPromise;const i=ns(r,n);return await Pf(i,r),i._openRedirect(r,e,"signInViaRedirect")}function oN(t,e,n){return aN(t,e,n)}async function aN(t,e,n){const r=X(t);so(r.auth,e,Tr),await r.auth._initializationPromise;const i=ns(r.auth,n);await Pf(i,r.auth);const s=await $_(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function cN(t,e,n){return uN(t,e,n)}async function uN(t,e,n){const r=X(t);so(r.auth,e,Tr),await r.auth._initializationPromise;const i=ns(r.auth,n);await rl(!1,r,e.providerId),await Pf(i,r.auth);const s=await $_(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function lN(t,e){return await Je(t)._initializationPromise,cl(t,e,!1)}async function cl(t,e,n=!1){const r=Je(t),i=ns(r,e),o=await new tN(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function $_(t){const e=Za(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hN=10*60*1e3;class q_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!dN(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!j_(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Tt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hN&&this.cachedEventUids.clear(),this.cachedEventUids.has(km(e))}saveEventToCache(e){this.cachedEventUids.add(km(e)),this.lastProcessedEventTime=Date.now()}}function km(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function j_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function dN(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return j_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(t,e={}){return ct(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pN=/^https?/;async function gN(t){if(t.config.emulator)return;const{authorizedDomains:e}=await G_(t);for(const n of e)try{if(mN(n))return}catch{}At(t,"unauthorized-domain")}function mN(t){const e=wa(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!pN.test(n))return!1;if(fN.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yN=new Ya(3e4,6e4);function Rm(){const t=et().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function vN(t){return new Promise((e,n)=>{var r,i,s;function o(){Rm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rm(),n(Tt(t,"network-request-failed"))},timeout:yN.get()})}if(!((i=(r=et().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=et().gapi)===null||s===void 0)&&s.load)o();else{const a=y_("iframefcb");return et()[a]=()=>{gapi.load?o():n(Tt(t,"network-request-failed"))},bf(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Hc=null,e})}let Hc=null;function wN(t){return Hc=Hc||vN(t),Hc}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _N=new Ya(5e3,15e3),IN="__/auth/iframe",EN="emulator/auth/iframe",bN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},TN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SN(t){const e=t.config;x(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?If(e,EN):`https://${t.config.authDomain}/${IN}`,r={apiKey:e.apiKey,appName:t.name,v:ci},i=TN.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${io(r).slice(1)}`}async function AN(t){const e=await wN(t),n=et().gapi;return x(n,t,"internal-error"),e.open({where:document.body,url:SN(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bN,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Tt(t,"network-request-failed"),a=et().setTimeout(()=>{s(o)},_N.get());function c(){et().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kN=500,RN=600,NN="_blank",xN="http://localhost";class Nm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function DN(t,e,n,r=kN,i=RN){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},CN),{width:r.toString(),height:i.toString(),top:s,left:o}),u=qe().toLowerCase();n&&(a=u_(u)?NN:n),c_(u)&&(e=e||xN,c.scrollbars="yes");const l=Object.entries(c).reduce((d,[f,m])=>`${d}${f}=${m},`,"");if(ak(u)&&a!=="_self")return PN(e||"",a),new Nm(null);const h=window.open(e||"",a,l);x(h,t,"popup-blocked");try{h.focus()}catch{}return new Nm(h)}function PN(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ON="__/auth/handler",MN="emulator/auth/handler",LN=encodeURIComponent("fac");async function td(t,e,n,r,i,s){x(t.config.authDomain,t,"auth-domain-config-required"),x(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ci,eventId:i};if(e instanceof Tr){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",vC(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[l,h]of Object.entries(s||{}))o[l]=h}if(e instanceof co){const l=e.getScopes().filter(h=>h!=="");l.length>0&&(o.scopes=l.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];const c=await t._getAppCheckToken(),u=c?`#${LN}=${encodeURIComponent(c)}`:"";return`${FN(t)}?${io(a).slice(1)}${u}`}function FN({config:t}){return t.emulator?If(t,MN):`https://${t.authDomain}/${ON}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="webStorageSupport";class VN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ji,this._completeRedirectFn=cl,this._overrideRedirectResult=Of}async _openPopup(e,n,r,i){var s;An((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await td(e,n,r,wa(),i);return DN(e,o,Za())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await td(e,n,r,wa(),i);return wR(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(An(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await AN(e),r=new q_(e);return n.register("authEvent",i=>(x(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ih,{type:Ih},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ih];o!==void 0&&n(!!o),At(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gN(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return f_()||Ef()||oo()}}const UN=VN;class BN{constructor(e){this.factorId=e}_process(e,n,r){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,r);case"signin":return this._finalizeSignIn(e,n.credential);default:return $n("unexpected MultiFactorSessionType")}}}class Mf extends BN{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Mf(e)}_finalizeEnroll(e,n,r){return hR(e,{idToken:n,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return RR(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class z_{constructor(){}static assertion(e){return Mf._fromCredential(e)}}z_.FACTOR_ID="phone";var xm="@firebase/auth",Dm="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qN(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function jN(t){Yr(new Jn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;x(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:p_(t)},u=new mk(r,i,s,c);return yk(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Yr(new Jn("auth-internal",e=>{const n=Je(e.getProvider("auth").getImmediate());return(r=>new $N(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Hn(xm,Dm,qN(t)),Hn(xm,Dm,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GN=5*60;cC("authIdTokenMaxAge");jN("Browser");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(){return window}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zN=2e3;async function KN(t,e,n){var r;const{BuildInfo:i}=zi();An(e.sessionId,"AuthEvent did not contain a session ID");const s=await JN(e.sessionId),o={};return oo()?o.ibi=i.packageName:Ja()?o.apn=i.packageName:At(t,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=s,td(t,n,e.type,void 0,(r=e.eventId)!==null&&r!==void 0?r:void 0,o)}async function HN(t){const{BuildInfo:e}=zi(),n={};oo()?n.iosBundleId=e.packageName:Ja()?n.androidPackageName=e.packageName:At(t,"operation-not-supported-in-this-environment"),await G_(t,n)}function WN(t){const{cordova:e}=zi();return new Promise(n=>{e.plugins.browsertab.isAvailable(r=>{let i=null;r?e.plugins.browsertab.openUrl(t):i=e.InAppBrowser.open(t,ok()?"_blank":"_system","location=yes"),n(i)})})}async function QN(t,e,n){const{cordova:r}=zi();let i=()=>{};try{await new Promise((s,o)=>{let a=null;function c(){var h;s();const d=(h=r.plugins.browsertab)===null||h===void 0?void 0:h.close;typeof d=="function"&&d(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function u(){a||(a=window.setTimeout(()=>{o(Tt(t,"redirect-cancelled-by-user"))},zN))}function l(){(document==null?void 0:document.visibilityState)==="visible"&&u()}e.addPassiveListener(c),document.addEventListener("resume",u,!1),Ja()&&document.addEventListener("visibilitychange",l,!1),i=()=>{e.removePassiveListener(c),document.removeEventListener("resume",u,!1),document.removeEventListener("visibilitychange",l,!1),a&&window.clearTimeout(a)}})}finally{i()}}function YN(t){var e,n,r,i,s,o,a,c,u,l;const h=zi();x(typeof((e=h==null?void 0:h.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),x(typeof((n=h==null?void 0:h.BuildInfo)===null||n===void 0?void 0:n.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),x(typeof((s=(i=(r=h==null?void 0:h.cordova)===null||r===void 0?void 0:r.plugins)===null||i===void 0?void 0:i.browsertab)===null||s===void 0?void 0:s.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),x(typeof((c=(a=(o=h==null?void 0:h.cordova)===null||o===void 0?void 0:o.plugins)===null||a===void 0?void 0:a.browsertab)===null||c===void 0?void 0:c.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),x(typeof((l=(u=h==null?void 0:h.cordova)===null||u===void 0?void 0:u.InAppBrowser)===null||l===void 0?void 0:l.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function JN(t){const e=XN(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}function XN(t){if(An(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZN=20;class ex extends q_{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function tx(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:ix(),postBody:null,tenantId:t.tenantId,error:Tt(t,"no-auth-event")}}function nx(t,e){return nd()._set(rd(t),e)}async function Pm(t){const e=await nd()._get(rd(t));return e&&await nd()._remove(rd(t)),e}function rx(t,e){var n,r;const i=ox(e);if(i.includes("/__/auth/callback")){const s=Wc(i),o=s.firebaseError?sx(decodeURIComponent(s.firebaseError)):null,a=(r=(n=o==null?void 0:o.code)===null||n===void 0?void 0:n.split("auth/"))===null||r===void 0?void 0:r[1],c=a?Tt(a):null;return c?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:c,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:i,postBody:null}}return null}function ix(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<ZN;n++){const r=Math.floor(Math.random()*e.length);t.push(e.charAt(r))}return t.join("")}function nd(){return un(Rf)}function rd(t){return Vi("authEvent",t.config.apiKey,t.name)}function sx(t){try{return JSON.parse(t)}catch{return null}}function ox(t){const e=Wc(t),n=e.link?decodeURIComponent(e.link):void 0,r=Wc(n).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return Wc(i).link||i||r||n||t}function Wc(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return _s(n.join("?"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ax=500;class cx{constructor(){this._redirectPersistence=ji,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=cl,this._overrideRedirectResult=Of}async _initialize(e){const n=e._key();let r=this.eventManagers.get(n);return r||(r=new ex(e),this.eventManagers.set(n,r),this.attachCallbackListeners(e,r)),r}_openPopup(e){At(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,r,i){YN(e);const s=await this._initialize(e);await s.initialized(),s.resetRedirect(),rN(),await this._originValidation(e);const o=tx(e,r,i);await nx(e,o);const a=await KN(e,o,n),c=await WN(a);return QN(e,s,c)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=HN(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:r,handleOpenURL:i,BuildInfo:s}=zi(),o=setTimeout(async()=>{await Pm(e),n.onEvent(Om())},ax),a=async l=>{clearTimeout(o);const h=await Pm(e);let d=null;h&&(l!=null&&l.url)&&(d=rx(h,l.url)),n.onEvent(d||Om())};typeof r<"u"&&typeof r.subscribe=="function"&&r.subscribe(null,a);const c=i,u=`${s.packageName.toLowerCase()}://`;zi().handleOpenURL=async l=>{if(l.toLowerCase().startsWith(u)&&a({url:l}),typeof c=="function")try{c(l)}catch(h){console.error(h)}}}}const ux=cx;function Om(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Tt("no-auth-event")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lx(t,e){Je(t)._logFramework(e)}var hx="@firebase/auth-compat",dx="0.4.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fx=1e3;function ea(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function px(){return ea()==="http:"||ea()==="https:"}function K_(t=qe()){return!!((ea()==="file:"||ea()==="ionic:"||ea()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function gx(){return pf()||ff()}function mx(){return $w()&&(document==null?void 0:document.documentMode)===11}function yx(t=qe()){return/Edge\/\d+/.test(t)}function vx(t=qe()){return mx()||yx(t)}function H_(){try{const t=self.localStorage,e=Za();if(t)return t.setItem(e,"1"),t.removeItem(e),vx()?ma():!0}catch{return Lf()&&ma()}return!1}function Lf(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Eh(){return(px()||Bw()||K_())&&!gx()&&H_()&&!Lf()}function W_(){return K_()&&typeof document<"u"}async function wx(){return W_()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},fx);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function _x(){return typeof window<"u"?window:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on={LOCAL:"local",NONE:"none",SESSION:"session"},Ao=x,Q_="persistence";function Ix(t,e){if(Ao(Object.values(on).includes(e),t,"invalid-persistence-type"),pf()){Ao(e!==on.SESSION,t,"unsupported-persistence-type");return}if(ff()){Ao(e===on.NONE,t,"unsupported-persistence-type");return}if(Lf()){Ao(e===on.NONE||e===on.LOCAL&&ma(),t,"unsupported-persistence-type");return}Ao(e===on.NONE||H_(),t,"unsupported-persistence-type")}async function id(t){await t._initializationPromise;const e=Y_(),n=Vi(Q_,t.config.apiKey,t.name);e&&e.setItem(n,t._getPersistence())}function Ex(t,e){const n=Y_();if(!n)return[];const r=Vi(Q_,t,e);switch(n.getItem(r)){case on.NONE:return[$s];case on.LOCAL:return[ba,ji];case on.SESSION:return[ji];default:return[]}}function Y_(){var t;try{return((t=_x())===null||t===void 0?void 0:t.sessionStorage)||null}catch{return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bx=x;class jr{constructor(){this.browserResolver=un(UN),this.cordovaResolver=un(ux),this.underlyingResolver=null,this._redirectPersistence=ji,this._completeRedirectFn=cl,this._overrideRedirectResult=Of}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,r,i)}async _openRedirect(e,n,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,r,i)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return W_()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return bx(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await wx();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(t){return t.unwrap()}function Tx(t){return t.wrapped()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sx(t){return X_(t)}function Ax(t,e){var n;const r=(n=e.customData)===null||n===void 0?void 0:n._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new Cx(t,uR(t,e))}else if(r){const i=X_(e),s=e;i&&(s.credential=i,s.tenantId=r.tenantId||void 0,s.email=r.email||void 0,s.phoneNumber=r.phoneNumber||void 0)}}function X_(t){const{_tokenResponse:e}=t instanceof zt?t.customData:t;if(!e)return null;if(!(t instanceof zt)&&"temporaryProof"in e&&"phoneNumber"in e)return Gi.credentialFromResult(t);const n=e.providerId;if(!n||n===So.PASSWORD)return null;let r;switch(n){case So.GOOGLE:r=Fn;break;case So.FACEBOOK:r=Ln;break;case So.GITHUB:r=Vn;break;case So.TWITTER:r=Un;break;default:const{oauthIdToken:i,oauthAccessToken:s,oauthTokenSecret:o,pendingToken:a,nonce:c}=e;return!s&&!o&&!i&&!a?null:a?n.startsWith("saml.")?qs._create(n,a):Xn._fromParams({providerId:n,signInMethod:n,pendingToken:a,idToken:i,accessToken:s}):new ks(n).credential({idToken:i,accessToken:s,rawNonce:c})}return t instanceof zt?r.credentialFromError(t):r.credentialFromResult(t)}function Qt(t,e){return e.catch(n=>{throw n instanceof zt&&Ax(t,n),n}).then(n=>{const r=n.operationType,i=n.user;return{operationType:r,credential:Sx(n),additionalUserInfo:cR(n),user:ur.getOrCreate(i)}})}async function sd(t,e){const n=await e;return{verificationId:n.verificationId,confirm:r=>Qt(t,n.confirm(r))}}class Cx{constructor(e,n){this.resolver=n,this.auth=Tx(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Qt(J_(this.auth),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e){this._delegate=e,this.multiFactor=fR(e)}static getOrCreate(e){return ur.USER_MAP.has(e)||ur.USER_MAP.set(e,new ur(e)),ur.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Qt(this.auth,A_(this._delegate,e))}async linkWithPhoneNumber(e,n){return sd(this.auth,GR(this._delegate,e,n))}async linkWithPopup(e){return Qt(this.auth,ZR(this._delegate,e,jr))}async linkWithRedirect(e){return await id(Je(this.auth)),cN(this._delegate,e,jr)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Qt(this.auth,C_(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return sd(this.auth,zR(this._delegate,e,n))}reauthenticateWithPopup(e){return Qt(this.auth,XR(this._delegate,e,jr))}async reauthenticateWithRedirect(e){return await id(Je(this.auth)),oN(this._delegate,e,jr)}sendEmailVerification(e){return Jk(this._delegate,e)}async unlink(e){return await Fk(this._delegate,e),this}updateEmail(e){return tR(this._delegate,e)}updatePassword(e){return nR(this._delegate,e)}updatePhoneNumber(e){return KR(this._delegate,e)}updateProfile(e){return eR(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return Xk(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}ur.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co=x;class od{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:r}=e.options;Co(r,"invalid-api-key",{appName:e.name}),Co(r,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?jr:void 0;this._delegate=n.initialize({options:{persistence:kx(r,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap($1),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?ur.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){vk(this._delegate,e,n)}applyActionCode(e){return qk(this._delegate,e)}checkActionCode(e){return k_(this._delegate,e)}confirmPasswordReset(e,n){return $k(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Qt(this._delegate,Gk(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return Yk(this._delegate,e)}isSignInWithEmailLink(e){return Hk(this._delegate,e)}async getRedirectResult(){Co(Eh(),this._delegate,"operation-not-supported-in-this-environment");const e=await lN(this._delegate,jr);return e?Qt(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){lx(this._delegate,e)}onAuthStateChanged(e,n,r){const{next:i,error:s,complete:o}=Mm(e,n,r);return this._delegate.onAuthStateChanged(i,s,o)}onIdTokenChanged(e,n,r){const{next:i,error:s,complete:o}=Mm(e,n,r);return this._delegate.onIdTokenChanged(i,s,o)}sendSignInLinkToEmail(e,n){return Kk(this._delegate,e,n)}sendPasswordResetEmail(e,n){return Bk(this._delegate,e,n||void 0)}async setPersistence(e){Ix(this._delegate,e);let n;switch(e){case on.SESSION:n=ji;break;case on.LOCAL:n=await un(ba)._isAvailable()?ba:Rf;break;case on.NONE:n=$s;break;default:return At("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Qt(this._delegate,Lk(this._delegate))}signInWithCredential(e){return Qt(this._delegate,il(this._delegate,e))}signInWithCustomToken(e){return Qt(this._delegate,Uk(this._delegate,e))}signInWithEmailAndPassword(e,n){return Qt(this._delegate,zk(this._delegate,e,n))}signInWithEmailLink(e,n){return Qt(this._delegate,Wk(this._delegate,e,n))}signInWithPhoneNumber(e,n){return sd(this._delegate,jR(this._delegate,e,n))}async signInWithPopup(e){return Co(Eh(),this._delegate,"operation-not-supported-in-this-environment"),Qt(this._delegate,JR(this._delegate,e,jr))}async signInWithRedirect(e){return Co(Eh(),this._delegate,"operation-not-supported-in-this-environment"),await id(this._delegate),iN(this._delegate,e,jr)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return jk(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}od.Persistence=on;function Mm(t,e,n){let r=t;typeof t!="function"&&({next:r,error:e,complete:n}=t);const i=r;return{next:o=>i(o&&ur.getOrCreate(o)),error:e,complete:n}}function kx(t,e){const n=Ex(t,e);if(typeof self<"u"&&!n.includes(ba)&&n.push(ba),typeof window<"u")for(const r of[Rf,ji])n.includes(r)||n.push(r);return n.includes($s)||n.push($s),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(){this.providerId="phone",this._delegate=new Gi(J_(cn.auth()))}static credential(e,n){return Gi.credential(e,n)}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}Ff.PHONE_SIGN_IN_METHOD=Gi.PHONE_SIGN_IN_METHOD;Ff.PROVIDER_ID=Gi.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rx=x;class Nx{constructor(e,n,r=cn.app()){var i;Rx((i=r.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new $R(e,n,r.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xx="auth-compat";function Dx(t){t.INTERNAL.registerComponent(new Jn(xx,e=>{const n=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new od(n,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:ls.EMAIL_SIGNIN,PASSWORD_RESET:ls.PASSWORD_RESET,RECOVER_EMAIL:ls.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:ls.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:ls.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:ls.VERIFY_EMAIL}},EmailAuthProvider:ui,FacebookAuthProvider:Ln,GithubAuthProvider:Vn,GoogleAuthProvider:Fn,OAuthProvider:ks,SAMLAuthProvider:gu,PhoneAuthProvider:Ff,PhoneMultiFactorGenerator:z_,RecaptchaVerifier:Nx,TwitterAuthProvider:Un,Auth:od,AuthCredential:ao,Error:zt}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(hx,dx)}Dx(cn);var Px=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},U,Vf=Vf||{},re=Px||self;function ul(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function tc(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Ox(t){return Object.prototype.hasOwnProperty.call(t,bh)&&t[bh]||(t[bh]=++Mx)}var bh="closure_uid_"+(1e9*Math.random()>>>0),Mx=0;function Lx(t,e,n){return t.call.apply(t.bind,arguments)}function Fx(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,r),t.apply(e,i)}}return function(){return t.apply(e,arguments)}}function Lt(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Lt=Lx:Lt=Fx,Lt.apply(null,arguments)}function Cc(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function pt(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(r,i,s){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[i].apply(r,o)}}function li(){this.s=this.s,this.o=this.o}var Vx=0;li.prototype.s=!1;li.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),Vx!=0)&&Ox(this)};li.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Z_=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function Uf(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function Lm(t,e){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(ul(r)){const i=t.length||0,s=r.length||0;t.length=i+s;for(let o=0;o<s;o++)t[i+o]=r[o]}else t.push(r)}}function Ft(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}Ft.prototype.h=function(){this.defaultPrevented=!0};var Ux=function(){if(!re.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{re.addEventListener("test",()=>{},e),re.removeEventListener("test",()=>{},e)}catch{}return t}();function Ta(t){return/^[\s\xa0]*$/.test(t)}function ll(){var t=re.navigator;return t&&(t=t.userAgent)?t:""}function Bn(t){return ll().indexOf(t)!=-1}function Bf(t){return Bf[" "](t),t}Bf[" "]=function(){};function Bx(t,e){var n=DD;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var $x=Bn("Opera"),js=Bn("Trident")||Bn("MSIE"),eI=Bn("Edge"),ad=eI||js,tI=Bn("Gecko")&&!(ll().toLowerCase().indexOf("webkit")!=-1&&!Bn("Edge"))&&!(Bn("Trident")||Bn("MSIE"))&&!Bn("Edge"),qx=ll().toLowerCase().indexOf("webkit")!=-1&&!Bn("Edge");function nI(){var t=re.document;return t?t.documentMode:void 0}var cd;e:{var Th="",Sh=function(){var t=ll();if(tI)return/rv:([^\);]+)(\)|;)/.exec(t);if(eI)return/Edge\/([\d\.]+)/.exec(t);if(js)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(qx)return/WebKit\/(\S+)/.exec(t);if($x)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Sh&&(Th=Sh?Sh[1]:""),js){var Ah=nI();if(Ah!=null&&Ah>parseFloat(Th)){cd=String(Ah);break e}}cd=Th}var ud;if(re.document&&js){var Fm=nI();ud=Fm||parseInt(cd,10)||void 0}else ud=void 0;var jx=ud;function Sa(t,e){if(Ft.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(tI){e:{try{Bf(e.nodeName);var i=!0;break e}catch{}i=!1}i||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Gx[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Sa.$.h.call(this)}}pt(Sa,Ft);var Gx={2:"touch",3:"pen",4:"mouse"};Sa.prototype.h=function(){Sa.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var nc="closure_listenable_"+(1e6*Math.random()|0),zx=0;function Kx(t,e,n,r,i){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.la=i,this.key=++zx,this.fa=this.ia=!1}function hl(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function $f(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function Hx(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function rI(t){const e={};for(const n in t)e[n]=t[n];return e}const Vm="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function iI(t,e){let n,r;for(let i=1;i<arguments.length;i++){r=arguments[i];for(n in r)t[n]=r[n];for(let s=0;s<Vm.length;s++)n=Vm[s],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function dl(t){this.src=t,this.g={},this.h=0}dl.prototype.add=function(t,e,n,r,i){var s=t.toString();t=this.g[s],t||(t=this.g[s]=[],this.h++);var o=hd(t,e,r,i);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new Kx(e,this.src,s,!!r,i),e.ia=n,t.push(e)),e};function ld(t,e){var n=e.type;if(n in t.g){var r=t.g[n],i=Z_(r,e),s;(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(hl(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function hd(t,e,n,r){for(var i=0;i<t.length;++i){var s=t[i];if(!s.fa&&s.listener==e&&s.capture==!!n&&s.la==r)return i}return-1}var qf="closure_lm_"+(1e6*Math.random()|0),Ch={};function sI(t,e,n,r,i){if(r&&r.once)return aI(t,e,n,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)sI(t,e[s],n,r,i);return null}return n=zf(n),t&&t[nc]?t.O(e,n,tc(r)?!!r.capture:!!r,i):oI(t,e,n,!1,r,i)}function oI(t,e,n,r,i,s){if(!e)throw Error("Invalid event type");var o=tc(i)?!!i.capture:!!i,a=Gf(t);if(a||(t[qf]=a=new dl(t)),n=a.add(e,n,r,o,s),n.proxy)return n;if(r=Wx(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Ux||(i=o),i===void 0&&(i=!1),t.addEventListener(e.toString(),r,i);else if(t.attachEvent)t.attachEvent(uI(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function Wx(){function t(n){return e.call(t.src,t.listener,n)}const e=Qx;return t}function aI(t,e,n,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)aI(t,e[s],n,r,i);return null}return n=zf(n),t&&t[nc]?t.P(e,n,tc(r)?!!r.capture:!!r,i):oI(t,e,n,!0,r,i)}function cI(t,e,n,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)cI(t,e[s],n,r,i);else r=tc(r)?!!r.capture:!!r,n=zf(n),t&&t[nc]?(t=t.i,e=String(e).toString(),e in t.g&&(s=t.g[e],n=hd(s,n,r,i),-1<n&&(hl(s[n]),Array.prototype.splice.call(s,n,1),s.length==0&&(delete t.g[e],t.h--)))):t&&(t=Gf(t))&&(e=t.g[e.toString()],t=-1,e&&(t=hd(e,n,r,i)),(n=-1<t?e[t]:null)&&jf(n))}function jf(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[nc])ld(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(uI(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Gf(e))?(ld(n,t),n.h==0&&(n.src=null,e[qf]=null)):hl(t)}}}function uI(t){return t in Ch?Ch[t]:Ch[t]="on"+t}function Qx(t,e){if(t.fa)t=!0;else{e=new Sa(e,this);var n=t.listener,r=t.la||t.src;t.ia&&jf(t),t=n.call(r,e)}return t}function Gf(t){return t=t[qf],t instanceof dl?t:null}var kh="__closure_events_fn_"+(1e9*Math.random()>>>0);function zf(t){return typeof t=="function"?t:(t[kh]||(t[kh]=function(e){return t.handleEvent(e)}),t[kh])}function ft(){li.call(this),this.i=new dl(this),this.S=this,this.J=null}pt(ft,li);ft.prototype[nc]=!0;ft.prototype.removeEventListener=function(t,e,n,r){cI(this,t,e,n,r)};function St(t,e){var n,r=t.J;if(r)for(n=[];r;r=r.J)n.push(r);if(t=t.S,r=e.type||e,typeof e=="string")e=new Ft(e,t);else if(e instanceof Ft)e.target=e.target||t;else{var i=e;e=new Ft(r,t),iI(e,i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=e.g=n[s];i=kc(o,r,!0,e)&&i}if(o=e.g=t,i=kc(o,r,!0,e)&&i,i=kc(o,r,!1,e)&&i,n)for(s=0;s<n.length;s++)o=e.g=n[s],i=kc(o,r,!1,e)&&i}ft.prototype.N=function(){if(ft.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)hl(n[r]);delete t.g[e],t.h--}}this.J=null};ft.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};ft.prototype.P=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function kc(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.fa&&o.capture==n){var a=o.listener,c=o.la||o.src;o.ia&&ld(t.i,o),i=a.call(c,r)!==!1&&i}}return i&&!r.defaultPrevented}var Kf=re.JSON.stringify;class Yx{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function Jx(){var t=Hf;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class Xx{constructor(){this.h=this.g=null}add(e,n){const r=lI.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var lI=new Yx(()=>new Zx,t=>t.reset());class Zx{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function eD(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function tD(t){re.setTimeout(()=>{throw t},0)}let Aa,Ca=!1,Hf=new Xx,hI=()=>{const t=re.Promise.resolve(void 0);Aa=()=>{t.then(nD)}};var nD=()=>{for(var t;t=Jx();){try{t.h.call(t.g)}catch(n){tD(n)}var e=lI;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Ca=!1};function fl(t,e){ft.call(this),this.h=t||1,this.g=e||re,this.j=Lt(this.qb,this),this.l=Date.now()}pt(fl,ft);U=fl.prototype;U.ga=!1;U.T=null;U.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),St(this,"tick"),this.ga&&(Wf(this),this.start()))}};U.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Wf(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}U.N=function(){fl.$.N.call(this),Wf(this),delete this.g};function Qf(t,e,n){if(typeof t=="function")n&&(t=Lt(t,n));else if(t&&typeof t.handleEvent=="function")t=Lt(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:re.setTimeout(t,e||0)}function dI(t){t.g=Qf(()=>{t.g=null,t.i&&(t.i=!1,dI(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class rD extends li{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:dI(this)}N(){super.N(),this.g&&(re.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ka(t){li.call(this),this.h=t,this.g={}}pt(ka,li);var Um=[];function fI(t,e,n,r){Array.isArray(n)||(n&&(Um[0]=n.toString()),n=Um);for(var i=0;i<n.length;i++){var s=sI(e,n[i],r||t.handleEvent,!1,t.h||t);if(!s)break;t.g[s.key]=s}}function pI(t){$f(t.g,function(e,n){this.g.hasOwnProperty(n)&&jf(e)},t),t.g={}}ka.prototype.N=function(){ka.$.N.call(this),pI(this)};ka.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function pl(){this.g=!0}pl.prototype.Ea=function(){this.g=!1};function iD(t,e,n,r,i,s){t.info(function(){if(t.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+`
`+n+`
`+o})}function sD(t,e,n,r,i,s,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+`
`+n+`
`+s+" "+o})}function Is(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+aD(t,n)+(r?" "+r:"")})}function oD(t,e){t.info(function(){return"TIMEOUT: "+e})}pl.prototype.info=function(){};function aD(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if(s!="noop"&&s!="stop"&&s!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return Kf(n)}catch{return e}}var rs={},Bm=null;function gl(){return Bm=Bm||new ft}rs.Ta="serverreachability";function gI(t){Ft.call(this,rs.Ta,t)}pt(gI,Ft);function Ra(t){const e=gl();St(e,new gI(e))}rs.STAT_EVENT="statevent";function mI(t,e){Ft.call(this,rs.STAT_EVENT,t),this.stat=e}pt(mI,Ft);function Gt(t){const e=gl();St(e,new mI(e,t))}rs.Ua="timingevent";function yI(t,e){Ft.call(this,rs.Ua,t),this.size=e}pt(yI,Ft);function rc(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return re.setTimeout(function(){t()},e)}var ml={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},vI={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Yf(){}Yf.prototype.h=null;function $m(t){return t.h||(t.h=t.i())}function wI(){}var ic={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function Jf(){Ft.call(this,"d")}pt(Jf,Ft);function Xf(){Ft.call(this,"c")}pt(Xf,Ft);var dd;function yl(){}pt(yl,Yf);yl.prototype.g=function(){return new XMLHttpRequest};yl.prototype.i=function(){return{}};dd=new yl;function sc(t,e,n,r){this.l=t,this.j=e,this.m=n,this.W=r||1,this.U=new ka(this),this.P=cD,t=ad?125:void 0,this.V=new fl(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new _I}function _I(){this.i=null,this.g="",this.h=!1}var cD=45e3,fd={},wu={};U=sc.prototype;U.setTimeout=function(t){this.P=t};function pd(t,e,n){t.L=1,t.v=wl(_r(e)),t.s=n,t.S=!0,II(t,null)}function II(t,e){t.G=Date.now(),oc(t),t.A=_r(t.v);var n=t.A,r=t.W;Array.isArray(r)||(r=[String(r)]),RI(n.i,"t",r),t.C=0,n=t.l.J,t.h=new _I,t.g=YI(t.l,n?e:null,!t.s),0<t.O&&(t.M=new rD(Lt(t.Pa,t,t.g),t.O)),fI(t.U,t.g,"readystatechange",t.nb),e=t.I?rI(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),Ra(),iD(t.j,t.u,t.A,t.m,t.W,t.s)}U.nb=function(t){t=t.target;const e=this.M;e&&qn(t)==3?e.l():this.Pa(t)};U.Pa=function(t){try{if(t==this.g)e:{const l=qn(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>l)&&(l!=3||ad||this.g&&(this.h.h||this.g.ja()||zm(this.g)))){this.J||l!=4||e==7||(e==8||0>=h?Ra(3):Ra(2)),vl(this);var n=this.g.da();this.ca=n;t:if(EI(this)){var r=zm(this.g);t="";var i=r.length,s=qn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){xi(this),ta(this);var o="";break t}this.h.i=new re.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:s&&e==i-1});r.splice(0,i),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,sD(this.j,this.u,this.A,this.m,this.W,l,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ta(a)){var u=a;break t}}u=null}if(n=u)Is(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,gd(this,n);else{this.i=!1,this.o=3,Gt(12),xi(this),ta(this);break e}}this.S?(bI(this,l,o),ad&&this.i&&l==3&&(fI(this.U,this.V,"tick",this.mb),this.V.start())):(Is(this.j,this.m,o,null),gd(this,o)),l==4&&xi(this),this.i&&!this.J&&(l==4?KI(this.l,this):(this.i=!1,oc(this)))}else RD(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,Gt(12)):(this.o=0,Gt(13)),xi(this),ta(this)}}}catch{}finally{}};function EI(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function bI(t,e,n){let r=!0,i;for(;!t.J&&t.C<n.length;)if(i=uD(t,n),i==wu){e==4&&(t.o=4,Gt(14),r=!1),Is(t.j,t.m,null,"[Incomplete Response]");break}else if(i==fd){t.o=4,Gt(15),Is(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else Is(t.j,t.m,i,null),gd(t,i);EI(t)&&i!=wu&&i!=fd&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,Gt(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),ip(e),e.M=!0,Gt(11))):(Is(t.j,t.m,n,"[Invalid Chunked Response]"),xi(t),ta(t))}U.mb=function(){if(this.g){var t=qn(this.g),e=this.g.ja();this.C<e.length&&(vl(this),bI(this,t,e),this.i&&t!=4&&oc(this))}};function uD(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?wu:(n=Number(e.substring(n,r)),isNaN(n)?fd:(r+=1,r+n>e.length?wu:(e=e.slice(r,r+n),t.C=r+n,e)))}U.cancel=function(){this.J=!0,xi(this)};function oc(t){t.Y=Date.now()+t.P,TI(t,t.P)}function TI(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=rc(Lt(t.lb,t),e)}function vl(t){t.B&&(re.clearTimeout(t.B),t.B=null)}U.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(oD(this.j,this.A),this.L!=2&&(Ra(),Gt(17)),xi(this),this.o=2,ta(this)):TI(this,this.Y-t)};function ta(t){t.l.H==0||t.J||KI(t.l,t)}function xi(t){vl(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,Wf(t.V),pI(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function gd(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||md(n.i,t))){if(!t.K&&md(n.i,t)&&n.H==3){try{var r=n.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var i=r;if(i[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)Eu(n),El(n);else break e;rp(n),Gt(18)}}else n.Fa=i[1],0<n.Fa-n.V&&37500>i[2]&&n.G&&n.A==0&&!n.v&&(n.v=rc(Lt(n.ib,n),6e3));if(1>=DI(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else Di(n,11)}else if((t.K||n.g==t)&&Eu(n),!Ta(e))for(i=n.Ja.g.parse(e),e=0;e<i.length;e++){let u=i[e];if(n.V=u[0],u=u[1],n.H==2)if(u[0]=="c"){n.K=u[1],n.pa=u[2];const l=u[3];l!=null&&(n.ra=l,n.l.info("VER="+n.ra));const h=u[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const d=u[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;const f=t.g;if(f){const m=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var s=r.i;s.g||m.indexOf("spdy")==-1&&m.indexOf("quic")==-1&&m.indexOf("h2")==-1||(s.j=s.l,s.g=new Set,s.h&&(Zf(s,s.h),s.h=null))}if(r.F){const _=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;_&&(r.Da=_,Pe(r.I,r.F,_))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),r=n;var o=t;if(r.wa=QI(r,r.J?r.pa:null,r.Y),o.K){PI(r.i,o);var a=o,c=r.L;c&&a.setTimeout(c),a.B&&(vl(a),oc(a)),r.g=o}else GI(r);0<n.j.length&&bl(n)}else u[0]!="stop"&&u[0]!="close"||Di(n,7);else n.H==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?Di(n,7):np(n):u[0]!="noop"&&n.h&&n.h.Aa(u),n.A=0)}}Ra(4)}catch{}}function lD(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(ul(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function hD(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(ul(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}function SI(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(ul(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=hD(t),r=lD(t),i=r.length,s=0;s<i;s++)e.call(void 0,r[s],n&&n[s],t)}var AI=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dD(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),i=null;if(0<=r){var s=t[n].substring(0,r);i=t[n].substring(r+1)}else s=t[n];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function Bi(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof Bi){this.h=t.h,_u(this,t.j),this.s=t.s,this.g=t.g,Iu(this,t.m),this.l=t.l;var e=t.i,n=new Na;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),qm(this,n),this.o=t.o}else t&&(e=String(t).match(AI))?(this.h=!1,_u(this,e[1]||"",!0),this.s=Uo(e[2]||""),this.g=Uo(e[3]||"",!0),Iu(this,e[4]),this.l=Uo(e[5]||"",!0),qm(this,e[6]||"",!0),this.o=Uo(e[7]||"")):(this.h=!1,this.i=new Na(null,this.h))}Bi.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Bo(e,jm,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Bo(e,jm,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Bo(n,n.charAt(0)=="/"?gD:pD,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Bo(n,yD)),t.join("")};function _r(t){return new Bi(t)}function _u(t,e,n){t.j=n?Uo(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Iu(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function qm(t,e,n){e instanceof Na?(t.i=e,vD(t.i,t.h)):(n||(e=Bo(e,mD)),t.i=new Na(e,t.h))}function Pe(t,e,n){t.i.set(e,n)}function wl(t){return Pe(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Uo(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Bo(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,fD),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function fD(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var jm=/[#\/\?@]/g,pD=/[#\?:]/g,gD=/[#\?]/g,mD=/[#\?@]/g,yD=/#/g;function Na(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function hi(t){t.g||(t.g=new Map,t.h=0,t.i&&dD(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}U=Na.prototype;U.add=function(t,e){hi(this),this.i=null,t=uo(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function CI(t,e){hi(t),e=uo(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function kI(t,e){return hi(t),e=uo(t,e),t.g.has(e)}U.forEach=function(t,e){hi(this),this.g.forEach(function(n,r){n.forEach(function(i){t.call(e,i,r,this)},this)},this)};U.ta=function(){hi(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const i=t[r];for(let s=0;s<i.length;s++)n.push(e[r])}return n};U.Z=function(t){hi(this);let e=[];if(typeof t=="string")kI(this,t)&&(e=e.concat(this.g.get(uo(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};U.set=function(t,e){return hi(this),this.i=null,t=uo(this,t),kI(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};U.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function RI(t,e,n){CI(t,e),0<n.length&&(t.i=null,t.g.set(uo(t,e),Uf(n)),t.h+=n.length)}U.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const s=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var i=s;o[r]!==""&&(i+="="+encodeURIComponent(String(o[r]))),t.push(i)}}return this.i=t.join("&")};function uo(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function vD(t,e){e&&!t.j&&(hi(t),t.i=null,t.g.forEach(function(n,r){var i=r.toLowerCase();r!=i&&(CI(this,r),RI(this,i,n))},t)),t.j=e}var wD=class{constructor(t,e){this.g=t,this.map=e}};function NI(t){this.l=t||_D,re.PerformanceNavigationTiming?(t=re.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(re.g&&re.g.Ka&&re.g.Ka()&&re.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var _D=10;function xI(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function DI(t){return t.h?1:t.g?t.g.size:0}function md(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Zf(t,e){t.g?t.g.add(e):t.h=e}function PI(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}NI.prototype.cancel=function(){if(this.i=OI(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function OI(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return Uf(t.i)}var ID=class{stringify(t){return re.JSON.stringify(t,void 0)}parse(t){return re.JSON.parse(t,void 0)}};function ED(){this.g=new ID}function bD(t,e,n){const r=n||"";try{SI(t,function(i,s){let o=i;tc(i)&&(o=Kf(i)),e.push(r+s+"="+encodeURIComponent(o))})}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function TD(t,e){const n=new pl;if(re.Image){const r=new Image;r.onload=Cc(Rc,n,r,"TestLoadImage: loaded",!0,e),r.onerror=Cc(Rc,n,r,"TestLoadImage: error",!1,e),r.onabort=Cc(Rc,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=Cc(Rc,n,r,"TestLoadImage: timeout",!1,e),re.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function Rc(t,e,n,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch{}}function ac(t){this.l=t.fc||null,this.j=t.ob||!1}pt(ac,Yf);ac.prototype.g=function(){return new _l(this.l,this.j)};ac.prototype.i=function(t){return function(){return t}}({});function _l(t,e){ft.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=ep,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}pt(_l,ft);var ep=0;U=_l.prototype;U.open=function(t,e){if(this.readyState!=ep)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,xa(this)};U.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||re).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};U.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,cc(this)),this.readyState=ep};U.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,xa(this)),this.g&&(this.readyState=3,xa(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof re.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;MI(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function MI(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}U.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?cc(this):xa(this),this.readyState==3&&MI(this)}};U.Za=function(t){this.g&&(this.response=this.responseText=t,cc(this))};U.Ya=function(t){this.g&&(this.response=t,cc(this))};U.ka=function(){this.g&&cc(this)};function cc(t){t.readyState=4,t.l=null,t.j=null,t.A=null,xa(t)}U.setRequestHeader=function(t,e){this.v.append(t,e)};U.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};U.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function xa(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(_l.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var SD=re.JSON.parse;function Ke(t){ft.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=LI,this.L=this.M=!1}pt(Ke,ft);var LI="",AD=/^https?$/i,CD=["POST","PUT"];U=Ke.prototype;U.Oa=function(t){this.M=t};U.ha=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():dd.g(),this.C=this.u?$m(this.u):$m(dd),this.g.onreadystatechange=Lt(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(s){Gm(this,s);return}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const s of r.keys())n.set(s,r.get(s));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(s=>s.toLowerCase()=="content-type"),i=re.FormData&&t instanceof re.FormData,!(0<=Z_(CD,e))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,o]of n)this.g.setRequestHeader(s,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{UI(this),0<this.B&&((this.L=kD(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Lt(this.ua,this)):this.A=Qf(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(s){Gm(this,s)}};function kD(t){return js&&typeof t.timeout=="number"&&t.ontimeout!==void 0}U.ua=function(){typeof Vf<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,St(this,"timeout"),this.abort(8))};function Gm(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,FI(t),Il(t)}function FI(t){t.F||(t.F=!0,St(t,"complete"),St(t,"error"))}U.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,St(this,"complete"),St(this,"abort"),Il(this))};U.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Il(this,!0)),Ke.$.N.call(this)};U.La=function(){this.s||(this.G||this.v||this.l?VI(this):this.kb())};U.kb=function(){VI(this)};function VI(t){if(t.h&&typeof Vf<"u"&&(!t.C[1]||qn(t)!=4||t.da()!=2)){if(t.v&&qn(t)==4)Qf(t.La,0,t);else if(St(t,"readystatechange"),qn(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=o===0){var i=String(t.I).match(AI)[1]||null;!i&&re.self&&re.self.location&&(i=re.self.location.protocol.slice(0,-1)),r=!AD.test(i?i.toLowerCase():"")}n=r}if(n)St(t,"complete"),St(t,"success");else{t.m=6;try{var s=2<qn(t)?t.g.statusText:""}catch{s=""}t.j=s+" ["+t.da()+"]",FI(t)}}finally{Il(t)}}}}function Il(t,e){if(t.g){UI(t);const n=t.g,r=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||St(t,"ready");try{n.onreadystatechange=r}catch{}}}function UI(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(re.clearTimeout(t.A),t.A=null)}U.isActive=function(){return!!this.g};function qn(t){return t.g?t.g.readyState:0}U.da=function(){try{return 2<qn(this)?this.g.status:-1}catch{return-1}};U.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};U.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),SD(e)}};function zm(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case LI:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function RD(t){const e={};t=(t.g&&2<=qn(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<t.length;r++){if(Ta(t[r]))continue;var n=eD(t[r]);const i=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const s=e[i]||[];e[i]=s,s.push(n)}Hx(e,function(r){return r.join(", ")})}U.Ia=function(){return this.m};U.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function BI(t){let e="";return $f(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function tp(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=BI(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Pe(t,e,n))}function ko(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function $I(t){this.Ga=0,this.j=[],this.l=new pl,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=ko("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=ko("baseRetryDelayMs",5e3,t),this.hb=ko("retryDelaySeedMs",1e4,t),this.eb=ko("forwardChannelMaxRetries",2,t),this.xa=ko("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new NI(t&&t.concurrentRequestLimit),this.Ja=new ED,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}U=$I.prototype;U.ra=8;U.H=1;function np(t){if(qI(t),t.H==3){var e=t.W++,n=_r(t.I);if(Pe(n,"SID",t.K),Pe(n,"RID",e),Pe(n,"TYPE","terminate"),uc(t,n),e=new sc(t,t.l,e),e.L=2,e.v=wl(_r(n)),n=!1,re.navigator&&re.navigator.sendBeacon)try{n=re.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&re.Image&&(new Image().src=e.v,n=!0),n||(e.g=YI(e.l,null),e.g.ha(e.v)),e.G=Date.now(),oc(e)}WI(t)}function El(t){t.g&&(ip(t),t.g.cancel(),t.g=null)}function qI(t){El(t),t.u&&(re.clearTimeout(t.u),t.u=null),Eu(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&re.clearTimeout(t.m),t.m=null)}function bl(t){if(!xI(t.i)&&!t.m){t.m=!0;var e=t.Na;Aa||hI(),Ca||(Aa(),Ca=!0),Hf.add(e,t),t.C=0}}function ND(t,e){return DI(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=rc(Lt(t.Na,t,e),HI(t,t.C)),t.C++,!0)}U.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const i=new sc(this,this.l,t);let s=this.s;if(this.U&&(s?(s=rI(s),iI(s,this.U)):s=this.U),this.o!==null||this.O||(i.I=s,s=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var r=this.j[n];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=jI(this,i,e),n=_r(this.I),Pe(n,"RID",t),Pe(n,"CVER",22),this.F&&Pe(n,"X-HTTP-Session-Id",this.F),uc(this,n),s&&(this.O?e="headers="+encodeURIComponent(String(BI(s)))+"&"+e:this.o&&tp(n,this.o,s)),Zf(this.i,i),this.bb&&Pe(n,"TYPE","init"),this.P?(Pe(n,"$req",e),Pe(n,"SID","null"),i.aa=!0,pd(i,n,null)):pd(i,n,e),this.H=2}}else this.H==3&&(t?Km(this,t):this.j.length==0||xI(this.i)||Km(this))};function Km(t,e){var n;e?n=e.m:n=t.W++;const r=_r(t.I);Pe(r,"SID",t.K),Pe(r,"RID",n),Pe(r,"AID",t.V),uc(t,r),t.o&&t.s&&tp(r,t.o,t.s),n=new sc(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=jI(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),Zf(t.i,n),pd(n,r,e)}function uc(t,e){t.na&&$f(t.na,function(n,r){Pe(e,r,n)}),t.h&&SI({},function(n,r){Pe(e,r,n)})}function jI(t,e,n){n=Math.min(t.j.length,n);var r=t.h?Lt(t.h.Va,t.h,t):null;e:{var i=t.j;let s=-1;for(;;){const o=["count="+n];s==-1?0<n?(s=i[0].g,o.push("ofs="+s)):s=0:o.push("ofs="+s);let a=!0;for(let c=0;c<n;c++){let u=i[c].g;const l=i[c].map;if(u-=s,0>u)s=Math.max(0,i[c].g-100),a=!1;else try{bD(l,o,"req"+u+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,r}function GI(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;Aa||hI(),Ca||(Aa(),Ca=!0),Hf.add(e,t),t.A=0}}function rp(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=rc(Lt(t.Ma,t),HI(t,t.A)),t.A++,!0)}U.Ma=function(){if(this.u=null,zI(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=rc(Lt(this.jb,this),t)}};U.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,Gt(10),El(this),zI(this))};function ip(t){t.B!=null&&(re.clearTimeout(t.B),t.B=null)}function zI(t){t.g=new sc(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=_r(t.wa);Pe(e,"RID","rpc"),Pe(e,"SID",t.K),Pe(e,"AID",t.V),Pe(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&Pe(e,"TO",t.qa),Pe(e,"TYPE","xmlhttp"),uc(t,e),t.o&&t.s&&tp(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=wl(_r(e)),n.s=null,n.S=!0,II(n,t)}U.ib=function(){this.v!=null&&(this.v=null,El(this),rp(this),Gt(19))};function Eu(t){t.v!=null&&(re.clearTimeout(t.v),t.v=null)}function KI(t,e){var n=null;if(t.g==e){Eu(t),ip(t),t.g=null;var r=2}else if(md(t.i,e))n=e.F,PI(t.i,e),r=1;else return;if(t.H!=0){if(e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var i=t.C;r=gl(),St(r,new yI(r,n)),bl(t)}else GI(t);else if(i=e.o,i==3||i==0&&0<e.ca||!(r==1&&ND(t,e)||r==2&&rp(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),i){case 1:Di(t,5);break;case 4:Di(t,10);break;case 3:Di(t,6);break;default:Di(t,2)}}}function HI(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function Di(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var r=Lt(t.pb,t);n||(n=new Bi("//www.google.com/images/cleardot.gif"),re.location&&re.location.protocol=="http"||_u(n,"https"),wl(n)),TD(n.toString(),r)}else Gt(2);t.H=0,t.h&&t.h.za(e),WI(t),qI(t)}U.pb=function(t){t?(this.l.info("Successfully pinged google.com"),Gt(2)):(this.l.info("Failed to ping google.com"),Gt(1))};function WI(t){if(t.H=0,t.ma=[],t.h){const e=OI(t.i);(e.length!=0||t.j.length!=0)&&(Lm(t.ma,e),Lm(t.ma,t.j),t.i.i.length=0,Uf(t.j),t.j.length=0),t.h.ya()}}function QI(t,e,n){var r=n instanceof Bi?_r(n):new Bi(n);if(r.g!="")e&&(r.g=e+"."+r.g),Iu(r,r.m);else{var i=re.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var s=new Bi(null);r&&_u(s,r),e&&(s.g=e),i&&Iu(s,i),n&&(s.l=n),r=s}return n=t.F,e=t.Da,n&&e&&Pe(r,n,e),Pe(r,"VER",t.ra),uc(t,r),r}function YI(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new Ke(new ac({ob:!0})):new Ke(t.va),e.Oa(t.J),e}U.isActive=function(){return!!this.h&&this.h.isActive(this)};function JI(){}U=JI.prototype;U.Ba=function(){};U.Aa=function(){};U.za=function(){};U.ya=function(){};U.isActive=function(){return!0};U.Va=function(){};function bu(){if(js&&!(10<=Number(jx)))throw Error("Environmental error: no available transport.")}bu.prototype.g=function(t,e){return new ln(t,e)};function ln(t,e){ft.call(this),this.g=new $I(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!Ta(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Ta(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new lo(this)}pt(ln,ft);ln.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;Gt(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=QI(t,null,t.Y),bl(t)};ln.prototype.close=function(){np(this.g)};ln.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=Kf(t),t=n);e.j.push(new wD(e.fb++,t)),e.H==3&&bl(e)};ln.prototype.N=function(){this.g.h=null,delete this.j,np(this.g),delete this.g,ln.$.N.call(this)};function XI(t){Jf.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}pt(XI,Jf);function ZI(){Xf.call(this),this.status=1}pt(ZI,Xf);function lo(t){this.g=t}pt(lo,JI);lo.prototype.Ba=function(){St(this.g,"a")};lo.prototype.Aa=function(t){St(this.g,new XI(t))};lo.prototype.za=function(t){St(this.g,new ZI)};lo.prototype.ya=function(){St(this.g,"b")};function xD(){this.blockSize=-1}function Cn(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}pt(Cn,xD);Cn.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Rh(t,e,n){n||(n=0);var r=Array(16);if(typeof e=="string")for(var i=0;16>i;++i)r[i]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],i=t.g[2];var s=t.g[3],o=e+(s^n&(i^s))+r[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=s+(i^e&(n^i))+r[1]+3905402710&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(n^s&(e^n))+r[2]+606105819&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(e^i&(s^e))+r[3]+3250441966&4294967295,n=i+(o<<22&4294967295|o>>>10),o=e+(s^n&(i^s))+r[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=s+(i^e&(n^i))+r[5]+1200080426&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(n^s&(e^n))+r[6]+2821735955&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(e^i&(s^e))+r[7]+4249261313&4294967295,n=i+(o<<22&4294967295|o>>>10),o=e+(s^n&(i^s))+r[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=s+(i^e&(n^i))+r[9]+2336552879&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(n^s&(e^n))+r[10]+4294925233&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(e^i&(s^e))+r[11]+2304563134&4294967295,n=i+(o<<22&4294967295|o>>>10),o=e+(s^n&(i^s))+r[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=s+(i^e&(n^i))+r[13]+4254626195&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(n^s&(e^n))+r[14]+2792965006&4294967295,i=s+(o<<17&4294967295|o>>>15),o=n+(e^i&(s^e))+r[15]+1236535329&4294967295,n=i+(o<<22&4294967295|o>>>10),o=e+(i^s&(n^i))+r[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(e^n))+r[6]+3225465664&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^n&(s^e))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^e&(i^s))+r[0]+3921069994&4294967295,n=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(n^i))+r[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(e^n))+r[10]+38016083&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^n&(s^e))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^e&(i^s))+r[4]+3889429448&4294967295,n=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(n^i))+r[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(e^n))+r[14]+3275163606&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^n&(s^e))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^e&(i^s))+r[8]+1163531501&4294967295,n=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(n^i))+r[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=s+(n^i&(e^n))+r[2]+4243563512&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^n&(s^e))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=n+(s^e&(i^s))+r[12]+2368359562&4294967295,n=i+(o<<20&4294967295|o>>>12),o=e+(n^i^s)+r[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=s+(e^n^i)+r[8]+2272392833&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^n)+r[11]+1839030562&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^e)+r[14]+4259657740&4294967295,n=i+(o<<23&4294967295|o>>>9),o=e+(n^i^s)+r[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=s+(e^n^i)+r[4]+1272893353&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^n)+r[7]+4139469664&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^e)+r[10]+3200236656&4294967295,n=i+(o<<23&4294967295|o>>>9),o=e+(n^i^s)+r[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=s+(e^n^i)+r[0]+3936430074&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^n)+r[3]+3572445317&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^e)+r[6]+76029189&4294967295,n=i+(o<<23&4294967295|o>>>9),o=e+(n^i^s)+r[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=s+(e^n^i)+r[12]+3873151461&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^n)+r[15]+530742520&4294967295,i=s+(o<<16&4294967295|o>>>16),o=n+(i^s^e)+r[2]+3299628645&4294967295,n=i+(o<<23&4294967295|o>>>9),o=e+(i^(n|~s))+r[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=s+(n^(e|~i))+r[7]+1126891415&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~n))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~e))+r[5]+4237533241&4294967295,n=i+(o<<21&4294967295|o>>>11),o=e+(i^(n|~s))+r[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=s+(n^(e|~i))+r[3]+2399980690&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~n))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~e))+r[1]+2240044497&4294967295,n=i+(o<<21&4294967295|o>>>11),o=e+(i^(n|~s))+r[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=s+(n^(e|~i))+r[15]+4264355552&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~n))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~e))+r[13]+1309151649&4294967295,n=i+(o<<21&4294967295|o>>>11),o=e+(i^(n|~s))+r[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=s+(n^(e|~i))+r[11]+3174756917&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~n))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=n+(s^(i|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+i&4294967295,t.g[3]=t.g[3]+s&4294967295}Cn.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,r=this.m,i=this.h,s=0;s<e;){if(i==0)for(;s<=n;)Rh(this,t,s),s+=this.blockSize;if(typeof t=="string"){for(;s<e;)if(r[i++]=t.charCodeAt(s++),i==this.blockSize){Rh(this,r),i=0;break}}else for(;s<e;)if(r[i++]=t[s++],i==this.blockSize){Rh(this,r),i=0;break}}this.h=i,this.i+=e};Cn.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};function Te(t,e){this.h=e;for(var n=[],r=!0,i=t.length-1;0<=i;i--){var s=t[i]|0;r&&s==e||(n[i]=s,r=!1)}this.g=n}var DD={};function sp(t){return-128<=t&&128>t?Bx(t,function(e){return new Te([e|0],0>e?-1:0)}):new Te([t|0],0>t?-1:0)}function jn(t){if(isNaN(t)||!isFinite(t))return xs;if(0>t)return _t(jn(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=yd;return new Te(e,0)}function e0(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return _t(e0(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=jn(Math.pow(e,8)),r=xs,i=0;i<t.length;i+=8){var s=Math.min(8,t.length-i),o=parseInt(t.substring(i,i+s),e);8>s?(s=jn(Math.pow(e,s)),r=r.R(s).add(jn(o))):(r=r.R(n),r=r.add(jn(o)))}return r}var yd=4294967296,xs=sp(0),vd=sp(1),Hm=sp(16777216);U=Te.prototype;U.ea=function(){if(dn(this))return-_t(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.D(n);t+=(0<=r?r:yd+r)*e,e*=yd}return t};U.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(lr(this))return"0";if(dn(this))return"-"+_t(this).toString(t);for(var e=jn(Math.pow(t,6)),n=this,r="";;){var i=Su(n,e).g;n=Tu(n,i.R(e));var s=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=i,lr(n))return s+r;for(;6>s.length;)s="0"+s;r=s+r}};U.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function lr(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function dn(t){return t.h==-1}U.X=function(t){return t=Tu(this,t),dn(t)?-1:lr(t)?0:1};function _t(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new Te(n,~t.h).add(vd)}U.abs=function(){return dn(this)?_t(this):this};U.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,i=0;i<=e;i++){var s=r+(this.D(i)&65535)+(t.D(i)&65535),o=(s>>>16)+(this.D(i)>>>16)+(t.D(i)>>>16);r=o>>>16,s&=65535,o&=65535,n[i]=o<<16|s}return new Te(n,n[n.length-1]&-2147483648?-1:0)};function Tu(t,e){return t.add(_t(e))}U.R=function(t){if(lr(this)||lr(t))return xs;if(dn(this))return dn(t)?_t(this).R(_t(t)):_t(_t(this).R(t));if(dn(t))return _t(this.R(_t(t)));if(0>this.X(Hm)&&0>t.X(Hm))return jn(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<t.g.length;i++){var s=this.D(r)>>>16,o=this.D(r)&65535,a=t.D(i)>>>16,c=t.D(i)&65535;n[2*r+2*i]+=o*c,Nc(n,2*r+2*i),n[2*r+2*i+1]+=s*c,Nc(n,2*r+2*i+1),n[2*r+2*i+1]+=o*a,Nc(n,2*r+2*i+1),n[2*r+2*i+2]+=s*a,Nc(n,2*r+2*i+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new Te(n,0)};function Nc(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function Ro(t,e){this.g=t,this.h=e}function Su(t,e){if(lr(e))throw Error("division by zero");if(lr(t))return new Ro(xs,xs);if(dn(t))return e=Su(_t(t),e),new Ro(_t(e.g),_t(e.h));if(dn(e))return e=Su(t,_t(e)),new Ro(_t(e.g),e.h);if(30<t.g.length){if(dn(t)||dn(e))throw Error("slowDivide_ only works with positive integers.");for(var n=vd,r=e;0>=r.X(t);)n=Wm(n),r=Wm(r);var i=hs(n,1),s=hs(r,1);for(r=hs(r,2),n=hs(n,2);!lr(r);){var o=s.add(r);0>=o.X(t)&&(i=i.add(n),s=o),r=hs(r,1),n=hs(n,1)}return e=Tu(t,i.R(e)),new Ro(i,e)}for(i=xs;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),s=jn(n),o=s.R(e);dn(o)||0<o.X(t);)n-=r,s=jn(n),o=s.R(e);lr(s)&&(s=vd),i=i.add(s),t=Tu(t,o)}return new Ro(i,t)}U.gb=function(t){return Su(this,t).h};U.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)&t.D(r);return new Te(n,this.h&t.h)};U.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)|t.D(r);return new Te(n,this.h|t.h)};U.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)^t.D(r);return new Te(n,this.h^t.h)};function Wm(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.D(r)<<1|t.D(r-1)>>>31;return new Te(n,t.h)}function hs(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,i=[],s=0;s<r;s++)i[s]=0<e?t.D(s+n)>>>e|t.D(s+n+1)<<32-e:t.D(s+n);return new Te(i,t.h)}bu.prototype.createWebChannel=bu.prototype.g;ln.prototype.send=ln.prototype.u;ln.prototype.open=ln.prototype.m;ln.prototype.close=ln.prototype.close;ml.NO_ERROR=0;ml.TIMEOUT=8;ml.HTTP_ERROR=6;vI.COMPLETE="complete";wI.EventType=ic;ic.OPEN="a";ic.CLOSE="b";ic.ERROR="c";ic.MESSAGE="d";ft.prototype.listen=ft.prototype.O;Ke.prototype.listenOnce=Ke.prototype.P;Ke.prototype.getLastError=Ke.prototype.Sa;Ke.prototype.getLastErrorCode=Ke.prototype.Ia;Ke.prototype.getStatus=Ke.prototype.da;Ke.prototype.getResponseJson=Ke.prototype.Wa;Ke.prototype.getResponseText=Ke.prototype.ja;Ke.prototype.send=Ke.prototype.ha;Ke.prototype.setWithCredentials=Ke.prototype.Oa;Cn.prototype.digest=Cn.prototype.l;Cn.prototype.reset=Cn.prototype.reset;Cn.prototype.update=Cn.prototype.j;Te.prototype.add=Te.prototype.add;Te.prototype.multiply=Te.prototype.R;Te.prototype.modulo=Te.prototype.gb;Te.prototype.compare=Te.prototype.X;Te.prototype.toNumber=Te.prototype.ea;Te.prototype.toString=Te.prototype.toString;Te.prototype.getBits=Te.prototype.D;Te.fromNumber=jn;Te.fromString=e0;var PD=function(){return new bu},OD=function(){return gl()},Nh=ml,MD=vI,LD=rs,Qm={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},FD=ac,xc=wI,VD=Ke,UD=Cn,Ds=Te;const Ym="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ho="9.23.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=new Zu("@firebase/firestore");function wd(){return Xr.logLevel}function BD(t){Xr.setLogLevel(t)}function A(t,...e){if(Xr.logLevel<=de.DEBUG){const n=e.map(op);Xr.debug(`Firestore (${ho}): ${t}`,...n)}}function We(t,...e){if(Xr.logLevel<=de.ERROR){const n=e.map(op);Xr.error(`Firestore (${ho}): ${t}`,...n)}}function kn(t,...e){if(Xr.logLevel<=de.WARN){const n=e.map(op);Xr.warn(`Firestore (${ho}): ${t}`,...n)}}function op(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(t="Unexpected state"){const e=`FIRESTORE (${ho}) INTERNAL ASSERTION FAILED: `+t;throw We(e),new Error(e)}function H(t,e){t||j()}function $D(t,e){t||j()}function V(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends zt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class qD{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(lt.UNAUTHENTICATED))}shutdown(){}}class jD{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class GD{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const i=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let s=new ht;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ht,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{A("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(A("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ht)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(A("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string"),new t0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return H(e===null||typeof e=="string"),new lt(e)}}class zD{constructor(e,n,r){this.h=e,this.l=n,this.m=r,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class KD{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new zD(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class HD{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class WD{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const r=s=>{s.error!=null&&A("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.T;return this.T=s.token,A("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{A("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.I.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.I.getImmediate({optional:!0});s?i(s):A("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(H(typeof n.token=="string"),this.T=n.token,new HD(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QD(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=QD(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function ie(t,e){return t<e?-1:t>e?1:0}function Gs(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}function r0(t){return t+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new b(w.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new b(w.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new b(w.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new b(w.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Be.fromMillis(Date.now())}static fromDate(e){return Be.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Be(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.timestamp=e}static fromTimestamp(e){return new K(e)}static min(){return new K(new Be(0,0))}static max(){return new K(new Be(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,n,r){n===void 0?n=0:n>e.length&&j(),r===void 0?r=e.length-n:r>e.length-n&&j(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Da.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Da?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class fe extends Da{construct(e,n,r){return new fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new b(w.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new fe(n)}static emptyPath(){return new fe([])}}const YD=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Qe extends Da{construct(e,n,r){return new Qe(e,n,r)}static isValidIdentifier(e){return YD.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Qe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Qe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new b(w.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new b(w.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new b(w.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new b(w.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Qe(n)}static emptyPath(){return new Qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(fe.fromString(e))}static fromName(e){return new L(fe.fromString(e).popFirst(5))}static empty(){return new L(fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new fe(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e,n,r,i){this.indexId=e,this.collectionGroup=n,this.fields=r,this.indexState=i}}function _d(t){return t.fields.find(e=>e.kind===2)}function Ei(t){return t.fields.filter(e=>e.kind!==2)}i0.UNKNOWN_ID=-1;class JD{constructor(e,n){this.fieldPath=e,this.kind=n}}class Au{constructor(e,n){this.sequenceNumber=e,this.offset=n}static empty(){return new Au(0,hn.min())}}function s0(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=K.fromTimestamp(r===1e9?new Be(n+1,0):new Be(n,r));return new hn(i,L.empty(),e)}function o0(t){return new hn(t.readTime,t.key,-1)}class hn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new hn(K.min(),L.empty(),-1)}static max(){return new hn(K.max(),L.empty(),-1)}}function ap(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=L.comparator(t.documentKey,e.documentKey),n!==0?n:ie(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class c0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function di(t){if(t.code!==w.FAILED_PRECONDITION||t.message!==a0)throw t;A("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&j(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new y((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof y?n:y.resolve(n)}catch(n){return y.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):y.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):y.reject(n)}static resolve(e){return new y((n,r)=>{n(e)})}static reject(e){return new y((n,r)=>{r(e)})}static waitFor(e){return new y((n,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&n()},c=>r(c))}),o=!0,s===i&&n()})}static or(e){let n=y.resolve(!1);for(const r of e)n=n.next(i=>i?y.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new y((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let c=0;c<s;c++){const u=c;n(e[u]).next(l=>{o[u]=l,++a,a===s&&r(o)},l=>i(l))}})}static doWhile(e,n){return new y((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e,n){this.action=e,this.transaction=n,this.aborted=!1,this.v=new ht,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{n.error?this.v.reject(new na(e,n.error)):this.v.resolve()},this.transaction.onerror=r=>{const i=cp(r.target.error);this.v.reject(new na(e,i))}}static open(e,n,r,i){try{return new Tl(n,e.transaction(i,r))}catch(s){throw new na(n,s)}}get R(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(A("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}P(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const n=this.transaction.objectStore(e);return new ZD(n)}}class _n{constructor(e,n,r){this.name=e,this.version=n,this.V=r,_n.S(qe())===12.2&&We("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return A("SimpleDb","Removing database:",e),bi(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!ma())return!1;if(_n.C())return!0;const e=qe(),n=_n.S(e),r=0<n&&n<10,i=_n.N(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static C(){var e;return typeof process<"u"&&((e=process.env)===null||e===void 0?void 0:e.k)==="YES"}static M(e,n){return e.store(n)}static S(e){const n=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(r)}static N(e){const n=e.match(/Android ([\d.]+)/i),r=n?n[1].split(".").slice(0,2).join("."):"-1";return Number(r)}async $(e){return this.db||(A("SimpleDb","Opening database:",this.name),this.db=await new Promise((n,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;n(o)},i.onblocked=()=>{r(new na(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new b(w.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new b(w.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new na(e,o))},i.onupgradeneeded=s=>{A("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.V.O(o,i.transaction,s.oldVersion,this.version).next(()=>{A("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.F&&(this.db.onversionchange=n=>this.F(n)),this.db}B(e){this.F=e,this.db&&(this.db.onversionchange=n=>e(n))}async runTransaction(e,n,r,i){const s=n==="readonly";let o=0;for(;;){++o;try{this.db=await this.$(e);const a=Tl.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next(u=>(a.P(),u)).catch(u=>(a.abort(u),y.reject(u))).toPromise();return c.catch(()=>{}),await a.R,c}catch(a){const c=a,u=c.name!=="FirebaseError"&&o<3;if(A("SimpleDb","Transaction failed with error:",c.message,"Retrying:",u),this.close(),!u)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}class XD{constructor(e){this.L=e,this.q=!1,this.U=null}get isDone(){return this.q}get K(){return this.U}set cursor(e){this.L=e}done(){this.q=!0}G(e){this.U=e}delete(){return bi(this.L.delete())}}class na extends b{constructor(e,n){super(w.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function fi(t){return t.name==="IndexedDbTransactionError"}class ZD{constructor(e){this.store=e}put(e,n){let r;return n!==void 0?(A("SimpleDb","PUT",this.store.name,e,n),r=this.store.put(n,e)):(A("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),bi(r)}add(e){return A("SimpleDb","ADD",this.store.name,e,e),bi(this.store.add(e))}get(e){return bi(this.store.get(e)).next(n=>(n===void 0&&(n=null),A("SimpleDb","GET",this.store.name,e,n),n))}delete(e){return A("SimpleDb","DELETE",this.store.name,e),bi(this.store.delete(e))}count(){return A("SimpleDb","COUNT",this.store.name),bi(this.store.count())}j(e,n){const r=this.options(e,n);if(r.index||typeof this.store.getAll!="function"){const i=this.cursor(r),s=[];return this.W(i,(o,a)=>{s.push(a)}).next(()=>s)}{const i=this.store.getAll(r.range);return new y((s,o)=>{i.onerror=a=>{o(a.target.error)},i.onsuccess=a=>{s(a.target.result)}})}}H(e,n){const r=this.store.getAll(e,n===null?void 0:n);return new y((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}J(e,n){A("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,n);r.Y=!1;const i=this.cursor(r);return this.W(i,(s,o,a)=>a.delete())}X(e,n){let r;n?r=e:(r={},n=e);const i=this.cursor(r);return this.W(i,n)}Z(e){const n=this.cursor({});return new y((r,i)=>{n.onerror=s=>{const o=cp(s.target.error);i(o)},n.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,n){const r=[];return new y((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new XD(a),u=n(a.primaryKey,a.value,c);if(u instanceof y){const l=u.catch(h=>(c.done(),y.reject(h)));r.push(l)}c.isDone?i():c.K===null?a.continue():a.continue(c.K)}}).next(()=>y.waitFor(r))}options(e,n){let r;return e!==void 0&&(typeof e=="string"?r=e:n=e),{index:r,range:n}}cursor(e){let n="next";if(e.reverse&&(n="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,n):r.openCursor(e.range,n)}return this.store.openCursor(e.range,n)}}function bi(t){return new y((e,n)=>{t.onsuccess=r=>{const i=r.target.result;e(i)},t.onerror=r=>{const i=cp(r.target.error);n(i)}})}let Jm=!1;function cp(t){const e=_n.S(qe());if(e>=12.2&&e<13){const n="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(n)>=0){const r=new b("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Jm||(Jm=!0,setTimeout(()=>{throw r},0)),r}}return t}class eP{constructor(e,n){this.asyncQueue=e,this.tt=n,this.task=null}start(){this.et(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}et(e){A("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{A("IndexBackiller",`Documents written: ${await this.tt.nt()}`)}catch(n){fi(n)?A("IndexBackiller","Ignoring IndexedDB error during index backfill: ",n):await di(n)}await this.et(6e4)})}}class tP{constructor(e,n){this.localStore=e,this.persistence=n}async nt(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",n=>this.st(n,e))}st(e,n){const r=new Set;let i=n,s=!0;return y.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return A("IndexBackiller",`Processing collection: ${o}`),this.it(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>n-i)}it(e,n,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,n).next(i=>this.localStore.localDocuments.getNextDocuments(e,n,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.rt(i,s)).next(a=>(A("IndexBackiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,n,a))).next(()=>o.size)}))}rt(e,n){let r=e;return n.changes.forEach((i,s)=>{const o=o0(s);ap(o,r)>0&&(r=o)}),new hn(r.readTime,r.documentKey,Math.max(n.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>n.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}Jt.ct=-1;function lc(t){return t==null}function Pa(t){return t===0&&1/t==-1/0}function u0(t){return typeof t=="number"&&Number.isInteger(t)&&!Pa(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Xm(e)),e=nP(t.get(n),e);return Xm(e)}function nP(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case"":n+="";break;default:n+=s}}return n}function Xm(t){return t+""}function Gn(t){const e=t.length;if(H(e>=2),e===2)return H(t.charAt(0)===""&&t.charAt(1)===""),fe.emptyPath();const n=e-2,r=[];let i="";for(let s=0;s<e;){const o=t.indexOf("",s);switch((o<0||o>n)&&j(),t.charAt(o+1)){case"":const a=t.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=t.substring(s,o),i+="\0";break;case"":i+=t.substring(s,o+1);break;default:j()}s=o+2}return new fe(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(t,e){return[t,Kt(e)]}function l0(t,e,n){return[t,Kt(e),n]}const rP={},iP=["prefixPath","collectionGroup","readTime","documentId"],sP=["prefixPath","collectionGroup","documentId"],oP=["collectionGroup","readTime","prefixPath","documentId"],aP=["canonicalId","targetId"],cP=["targetId","path"],uP=["path","targetId"],lP=["collectionId","parent"],hP=["indexId","uid"],dP=["uid","sequenceNumber"],fP=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],pP=["indexId","uid","orderedDocumentKey"],gP=["userId","collectionPath","documentId"],mP=["userId","collectionPath","largestBatchId"],yP=["userId","collectionGroup","largestBatchId"],h0=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],vP=[...h0,"documentOverlays"],d0=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],f0=d0,wP=[...f0,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id extends c0{constructor(e,n){super(),this.ht=e,this.currentSequenceNumber=n}}function gt(t,e){const n=V(t);return _n.M(n.ht,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function is(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function p0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,n){this.comparator=e,this.root=n||wt.EMPTY}insert(e,n){return new Ne(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,wt.BLACK,null,null))}remove(e){return new Ne(this.comparator,this.root.remove(e,this.comparator).copy(null,null,wt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Dc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Dc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Dc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Dc(this.root,e,this.comparator,!0)}}class Dc{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class wt{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??wt.RED,this.left=i??wt.EMPTY,this.right=s??wt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new wt(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return wt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return wt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,wt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,wt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw j();const e=this.left.check();if(e!==this.right.check())throw j();return e+(this.isRed()?0:1)}}wt.EMPTY=null,wt.RED=!0,wt.BLACK=!1;wt.EMPTY=new class{constructor(){this.size=0}get key(){throw j()}get value(){throw j()}get color(){throw j()}get left(){throw j()}get right(){throw j()}copy(t,e,n,r,i){return this}insert(t,e,n){return new wt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this.comparator=e,this.data=new Ne(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new ty(this.data.getIterator())}getIteratorFrom(e){return new ty(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Me)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Me(this.comparator);return n.data=e,n}}class ty{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function ds(t){return t.hasNext()?t.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.fields=e,e.sort(Qe.comparator)}static empty(){return new Xt([])}unionWith(e){let n=new Me(Qe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Xt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Gs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _P(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new g0("Invalid base64 string: "+i):i}}(e);return new at(n)}static fromUint8Array(e){const n=function(r){let i="";for(let s=0;s<r.length;++s)i+=String.fromCharCode(r[s]);return i}(e);return new at(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const IP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zr(t){if(H(!!t),typeof t=="string"){let e=0;const n=IP.exec(t);if(H(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ze(t.seconds),nanos:ze(t.nanos)}}function ze(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ei(t){return typeof t=="string"?at.fromBase64String(t):at.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function up(t){const e=t.mapValue.fields.__previous_value__;return Sl(e)?up(e):e}function Oa(t){const e=Zr(t.mapValue.fields.__local_write_time__.timestampValue);return new Be(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EP{constructor(e,n,r,i,s,o,a,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=u}}class ti{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ti("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ti&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Yc={nullValue:"NULL_VALUE"};function Ki(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Sl(t)?4:m0(t)?9007199254740991:10:j()}function Zn(t,e){if(t===e)return!0;const n=Ki(t);if(n!==Ki(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Oa(t).isEqual(Oa(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const s=Zr(r.timestampValue),o=Zr(i.timestampValue);return s.seconds===o.seconds&&s.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,i){return ei(r.bytesValue).isEqual(ei(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,i){return ze(r.geoPointValue.latitude)===ze(i.geoPointValue.latitude)&&ze(r.geoPointValue.longitude)===ze(i.geoPointValue.longitude)}(t,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return ze(r.integerValue)===ze(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const s=ze(r.doubleValue),o=ze(i.doubleValue);return s===o?Pa(s)===Pa(o):isNaN(s)&&isNaN(o)}return!1}(t,e);case 9:return Gs(t.arrayValue.values||[],e.arrayValue.values||[],Zn);case 10:return function(r,i){const s=r.mapValue.fields||{},o=i.mapValue.fields||{};if(ey(s)!==ey(o))return!1;for(const a in s)if(s.hasOwnProperty(a)&&(o[a]===void 0||!Zn(s[a],o[a])))return!1;return!0}(t,e);default:return j()}}function Ma(t,e){return(t.values||[]).find(n=>Zn(n,e))!==void 0}function ni(t,e){if(t===e)return 0;const n=Ki(t),r=Ki(e);if(n!==r)return ie(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ie(t.booleanValue,e.booleanValue);case 2:return function(i,s){const o=ze(i.integerValue||i.doubleValue),a=ze(s.integerValue||s.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return ny(t.timestampValue,e.timestampValue);case 4:return ny(Oa(t),Oa(e));case 5:return ie(t.stringValue,e.stringValue);case 6:return function(i,s){const o=ei(i),a=ei(s);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(i,s){const o=i.split("/"),a=s.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=ie(o[c],a[c]);if(u!==0)return u}return ie(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,s){const o=ie(ze(i.latitude),ze(s.latitude));return o!==0?o:ie(ze(i.longitude),ze(s.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(i,s){const o=i.values||[],a=s.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=ni(o[c],a[c]);if(u)return u}return ie(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(i,s){if(i===Gr.mapValue&&s===Gr.mapValue)return 0;if(i===Gr.mapValue)return 1;if(s===Gr.mapValue)return-1;const o=i.fields||{},a=Object.keys(o),c=s.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=ie(a[l],u[l]);if(h!==0)return h;const d=ni(o[a[l]],c[u[l]]);if(d!==0)return d}return ie(a.length,u.length)}(t.mapValue,e.mapValue);default:throw j()}}function ny(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ie(t,e);const n=Zr(t),r=Zr(e),i=ie(n.seconds,r.seconds);return i!==0?i:ie(n.nanos,r.nanos)}function zs(t){return Ed(t)}function Ed(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const i=Zr(r);return`time(${i.seconds},${i.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?ei(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,L.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let i="[",s=!0;for(const o of r.values||[])s?s=!1:i+=",",i+=Ed(o);return i+"]"}(t.arrayValue):"mapValue"in t?function(r){const i=Object.keys(r.fields||{}).sort();let s="{",o=!0;for(const a of i)o?o=!1:s+=",",s+=`${a}:${Ed(r.fields[a])}`;return s+"}"}(t.mapValue):j();var e,n}function Hi(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function bd(t){return!!t&&"integerValue"in t}function La(t){return!!t&&"arrayValue"in t}function ry(t){return!!t&&"nullValue"in t}function iy(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Jc(t){return!!t&&"mapValue"in t}function ra(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return is(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ra(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ra(t.arrayValue.values[n]);return e}return Object.assign({},t)}function m0(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}function bP(t){return"nullValue"in t?Yc:"booleanValue"in t?{booleanValue:!1}:"integerValue"in t||"doubleValue"in t?{doubleValue:NaN}:"timestampValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in t?{stringValue:""}:"bytesValue"in t?{bytesValue:""}:"referenceValue"in t?Hi(ti.empty(),L.empty()):"geoPointValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in t?{arrayValue:{}}:"mapValue"in t?{mapValue:{}}:j()}function TP(t){return"nullValue"in t?{booleanValue:!1}:"booleanValue"in t?{doubleValue:NaN}:"integerValue"in t||"doubleValue"in t?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in t?{stringValue:""}:"stringValue"in t?{bytesValue:""}:"bytesValue"in t?Hi(ti.empty(),L.empty()):"referenceValue"in t?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in t?{arrayValue:{}}:"arrayValue"in t?{mapValue:{}}:"mapValue"in t?Gr:j()}function sy(t,e){const n=ni(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?-1:!t.inclusive&&e.inclusive?1:0}function oy(t,e){const n=ni(t.value,e.value);return n!==0?n:t.inclusive&&!e.inclusive?1:!t.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.value=e}static empty(){return new It({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Jc(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ra(n)}setAll(e){let n=Qe.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,i),r={},i=[],n=a.popLast()}o?r[a.lastSegment()]=ra(o):i.push(a.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Jc(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Zn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Jc(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){is(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new It(ra(this.value))}}function y0(t){const e=[];return is(t.fields,(n,r)=>{const i=new Qe([n]);if(Jc(r)){const s=y0(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Xt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,n,r,i,s,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Oe(e,0,K.min(),K.min(),K.min(),It.empty(),0)}static newFoundDocument(e,n,r,i){return new Oe(e,1,n,K.min(),r,i,0)}static newNoDocument(e,n){return new Oe(e,2,n,K.min(),K.min(),It.empty(),0)}static newUnknownDocument(e,n){return new Oe(e,3,n,K.min(),K.min(),It.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Oe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Oe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,n){this.position=e,this.inclusive=n}}function ay(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),n.key):r=ni(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function cy(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Zn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,n="asc"){this.field=e,this.dir=n}}function SP(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{}class ce extends v0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new AP(e,n,r):n==="array-contains"?new RP(e,r):n==="in"?new T0(e,r):n==="not-in"?new NP(e,r):n==="array-contains-any"?new xP(e,r):new ce(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new CP(e,r):new kP(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ni(n,this.value)):n!==null&&Ki(this.value)===Ki(n)&&this.matchesComparison(ni(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class be extends v0{constructor(e,n){super(),this.filters=e,this.op=n,this.lt=null}static create(e,n){return new be(e,n)}matches(e){return Ks(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(n=>n.isInequality());return e!==null?e.field:null}ft(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function Ks(t){return t.op==="and"}function Td(t){return t.op==="or"}function lp(t){return w0(t)&&Ks(t)}function w0(t){for(const e of t.filters)if(e instanceof be)return!1;return!0}function Sd(t){if(t instanceof ce)return t.field.canonicalString()+t.op.toString()+zs(t.value);if(lp(t))return t.filters.map(e=>Sd(e)).join(",");{const e=t.filters.map(n=>Sd(n)).join(",");return`${t.op}(${e})`}}function _0(t,e){return t instanceof ce?function(n,r){return r instanceof ce&&n.op===r.op&&n.field.isEqual(r.field)&&Zn(n.value,r.value)}(t,e):t instanceof be?function(n,r){return r instanceof be&&n.op===r.op&&n.filters.length===r.filters.length?n.filters.reduce((i,s,o)=>i&&_0(s,r.filters[o]),!0):!1}(t,e):void j()}function I0(t,e){const n=t.filters.concat(e);return be.create(n,t.op)}function E0(t){return t instanceof ce?function(e){return`${e.field.canonicalString()} ${e.op} ${zs(e.value)}`}(t):t instanceof be?function(e){return e.op.toString()+" {"+e.getFilters().map(E0).join(" ,")+"}"}(t):"Filter"}class AP extends ce{constructor(e,n,r){super(e,n,r),this.key=L.fromName(r.referenceValue)}matches(e){const n=L.comparator(e.key,this.key);return this.matchesComparison(n)}}class CP extends ce{constructor(e,n){super(e,"in",n),this.keys=b0("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class kP extends ce{constructor(e,n){super(e,"not-in",n),this.keys=b0("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function b0(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>L.fromName(r.referenceValue))}class RP extends ce{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return La(n)&&Ma(n.arrayValue,this.value)}}class T0 extends ce{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ma(this.value.arrayValue,n)}}class NP extends ce{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ma(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ma(this.value.arrayValue,n)}}class xP extends ce{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!La(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ma(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DP{constructor(e,n=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.dt=null}}function Ad(t,e=null,n=[],r=[],i=null,s=null,o=null){return new DP(t,e,n,r,i,s,o)}function Wi(t){const e=V(t);if(e.dt===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Sd(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),lc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>zs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>zs(r)).join(",")),e.dt=n}return e.dt}function hc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!SP(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!_0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!cy(t.startAt,e.startAt)&&cy(t.endAt,e.endAt)}function Cu(t){return L.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function ku(t,e){return t.filters.filter(n=>n instanceof ce&&n.field.isEqual(e))}function uy(t,e,n){let r=Yc,i=!0;for(const s of ku(t,e)){let o=Yc,a=!0;switch(s.op){case"<":case"<=":o=bP(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=Yc}sy({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];sy({value:r,inclusive:i},{value:o,inclusive:n.inclusive})<0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}function ly(t,e,n){let r=Gr,i=!0;for(const s of ku(t,e)){let o=Gr,a=!0;switch(s.op){case">=":case">":o=TP(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Gr}oy({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(n!==null){for(let s=0;s<t.orderBy.length;++s)if(t.orderBy[s].field.isEqual(e)){const o=n.position[s];oy({value:r,inclusive:i},{value:o,inclusive:n.inclusive})>0&&(r=o,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,n=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.wt=null,this._t=null,this.startAt,this.endAt}}function S0(t,e,n,r,i,s,o,a){return new Sr(t,e,n,r,i,s,o,a)}function fo(t){return new Sr(t)}function hy(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function hp(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Al(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function dp(t){return t.collectionGroup!==null}function $i(t){const e=V(t);if(e.wt===null){e.wt=[];const n=Al(e),r=hp(e);if(n!==null&&r===null)n.isKeyField()||e.wt.push(new Ps(n)),e.wt.push(new Ps(Qe.keyField(),"asc"));else{let i=!1;for(const s of e.explicitOrderBy)e.wt.push(s),s.field.isKeyField()&&(i=!0);if(!i){const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Ps(Qe.keyField(),s))}}}return e.wt}function en(t){const e=V(t);if(!e._t)if(e.limitType==="F")e._t=Ad(e.path,e.collectionGroup,$i(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const s of $i(e)){const o=s.dir==="desc"?"asc":"desc";n.push(new Ps(s.field,o))}const r=e.endAt?new ri(e.endAt.position,e.endAt.inclusive):null,i=e.startAt?new ri(e.startAt.position,e.startAt.inclusive):null;e._t=Ad(e.path,e.collectionGroup,n,e.filters,e.limit,r,i)}return e._t}function Cd(t,e){e.getFirstInequalityField(),Al(t);const n=t.filters.concat([e]);return new Sr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Ru(t,e,n){return new Sr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function dc(t,e){return hc(en(t),en(e))&&t.limitType===e.limitType}function A0(t){return`${Wi(en(t))}|lt:${t.limitType}`}function kd(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(r=>E0(r)).join(", ")}]`),lc(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(r=>function(i){return`${i.field.canonicalString()} (${i.dir})`}(r)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>zs(r)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>zs(r)).join(",")),`Target(${n})`}(en(t))}; limitType=${t.limitType})`}function fc(t,e){return e.isFoundDocument()&&function(n,r){const i=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):L.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(t,e)&&function(n,r){for(const i of $i(n))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const i of n.filters)if(!i.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!function(i,s,o){const a=ay(i,s,o);return i.inclusive?a<=0:a<0}(n.startAt,$i(n),r)||n.endAt&&!function(i,s,o){const a=ay(i,s,o);return i.inclusive?a>=0:a>0}(n.endAt,$i(n),r))}(t,e)}function C0(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function k0(t){return(e,n)=>{let r=!1;for(const i of $i(t)){const s=PP(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function PP(t,e,n){const r=t.field.isKeyField()?L.comparator(e.key,n.key):function(i,s,o){const a=s.data.field(i),c=o.data.field(i);return a!==null&&c!==null?ni(a,c):j()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return j()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){is(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return p0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OP=new Ne(L.comparator);function Zt(){return OP}const R0=new Ne(L.comparator);function $o(...t){let e=R0;for(const n of t)e=e.insert(n.key,n);return e}function N0(t){let e=R0;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function zn(){return ia()}function x0(){return ia()}function ia(){return new pi(t=>t.toString(),(t,e)=>t.isEqual(e))}const MP=new Ne(L.comparator),LP=new Me(L.comparator);function oe(...t){let e=LP;for(const n of t)e=e.add(n);return e}const FP=new Me(ie);function fp(){return FP}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D0(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Pa(e)?"-0":e}}function P0(t){return{integerValue:""+t}}function O0(t,e){return u0(e)?P0(e):D0(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(){this._=void 0}}function VP(t,e,n){return t instanceof Hs?function(r,i){const s={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Sl(i)&&(i=up(i)),i&&(s.fields.__previous_value__=i),{mapValue:s}}(n,e):t instanceof Qi?L0(t,e):t instanceof Yi?F0(t,e):function(r,i){const s=M0(r,i),o=dy(s)+dy(r.gt);return bd(s)&&bd(r.gt)?P0(o):D0(r.serializer,o)}(t,e)}function UP(t,e,n){return t instanceof Qi?L0(t,e):t instanceof Yi?F0(t,e):n}function M0(t,e){return t instanceof Ws?bd(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class Hs extends Cl{}class Qi extends Cl{constructor(e){super(),this.elements=e}}function L0(t,e){const n=V0(e);for(const r of t.elements)n.some(i=>Zn(i,r))||n.push(r);return{arrayValue:{values:n}}}class Yi extends Cl{constructor(e){super(),this.elements=e}}function F0(t,e){let n=V0(e);for(const r of t.elements)n=n.filter(i=>!Zn(i,r));return{arrayValue:{values:n}}}class Ws extends Cl{constructor(e,n){super(),this.serializer=e,this.gt=n}}function dy(t){return ze(t.integerValue||t.doubleValue)}function V0(t){return La(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,n){this.field=e,this.transform=n}}function BP(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof Qi&&r instanceof Qi||n instanceof Yi&&r instanceof Yi?Gs(n.elements,r.elements,Zn):n instanceof Ws&&r instanceof Ws?Zn(n.gt,r.gt):n instanceof Hs&&r instanceof Hs}(t.transform,e.transform)}class $P{constructor(e,n){this.version=e,this.transformResults=n}}class Ue{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ue}static exists(e){return new Ue(void 0,e)}static updateTime(e){return new Ue(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Xc(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class kl{}function U0(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new go(t.key,Ue.none()):new po(t.key,t.data,Ue.none());{const n=t.data,r=It.empty();let i=new Me(Qe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Ar(t.key,r,new Xt(i.toArray()),Ue.none())}}function qP(t,e,n){t instanceof po?function(r,i,s){const o=r.value.clone(),a=py(r.fieldTransforms,i,s.transformResults);o.setAll(a),i.convertToFoundDocument(s.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Ar?function(r,i,s){if(!Xc(r.precondition,i))return void i.convertToUnknownDocument(s.version);const o=py(r.fieldTransforms,i,s.transformResults),a=i.data;a.setAll(B0(r)),a.setAll(o),i.convertToFoundDocument(s.version,a).setHasCommittedMutations()}(t,e,n):function(r,i,s){i.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,n)}function sa(t,e,n,r){return t instanceof po?function(i,s,o,a){if(!Xc(i.precondition,s))return o;const c=i.value.clone(),u=gy(i.fieldTransforms,a,s);return c.setAll(u),s.convertToFoundDocument(s.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Ar?function(i,s,o,a){if(!Xc(i.precondition,s))return o;const c=gy(i.fieldTransforms,a,s),u=s.data;return u.setAll(B0(i)),u.setAll(c),s.convertToFoundDocument(s.version,u).setHasLocalMutations(),o===null?null:o.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(l=>l.field))}(t,e,n,r):function(i,s,o){return Xc(i.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):o}(t,e,n)}function jP(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=M0(r.transform,i||null);s!=null&&(n===null&&(n=It.empty()),n.set(r.field,s))}return n||null}function fy(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&Gs(n,r,(i,s)=>BP(i,s))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class po extends kl{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ar extends kl{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function B0(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function py(t,e,n){const r=new Map;H(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,UP(o,a,n[i]))}return r}function gy(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,VP(s,o,e))}return r}class go extends kl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pp extends kl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&qP(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=sa(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=sa(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=x0();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=n.has(i.key)?null:a;const c=U0(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(K.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),oe())}isEqual(e){return this.batchId===e.batchId&&Gs(this.mutations,e.mutations,(n,r)=>fy(n,r))&&Gs(this.baseMutations,e.baseMutations,(n,r)=>fy(n,r))}}class mp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){H(e.mutations.length===r.length);let i=MP;const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new mp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GP{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze,he;function $0(t){switch(t){default:return j();case w.CANCELLED:case w.UNKNOWN:case w.DEADLINE_EXCEEDED:case w.RESOURCE_EXHAUSTED:case w.INTERNAL:case w.UNAVAILABLE:case w.UNAUTHENTICATED:return!1;case w.INVALID_ARGUMENT:case w.NOT_FOUND:case w.ALREADY_EXISTS:case w.PERMISSION_DENIED:case w.FAILED_PRECONDITION:case w.ABORTED:case w.OUT_OF_RANGE:case w.UNIMPLEMENTED:case w.DATA_LOSS:return!0}}function q0(t){if(t===void 0)return We("GRPC error has no .code"),w.UNKNOWN;switch(t){case Ze.OK:return w.OK;case Ze.CANCELLED:return w.CANCELLED;case Ze.UNKNOWN:return w.UNKNOWN;case Ze.DEADLINE_EXCEEDED:return w.DEADLINE_EXCEEDED;case Ze.RESOURCE_EXHAUSTED:return w.RESOURCE_EXHAUSTED;case Ze.INTERNAL:return w.INTERNAL;case Ze.UNAVAILABLE:return w.UNAVAILABLE;case Ze.UNAUTHENTICATED:return w.UNAUTHENTICATED;case Ze.INVALID_ARGUMENT:return w.INVALID_ARGUMENT;case Ze.NOT_FOUND:return w.NOT_FOUND;case Ze.ALREADY_EXISTS:return w.ALREADY_EXISTS;case Ze.PERMISSION_DENIED:return w.PERMISSION_DENIED;case Ze.FAILED_PRECONDITION:return w.FAILED_PRECONDITION;case Ze.ABORTED:return w.ABORTED;case Ze.OUT_OF_RANGE:return w.OUT_OF_RANGE;case Ze.UNIMPLEMENTED:return w.UNIMPLEMENTED;case Ze.DATA_LOSS:return w.DATA_LOSS;default:return j()}}(he=Ze||(Ze={}))[he.OK=0]="OK",he[he.CANCELLED=1]="CANCELLED",he[he.UNKNOWN=2]="UNKNOWN",he[he.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",he[he.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",he[he.NOT_FOUND=5]="NOT_FOUND",he[he.ALREADY_EXISTS=6]="ALREADY_EXISTS",he[he.PERMISSION_DENIED=7]="PERMISSION_DENIED",he[he.UNAUTHENTICATED=16]="UNAUTHENTICATED",he[he.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",he[he.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",he[he.ABORTED=10]="ABORTED",he[he.OUT_OF_RANGE=11]="OUT_OF_RANGE",he[he.UNIMPLEMENTED=12]="UNIMPLEMENTED",he[he.INTERNAL=13]="INTERNAL",he[he.UNAVAILABLE=14]="UNAVAILABLE",he[he.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Pc}static getOrCreateInstance(){return Pc===null&&(Pc=new vp),Pc}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let Pc=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j0(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zP=new Ds([4294967295,4294967295],0);function my(t){const e=j0().encode(t),n=new UD;return n.update(e),new Uint8Array(n.digest())}function yy(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ds([n,r],0),new Ds([i,s],0)]}class wp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new qo(`Invalid padding: ${n}`);if(r<0)throw new qo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new qo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new qo(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*e.length-n,this.Tt=Ds.fromNumber(this.It)}Et(e,n,r){let i=e.add(n.multiply(Ds.fromNumber(r)));return i.compare(zP)===1&&(i=new Ds([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const n=my(e),[r,i]=yy(n);for(let s=0;s<this.hashCount;s++){const o=this.Et(r,i,s);if(!this.At(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new wp(s,i,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const n=my(e),[r,i]=yy(n);for(let s=0;s<this.hashCount;s++){const o=this.Et(r,i,s);this.Rt(o)}}Rt(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class qo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,mc.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new gc(K.min(),i,new Ne(ie),Zt(),oe())}}class mc{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new mc(r,n,oe(),oe(),oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,n,r,i){this.Pt=e,this.removedTargetIds=n,this.key=r,this.bt=i}}class G0{constructor(e,n){this.targetId=e,this.Vt=n}}class z0{constructor(e,n,r=at.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class vy{constructor(){this.St=0,this.Dt=_y(),this.Ct=at.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=oe(),n=oe(),r=oe();return this.Dt.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:j()}}),new mc(this.Ct,this.xt,e,n,r)}Ft(){this.Nt=!1,this.Dt=_y()}Bt(e,n){this.Nt=!0,this.Dt=this.Dt.insert(e,n)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class KP{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=Zt(),this.zt=wy(),this.Wt=new Ne(ie)}Ht(e){for(const n of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(n,e.bt):this.Yt(n,e.key,e.bt);for(const n of e.removedTargetIds)this.Yt(n,e.key,e.bt)}Xt(e){this.forEachTarget(e,n=>{const r=this.Zt(n);switch(e.state){case 0:this.te(n)&&r.$t(e.resumeToken);break;case 1:r.Ut(),r.kt||r.Ft(),r.$t(e.resumeToken);break;case 2:r.Ut(),r.kt||this.removeTarget(n);break;case 3:this.te(n)&&(r.Kt(),r.$t(e.resumeToken));break;case 4:this.te(n)&&(this.ee(n),r.$t(e.resumeToken));break;default:j()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Qt.forEach((r,i)=>{this.te(i)&&n(i)})}ne(e){var n;const r=e.targetId,i=e.Vt.count,s=this.se(r);if(s){const o=s.target;if(Cu(o))if(i===0){const a=new L(o.path);this.Yt(r,a,Oe.newNoDocument(a,K.min()))}else H(i===1);else{const a=this.ie(r);if(a!==i){const c=this.re(e,a);if(c!==0){this.ee(r);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(r,u)}(n=vp.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(u,l,h){var d,f,m,_,T,D;const O={localCacheCount:l,existenceFilterCount:h.count},N=h.unchangedNames;return N&&(O.bloomFilter={applied:u===0,hashCount:(d=N==null?void 0:N.hashCount)!==null&&d!==void 0?d:0,bitmapLength:(_=(m=(f=N==null?void 0:N.bits)===null||f===void 0?void 0:f.bitmap)===null||m===void 0?void 0:m.length)!==null&&_!==void 0?_:0,padding:(D=(T=N==null?void 0:N.bits)===null||T===void 0?void 0:T.padding)!==null&&D!==void 0?D:0}),O}(c,a,e.Vt))}}}}re(e,n){const{unchangedNames:r,count:i}=e.Vt;if(!r||!r.bits)return 1;const{bits:{bitmap:s="",padding:o=0},hashCount:a=0}=r;let c,u;try{c=ei(s).toUint8Array()}catch(l){if(l instanceof g0)return kn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw l}try{u=new wp(c,o,a)}catch(l){return kn(l instanceof qo?"BloomFilter error: ":"Applying bloom filter failed: ",l),1}return u.It===0?1:i!==n-this.oe(e.targetId,u)?2:0}oe(e,n){const r=this.Gt.getRemoteKeysForTarget(e);let i=0;return r.forEach(s=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;n.vt(a)||(this.Yt(e,s,null),i++)}),i}ce(e){const n=new Map;this.Qt.forEach((s,o)=>{const a=this.se(o);if(a){if(s.current&&Cu(a.target)){const c=new L(a.target.path);this.jt.get(c)!==null||this.ae(o,c)||this.Yt(o,c,Oe.newNoDocument(c,e))}s.Mt&&(n.set(o,s.Ot()),s.Ft())}});let r=oe();this.zt.forEach((s,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.se(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.jt.forEach((s,o)=>o.setReadTime(e));const i=new gc(e,n,this.Wt,this.jt,r);return this.jt=Zt(),this.zt=wy(),this.Wt=new Ne(ie),i}Jt(e,n){if(!this.te(e))return;const r=this.ae(e,n.key)?2:0;this.Zt(e).Bt(n.key,r),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(e))}Yt(e,n,r){if(!this.te(e))return;const i=this.Zt(e);this.ae(e,n)?i.Bt(n,1):i.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(e)),r&&(this.jt=this.jt.insert(n,r))}removeTarget(e){this.Qt.delete(e)}ie(e){const n=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let n=this.Qt.get(e);return n||(n=new vy,this.Qt.set(e,n)),n}he(e){let n=this.zt.get(e);return n||(n=new Me(ie),this.zt=this.zt.insert(e,n)),n}te(e){const n=this.se(e)!==null;return n||A("WatchChangeAggregator","Detected inactive target",e),n}se(e){const n=this.Qt.get(e);return n&&n.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new vy),this.Gt.getRemoteKeysForTarget(e).forEach(n=>{this.Yt(e,n,null)})}ae(e,n){return this.Gt.getRemoteKeysForTarget(e).has(n)}}function wy(){return new Ne(L.comparator)}function _y(){return new Ne(L.comparator)}const HP=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),WP=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),QP=(()=>({and:"AND",or:"OR"}))();class YP{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Rd(t,e){return t.useProto3Json||lc(e)?e:{value:e}}function Qs(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function K0(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function JP(t,e){return Qs(t,e.toTimestamp())}function Ye(t){return H(!!t),K.fromTimestamp(function(e){const n=Zr(e);return new Be(n.seconds,n.nanos)}(t))}function _p(t,e){return function(n){return new fe(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function H0(t){const e=fe.fromString(t);return H(nE(e)),e}function Fa(t,e){return _p(t.databaseId,e.path)}function Wn(t,e){const n=H0(e);if(n.get(1)!==t.databaseId.projectId)throw new b(w.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new b(w.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new L(Q0(n))}function Nd(t,e){return _p(t.databaseId,e)}function W0(t){const e=H0(t);return e.length===4?fe.emptyPath():Q0(e)}function Va(t){return new fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Q0(t){return H(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Iy(t,e,n){return{name:Fa(t,e),fields:n.value.mapValue.fields}}function Y0(t,e,n){const r=Wn(t,e.name),i=Ye(e.updateTime),s=e.createTime?Ye(e.createTime):K.min(),o=new It({mapValue:{fields:e.fields}}),a=Oe.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function XP(t,e){return"found"in e?function(n,r){H(!!r.found),r.found.name,r.found.updateTime;const i=Wn(n,r.found.name),s=Ye(r.found.updateTime),o=r.found.createTime?Ye(r.found.createTime):K.min(),a=new It({mapValue:{fields:r.found.fields}});return Oe.newFoundDocument(i,s,o,a)}(t,e):"missing"in e?function(n,r){H(!!r.missing),H(!!r.readTime);const i=Wn(n,r.missing),s=Ye(r.readTime);return Oe.newNoDocument(i,s)}(t,e):j()}function ZP(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:j()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,u){return c.useProto3Json?(H(u===void 0||typeof u=="string"),at.fromBase64String(u||"")):(H(u===void 0||u instanceof Uint8Array),at.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?w.UNKNOWN:q0(c.code);return new b(u,c.message||"")}(o);n=new z0(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(t,r.document.name),s=Ye(r.document.updateTime),o=r.document.createTime?Ye(r.document.createTime):K.min(),a=new It({mapValue:{fields:r.document.fields}}),c=Oe.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new Zc(u,l,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(t,r.document),s=r.readTime?Ye(r.readTime):K.min(),o=Oe.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Zc([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(t,r.document),s=r.removedTargetIds||[];n=new Zc([],s,i,null)}else{if(!("filter"in e))return j();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new GP(i,s),a=r.targetId;n=new G0(a,o)}}return n}function Ua(t,e){let n;if(e instanceof po)n={update:Iy(t,e.key,e.value)};else if(e instanceof go)n={delete:Fa(t,e.key)};else if(e instanceof Ar)n={update:Iy(t,e.key,e.data),updateMask:sO(e.fieldMask)};else{if(!(e instanceof pp))return j();n={verify:Fa(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,s){const o=s.transform;if(o instanceof Hs)return{fieldPath:s.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Qi)return{fieldPath:s.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Yi)return{fieldPath:s.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Ws)return{fieldPath:s.field.canonicalString(),increment:o.gt};throw j()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:JP(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j()}(t,e.precondition)),n}function xd(t,e){const n=e.currentDocument?function(i){return i.updateTime!==void 0?Ue.updateTime(Ye(i.updateTime)):i.exists!==void 0?Ue.exists(i.exists):Ue.none()}(e.currentDocument):Ue.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(s,o){let a=null;if("setToServerValue"in o)H(o.setToServerValue==="REQUEST_TIME"),a=new Hs;else if("appendMissingElements"in o){const u=o.appendMissingElements.values||[];a=new Qi(u)}else if("removeAllFromArray"in o){const u=o.removeAllFromArray.values||[];a=new Yi(u)}else"increment"in o?a=new Ws(s,o.increment):j();const c=Qe.fromServerFormat(o.fieldPath);return new pc(c,a)}(t,i)):[];if(e.update){e.update.name;const i=Wn(t,e.update.name),s=new It({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(a){const c=a.fieldPaths||[];return new Xt(c.map(u=>Qe.fromServerFormat(u)))}(e.updateMask);return new Ar(i,s,o,n,r)}return new po(i,s,n,r)}if(e.delete){const i=Wn(t,e.delete);return new go(i,n)}if(e.verify){const i=Wn(t,e.verify);return new pp(i,n)}return j()}function eO(t,e){return t&&t.length>0?(H(e!==void 0),t.map(n=>function(r,i){let s=r.updateTime?Ye(r.updateTime):Ye(i);return s.isEqual(K.min())&&(s=Ye(i)),new $P(s,r.transformResults||[])}(n,e))):[]}function J0(t,e){return{documents:[Nd(t,e.path)]}}function X0(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=Nd(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Nd(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(c){if(c.length!==0)return tE(be.create(c,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const s=function(c){if(c.length!==0)return c.map(u=>function(l){return{field:ys(l.field),direction:nO(l.dir)}}(u))}(e.orderBy);s&&(n.structuredQuery.orderBy=s);const o=Rd(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function Z0(t){let e=W0(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){H(r===1);const l=n.from[0];l.allDescendants?i=l.collectionId:e=e.child(l.collectionId)}let s=[];n.where&&(s=function(l){const h=eE(l);return h instanceof be&&lp(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(l=>function(h){return new Ps(vs(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;n.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,lc(h)?null:h}(n.limit));let c=null;n.startAt&&(c=function(l){const h=!!l.before,d=l.values||[];return new ri(d,h)}(n.startAt));let u=null;return n.endAt&&(u=function(l){const h=!l.before,d=l.values||[];return new ri(d,h)}(n.endAt)),S0(e,i,o,s,a,"F",c,u)}function tO(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function eE(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=vs(e.unaryFilter.field);return ce.create(n,"==",{doubleValue:NaN});case"IS_NULL":const r=vs(e.unaryFilter.field);return ce.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=vs(e.unaryFilter.field);return ce.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=vs(e.unaryFilter.field);return ce.create(s,"!=",{nullValue:"NULL_VALUE"});default:return j()}}(t):t.fieldFilter!==void 0?function(e){return ce.create(vs(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return j()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return be.create(e.compositeFilter.filters.map(n=>eE(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return j()}}(e.compositeFilter.op))}(t):j()}function nO(t){return HP[t]}function rO(t){return WP[t]}function iO(t){return QP[t]}function ys(t){return{fieldPath:t.canonicalString()}}function vs(t){return Qe.fromServerFormat(t.fieldPath)}function tE(t){return t instanceof ce?function(e){if(e.op==="=="){if(iy(e.value))return{unaryFilter:{field:ys(e.field),op:"IS_NAN"}};if(ry(e.value))return{unaryFilter:{field:ys(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(iy(e.value))return{unaryFilter:{field:ys(e.field),op:"IS_NOT_NAN"}};if(ry(e.value))return{unaryFilter:{field:ys(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ys(e.field),op:rO(e.op),value:e.value}}}(t):t instanceof be?function(e){const n=e.getFilters().map(r=>tE(r));return n.length===1?n[0]:{compositeFilter:{op:iO(e.op),filters:n}}}(t):j()}function sO(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function nE(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,n,r,i,s=K.min(),o=K.min(),a=at.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new hr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new hr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new hr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new hr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e){this.fe=e}}function oO(t,e){let n;if(e.document)n=Y0(t.fe,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),i=Xi(e.noDocument.readTime);n=Oe.newNoDocument(r,i),e.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!e.unknownDocument)return j();{const r=L.fromSegments(e.unknownDocument.path),i=Xi(e.unknownDocument.version);n=Oe.newUnknownDocument(r,i)}}return e.readTime&&n.setReadTime(function(r){const i=new Be(r[0],r[1]);return K.fromTimestamp(i)}(e.readTime)),n}function Ey(t,e){const n=e.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Nu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,s){return{name:Fa(i,s.key),fields:s.data.value.mapValue.fields,updateTime:Qs(i,s.version.toTimestamp()),createTime:Qs(i,s.createTime.toTimestamp())}}(t.fe,e);else if(e.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Ji(e.version)};else{if(!e.isUnknownDocument())return j();r.unknownDocument={path:n.path.toArray(),version:Ji(e.version)}}return r}function Nu(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ji(t){const e=t.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Xi(t){const e=new Be(t.seconds,t.nanoseconds);return K.fromTimestamp(e)}function Ti(t,e){const n=(e.baseMutations||[]).map(s=>xd(t.fe,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>xd(t.fe,s)),i=Be.fromMillis(e.localWriteTimeMs);return new gp(e.batchId,i,n,r)}function jo(t){const e=Xi(t.readTime),n=t.lastLimboFreeSnapshotVersion!==void 0?Xi(t.lastLimboFreeSnapshotVersion):K.min();let r;var i;return t.query.documents!==void 0?(H((i=t.query).documents.length===1),r=en(fo(W0(i.documents[0])))):r=function(s){return en(Z0(s))}(t.query),new hr(r,t.targetId,"TargetPurposeListen",t.lastListenSequenceNumber,e,n,at.fromBase64String(t.resumeToken))}function iE(t,e){const n=Ji(e.snapshotVersion),r=Ji(e.lastLimboFreeSnapshotVersion);let i;i=Cu(e.target)?J0(t.fe,e.target):X0(t.fe,e.target);const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Wi(e.target),readTime:n,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Ip(t){const e=Z0({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Ru(e,e.limit,"L"):e}function xh(t,e){return new yp(e.largestBatchId,xd(t.fe,e.overlayMutation))}function by(t,e){const n=e.path.lastSegment();return[t,Kt(e.path.popLast()),n]}function Ty(t,e,n,r){return{indexId:t,uid:e.uid||"",sequenceNumber:n,readTime:Ji(r.readTime),documentKey:Kt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aO{getBundleMetadata(e,n){return Sy(e).get(n).next(r=>{if(r)return{id:(i=r).bundleId,createTime:Xi(i.createTime),version:i.version};var i})}saveBundleMetadata(e,n){return Sy(e).put({bundleId:(r=n).id,createTime:Ji(Ye(r.createTime)),version:r.version});var r}getNamedQuery(e,n){return Ay(e).get(n).next(r=>{if(r)return{name:(i=r).name,query:Ip(i.bundledQuery),readTime:Xi(i.readTime)};var i})}saveNamedQuery(e,n){return Ay(e).put(function(r){return{name:r.name,readTime:Ji(Ye(r.readTime)),bundledQuery:r.bundledQuery}}(n))}}function Sy(t){return gt(t,"bundles")}function Ay(t){return gt(t,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,n){this.serializer=e,this.userId=n}static de(e,n){const r=n.uid||"";return new Rl(e,r)}getOverlay(e,n){return No(e).get(by(this.userId,n)).next(r=>r?xh(this.serializer,r):null)}getOverlays(e,n){const r=zn();return y.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){const i=[];return r.forEach((s,o)=>{const a=new yp(n,o);i.push(this.we(e,a))}),y.waitFor(i)}removeOverlaysForBatchId(e,n,r){const i=new Set;n.forEach(o=>i.add(Kt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(No(e).J("collectionPathOverlayIndex",a))}),y.waitFor(s)}getOverlaysForCollection(e,n,r){const i=zn(),s=Kt(n),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return No(e).j("collectionPathOverlayIndex",o).next(a=>{for(const c of a){const u=xh(this.serializer,c);i.set(u.getKey(),u)}return i})}getOverlaysForCollectionGroup(e,n,r,i){const s=zn();let o;const a=IDBKeyRange.bound([this.userId,n,r],[this.userId,n,Number.POSITIVE_INFINITY],!0);return No(e).X({index:"collectionGroupOverlayIndex",range:a},(c,u,l)=>{const h=xh(this.serializer,u);s.size()<i||h.largestBatchId===o?(s.set(h.getKey(),h),o=h.largestBatchId):l.done()}).next(()=>s)}we(e,n){return No(e).put(function(r,i,s){const[o,a,c]=by(i,s.mutation.key);return{userId:i,collectionPath:a,documentId:c,collectionGroup:s.mutation.key.getCollectionGroup(),largestBatchId:s.largestBatchId,overlayMutation:Ua(r.fe,s.mutation)}}(this.serializer,this.userId,n))}}function No(t){return gt(t,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(){}_e(e,n){this.me(e,n),n.ge()}me(e,n){if("nullValue"in e)this.ye(n,5);else if("booleanValue"in e)this.ye(n,10),n.pe(e.booleanValue?1:0);else if("integerValue"in e)this.ye(n,15),n.pe(ze(e.integerValue));else if("doubleValue"in e){const r=ze(e.doubleValue);isNaN(r)?this.ye(n,13):(this.ye(n,15),Pa(r)?n.pe(0):n.pe(r))}else if("timestampValue"in e){const r=e.timestampValue;this.ye(n,20),typeof r=="string"?n.Ie(r):(n.Ie(`${r.seconds||""}`),n.pe(r.nanos||0))}else if("stringValue"in e)this.Te(e.stringValue,n),this.Ee(n);else if("bytesValue"in e)this.ye(n,30),n.Ae(ei(e.bytesValue)),this.Ee(n);else if("referenceValue"in e)this.ve(e.referenceValue,n);else if("geoPointValue"in e){const r=e.geoPointValue;this.ye(n,45),n.pe(r.latitude||0),n.pe(r.longitude||0)}else"mapValue"in e?m0(e)?this.ye(n,Number.MAX_SAFE_INTEGER):(this.Re(e.mapValue,n),this.Ee(n)):"arrayValue"in e?(this.Pe(e.arrayValue,n),this.Ee(n)):j()}Te(e,n){this.ye(n,25),this.be(e,n)}be(e,n){n.Ie(e)}Re(e,n){const r=e.fields||{};this.ye(n,55);for(const i of Object.keys(r))this.Te(i,n),this.me(r[i],n)}Pe(e,n){const r=e.values||[];this.ye(n,50);for(const i of r)this.me(i,n)}ve(e,n){this.ye(n,37),L.fromName(e).path.forEach(r=>{this.ye(n,60),this.be(r,n)})}ye(e,n){e.pe(n)}Ee(e){e.pe(2)}}Si.Ve=new Si;function cO(t){if(t===0)return 8;let e=0;return!(t>>4)&&(e+=4,t<<=4),!(t>>6)&&(e+=2,t<<=2),!(t>>7)&&(e+=1),e}function Cy(t){const e=64-function(n){let r=0;for(let i=0;i<8;++i){const s=cO(255&n[i]);if(r+=s,s!==8)break}return r}(t);return Math.ceil(e/8)}class uO{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Se(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.De(r.value),r=n.next();this.Ce()}xe(e){const n=e[Symbol.iterator]();let r=n.next();for(;!r.done;)this.Ne(r.value),r=n.next();this.ke()}Me(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.De(r);else if(r<2048)this.De(960|r>>>6),this.De(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.De(480|r>>>12),this.De(128|63&r>>>6),this.De(128|63&r);else{const i=n.codePointAt(0);this.De(240|i>>>18),this.De(128|63&i>>>12),this.De(128|63&i>>>6),this.De(128|63&i)}}this.Ce()}$e(e){for(const n of e){const r=n.charCodeAt(0);if(r<128)this.Ne(r);else if(r<2048)this.Ne(960|r>>>6),this.Ne(128|63&r);else if(n<"\uD800"||"\uDBFF"<n)this.Ne(480|r>>>12),this.Ne(128|63&r>>>6),this.Ne(128|63&r);else{const i=n.codePointAt(0);this.Ne(240|i>>>18),this.Ne(128|63&i>>>12),this.Ne(128|63&i>>>6),this.Ne(128|63&i)}}this.ke()}Oe(e){const n=this.Fe(e),r=Cy(n);this.Be(1+r),this.buffer[this.position++]=255&r;for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=255&n[i]}Le(e){const n=this.Fe(e),r=Cy(n);this.Be(1+r),this.buffer[this.position++]=~(255&r);for(let i=n.length-r;i<n.length;++i)this.buffer[this.position++]=~(255&n[i])}qe(){this.Ue(255),this.Ue(255)}Ke(){this.Ge(255),this.Ge(255)}reset(){this.position=0}seed(e){this.Be(e.length),this.buffer.set(e,this.position),this.position+=e.length}Qe(){return this.buffer.slice(0,this.position)}Fe(e){const n=function(i){const s=new DataView(new ArrayBuffer(8));return s.setFloat64(0,i,!1),new Uint8Array(s.buffer)}(e),r=(128&n[0])!=0;n[0]^=r?255:128;for(let i=1;i<n.length;++i)n[i]^=r?255:0;return n}De(e){const n=255&e;n===0?(this.Ue(0),this.Ue(255)):n===255?(this.Ue(255),this.Ue(0)):this.Ue(n)}Ne(e){const n=255&e;n===0?(this.Ge(0),this.Ge(255)):n===255?(this.Ge(255),this.Ge(0)):this.Ge(e)}Ce(){this.Ue(0),this.Ue(1)}ke(){this.Ge(0),this.Ge(1)}Ue(e){this.Be(1),this.buffer[this.position++]=e}Ge(e){this.Be(1),this.buffer[this.position++]=~e}Be(e){const n=e+this.position;if(n<=this.buffer.length)return;let r=2*this.buffer.length;r<n&&(r=n);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class lO{constructor(e){this.je=e}Ae(e){this.je.Se(e)}Ie(e){this.je.Me(e)}pe(e){this.je.Oe(e)}ge(){this.je.qe()}}class hO{constructor(e){this.je=e}Ae(e){this.je.xe(e)}Ie(e){this.je.$e(e)}pe(e){this.je.Le(e)}ge(){this.je.Ke()}}class xo{constructor(){this.je=new uO,this.ze=new lO(this.je),this.We=new hO(this.je)}seed(e){this.je.seed(e)}He(e){return e===0?this.ze:this.We}Qe(){return this.je.Qe()}reset(){this.je.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,n,r,i){this.indexId=e,this.documentKey=n,this.arrayValue=r,this.directionalValue=i}Je(){const e=this.directionalValue.length,n=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(n);return r.set(this.directionalValue,0),n!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Ai(this.indexId,this.documentKey,this.arrayValue,r)}}function xr(t,e){let n=t.indexId-e.indexId;return n!==0?n:(n=ky(t.arrayValue,e.arrayValue),n!==0?n:(n=ky(t.directionalValue,e.directionalValue),n!==0?n:L.comparator(t.documentKey,e.documentKey)))}function ky(t,e){for(let n=0;n<t.length&&n<e.length;++n){const r=t[n]-e[n];if(r!==0)return r}return t.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dO{constructor(e){this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.Ye=e.orderBy,this.Xe=[];for(const n of e.filters){const r=n;r.isInequality()?this.Ze=r:this.Xe.push(r)}}tn(e){H(e.collectionGroup===this.collectionId);const n=_d(e);if(n!==void 0&&!this.en(n))return!1;const r=Ei(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.en(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Ze!==void 0){if(!i.has(this.Ze.field.canonicalString())){const a=r[s];if(!this.nn(this.Ze,a)||!this.sn(this.Ye[o++],a))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.Ye.length||!this.sn(this.Ye[o++],a))return!1}return!0}en(e){for(const n of this.Xe)if(this.nn(n,e))return!0;return!1}nn(e,n){if(e===void 0||!e.field.isEqual(n.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return n.kind===2===r}sn(e,n){return!!e.field.isEqual(n.fieldPath)&&(n.kind===0&&e.dir==="asc"||n.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(t){var e,n;if(H(t instanceof ce||t instanceof be),t instanceof ce){if(t instanceof T0){const i=((n=(e=t.value.arrayValue)===null||e===void 0?void 0:e.values)===null||n===void 0?void 0:n.map(s=>ce.create(t.field,"==",s)))||[];return be.create(i,"or")}return t}const r=t.filters.map(i=>sE(i));return be.create(r,t.op)}function fO(t){if(t.getFilters().length===0)return[];const e=Od(sE(t));return H(oE(e)),Dd(e)||Pd(e)?[e]:e.getFilters()}function Dd(t){return t instanceof ce}function Pd(t){return t instanceof be&&lp(t)}function oE(t){return Dd(t)||Pd(t)||function(e){if(e instanceof be&&Td(e)){for(const n of e.getFilters())if(!Dd(n)&&!Pd(n))return!1;return!0}return!1}(t)}function Od(t){if(H(t instanceof ce||t instanceof be),t instanceof ce)return t;if(t.filters.length===1)return Od(t.filters[0]);const e=t.filters.map(r=>Od(r));let n=be.create(e,t.op);return n=xu(n),oE(n)?n:(H(n instanceof be),H(Ks(n)),H(n.filters.length>1),n.filters.reduce((r,i)=>Ep(r,i)))}function Ep(t,e){let n;return H(t instanceof ce||t instanceof be),H(e instanceof ce||e instanceof be),n=t instanceof ce?e instanceof ce?function(r,i){return be.create([r,i],"and")}(t,e):Ry(t,e):e instanceof ce?Ry(e,t):function(r,i){if(H(r.filters.length>0&&i.filters.length>0),Ks(r)&&Ks(i))return I0(r,i.getFilters());const s=Td(r)?r:i,o=Td(r)?i:r,a=s.filters.map(c=>Ep(c,o));return be.create(a,"or")}(t,e),xu(n)}function Ry(t,e){if(Ks(e))return I0(e,t.getFilters());{const n=e.filters.map(r=>Ep(t,r));return be.create(n,"or")}}function xu(t){if(H(t instanceof ce||t instanceof be),t instanceof ce)return t;const e=t.getFilters();if(e.length===1)return xu(e[0]);if(w0(t))return t;const n=e.map(i=>xu(i)),r=[];return n.forEach(i=>{i instanceof ce?r.push(i):i instanceof be&&(i.op===t.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:be.create(r,t.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pO{constructor(){this.rn=new bp}addToCollectionParentIndex(e,n){return this.rn.add(n),y.resolve()}getCollectionParents(e,n){return y.resolve(this.rn.getEntries(n))}addFieldIndex(e,n){return y.resolve()}deleteFieldIndex(e,n){return y.resolve()}getDocumentsMatchingTarget(e,n){return y.resolve(null)}getIndexType(e,n){return y.resolve(0)}getFieldIndexes(e,n){return y.resolve([])}getNextCollectionGroupToUpdate(e){return y.resolve(null)}getMinOffset(e,n){return y.resolve(hn.min())}getMinOffsetFromCollectionGroup(e,n){return y.resolve(hn.min())}updateCollectionGroup(e,n,r){return y.resolve()}updateIndexEntries(e,n){return y.resolve()}}class bp{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Me(fe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Me(fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc=new Uint8Array(0);class gO{constructor(e,n){this.user=e,this.databaseId=n,this.on=new bp,this.un=new pi(r=>Wi(r),(r,i)=>hc(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,n){if(!this.on.has(n)){const r=n.lastSegment(),i=n.popLast();e.addOnCommittedListener(()=>{this.on.add(n)});const s={collectionId:r,parent:Kt(i)};return Ny(e).put(s)}return y.resolve()}getCollectionParents(e,n){const r=[],i=IDBKeyRange.bound([n,""],[r0(n),""],!1,!0);return Ny(e).j(i).next(s=>{for(const o of s){if(o.collectionId!==n)break;r.push(Gn(o.parent))}return r})}addFieldIndex(e,n){const r=Mc(e),i=function(o){return{indexId:o.indexId,collectionGroup:o.collectionGroup,fields:o.fields.map(a=>[a.fieldPath.canonicalString(),a.kind])}}(n);delete i.indexId;const s=r.add(i);if(n.indexState){const o=Po(e);return s.next(a=>{o.put(Ty(a,this.user,n.indexState.sequenceNumber,n.indexState.offset))})}return s.next()}deleteFieldIndex(e,n){const r=Mc(e),i=Po(e),s=Do(e);return r.delete(n.indexId).next(()=>i.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([n.indexId],[n.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,n){const r=Do(e);let i=!0;const s=new Map;return y.forEach(this.cn(n),o=>this.an(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=oe();const a=[];return y.forEach(s,(c,u)=>{var l;A("IndexedDbIndexManager",`Using index ${l=c,`id=${l.indexId}|cg=${l.collectionGroup}|f=${l.fields.map(N=>`${N.fieldPath}:${N.kind}`).join(",")}`} to execute ${Wi(n)}`);const h=function(N,P){const W=_d(P);if(W===void 0)return null;for(const Z of ku(N,W.fieldPath))switch(Z.op){case"array-contains-any":return Z.value.arrayValue.values||[];case"array-contains":return[Z.value]}return null}(u,c),d=function(N,P){const W=new Map;for(const Z of Ei(P))for(const J of ku(N,Z.fieldPath))switch(J.op){case"==":case"in":W.set(Z.fieldPath.canonicalString(),J.value);break;case"not-in":case"!=":return W.set(Z.fieldPath.canonicalString(),J.value),Array.from(W.values())}return null}(u,c),f=function(N,P){const W=[];let Z=!0;for(const J of Ei(P)){const ye=J.kind===0?uy(N,J.fieldPath,N.startAt):ly(N,J.fieldPath,N.startAt);W.push(ye.value),Z&&(Z=ye.inclusive)}return new ri(W,Z)}(u,c),m=function(N,P){const W=[];let Z=!0;for(const J of Ei(P)){const ye=J.kind===0?ly(N,J.fieldPath,N.endAt):uy(N,J.fieldPath,N.endAt);W.push(ye.value),Z&&(Z=ye.inclusive)}return new ri(W,Z)}(u,c),_=this.hn(c,u,f),T=this.hn(c,u,m),D=this.ln(c,u,d),O=this.fn(c.indexId,h,_,f.inclusive,T,m.inclusive,D);return y.forEach(O,N=>r.H(N,n.limit).next(P=>{P.forEach(W=>{const Z=L.fromSegments(W.documentKey);o.has(Z)||(o=o.add(Z),a.push(Z))})}))}).next(()=>a)}return y.resolve(null)})}cn(e){let n=this.un.get(e);return n||(e.filters.length===0?n=[e]:n=fO(be.create(e.filters,"and")).map(r=>Ad(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.un.set(e,n),n)}fn(e,n,r,i,s,o,a){const c=(n!=null?n.length:1)*Math.max(r.length,s.length),u=c/(n!=null?n.length:1),l=[];for(let h=0;h<c;++h){const d=n?this.dn(n[h/u]):Oc,f=this.wn(e,d,r[h%u],i),m=this._n(e,d,s[h%u],o),_=a.map(T=>this.wn(e,d,T,!0));l.push(...this.createRange(f,m,_))}return l}wn(e,n,r,i){const s=new Ai(e,L.empty(),n,r);return i?s:s.Je()}_n(e,n,r,i){const s=new Ai(e,L.empty(),n,r);return i?s.Je():s}an(e,n){const r=new dO(n),i=n.collectionGroup!=null?n.collectionGroup:n.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.tn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,n){let r=2;const i=this.cn(n);return y.forEach(i,s=>this.an(e,s).next(o=>{o?r!==0&&o.fields.length<function(a){let c=new Me(Qe.comparator),u=!1;for(const l of a.filters)for(const h of l.getFlattenedFilters())h.field.isKeyField()||(h.op==="array-contains"||h.op==="array-contains-any"?u=!0:c=c.add(h.field));for(const l of a.orderBy)l.field.isKeyField()||(c=c.add(l.field));return c.size+(u?1:0)}(s)&&(r=1):r=0})).next(()=>function(s){return s.limit!==null}(n)&&i.length>1&&r===2?1:r)}mn(e,n){const r=new xo;for(const i of Ei(e)){const s=n.data.field(i.fieldPath);if(s==null)return null;const o=r.He(i.kind);Si.Ve._e(s,o)}return r.Qe()}dn(e){const n=new xo;return Si.Ve._e(e,n.He(0)),n.Qe()}gn(e,n){const r=new xo;return Si.Ve._e(Hi(this.databaseId,n),r.He(function(i){const s=Ei(i);return s.length===0?0:s[s.length-1].kind}(e))),r.Qe()}ln(e,n,r){if(r===null)return[];let i=[];i.push(new xo);let s=0;for(const o of Ei(e)){const a=r[s++];for(const c of i)if(this.yn(n,o.fieldPath)&&La(a))i=this.pn(i,o,a);else{const u=c.He(o.kind);Si.Ve._e(a,u)}}return this.In(i)}hn(e,n,r){return this.ln(e,n,r.position)}In(e){const n=[];for(let r=0;r<e.length;++r)n[r]=e[r].Qe();return n}pn(e,n,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new xo;c.seed(a.Qe()),Si.Ve._e(o,c.He(n.kind)),s.push(c)}return s}yn(e,n){return!!e.filters.find(r=>r instanceof ce&&r.field.isEqual(n)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,n){const r=Mc(e),i=Po(e);return(n?r.j("collectionGroupIndex",IDBKeyRange.bound(n,n)):r.j()).next(s=>{const o=[];return y.forEach(s,a=>i.get([a.indexId,this.uid]).next(c=>{o.push(function(u,l){const h=l?new Au(l.sequenceNumber,new hn(Xi(l.readTime),new L(Gn(l.documentKey)),l.largestBatchId)):Au.empty(),d=u.fields.map(([f,m])=>new JD(Qe.fromServerFormat(f),m));return new i0(u.indexId,u.collectionGroup,d,h)}(a,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(n=>n.length===0?null:(n.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:ie(r.collectionGroup,i.collectionGroup)}),n[0].collectionGroup))}updateCollectionGroup(e,n,r){const i=Mc(e),s=Po(e);return this.Tn(e).next(o=>i.j("collectionGroupIndex",IDBKeyRange.bound(n,n)).next(a=>y.forEach(a,c=>s.put(Ty(c.indexId,this.user,o,r)))))}updateIndexEntries(e,n){const r=new Map;return y.forEach(n,(i,s)=>{const o=r.get(i.collectionGroup);return(o?y.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),y.forEach(a,c=>this.En(e,i,c).next(u=>{const l=this.An(s,c);return u.isEqual(l)?y.resolve():this.vn(e,s,c,u,l)}))))})}Rn(e,n,r,i){return Do(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.gn(r,n.key),documentKey:n.key.path.toArray()})}Pn(e,n,r,i){return Do(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.gn(r,n.key),n.key.path.toArray()])}En(e,n,r){const i=Do(e);let s=new Me(xr);return i.X({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.gn(r,n)])},(o,a)=>{s=s.add(new Ai(r.indexId,n,a.arrayValue,a.directionalValue))}).next(()=>s)}An(e,n){let r=new Me(xr);const i=this.mn(n,e);if(i==null)return r;const s=_d(n);if(s!=null){const o=e.data.field(s.fieldPath);if(La(o))for(const a of o.arrayValue.values||[])r=r.add(new Ai(n.indexId,e.key,this.dn(a),i))}else r=r.add(new Ai(n.indexId,e.key,Oc,i));return r}vn(e,n,r,i,s){A("IndexedDbIndexManager","Updating index entries for document '%s'",n.key);const o=[];return function(a,c,u,l,h){const d=a.getIterator(),f=c.getIterator();let m=ds(d),_=ds(f);for(;m||_;){let T=!1,D=!1;if(m&&_){const O=u(m,_);O<0?D=!0:O>0&&(T=!0)}else m!=null?D=!0:T=!0;T?(l(_),_=ds(f)):D?(h(m),m=ds(d)):(m=ds(d),_=ds(f))}}(i,s,xr,a=>{o.push(this.Rn(e,n,r,a))},a=>{o.push(this.Pn(e,n,r,a))}),y.waitFor(o)}Tn(e){let n=1;return Po(e).X({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),n=i.sequenceNumber+1}).next(()=>n)}createRange(e,n,r){r=r.sort((o,a)=>xr(o,a)).filter((o,a,c)=>!a||xr(o,c[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=xr(o,e),c=xr(o,n);if(a===0)i[0]=e.Je();else if(a>0&&c<0)i.push(o),i.push(o.Je());else if(c>0)break}i.push(n);const s=[];for(let o=0;o<i.length;o+=2){if(this.bn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Oc,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Oc,[]];s.push(IDBKeyRange.bound(a,c))}return s}bn(e,n){return xr(e,n)>0}getMinOffsetFromCollectionGroup(e,n){return this.getFieldIndexes(e,n).next(xy)}getMinOffset(e,n){return y.mapArray(this.cn(n),r=>this.an(e,r).next(i=>i||j())).next(xy)}}function Ny(t){return gt(t,"collectionParents")}function Do(t){return gt(t,"indexEntries")}function Mc(t){return gt(t,"indexConfiguration")}function Po(t){return gt(t,"indexState")}function xy(t){H(t.length!==0);let e=t[0].indexState.offset,n=e.largestBatchId;for(let r=1;r<t.length;r++){const i=t[r].indexState.offset;ap(i,e)<0&&(e=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new hn(e.readTime,e.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Yt{constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Yt(e,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aE(t,e,n){const r=t.store("mutations"),i=t.store("documentMutations"),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.X({range:o},(l,h,d)=>(a++,d.delete()));s.push(c.next(()=>{H(a===1)}));const u=[];for(const l of n.mutations){const h=l0(e,l.key.path,n.batchId);s.push(i.delete(h)),u.push(l.key)}return y.waitFor(s).next(()=>u)}function Du(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw j();e=t.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yt.DEFAULT_COLLECTION_PERCENTILE=10,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Yt.DEFAULT=new Yt(41943040,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Yt.DISABLED=new Yt(-1,0,0);class Nl{constructor(e,n,r,i){this.userId=e,this.serializer=n,this.indexManager=r,this.referenceDelegate=i,this.Vn={}}static de(e,n,r,i){H(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Nl(s,n,r,i)}checkEmpty(e){let n=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Dr(e).X({index:"userMutationsIndex",range:r},(i,s,o)=>{n=!1,o.done()}).next(()=>n)}addMutationBatch(e,n,r,i){const s=ws(e),o=Dr(e);return o.add({}).next(a=>{H(typeof a=="number");const c=new gp(a,n,r,i),u=function(d,f,m){const _=m.baseMutations.map(D=>Ua(d.fe,D)),T=m.mutations.map(D=>Ua(d.fe,D));return{userId:f,batchId:m.batchId,localWriteTimeMs:m.localWriteTime.toMillis(),baseMutations:_,mutations:T}}(this.serializer,this.userId,c),l=[];let h=new Me((d,f)=>ie(d.canonicalString(),f.canonicalString()));for(const d of i){const f=l0(this.userId,d.key.path,a);h=h.add(d.key.path.popLast()),l.push(o.put(u)),l.push(s.put(f,rP))}return h.forEach(d=>{l.push(this.indexManager.addToCollectionParentIndex(e,d))}),e.addOnCommittedListener(()=>{this.Vn[a]=c.keys()}),y.waitFor(l).next(()=>c)})}lookupMutationBatch(e,n){return Dr(e).get(n).next(r=>r?(H(r.userId===this.userId),Ti(this.serializer,r)):null)}Sn(e,n){return this.Vn[n]?y.resolve(this.Vn[n]):this.lookupMutationBatch(e,n).next(r=>{if(r){const i=r.keys();return this.Vn[n]=i,i}return null})}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Dr(e).X({index:"userMutationsIndex",range:i},(o,a,c)=>{a.userId===this.userId&&(H(a.batchId>=r),s=Ti(this.serializer,a)),c.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const n=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return Dr(e).X({index:"userMutationsIndex",range:n,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const n=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Dr(e).j("userMutationsIndex",n).next(r=>r.map(i=>Ti(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,n){const r=Qc(this.userId,n.path),i=IDBKeyRange.lowerBound(r),s=[];return ws(e).X({range:i},(o,a,c)=>{const[u,l,h]=o,d=Gn(l);if(u===this.userId&&n.path.isEqual(d))return Dr(e).get(h).next(f=>{if(!f)throw j();H(f.userId===this.userId),s.push(Ti(this.serializer,f))});c.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Me(ie);const i=[];return n.forEach(s=>{const o=Qc(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=ws(e).X({range:a},(u,l,h)=>{const[d,f,m]=u,_=Gn(f);d===this.userId&&s.path.isEqual(_)?r=r.add(m):h.done()});i.push(c)}),y.waitFor(i).next(()=>this.Dn(e,r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1,s=Qc(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Me(ie);return ws(e).X({range:o},(c,u,l)=>{const[h,d,f]=c,m=Gn(d);h===this.userId&&r.isPrefixOf(m)?m.length===i&&(a=a.add(f)):l.done()}).next(()=>this.Dn(e,a))}Dn(e,n){const r=[],i=[];return n.forEach(s=>{i.push(Dr(e).get(s).next(o=>{if(o===null)throw j();H(o.userId===this.userId),r.push(Ti(this.serializer,o))}))}),y.waitFor(i).next(()=>r)}removeMutationBatch(e,n){return aE(e.ht,this.userId,n).next(r=>(e.addOnCommittedListener(()=>{this.Cn(n.batchId)}),y.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}Cn(e){delete this.Vn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(n=>{if(!n)return y.resolve();const r=IDBKeyRange.lowerBound([this.userId]),i=[];return ws(e).X({range:r},(s,o,a)=>{if(s[0]===this.userId){const c=Gn(s[1]);i.push(c)}else a.done()}).next(()=>{H(i.length===0)})})}containsKey(e,n){return cE(e,this.userId,n)}xn(e){return uE(e).get(this.userId).next(n=>n||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function cE(t,e,n){const r=Qc(e,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return ws(t).X({range:s,Y:!0},(a,c,u)=>{const[l,h,d]=a;l===e&&h===i&&(o=!0),u.done()}).next(()=>o)}function Dr(t){return gt(t,"mutations")}function ws(t){return gt(t,"documentMutations")}function uE(t){return gt(t,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new Zi(0)}static Mn(){return new Zi(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mO{constructor(e,n){this.referenceDelegate=e,this.serializer=n}allocateTargetId(e){return this.$n(e).next(n=>{const r=new Zi(n.highestTargetId);return n.highestTargetId=r.next(),this.On(e,n).next(()=>n.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.$n(e).next(n=>K.fromTimestamp(new Be(n.lastRemoteSnapshotVersion.seconds,n.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.$n(e).next(n=>n.highestListenSequenceNumber)}setTargetsMetadata(e,n,r){return this.$n(e).next(i=>(i.highestListenSequenceNumber=n,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),n>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=n),this.On(e,i)))}addTargetData(e,n){return this.Fn(e,n).next(()=>this.$n(e).next(r=>(r.targetCount+=1,this.Bn(n,r),this.On(e,r))))}updateTargetData(e,n){return this.Fn(e,n)}removeTargetData(e,n){return this.removeMatchingKeysForTargetId(e,n.targetId).next(()=>fs(e).delete(n.targetId)).next(()=>this.$n(e)).next(r=>(H(r.targetCount>0),r.targetCount-=1,this.On(e,r)))}removeTargets(e,n,r){let i=0;const s=[];return fs(e).X((o,a)=>{const c=jo(a);c.sequenceNumber<=n&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))}).next(()=>y.waitFor(s)).next(()=>i)}forEachTarget(e,n){return fs(e).X((r,i)=>{const s=jo(i);n(s)})}$n(e){return Py(e).get("targetGlobalKey").next(n=>(H(n!==null),n))}On(e,n){return Py(e).put("targetGlobalKey",n)}Fn(e,n){return fs(e).put(iE(this.serializer,n))}Bn(e,n){let r=!1;return e.targetId>n.highestTargetId&&(n.highestTargetId=e.targetId,r=!0),e.sequenceNumber>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.$n(e).next(n=>n.targetCount)}getTargetData(e,n){const r=Wi(n),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return fs(e).X({range:i,index:"queryTargetsIndex"},(o,a,c)=>{const u=jo(a);hc(n,u.target)&&(s=u,c.done())}).next(()=>s)}addMatchingKeys(e,n,r){const i=[],s=$r(e);return n.forEach(o=>{const a=Kt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),y.waitFor(i)}removeMatchingKeys(e,n,r){const i=$r(e);return y.forEach(n,s=>{const o=Kt(s.path);return y.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,n){const r=$r(e),i=IDBKeyRange.bound([n],[n+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,n){const r=IDBKeyRange.bound([n],[n+1],!1,!0),i=$r(e);let s=oe();return i.X({range:r,Y:!0},(o,a,c)=>{const u=Gn(o[1]),l=new L(u);s=s.add(l)}).next(()=>s)}containsKey(e,n){const r=Kt(n.path),i=IDBKeyRange.bound([r],[r0(r)],!1,!0);let s=0;return $r(e).X({index:"documentTargetsIndex",Y:!0,range:i},([o,a],c,u)=>{o!==0&&(s++,u.done())}).next(()=>s>0)}le(e,n){return fs(e).get(n).next(r=>r?jo(r):null)}}function fs(t){return gt(t,"targets")}function Py(t){return gt(t,"targetGlobal")}function $r(t){return gt(t,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy([t,e],[n,r]){const i=ie(t,n);return i===0?ie(e,r):i}class yO{constructor(e){this.Ln=e,this.buffer=new Me(Oy),this.qn=0}Un(){return++this.qn}Kn(e){const n=[e,this.Un()];if(this.buffer.size<this.Ln)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Oy(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class vO{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Gn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Qn(6e4)}stop(){this.Gn&&(this.Gn.cancel(),this.Gn=null)}get started(){return this.Gn!==null}Qn(e){A("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Gn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Gn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){fi(n)?A("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",n):await di(n)}await this.Qn(3e5)})}}class wO{constructor(e,n){this.jn=e,this.params=n}calculateTargetCount(e,n){return this.jn.zn(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return y.resolve(Jt.ct);const r=new yO(n);return this.jn.forEachTarget(e,i=>r.Kn(i.sequenceNumber)).next(()=>this.jn.Wn(e,i=>r.Kn(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.jn.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.jn.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(A("LruGarbageCollector","Garbage collection skipped; disabled"),y.resolve(Dy)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(A("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Dy):this.Hn(e,n))}getCacheSize(e){return this.jn.getCacheSize(e)}Hn(e,n){let r,i,s,o,a,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(h=>(h>this.params.maximumSequenceNumbersToCollect?(A("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),i=this.params.maximumSequenceNumbersToCollect):i=h,o=Date.now(),this.nthSequenceNumber(e,i))).next(h=>(r=h,a=Date.now(),this.removeTargets(e,r,n))).next(h=>(s=h,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(h=>(u=Date.now(),wd()<=de.DEBUG&&A("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-l}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${h} documents in `+(u-c)+`ms
Total Duration: ${u-l}ms`),y.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:h})))}}function _O(t,e){return new wO(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IO{constructor(e,n){this.db=e,this.garbageCollector=_O(this,n)}zn(e){const n=this.Jn(e);return this.db.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}Jn(e){let n=0;return this.Wn(e,r=>{n++}).next(()=>n)}forEachTarget(e,n){return this.db.getTargetCache().forEachTarget(e,n)}Wn(e,n){return this.Yn(e,(r,i)=>n(i))}addReference(e,n,r){return Lc(e,r)}removeReference(e,n,r){return Lc(e,r)}removeTargets(e,n,r){return this.db.getTargetCache().removeTargets(e,n,r)}markPotentiallyOrphaned(e,n){return Lc(e,n)}Xn(e,n){return function(r,i){let s=!1;return uE(r).Z(o=>cE(r,o,i).next(a=>(a&&(s=!0),y.resolve(!a)))).next(()=>s)}(e,n)}removeOrphanedDocuments(e,n){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.Yn(e,(o,a)=>{if(a<=n){const c=this.Xn(e,o).next(u=>{if(!u)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,K.min()),$r(e).delete([0,Kt(o.path)])))});i.push(c)}}).next(()=>y.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,n){return Lc(e,n)}Yn(e,n){const r=$r(e);let i,s=Jt.ct;return r.X({index:"documentTargetsIndex"},([o,a],{path:c,sequenceNumber:u})=>{o===0?(s!==Jt.ct&&n(new L(Gn(i)),s),s=u,i=c):s=Jt.ct}).next(()=>{s!==Jt.ct&&n(new L(Gn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Lc(t,e){return $r(t).put(function(n,r){return{targetId:0,path:Kt(n.path),sequenceNumber:r}}(e,t.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(){this.changes=new pi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Oe.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?y.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EO{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,n,r){return wi(e).put(r)}removeEntry(e,n,r){return wi(e).delete(function(i,s){const o=i.path.toArray();return[o.slice(0,o.length-2),o[o.length-2],Nu(s),o[o.length-1]]}(n,r))}updateMetadata(e,n){return this.getMetadata(e).next(r=>(r.byteSize+=n,this.Zn(e,r)))}getEntry(e,n){let r=Oe.newInvalidDocument(n);return wi(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Oo(n))},(i,s)=>{r=this.ts(n,s)}).next(()=>r)}es(e,n){let r={size:0,document:Oe.newInvalidDocument(n)};return wi(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Oo(n))},(i,s)=>{r={document:this.ts(n,s),size:Du(s)}}).next(()=>r)}getEntries(e,n){let r=Zt();return this.ns(e,n,(i,s)=>{const o=this.ts(i,s);r=r.insert(i,o)}).next(()=>r)}ss(e,n){let r=Zt(),i=new Ne(L.comparator);return this.ns(e,n,(s,o)=>{const a=this.ts(s,o);r=r.insert(s,a),i=i.insert(s,Du(o))}).next(()=>({documents:r,rs:i}))}ns(e,n,r){if(n.isEmpty())return y.resolve();let i=new Me(Fy);n.forEach(c=>i=i.add(c));const s=IDBKeyRange.bound(Oo(i.first()),Oo(i.last())),o=i.getIterator();let a=o.getNext();return wi(e).X({index:"documentKeyIndex",range:s},(c,u,l)=>{const h=L.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;a&&Fy(a,h)<0;)r(a,null),a=o.getNext();a&&a.isEqual(h)&&(r(a,u),a=o.hasNext()?o.getNext():null),a?l.G(Oo(a)):l.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,n,r,i){const s=n.path,o=[s.popLast().toArray(),s.lastSegment(),Nu(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],a=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return wi(e).j(IDBKeyRange.bound(o,a,!0)).next(c=>{let u=Zt();for(const l of c){const h=this.ts(L.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);h.isFoundDocument()&&(fc(n,h)||i.has(h.key))&&(u=u.insert(h.key,h))}return u})}getAllFromCollectionGroup(e,n,r,i){let s=Zt();const o=Ly(n,r),a=Ly(n,hn.max());return wi(e).X({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(c,u,l)=>{const h=this.ts(L.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);s=s.insert(h.key,h),s.size===i&&l.done()}).next(()=>s)}newChangeBuffer(e){return new bO(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(n=>n.byteSize)}getMetadata(e){return My(e).get("remoteDocumentGlobalKey").next(n=>(H(!!n),n))}Zn(e,n){return My(e).put("remoteDocumentGlobalKey",n)}ts(e,n){if(n){const r=oO(this.serializer,n);if(!(r.isNoDocument()&&r.version.isEqual(K.min())))return r}return Oe.newInvalidDocument(e)}}function hE(t){return new EO(t)}class bO extends lE{constructor(e,n){super(),this.os=e,this.trackRemovals=n,this.us=new pi(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const n=[];let r=0,i=new Me((s,o)=>ie(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.us.get(s);if(n.push(this.os.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=Ey(this.os.serializer,o);i=i.add(s.path.popLast());const u=Du(c);r+=u-a.size,n.push(this.os.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=Ey(this.os.serializer,o.convertToNoDocument(K.min()));n.push(this.os.addEntry(e,s,c))}}),i.forEach(s=>{n.push(this.os.indexManager.addToCollectionParentIndex(e,s))}),n.push(this.os.updateMetadata(e,r)),y.waitFor(n)}getFromCache(e,n){return this.os.es(e,n).next(r=>(this.us.set(n,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,n){return this.os.ss(e,n).next(({documents:r,rs:i})=>(i.forEach((s,o)=>{this.us.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function My(t){return gt(t,"remoteDocumentGlobal")}function wi(t){return gt(t,"remoteDocumentsV14")}function Oo(t){const e=t.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Ly(t,e){const n=e.documentKey.path.toArray();return[t,Nu(e.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Fy(t,e){const n=t.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=ie(n[s],r[s]),i)return i;return i=ie(n.length,r.length),i||(i=ie(n[n.length-2],r[r.length-2]),i||ie(n[n.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TO{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&sa(r.mutation,i,Xt.empty(),Be.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,oe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=oe()){const i=zn();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=$o();return s.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=zn();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,oe()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,i){let s=Zt();const o=ia(),a=ia();return n.forEach((c,u)=>{const l=r.get(u.key);i.has(u.key)&&(l===void 0||l.mutation instanceof Ar)?s=s.insert(u.key,u):l!==void 0?(o.set(u.key,l.mutation.getFieldMask()),sa(l.mutation,u,l.mutation.getFieldMask(),Be.now())):o.set(u.key,Xt.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((u,l)=>o.set(u,l)),n.forEach((u,l)=>{var h;return a.set(u,new TO(l,(h=o.get(u))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const r=ia();let i=new Ne((o,a)=>o-a),s=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let l=r.get(c)||Xt.empty();l=a.applyToLocalView(u,l),r.set(c,l);const h=(i.get(a.batchId)||oe()).add(c);i=i.insert(a.batchId,h)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,l=c.value,h=x0();l.forEach(d=>{if(!s.has(d)){const f=U0(n.get(d),r.get(d));f!==null&&h.set(d,f),s=s.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,h))}return y.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r){return function(i){return L.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):dp(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r):this.getDocumentsMatchingCollectionQuery(e,n,r)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):y.resolve(zn());let a=-1,c=s;return o.next(u=>y.forEach(u,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),s.get(l)?y.resolve():this.remoteDocumentCache.getEntry(e,l).next(d=>{c=c.insert(l,d)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,c,u,oe())).next(l=>({batchId:a,changes:N0(l)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new L(n)).next(r=>{let i=$o();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r){const i=n.collectionGroup;let s=$o();return this.indexManager.getCollectionParents(e,i).next(o=>y.forEach(o,a=>{const c=function(u,l){return new Sr(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r).next(u=>{u.forEach((l,h)=>{s=s.insert(l,h)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i))).next(s=>{i.forEach((a,c)=>{const u=c.getKey();s.get(u)===null&&(s=s.insert(u,Oe.newInvalidDocument(u)))});let o=$o();return s.forEach((a,c)=>{const u=i.get(a);u!==void 0&&sa(u.mutation,c,Xt.empty(),Be.now()),fc(n,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SO{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,n){return y.resolve(this.cs.get(n))}saveBundleMetadata(e,n){var r;return this.cs.set(n.id,{id:(r=n).id,version:r.version,createTime:Ye(r.createTime)}),y.resolve()}getNamedQuery(e,n){return y.resolve(this.hs.get(n))}saveNamedQuery(e,n){return this.hs.set(n.name,function(r){return{name:r.name,query:Ip(r.bundledQuery),readTime:Ye(r.readTime)}}(n)),y.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AO{constructor(){this.overlays=new Ne(L.comparator),this.ls=new Map}getOverlay(e,n){return y.resolve(this.overlays.get(n))}getOverlays(e,n){const r=zn();return y.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.we(e,n,s)}),y.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.ls.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.ls.delete(r)),y.resolve()}getOverlaysForCollection(e,n,r){const i=zn(),s=n.length+1,o=new L(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return y.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Ne((u,l)=>u-l);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let l=s.get(u.largestBatchId);l===null&&(l=zn(),s=s.insert(u.largestBatchId,l)),l.set(u.getKey(),u)}}const a=zn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,l)=>a.set(u,l)),!(a.size()>=i)););return y.resolve(a)}we(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.ls.get(i.largestBatchId).delete(r.key);this.ls.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new yp(n,r));let s=this.ls.get(n);s===void 0&&(s=oe(),this.ls.set(n,s)),this.ls.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(){this.fs=new Me(ut.ds),this.ws=new Me(ut._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,n){const r=new ut(e,n);this.fs=this.fs.add(r),this.ws=this.ws.add(r)}gs(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.ys(new ut(e,n))}ps(e,n){e.forEach(r=>this.removeReference(r,n))}Is(e){const n=new L(new fe([])),r=new ut(n,e),i=new ut(n,e+1),s=[];return this.ws.forEachInRange([r,i],o=>{this.ys(o),s.push(o.key)}),s}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const n=new L(new fe([])),r=new ut(n,e),i=new ut(n,e+1);let s=oe();return this.ws.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new ut(e,0),r=this.fs.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ut{constructor(e,n){this.key=e,this.As=n}static ds(e,n){return L.comparator(e.key,n.key)||ie(e.As,n.As)}static _s(e,n){return ie(e.As,n.As)||L.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CO{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new Me(ut.ds)}checkEmpty(e){return y.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new gp(s,n,r,i);this.mutationQueue.push(o);for(const a of i)this.Rs=this.Rs.add(new ut(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return y.resolve(o)}lookupMutationBatch(e,n){return y.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.bs(r),s=i<0?0:i;return y.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return y.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return y.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ut(n,0),i=new ut(n,Number.POSITIVE_INFINITY),s=[];return this.Rs.forEachInRange([r,i],o=>{const a=this.Ps(o.As);s.push(a)}),y.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Me(ie);return n.forEach(i=>{const s=new ut(i,0),o=new ut(i,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([s,o],a=>{r=r.add(a.As)})}),y.resolve(this.Vs(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;L.isDocumentKey(s)||(s=s.child(""));const o=new ut(new L(s),0);let a=new Me(ie);return this.Rs.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(a=a.add(c.As)),!0)},o),y.resolve(this.Vs(a))}Vs(e){const n=[];return e.forEach(r=>{const i=this.Ps(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){H(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Rs;return y.forEach(n.mutations,i=>{const s=new ut(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Rs=r})}Cn(e){}containsKey(e,n){const r=new ut(n,0),i=this.Rs.firstAfterOrEqual(r);return y.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,y.resolve()}Ss(e,n){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const n=this.bs(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kO{constructor(e){this.Ds=e,this.docs=new Ne(L.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Ds(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return y.resolve(r?r.document.mutableCopy():Oe.newInvalidDocument(n))}getEntries(e,n){let r=Zt();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Oe.newInvalidDocument(i))}),y.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Zt();const o=n.path,a=new L(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:u,value:{document:l}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||ap(o0(l),r)<=0||(i.has(l.key)||fc(n,l))&&(s=s.insert(l.key,l.mutableCopy()))}return y.resolve(s)}getAllFromCollectionGroup(e,n,r,i){j()}Cs(e,n){return y.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new RO(this)}getSize(e){return y.resolve(this.size)}}class RO extends lE{constructor(e){super(),this.os=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.os.addEntry(e,i)):this.os.removeEntry(r)}),y.waitFor(n)}getFromCache(e,n){return this.os.getEntry(e,n)}getAllFromCache(e,n){return this.os.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NO{constructor(e){this.persistence=e,this.xs=new pi(n=>Wi(n),hc),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Tp,this.targetCount=0,this.Ms=Zi.kn()}forEachTarget(e,n){return this.xs.forEach((r,i)=>n(i)),y.resolve()}getLastRemoteSnapshotVersion(e){return y.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return y.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),y.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Ns&&(this.Ns=n),y.resolve()}Fn(e){this.xs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ms=new Zi(n),this.highestTargetId=n),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,n){return this.Fn(n),this.targetCount+=1,y.resolve()}updateTargetData(e,n){return this.Fn(n),y.resolve()}removeTargetData(e,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,y.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.xs.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),y.waitFor(s).next(()=>i)}getTargetCount(e){return y.resolve(this.targetCount)}getTargetData(e,n){const r=this.xs.get(n)||null;return y.resolve(r)}addMatchingKeys(e,n,r){return this.ks.gs(n,r),y.resolve()}removeMatchingKeys(e,n,r){this.ks.ps(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),y.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.ks.Is(n),y.resolve()}getMatchingKeysForTargetId(e,n){const r=this.ks.Es(n);return y.resolve(r)}containsKey(e,n){return y.resolve(this.ks.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e,n){this.$s={},this.overlays={},this.Os=new Jt(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new NO(this),this.indexManager=new pO,this.remoteDocumentCache=function(r){return new kO(r)}(r=>this.referenceDelegate.Ls(r)),this.serializer=new rE(n),this.qs=new SO(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new AO,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.$s[e.toKey()];return r||(r=new CO(n,this.referenceDelegate),this.$s[e.toKey()]=r),r}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,n,r){A("MemoryPersistence","Starting transaction:",e);const i=new xO(this.Os.next());return this.referenceDelegate.Us(),r(i).next(s=>this.referenceDelegate.Ks(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gs(e,n){return y.or(Object.values(this.$s).map(r=>()=>r.containsKey(e,n)))}}class xO extends c0{constructor(e){super(),this.currentSequenceNumber=e}}class xl{constructor(e){this.persistence=e,this.Qs=new Tp,this.js=null}static zs(e){return new xl(e)}get Ws(){if(this.js)return this.js;throw j()}addReference(e,n,r){return this.Qs.addReference(r,n),this.Ws.delete(r.toString()),y.resolve()}removeReference(e,n,r){return this.Qs.removeReference(r,n),this.Ws.add(r.toString()),y.resolve()}markPotentiallyOrphaned(e,n){return this.Ws.add(n.toString()),y.resolve()}removeTarget(e,n){this.Qs.Is(n.targetId).forEach(i=>this.Ws.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Ws.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Us(){this.js=new Set}Ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return y.forEach(this.Ws,r=>{const i=L.fromPath(r);return this.Hs(e,i).next(s=>{s||n.removeEntry(i,K.min())})}).next(()=>(this.js=null,n.apply(e)))}updateLimboDocument(e,n){return this.Hs(e,n).next(r=>{r?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(e){return 0}Hs(e,n){return y.or([()=>y.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Gs(e,n)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DO{constructor(e){this.serializer=e}O(e,n,r,i){const s=new Tl("createOrUpgrade",n);r<1&&i>=1&&(function(a){a.createObjectStore("owner")}(e),function(a){a.createObjectStore("mutationQueues",{keyPath:"userId"}),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Zm,{unique:!0}),a.createObjectStore("documentMutations")}(e),Vy(e),function(a){a.createObjectStore("remoteDocuments")}(e));let o=y.resolve();return r<3&&i>=3&&(r!==0&&(function(a){a.deleteObjectStore("targetDocuments"),a.deleteObjectStore("targets"),a.deleteObjectStore("targetGlobal")}(e),Vy(e)),o=o.next(()=>function(a){const c=a.store("targetGlobal"),u={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:K.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",u)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(a,c){return c.store("mutations").j().next(u=>{a.deleteObjectStore("mutations"),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Zm,{unique:!0});const l=c.store("mutations"),h=u.map(d=>l.put(d));return y.waitFor(h)})}(e,s))),o=o.next(()=>{(function(a){a.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.Ys(s))),r<6&&i>=6&&(o=o.next(()=>(function(a){a.createObjectStore("remoteDocumentGlobal")}(e),this.Xs(s)))),r<7&&i>=7&&(o=o.next(()=>this.Zs(s))),r<8&&i>=8&&(o=o.next(()=>this.ti(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(a){a.objectStoreNames.contains("remoteDocumentChanges")&&a.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.ei(s))),r<11&&i>=11&&(o=o.next(()=>{(function(a){a.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(a){a.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(a){const c=a.createObjectStore("documentOverlays",{keyPath:gP});c.createIndex("collectionPathOverlayIndex",mP,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",yP,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(a){const c=a.createObjectStore("remoteDocumentsV14",{keyPath:iP});c.createIndex("documentKeyIndex",sP),c.createIndex("collectionGroupIndex",oP)}(e)).next(()=>this.ni(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.si(e,s))),r<15&&i>=15&&(o=o.next(()=>function(a){a.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),a.createObjectStore("indexState",{keyPath:hP}).createIndex("sequenceNumberIndex",dP,{unique:!1}),a.createObjectStore("indexEntries",{keyPath:fP}).createIndex("documentKeyIndex",pP,{unique:!1})}(e))),o}Xs(e){let n=0;return e.store("remoteDocuments").X((r,i)=>{n+=Du(i)}).next(()=>{const r={byteSize:n};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}Ys(e){const n=e.store("mutationQueues"),r=e.store("mutations");return n.j().next(i=>y.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.j("userMutationsIndex",o).next(a=>y.forEach(a,c=>{H(c.userId===s.userId);const u=Ti(this.serializer,c);return aE(e,s.userId,u).next(()=>{})}))}))}Zs(e){const n=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.X((o,a)=>{const c=new fe(o),u=function(l){return[0,Kt(l)]}(c);s.push(n.get(u).next(l=>l?y.resolve():(h=>n.put({targetId:0,path:Kt(h),sequenceNumber:i.highestListenSequenceNumber}))(c)))}).next(()=>y.waitFor(s))})}ti(e,n){e.createObjectStore("collectionParents",{keyPath:lP});const r=n.store("collectionParents"),i=new bp,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:Kt(c)})}};return n.store("remoteDocuments").X({Y:!0},(o,a)=>{const c=new fe(o);return s(c.popLast())}).next(()=>n.store("documentMutations").X({Y:!0},([o,a,c],u)=>{const l=Gn(a);return s(l.popLast())}))}ei(e){const n=e.store("targets");return n.X((r,i)=>{const s=jo(i),o=iE(this.serializer,s);return n.put(o)})}ni(e,n){const r=n.store("remoteDocuments"),i=[];return r.X((s,o)=>{const a=n.store("remoteDocumentsV14"),c=(u=o,u.document?new L(fe.fromString(u.document.name).popFirst(5)):u.noDocument?L.fromSegments(u.noDocument.path):u.unknownDocument?L.fromSegments(u.unknownDocument.path):j()).path.toArray();var u;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(l))}).next(()=>y.waitFor(i))}si(e,n){const r=n.store("mutations"),i=hE(this.serializer),s=new fE(xl.zs,this.serializer.fe);return r.j().next(o=>{const a=new Map;return o.forEach(c=>{var u;let l=(u=a.get(c.userId))!==null&&u!==void 0?u:oe();Ti(this.serializer,c).keys().forEach(h=>l=l.add(h)),a.set(c.userId,l)}),y.forEach(a,(c,u)=>{const l=new lt(u),h=Rl.de(this.serializer,l),d=s.getIndexManager(l),f=Nl.de(l,this.serializer,d,s.referenceDelegate);return new dE(i,f,h,d).recalculateAndSaveOverlaysForDocumentKeys(new Id(n,Jt.ct),c).next()})})}}function Vy(t){t.createObjectStore("targetDocuments",{keyPath:cP}).createIndex("documentTargetsIndex",uP,{unique:!0}),t.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",aP,{unique:!0}),t.createObjectStore("targetGlobal")}const Dh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Sp{constructor(e,n,r,i,s,o,a,c,u,l,h=15){if(this.allowTabSynchronization=e,this.persistenceKey=n,this.clientId=r,this.ii=s,this.window=o,this.document=a,this.ri=u,this.oi=l,this.ui=h,this.Os=null,this.Fs=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ci=null,this.inForeground=!1,this.ai=null,this.hi=null,this.li=Number.NEGATIVE_INFINITY,this.fi=d=>Promise.resolve(),!Sp.D())throw new b(w.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new IO(this,i),this.di=n+"main",this.serializer=new rE(c),this.wi=new _n(this.di,this.ui,new DO(this.serializer)),this.Bs=new mO(this.referenceDelegate,this.serializer),this.remoteDocumentCache=hE(this.serializer),this.qs=new aO,this.window&&this.window.localStorage?this._i=this.window.localStorage:(this._i=null,l===!1&&We("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new b(w.FAILED_PRECONDITION,Dh);return this.gi(),this.yi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Bs.getHighestSequenceNumber(e))}).then(e=>{this.Os=new Jt(e,this.ri)}).then(()=>{this.Fs=!0}).catch(e=>(this.wi&&this.wi.close(),Promise.reject(e)))}Ii(e){return this.fi=async n=>{if(this.started)return e(n)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.wi.B(async n=>{n.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ii.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Fc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ti(e).next(n=>{n||(this.isPrimary=!1,this.ii.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Ei(e)).next(n=>this.isPrimary&&!n?this.Ai(e).next(()=>!1):!!n&&this.vi(e).next(()=>!0))).catch(e=>{if(fi(e))return A("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return A("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ii.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Ti(e){return Mo(e).get("owner").next(n=>y.resolve(this.Ri(n)))}Pi(e){return Fc(e).delete(this.clientId)}async bi(){if(this.isPrimary&&!this.Vi(this.li,18e5)){this.li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",n=>{const r=gt(n,"clientMetadata");return r.j().next(i=>{const s=this.Si(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return y.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this._i)for(const n of e)this._i.removeItem(this.Di(n.clientId))}}pi(){this.hi=this.ii.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.bi()).then(()=>this.pi()))}Ri(e){return!!e&&e.ownerId===this.clientId}Ei(e){return this.oi?y.resolve(!0):Mo(e).get("owner").next(n=>{if(n!==null&&this.Vi(n.leaseTimestampMs,5e3)&&!this.Ci(n.ownerId)){if(this.Ri(n)&&this.networkEnabled)return!0;if(!this.Ri(n)){if(!n.allowTabSynchronization)throw new b(w.FAILED_PRECONDITION,Dh);return!1}}return!(!this.networkEnabled||!this.inForeground)||Fc(e).j().next(r=>this.Si(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(n=>(this.isPrimary!==n&&A("IndexedDbPersistence",`Client ${n?"is":"is not"} eligible for a primary lease.`),n))}async shutdown(){this.Fs=!1,this.xi(),this.hi&&(this.hi.cancel(),this.hi=null),this.Ni(),this.ki(),await this.wi.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const n=new Id(e,Jt.ct);return this.Ai(n).next(()=>this.Pi(n))}),this.wi.close(),this.Mi()}Si(e,n){return e.filter(r=>this.Vi(r.updateTimeMs,n)&&!this.Ci(r.clientId))}$i(){return this.runTransaction("getActiveClients","readonly",e=>Fc(e).j().next(n=>this.Si(n,18e5).map(r=>r.clientId)))}get started(){return this.Fs}getMutationQueue(e,n){return Nl.de(e,this.serializer,n,this.referenceDelegate)}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new gO(e,this.serializer.fe.databaseId)}getDocumentOverlayCache(e){return Rl.de(this.serializer,e)}getBundleCache(){return this.qs}runTransaction(e,n,r){A("IndexedDbPersistence","Starting transaction:",e);const i=n==="readonly"?"readonly":"readwrite",s=(o=this.ui)===15?wP:o===14?f0:o===13?d0:o===12?vP:o===11?h0:void j();var o;let a;return this.wi.runTransaction(e,i,s,c=>(a=new Id(c,this.Os?this.Os.next():Jt.ct),n==="readwrite-primary"?this.Ti(a).next(u=>!!u||this.Ei(a)).next(u=>{if(!u)throw We(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ii.enqueueRetryable(()=>this.fi(!1)),new b(w.FAILED_PRECONDITION,a0);return r(a)}).next(u=>this.vi(a).next(()=>u)):this.Oi(a).next(()=>r(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}Oi(e){return Mo(e).get("owner").next(n=>{if(n!==null&&this.Vi(n.leaseTimestampMs,5e3)&&!this.Ci(n.ownerId)&&!this.Ri(n)&&!(this.oi||this.allowTabSynchronization&&n.allowTabSynchronization))throw new b(w.FAILED_PRECONDITION,Dh)})}vi(e){const n={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Mo(e).put("owner",n)}static D(){return _n.D()}Ai(e){const n=Mo(e);return n.get("owner").next(r=>this.Ri(r)?(A("IndexedDbPersistence","Releasing primary lease."),n.delete("owner")):y.resolve())}Vi(e,n){const r=Date.now();return!(e<r-n)&&(!(e>r)||(We(`Detected an update time that is in the future: ${e} > ${r}`),!1))}gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.ai=()=>{this.ii.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.ai),this.inForeground=this.document.visibilityState==="visible")}Ni(){this.ai&&(this.document.removeEventListener("visibilitychange",this.ai),this.ai=null)}yi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.ci=()=>{this.xi();const n=/(?:Version|Mobile)\/1[456]/;fC()&&(navigator.appVersion.match(n)||navigator.userAgent.match(n))&&this.ii.enterRestrictedMode(!0),this.ii.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ci))}ki(){this.ci&&(this.window.removeEventListener("pagehide",this.ci),this.ci=null)}Ci(e){var n;try{const r=((n=this._i)===null||n===void 0?void 0:n.getItem(this.Di(e)))!==null;return A("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return We("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}xi(){if(this._i)try{this._i.setItem(this.Di(this.clientId),String(Date.now()))}catch(e){We("Failed to set zombie client id.",e)}}Mi(){if(this._i)try{this._i.removeItem(this.Di(this.clientId))}catch{}}Di(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Mo(t){return gt(t,"owner")}function Fc(t){return gt(t,"clientMetadata")}function Ap(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Fi=r,this.Bi=i}static Li(e,n){let r=oe(),i=oe();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Cp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(){this.qi=!1}initialize(e,n){this.Ui=e,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(e,n,r,i){return this.Ki(e,n).next(s=>s||this.Gi(e,n,i,r)).next(s=>s||this.Qi(e,n))}Ki(e,n){if(hy(n))return y.resolve(null);let r=en(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Ru(n,null,"F"),r=en(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=oe(...s);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.ji(n,a);return this.zi(n,u,o,c.readTime)?this.Ki(e,Ru(n,null,"F")):this.Wi(e,u,n,c)}))})))}Gi(e,n,r,i){return hy(n)||i.isEqual(K.min())?this.Qi(e,n):this.Ui.getDocuments(e,r).next(s=>{const o=this.ji(n,s);return this.zi(n,o,r,i)?this.Qi(e,n):(wd()<=de.DEBUG&&A("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),kd(n)),this.Wi(e,o,n,s0(i,-1)))})}ji(e,n){let r=new Me(k0(e));return n.forEach((i,s)=>{fc(e,s)&&(r=r.add(s))}),r}zi(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Qi(e,n){return wd()<=de.DEBUG&&A("QueryEngine","Using full collection scan to execute query:",kd(n)),this.Ui.getDocumentsMatchingQuery(e,n,hn.min())}Wi(e,n,r,i){return this.Ui.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PO{constructor(e,n,r,i){this.persistence=e,this.Hi=n,this.serializer=i,this.Ji=new Ne(ie),this.Yi=new pi(s=>Wi(s),hc),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(r)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dE(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ji))}}function gE(t,e,n,r){return new PO(t,e,n,r)}async function mE(t,e){const n=V(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.tr(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let c=oe();for(const u of i){o.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}for(const u of s){a.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}return n.localDocuments.getDocuments(r,c).next(u=>({er:u,removedBatchIds:o,addedBatchIds:a}))})})}function OO(t,e){const n=V(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let d=y.resolve();return h.forEach(f=>{d=d.next(()=>u.getEntry(a,f)).next(m=>{const _=c.docVersions.get(f);H(_!==null),m.version.compareTo(_)<0&&(l.applyToRemoteDocument(m,c),m.isValidDocument()&&(m.setReadTime(c.commitVersion),u.addEntry(m)))})}),d.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=oe();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function yE(t){const e=V(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Bs.getLastRemoteSnapshotVersion(n))}function MO(t,e){const n=V(t),r=e.snapshotVersion;let i=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});i=n.Ji;const a=[];e.targetChanges.forEach((l,h)=>{const d=i.get(h);if(!d)return;a.push(n.Bs.removeMatchingKeys(s,l.removedDocuments,h).next(()=>n.Bs.addMatchingKeys(s,l.addedDocuments,h)));let f=d.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(h)!==null?f=f.withResumeToken(at.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):l.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(l.resumeToken,r)),i=i.insert(h,f),function(m,_,T){return m.resumeToken.approximateByteSize()===0||_.snapshotVersion.toMicroseconds()-m.snapshotVersion.toMicroseconds()>=3e8?!0:T.addedDocuments.size+T.modifiedDocuments.size+T.removedDocuments.size>0}(d,f,l)&&a.push(n.Bs.updateTargetData(s,f))});let c=Zt(),u=oe();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(s,l))}),a.push(vE(s,o,e.documentUpdates).next(l=>{c=l.nr,u=l.sr})),!r.isEqual(K.min())){const l=n.Bs.getLastRemoteSnapshotVersion(s).next(h=>n.Bs.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(l)}return y.waitFor(a).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,c,u)).next(()=>c)}).then(s=>(n.Ji=i,s))}function vE(t,e,n){let r=oe(),i=oe();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Zt();return n.forEach((a,c)=>{const u=s.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(K.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):A("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{nr:o,sr:i}})}function LO(t,e){const n=V(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Ys(t,e){const n=V(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Bs.getTargetData(r,e).next(s=>s?(i=s,y.resolve(i)):n.Bs.allocateTargetId(r).next(o=>(i=new hr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Bs.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.Ji.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(r.targetId,r),n.Yi.set(e,r.targetId)),r})}async function Js(t,e,n){const r=V(t),i=r.Ji.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!fi(o))throw o;A("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ji=r.Ji.remove(e),r.Yi.delete(i.target)}function Pu(t,e,n){const r=V(t);let i=K.min(),s=oe();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=V(a),h=l.Yi.get(u);return h!==void 0?y.resolve(l.Ji.get(h)):l.Bs.getTargetData(c,u)}(r,o,en(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Bs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{s=c})}).next(()=>r.Hi.getDocumentsMatchingQuery(o,e,n?i:K.min(),n?s:oe())).next(a=>(IE(r,C0(e),a),{documents:a,ir:s})))}function wE(t,e){const n=V(t),r=V(n.Bs),i=n.Ji.get(e);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",s=>r.le(s,e).next(o=>o?o.target:null))}function _E(t,e){const n=V(t),r=n.Xi.get(e)||K.min();return n.persistence.runTransaction("Get new document changes","readonly",i=>n.Zi.getAllFromCollectionGroup(i,e,s0(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(IE(n,e,i),i))}function IE(t,e,n){let r=t.Xi.get(e)||K.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.Xi.set(e,r)}async function FO(t,e,n,r){const i=V(t);let s=oe(),o=Zt();for(const u of n){const l=e.rr(u.metadata.name);u.document&&(s=s.add(l));const h=e.ur(u);h.setReadTime(e.cr(u.metadata.readTime)),o=o.insert(l,h)}const a=i.Zi.newChangeBuffer({trackRemovals:!0}),c=await Ys(i,function(u){return en(fo(fe.fromString(`__bundle__/docs/${u}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",u=>vE(u,a,o).next(l=>(a.apply(u),l)).next(l=>i.Bs.removeMatchingKeysForTargetId(u,c.targetId).next(()=>i.Bs.addMatchingKeys(u,s,c.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(u,l.nr,l.sr)).next(()=>l.nr)))}async function VO(t,e,n=oe()){const r=await Ys(t,en(Ip(e.bundledQuery))),i=V(t);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=Ye(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.qs.saveNamedQuery(s,e);const a=r.withResumeToken(at.EMPTY_BYTE_STRING,o);return i.Ji=i.Ji.insert(a.targetId,a),i.Bs.updateTargetData(s,a).next(()=>i.Bs.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.Bs.addMatchingKeys(s,n,r.targetId)).next(()=>i.qs.saveNamedQuery(s,e))})}function Uy(t,e){return`firestore_clients_${t}_${e}`}function By(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Ph(t,e){return`firestore_targets_${t}_${e}`}class Ou{constructor(e,n,r,i){this.user=e,this.batchId=n,this.state=r,this.error=i}static ar(e,n,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new b(i.error.code,i.error.message))),o?new Ou(e,n,i.state,s):(We("SharedClientState",`Failed to parse mutation state for ID '${n}': ${r}`),null)}hr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class oa{constructor(e,n,r){this.targetId=e,this.state=n,this.error=r}static ar(e,n){const r=JSON.parse(n);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new b(r.error.code,r.error.message))),s?new oa(e,r.state,i):(We("SharedClientState",`Failed to parse target state for ID '${e}': ${n}`),null)}hr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Mu{constructor(e,n){this.clientId=e,this.activeTargetIds=n}static ar(e,n){const r=JSON.parse(n);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=fp();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=u0(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Mu(e,s):(We("SharedClientState",`Failed to parse client data for instance '${e}': ${n}`),null)}}class kp{constructor(e,n){this.clientId=e,this.onlineState=n}static ar(e){const n=JSON.parse(e);return typeof n=="object"&&["Unknown","Online","Offline"].indexOf(n.onlineState)!==-1&&typeof n.clientId=="string"?new kp(n.clientId,n.onlineState):(We("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Md{constructor(){this.activeTargetIds=fp()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Oh{constructor(e,n,r,i,s){this.window=e,this.ii=n,this.persistenceKey=r,this.wr=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this._r=this.mr.bind(this),this.gr=new Ne(ie),this.started=!1,this.yr=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.pr=Uy(this.persistenceKey,this.wr),this.Ir=function(a){return`firestore_sequence_number_${a}`}(this.persistenceKey),this.gr=this.gr.insert(this.wr,new Md),this.Tr=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Er=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ar=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.vr=function(a){return`firestore_online_state_${a}`}(this.persistenceKey),this.Rr=function(a){return`firestore_bundle_loaded_v2_${a}`}(this.persistenceKey),this.window.addEventListener("storage",this._r)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.$i();for(const r of e){if(r===this.wr)continue;const i=this.getItem(Uy(this.persistenceKey,r));if(i){const s=Mu.ar(r,i);s&&(this.gr=this.gr.insert(s.clientId,s))}}this.Pr();const n=this.storage.getItem(this.vr);if(n){const r=this.br(n);r&&this.Vr(r)}for(const r of this.yr)this.mr(r);this.yr=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ir,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Sr(this.gr)}isActiveQueryTarget(e){let n=!1;return this.gr.forEach((r,i)=>{i.activeTargetIds.has(e)&&(n=!0)}),n}addPendingMutation(e){this.Dr(e,"pending")}updateMutationState(e,n,r){this.Dr(e,n,r),this.Cr(e)}addLocalQueryTarget(e){let n="not-current";if(this.isActiveQueryTarget(e)){const r=this.storage.getItem(Ph(this.persistenceKey,e));if(r){const i=oa.ar(e,r);i&&(n=i.state)}}return this.Nr.lr(e),this.Pr(),n}removeLocalQueryTarget(e){this.Nr.dr(e),this.Pr()}isLocalQueryTarget(e){return this.Nr.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Ph(this.persistenceKey,e))}updateQueryState(e,n,r){this.kr(e,n,r)}handleUserChange(e,n,r){n.forEach(i=>{this.Cr(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Mr(e)}notifyBundleLoaded(e){this.$r(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this._r),this.removeItem(this.pr),this.started=!1)}getItem(e){const n=this.storage.getItem(e);return A("SharedClientState","READ",e,n),n}setItem(e,n){A("SharedClientState","SET",e,n),this.storage.setItem(e,n)}removeItem(e){A("SharedClientState","REMOVE",e),this.storage.removeItem(e)}mr(e){const n=e;if(n.storageArea===this.storage){if(A("SharedClientState","EVENT",n.key,n.newValue),n.key===this.pr)return void We("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ii.enqueueRetryable(async()=>{if(this.started){if(n.key!==null){if(this.Tr.test(n.key)){if(n.newValue==null){const r=this.Or(n.key);return this.Fr(r,null)}{const r=this.Br(n.key,n.newValue);if(r)return this.Fr(r.clientId,r)}}else if(this.Er.test(n.key)){if(n.newValue!==null){const r=this.Lr(n.key,n.newValue);if(r)return this.qr(r)}}else if(this.Ar.test(n.key)){if(n.newValue!==null){const r=this.Ur(n.key,n.newValue);if(r)return this.Kr(r)}}else if(n.key===this.vr){if(n.newValue!==null){const r=this.br(n.newValue);if(r)return this.Vr(r)}}else if(n.key===this.Ir){const r=function(i){let s=Jt.ct;if(i!=null)try{const o=JSON.parse(i);H(typeof o=="number"),s=o}catch(o){We("SharedClientState","Failed to read sequence number from WebStorage",o)}return s}(n.newValue);r!==Jt.ct&&this.sequenceNumberHandler(r)}else if(n.key===this.Rr){const r=this.Gr(n.newValue);await Promise.all(r.map(i=>this.syncEngine.Qr(i)))}}}else this.yr.push(n)})}}get Nr(){return this.gr.get(this.wr)}Pr(){this.setItem(this.pr,this.Nr.hr())}Dr(e,n,r){const i=new Ou(this.currentUser,e,n,r),s=By(this.persistenceKey,this.currentUser,e);this.setItem(s,i.hr())}Cr(e){const n=By(this.persistenceKey,this.currentUser,e);this.removeItem(n)}Mr(e){const n={clientId:this.wr,onlineState:e};this.storage.setItem(this.vr,JSON.stringify(n))}kr(e,n,r){const i=Ph(this.persistenceKey,e),s=new oa(e,n,r);this.setItem(i,s.hr())}$r(e){const n=JSON.stringify(Array.from(e));this.setItem(this.Rr,n)}Or(e){const n=this.Tr.exec(e);return n?n[1]:null}Br(e,n){const r=this.Or(e);return Mu.ar(r,n)}Lr(e,n){const r=this.Er.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return Ou.ar(new lt(s),i,n)}Ur(e,n){const r=this.Ar.exec(e),i=Number(r[1]);return oa.ar(i,n)}br(e){return kp.ar(e)}Gr(e){return JSON.parse(e)}async qr(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.jr(e.batchId,e.state,e.error);A("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Kr(e){return this.syncEngine.zr(e.targetId,e.state,e.error)}Fr(e,n){const r=n?this.gr.insert(e,n):this.gr.remove(e),i=this.Sr(this.gr),s=this.Sr(r),o=[],a=[];return s.forEach(c=>{i.has(c)||o.push(c)}),i.forEach(c=>{s.has(c)||a.push(c)}),this.syncEngine.Wr(o,a).then(()=>{this.gr=r})}Vr(e){this.gr.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Sr(e){let n=fp();return e.forEach((r,i)=>{n=n.unionWith(i.activeTargetIds)}),n}}class EE{constructor(){this.Hr=new Md,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,n,r){this.Jr[e]=n}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new Md,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UO{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){A("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){A("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vc=null;function Mh(){return Vc===null?Vc=268435456+Math.round(2147483648*Math.random()):Vc++,"0x"+Vc.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BO={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $O{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection";class qO extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.mo=n+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,n,r,i,s){const o=Mh(),a=this.To(e,n);A("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const c={};return this.Eo(c,i,s),this.Ao(e,a,c,r).then(u=>(A("RestConnection",`Received RPC '${e}' ${o}: `,u),u),u=>{throw kn("RestConnection",`RPC '${e}' ${o} failed with error: `,u,"url: ",a,"request:",r),u})}vo(e,n,r,i,s,o){return this.Io(e,n,r,i,s)}Eo(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+ho,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}To(e,n){const r=BO[e];return`${this.mo}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,n,r,i){const s=Mh();return new Promise((o,a)=>{const c=new VD;c.setWithCredentials(!0),c.listenOnce(MD.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Nh.NO_ERROR:const l=c.getResponseJson();A(xt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(l)),o(l);break;case Nh.TIMEOUT:A(xt,`RPC '${e}' ${s} timed out`),a(new b(w.DEADLINE_EXCEEDED,"Request time out"));break;case Nh.HTTP_ERROR:const h=c.getStatus();if(A(xt,`RPC '${e}' ${s} failed with status:`,h,"response text:",c.getResponseText()),h>0){let d=c.getResponseJson();Array.isArray(d)&&(d=d[0]);const f=d==null?void 0:d.error;if(f&&f.status&&f.message){const m=function(_){const T=_.toLowerCase().replace(/_/g,"-");return Object.values(w).indexOf(T)>=0?T:w.UNKNOWN}(f.status);a(new b(m,f.message))}else a(new b(w.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new b(w.UNAVAILABLE,"Connection failed."));break;default:j()}}finally{A(xt,`RPC '${e}' ${s} completed.`)}});const u=JSON.stringify(i);A(xt,`RPC '${e}' ${s} sending request:`,i),c.send(n,"POST",u,r,15)})}Ro(e,n,r){const i=Mh(),s=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=PD(),a=OD(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.xmlHttpFactory=new FD({})),this.Eo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const l=s.join("");A(xt,`Creating RPC '${e}' stream ${i}: ${l}`,c);const h=o.createWebChannel(l,c);let d=!1,f=!1;const m=new $O({ro:T=>{f?A(xt,`Not sending because RPC '${e}' stream ${i} is closed:`,T):(d||(A(xt,`Opening RPC '${e}' stream ${i} transport.`),h.open(),d=!0),A(xt,`RPC '${e}' stream ${i} sending:`,T),h.send(T))},oo:()=>h.close()}),_=(T,D,O)=>{T.listen(D,N=>{try{O(N)}catch(P){setTimeout(()=>{throw P},0)}})};return _(h,xc.EventType.OPEN,()=>{f||A(xt,`RPC '${e}' stream ${i} transport opened.`)}),_(h,xc.EventType.CLOSE,()=>{f||(f=!0,A(xt,`RPC '${e}' stream ${i} transport closed`),m.wo())}),_(h,xc.EventType.ERROR,T=>{f||(f=!0,kn(xt,`RPC '${e}' stream ${i} transport errored:`,T),m.wo(new b(w.UNAVAILABLE,"The operation could not be completed")))}),_(h,xc.EventType.MESSAGE,T=>{var D;if(!f){const O=T.data[0];H(!!O);const N=O,P=N.error||((D=N[0])===null||D===void 0?void 0:D.error);if(P){A(xt,`RPC '${e}' stream ${i} received error:`,P);const W=P.status;let Z=function(ye){const $e=Ze[ye];if($e!==void 0)return q0($e)}(W),J=P.message;Z===void 0&&(Z=w.INTERNAL,J="Unknown error status: "+W+" with message "+P.message),f=!0,m.wo(new b(Z,J)),h.close()}else A(xt,`RPC '${e}' stream ${i} received:`,O),m._o(O)}}),_(a,LD.STAT_EVENT,T=>{T.stat===Qm.PROXY?A(xt,`RPC '${e}' stream ${i} detected buffering proxy`):T.stat===Qm.NOPROXY&&A(xt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{m.fo()},0),m}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bE(){return typeof window<"u"?window:null}function eu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(t){return new YP(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ii=e,this.timerId=n,this.Po=r,this.bo=i,this.Vo=s,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const n=Math.floor(this.So+this.ko()),r=Math.max(0,Date.now()-this.Co),i=Math.max(0,n-r);i>0&&A("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,i,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,n,r,i,s,o,a,c){this.ii=e,this.$o=r,this.Oo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Rp(e,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():n&&n.code===w.RESOURCE_EXHAUSTED?(We(n.toString()),We("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===w.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Fo===n&&this.Zo(r,i)},r=>{e(()=>{const i=new b(w.UNKNOWN,"Fetching auth token failed: "+r.message);return this.tu(i)})})}Zo(e,n){const r=this.Xo(this.Fo);this.stream=this.eu(e,n),this.stream.uo(()=>{r(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(i=>{r(()=>this.tu(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return A("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return n=>{this.ii.enqueueAndForget(()=>this.Fo===e?n():(A("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jO extends TE{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}eu(e,n){return this.connection.Ro("Listen",e,n)}onMessage(e){this.qo.reset();const n=ZP(this.serializer,e),r=function(i){if(!("targetChange"in i))return K.min();const s=i.targetChange;return s.targetIds&&s.targetIds.length?K.min():s.readTime?Ye(s.readTime):K.min()}(e);return this.listener.nu(n,r)}su(e){const n={};n.database=Va(this.serializer),n.addTarget=function(i,s){let o;const a=s.target;if(o=Cu(a)?{documents:J0(i,a)}:{query:X0(i,a)},o.targetId=s.targetId,s.resumeToken.approximateByteSize()>0){o.resumeToken=K0(i,s.resumeToken);const c=Rd(i,s.expectedCount);c!==null&&(o.expectedCount=c)}else if(s.snapshotVersion.compareTo(K.min())>0){o.readTime=Qs(i,s.snapshotVersion.toTimestamp());const c=Rd(i,s.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,e);const r=tO(this.serializer,e);r&&(n.labels=r),this.Wo(n)}iu(e){const n={};n.database=Va(this.serializer),n.removeTarget=e,this.Wo(n)}}class GO extends TE{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,n){return this.connection.Ro("Write",e,n)}onMessage(e){if(H(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const n=eO(e.writeResults,e.commitTime),r=Ye(e.commitTime);return this.listener.cu(r,n)}return H(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=Va(this.serializer),this.Wo(e)}uu(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Ua(this.serializer,r))};this.Wo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zO extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.lu=!1}fu(){if(this.lu)throw new b(w.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,n,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Io(e,n,r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===w.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new b(w.UNKNOWN,i.toString())})}vo(e,n,r,i){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.vo(e,n,r,s,o,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===w.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new b(w.UNKNOWN,s.toString())})}terminate(){this.lu=!0}}class KO{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(We(n),this.mu=!1):A("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HO{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=s,this.Pu.Yr(o=>{r.enqueueAndForget(async()=>{gi(this)&&(A("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=V(a);c.vu.add(4),await mo(c),c.bu.set("Unknown"),c.vu.delete(4),await vc(c)}(this))})}),this.bu=new KO(r,i)}}async function vc(t){if(gi(t))for(const e of t.Ru)await e(!0)}async function mo(t){for(const e of t.Ru)await e(!1)}function Dl(t,e){const n=V(t);n.Au.has(e.targetId)||(n.Au.set(e.targetId,e),Dp(n)?xp(n):vo(n).Ko()&&Np(n,e))}function Ba(t,e){const n=V(t),r=vo(n);n.Au.delete(e),r.Ko()&&SE(n,e),n.Au.size===0&&(r.Ko()?r.jo():gi(n)&&n.bu.set("Unknown"))}function Np(t,e){if(t.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}vo(t).su(e)}function SE(t,e){t.Vu.qt(e),vo(t).iu(e)}function xp(t){t.Vu=new KP({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),le:e=>t.Au.get(e)||null,ue:()=>t.datastore.serializer.databaseId}),vo(t).start(),t.bu.gu()}function Dp(t){return gi(t)&&!vo(t).Uo()&&t.Au.size>0}function gi(t){return V(t).vu.size===0}function AE(t){t.Vu=void 0}async function WO(t){t.Au.forEach((e,n)=>{Np(t,e)})}async function QO(t,e){AE(t),Dp(t)?(t.bu.Iu(e),xp(t)):t.bu.set("Unknown")}async function YO(t,e,n){if(t.bu.set("Online"),e instanceof z0&&e.state===2&&e.cause)try{await async function(r,i){const s=i.cause;for(const o of i.targetIds)r.Au.has(o)&&(await r.remoteSyncer.rejectListen(o,s),r.Au.delete(o),r.Vu.removeTarget(o))}(t,e)}catch(r){A("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Lu(t,r)}else if(e instanceof Zc?t.Vu.Ht(e):e instanceof G0?t.Vu.ne(e):t.Vu.Xt(e),!n.isEqual(K.min()))try{const r=await yE(t.localStore);n.compareTo(r)>=0&&await function(i,s){const o=i.Vu.ce(s);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=i.Au.get(c);u&&i.Au.set(c,u.withResumeToken(a.resumeToken,s))}}),o.targetMismatches.forEach((a,c)=>{const u=i.Au.get(a);if(!u)return;i.Au.set(a,u.withResumeToken(at.EMPTY_BYTE_STRING,u.snapshotVersion)),SE(i,a);const l=new hr(u.target,a,c,u.sequenceNumber);Np(i,l)}),i.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){A("RemoteStore","Failed to raise snapshot:",r),await Lu(t,r)}}async function Lu(t,e,n){if(!fi(e))throw e;t.vu.add(1),await mo(t),t.bu.set("Offline"),n||(n=()=>yE(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{A("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await vc(t)})}function CE(t,e){return e().catch(n=>Lu(t,n,e))}async function yo(t){const e=V(t),n=ii(e);let r=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;JO(e);)try{const i=await LO(e.localStore,r);if(i===null){e.Eu.length===0&&n.jo();break}r=i.batchId,XO(e,i)}catch(i){await Lu(e,i)}kE(e)&&RE(e)}function JO(t){return gi(t)&&t.Eu.length<10}function XO(t,e){t.Eu.push(e);const n=ii(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function kE(t){return gi(t)&&!ii(t).Uo()&&t.Eu.length>0}function RE(t){ii(t).start()}async function ZO(t){ii(t).hu()}async function eM(t){const e=ii(t);for(const n of t.Eu)e.uu(n.mutations)}async function tM(t,e,n){const r=t.Eu.shift(),i=mp.from(r,e,n);await CE(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await yo(t)}async function nM(t,e){e&&ii(t).ou&&await async function(n,r){if(i=r.code,$0(i)&&i!==w.ABORTED){const s=n.Eu.shift();ii(n).Qo(),await CE(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,r)),await yo(n)}var i}(t,e),kE(t)&&RE(t)}async function qy(t,e){const n=V(t);n.asyncQueue.verifyOperationInProgress(),A("RemoteStore","RemoteStore received new credentials");const r=gi(n);n.vu.add(3),await mo(n),r&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await vc(n)}async function Ld(t,e){const n=V(t);e?(n.vu.delete(2),await vc(n)):e||(n.vu.add(2),await mo(n),n.bu.set("Unknown"))}function vo(t){return t.Su||(t.Su=function(e,n,r){const i=V(e);return i.fu(),new jO(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{uo:WO.bind(null,t),ao:QO.bind(null,t),nu:YO.bind(null,t)}),t.Ru.push(async e=>{e?(t.Su.Qo(),Dp(t)?xp(t):t.bu.set("Unknown")):(await t.Su.stop(),AE(t))})),t.Su}function ii(t){return t.Du||(t.Du=function(e,n,r){const i=V(e);return i.fu(),new GO(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(t.datastore,t.asyncQueue,{uo:ZO.bind(null,t),ao:nM.bind(null,t),au:eM.bind(null,t),cu:tM.bind(null,t)}),t.Ru.push(async e=>{e?(t.Du.Qo(),await yo(t)):(await t.Du.stop(),t.Eu.length>0&&(A("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))})),t.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,a=new Pp(e,n,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new b(w.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wo(t,e){if(We("AsyncQueue",`${e}: ${t}`),fi(t))return new b(w.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e){this.comparator=e?(n,r)=>e(n,r)||L.comparator(n.key,r.key):(n,r)=>L.comparator(n.key,r.key),this.keyedMap=$o(),this.sortedSet=new Ne(this.comparator)}static emptySet(e){return new Os(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Os)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Os;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(){this.Cu=new Ne(L.comparator)}track(e){const n=e.doc.key,r=this.Cu.get(n);r?e.type!==0&&r.type===3?this.Cu=this.Cu.insert(n,e):e.type===3&&r.type!==1?this.Cu=this.Cu.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Cu=this.Cu.remove(n):e.type===1&&r.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):j():this.Cu=this.Cu.insert(n,e)}xu(){const e=[];return this.Cu.inorderTraversal((n,r)=>{e.push(r)}),e}}class Xs{constructor(e,n,r,i,s,o,a,c,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new Xs(e,n,Os.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&dc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rM{constructor(){this.Nu=void 0,this.listeners=[]}}class iM{constructor(){this.queries=new pi(e=>A0(e),dc),this.onlineState="Unknown",this.ku=new Set}}async function Op(t,e){const n=V(t),r=e.query;let i=!1,s=n.queries.get(r);if(s||(i=!0,s=new rM),i)try{s.Nu=await n.onListen(r)}catch(o){const a=wo(o,`Initialization of query '${kd(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,s),s.listeners.push(e),e.Mu(n.onlineState),s.Nu&&e.$u(s.Nu)&&Lp(n)}async function Mp(t,e){const n=V(t),r=e.query;let i=!1;const s=n.queries.get(r);if(s){const o=s.listeners.indexOf(e);o>=0&&(s.listeners.splice(o,1),i=s.listeners.length===0)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function sM(t,e){const n=V(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const a of o.listeners)a.$u(i)&&(r=!0);o.Nu=i}}r&&Lp(n)}function oM(t,e,n){const r=V(t),i=r.queries.get(e);if(i)for(const s of i.listeners)s.onError(n);r.queries.delete(e)}function Lp(t){t.ku.forEach(e=>{e.next()})}class Fp{constructor(e,n,r){this.query=e,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=r||{}}$u(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Xs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),n=!0):this.qu(e,this.onlineState)&&(this.Uu(e),n=!0),this.Bu=e,n}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),n=!0),n}qu(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.Ku||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(e){e=Xs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aM{constructor(e,n){this.Gu=e,this.byteLength=n}Qu(){return"metadata"in this.Gu}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e){this.serializer=e}rr(e){return Wn(this.serializer,e)}ur(e){return e.metadata.exists?Y0(this.serializer,e.document,!1):Oe.newNoDocument(this.rr(e.metadata.name),this.cr(e.metadata.readTime))}cr(e){return Ye(e)}}class cM{constructor(e,n,r){this.ju=e,this.localStore=n,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=NE(e)}zu(e){this.progress.bytesLoaded+=e.byteLength;let n=this.progress.documentsLoaded;if(e.Gu.namedQuery)this.queries.push(e.Gu.namedQuery);else if(e.Gu.documentMetadata){this.documents.push({metadata:e.Gu.documentMetadata}),e.Gu.documentMetadata.exists||++n;const r=fe.fromString(e.Gu.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Gu.document&&(this.documents[this.documents.length-1].document=e.Gu.document,++n);return n!==this.progress.documentsLoaded?(this.progress.documentsLoaded=n,Object.assign({},this.progress)):null}Wu(e){const n=new Map,r=new Gy(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.rr(i.metadata.name);for(const o of i.metadata.queries){const a=(n.get(o)||oe()).add(s);n.set(o,a)}}return n}async complete(){const e=await FO(this.localStore,new Gy(this.serializer),this.documents,this.ju.id),n=this.Wu(this.documents);for(const r of this.queries)await VO(this.localStore,r,n.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Hu:this.collectionGroups,Ju:e}}}function NE(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(e){this.key=e}}class DE{constructor(e){this.key=e}}class PE{constructor(e,n){this.query=e,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=oe(),this.mutatedKeys=oe(),this.tc=k0(e),this.ec=new Os(this.tc)}get nc(){return this.Yu}sc(e,n){const r=n?n.ic:new jy,i=n?n.ec:this.ec;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((l,h)=>{const d=i.get(l),f=fc(this.query,h)?h:null,m=!!d&&this.mutatedKeys.has(d.key),_=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let T=!1;d&&f?d.data.isEqual(f.data)?m!==_&&(r.track({type:3,doc:f}),T=!0):this.rc(d,f)||(r.track({type:2,doc:f}),T=!0,(c&&this.tc(f,c)>0||u&&this.tc(f,u)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),T=!0):d&&!f&&(r.track({type:1,doc:d}),T=!0,(c||u)&&(a=!0)),T&&(f?(o=o.add(f),s=_?s.add(l):s.delete(l)):(o=o.delete(l),s=s.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),s=s.delete(l.key),r.track({type:1,doc:l})}return{ec:o,ic:r,zi:a,mutatedKeys:s}}rc(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const i=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const s=e.ic.xu();s.sort((u,l)=>function(h,d){const f=m=>{switch(m){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j()}};return f(h)-f(d)}(u.type,l.type)||this.tc(u.doc,l.doc)),this.oc(r);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,c=a!==this.Xu;return this.Xu=a,s.length!==0||c?{snapshot:new Xs(this.query,e.ec,i,s,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new jy,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=oe(),this.ec.forEach(r=>{this.ac(r.key)&&(this.Zu=this.Zu.add(r.key))});const n=[];return e.forEach(r=>{this.Zu.has(r)||n.push(new DE(r))}),this.Zu.forEach(r=>{e.has(r)||n.push(new xE(r))}),n}hc(e){this.Yu=e.ir,this.Zu=oe();const n=this.sc(e.documents);return this.applyChanges(n,!0)}lc(){return Xs.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class uM{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class lM{constructor(e){this.key=e,this.fc=!1}}class hM{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new pi(a=>A0(a),dc),this._c=new Map,this.mc=new Set,this.gc=new Ne(L.comparator),this.yc=new Map,this.Ic=new Tp,this.Tc={},this.Ec=new Map,this.Ac=Zi.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function dM(t,e){const n=qp(t);let r,i;const s=n.wc.get(e);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.lc();else{const o=await Ys(n.localStore,en(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,i=await Vp(n,e,r,a==="current",o.resumeToken),n.isPrimaryClient&&Dl(n.remoteStore,o)}return i}async function Vp(t,e,n,r,i){t.Rc=(h,d,f)=>async function(m,_,T,D){let O=_.view.sc(T);O.zi&&(O=await Pu(m.localStore,_.query,!1).then(({documents:W})=>_.view.sc(W,O)));const N=D&&D.targetChanges.get(_.targetId),P=_.view.applyChanges(O,m.isPrimaryClient,N);return Fd(m,_.targetId,P.cc),P.snapshot}(t,h,d,f);const s=await Pu(t.localStore,e,!0),o=new PE(e,s.ir),a=o.sc(s.documents),c=mc.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),u=o.applyChanges(a,t.isPrimaryClient,c);Fd(t,n,u.cc);const l=new uM(e,n,o);return t.wc.set(e,l),t._c.has(n)?t._c.get(n).push(e):t._c.set(n,[e]),u.snapshot}async function fM(t,e){const n=V(t),r=n.wc.get(e),i=n._c.get(r.targetId);if(i.length>1)return n._c.set(r.targetId,i.filter(s=>!dc(s,e))),void n.wc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Js(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),Ba(n.remoteStore,r.targetId),Zs(n,r.targetId)}).catch(di)):(Zs(n,r.targetId),await Js(n.localStore,r.targetId,!0))}async function pM(t,e,n){const r=jp(t);try{const i=await function(s,o){const a=V(s),c=Be.now(),u=o.reduce((d,f)=>d.add(f.key),oe());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",d=>{let f=Zt(),m=oe();return a.Zi.getEntries(d,u).next(_=>{f=_,f.forEach((T,D)=>{D.isValidDocument()||(m=m.add(T))})}).next(()=>a.localDocuments.getOverlayedDocuments(d,f)).next(_=>{l=_;const T=[];for(const D of o){const O=jP(D,l.get(D.key).overlayedDocument);O!=null&&T.push(new Ar(D.key,O,y0(O.value.mapValue),Ue.exists(!0)))}return a.mutationQueue.addMutationBatch(d,c,T,o)}).next(_=>{h=_;const T=_.applyToLocalDocumentSet(l,m);return a.documentOverlayCache.saveOverlays(d,_.batchId,T)})}).then(()=>({batchId:h.batchId,changes:N0(l)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(s,o,a){let c=s.Tc[s.currentUser.toKey()];c||(c=new Ne(ie)),c=c.insert(o,a),s.Tc[s.currentUser.toKey()]=c}(r,i.batchId,n),await Cr(r,i.changes),await yo(r.remoteStore)}catch(i){const s=wo(i,"Failed to persist write");n.reject(s)}}async function OE(t,e){const n=V(t);try{const r=await MO(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.yc.get(s);o&&(H(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.fc=!0:i.modifiedDocuments.size>0?H(o.fc):i.removedDocuments.size>0&&(H(o.fc),o.fc=!1))}),await Cr(n,r,e)}catch(r){await di(r)}}function zy(t,e,n){const r=V(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.wc.forEach((s,o)=>{const a=o.view.Mu(e);a.snapshot&&i.push(a.snapshot)}),function(s,o){const a=V(s);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.Mu(o)&&(c=!0)}),c&&Lp(a)}(r.eventManager,e),i.length&&r.dc.nu(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gM(t,e,n){const r=V(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.yc.get(e),s=i&&i.key;if(s){let o=new Ne(L.comparator);o=o.insert(s,Oe.newNoDocument(s,K.min()));const a=oe().add(s),c=new gc(K.min(),new Map,new Ne(ie),o,a);await OE(r,c),r.gc=r.gc.remove(s),r.yc.delete(e),$p(r)}else await Js(r.localStore,e,!1).then(()=>Zs(r,e,n)).catch(di)}async function mM(t,e){const n=V(t),r=e.batch.batchId;try{const i=await OO(n.localStore,e);Bp(n,r,null),Up(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Cr(n,i)}catch(i){await di(i)}}async function yM(t,e,n){const r=V(t);try{const i=await function(s,o){const a=V(s);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(l=>(H(l!==null),u=l.keys(),a.mutationQueue.removeMutationBatch(c,l))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(r.localStore,e);Bp(r,e,n),Up(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Cr(r,i)}catch(i){await di(i)}}async function vM(t,e){const n=V(t);gi(n.remoteStore)||A("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(s){const o=V(s);return o.persistence.runTransaction("Get highest unacknowledged batch id","readonly",a=>o.mutationQueue.getHighestUnacknowledgedBatchId(a))}(n.localStore);if(r===-1)return void e.resolve();const i=n.Ec.get(r)||[];i.push(e),n.Ec.set(r,i)}catch(r){const i=wo(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function Up(t,e){(t.Ec.get(e)||[]).forEach(n=>{n.resolve()}),t.Ec.delete(e)}function Bp(t,e,n){const r=V(t);let i=r.Tc[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Tc[r.currentUser.toKey()]=i}}function Zs(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t._c.get(e))t.wc.delete(r),n&&t.dc.Pc(r,n);t._c.delete(e),t.isPrimaryClient&&t.Ic.Is(e).forEach(r=>{t.Ic.containsKey(r)||ME(t,r)})}function ME(t,e){t.mc.delete(e.path.canonicalString());const n=t.gc.get(e);n!==null&&(Ba(t.remoteStore,n),t.gc=t.gc.remove(e),t.yc.delete(n),$p(t))}function Fd(t,e,n){for(const r of n)r instanceof xE?(t.Ic.addReference(r.key,e),wM(t,r)):r instanceof DE?(A("SyncEngine","Document no longer in limbo: "+r.key),t.Ic.removeReference(r.key,e),t.Ic.containsKey(r.key)||ME(t,r.key)):j()}function wM(t,e){const n=e.key,r=n.path.canonicalString();t.gc.get(n)||t.mc.has(r)||(A("SyncEngine","New document in limbo: "+n),t.mc.add(r),$p(t))}function $p(t){for(;t.mc.size>0&&t.gc.size<t.maxConcurrentLimboResolutions;){const e=t.mc.values().next().value;t.mc.delete(e);const n=new L(fe.fromString(e)),r=t.Ac.next();t.yc.set(r,new lM(n)),t.gc=t.gc.insert(n,r),Dl(t.remoteStore,new hr(en(fo(n.path)),r,"TargetPurposeLimboResolution",Jt.ct))}}async function Cr(t,e,n){const r=V(t),i=[],s=[],o=[];r.wc.isEmpty()||(r.wc.forEach((a,c)=>{o.push(r.Rc(c,e,n).then(u=>{if((u||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,u!=null&&u.fromCache?"not-current":"current"),u){i.push(u);const l=Cp.Li(c.targetId,u);s.push(l)}}))}),await Promise.all(o),r.dc.nu(i),await async function(a,c){const u=V(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>y.forEach(c,h=>y.forEach(h.Fi,d=>u.persistence.referenceDelegate.addReference(l,h.targetId,d)).next(()=>y.forEach(h.Bi,d=>u.persistence.referenceDelegate.removeReference(l,h.targetId,d)))))}catch(l){if(!fi(l))throw l;A("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const d=u.Ji.get(h),f=d.snapshotVersion,m=d.withLastLimboFreeSnapshotVersion(f);u.Ji=u.Ji.insert(h,m)}}}(r.localStore,s))}async function _M(t,e){const n=V(t);if(!n.currentUser.isEqual(e)){A("SyncEngine","User change. New user:",e.toKey());const r=await mE(n.localStore,e);n.currentUser=e,function(i,s){i.Ec.forEach(o=>{o.forEach(a=>{a.reject(new b(w.CANCELLED,s))})}),i.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Cr(n,r.er)}}function IM(t,e){const n=V(t),r=n.yc.get(e);if(r&&r.fc)return oe().add(r.key);{let i=oe();const s=n._c.get(e);if(!s)return i;for(const o of s){const a=n.wc.get(o);i=i.unionWith(a.view.nc)}return i}}async function EM(t,e){const n=V(t),r=await Pu(n.localStore,e.query,!0),i=e.view.hc(r);return n.isPrimaryClient&&Fd(n,e.targetId,i.cc),i}async function bM(t,e){const n=V(t);return _E(n.localStore,e).then(r=>Cr(n,r))}async function TM(t,e,n,r){const i=V(t),s=await function(o,a){const c=V(o),u=V(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",l=>u.Sn(l,a).next(h=>h?c.localDocuments.getDocuments(l,h):y.resolve(null)))}(i.localStore,e);s!==null?(n==="pending"?await yo(i.remoteStore):n==="acknowledged"||n==="rejected"?(Bp(i,e,r||null),Up(i,e),function(o,a){V(V(o).mutationQueue).Cn(a)}(i.localStore,e)):j(),await Cr(i,s)):A("SyncEngine","Cannot apply mutation batch with id: "+e)}async function SM(t,e){const n=V(t);if(qp(n),jp(n),e===!0&&n.vc!==!0){const r=n.sharedClientState.getAllActiveQueryTargets(),i=await Ky(n,r.toArray());n.vc=!0,await Ld(n.remoteStore,!0);for(const s of i)Dl(n.remoteStore,s)}else if(e===!1&&n.vc!==!1){const r=[];let i=Promise.resolve();n._c.forEach((s,o)=>{n.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(Zs(n,o),Js(n.localStore,o,!0))),Ba(n.remoteStore,o)}),await i,await Ky(n,r),function(s){const o=V(s);o.yc.forEach((a,c)=>{Ba(o.remoteStore,c)}),o.Ic.Ts(),o.yc=new Map,o.gc=new Ne(L.comparator)}(n),n.vc=!1,await Ld(n.remoteStore,!1)}}async function Ky(t,e,n){const r=V(t),i=[],s=[];for(const o of e){let a;const c=r._c.get(o);if(c&&c.length!==0){a=await Ys(r.localStore,en(c[0]));for(const u of c){const l=r.wc.get(u),h=await EM(r,l);h.snapshot&&s.push(h.snapshot)}}else{const u=await wE(r.localStore,o);a=await Ys(r.localStore,u),await Vp(r,LE(u),o,!1,a.resumeToken)}i.push(a)}return r.dc.nu(s),i}function LE(t){return S0(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function AM(t){const e=V(t);return V(V(e.localStore).persistence).$i()}async function CM(t,e,n,r){const i=V(t);if(i.vc)return void A("SyncEngine","Ignoring unexpected query state notification.");const s=i._c.get(e);if(s&&s.length>0)switch(n){case"current":case"not-current":{const o=await _E(i.localStore,C0(s[0])),a=gc.createSynthesizedRemoteEventForCurrentChange(e,n==="current",at.EMPTY_BYTE_STRING);await Cr(i,o,a);break}case"rejected":await Js(i.localStore,e,!0),Zs(i,e,r);break;default:j()}}async function kM(t,e,n){const r=qp(t);if(r.vc){for(const i of e){if(r._c.has(i)){A("SyncEngine","Adding an already active target "+i);continue}const s=await wE(r.localStore,i),o=await Ys(r.localStore,s);await Vp(r,LE(s),o.targetId,!1,o.resumeToken),Dl(r.remoteStore,o)}for(const i of n)r._c.has(i)&&await Js(r.localStore,i,!1).then(()=>{Ba(r.remoteStore,i),Zs(r,i)}).catch(di)}}function qp(t){const e=V(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=OE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=IM.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gM.bind(null,e),e.dc.nu=sM.bind(null,e.eventManager),e.dc.Pc=oM.bind(null,e.eventManager),e}function jp(t){const e=V(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mM.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yM.bind(null,e),e}function RM(t,e,n){const r=V(t);(async function(i,s,o){try{const a=await s.getMetadata();if(await function(h,d){const f=V(h),m=Ye(d.createTime);return f.persistence.runTransaction("hasNewerBundle","readonly",_=>f.qs.getBundleMetadata(_,d.id)).then(_=>!!_&&_.createTime.compareTo(m)>=0)}(i.localStore,a))return await s.close(),o._completeWith(function(h){return{taskState:"Success",documentsLoaded:h.totalDocuments,bytesLoaded:h.totalBytes,totalDocuments:h.totalDocuments,totalBytes:h.totalBytes}}(a)),Promise.resolve(new Set);o._updateProgress(NE(a));const c=new cM(a,i.localStore,s.serializer);let u=await s.bc();for(;u;){const h=await c.zu(u);h&&o._updateProgress(h),u=await s.bc()}const l=await c.complete();return await Cr(i,l.Ju,void 0),await function(h,d){const f=V(h);return f.persistence.runTransaction("Save bundle","readwrite",m=>f.qs.saveBundleMetadata(m,d))}(i.localStore,a),o._completeWith(l.progress),Promise.resolve(l.Hu)}catch(a){return kn("SyncEngine",`Loading bundle failed with ${a}`),o._failWith(a),Promise.resolve(new Set)}})(r,e,n).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class Vd{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=yc(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return gE(this.persistence,new pE,e.initialUser,this.serializer)}createPersistence(e){return new fE(xl.zs,this.serializer)}createSharedClientState(e){return new EE}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class FE extends Vd{constructor(e,n,r){super(),this.Vc=e,this.cacheSizeBytes=n,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Vc.initialize(this,e),await jp(this.Vc.syncEngine),await yo(this.Vc.remoteStore),await this.persistence.Ii(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return gE(this.persistence,new pE,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,n){const r=this.persistence.referenceDelegate.garbageCollector;return new vO(r,e.asyncQueue,n)}createIndexBackfillerScheduler(e,n){const r=new tP(n,this.persistence);return new eP(e.asyncQueue,r)}createPersistence(e){const n=Ap(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Yt.withCacheSize(this.cacheSizeBytes):Yt.DEFAULT;return new Sp(this.synchronizeTabs,n,e.clientId,r,e.asyncQueue,bE(),eu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new EE}}class NM extends FE{constructor(e,n){super(e,n,!1),this.Vc=e,this.cacheSizeBytes=n,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const n=this.Vc.syncEngine;this.sharedClientState instanceof Oh&&(this.sharedClientState.syncEngine={jr:TM.bind(null,n),zr:CM.bind(null,n),Wr:kM.bind(null,n),$i:AM.bind(null,n),Qr:bM.bind(null,n)},await this.sharedClientState.start()),await this.persistence.Ii(async r=>{await SM(this.Vc.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){const n=bE();if(!Oh.D(n))throw new b(w.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Ap(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Oh(n,e.asyncQueue,r,e.clientId,e.initialUser)}}class Gp{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>zy(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_M.bind(null,this.syncEngine),await Ld(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new iM}createDatastore(e){const n=yc(e.databaseInfo.databaseId),r=(i=e.databaseInfo,new qO(i));var i;return function(s,o,a,c){return new zO(s,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,i=e.asyncQueue,s=a=>zy(this.syncEngine,a,0),o=$y.D()?new $y:new UO,new HO(n,r,i,s,o);var n,r,i,s,o}createSyncEngine(e,n){return function(r,i,s,o,a,c,u){const l=new hM(r,i,s,o,a,c);return u&&(l.vc=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=V(e);A("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await mo(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):We("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xM{constructor(e,n){this.Cc=e,this.serializer=n,this.metadata=new ht,this.buffer=new Uint8Array,this.xc=new TextDecoder("utf-8"),this.Nc().then(r=>{r&&r.Qu()?this.metadata.resolve(r.Gu.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Gu)}`))},r=>this.metadata.reject(r))}close(){return this.Cc.cancel()}async getMetadata(){return this.metadata.promise}async bc(){return await this.getMetadata(),this.Nc()}async Nc(){const e=await this.kc();if(e===null)return null;const n=this.xc.decode(e),r=Number(n);isNaN(r)&&this.Mc(`length string (${n}) is not valid number`);const i=await this.$c(r);return new aM(JSON.parse(i),e.length+r)}Oc(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async kc(){for(;this.Oc()<0&&!await this.Fc(););if(this.buffer.length===0)return null;const e=this.Oc();e<0&&this.Mc("Reached the end of bundle when a length string is expected.");const n=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),n}async $c(e){for(;this.buffer.length<e;)await this.Fc()&&this.Mc("Reached the end of bundle when more is expected.");const n=this.xc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),n}Mc(e){throw this.Cc.cancel(),new Error(`Invalid bundle format: ${e}`)}async Fc(){const e=await this.Cc.read();if(!e.done){const n=new Uint8Array(this.buffer.length+e.value.length);n.set(this.buffer),n.set(e.value,this.buffer.length),this.buffer=n}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DM{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new b(w.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const n=await async function(r,i){const s=V(r),o=Va(s.serializer)+"/documents",a={documents:i.map(h=>Fa(s.serializer,h))},c=await s.vo("BatchGetDocuments",o,a,i.length),u=new Map;c.forEach(h=>{const d=XP(s.serializer,h);u.set(d.key.toString(),d)});const l=[];return i.forEach(h=>{const d=u.get(h.toString());H(!!d),l.push(d)}),l}(this.datastore,e);return n.forEach(r=>this.recordVersion(r)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastWriteError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new go(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,r)=>{const i=L.fromPath(r);this.mutations.push(new pp(i,this.precondition(i)))}),await async function(n,r){const i=V(n),s=Va(i.serializer)+"/documents",o={writes:r.map(a=>Ua(i.serializer,a))};await i.Io("Commit",s,o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw j();n=K.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!n.isEqual(r))throw new b(w.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(K.min())?Ue.exists(!1):Ue.updateTime(n):Ue.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(K.min()))throw new b(w.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ue.updateTime(n)}return Ue.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PM{constructor(e,n,r,i,s){this.asyncQueue=e,this.datastore=n,this.options=r,this.updateFunction=i,this.deferred=s,this.Bc=r.maxAttempts,this.qo=new Rp(this.asyncQueue,"transaction_retry")}run(){this.Bc-=1,this.Lc()}Lc(){this.qo.No(async()=>{const e=new DM(this.datastore),n=this.qc(e);n&&n.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.Uc(i)}))}).catch(r=>{this.Uc(r)})})}qc(e){try{const n=this.updateFunction(e);return!lc(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}Uc(e){this.Bc>0&&this.Kc(e)?(this.Bc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Lc(),Promise.resolve()))):this.deferred.reject(e)}Kc(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!$0(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OM{constructor(e,n,r,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=lt.UNAUTHENTICATED,this.clientId=n0.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{A("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(A("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new b(w.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ht;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=wo(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function tu(t,e){t.asyncQueue.verifyOperationInProgress(),A("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await mE(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Ud(t,e){t.asyncQueue.verifyOperationInProgress();const n=await zp(t);A("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(i=>qy(e.remoteStore,i)),t.setAppCheckTokenChangeListener((i,s)=>qy(e.remoteStore,s)),t._onlineComponents=e}function VE(t){return t.name==="FirebaseError"?t.code===w.FAILED_PRECONDITION||t.code===w.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function zp(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){A("FirestoreClient","Using user provided OfflineComponentProvider");try{await tu(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!VE(n))throw n;kn("Error using user provided cache. Falling back to memory cache: "+n),await tu(t,new Vd)}}else A("FirestoreClient","Using default OfflineComponentProvider"),await tu(t,new Vd);return t._offlineComponents}async function Ol(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(A("FirestoreClient","Using user provided OnlineComponentProvider"),await Ud(t,t._uninitializedComponentsProvider._online)):(A("FirestoreClient","Using default OnlineComponentProvider"),await Ud(t,new Gp))),t._onlineComponents}function UE(t){return zp(t).then(e=>e.persistence)}function Kp(t){return zp(t).then(e=>e.localStore)}function BE(t){return Ol(t).then(e=>e.remoteStore)}function Hp(t){return Ol(t).then(e=>e.syncEngine)}function MM(t){return Ol(t).then(e=>e.datastore)}async function eo(t){const e=await Ol(t),n=e.eventManager;return n.onListen=dM.bind(null,e.syncEngine),n.onUnlisten=fM.bind(null,e.syncEngine),n}function LM(t){return t.asyncQueue.enqueue(async()=>{const e=await UE(t),n=await BE(t);return e.setNetworkEnabled(!0),function(r){const i=V(r);return i.vu.delete(0),vc(i)}(n)})}function FM(t){return t.asyncQueue.enqueue(async()=>{const e=await UE(t),n=await BE(t);return e.setNetworkEnabled(!1),async function(r){const i=V(r);i.vu.add(0),await mo(i),i.bu.set("Offline")}(n)})}function VM(t,e){const n=new ht;return t.asyncQueue.enqueueAndForget(async()=>async function(r,i,s){try{const o=await function(a,c){const u=V(a);return u.persistence.runTransaction("read document","readonly",l=>u.localDocuments.getDocument(l,c))}(r,i);o.isFoundDocument()?s.resolve(o):o.isNoDocument()?s.resolve(null):s.reject(new b(w.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(o){const a=wo(o,`Failed to get document '${i} from cache`);s.reject(a)}}(await Kp(t),e,n)),n.promise}function $E(t,e,n={}){const r=new ht;return t.asyncQueue.enqueueAndForget(async()=>function(i,s,o,a,c){const u=new Pl({next:h=>{s.enqueueAndForget(()=>Mp(i,l));const d=h.docs.has(o);!d&&h.fromCache?c.reject(new b(w.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new b(w.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new Fp(fo(o.path),u,{includeMetadataChanges:!0,Ku:!0});return Op(i,l)}(await eo(t),t.asyncQueue,e,n,r)),r.promise}function UM(t,e){const n=new ht;return t.asyncQueue.enqueueAndForget(async()=>async function(r,i,s){try{const o=await Pu(r,i,!0),a=new PE(i,o.ir),c=a.sc(o.documents),u=a.applyChanges(c,!1);s.resolve(u.snapshot)}catch(o){const a=wo(o,`Failed to execute query '${i} against cache`);s.reject(a)}}(await Kp(t),e,n)),n.promise}function qE(t,e,n={}){const r=new ht;return t.asyncQueue.enqueueAndForget(async()=>function(i,s,o,a,c){const u=new Pl({next:h=>{s.enqueueAndForget(()=>Mp(i,l)),h.fromCache&&a.source==="server"?c.reject(new b(w.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new Fp(o,u,{includeMetadataChanges:!0,Ku:!0});return Op(i,l)}(await eo(t),t.asyncQueue,e,n,r)),r.promise}function BM(t,e){const n=new Pl(e);return t.asyncQueue.enqueueAndForget(async()=>function(r,i){V(r).ku.add(i),i.next()}(await eo(t),n)),()=>{n.Dc(),t.asyncQueue.enqueueAndForget(async()=>function(r,i){V(r).ku.delete(i)}(await eo(t),n))}}function $M(t,e,n,r){const i=function(s,o){let a;return a=typeof s=="string"?j0().encode(s):s,function(c,u){return new xM(c,u)}(function(c,u){if(c instanceof Uint8Array)return Hy(c,u);if(c instanceof ArrayBuffer)return Hy(new Uint8Array(c),u);if(c instanceof ReadableStream)return c.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(a),o)}(n,yc(e));t.asyncQueue.enqueueAndForget(async()=>{RM(await Hp(t),i,r)})}function qM(t,e){return t.asyncQueue.enqueue(async()=>function(n,r){const i=V(n);return i.persistence.runTransaction("Get named query","readonly",s=>i.qs.getNamedQuery(s,r))}(await Kp(t),e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wy=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(t,e,n){if(!n)throw new b(w.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function GE(t,e,n,r){if(e===!0&&r===!0)throw new b(w.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Qy(t){if(!L.isDocumentKey(t))throw new b(w.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Yy(t){if(L.isDocumentKey(t))throw new b(w.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Ml(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":j()}function pe(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new b(w.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ml(t);throw new b(w.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function zE(t,e){if(e<=0)throw new b(w.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new b(w.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new b(w.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}GE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jE((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new b(w.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new b(w.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new b(w.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,n.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var n,r}}class wc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jy({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new b(w.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new b(w.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jy(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new qD;switch(n.type){case"firstParty":return new KD(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new b(w.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Wy.get(e);n&&(A("ComponentProvider","Removing Datastore"),Wy.delete(e),n.terminate())}(this),Promise.resolve()}}function jM(t,e,n,r={}){var i;const s=(t=pe(t,wc))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&kn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=lt.MOCK_USER;else{a=lC(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new b(w.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new lt(u)}t._authCredentials=new jD(new t0(a,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Qn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Le(this.firestore,e,this._key)}}class Ct{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ct(this.firestore,e,this._query)}}class Qn extends Ct{constructor(e,n,r){super(e,n,fo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Le(this.firestore,null,new L(e))}withConverter(e){return new Qn(this.firestore,e,this._path)}}function KE(t,e,...n){if(t=X(t),Wp("collection","path",e),t instanceof wc){const r=fe.fromString(e,...n);return Yy(r),new Qn(t,null,r)}{if(!(t instanceof Le||t instanceof Qn))throw new b(w.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(fe.fromString(e,...n));return Yy(r),new Qn(t.firestore,null,r)}}function GM(t,e){if(t=pe(t,wc),Wp("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new b(w.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Ct(t,null,function(n){return new Sr(fe.emptyPath(),n)}(e))}function Fu(t,e,...n){if(t=X(t),arguments.length===1&&(e=n0.A()),Wp("doc","path",e),t instanceof wc){const r=fe.fromString(e,...n);return Qy(r),new Le(t,null,new L(r))}{if(!(t instanceof Le||t instanceof Qn))throw new b(w.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(fe.fromString(e,...n));return Qy(r),new Le(t.firestore,t instanceof Qn?t.converter:null,new L(r))}}function HE(t,e){return t=X(t),e=X(e),(t instanceof Le||t instanceof Qn)&&(e instanceof Le||e instanceof Qn)&&t.firestore===e.firestore&&t.path===e.path&&t.converter===e.converter}function WE(t,e){return t=X(t),e=X(e),t instanceof Ct&&e instanceof Ct&&t.firestore===e.firestore&&dc(t._query,e._query)&&t.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zM{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Rp(this,"async_queue_retry"),this.Xc=()=>{const n=eu();n&&A("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const e=eu();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const n=eu();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new ht;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!fi(e))throw e;A("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const n=this.Gc.then(()=>(this.Hc=!0,e().catch(r=>{this.Wc=r,this.Hc=!1;const i=function(s){let o=s.message||"";return s.stack&&(o=s.stack.includes(s.message)?s.stack:s.message+`
`+s.stack),o}(r);throw We("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.Hc=!1,r))));return this.Gc=n,n}enqueueAfterDelay(e,n,r){this.Zc(),this.Yc.indexOf(e)>-1&&(n=0);const i=Pp.createAndSchedule(this,e,n,r,s=>this.na(s));return this.zc.push(i),i}Zc(){this.Wc&&j()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const n of this.zc)if(n.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const n=this.zc.indexOf(e);this.zc.splice(n,1)}}function Bd(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const r=e;for(const i of n)if(i in r&&typeof r[i]=="function")return!0;return!1}(t,["next","error","complete"])}class KM{constructor(){this._progressObserver={},this._taskCompletionResolver=new ht,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,n,r){this._progressObserver={next:e,error:n,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,n){return this._taskCompletionResolver.promise.then(e,n)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HM=-1;class He extends wc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new zM,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||QE(this),this._firestoreClient.terminate()}}function mt(t){return t._firestoreClient||QE(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function QE(t){var e,n,r;const i=t._freezeSettings(),s=function(o,a,c,u){return new EP(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,jE(u.experimentalLongPollingOptions),u.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._firestoreClient=new OM(t._authCredentials,t._appCheckCredentials,t._queue,s),!((n=i.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.cache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.cache.kind,_offline:i.cache._offlineComponentProvider,_online:i.cache._onlineComponentProvider})}function WM(t,e){JE(t=pe(t,He));const n=mt(t);if(n._uninitializedComponentsProvider)throw new b(w.FAILED_PRECONDITION,"SDK cache is already specified.");kn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const r=t._freezeSettings(),i=new Gp;return YE(n,i,new FE(i,r.cacheSizeBytes,e==null?void 0:e.forceOwnership))}function QM(t){JE(t=pe(t,He));const e=mt(t);if(e._uninitializedComponentsProvider)throw new b(w.FAILED_PRECONDITION,"SDK cache is already specified.");kn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=t._freezeSettings(),r=new Gp;return YE(e,r,new NM(r,n.cacheSizeBytes))}function YE(t,e,n){const r=new ht;return t.asyncQueue.enqueue(async()=>{try{await tu(t,n),await Ud(t,e),r.resolve()}catch(i){const s=i;if(!VE(s))throw s;kn("Error enabling indexeddb cache. Falling back to memory cache: "+s),r.reject(s)}}).then(()=>r.promise)}function YM(t){if(t._initialized&&!t._terminated)throw new b(w.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new ht;return t._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!_n.D())return Promise.resolve();const r=n+"main";await _n.delete(r)}(Ap(t._databaseId,t._persistenceKey)),e.resolve()}catch(n){e.reject(n)}}),e.promise}function JM(t){return function(e){const n=new ht;return e.asyncQueue.enqueueAndForget(async()=>vM(await Hp(e),n)),n.promise}(mt(t=pe(t,He)))}function XM(t){return LM(mt(t=pe(t,He)))}function ZM(t){return FM(mt(t=pe(t,He)))}function eL(t,e){const n=mt(t=pe(t,He)),r=new KM;return $M(n,t._databaseId,e,r),r}function tL(t,e){return qM(mt(t=pe(t,He)),e).then(n=>n?new Ct(t,null,n.query):null)}function JE(t){if(t._initialized||t._terminated)throw new b(w.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this._byteString=e}static fromBase64String(e){try{return new er(at.fromBase64String(e))}catch(n){throw new b(w.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new er(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new b(w.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new b(w.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new b(w.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nL=/^__.*__$/;class rL{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Ar(e,this.data,this.fieldMask,n,this.fieldTransforms):new po(e,this.data,n,this.fieldTransforms)}}class XE{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Ar(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function ZE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j()}}class Fl{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.ua(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new Fl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.aa({path:r,la:!1});return i.fa(e),i}da(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.aa({path:r,la:!1});return i.ua(),i}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return Vu(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(ZE(this.ca)&&nL.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class iL{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||yc(e)}ya(e,n,r,i=!1){return new Fl({ca:e,methodName:n,ga:r,path:Qe.emptyPath(),la:!1,ma:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function os(t){const e=t._freezeSettings(),n=yc(t._databaseId);return new iL(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Vl(t,e,n,r,i,s={}){const o=t.ya(s.merge||s.mergeFields?2:0,e,n,i);Xp("Data must be an object, but it was:",o,r);const a=nb(r,o);let c,u;if(s.merge)c=new Xt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const l=[];for(const h of s.mergeFields){const d=$d(e,h,n);if(!o.contains(d))throw new b(w.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);ib(l,d)||l.push(d)}c=new Xt(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new rL(new It(a),c,u)}class _c extends ss{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof _c}}function eb(t,e,n){return new Fl({ca:3,ga:e.settings.ga,methodName:t._methodName,la:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Qp extends ss{_toFieldTransform(e){return new pc(e.path,new Hs)}isEqual(e){return e instanceof Qp}}class sL extends ss{constructor(e,n){super(e),this.pa=n}_toFieldTransform(e){const n=eb(this,e,!0),r=this.pa.map(s=>as(s,n)),i=new Qi(r);return new pc(e.path,i)}isEqual(e){return this===e}}class oL extends ss{constructor(e,n){super(e),this.pa=n}_toFieldTransform(e){const n=eb(this,e,!0),r=this.pa.map(s=>as(s,n)),i=new Yi(r);return new pc(e.path,i)}isEqual(e){return this===e}}class aL extends ss{constructor(e,n){super(e),this.Ia=n}_toFieldTransform(e){const n=new Ws(e.serializer,O0(e.serializer,this.Ia));return new pc(e.path,n)}isEqual(e){return this===e}}function Yp(t,e,n,r){const i=t.ya(1,e,n);Xp("Data must be an object, but it was:",i,r);const s=[],o=It.empty();is(r,(c,u)=>{const l=Zp(e,c,n);u=X(u);const h=i.da(l);if(u instanceof _c)s.push(l);else{const d=as(u,h);d!=null&&(s.push(l),o.set(l,d))}});const a=new Xt(s);return new XE(o,a,i.fieldTransforms)}function Jp(t,e,n,r,i,s){const o=t.ya(1,e,n),a=[$d(e,r,n)],c=[i];if(s.length%2!=0)throw new b(w.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)a.push($d(e,s[d])),c.push(s[d+1]);const u=[],l=It.empty();for(let d=a.length-1;d>=0;--d)if(!ib(u,a[d])){const f=a[d];let m=c[d];m=X(m);const _=o.da(f);if(m instanceof _c)u.push(f);else{const T=as(m,_);T!=null&&(u.push(f),l.set(f,T))}}const h=new Xt(u);return new XE(l,h,o.fieldTransforms)}function tb(t,e,n,r=!1){return as(n,t.ya(r?4:3,e))}function as(t,e){if(rb(t=X(t)))return Xp("Unsupported field value:",e,t),nb(t,e);if(t instanceof ss)return function(n,r){if(!ZE(r.ca))throw r._a(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r._a(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(n,r){const i=[];let s=0;for(const o of n){let a=as(o,r.wa(s));a==null&&(a={nullValue:"NULL_VALUE"}),i.push(a),s++}return{arrayValue:{values:i}}}(t,e)}return function(n,r){if((n=X(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return O0(r.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Be.fromDate(n);return{timestampValue:Qs(r.serializer,i)}}if(n instanceof Be){const i=new Be(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Qs(r.serializer,i)}}if(n instanceof Ll)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof er)return{bytesValue:K0(r.serializer,n._byteString)};if(n instanceof Le){const i=r.databaseId,s=n.firestore._databaseId;if(!s.isEqual(i))throw r._a(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:_p(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r._a(`Unsupported field value: ${Ml(n)}`)}(t,e)}function nb(t,e){const n={};return p0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):is(t,(r,i)=>{const s=as(i,e.ha(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function rb(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Be||t instanceof Ll||t instanceof er||t instanceof Le||t instanceof ss)}function Xp(t,e,n){if(!rb(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=Ml(n);throw r==="an object"?e._a(t+" a custom object"):e._a(t+" "+r)}}function $d(t,e,n){if((e=X(e))instanceof si)return e._internalPath;if(typeof e=="string")return Zp(t,e);throw Vu("Field path arguments must be of type string or ",t,!1,void 0,n)}const cL=new RegExp("[~\\*/\\[\\]]");function Zp(t,e,n){if(e.search(cL)>=0)throw Vu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new si(...e.split("."))._internalPath}catch{throw Vu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Vu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new b(w.INVALID_ARGUMENT,a+t+c)}function ib(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new uL(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Ul("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class uL extends $a{data(){return super.data()}}function Ul(t,e){return typeof e=="string"?Zp(t,e):e instanceof si?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sb(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new b(w.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class eg{}class Ic extends eg{}function Pr(t,e,...n){let r=[];e instanceof eg&&r.push(e),r=r.concat(n),function(i){const s=i.filter(a=>a instanceof tg).length,o=i.filter(a=>a instanceof Bl).length;if(s>1||s>0&&o>0)throw new b(w.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class Bl extends Ic{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Bl(e,n,r)}_apply(e){const n=this._parse(e);return ab(e._query,n),new Ct(e.firestore,e.converter,Cd(e._query,n))}_parse(e){const n=os(e.firestore);return function(i,s,o,a,c,u,l){let h;if(c.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new b(w.INVALID_ARGUMENT,`Invalid Query. You can't perform '${u}' queries on documentId().`);if(u==="in"||u==="not-in"){Zy(l,u);const d=[];for(const f of l)d.push(Xy(a,i,f));h={arrayValue:{values:d}}}else h=Xy(a,i,l)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||Zy(l,u),h=tb(o,s,l,u==="in"||u==="not-in");return ce.create(c,u,h)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function lL(t,e,n){const r=e,i=Ul("where",t);return Bl._create(i,r,n)}class tg extends eg{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new tg(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:be.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,i){let s=r;const o=i.getFlattenedFilters();for(const a of o)ab(s,a),s=Cd(s,a)}(e._query,n),new Ct(e.firestore,e.converter,Cd(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ng extends Ic{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new ng(e,n)}_apply(e){const n=function(r,i,s){if(r.startAt!==null)throw new b(w.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new b(w.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new Ps(i,s);return function(a,c){if(hp(a)===null){const u=Al(a);u!==null&&cb(a,u,c.field)}}(r,o),o}(e._query,this._field,this._direction);return new Ct(e.firestore,e.converter,function(r,i){const s=r.explicitOrderBy.concat([i]);return new Sr(r.path,r.collectionGroup,s,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function hL(t,e="asc"){const n=e,r=Ul("orderBy",t);return ng._create(r,n)}class $l extends Ic{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new $l(e,n,r)}_apply(e){return new Ct(e.firestore,e.converter,Ru(e._query,this._limit,this._limitType))}}function dL(t){return zE("limit",t),$l._create("limit",t,"F")}function fL(t){return zE("limitToLast",t),$l._create("limitToLast",t,"L")}class ql extends Ic{constructor(e,n,r){super(),this.type=e,this._docOrFields=n,this._inclusive=r}static _create(e,n,r){return new ql(e,n,r)}_apply(e){const n=ob(e,this.type,this._docOrFields,this._inclusive);return new Ct(e.firestore,e.converter,function(r,i){return new Sr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,i,r.endAt)}(e._query,n))}}function pL(...t){return ql._create("startAt",t,!0)}function gL(...t){return ql._create("startAfter",t,!1)}class jl extends Ic{constructor(e,n,r){super(),this.type=e,this._docOrFields=n,this._inclusive=r}static _create(e,n,r){return new jl(e,n,r)}_apply(e){const n=ob(e,this.type,this._docOrFields,this._inclusive);return new Ct(e.firestore,e.converter,function(r,i){return new Sr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,i)}(e._query,n))}}function mL(...t){return jl._create("endBefore",t,!1)}function yL(...t){return jl._create("endAt",t,!0)}function ob(t,e,n,r){if(n[0]=X(n[0]),n[0]instanceof $a)return function(i,s,o,a,c){if(!a)throw new b(w.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const u=[];for(const l of $i(i))if(l.field.isKeyField())u.push(Hi(s,a.key));else{const h=a.data.field(l.field);if(Sl(h))throw new b(w.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+l.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(h===null){const d=l.field.canonicalString();throw new b(w.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${d}' (used as the orderBy) does not exist.`)}u.push(h)}return new ri(u,c)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const i=os(t.firestore);return function(s,o,a,c,u,l){const h=s.explicitOrderBy;if(u.length>h.length)throw new b(w.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const d=[];for(let f=0;f<u.length;f++){const m=u[f];if(h[f].field.isKeyField()){if(typeof m!="string")throw new b(w.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof m}`);if(!dp(s)&&m.indexOf("/")!==-1)throw new b(w.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${m}' contains a slash.`);const _=s.path.child(fe.fromString(m));if(!L.isDocumentKey(_))throw new b(w.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${_}' is not because it contains an odd number of segments.`);const T=new L(_);d.push(Hi(o,T))}else{const _=tb(a,c,m);d.push(_)}}return new ri(d,l)}(t._query,t.firestore._databaseId,i,e,n,r)}}function Xy(t,e,n){if(typeof(n=X(n))=="string"){if(n==="")throw new b(w.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!dp(e)&&n.indexOf("/")!==-1)throw new b(w.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(fe.fromString(n));if(!L.isDocumentKey(r))throw new b(w.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Hi(t,new L(r))}if(n instanceof Le)return Hi(t,n._key);throw new b(w.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ml(n)}.`)}function Zy(t,e){if(!Array.isArray(t)||t.length===0)throw new b(w.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ab(t,e){if(e.isInequality()){const r=Al(t),i=e.field;if(r!==null&&!r.isEqual(i))throw new b(w.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${i.toString()}'`);const s=hp(t);s!==null&&cb(t,i,s)}const n=function(r,i){for(const s of r)for(const o of s.getFlattenedFilters())if(i.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new b(w.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new b(w.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function cb(t,e,n){if(!n.isEqual(e))throw new b(w.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}class rg{convertValue(e,n="none"){switch(Ki(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ze(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ei(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw j()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return is(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertGeoPoint(e){return new Ll(ze(e.latitude),ze(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=up(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Oa(e));default:return null}}convertTimestamp(e){const n=Zr(e);return new Be(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=fe.fromString(e);H(nE(r));const i=new ti(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(n)||We(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class vL extends rg{constructor(e){super(),this.firestore=e}convertBytes(e){return new er(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Le(this.firestore,null,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ir extends $a{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new aa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Ul("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class aa extends Ir{data(e={}){return super.data(e)}}class oi{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Pi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new aa(this._firestore,this._userDataWriter,r.key,r,new Pi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new b(w.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let s=0;return r._snapshot.docChanges.map(o=>{const a=new aa(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Pi(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:s++}})}{let s=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>i||o.type!==3).map(o=>{const a=new aa(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Pi(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,u=-1;return o.type!==0&&(c=s.indexOf(o.doc.key),s=s.delete(o.doc.key)),o.type!==1&&(s=s.add(o.doc),u=s.indexOf(o.doc.key)),{type:wL(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function wL(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j()}}function ub(t,e){return t instanceof Ir&&e instanceof Ir?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(t._document===null?e._document===null:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof oi&&e instanceof oi&&t._firestore===e._firestore&&WE(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _L(t){t=pe(t,Le);const e=pe(t.firestore,He);return $E(mt(e),t._key).then(n=>ig(e,t,n))}class cs extends rg{constructor(e){super(),this.firestore=e}convertBytes(e){return new er(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Le(this.firestore,null,n)}}function IL(t){t=pe(t,Le);const e=pe(t.firestore,He),n=mt(e),r=new cs(e);return VM(n,t._key).then(i=>new Ir(e,r,t._key,i,new Pi(i!==null&&i.hasLocalMutations,!0),t.converter))}function EL(t){t=pe(t,Le);const e=pe(t.firestore,He);return $E(mt(e),t._key,{source:"server"}).then(n=>ig(e,t,n))}function bL(t){t=pe(t,Ct);const e=pe(t.firestore,He),n=mt(e),r=new cs(e);return sb(t._query),qE(n,t._query).then(i=>new oi(e,r,t,i))}function TL(t){t=pe(t,Ct);const e=pe(t.firestore,He),n=mt(e),r=new cs(e);return UM(n,t._query).then(i=>new oi(e,r,t,i))}function SL(t){t=pe(t,Ct);const e=pe(t.firestore,He),n=mt(e),r=new cs(e);return qE(n,t._query,{source:"server"}).then(i=>new oi(e,r,t,i))}function ev(t,e,n){t=pe(t,Le);const r=pe(t.firestore,He),i=Gl(t.converter,e,n);return Ec(r,[Vl(os(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Ue.none())])}function tv(t,e,n,...r){t=pe(t,Le);const i=pe(t.firestore,He),s=os(i);let o;return o=typeof(e=X(e))=="string"||e instanceof si?Jp(s,"updateDoc",t._key,e,n,r):Yp(s,"updateDoc",t._key,e),Ec(i,[o.toMutation(t._key,Ue.exists(!0))])}function AL(t){return Ec(pe(t.firestore,He),[new go(t._key,Ue.none())])}function CL(t,e){const n=pe(t.firestore,He),r=Fu(t),i=Gl(t.converter,e);return Ec(n,[Vl(os(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,Ue.exists(!1))]).then(()=>r)}function lb(t,...e){var n,r,i;t=X(t);let s={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Bd(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges};if(Bd(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(i=h.complete)===null||i===void 0?void 0:i.bind(h)}let c,u,l;if(t instanceof Le)u=pe(t.firestore,He),l=fo(t._key.path),c={next:h=>{e[o]&&e[o](ig(u,t,h))},error:e[o+1],complete:e[o+2]};else{const h=pe(t,Ct);u=pe(h.firestore,He),l=h._query;const d=new cs(u);c={next:f=>{e[o]&&e[o](new oi(u,d,h,f))},error:e[o+1],complete:e[o+2]},sb(t._query)}return function(h,d,f,m){const _=new Pl(m),T=new Fp(d,_,f);return h.asyncQueue.enqueueAndForget(async()=>Op(await eo(h),T)),()=>{_.Dc(),h.asyncQueue.enqueueAndForget(async()=>Mp(await eo(h),T))}}(mt(u),l,a,c)}function kL(t,e){return BM(mt(t=pe(t,He)),Bd(e)?e:{next:e})}function Ec(t,e){return function(n,r){const i=new ht;return n.asyncQueue.enqueueAndForget(async()=>pM(await Hp(n),r,i)),i.promise}(mt(t),e)}function ig(t,e,n){const r=n.docs.get(e._key),i=new cs(t);return new Ir(t,i,e._key,r,new Pi(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RL={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NL{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=os(e)}set(e,n,r){this._verifyNotCommitted();const i=qr(e,this._firestore),s=Gl(i.converter,n,r),o=Vl(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Ue.none())),this}update(e,n,r,...i){this._verifyNotCommitted();const s=qr(e,this._firestore);let o;return o=typeof(n=X(n))=="string"||n instanceof si?Jp(this._dataReader,"WriteBatch.update",s._key,n,r,i):Yp(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(o.toMutation(s._key,Ue.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=qr(e,this._firestore);return this._mutations=this._mutations.concat(new go(n._key,Ue.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new b(w.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function qr(t,e){if((t=X(t)).firestore!==e)throw new b(w.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xL extends class{constructor(e,n){this._firestore=e,this._transaction=n,this._dataReader=os(e)}get(e){const n=qr(e,this._firestore),r=new vL(this._firestore);return this._transaction.lookup([n._key]).then(i=>{if(!i||i.length!==1)return j();const s=i[0];if(s.isFoundDocument())return new $a(this._firestore,r,s.key,s,n.converter);if(s.isNoDocument())return new $a(this._firestore,r,n._key,null,n.converter);throw j()})}set(e,n,r){const i=qr(e,this._firestore),s=Gl(i.converter,n,r),o=Vl(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,n,r,...i){const s=qr(e,this._firestore);let o;return o=typeof(n=X(n))=="string"||n instanceof si?Jp(this._dataReader,"Transaction.update",s._key,n,r,i):Yp(this._dataReader,"Transaction.update",s._key,n),this._transaction.update(s._key,o),this}delete(e){const n=qr(e,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=qr(e,this._firestore),r=new cs(this._firestore);return super.get(e).then(i=>new Ir(this._firestore,r,n._key,i._document,new Pi(!1,!1),n.converter))}}function DL(t,e,n){t=pe(t,He);const r=Object.assign(Object.assign({},RL),n);return function(i){if(i.maxAttempts<1)throw new b(w.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,s,o){const a=new ht;return i.asyncQueue.enqueueAndForget(async()=>{const c=await MM(i);new PM(i.asyncQueue,c,o,s,a).run()}),a.promise}(mt(t),i=>e(new xL(t,i)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PL(){return new _c("deleteField")}function OL(){return new Qp("serverTimestamp")}function ML(...t){return new sL("arrayUnion",t)}function LL(...t){return new oL("arrayRemove",t)}function FL(t){return new aL("increment",t)}(function(t,e=!0){(function(n){ho=n})(ci),Yr(new Jn("firestore",(n,{instanceIdentifier:r,options:i})=>{const s=n.getProvider("app").getImmediate(),o=new He(new GD(n.getProvider("auth-internal")),new WD(n.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new b(w.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ti(a.options.projectId,c)}(s,r),s);return i=Object.assign({useFetchStreams:e},i),o._setSettings(i),o},"PUBLIC").setMultipleInstances(!0)),Hn(Ym,"3.13.0",t),Hn(Ym,"3.13.0","esm2017")})();const VL="@firebase/firestore-compat",UL="0.3.12";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sg(t,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new b("invalid-argument",`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(){if(typeof Uint8Array>"u")throw new b("unimplemented","Uint8Arrays are not available in this environment.")}function rv(){if(!_P())throw new b("unimplemented","Blobs are unavailable in Firestore in this environment.")}class qa{constructor(e){this._delegate=e}static fromBase64String(e){return rv(),new qa(er.fromBase64String(e))}static fromUint8Array(e){return nv(),new qa(er.fromUint8Array(e))}toBase64(){return rv(),this._delegate.toBase64()}toUint8Array(){return nv(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(t){return BL(t,["next","error","complete"])}function BL(t,e){if(typeof t!="object"||t===null)return!1;const n=t;for(const r of e)if(r in n&&typeof n[r]=="function")return!0;return!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $L{enableIndexedDbPersistence(e,n){return WM(e._delegate,{forceOwnership:n})}enableMultiTabIndexedDbPersistence(e){return QM(e._delegate)}clearIndexedDbPersistence(e){return YM(e._delegate)}}class hb{constructor(e,n,r){this._delegate=n,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof ti||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const n=this._delegate._getSettings();!e.merge&&n.host!==e.host&&kn("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e=Object.assign(Object.assign({},n),e),delete e.merge),this._delegate._setSettings(e)}useEmulator(e,n,r={}){jM(this._delegate,e,n,r)}enableNetwork(){return XM(this._delegate)}disableNetwork(){return ZM(this._delegate)}enablePersistence(e){let n=!1,r=!1;return e&&(n=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,GE("synchronizeTabs",n,"experimentalForceOwningTab",r)),n?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return JM(this._delegate)}onSnapshotsInSync(e){return kL(this._delegate,e)}get app(){if(!this._appCompat)throw new b("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new to(this,KE(this._delegate,e))}catch(n){throw qt(n,"collection()","Firestore.collection()")}}doc(e){try{return new fn(this,Fu(this._delegate,e))}catch(n){throw qt(n,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new $t(this,GM(this._delegate,e))}catch(n){throw qt(n,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return DL(this._delegate,n=>e(new db(this,n)))}batch(){return mt(this._delegate),new fb(new NL(this._delegate,e=>Ec(this._delegate,e)))}loadBundle(e){return eL(this._delegate,e)}namedQuery(e){return tL(this._delegate,e).then(n=>n?new $t(this,n):null)}}class zl extends rg{constructor(e){super(),this.firestore=e}convertBytes(e){return new qa(new er(e))}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return fn.forKey(n,this.firestore,null)}}function qL(t){BD(t)}class db{constructor(e,n){this._firestore=e,this._delegate=n,this._userDataWriter=new zl(e)}get(e){const n=Oi(e);return this._delegate.get(n).then(r=>new ja(this._firestore,new Ir(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,n.converter)))}set(e,n,r){const i=Oi(e);return r?(sg("Transaction.set",r),this._delegate.set(i,n,r)):this._delegate.set(i,n),this}update(e,n,r,...i){const s=Oi(e);return arguments.length===2?this._delegate.update(s,n):this._delegate.update(s,n,r,...i),this}delete(e){const n=Oi(e);return this._delegate.delete(n),this}}class fb{constructor(e){this._delegate=e}set(e,n,r){const i=Oi(e);return r?(sg("WriteBatch.set",r),this._delegate.set(i,n,r)):this._delegate.set(i,n),this}update(e,n,r,...i){const s=Oi(e);return arguments.length===2?this._delegate.update(s,n):this._delegate.update(s,n,r,...i),this}delete(e){const n=Oi(e);return this._delegate.delete(n),this}commit(){return this._delegate.commit()}}class es{constructor(e,n,r){this._firestore=e,this._userDataWriter=n,this._delegate=r}fromFirestore(e,n){const r=new aa(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Ga(this._firestore,r),n??{})}toFirestore(e,n){return n?this._delegate.toFirestore(e,n):this._delegate.toFirestore(e)}static getInstance(e,n){const r=es.INSTANCES;let i=r.get(e);i||(i=new WeakMap,r.set(e,i));let s=i.get(n);return s||(s=new es(e,new zl(e),n),i.set(n,s)),s}}es.INSTANCES=new WeakMap;class fn{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new zl(e)}static forPath(e,n,r){if(e.length%2!==0)throw new b("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new fn(n,new Le(n._delegate,r,new L(e)))}static forKey(e,n,r){return new fn(n,new Le(n._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new to(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new to(this.firestore,KE(this._delegate,e))}catch(n){throw qt(n,"collection()","DocumentReference.collection()")}}isEqual(e){return e=X(e),e instanceof Le?HE(this._delegate,e):!1}set(e,n){n=sg("DocumentReference.set",n);try{return n?ev(this._delegate,e,n):ev(this._delegate,e)}catch(r){throw qt(r,"setDoc()","DocumentReference.set()")}}update(e,n,...r){try{return arguments.length===1?tv(this._delegate,e):tv(this._delegate,e,n,...r)}catch(i){throw qt(i,"updateDoc()","DocumentReference.update()")}}delete(){return AL(this._delegate)}onSnapshot(...e){const n=pb(e),r=gb(e,i=>new ja(this.firestore,new Ir(this.firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,this._delegate.converter)));return lb(this._delegate,n,r)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=IL(this._delegate):(e==null?void 0:e.source)==="server"?n=EL(this._delegate):n=_L(this._delegate),n.then(r=>new ja(this.firestore,new Ir(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new fn(this.firestore,e?this._delegate.withConverter(es.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function qt(t,e,n){return t.message=t.message.replace(e,n),t}function pb(t){for(const e of t)if(typeof e=="object"&&!qd(e))return e;return{}}function gb(t,e){var n,r;let i;return qd(t[0])?i=t[0]:qd(t[1])?i=t[1]:typeof t[0]=="function"?i={next:t[0],error:t[1],complete:t[2]}:i={next:t[1],error:t[2],complete:t[3]},{next:s=>{i.next&&i.next(e(s))},error:(n=i.error)===null||n===void 0?void 0:n.bind(i),complete:(r=i.complete)===null||r===void 0?void 0:r.bind(i)}}class ja{constructor(e,n){this._firestore=e,this._delegate=n}get ref(){return new fn(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,n){return this._delegate.get(e,n)}isEqual(e){return ub(this._delegate,e._delegate)}}class Ga extends ja{data(e){const n=this._delegate.data(e);return $D(n!==void 0),n}}class $t{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new zl(e)}where(e,n,r){try{return new $t(this.firestore,Pr(this._delegate,lL(e,n,r)))}catch(i){throw qt(i,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,n){try{return new $t(this.firestore,Pr(this._delegate,hL(e,n)))}catch(r){throw qt(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new $t(this.firestore,Pr(this._delegate,dL(e)))}catch(n){throw qt(n,"limit()","Query.limit()")}}limitToLast(e){try{return new $t(this.firestore,Pr(this._delegate,fL(e)))}catch(n){throw qt(n,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new $t(this.firestore,Pr(this._delegate,pL(...e)))}catch(n){throw qt(n,"startAt()","Query.startAt()")}}startAfter(...e){try{return new $t(this.firestore,Pr(this._delegate,gL(...e)))}catch(n){throw qt(n,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new $t(this.firestore,Pr(this._delegate,mL(...e)))}catch(n){throw qt(n,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new $t(this.firestore,Pr(this._delegate,yL(...e)))}catch(n){throw qt(n,"endAt()","Query.endAt()")}}isEqual(e){return WE(this._delegate,e._delegate)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=TL(this._delegate):(e==null?void 0:e.source)==="server"?n=SL(this._delegate):n=bL(this._delegate),n.then(r=>new jd(this.firestore,new oi(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const n=pb(e),r=gb(e,i=>new jd(this.firestore,new oi(this.firestore._delegate,this._userDataWriter,this._delegate,i._snapshot)));return lb(this._delegate,n,r)}withConverter(e){return new $t(this.firestore,e?this._delegate.withConverter(es.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class jL{constructor(e,n){this._firestore=e,this._delegate=n}get type(){return this._delegate.type}get doc(){return new Ga(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class jd{constructor(e,n){this._firestore=e,this._delegate=n}get query(){return new $t(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Ga(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(n=>new jL(this._firestore,n))}forEach(e,n){this._delegate.forEach(r=>{e.call(n,new Ga(this._firestore,r))})}isEqual(e){return ub(this._delegate,e._delegate)}}class to extends $t{constructor(e,n){super(e,n),this.firestore=e,this._delegate=n}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new fn(this.firestore,e):null}doc(e){try{return e===void 0?new fn(this.firestore,Fu(this._delegate)):new fn(this.firestore,Fu(this._delegate,e))}catch(n){throw qt(n,"doc()","CollectionReference.doc()")}}add(e){return CL(this._delegate,e).then(n=>new fn(this.firestore,n))}isEqual(e){return HE(this._delegate,e._delegate)}withConverter(e){return new to(this.firestore,e?this._delegate.withConverter(es.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Oi(t){return pe(t,Le)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(...e){this._delegate=new si(...e)}static documentId(){return new og(Qe.keyField().canonicalString())}isEqual(e){return e=X(e),e instanceof si?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this._delegate=e}static serverTimestamp(){const e=OL();return e._methodName="FieldValue.serverTimestamp",new Ci(e)}static delete(){const e=PL();return e._methodName="FieldValue.delete",new Ci(e)}static arrayUnion(...e){const n=ML(...e);return n._methodName="FieldValue.arrayUnion",new Ci(n)}static arrayRemove(...e){const n=LL(...e);return n._methodName="FieldValue.arrayRemove",new Ci(n)}static increment(e){const n=FL(e);return n._methodName="FieldValue.increment",new Ci(n)}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GL={Firestore:hb,GeoPoint:Ll,Timestamp:Be,Blob:qa,Transaction:db,WriteBatch:fb,DocumentReference:fn,DocumentSnapshot:ja,Query:$t,QueryDocumentSnapshot:Ga,QuerySnapshot:jd,CollectionReference:to,FieldPath:og,FieldValue:Ci,setLogLevel:qL,CACHE_SIZE_UNLIMITED:HM};function zL(t,e){t.INTERNAL.registerComponent(new Jn("firestore-compat",n=>{const r=n.getProvider("app-compat").getImmediate(),i=n.getProvider("firestore").getImmediate();return e(r,i)},"PUBLIC").setServiceProps(Object.assign({},GL)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KL(t){zL(t,(e,n)=>new hb(e,n,new $L)),t.registerVersion(VL,UL)}KL(cn);const ag=ot(!1),Kl=ot(!1),Hl=ot(null),zr=ot("idle"),cg=ot(null);let za=null;const mb={apiKey:"AIzaSyCb3uX6bNgt4kF5ZTYmABvhq_g5icip2no",authDomain:"football-team-manager-14a39.firebaseapp.com",projectId:"football-team-manager-14a39",storageBucket:"football-team-manager-14a39.firebasestorage.app",messagingSenderId:"898490516886",appId:"1:898490516886:web:89ff40fb808556148e89b7",measurementId:"G-5P0NY1N9HY"},HL=()=>mb.apiKey!=="YOUR_API_KEY",WL=async()=>{if(!HL()){console.warn("Firebase config missing");return}try{cn.apps.length||cn.initializeApp(mb),za=cn.firestore(),cn.auth().onAuthStateChanged(t=>{Hl.value=t,Kl.value=!!t,console.log("Firebase auth state:",t?"Signed in":"Signed out")}),ag.value=!0}catch(t){console.error("Firebase init failed:",t)}},QL=async()=>{if(ag.value)try{const t=new cn.auth.GoogleAuthProvider;await cn.auth().signInWithPopup(t)}catch(t){console.error("Sign in error:",t),alert("Lỗi đăng nhập: "+t.message)}},YL=async()=>{try{await cn.auth().signOut()}catch(t){console.error(t)}},JL=async t=>{if(!Kl.value||!za)return console.warn("Cannot upload: not signed in or DB not initialized"),!1;zr.value="syncing";try{const e=Hl.value.uid;return await za.collection("teams").doc(e).set({members:t.members||[],matches:t.matches||[],transactions:t.transactions||[],lastUpdated:cn.firestore.FieldValue.serverTimestamp()}),zr.value="success",cg.value=new Date,!0}catch(e){throw console.error("Upload error:",e),zr.value="error",e}},XL=async()=>{if(!Kl.value||!za)return console.warn("Cannot download: not signed in or DB not initialized"),null;zr.value="syncing";try{const t=Hl.value.uid,e=await za.collection("teams").doc(t).get();return e.exists?(zr.value="success",cg.value=new Date,e.data()):(zr.value="idle",null)}catch(t){throw console.error("Download error:",t),zr.value="error",t}},yb=()=>({isConfigured:ki(ag),isSignedIn:ki(Kl),user:ki(Hl),syncStatus:zr,lastSyncTime:ki(cg),initFirebase:WL,signIn:QL,signOut:YL,uploadData:JL,downloadData:XL}),Vt=ot([]),nt=ot([]),Rn=ot([]),iv=ot(!1),{uploadData:sv,isSignedIn:ov}=yb(),ZL=tt(()=>{const t=Rn.value.filter(i=>i.type==="income").reduce((i,s)=>i+s.amount,0),e=Rn.value.filter(i=>i.type==="expense").reduce((i,s)=>i+s.amount,0);let n=0,r=nt.value.length*Vt.value.length;return nt.value.length>0&&nt.value.forEach(i=>{n+=i.attendance.filter(s=>s.status==="present").length}),{totalMembers:Vt.value.length,totalMatches:nt.value.length,balance:t-e,totalIncome:t,totalExpense:e,attendanceRate:r>0?Math.round(n/r*100):0}}),eF=tt(()=>[...nt.value].sort((t,e)=>new Date(e.date)-new Date(t.date))),tF=tt(()=>{const t=new Date;return t.setHours(0,0,0,0),nt.value.filter(e=>new Date(e.date)>=t)}),nF=()=>{if(iv.value)return;const t=localStorage.getItem("members"),e=localStorage.getItem("matches"),n=localStorage.getItem("transactions");t&&(Vt.value=JSON.parse(t)),e&&(nt.value=JSON.parse(e)),n&&(Rn.value=JSON.parse(n)),Vt.value.length===0&&!localStorage.getItem("initialized")&&(Vt.value=[{id:1,name:"Nguyễn Văn A",fundPaid:0,fines:0},{id:2,name:"Trần Thị B",fundPaid:0,fines:0},{id:3,name:"Lê Văn C",fundPaid:0,fines:0},{id:4,name:"Phạm Thị D",fundPaid:0,fines:0},{id:5,name:"Hoàng Văn E",fundPaid:0,fines:0}],mi(),localStorage.setItem("initialized","true")),iv.value=!0},mi=()=>{localStorage.setItem("members",JSON.stringify(Vt.value)),localStorage.setItem("matches",JSON.stringify(nt.value)),localStorage.setItem("transactions",JSON.stringify(Rn.value)),ov&&ov.value&&sv&&sv({members:Vt.value,matches:nt.value,transactions:Rn.value}).catch(()=>{console.log("Auto-upload to Firebase skipped")})},rF=t=>{t.members&&(Vt.value=t.members),t.matches&&(nt.value=t.matches),t.transactions&&(Rn.value=t.transactions),localStorage.setItem("members",JSON.stringify(Vt.value)),localStorage.setItem("matches",JSON.stringify(nt.value)),localStorage.setItem("transactions",JSON.stringify(Rn.value))},iF=t=>{Vt.value.push({id:Date.now(),name:t,fundPaid:0,fines:0}),mi()},sF=(t,e)=>{const n=Vt.value.find(r=>r.id===t);n&&(n.name=e),mi()},oF=t=>{Vt.value=Vt.value.filter(e=>e.id!==t),mi()},aF=t=>{const e=Vt.value.map(n=>({memberId:n.id,status:t.attendanceIds.includes(n.id)?"present":"absent"}));if(t.id){const n=nt.value.findIndex(r=>r.id===t.id);n!==-1&&(nt.value[n]={...nt.value[n],...t,attendance:e})}else nt.value.push({id:Date.now(),...t,attendance:e});mi()},cF=t=>{nt.value=nt.value.filter(e=>e.id!==t),mi()},uF=t=>{Rn.value.push({id:Date.now(),...t}),mi()},lF=t=>{Rn.value=Rn.value.filter(e=>e.id!==t),mi()},hF=t=>{const e=Vt.value.find(n=>n.id===t);return e?e.name:""},dF=t=>{const e=nt.value.length;if(e===0)return{attendanceRate:0};const n=nt.value.filter(r=>r.attendance.some(i=>i.memberId===t&&i.status==="present")).length;return{attendanceRate:Math.round(n/e*100)}},fF=()=>({members:Vt,matches:nt,transactions:Rn,stats:ZL,sortedMatches:eF,futureMatches:tF,loadData:nF,updateFromFirebase:rF,addMember:iF,updateMember:sF,deleteMember:oF,saveMatch:aF,deleteMatch:cF,addTransaction:uF,deleteTransaction:lF,getMemberName:hF,getMemberStats:dF});const pF=(t,e)=>{const n=t.__vccOpts||t;for(const[r,i]of e)n[r]=i;return n},gF={class:"app-container"},mF={key:2,class:"main-content"},yF={class:"top-bar"},vF={class:"page-title"},wF={class:"top-bar-actions"},_F={key:0,class:"sync-controls"},IF={class:"sync-status"},EF={key:0,d:"M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"},bF={key:1,points:"20 6 9 17 4 12"},TF={key:3,d:"M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"},SF={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",style:{width:"16px",height:"16px"}},AF={key:3,class:"modal",style:{"background-color":"rgba(0,0,0,0.9)","z-index":"9999",display:"flex"}},CF={class:"modal-content",style:{"max-width":"400px","text-align":"center"}},kF={class:"modal-body"},RF={key:0,style:{"text-align":"left"}},NF={class:"form-group"},xF={class:"form-group"},DF={key:0,style:{color:"var(--danger-500)","font-size":"0.875rem","margin-bottom":"1rem"}},PF={key:1,style:{"text-align":"left"}},OF={class:"form-group"},MF={key:0,class:"member-search-list"},LF=["onClick"],FF={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",style:{width:"20px",height:"20px"}},VF={key:0,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",style:{width:"20px",height:"20px",color:"var(--success-500)"}},UF={key:1,class:"empty-state",style:{padding:"1rem"}},BF={class:"form-actions",style:{"flex-direction":"column",gap:"1rem","margin-top":"1rem"}},$F=["disabled"],qF={key:2,class:"form-actions",style:{"flex-direction":"column",gap:"1rem"}},jF={class:"notification-content"},GF={__name:"App",setup(t){const e=zA(),{loadData:n,members:r,matches:i,transactions:s,updateFromFirebase:o}=fF(),{initFirebase:a,signIn:c,signOut:u,uploadData:l,downloadData:h,syncStatus:d,isSignedIn:f}=yb(),{currentRole:m,isAdmin:_,setRole:T,logout:D,permissions:O}=Mw(),N=Ms({show:!1,message:"",type:"info"}),P=ot(!1),W=ot(!1),Z=ot(!1),J=ot(""),ye=ot(""),$e=ot(!1),xe=Ms({username:"",password:""}),yt=ot(""),tr=tt(()=>f.value?d.value==="syncing"?"Đang đồng bộ...":d.value==="success"?"Đã đồng bộ":d.value==="error"?"Lỗi đồng bộ":"Đã kết nối":"Chưa kết nối"),tn=tt(()=>{if(!ye.value)return r.value;const De=ye.value.toLowerCase();return r.value.filter(z=>z.name.toLowerCase().includes(De))}),kr=()=>{P.value=!P.value},Nn=()=>{if(yt.value="",xe.username!=="admin"){yt.value="Tên đăng nhập không đúng";return}if(xe.password!=="12345678@Abc"){yt.value="Mật khẩu không đúng";return}T("admin"),W.value=!1,xe.username="",xe.password="",yt.value="",je("✅ Đăng nhập Admin thành công!","success"),e.push("/dashboard")},Xe=()=>{W.value=!1,xe.username="",xe.password="",yt.value=""},ve=De=>{J.value=De.id,ye.value=De.name,$e.value=!1},ge=()=>{Z.value=!1,J.value="",ye.value="",$e.value=!1},yn=()=>{if(!J.value){je("Vui lòng chọn thành viên","error");return}const De=r.value.find(Rt=>Rt.id===J.value);T("guest",J.value),Z.value=!1,ye.value="",$e.value=!1;const z=De?De.name:"Khách";je(`Xin chào ${z}!`,"success"),J.value="",e.push("/dashboard")},xn=()=>{D(),P.value=!1,W.value=!1,Z.value=!1,J.value="",ye.value="",$e.value=!1,xe.username="",xe.password="",yt.value=""},je=(De,z="info")=>{N.message=De,N.type=z,N.show=!0,setTimeout(()=>N.show=!1,3e3)};Gv(()=>{n(),a()}),Ho(f,async(De,z)=>{if(De&&!z&&_.value){je("🔄 Đang tải dữ liệu từ Cloud...","info");try{const Rt=await h();Rt?(o(Rt),je("✅ Đã tải dữ liệu từ Cloud thành công!","success")):je("ℹ️ Chưa có dữ liệu trên Cloud","info")}catch(Rt){je("⚠️ Không thể tải dữ liệu từ Cloud","warning"),console.error("Auto-download error:",Rt)}}});const kt=async()=>{if(!f.value){je("Vui lòng đăng nhập Firebase trước","error");return}if(confirm("⚠️ Lấy dữ liệu từ Cloud sẽ GHI ĐÈ dữ liệu hiện tại. Bạn có chắc chắn?"))try{const De=await h();De?(o(De),je("✅ Đã lấy dữ liệu từ Cloud thành công!","success")):je("ℹ️ Chưa có dữ liệu trên Cloud","info")}catch(De){je("❌ Lỗi khi lấy: "+De.message,"error")}};return(De,z)=>{const Rt=Hv("router-view");return ue(),Ve("div",gF,[C("div",{class:Ur(["sidebar-overlay",{show:P.value}]),onClick:kr},null,2),Se(m)?(ue(),wn(ZA,{key:0,class:Ur({open:P.value})},null,8,["class"])):vt("",!0),Se(m)?(ue(),Ve("button",{key:1,class:"mobile-menu-toggle",onClick:kr},[...z[8]||(z[8]=[C("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[C("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),C("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),C("line",{x1:"3",y1:"18",x2:"21",y2:"18"})],-1)])])):vt("",!0),Se(m)?(ue(),Ve("main",mF,[C("header",yF,[C("h1",vF,ps(De.$route.name),1),C("div",wF,[Se(_)?(ue(),Ve("div",_F,[C("div",IF,[(ue(),Ve("svg",{class:Ur(["sync-icon",{spinning:Se(d)==="syncing"}]),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[Se(d)==="syncing"?(ue(),Ve("path",EF)):Se(d)==="success"?(ue(),Ve("polyline",bF)):Se(d)==="error"?(ue(),Ve(Pt,{key:2},[z[9]||(z[9]=C("circle",{cx:"12",cy:"12",r:"10"},null,-1)),z[10]||(z[10]=C("line",{x1:"12",y1:"8",x2:"12",y2:"12"},null,-1)),z[11]||(z[11]=C("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"},null,-1))],64)):(ue(),Ve("path",TF))],2)),C("span",null,ps(tr.value),1)]),Se(f)?vt("",!0):(ue(),Ve("button",{key:0,class:"btn btn-sm btn-primary",onClick:z[0]||(z[0]=(...me)=>Se(c)&&Se(c)(...me))}," Đăng nhập Google ")),Se(f)?(ue(),Ve(Pt,{key:1},[C("button",{class:"btn btn-sm btn-info",onClick:kt,title:"Lấy dữ liệu từ Firebase"},[(ue(),Ve("svg",SF,[...z[12]||(z[12]=[C("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},null,-1),C("polyline",{points:"7 10 12 15 17 10"},null,-1),C("line",{x1:"12",y1:"15",x2:"12",y2:"3"},null,-1)])])),z[13]||(z[13]=dw(" Lấy từ Cloud ",-1))]),C("button",{class:"btn btn-sm btn-secondary",onClick:z[1]||(z[1]=(...me)=>Se(u)&&Se(u)(...me))}," Đăng xuất ")],64)):vt("",!0)])):vt("",!0),C("button",{class:"btn btn-sm btn-secondary",style:{"margin-left":"10px"},onClick:xn}," Thoát ")])]),bt(Rt)])):vt("",!0),Se(m)?vt("",!0):(ue(),Ve("div",AF,[C("div",CF,[z[21]||(z[21]=C("div",{class:"modal-header",style:{"justify-content":"center"}},[C("h2",null,"Tinh Hoa FC")],-1)),C("div",kF,[z[20]||(z[20]=C("p",{style:{"margin-bottom":"2rem"}},"Vui lòng chọn chế độ truy cập",-1)),W.value?(ue(),Ve("div",RF,[C("div",NF,[z[14]||(z[14]=C("label",null,"Tên Đăng Nhập",-1)),Zl(C("input",{type:"text","onUpdate:modelValue":z[2]||(z[2]=me=>xe.username=me),placeholder:"admin",onKeyup:jg(Nn,["enter"]),style:{width:"100%"}},null,544),[[sh,xe.username]])]),C("div",xF,[z[15]||(z[15]=C("label",null,"Mật Khẩu",-1)),Zl(C("input",{type:"password","onUpdate:modelValue":z[3]||(z[3]=me=>xe.password=me),placeholder:"••••••••",onKeyup:jg(Nn,["enter"]),style:{width:"100%"}},null,544),[[sh,xe.password]])]),yt.value?(ue(),Ve("div",DF,ps(yt.value),1)):vt("",!0),C("div",{class:"form-actions",style:{"flex-direction":"column",gap:"1rem"}},[C("button",{class:"btn btn-primary",style:{width:"100%"},onClick:Nn}," Đăng Nhập "),C("button",{class:"btn btn-secondary",style:{width:"100%"},onClick:Xe}," Quay Lại ")])])):Z.value?(ue(),Ve("div",PF,[C("div",OF,[z[16]||(z[16]=C("label",null,"Tìm Kiếm Thành Viên",-1)),Zl(C("input",{type:"text","onUpdate:modelValue":z[4]||(z[4]=me=>ye.value=me),placeholder:"Nhập tên để tìm kiếm...",onFocus:z[5]||(z[5]=me=>$e.value=!0),style:{width:"100%"}},null,544),[[sh,ye.value]])]),$e.value&&tn.value.length>0?(ue(),Ve("div",MF,[(ue(!0),Ve(Pt,null,AT(tn.value,me=>(ue(),Ve("div",{key:me.id,class:Ur(["member-search-item",{selected:J.value===me.id}]),onClick:E=>ve(me)},[(ue(),Ve("svg",FF,[...z[17]||(z[17]=[C("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},null,-1),C("circle",{cx:"12",cy:"7",r:"4"},null,-1)])])),C("span",null,ps(me.name),1),J.value===me.id?(ue(),Ve("svg",VF,[...z[18]||(z[18]=[C("polyline",{points:"20 6 9 17 4 12"},null,-1)])])):vt("",!0)],10,LF))),128))])):$e.value&&ye.value?(ue(),Ve("div",UF,[...z[19]||(z[19]=[C("p",{style:{margin:"0","font-size":"0.875rem"}},"Không tìm thấy thành viên",-1)])])):vt("",!0),C("div",BF,[C("button",{class:"btn btn-primary",style:{width:"100%"},onClick:yn,disabled:!J.value}," Xác Nhận ",8,$F),C("button",{class:"btn btn-secondary",style:{width:"100%"},onClick:ge}," Quay Lại ")])])):(ue(),Ve("div",qF,[C("button",{class:"btn btn-primary",style:{width:"100%"},onClick:z[6]||(z[6]=me=>W.value=!0)},"Quản Trị Viên (Full)"),C("button",{class:"btn btn-secondary",style:{width:"100%"},onClick:z[7]||(z[7]=me=>Z.value=!0)},"Khách (Chỉ xem)")]))])])])),C("div",{class:Ur(["notification",["notification-"+N.type,{show:N.show}]])},[C("div",jF,[C("span",null,ps(N.message),1)])],2)])}}},zF=pF(GF,[["__scopeId","data-v-8b602fae"]]),KF="modulepreload",HF=function(t){return"/football-team-manager/"+t},av={},Or=function(e,n,r){if(!n||n.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=HF(s),s in av)return;av[s]=!0;const o=s.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(!!r)for(let l=i.length-1;l>=0;l--){const h=i[l];if(h.href===s&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${a}`))return;const u=document.createElement("link");if(u.rel=o?"stylesheet":KF,o||(u.as="script",u.crossOrigin=""),u.href=s,document.head.appendChild(u),o)return new Promise((l,h)=>{u.addEventListener("load",l),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e()).catch(s=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s})},WF=[{path:"/",redirect:"/dashboard"},{path:"/dashboard",name:"Dashboard",component:()=>Or(()=>import("./DashboardView-efc69515.js"),[])},{path:"/members",name:"Members",component:()=>Or(()=>import("./MembersView-f44dface.js"),[])},{path:"/matches",name:"Matches",component:()=>Or(()=>import("./MatchesView-ba94e90f.js"),["assets/MatchesView-ba94e90f.js","assets/useQRAttendance-a530ed36.js","assets/MatchesView-39b6190c.css"])},{path:"/finance",name:"Finance",component:()=>Or(()=>import("./FinanceView-00f5bb24.js"),[])},{path:"/attendance",name:"Attendance",component:()=>Or(()=>import("./AttendanceView-f65935a6.js"),["assets/AttendanceView-f65935a6.js","assets/useQRAttendance-a530ed36.js","assets/AttendanceView-a9135441.css"])},{path:"/my-payments",name:"My Payments",component:()=>Or(()=>import("./MyPaymentsView-5a51d774.js"),["assets/MyPaymentsView-5a51d774.js","assets/MyPaymentsView-069bee79.css"])},{path:"/leave-request",name:"Leave Request",component:()=>Or(()=>import("./LeaveRequestView-24e70227.js"),["assets/LeaveRequestView-24e70227.js","assets/LeaveRequestView-e104c2f3.css"])},{path:"/leave-management",name:"Leave Management",component:()=>Or(()=>import("./LeaveManagementView-664a0857.js"),["assets/LeaveManagementView-664a0857.js","assets/LeaveManagementView-caa25aa9.css"])}],QF=GA({history:EA(),routes:WF}),vb=LS(zF);vb.use(QF);vb.mount("#app");export{ir as A,Mw as B,Pt as F,pF as _,Ve as a,C as b,tt as c,JF as d,fF as e,dw as f,ot as g,Ms as h,vt as i,e2 as j,ZF as k,Wd as l,Bv as m,Ur as n,ue as o,Ho as p,Gv as q,AT as r,zv as s,ps as t,Se as u,sh as v,Zl as w,XF as x,YF as y,bt as z};
