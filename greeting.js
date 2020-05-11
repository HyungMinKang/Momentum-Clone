const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//로컬스토리지에이름이 있다면
function paintGreeting(text) {
  // input form을 다시 display:none으로
  form.classList.remove(SHOWING_CN);
  //   h4.greeting 을 display:block으로
  greeting.classList.add(SHOWING_CN);
  const date = new Date();
  const hours = date.getHours();

  // 아침, 점심 , 저녁에 따라 greeting message 변경
  if (hours < 12 && hours > 0) {
    greeting.innerText = `Good Morning ${text}`;
  } else if (hours > 12 && hours < 18) {
    greeting.innerText = `Good afternoon ${text}`;
  } else {
    greeting.innerText = `Good Night ${text}`;
  }
}

//로컬스토리지에 유저정보 저장
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

//form에서 뭔가 제출하려는 이벤트를 캐치
function handleSubmit(event) {
  // form 제출시 새로고침 되는 현상 방지
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

// 이름 묻는다
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// 로컬스토리지로 부터 유저정보를 불러옴
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  //유저이름이 없을때
  if (currentUser === null) {
    askForName();
  } else {
    //유저 이름이 존재할때
    paintGreeting(currentUser);
  }
}

// 실행함수
function init() {
  loadName();
}

init();
