var m=(l,e,t)=>new Promise((a,i)=>{var n=r=>{try{s(t.next(r))}catch(c){i(c)}},d=r=>{try{s(t.throw(r))}catch(c){i(c)}},s=r=>r.done?a(r.value):Promise.resolve(r.value).then(n,d);s((t=t.apply(l,e)).next())});import{renderList as u}from"./utils.js";export default class o{constructor(e,t,a){this.dataSource=e,this.targetElement=t,this.category=a}init(){return m(this,null,function*(){let e=yield this.dataSource.getData();e=this.filterList(e);const t=document.getElementById("product-card-template");u(t,this.targetElement,e,this.prepareTemplate)})}filterList(e){const t=["985RF","880RR","985PR","344YJ"],a=e.filter(i=>t.includes(i.Id));return a}prepareTemplate(e,t){return e.querySelector("a").href+=t.Id,e.querySelector("img").src=t.Image.replace("../",""),e.querySelector("img").alt+=t.Name,e.querySelector(".card__brand").innerHTML=t.Brand.Name,e.querySelector(".card__name").innerHTML=t.NameWithoutBrand,e.querySelector(".product-card__price").innerHTML+=t.ListPrice,e}}
