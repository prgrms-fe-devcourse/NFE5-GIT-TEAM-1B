import { data } from "../data/communityData.js";

const communityBoxs = document.querySelector(".communityBoxs");
const golfBtn = document.querySelector(".golf");
const cycleBtn = document.querySelector(".cycle");
const badmintonBtn = document.querySelector(".badminton");
const bowlingBtn = document.querySelector(".bowling");
const resetBtn = document.querySelector(".resetButton");

//태그 생성
function createCommunityBox({
  photo = "photo",
  title = "title",
  area = "area",
  category = "category",
}) {
  return `<div class="communityBox"id="${category}">
            <div class="box">
            <div class="imageContainer">
              <div class="likeButton"></div>
              <img
                src="${photo}"
              />
            </div>
            <div class="textContainer">
              <p class="area">${area} · ${category}</p>
              <p class="title">${title}</p>
            </div></div>
          </div>`;
}

//태그 렌더링
function renderCommunityBox(target, data) {
  target.insertAdjacentHTML("beforeend", createCommunityBox(data));
}

function renderCommunityList() {
  data.forEach((data) => renderCommunityBox(communityBoxs, data));
}
renderCommunityList();

// 필터링
function filterCategory(categoryValue) {
  const communityBoxs = document.querySelectorAll(".communityBox");
  communityBoxs.forEach((communityBox) => {
    if (!(communityBox.id === categoryValue)) {
      communityBox.hidden = true;
    } else {
      communityBox.hidden = false;
    }
  });
}
//필터링 초기화
function filterReset() {
  const communityBoxs = document.querySelectorAll(".communityBox");
  communityBoxs.forEach((communityBox) => {
    communityBox.hidden = false;
  });
}

//클릭한 필터 버튼 활성화
function isActiveFilterBtn(e) {
  const bowlingBtn = document.querySelector(".bowling");
  const target = e.target;
  console.log(target);
  // bowlingBtn.classList.add("active");
  const btns = document.querySelectorAll(".filterList li");
  console.log(btns);

  btns.forEach((btn) => {
    if (btn !== target) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
}

//좋아요
function isActiveLike(e) {
  const target = e.target;
  target.classList.toggle("active");
}

badmintonBtn.addEventListener("click", () => filterCategory("배드민턴"));
bowlingBtn.addEventListener("click", () => filterCategory("볼링"));
golfBtn.addEventListener("click", () => filterCategory("골프"));
cycleBtn.addEventListener("click", () => filterCategory("자전거"));
resetBtn.addEventListener("click", isActiveFilterBtn);

badmintonBtn.addEventListener("click", isActiveFilterBtn);
bowlingBtn.addEventListener("click", isActiveFilterBtn);
golfBtn.addEventListener("click", isActiveFilterBtn);
cycleBtn.addEventListener("click", isActiveFilterBtn);
resetBtn.addEventListener("click", filterReset);

//DOM이 로드된 후에만 likeButton을 찾고 이벤트 핸들러를 등록
document.addEventListener("DOMContentLoaded", function () {
  const likeBtns = document.querySelectorAll(".likeButton");
  if (likeBtns) {
    likeBtns.forEach((likebtn) => {
      likebtn.addEventListener("click", isActiveLike);
    });
  }
});
