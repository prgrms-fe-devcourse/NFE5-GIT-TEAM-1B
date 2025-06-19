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
    // span 태그 안의 텍스트를 읽어온다
    // 수영이면 수영장
    const label = this.querySelector('span').textContent.trim();
    const keyword = (label === '수영') ? '수영장' : label;
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