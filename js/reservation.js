const couponBtn = document.querySelector(".apply-coupon");

function selectDeposit() {
  // 결제수단을 선택할때에 따라 현금영수증 체크버튼 on/off
  const radioWrap = document.querySelectorAll(".radio-wrap");
  const inputNumber = document.querySelector(".input-bar");
  const deposit = document.querySelectorAll("input[name='payment']");

  deposit.forEach((btn) => {
    btn.addEventListener("change", (e) => {
      if (e.currentTarget === document.querySelector("#insert")) {
        radioWrap[1].removeAttribute("disabled");
        inputNumber.removeAttribute("disabled");
        changeRadioBtnColor("#222");
      } else {
        radioWrap[1].setAttribute("disabled", "");
        inputNumber.setAttribute("disabled", "");
        disabledCashMenu();
        changeRadioBtnColor("#888");
      }
    });
  });
}

selectDeposit();

function changeRadioBtnColor(color) {
  // 무통장입금선택시 현금영수증메뉴 활성화
  document.querySelector('label[for="none"]').style.color = color;
  document.querySelector('label[for="indivisual"]').style.color = color;
  document.querySelector('label[for="company"]').style.color = color;
}

function disabledCashMenu() {
  // 무통장입금이 아닐시 현금영수증메뉴 비활성화
  document.querySelector(".cash-number").value = "";
  document.querySelector('input[value="none"]').checked = false;
  document.querySelector('input[value="indivisual"]').checked = false;
  document.querySelector('input[value="company"]').checked = false;
}

function handleCoupon(opacity, prop) {
  // 모달창 애니메이션기능
  const modal = document.querySelector(".modal");
  modal.style.opacity = opacity;
  modal.style.pointerEvents = prop;
}

function showCoupon() {
  // 쿠폰적용하기 누르면 모달창나오는버튼
  couponBtn.addEventListener("click", () => handleCoupon(1, "auto"));
}
showCoupon();

function back() {
  // 쿠폰 모달창에서 뒤로가기 버튼 누르면 뒤로가기 처럼 보이는 기능
  const arrow = document.querySelector(".arrow");

  arrow.addEventListener("click", () => handleCoupon(0, "none"));
}
back();

function appliedCoupon() {
  // 쿠폰 적용시 어떤쿠폰이 적용됬는지 표시
  const applied = document.querySelector(".applied-coupon");
  let template = `
  <li class="applied-coupon-list">회원가입 축하 10% 할인 쿠폰 <span class="cancle-btn">X</span></li>
  `;
  applied.insertAdjacentHTML("beforeend", template);
  cancleCoupon();
}

function applyCoupon() {
  // 쿠폰을 적용하면 쿠폰적용버튼 사라짐
  const disCountCoupon = document.querySelector(".discount-coupon");
  disCountCoupon.addEventListener("click", () => {
    handleCoupon(0, "none");
    couponBtn.setAttribute("hidden", "");
    appliedCoupon();
  });
}

applyCoupon();

function cancleCoupon() {
  // 적용된 쿠폰의 x버튼누르면 쿠폰 적용취소 기능
  const cancleBtn = document.querySelector(".cancle-btn");
  const couponList = document.querySelector(".applied-coupon-list");
  cancleBtn.addEventListener("click", () => {
    couponList.remove();
    couponBtn.removeAttribute("hidden");
  });
}

function checkAgreeBox() {
  // 체크박스 체크에따른 컨디션 조정 함수
  const agreeBoxes = document.querySelectorAll(".agree");
  const allAgree = agreeBoxes[0];
  const indivisualAgree = agreeBoxes[1];
  const individualBoxes = [agreeBoxes[1], agreeBoxes[2]];
  const confirmBtn = document.querySelector(".confirm-btn");

  allAgree.addEventListener("change", () => {
    handleAllAgree(allAgree, individualBoxes);
    individualCheck(allAgree, individualBoxes);
    handleConfirmBtn(indivisualAgree, confirmBtn);
  });

  indivisualAgree.addEventListener("change", () =>
    handleConfirmBtn(indivisualAgree, confirmBtn)
  );

  confirmBtn.addEventListener("click", () => {
    goConfirmPage(indivisualAgree);
  });
}

function handleAllAgree(node, arr) {
  // 전체동의를 누르면 모든 체크박스가 체크되는 기능
  const isChecked = node.checked;
  arr.forEach((box) => {
    box.checked = isChecked;
  });
}

function individualCheck(node, arr) {
  // 개별 체크박스 체크에 따른 전체 동의하기버튼 자동체크기능
  arr.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (arr.every((b) => b.checked)) {
        node.checked = true;
      } else {
        node.checked = false;
      }
    });
  });
}

function handleConfirmBtn(node, elem) {
  // 동의서 체크에 따라서 결제진행버튼 활성화 / 비활성화
  if (node.checked) {
    elem.classList.add("active");
  } else {
    elem.classList.remove("active");
  }
}

checkAgreeBox();

function goConfirmPage(node) {
  // 결제 진행 버튼 누를시 예약완료페이지로이동
  if (node.checked) {
    location.href = "./reservation_complete.html";
  }
}
