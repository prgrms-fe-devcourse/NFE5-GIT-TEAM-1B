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
  selectedTimeRange: "",
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
      const startTime = this.textContent;
      const endTime = getEndTime(startTime);
      reservationData.selectedTime = startTime;
      reservationData.selectedTimeRange = `${startTime} ~ ${endTime}`;
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
        time: reservationData.selectedTimeRange,
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
  initializeMap(address, placeName);
  updateSwiperImages(categoryName);
  initializeSwiper();

  displayTodayDate();
  setupEventListeners();

  initReviewForm();
});

function initializeMap(address, placeName) {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  const mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심좌표
    level: 3, // 지도 확대 레벨
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);

  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      const marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${placeName}</div>`,
      });
      infowindow.open(map, marker);

      map.setCenter(coords);
    }
  });
}

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

// 카테고리별 이미지 매핑
function getCategoryImages(categoryName) {
  const imageMap = {
    수영: [
      "https://health.chosun.com/site/data/img_dir/2022/05/09/2022050901783_0.jpg",
      "https://file.scourt.go.kr/crosseditor/images/000001/20230405110003809_POS5DNG0.jpg",
    ],
    헬스: [
      "https://img7.yna.co.kr/photo/etc/epa/2016/08/19/PEP20160819120201034_P4.jpg",
      "https://image.inews24.com/image_joy/202102/1613627520599_1_145206.jpg",
    ],
    필라테스: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlpOGrkgeA1O7Yl6P5kQvRaD5CjJHNfggXlQ&s",
      "https://www.ftimes.kr/news/photo/202203/17048_19617_5528.jpg",
    ],
    크로스핏: [
      "https://cdn.news.hidoc.co.kr/news/photo/202006/22450_53456_0609.jpg",
      "https://cdn.news.hidoc.co.kr/news/photo/202006/22450_53454_0609.jpg",
    ],
    테니스: [
      "https://www.k-health.com/news/photo/202305/65654_71091_4726.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKv2ZkdHuktirkvsI4QBxvYgVFK0rMkh02Q&s",
    ],
    배드민턴: [
      "https://image.dongascience.com/Photo/2017/02/14878992402677.png",
      "https://cdn.idjnews.kr/news/photo/202408/205541_207513_3652.jpg",
    ],
    복싱: [
      "https://stone-i-dagym-centers.s3.ap-northeast-2.amazonaws.com/images/gyms/15a3553650e42224dc/2YC4uRtjkZGF53D6mw7vbFV3e2D6Tdhjj6Ur.Big_DSC09810.jpg",
      "https://img7.yna.co.kr/photo/etc/epa/2016/08/19/PEP20160819120201034_P4.jpg",
    ],
  };

  // 카테고리 이름에서 매칭되는 키워드 찾기
  for (const [key, images] of Object.entries(imageMap)) {
    if (categoryName.includes(key)) {
      return images;
    }
  }

  // 기본 이미지
  return [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800",
  ];
}

function updateSwiperImages(categoryName) {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  if (!swiperWrapper) return;

  // 기존 슬라이드 제거
  swiperWrapper.innerHTML = "";

  // 카테고리에 맞는 이미지 가져오기
  const images = getCategoryImages(categoryName);

  // 이미지 슬라이드 추가
  images.forEach((imageUrl) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `<img src="${imageUrl}" alt="시설 이미지">`;
    swiperWrapper.appendChild(slide);
  });
}

function initializeSwiper() {
  return new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// 종료 시간 계산 함수
function getEndTime(startTime) {
  const [hours] = startTime.split(":");
  const endHour = (parseInt(hours) + 1).toString().padStart(2, "0");
  return `${endHour}:00`;
}
