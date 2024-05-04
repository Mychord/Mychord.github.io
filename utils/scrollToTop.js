/**
 * 平滑滚动回到顶部
 * @returns {void}
 */
function scrollToTop() {
  const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScrollTop > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scroll(0, currentScrollTop - currentScrollTop / 8);
  }
}

export { scrollToTop };
