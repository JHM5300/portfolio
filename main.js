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
navbarmenu.addEventListener('click',(event)=>{
      
    const target = event.target;
    const  link = target.dataset.link;
    if(link == null){return;}
    navbarmenu.classList.remove('open');
    scrollIntoView(link);
});

const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarmenu.classList.toggle('open');
})

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

//Arrow up 스크롤링 하면 나타나게함.
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight /2 ){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible')
    }
})
//arrow up 누르면 home으로 이동
arrowUp.addEventListener('click',()=>{
    scrollIntoView('#home');
})

//프로젝트
const workBtnContainer= document.querySelector('.work_categories');
const projectcontainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){return;}

    //버튼 클릭시 색 변경
    const active = document.querySelector('.category_btn.selected');
    active.classList.remove('selected');
    const target=e.target.nodeName==='BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');
    projectcontainer.classList.add('anum-out');

    setTimeout(()=>{
        projects.forEach((project)=>{
            if(filter ==='*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectcontainer.classList.remove('anum-out');
    },300)
});





function scrollIntoView(selector) {
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
};
