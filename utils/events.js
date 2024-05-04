import { translation } from "../resources/datas/utilDatas.js";

/**
 * 打开新窗口
 * @param {String} url 链接
 */
function openUrl(url) {
  const newWindow = window.open(url);
  newWindow.opener = null;
}

/**
 * 翻译
 * @param {string} str
 * @returns {string}
 */
function translate(str) {
  return translation[str] ?? str;
}

export { openUrl, translate };
