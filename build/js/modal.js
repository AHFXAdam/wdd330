var i=(n,e,t)=>new Promise((d,s)=>{var c=o=>{try{r(t.next(o))}catch(l){s(l)}},m=o=>{try{r(t.throw(o))}catch(l){s(l)}},r=o=>o.done?d(o.value):Promise.resolve(o.value).then(c,m);r((t=t.apply(n,e)).next())});import u from"./externalServices.js";import y from"./productDetails.js";import p from"./shoppingCart.js";import"./utils.js";export default class a{constructor(){this.triggers=document.querySelectorAll(".js-modal"),this.close=document.querySelectorAll(".js-close-modal"),this.modals=document.querySelectorAll(".modal"),this.modalInners=document.querySelectorAll(".modal-inner"),this.listeners()}listeners(){window.addEventListener("keydown",this.keyDown),this.triggers.forEach(e=>{e.addEventListener("click",this.openModal,!1)}),this.modals.forEach(e=>{e.addEventListener("transitionend",this.revealModal,!1),e.addEventListener("click",this.backdropClose,!1)}),this.close.forEach(e=>{e.addEventListener("click",a.hideModal,!1)}),this.modalInners.forEach(e=>{e.addEventListener("transitionend",this.closeModal,!1)})}keyDown(e){e.keyCode===27&&document.body.classList.contains("modal-body")&&a.hideModal()}backdropClose(e){if(!e.target.classList.contains("modal-visible"))return;let t=e.currentTarget.dataset.backdrop!==void 0?e.currentTarget.dataset.backdrop:!0;t===!0&&a.hideModal()}static hideModal(){let e=document.querySelector(".modal.modal-visible");e.querySelector(".modal-inner").classList.remove("modal-reveal"),document.querySelector(".modal-body").addEventListener("transitionend",a.modalBody,!1),document.body.classList.add("modal-fadeOut")}closeModal(e){e.propertyName==="opacity"&&!e.target.classList.contains("modal-reveal")&&document.querySelector(".modal.modal-visible").classList.remove("modal-visible")}static customFunction(e){return i(this,null,function*(){const t=new u,d=new p,s=new y(e,t,d);s.init("modal-info",!1),console.log("here")})}openModal(e,t){if(console.log(e),a.customFunction(e.currentTarget.dataset.id),!e.currentTarget.dataset.modal){console.error("No data-modal attribute defined!");return}let d=e.currentTarget.dataset.modal,s=document.getElementById(d);document.body.classList.add("modal-body"),s.classList.add("modal-visible")}revealModal(e){e.propertyName==="opacity"&&e.target.classList.contains("modal-visible")&&e.target.querySelector(".modal-inner").classList.add("modal-reveal")}static modalBody(e){e.propertyName==="opacity"&&e.target.classList.contains("modal")&&!e.target.classList.contains("modal-visible")&&document.body.classList.remove("modal-body","modal-fadeOut")}}
