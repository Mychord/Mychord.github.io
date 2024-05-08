import { Snow } from "../utils/snow/snow.js";
// 点击事件触发类型
let triggerClick = "";

// 根据浏览器是PC端还是移动端决定点击事件触发类型
if (isMobile()) {
  triggerClick = "touchstart";
} else {
  triggerClick = "click";
}

// 判断浏览器是PC端还是移动端
function isMobile() {
  let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return flag;
}

/* 0 <= clickCount <= 4 */
/* ------------------------------------------------------------------------------ */
// 点击漩涡的次数
let clickCount = 0;

// 跳转链接
const startLink = document.getElementById("start-link");
// 开始按钮
const startButton = document.getElementById("start-button");
// Logo
const logo = document.querySelector(".logo");

startLink.addEventListener(triggerClick, (e) => {
  // 停止冒泡
  e.stopPropagation();
});

// 产生漩涡图片随机位置
function randomLocation() {
  // 产生随机数 0.1 ~ 0.4  | 0.6 ~ 0.9
  const randomNum = () => {
    return 0.3 * Math.random() + (Math.random() < 0.5 ? 0.1 : 0.6);
  };

  const randomLeft = `${Math.round(document.documentElement.clientWidth * randomNum())}px`;
  const randomTop = `${Math.round(document.documentElement.clientHeight * randomNum())}px`;

  return [randomLeft, randomTop];
}

// 漩涡图片
const vortex = document.querySelector(".vortex");
// 随机位置
[vortex.style.left, vortex.style.top] = randomLocation();

// 雪花特效
const snow = new Snow();

// 为漩涡图片添加点击事件
vortex.addEventListener(triggerClick, (event) => {
  clickCount = (clickCount + 1) % 5;
  if (clickCount == 0) {
    vortex.src = "resources/images/vortex.png";
    vortex.classList.remove("moon");
    document.body.classList.remove("secret");
    startButton.classList.remove("secret");
    logo.classList.remove("remove");
    logo.style.display = "block";
    snow.stop();
    startLink.href = "pages/normal.html";
  } else if (clickCount == 1) {
    logo.classList.add("remove");
    setTimeout(() => {
      logo.style.display = "none";
    }, 500);
    startLink.href = "pages/spring.html";
  } else if (clickCount == 2) {
    startLink.href = "pages/summer.html";
  } else if (clickCount == 3) {
    startLink.href = "pages/autumn.html";
  } else if (clickCount == 4) {
    vortex.src = "resources/images/moon.jpg";
    vortex.classList.add("moon");
    document.body.classList.add("secret");
    startButton.classList.add("secret");
    snow.start();
    event.stopPropagation();
    startLink.href = "pages/winter.html";
  }
  if (clickCount !== 4) {
    [vortex.style.left, vortex.style.top] = randomLocation();
  } else {
    [vortex.style.left, vortex.style.top] = [`${document.documentElement.clientWidth - vortex.width - 20}px`, "20px"];
  }
  // 阻止移动端点击图片放大
  event.preventDefault();
});
