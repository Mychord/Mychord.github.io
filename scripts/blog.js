import { translate } from "../utils/events.js";
import { imgLazyLoad } from "../utils/imgLazyLoad.js";
import { scrollToTop } from "../utils/scrollToTop.js";
import { blogInformation } from "../resources/datas/springDatas.js";

// 文章 id
const id = location.pathname.split("/")?.at(-1)?.split(".")[0];
// 当前博文
const blog = blogInformation.find((val) => val.id === id);
if (blog) {
  // 时间及标签
  const timeTags = document.querySelector(".blog-time-tags");
  timeTags.textContent =
    blog.time +
    " | " +
    Object.keys(blog.tags)
      .map((val) => translate(val))
      .join(" / ");
}

// 导航
const navigationContent = document.querySelector(".navigation-content");
const titles = document.querySelectorAll("h2,h3");
titles.forEach((title) => setTextAndLink(title));
navigationContent.innerHTML = "";
const lists = [];
for (let i = 0; i < titles.length; i++) {
  const now = titles[i];
  const list = textToElement(now.id);
  let p = i + 1;
  const subLists = [];
  while (p < titles.length && titles[p].tagName === "H3") {
    const subList = textToElement(titles[p++].id);
    subLists.push(subList);
  }
  if (subLists.length > 0) {
    const ul = document.createElement("ul");
    ul.append(...subLists);
    list.append(ul);
  }
  lists.push(list);
  i = p - 1;
}
navigationContent.append(...lists);

function setTextAndLink(el) {
  const link = document.createElement("a");
  link.href = "#" + el.id;
  link.textContent = el.id;
  el.append(link);
}

function textToElement(text) {
  const list = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#" + text;
  link.textContent = text;
  list.append(link);
  return list;
}

// 回到顶部
const backToTop = document.querySelector(".back-to-top");
backToTop.addEventListener("click", () => {
  scrollToTop();
});

// 图片懒加载
document.addEventListener("DOMContentLoaded", () => imgLazyLoad("lazy-image"));
