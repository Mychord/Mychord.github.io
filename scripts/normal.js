import { debounce } from "../utils/responseLimit.js";
import { openUrl } from "../utils/events.js";
import { searchUrlPrefix, bookmarks } from "../resources/datas/normalDatas.js";

let searchEngine = "bing";
let suggestions = [];
let suggestionLoc = 0;
const searchInput = document.querySelector(".search-input");
const searchEngineIcon = document.querySelector(".search-engine-icon");
const searchEngineLists = document.querySelectorAll(".search-engine-list li");
const searchButton = document.querySelector(".search-button");
const deleteButton = document.querySelector(".delete-button");
const searchText = document.querySelector(".search-text");
const suggestionContainer = document.querySelector(".suggestion-container");
const websiteItems = document.querySelectorAll(".website-item");

deleteButton.addEventListener("mousedown", (event) => {
  // 阻止浏览器默认事件, 使点击时输入框不会失去焦点
  event.preventDefault();
});
deleteButton.addEventListener("click", (event) => {
  searchText.value = "";
});

searchButton.addEventListener("click", () => openNewTab());

searchText.addEventListener("input", debounce(getSearchSuggestions, 400));
searchText.addEventListener("blur", () => {
  deleteButton.classList.remove("show");
  searchInput.classList.remove("extend");
  suggestionContainer.classList.remove("show");
});
searchText.addEventListener("focus", (event) => {
  deleteButton.classList.add("show");
  getSearchSuggestions(event);
});
searchText.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  switch (event.code) {
    case "Enter": {
      openNewTab();
      break;
    }
    case "ArrowUp": {
      if (suggestions.length === 0) break;
      const now = (suggestionLoc - 1 + suggestions.length) % suggestions.length;
      selectSuggestion(suggestionLoc, now);
      break;
    }
    case "ArrowDown": {
      if (suggestions.length === 0) break;
      const now = (suggestionLoc + 1) % suggestions.length;
      selectSuggestion(suggestionLoc, now);
    }
    default: {
      break;
    }
  }
});

/**
 * 通过上下键选取搜索词
 * @param {Number} prev
 * @param {Number} now
 */
function selectSuggestion(prev, now) {
  suggestionLoc = now;
  searchText.value = suggestions[now];
  if (prev > 0) suggestionContainer.children[prev - 1].classList.remove("selected");
  if (now > 0) suggestionContainer.children[now - 1].classList.add("selected");
}

// 搜索引擎
searchEngineLists.forEach((item) => {
  item.addEventListener("click", (event) => {
    const now = event.target.closest("li").dataset.engine;
    searchEngine = now;
    searchEngineIcon.src = `../resources/images/${now}Icon.jpg`;
  });
});

// 网站书签
websiteItems.forEach((item) => {
  const type = item.dataset.type;
  const content = document.createElement("div");
  content.append(
    ...bookmarks[type].map((val) => {
      const a = document.createElement("a");
      a.textContent = val.text;
      a.href = val.url;
      a.target = "_blank";
      return a;
    })
  );
  content.classList.add("website-item-content");
  item.append(content);
});

/**
 * 获取下拉词
 * @param {Event} event
 */
function getSearchSuggestions(event) {
  // 使用 Bing 搜索引擎下拉词 API
  const searchUrl = `https://api.bing.com/qsonhs.aspx?type=cb&cb=updateSearchSuggestions&q=${event.target.value}`;
  const script = document.createElement("script");
  script.src = searchUrl;
  document.body.append(script);
  script.remove();
}

/**
 * JSONP 回调函数
 * @param {Object} data
 * @returns {void}
 */
window.updateSearchSuggestions = function (data) {
  // 搜索无结果
  if (data.AS.FullResults === 0) {
    suggestions = [];
    suggestionLoc = 0;
    searchInput.classList.remove("extend");
    suggestionContainer.innerHTML = "";
    suggestionContainer.classList.remove("show");
    return;
  }
  suggestions = data.AS.Results.reduce((res, item) => {
    const arr = item.Suggests.map((val) => val.Txt);
    return res.concat(arr);
  }, []);
  const suggestionItems = suggestions.map((item) => {
    const list = document.createElement("li");
    list.textContent = item;
    list.dataset.query = item;
    list.classList.add("suggestion-item");
    list.addEventListener("mousedown", (event) => {
      // 限定鼠标左键触发
      if (event.button !== 0) return;
      searchText.value = event.target.dataset.query;
      openNewTab();
    });
    return list;
  });
  // 添加搜索原始词
  suggestions.unshift(searchText.value);
  // 重置选取位置
  suggestionLoc = 0;
  searchInput.classList.add("extend");
  suggestionContainer.innerHTML = "";
  suggestionContainer.append(...suggestionItems);
  suggestionContainer.classList.add("show");
};

/**
 * 根据搜索参数打开新窗口
 */
function openNewTab() {
  const url = searchUrlPrefix[searchEngine] + searchText.value;
  openUrl(url);
}
