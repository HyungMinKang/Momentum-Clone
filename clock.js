// html에서 js-clock클래스를 가지는것을 가져온다
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

// 현재 시간정보 가져오기
function getTime() {
  const date = new Date();
  const minitues = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  //   시/분/초가  10미만일때  9, 8, 7 이 아니라 09,08,07형식으로 표시되기 위한 삼항연산자
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minitues < 10 ? `0${minitues}` : minitues
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  //   함수 실행간격 설정
  setInterval(getTime, 1000);
}

init();
