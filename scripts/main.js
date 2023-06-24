// 点击漩涡的次数
let clickCount = 0;

// 开始按钮
const startButton = document.getElementById("start-button");
// 为开始按钮添加点击事件
startButton.addEventListener("click", () => {
  if (clickCount < 4) window.location.href = "normal.html";
  else window.location.href = "secret.html";
});


// 产生随机位置
function randomLocation() {
  // 产生随机数 0.1 ~ 0.4  | 0.6 ~ 0.9
  const randomNum = () => {
    return 0.3 * Math.random() + (Math.random() < 0.5 ? 0.1 : 0.6);
  };

  const randomLeft = `${Math.round(window.innerWidth * randomNum())}px`;
  const randomTop = `${Math.round(window.innerHeight * randomNum())}px`;

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
  if (clickCount == 5) {
    vortex.remove();
    document.body.style.backgroundColor = "black";
    startButton.classList.add("secret");
    snow();
  }
  else {
    [vortex.style.left, vortex.style.top] = randomLocation();
  }
});

// 雪花对象
class Snowflake {
  constructor(el) {
    // 下降速度
    this.speed = 20;
    // 初始位置
    this.left = Math.round(Math.random() * window.innerWidth);
    this.top = 0;
    // 绑定元素
    this.el = el;
    // 标识时间间隔的 id
    this.intervalId = null;
  }
  fall() {
    // 设置初始位置
    this.el.style.left = `${this.left}px`;
    this.el.style.top = `${this.top}px`;
    // 雪花透明度
    this.el.style.opacity = (Math.round(Math.random() * 4) + 6) / 10;
    // 雪花大小
    this.el.style.fontSize = `${16 + Math.round(Math.random() * 20)}px`
    this.intervalId = setInterval(() => {
      this.falling();
    }, 200);
  }
  falling() {
    if(this.left < window.innerWidth && this.left >= 0 && this.top < window.innerHeight) {
      this.left += Math.round(Math.random() > 0.5 ? Math.random() * 10 : -Math.random() * 10);
      this.top += this.speed;
      this.el.style.left = `${this.left}px`;
      this.el.style.top = `${this.top}px`;
    }
    else {
      clearInterval(this.intervalId);
      this.el.remove();
    }
  }
}

// 雪花特效
function snow() {
  setInterval(() => {
    const div = document.createElement("div");
    div.innerHTML = "❄";
    div.className = "snowflake";
    const snowflake = new Snowflake(div);
    document.body.append(div);
    snowflake.fall();
  }, 400);
}