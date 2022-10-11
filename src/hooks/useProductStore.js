import { productStore } from '../stores/ProductStore';

import useStore from './useStore';

export default function useProductStore() {
  return useStore(productStore);
}
