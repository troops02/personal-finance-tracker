export const convertCurrency = function (curr, number) {
  const userLocal = navigator.language;
  const formatCurr = new Intl.NumberFormat(userLocal, {
    style: 'currency',
    currency: curr,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formatCurr.replace('US$', '$');
};

export const storage = function (arr, set) {
  let _arr = [];
  arr.forEach(function (obj) {
    _arr.push(obj);
  });
  _arr = _arr.concat(JSON.parse(localStorage.getItem(set) || '[]'));
  localStorage.setItem(set, JSON.stringify(_arr));
  return _arr;
};
