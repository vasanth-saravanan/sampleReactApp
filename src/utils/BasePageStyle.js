import {StyleSheet} from 'react-native';
import {AppStyles} from './AppStyles';

const basePagestyle = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  container: {
    flex: 1,
    margin: 5,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});
export {basePagestyle};
