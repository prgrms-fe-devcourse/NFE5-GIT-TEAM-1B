import { data } from '../data/communityData.js';

// 내 위치 띄우기
window.addEventListener('DOMContentLoaded', function () {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lng, lat, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const regionName =
              result[0].region_3depth_name || result[0].address_name;
            document.querySelector('.location').childNodes[0].nodeValue =
              regionName + ' ';
          }
        });
      },
      function (error) {

      }
    );
  }
});


// 카테고리 클릭 시 해당 이름으로 검색 페이지 이동
document.querySelectorAll('.category').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const label = this.querySelector('span').textContent.trim(); // span 태그 안의 텍스트를 읽어온다
    const keyword = (label === '수영') ? '수영장' : label; // 수영이면 수영장
    window.location.href = `./pages/search_list.html?query=${encodeURIComponent(keyword)}`;
  });
});


// 태그 클릭 시 해당 이름으로 검색 페이지 이동
document.querySelectorAll('.tag').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const keyword = this.textContent.trim();
    window.location.href = `./pages/search_list.html?query=${encodeURIComponent(keyword)}`;
  });
});


// 검색어 없을 때 페이지 이동 막고 alert창 띄우기
document.querySelector('.search-input-wrap').addEventListener('submit', function(e) {
  const input = this.querySelector('input[name="query"]');
  if (!input.value.trim()) {
    e.preventDefault(); // form 제출 막기
    alert('검색어를 입력해 주세요.');
    input.focus(); // 입력창에 포커스 이동
  }
});


// communityData.js 사진 가져와서 뿌리기
const cardArea = document.querySelector('.community-cards');

cardArea.innerHTML = data.map(item => `
  <a href="#" class="card">
    <img src="${item.photo}" alt="${item.title}">
  </a>
`).join('');