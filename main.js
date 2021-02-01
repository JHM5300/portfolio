'use strict'
const navbar = document.querySelector("#navbar");
const navbarHeight= navbar.getBoundingClientRect().height;

//메뉴를 스크롤하면 투명하게 만듬.
document.addEventListener('scroll',()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar-dark');
    }else{
        navbar.classList.remove('navbar-dark');
    }
});

// 메뉴 클릭하면 원하는곳으로 스크롤링
const navbarmenu =  document.querySelector('.navbar_menu');
navbar.addEventListener('click',(event)=>{
      
    const target = event.target;
    const  link = target.dataset.link;
    if(link == null){return;}
    scrollIntoView(link);
});
//Contact me btn 누르면 스크롤
const contactMe_Btn =  document.querySelector('.home_contact');
contactMe_Btn.addEventListener('click',(event)=>{
    scrollIntoView('#contact');
});

//스크롤하면 home의 요소들이 fade
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    const fade = 1 - window.scrollY / homeHeight;
    home.style.opacity = fade;
    
})





function scrollIntoView(selector) {
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
};
