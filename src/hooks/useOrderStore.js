import { orderStore } from '../stores/OrderStore';

import useStore from './useStore';

export default function useOrderStore() {
  return useStore(orderStore);
}
