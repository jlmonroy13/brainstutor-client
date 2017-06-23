const getDollarPrice = (price) => {
	let dollar = null;
  switch (price) {
    case 30000:
      dollar = 12;
      break;
    case 35000:
      dollar = 14;
      break;
    case 40000:
      dollar = 16;
      break;
    case 45000:
      dollar = 18;
      break;
    case 50000:
      dollar = 20;
      break;
    case 55000:
      dollar = 22;
      break;
		default:
			return price;
  }
  return dollar;
};

export default getDollarPrice;