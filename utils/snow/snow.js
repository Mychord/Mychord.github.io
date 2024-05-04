/**
 * 雪花特效
 */
class Snow {
  constructor() {
    this.timeId = null;
  }
  /**
   * 开始下雪
   * @returns {void}
   */
  start() {
    document.body.addEventListener("click", this.mouseClick);
    this.timeId = setInterval(() => {
      const div = document.createElement("div");
      div.innerHTML = "❄";
      div.className = "snowflake";
      const snowflake = new Snowflake(div);
      document.body.append(div);
      snowflake.fall();
    }, 400);
  }

  /**
   * 停止下雪
   */
  stop() {
    document.body.removeEventListener("click", this.mouseClick);
    clearInterval(this.timeId);
  }

  /**
   * 鼠标点击下雪特效
   * @param {Event} e 事件对象
   */
  mouseClick(e) {
    const div = document.createElement("div");
    div.innerHTML = "❄";
    div.className = "extend-snowflake";
    const extendSnowflake = new ExtendSnowflake(div, e.clientX, e.clientY);
    document.body.append(div);
    extendSnowflake.fall();
  }
}

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
    if (
      this.left < document.documentElement.clientWidth &&
      this.left > 0 &&
      this.top < document.documentElement.clientHeight
    ) {
      this.left += Math.round(Math.random() > 0.5 ? Math.random() * 10 : -Math.random() * 10);
      this.top += this.speed;
      this.el.style.left = `${this.left}px`;
      this.el.style.top = `${this.top}px`;
    } else {
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

export { Snow };
