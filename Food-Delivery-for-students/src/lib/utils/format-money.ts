export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("mn-MN").format(amount);
};
