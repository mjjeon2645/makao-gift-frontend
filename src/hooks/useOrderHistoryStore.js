import { orderHistoryStore } from '../stores/OrderHistoryStore';

import useStore from './useStore';

export default function useOrderHistoryStore() {
  return useStore(orderHistoryStore);
}
