document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("burger-menu"),t=document.querySelector(".header_mobile");e.addEventListener("click",function(){e.classList.toggle("active"),t.classList.toggle("active")})}),document.addEventListener("DOMContentLoaded",function(){var e=document.createElement("div"),t=(e.style.width="100px",e.style.height="100px",e.style.overflow="scroll",e.style.position="absolute",e.style.top="-9999px",document.body.appendChild(e),e.offsetWidth-e.clientWidth);document.body.removeChild(e),document.documentElement.style.setProperty("--scrollbar-width",t+"px"),document.body.classList.add("body-without-scroll")}),document.addEventListener("DOMContentLoaded",function(){new Swiper(".swiper-projects",{slidesPerView:1,spaceBetween:60,breakpoints:{576:{slidesPerView:1.5,spaceBetween:60},768:{slidesPerView:2,spaceBetween:60},1024:{slidesPerView:2.5,spaceBetween:60},1440:{slidesPerView:3.5,spaceBetween:60}}})});