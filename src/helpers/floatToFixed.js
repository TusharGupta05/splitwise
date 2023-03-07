const floatToFixed = (num) => {
  const int = parseInt(num, 10);
  if (num === int) {
    return int;
  }
  return parseFloat(num.toFixed(2));
};

export default floatToFixed;
