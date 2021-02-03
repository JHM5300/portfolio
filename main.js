"use strict";
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//메뉴를 스크롤하면 투명하게 만듬.
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar-dark");
  } else {
    navbar.classList.remove("navbar-dark");
  }
});

// 메뉴 클릭하면 원하는곳으로 스크롤링
const navbarmenu = document.querySelector(".navbar_menu");
navbarmenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarmenu.classList.remove("open");
  scrollIntoView(link);
});

const navbarToggleBtn = document.querySelector(".navbar_toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarmenu.classList.toggle("open");
});

//Contact me btn 누르면 스크롤
const contactMe_Btn = document.querySelector(".home_contact");
contactMe_Btn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

//스크롤하면 home의 요소들이 fade
const home = document.querySelector(".home_container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  const fade = 1 - window.scrollY / homeHeight;
  home.style.opacity = fade;
});
//study text show
const skills = document.querySelector("#skills");
const show1 = document.querySelector(".show1");
const show2 = document.querySelector(".show2");
const show3 = document.querySelector(".show3");
const show4 = document.querySelector(".show4");
const show5 = document.querySelector(".show5");
skills.addEventListener("mouseover", () => {
  const show = setTimeout(() => {
    show1.style.opacity = 1;
    setTimeout(() => {
      show2.style.opacity = 1;
    }, 1000);
    setTimeout(() => {
      show3.style.opacity = 1;
    }, 2000);
    setTimeout(() => {
      show4.style.opacity = 1;
      show5.style.opacity = 1;
    }, 3000);
  }, 1000);
});

//Arrow up 스크롤링 하면 나타나게함.
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
//arrow up 누르면 home으로 이동
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

//프로젝트
const workBtnContainer = document.querySelector(".work_categories");
const projectcontainer = document.querySelector(".work_projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //버튼 클릭시 색 변경
  const active = document.querySelector(".category_btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");
  projectcontainer.classList.add("anum-out");

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectcontainer.classList.remove("anum-out");
  }, 300);
});

//1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화
const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      //스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
