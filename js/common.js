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

// this year를 최신으로 유지하기
const thisYear = document.querySelector(".this-year");
// 글자에 값을 지정할 수 있다.
thisYear.textContent = new Date().getFullYear(); // 2023
