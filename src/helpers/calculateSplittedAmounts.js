import { SPLIT_TYPES } from '../constants/splitTypes.constants';
import floatToFixed from './floatToFixed';

const calculateSplittedAmounts = ({ amount, splitBetween, splitType = SPLIT_TYPES.EQUAL, splittedParts }) => {
  switch (splitType) {
    case SPLIT_TYPES.EQUAL:
      return splitBetween.reduce((acc, user) => {
        const splittedAmounts = { ...acc };
        splittedAmounts[user] = floatToFixed(amount / splitBetween.length);
        return splittedAmounts;
      }, {});
    case SPLIT_TYPES.PERCENT:
      return splitBetween.reduce((acc, user) => {
        acc[user] = floatToFixed((amount * (splittedParts[user] ?? 0)) / 100);
        return { ...acc };
      }, {});
    case SPLIT_TYPES.AMOUNT:
      return splitBetween.reduce((acc, user) => {
        acc[user] = splittedParts[user] ?? 0;
        return { ...acc };
      }, {});
    default:
      return {};
  }
};

export default calculateSplittedAmounts;
