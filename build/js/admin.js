var o=(l,t,e)=>new Promise((n,s)=>{var m=a=>{try{r(e.next(a))}catch(i){s(i)}},c=a=>{try{r(e.throw(a))}catch(i){s(i)}},r=a=>a.done?n(a.value):Promise.resolve(a.value).then(m,c);r((e=e.apply(l,t)).next())});import u from"./externalServices.js";import{alertMessage as p,removeAllAlerts as h}from"./utils.js";export default class d{constructor(t){this.mainElement=document.querySelector(t),this.token=null,this.services=new u}login(t,e){return o(this,null,function*(){try{const n=yield this.services.loginRequest(t);this.token=n,e&&e()}catch(n){h(),p("Invalid Email/Password. Please Try again")}})}showLogin(){const t=document.createElement("form"),e=document.querySelector("main");t.innerHTML=`<label for='email'>Email</label><input type='text' name='email' id='email' value='user1@email.com'>
        <label for='password'>Password</label><input type='password' value='user1' name='password' id='password'>
        <input type='submit' value='Login'>
        `,t.addEventListener("submit",n=>{n.preventDefault();const s={email:document.querySelector("#email").value,password:document.querySelector("#password").value};this.login(s,this.showOrders.bind(this))}),e.appendChild(t)}showOrders(){return o(this,null,function*(){const t=yield this.services.getOrders(this.token),e=document.createElement("table"),n=document.querySelector("main");e.innerHTML=t.map(s=>`<tr><td>${s.id}</td><td>${new Date(s.orderDate).toLocaleDateString("en-US")}</td><td>${s.items.length}</td><td>${s.orderTotal}</td></tr>`).join(""),n.appendChild(e)})}}const w=new d;w.showLogin();
