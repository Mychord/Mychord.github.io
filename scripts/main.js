// 点击漩涡的次数
let clickCount = 0;

/* 0 <= clickCount <= 4 */
/* ------------------------------------------------------------------------------ */

// 开始按钮
const startButton = document.getElementById("start-button");
// 为开始按钮添加点击事件
startButton.addEventListener("click", (e) => {
  if (clickCount == 0) {
    window.location.href = "normal.html";
  }
  else if (clickCount == 1) {

  }
  else if (clickCount == 2) {

  }
  else if (clickCount == 3) {

  }
  else if (clickCount == 4) {
    window.location.href = "secret.html";
    // 停止冒泡
    e.stopPropagation()
  }
});

// 产生随机位置
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
vortex.addEventListener("click", () => {
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
    snow();
    addMouseTrail();
    addMouseClick();
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

// 添加鼠标尾迹
function addMouseTrail() {
  window.addEventListener("mousemove", (e) => {
    const elem = document.createElement("div");
    elem.className = "mouse-trail";
    // 尾迹内容
    elem.innerHTML = ".";
    // 尾迹大小
    elem.style.fontSize = "20px";
    // 设置尾迹位置
    elem.style.left = `${e.clientX - 2}px`;
    elem.style.top = `${e.clientY - 16}px`;
    document.body.append(elem);
    setTimeout(() => elem.remove(), 200);
  })
}

// 添加鼠标点击特效
function addMouseClick() {
  // 为屏幕添加点击事件
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