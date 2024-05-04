/**
 * 判断元素是否进入视口
 * @param {Element} element
 * @returns {boolean}
 */
function isInViewPort(element) {
  const viewHeight = document.documentElement.clientHeight;
  const { top, left } = element.getBoundingClientRect();
  return top >= 0 && top <= viewHeight && left >= 0;
}

/**
 * 图片懒加载
 * @param {string} className 类名
 * @returns {void}
 */
function imgLazyLoad(className) {
  const lazyloadImages = document.querySelectorAll(`.${className}`);
  let count = lazyloadImages.length;
  let timer;
  if (count === 0) return;

  function lazyLoad() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      lazyloadImages.forEach((img) => {
        if (isInViewPort(img)) {
          img.src = img.dataset.src;
          img.classList.remove(className);
          count--;
        }
      });
      if (count === 0) {
        document.removeEventListener("scroll", lazyLoad);
        window.removeEventListener("resize", lazyLoad);
      }
    }, 30);
  }

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove(className);
          imageObserver.unobserve(image);
        }
      });
    });
    lazyloadImages.forEach((image) => imageObserver.observe(image));
  } else {
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
  }
}

export { imgLazyLoad };
