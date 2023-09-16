// 点击事件触发类型
let triggerClick = "";

// 根据浏览器是PC端还是移动端决定点击事件触发类型
if (isMobile()) {
  triggerClick = "touchstart";
}
else {
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

// 开始按钮
const startButton = document.getElementById("start-button");
// 为开始按钮添加点击事件
startButton.addEventListener(triggerClick, (e) => {
  if (clickCount == 0) {
    window.location.href = "normal.html";
  }
  else if (clickCount == 1) {
    window.location.href = "spring.html";
  }
  else if (clickCount == 2) {
    window.location.href = "summer.html";
  }
  else if (clickCount == 3) {
    window.location.href = "autumn.html";
  }
  else if (clickCount == 4) {
    window.location.href = "winter.html";
  }
  // 停止冒泡
  e.stopPropagation()
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
const vortex = document.createElement("img");
vortex.src = "images/vortex.png";
vortex.id = "vortex";
// 随机位置
[vortex.style.left, vortex.style.top] = randomLocation();
document.body.append(vortex);
// 为漩涡图片添加点击事件
vortex.addEventListener(triggerClick, (event) => {
  clickCount++;
  if (clickCount == 1) {

  }
  else if (clickCount == 2) {

  }
  else if (clickCount == 3) {

  }
  else if (clickCount == 4) {
    vortex.remove();
    document.body.style.backgroundColor = "black";
    startButton.classList.add("secret");
    addMouseClick();
    snow();
    event.stopPropagation();
  }
  [vortex.style.left, vortex.style.top] = randomLocation();
});


/* clickCount == 4 */
/* ------------------------------------------------------------------------------ */

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

// 添加鼠标点击特效
function addMouseClick() {
  // 为屏幕添加点击事件
  // 不使用 triggerClick
  document.body.addEventListener("click", (e) => {
    const div = document.createElement("div");
    div.innerHTML = "❄";
    div.className = "extend-snowflake";
    const extendSnowflake = new ExtendSnowflake(div, e.clientX, e.clientY);
    document.body.append(div);
    extendSnowflake.fall();
  })
}

/* 类 */
/* ------------------------------------------------------------------------------ */

// 雪花类
class Snowflake {
  constructor(el) {
    // 下降速度
    this.speed = 20;
    // 初始位置
    this.left = Math.round(Math.random() * document.documentElement.clientWidth);
    this.top = 0;
    // 雪花透明度
    this.opacity = (Math.round(Math.random() * 4) + 6) / 10;
    // 雪花大小
    this.fontSize = 16 + Math.round(Math.random() * 20);
    // 绑定元素
    this.el = el;
    // 标识时间间隔的 id
    this.intervalId = null;
  }
  fall() {
    // 设置初始位置
    this.el.style.left = `${this.left}px`;
    this.el.style.top = `${this.top}px`;
    // 设置雪花透明度
    this.el.style.opacity = this.opacity;
    // 设置雪花大小
    this.el.style.fontSize = `${this.fontSize}px`;
    this.intervalId = setInterval(() => {
      this.falling();
    }, 200);
  }
  falling() {
    if (this.left < document.documentElement.clientWidth && this.left > 0 && this.top < document.documentElement.clientHeight) {
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

// 扩展雪花类
class ExtendSnowflake extends Snowflake {
  constructor(el, left, top) {
    super(el);
    this.left = left;
    this.top = top;
  }
}