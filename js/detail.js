// 이미지 슬라이더 초기화
const swiper = new Swiper(".swiper", {
  // 기본 설정
  direction: "horizontal",
  loop: true,

  // 페이지네이션
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // 네비게이션 화살표
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // 자동 재생
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// 예약 버튼 클릭 이벤트
document
  .querySelector(".reservation-button")
  .addEventListener("click", function () {
    // 예약 페이지로 이동하는 로직
    // window.location.href = '/reservation.html';
    alert("예약 페이지로 이동합니다.");
  });

// 시설 정보 지도 초기화 (예시 - 실제 지도 API 구현 필요)
function initMap() {
  // 지도 초기화 로직
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    // 여기에 실제 지도 API (예: 카카오맵, 네이버맵) 초기화 코드 추가
  }
}

// 페이지 로드 완료 시 실행
document.addEventListener("DOMContentLoaded", function () {
  initMap();
});

// 시간 선택 기능
document.querySelectorAll(".time-slot").forEach((button) => {
  button.addEventListener("click", function () {
    // 이전에 선택된 버튼의 선택 해제
    document.querySelectorAll(".time-slot").forEach((btn) => {
      btn.classList.remove("selected");
    });

    // 현재 버튼 선택
    this.classList.add("selected");
  });
});
