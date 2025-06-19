import { data } from "../data/communityData.js";

function handleGolf() {
  const communityBox = document.querySelectorAll(".communityBox");
  communityBox.forEach((id) => {
    if (!(id.id === "골프")) {
      id.hidden = true;
    }
  });
}

function print(photo, title, area, category) {
  const tem = `<div class="communityBox"id="${category}">
            <div class="box">
            <div class="imageContainer">
              <div class="likeButton"></div>
              <img
                src="${photo}"
              />
            </div>
            <div class="textContainer">
              <p class="area">${area}</p>
              <p class="title">${title}</p>
            </div></div>
          </div>`;
  const communityBoxs = document.querySelector(".communityBoxs");
  communityBoxs.insertAdjacentHTML("beforeend", tem);
}

function mola() {
  data.forEach(({ photo, title, area, category }) => {
    // console.log(title, introduction);
    print(photo, title, area, category);
  });
  const golf = document.querySelector(".golf");
  golf.addEventListener("click", handleGolf);
}
mola();
