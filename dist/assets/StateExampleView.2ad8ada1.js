import{l as r,d as c,m as o,o as i,c as _,a as e,t as s,u as a,e as u}from"./vendor.6d686dba.js";const d=r({id:"counter",state:()=>({counter:0}),getters:{doubleCount:n=>n.counter*2},actions:{increment(){this.counter++}}});const m=e("h1",null,"This page is an example of how to use Pinia for state management",-1),p=e("br",null,null,-1),h=u(),b=e("br",null,null,-1),f=e("br",null,null,-1),x=e("br",null,null,-1),v=c({setup(n){const t=d();o("About Us"),o("We are a company that specializes in...");const l=()=>{t.increment()};return(C,g)=>(i(),_("div",null,[m,p,h,b,e("button",{onClick:l}," Count: "+s(a(t).counter),1),f,x,u(" Double the count is "+s(a(t).doubleCount)+". ",1)]))}});export{v as default};
