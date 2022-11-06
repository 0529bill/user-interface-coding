function debounce(func, delay) {
  let timeout = null;
  return function (...args) {
    let context = this;
    //綁定在傳進來的func上
    clearTimeout(timeout);
    //清除掉前一個timeout

    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

export default debounce;
