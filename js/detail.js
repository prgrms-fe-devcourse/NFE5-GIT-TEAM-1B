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

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const placeName = decodeURIComponent(urlParams.get("place_name") || "");
  const categoryName = decodeURIComponent(urlParams.get("category_name") || "");
  const address = decodeURIComponent(urlParams.get("address") || "");

  updateFacilityInfo(placeName, categoryName, address);

  displayTodayDate();
  setupEventListeners();

  // Swiper 초기화
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 리뷰 폼 초기화
  initReviewForm();
});

function updateFacilityInfo(placeName, categoryName, address) {
  // 시설 이름
  const facilityName = document.querySelector(".facility-name");
  if (facilityName) {
    facilityName.textContent = placeName;
  }

  // 주소
  const locationText = document.querySelector(
    ".facility-info-grid .info-card p"
  );
  if (locationText) {
    locationText.textContent = address;
  }

  // 카테고리에 따른 아이콘
  const categoryIcon = getCategoryIcon(categoryName);
  const iconContainer = document.querySelector(".facility-header");
  if (iconContainer && categoryIcon) {
    const existingIcon = iconContainer.querySelector(".category-icon");
    if (existingIcon) {
      existingIcon.remove();
    }

    const iconElement = document.createElement("i");
    iconElement.className = `fa-solid ${categoryIcon} category-icon`;
    iconElement.style.marginRight = "10px";
    iconElement.style.color = "#ff8000";
    facilityName.insertBefore(iconElement, facilityName.firstChild);
  }
}

function getCategoryIcon(categoryName) {
  const categoryMap = {
    헬스: "fa-dumbbell",
    필라테스: "fa-child",
    크로스핏: "fa-person-running",
    테니스: "fa-baseball",
    수영: "fa-person-swimming",
    배드민턴: "fa-badminton",
    복싱: "fa-hand-fist",
  };

  for (const [key, icon] of Object.entries(categoryMap)) {
    if (categoryName.includes(key)) {
      return icon;
    }
  }

  return "fa-dumbbell";
}

// 리뷰 폼 초기화
function initReviewForm() {
  const reviewForm = document.getElementById("reviewForm");
  if (!reviewForm) return;

  const textarea = reviewForm.querySelector(".review-input textarea");
  const charCount = reviewForm.querySelector(".char-count");

  // 글자 수 카운트
  textarea.addEventListener("input", function () {
    const length = this.value.length;
    charCount.textContent = `${length}/200`;
  });

  // 리뷰 제출
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (textarea.value.trim() === "") {
      alert("후기 내용을 작성해주세요.");
      return;
    }

    // 새 리뷰 추가
    addNewReview(textarea.value);

    // 폼 초기화
    textarea.value = "";
    charCount.textContent = "0/200";

    alert("후기가 등록되었습니다.");
  });
}

// 새 리뷰 추가
function addNewReview(content) {
  const reviewList = document.querySelector(".review-list");
  if (!reviewList) return;

  const newReview = document.createElement("div");
  newReview.className = "review-item";

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;

  newReview.innerHTML = `
      <div class="review-info">
          <div class="reviewer">
              <span class="reviewer-name">범범</span>
              <span class="review-date">${formattedDate}</span>
          </div>
      </div>
      <p class="review-content">${content}</p>
  `;

  reviewList.insertBefore(newReview, reviewList.firstChild);
}
