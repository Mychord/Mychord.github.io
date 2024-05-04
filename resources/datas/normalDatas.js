// 搜索下拉词前缀
const searchUrlPrefix = {
  bing: "https://cn.bing.com/search?q=",
  gogo: "https://gogo.webbillion.cn/search?q=",
  yandex: "https://yandex.com/search?text=",
  google: "https://www.google.com/search?q=",
  baidu: "https://www.baidu.com/s?wd="
};

// 网站书签
// 每种类型最多存在 9 个
const bookmarks = {
  recommend: [
    {
      text: "果核剥壳",
      url: "https://www.ghxi.com/"
    },
    {
      text: "音乐搜索",
      url: "https://iui.su/2217/"
    },
    {
      text: "Github",
      url: "https://github.com/"
    },
    {
      text: "SegmentFault",
      url: "https://segmentfault.com/"
    },
    {
      text: "文心一言",
      url: "https://yiyan.baidu.com/"
    }
  ],
  tools: [
    {
      text: "IP地址查询",
      url: "https://zh-hans.ipshu.com/"
    },
    {
      text: "图片转文字",
      url: "https://web.baimiaoapp.com/"
    },
    {
      text: "文件处理",
      url: "https://123apps.com/cn/"
    },
    {
      text: "DeepL",
      url: "https://www.deepl.com/translator"
    },
    {
      text: "GitZip",
      url: "http://kinolien.github.io/gitzip/"
    },
    {
      text: "ProcessOn",
      url: "https://www.processon.com/"
    },
    {
      text: "TinyPng",
      url: "https://tinypng.com/"
    },
    {
      text: "Sprite Cow",
      url: "http://www.spritecow.com/"
    },
    {
      text: "carbon",
      url: "https://carbon.now.sh/"
    }
  ],
  recreation: [
    {
      text: "AGE动漫",
      url: "https://rentry.la/agefans"
    },
    {
      text: "哔哩哔哩",
      url: "https://www.bilibili.com/"
    },
    {
      text: "Bangumi",
      url: "https://bgm.tv/"
    },
    {
      text: "萌娘百科",
      url: "https://zh.moegirl.org.cn/Mainpage#/desktop/index"
    },
    {
      text: "Yuc.wiki",
      url: "https://yuc.wiki/"
    },
    {
      text: "姐说影视",
      url: "https://www.jieshuoji.com/"
    }
  ]
};

export { searchUrlPrefix, bookmarks };
