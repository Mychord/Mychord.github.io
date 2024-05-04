/**
 * 防抖
 * @param {Function} fn 原函数
 * @param {Number} delay 延迟时间
 */
function debounce(fn, delay) {
  let timer;
  return function () {
    let this_ = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this_, arguments);
    }, delay);
  };
}

/**
 * 节流
 * @param {Function} fn 原函数
 * @param {Number} delay 延迟时间
 */
function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

export { debounce, throttle };
