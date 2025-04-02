export const convertCurrency = function (curr, number) {
  const userLocal = navigator.language;
  const formatCurr = new Intl.NumberFormat(userLocal, {
    style: 'currency',
    currency: curr,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formatCurr.replace('US$','$');
};
