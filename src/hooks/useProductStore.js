import { useEffect } from 'react';
import { productStore } from '../stores/ProductStore';
import useForceUpdate from './useForceUpdate';

export default function useProductStore() {
  // 변경사항을 구독
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productStore.subscribe(forceUpdate);

    // 종료 시 구독 해제
    return () => productStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return productStore;
}
