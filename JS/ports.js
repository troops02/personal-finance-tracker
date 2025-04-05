export const convertCurrency = function (curr, number) {
  if (!curr) curr = 'USD';

  try {
    const userLocal = navigator.language;
    const formatCurr = new Intl.NumberFormat(userLocal, {
      style: 'currency',
      currency: curr,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatCurr.replace('US$', '$');
  } catch (error) {
    console.error(`Invalid currency code: ${curr}. Defaulting to USD.`, error);
    return number;
  }
};

export const storage = function (arr, set) {
  localStorage.setItem(set, JSON.stringify(arr));
};