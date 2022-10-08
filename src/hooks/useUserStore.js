import { useEffect } from 'react';
import { userStore } from '../stores/UserStore';
import useForceUpdate from './useForceUpdate';

export default function useUserStore() {
  // 변경사항을 구독
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    userStore.subscribe(forceUpdate);

    // 종료 시 구독 해제
    return () => userStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return userStore;
}
