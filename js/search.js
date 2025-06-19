let userLocation = null; // 내 위치 초기화
let customOverlay = null; // 커스텀 오버레이
let markers = [];// 마커 담을 배열
let mapContainer = document.querySelector('#map'); // 지도 표시할 div 
let mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도 중심좌표(기본값:서울역)
        level: 3 // 지도 확대 레벨
    };
// 1. 지도 생성   
let map = new kakao.maps.Map(mapContainer, mapOption); 
// 2. 장소 검색 객체 생성
let ps = new kakao.maps.services.Places();



// 키워드로 장소 검색
function searchPlaces() {
   const keyword = document.querySelector('#keyword').value.trim();

    if (!keyword) {
        alert('키워드를 입력해주세요!');
        return;
    }

    // 위치를 먼저 받아온 후 검색 실행
    getUserLocation(function () {
    ps.keywordSearch(keyword, placesSearchCB, {
      location: userLocation   // ✅ 현재 위치 기반으로 검색
    });
  });
}


// 장소검색이 완료됐을 때 호출되는 콜백함수
function placesSearchCB(data, status, pagination) {
    
    if (status === kakao.maps.services.Status.OK) {
        // 카테고리에 "스포츠"가 포함된 항목만 필터링
        const filtered = data.filter(place =>
            place.category_name && place.category_name.includes('스포츠')
        );

        if (filtered.length > 0) {
            displayPlaces(filtered);
            displayPagination(pagination);
        } else {
            alert('스포츠 관련 장소가 없습니다.');
            return;
        }

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}


// 검색 결과 목록과 마커를 표출하는 함수
function displayPlaces(places) {
    let listEl = document.querySelector('#placesList');
    let menuEl = document.querySelector('#menu_wrap');
    let fragment = document.createDocumentFragment();
    let bounds = new kakao.maps.LatLngBounds();
    
    // 검색 결과 목록 전체 제거
    removeAllChildNodes(listEl);

    // 지도에 표시되고 있는 마커 전체 제거
    removeMarker();
    
    for ( let i=0; i<places.length; i++ ) {

        // 마커 생성 후 지도에 표시
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        let marker = addMarker(placePosition, i); // 마커 생성, 지도 위에 마커 표시
        let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element 생성

        // 검색된 장소의 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명 표시
        // mouseout 했을 때는 인포윈도우 닫기
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayCustomOverlay(marker, title)
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                if (customOverlay) customOverlay.setMap(null);
            });

            itemEl.onmouseover =  function () {
                displayCustomOverlay(marker, title);
                //해당 위치를 화면 정가운데 오도록 지도 이동
                map.panTo(marker.getPosition());
            };

            itemEl.onmouseout =  function () {
                if (customOverlay) customOverlay.setMap(null);
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위 재설정
    map.setBounds(bounds);
}


// 검색결과 항목을 Element로 반환
function getListItem(index, places) {

    let el = document.createElement('li');
    let itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           


    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}


// 마커 생성, 지도 위에 마커 표시
function addMarker(position, idx, title) {
    let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커 표시
    markers.push(marker);  // 배열에 생성된 마커 추가

    return marker;
}


// 지도 위에 표시되고 있는 마커 전부 제거
function removeMarker() {
    for ( let i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}


// 검색결과 목록 하단에 페이지네이션 표시
function displayPagination(pagination) {
    let paginationEl = document.querySelector('#pagination');
    let fragment = document.createDocumentFragment();
    let i;

    // 기존 페이지네이션 삭제
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        let el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}


 // 검색결과 목록의 자식 Element 제거 (목록 전체 제거)
function removeAllChildNodes(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}


// 내위치로 지도 이동
document.querySelector('#myLocationBtn').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const locPosition = new kakao.maps.LatLng(lat, lng);
            const message = '<div style="padding:5px;">현재 위치</div>';

            displayMyLocation(locPosition, message);
        }, function (error) {
            alert('위치 정보를 가져오지 못했습니다.');
            console.error(error);
        });
    } else {
        alert('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
    }
});


// 내위치 표시 함수
function displayMyLocation(locPosition) {
  // 기존 마커나 오버레이 제거하려면 여기에 저장해둬야 함 (원하면 추가 가능)

  // 커스텀 HTML 오버레이로 깜빡이는 빨간 원 생성
  const content = '<div class="blinking-marker"></div>';

  new kakao.maps.CustomOverlay({
    position: locPosition,
    content: content,
    map: map
  });

  // 해당 위치를 화면 정가운데 오도록 지도 이동
  map.panTo(locPosition);
}


// 내위치 가져오는 함수
function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      userLocation = new kakao.maps.LatLng(lat, lng);
      callback(); // 위치 받아온 후 검색 실행
    }, function () {
      // 실패 시 기본값 사용 (서울 시청 근처)
      userLocation = new kakao.maps.LatLng(37.566826, 126.9786567);
      callback();
    });
  } else {
    userLocation = new kakao.maps.LatLng(37.566826, 126.9786567);
    callback();
  }
}

// 마커 hover 했을때 나오는 커스텀 오버레이
function displayCustomOverlay(marker, title) {
  // 기존 오버레이 제거
  if (customOverlay) customOverlay.setMap(null);

  const content = `
    <div class="custom-overlay">
      <div class="custom-overlay-content">
        ${title}
      </div>
    </div>
  `;

  customOverlay = new kakao.maps.CustomOverlay({
    content: content,
    position: marker.getPosition(),
    yAnchor: 2.5,
    zIndex: 3
  });

  customOverlay.setMap(map);
}