import { userStore } from '../stores/UserStore';

import useStore from './useStore';

export default function useUserStore() {
  return useStore(userStore);
}
