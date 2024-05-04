const fs = require("fs");

/**
 * txt 转 html
 * @param {string} data
 * @returns {string}
 */
function txtToHTML(data) {
  // 文本换行分割并去除空字符串
  const res = data.split(/[\r\n]+/).filter((item) => item.length > 0);
  res.forEach((item, index, arr) => {
    let loc = 0;
    while (loc < item.length && item[loc] === " ") {
      loc++;
    }
    item = "&nbsp;".repeat(loc) + item.slice(loc);
    arr[index] = `<p>${item}</p>`;
  });
  res.unshift("<body>");
  res.push("</body>");
  return res.join("\r\n");
}

/**
 * 读取文件并输出转换文本
 * @returns {void}
 */
function textTransform() {
  // 读取文本文件
  fs.readFile("./tools/input.txt", "utf8", (error, txt) => {
    if (error) console.log(error);
    else {
      const htmlData = txtToHTML(txt);
      const regex = /<body>(.*?)<\/body>/gs;
      fs.readFile("./tools/output.html", "utf8", (error, data) => {
        if (error) console.log(error);
        else {
          const modifiedData = data.replace(regex, htmlData);
          fs.writeFile("./tools/output.html", modifiedData, "utf8", (error) => {
            if (error) console.log(error);
          });
        }
      });
    }
  });
}

textTransform();
