import{alertMessage as t}from"./utils.js";export default class r{constructor(){this.listeners()}registerForNewsletter(){console.log("registering");const e=this.gatherData();console.log(e),t(`${e.email} has successfully registered for the newsletter`)}gatherData(){const e={email:document.querySelector("#newsletter-email").value};return e}listeners(){document.querySelector(".newsletter button").addEventListener("click",e=>{e.preventDefault(),document.querySelector("form.newsletter").checkValidity()?this.registerForNewsletter():document.querySelector("form").reportValidity()})}}