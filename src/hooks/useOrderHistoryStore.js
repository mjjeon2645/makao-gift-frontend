import { useEffect } from 'react';
import { orderHistoryStore } from '../stores/OrderHistoryStore';

import useForceUpdate from './useForceUpdate';

export default function useOrderHistoryStore() {
  // 변경사항을 구독
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderHistoryStore.subscribe(forceUpdate);

    // 종료 시 구독 해제
    return () => orderHistoryStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return orderHistoryStore;
}
