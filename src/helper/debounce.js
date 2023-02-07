export default function debounce(functionName, time) {
  var timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      functionName.apply(this, arguments);
    }, time);
  };
}
