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
  const agreeBox = document.querySelectorAll(".agree");
  const confirmBtn = document.querySelector(".confirm-btn");
  agreeBox.forEach((box) => {
    box.addEventListener("change", () => handelAllAgree(agreeBox, confirmBtn));
  });
}

checkAgreeBox();

function handelAllAgree(node, elem) {
  const isChecked = node[0].checked;
  node[1].checked = isChecked;
  node[2].checked = isChecked;
  elem.style.backgroundColor = "#ff8000";
  elem.style.cursor = "pointer";

  if (!isChecked) {
    elem.style.backgroundColor = "#888";
    elem.style.cursor = "not-allowed";
  }
}
