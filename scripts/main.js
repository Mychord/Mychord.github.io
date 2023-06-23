// 点击漩涡的次数
let clickCount = 0;

// 开始按钮
const startButton =  document.getElementById("start");
// 为开始按钮添加点击事件
startButton.addEventListener("click", () => {
  if(clickCount < 4) window.location.href = "normal.html";
  else window.location.href = "secret.html";
});


// 产生随机位置
function randomLocation() {
  // 产生随机数 0.1 ~ 0.4  | 0.6 ~ 0.9
  const randomNum = () => {
    return 0.3 * Math.random() + (Math.random() < 0.5 ? 0.1 : 0.6);
  };

  const randomLeft = Math.round(window.innerWidth * randomNum()) + "px";
  const randomTop = Math.round(window.innerHeight * randomNum()) + "px";

  return [randomLeft, randomTop];
}

// 漩涡图片
const vortex = document.createElement("img");
vortex.src = "images/vortex.png";
vortex.id = "vortex";
// 随机位置
[vortex.style.left, vortex.style.top] = randomLocation();
document.body.append(vortex);
// 为漩涡图片添加点击事件
vortex.addEventListener("click", () => {
  clickCount++;
  if(clickCount == 5) {
    vortex.remove();
    document.body.style.backgroundColor = "black";
    startButton.classList.add("secret");
  }
  else {
    [vortex.style.left, vortex.style.top] = randomLocation();
  }
})
