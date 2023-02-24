// 1. search 요소
// document는 DOCTYPE으로 정의되는 html 전체파일이라고 보면 됨.
// 요소처럼 행동함
const searchEl = document.querySelector(".search");
// searchEl에서 input element를 찾는 방법
const searchInputEl = searchEl.querySelector("input");

// .search 요소를 클릭하면, input 요소에 focus하겠다.
// 여기서 실행되는 함수 functino()을 handler라고 부른다.
searchEl.addEventListener("click", function () {
  // logic..
  searchInputEl.focus();
});

// input 요소가 focus되는 상태이면, 아래 fucntion을 실행하겠다.
searchInputEl.addEventListener("focus", function () {
  // logic..
  // 검색요소에 'focused'라는 요소를 추가한다. 왜? focus/unfocus로 상태구분
  searchEl.classList.add("focused");
  // setAttribute: 요소에 html 특성(attribute)를 지정
  searchInputEl.setAttribute("placeholder", "통합검색");
});

searchInputEl.addEventListener("blur", function () {
  // logic..
  // 검색요소에 'focused'라는 요소를 추가한다. 왜? focus/unfocus로 상태구분
  searchEl.classList.remove("focused");
  // setAttribute: 요소에 html 특성(attribute)를 지정
  searchInputEl.setAttribute("placeholder", "");
});

const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector("#to-top");

// window 객체: 보고있는 화면 자체임. 브라우저에 여러가지 기능탐재
window.addEventListener(
  "scroll",
  _.throttle(function () {
    // console.log(scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      // badgeEl.style.display = "none";
      // gsap.to(요소, 지속시간, 옵션)
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      // html 속성을 사용하는 방법

      // scroll to plug-in 버튼 보이기!
      gsap.to("#to-top", 0.2, {
        x: 0,
      }); // 요소를 직접 찾지 않고, 선택자를 입력해도 가능하다.
    } else {
      // 배지 보이기
      // badgeEl.style.display = "block";
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });

      // scroll to plug-in 버튼 보이기!
      gsap.to(toTopEl, 0.2, {
        x: 100,
      }); //
    }
  }, 300)
);
// lodash에서 제공하는 throttle. 0.3초마다 함수가 실행되게 함.
// _.throttle(함수, 시간(ms))
// scrollY 화면의 몇픽셀 지점인지 표시함

// scroll to top
toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0, //scrollTo plugin이 여기서 사용됨
  });
});

// fade-in을 순차적으로 하는 방법
// opacity로 제어하기 때문에 단순히 투명해지는 것이다. scroll과 연동 못하나?
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});

// swiper-slide
// new Swiper(선택자, 옵션)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  autoplay: true,
  loop: true,
});

new Swiper(".promotion .swiper-container", {
  // direction: "horizontal" // 기본값이라 생략
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백 px
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true, // 반복사용
  autoplay: {
    delay: 5000, //ms단위, 기본값은 3000
  },
  //slide는 prev, active, next로 구분되어 class가 부여된다.

  // page 선택하는 option을 만들어줌
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true,
  },
  navigation: {
    //navigation으로 요소를 선택할 수 있다.
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

// awards swiper
new Swiper(".awards .swiper-container", {
  // direction: 'horizontal',
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

// 스타벅스 프로모션 버튼을 누르면, 아래 내용이 펼쳐지게
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false; // 기본적으로 false로 줘서 닫아 놓는다.
promotionToggleBtn.addEventListener("click", function () {
  // btn이 click되면 promotion 부분을 열거나 닫거나 하게 기능
  isHidePromotion = !isHidePromotion; // 왜 다시 할당하는가? !는 반대가 되게 한다.
  if (isHidePromotion) {
    // 숨김처리 -> css에서 hide class가 있으면 숨김처리
    promotionEl.classList.add("hide");
  } else {
    // 열림처리
    promotionEl.classList.remove("hide");
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
// youtube video 위에 떠있는 animation
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      // 옵션
      y: size,
      repeat: -1, // 무한반복
      yoyo: true, //뒤로 재생
      ease: Power1.easeInOut,
      delay: random(0, delay), // 기다렸다가 실행
    }
  );
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// scroll magic
// 이해하기 어렵다.. module이니까 가져다 쓴다.
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, //화면의 어느 지점을 지나는 순간
  }) //method: Scene, 감시할때 필요함
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});

// this year를 최신으로 유지하기
const thisYear = document.querySelector(".this-year");
// 글자에 값을 지정할 수 있다.
thisYear.textContent = new Date().getFullYear(); // 2023
