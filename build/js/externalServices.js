var r=(s,e,t)=>new Promise((o,l)=>{var d=n=>{try{h(t.next(n))}catch(i){l(i)}},u=n=>{try{h(t.throw(n))}catch(i){l(i)}},h=n=>n.done?o(n.value):Promise.resolve(n.value).then(d,u);h((t=t.apply(s,e)).next())});const c="http://157.201.228.93:2992/";function a(s){return r(this,null,function*(){const e=yield s.json();if(console.log(s),s.ok)return e;throw{name:"servicesError",message:e}})}export default class g{constructor(){}getData(e){return fetch(c+`products/search/${e}`).then(a).then(t=>t.Result)}findProductById(e){return r(this,null,function*(){return fetch(c+`product/${e}`).then(a).then(t=>t.Result)})}getOrders(e){return r(this,null,function*(){console.log("get Orders Fired"),console.log(e);const t={method:"GET",headers:{Authorization:`Bearer ${e}`}};return fetch(c+"orders",t).then(a).then(o=>o)})}loginRequest(e){return r(this,null,function*(){console.log("login Request Fired"),console.log(e);const t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch(c+"login",t).then(a).then(o=>o.accessToken)})}runPayment(e){return r(this,null,function*(){console.log(e);const t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch(c+"checkout",t).then(a).then(o=>o)})}}
