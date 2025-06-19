const data = [
  {
    title: `골프 모임 "결"🌸🌸🌸🌸🌸🌸`,
    introduction: `신입회원 모집중(명문 회원제 구장 정기라운드)

결이 비슷한 사람들의 골프모임 "결"

정기라운딩 (월2회) (평일1회 주말1회)
(다수의 회원간 개별 라운딩)

저희는 회원제(비공개) 명문골프장 으로 
연부킹(회원할인) 잡혀있는 단체 입니다
필드위주 모임 입니다

카카오톡 단톡방에 다수의 개별 라운딩 모임이
실시간으로 올라 옵니다

단톡방 입장방법은 소모임 채팅방에
단톡방 초대 부탁드립니다  라고 쓰시면
단톡방 url 로 초대해 드립니다`,
    category: "골프",
    area: "서울 강남구",
    photo:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MjZfMjQz%2FMDAxNjg3Nzg0ODI4ODIw.YtQzTJBTm7Airz_ZR9pm4qe2JDAY2bXwz4AEqoZhI5Ug.8KTbThcpnpwwRQe41JCPU_Oa3snQnol9q5eASIvTaHIg.JPEG.green_sketchbook%2F%25C4%25AB%25C4%25AB%25BF%25C0%25B0%25F1%25C7%25C1.jpg&type=a340",
  },
  {
    title: "한마음 cycling",
    introduction: `샤방샤방  경치 먹방 즐기며   힐링 ~~~ 
자전거모임 입니다
동종 타모임  모임장  운영진  환영합니다 
모두가 한마음 입니다♡
나이제한 몸무게  자전거기종 제한  없어요^^
48시간 안에 자소서 쓰기♡
언제 누구든  벙 개최 가능^^뽐내보세요
마구마구  뽐뽐뽐!!!`,
    category: "자전거",
    area: "서울 노원구",
    photo:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA1MjZfMjEy%2FMDAxNTkwNDc0MzkwMDQ5.vIKFMvqVqr15v10ufdO7NOrBWsbDyNAv0Z6rOpI2s6wg.rf4lLu1gpOptLfkswVTwEuXhbVVVPCnH1X8ve10uohUg.JPEG.dca0492%2FDSC02458.JPG&type=a340",
  },
];

function handleGolf() {
  const communityBox = document.querySelectorAll(".communityBox");
  communityBox.forEach((id) => {
    if (!(id.id === "골프")) {
      id.hidden = true;
    }
  });
}

function print(photo, title, area, category) {
  const tem = `<div class="communityBox"id="${category}">
            <div class="box">
            <div class="imageContainer">
              <div class="likeButton"></div>
              <img
                src="${photo}"
              />
            </div>
            <div class="textContainer">
              <p class="area">${area}</p>
              <p class="title">${title}</p>
            </div></div>
          </div>`;
  const communityBoxs = document.querySelector(".communityBoxs");
  communityBoxs.insertAdjacentHTML("beforeend", tem);
}

function mola() {
  data.forEach(({ photo, title, area, category }) => {
    // console.log(title, introduction);
    print(photo, title, area, category);
  });
  const golf = document.querySelector(".golf");
  golf.addEventListener("click", handleGolf);
}
mola();
