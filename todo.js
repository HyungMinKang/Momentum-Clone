const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

//버튼 클릭 이벤트 발생시 실행
function deleteToDo(event) {
  //누른 버튼이 몇번째 버튼인지 구체화
  const btn = event.target;
  // 그 버튼의 부모노드= li를 가져옴 - 실제로 지워야할 대상
  const li = btn.parentNode;
  //toDoList에서 target을 지운다 but 로컬스토리지에는 안지워짐
  toDoList.removeChild(li);
  // 추가적으로 toDoList 업데이트가 필요하다
  const cleanToDos = toDos.filter(function (toDo) {
    //toDo.id 우리가 지우려는 거  -> 그거랑 다른 아이디의 toDo만 반환
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//로칼스토리지에 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//화면에 toDo 추가
function paintToDo(text) {
  //li 태그(삭제버튼+ toDotext)를 ul아래 삽입

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  // id list.length +1 이렇게 해야 첫번째 요소는 id=1
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  //   리스트에 toDo 추가후 저장
  toDos.push(toDoObj);
  saveToDos();
}

//form에서 뭔가 제출하는 이벤트 발생시
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

//todo리스트 불러오기
function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    //   string으로 저장되어있는 toDoList를 object화해서 가져옴
    const parsedToDos = JSON.parse(loadedtoDos);
    //  object화된 toDos 배열에서 각 요소 하나마다 함수 실행(forEach)-
    // 어떤함수? paintToDo
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  // 로컬 스토리지에 있는것을 불러오기
  loadToDos();
  //   form에 무언가를 작성하고 제출했을 때
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
