// 이미지 슬라이더 초기화
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// 예약 정보 상태
const reservationData = {
  facilityName: document.querySelector(".facility-name").textContent,
  location: document.querySelector(".info-card p").textContent,
  selectedDate: new Date().toISOString().split("T")[0],
  selectedTime: "",
  people: 1,
  totalPrice: 30000,
};

// 오늘 날짜 표시
function displayTodayDate() {
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = today.toLocaleDateString("ko-KR", options);
  document.querySelector(".today-date").textContent = formattedDate;
}

// 인원 수 업데이트
function updatePeopleCount(change) {
  const newCount = reservationData.people + change;
  if (newCount >= 1 && newCount <= 10) {
    reservationData.people = newCount;
    document.querySelector(".people-count").textContent = `${newCount}명`;
    updateTotalPrice();
  }
}

// 총 가격 업데이트
function updateTotalPrice() {
  reservationData.totalPrice = 30000 * reservationData.people;
  document.querySelector(
    ".total-price"
  ).textContent = `${reservationData.totalPrice.toLocaleString()}원`;
}

function setupEventListeners() {
  // 시간 선택
  document.querySelectorAll(".time-slot").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".time-slot").forEach((btn) => {
        btn.classList.remove("selected");
      });
      this.classList.add("selected");
      reservationData.selectedTime = this.textContent;
    });
  });

  // 인원 조절
  document.querySelector(".decrease").addEventListener("click", () => {
    updatePeopleCount(-1);
  });

  document.querySelector(".increase").addEventListener("click", () => {
    updatePeopleCount(1);
  });

  // 예약 버튼
  document
    .querySelector(".reservation-button")
    .addEventListener("click", function () {
      if (!reservationData.selectedTime) {
        alert("이용 시간을 선택해주세요.");
        return;
      }

      const params = new URLSearchParams({
        facilityName: reservationData.facilityName,
        location: reservationData.location,
        date: reservationData.selectedDate,
        time: reservationData.selectedTime,
        people: reservationData.people,
        totalPrice: reservationData.totalPrice,
      });

      window.location.href = `/pages/reservation.html?${params.toString()}`;
    });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  displayTodayDate();
  setupEventListeners();
});
