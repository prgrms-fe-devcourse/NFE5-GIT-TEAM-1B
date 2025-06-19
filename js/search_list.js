let userLocation = null; // 내 위치 변수

// 내 위치 가져오기
function setUserLocation(callback) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        userLocation = new kakao.maps.LatLng(lat, lng);

        // 주소 표시
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lng, lat, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const regionName =
              result[0].region_3depth_name || result[0].address_name;
            document.querySelector('.location').childNodes[0].nodeValue =
              regionName + ' ';
          }
        });

        if (callback) callback();
      },
      function (error) {
        if (callback) callback();
      }
    );
  } else {
    if (callback) callback();
  }
}

// 카카오api 검색 리스트
let ps = new kakao.maps.services.Places();
let allResults = [];
let currentPage = 1;
const itemsPerPage = 7;

function renderPage(page) {
  const resultList = document.getElementById('resultList');
  resultList.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allResults.slice(start, end);

  pageItems.forEach(place => {
    const params = new URLSearchParams({
      place_name: place.place_name,
      category_name: place.category_name,
      address: place.road_address_name || place.address_name,
    });

    const li = document.createElement('li');
    li.className = "result-item";
    li.innerHTML = `
      <a href="../pages/detail.html?${params.toString()}">
        <div class="result-title">${place.place_name}</div>
        <div class="result-category">${place.category_name}</div>
        <div class="result-address">${place.road_address_name || place.address_name}</div>
        <div class="result-phone">${place.phone || ''}</div>
      </a>
    `;
    resultList.appendChild(li);
  });
}

// 페이지네이션
function renderPagination() {
  const paginationEl = document.getElementById('pagination');
  paginationEl.innerHTML = '';
  const totalPages = Math.ceil(allResults.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.className = 'page-btn';
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage);
      renderPagination();
    });
    paginationEl.appendChild(btn);
  }
}


// 전체 검색 결과 재귀적 수집
function fetchAllResults(query, collected = [], page = 1) {
  return new Promise((resolve) => {
    ps.keywordSearch(
      query,
      function (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          collected = collected.concat(data);

          if (pagination.hasNextPage) {
            pagination.gotoPage(page + 1);
            setTimeout(() => {
              fetchAllResults(query, collected, page + 1).then(resolve);
            }, 200);
          } else {
            const filtered = collected.filter(place =>
              place.category_name && place.category_name.includes('스포츠')
            );
            resolve(filtered);
          }
        } else {
          resolve([]);
        }
      },
      {
        page,
        ...(userLocation ? { location: userLocation } : {}),
      }
    );
  });
}


// 검색
document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  const resultList = document.getElementById('resultList');
  const noResult = document.getElementById('noResult');
  const pagination = document.getElementById('pagination');

  resultList.innerHTML = '';
  pagination.innerHTML = '';
  noResult.style.display = 'none';
  currentPage = 1;
  allResults = [];

  if (!query) {
    alert('검색어를 입력하세요.');
    return;
  }

  allResults = await fetchAllResults(query);

  if (allResults.length > 0) {
    renderPage(currentPage);
    renderPagination();
    noResult.style.display = 'none';
  } else {
    noResult.style.display = 'block';
  }
});


// 페이지 로드 시 URL 파라미터에 query가 있으면 자동 검색
window.addEventListener('DOMContentLoaded', () => {
  setUserLocation(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      document.getElementById('searchInput').value = query;
      document.getElementById('searchForm').dispatchEvent(new Event('submit', { bubbles: true }));
    }
  });
});