import { useEffect } from 'react';
import { giftshopStore } from '../stores/GiftshopStore';
import useForceUpdate from './useForceUpdate';

export default function useGiftshopStore() {
  // 변경사항을 구독
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    giftshopStore.subscribe(forceUpdate);

    // 종료 시 구독 해제
    return () => giftshopStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return giftshopStore;
}
