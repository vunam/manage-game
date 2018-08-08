export const toCurrency = number =>
  number
    .toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    .slice(0, -3);
