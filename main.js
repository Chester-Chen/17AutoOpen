// ==UserScript==
// @name         17Live/old-auto-redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Chester
// @match        *
// @icon         https://www.google.com/s2/favicons?domain=baidu.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    initHotkeyEvent(hotKeyListener);
  })();
  
  // open a new tab
  function openNewTab(e) {
    e.preventDefault();
    const { ctrlKey, shiftKey, keyCode } = e;
    //  keyCode: {key: 90, value: z}
    if (ctrlKey && shiftKey && keyCode === 90) {
      const PORT = 9000;
      // 获取query
      const Params = location.search;
      const URL = `http://localhost:${PORT}${Params}`;
      console.log("跳转至: ", URL);
      window.open(URL, "_blank");
      return;
    }
  }
  
  // 热键监听
  function hotKeyListener() {
    const debounceHandle = debounce(openNewTab, 1000);
    document.addEventListener("keydown", debounceHandle);
  }
  
  /**
   * @description init
   * @param {function} fn listener func
   */
  function initHotkeyEvent(fn) {
    fn();
  }
  
  function debounce(fn, delay) {
    let timer = null;
  
    return function () {
      let context = this;
      let args = arguments;
  
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }
  