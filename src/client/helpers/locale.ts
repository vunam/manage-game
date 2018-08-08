export const toCurrency = numberValue =>
  numberValue
    .toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    .slice(0, -3);
