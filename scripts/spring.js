import { translate } from "../utils/events.js";
import { tags, blogInformation } from "../resources/datas/springDatas.js";

const emptyImage = document.createElement("img");
const loadingImage = document.createElement("img");
emptyImage.src = "../resources/images/emptyImage.jpg";
emptyImage.width = 400;
loadingImage.src = "../resources/images/loadingImage.svg";
loadingImage.width = 360;

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const blogContainer = document.querySelector(".blog-container");
searchInput.addEventListener("keydown", (event) => {
  if (event.code !== "Enter" || event.isComposing) return;
  search();
});
searchButton.addEventListener("click", search);

// 可选标签
const tagSelectContent = document.querySelector(".tag-select-content");
tagSelectContent.append(
  ...tags.map((tag) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = tag;
    checkbox.name = tag;
    checkbox.value = tag;
    const label = document.createElement("label");
    label.htmlFor = tag;
    label.innerText = translate(tag);
    const div = document.createElement("div");
    div.append(checkbox, label);
    div.classList.add("tag-card");
    return div;
  })
);

// 标签筛选
let selectedTags = [];
const tagSelectContainer = document.querySelector(".tag-select-container");
tagSelectContainer.addEventListener("click", (event) => {
  if (event.target.nodeName === "INPUT") {
    const state = event.target.checked;
    const tag = event.target.value;
    if (state) selectedTags.push(tag);
    else selectedTags = selectedTags.filter((val) => val !== tag);
    search();
  }
});

// 搜索
function search() {
  const blogs = blogFilter();
  blogBuild(blogs);
}

function blogFilter() {
  const target = searchInput.value.toLocaleLowerCase();
  const blogs = blogInformation.filter((blog) => {
    const flag1 = blog.name.toLocaleLowerCase().indexOf(target) !== -1;
    const flag2 = selectedTags.length === 0 || selectedTags.every((tag) => blog.tags[tag] === true);
    return flag1 && flag2;
  });
  return blogs;
}

function blogBuild(blogs) {
  // 加载中
  blogContainer.innerHTML = "";
  blogContainer.append(loadingImage);
  const fragment = new DocumentFragment();
  for (const blog of blogs) {
    // 文章标题
    const title = document.createElement("a");
    title.textContent = blog.name;
    title.href = blog.url;
    title.target = "_blank";
    title.classList.add("blog-title");
    // 文章发布时间 及 文章标签
    const timeTags = document.createElement("div");
    timeTags.textContent =
      blog.time +
      " | " +
      Object.keys(blog.tags)
        .map((val) => translate(val))
        .join(" / ");
    timeTags.classList.add("blog-time-tags");
    // 文章简介
    const introduction = document.createElement("div");
    introduction.textContent = blog.introduction;
    introduction.classList.add("blog-introduction");
    // 卡片
    const card = document.createElement("div");
    card.classList.add("card");
    card.append(title);
    card.append(timeTags);
    card.append(introduction);
    fragment.append(card);
  }
  // 搜索无结果
  if (fragment.childNodes.length === 0) fragment.append(emptyImage);
  // 延迟响应
  setTimeout(() => {
    blogContainer.innerHTML = "";
    blogContainer.append(fragment);
  }, 800);
}

// 页面载入时进行一次搜索
search();
