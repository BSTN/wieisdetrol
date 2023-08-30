import type { userData } from './userStore.d.ts'

interface ServerToClientEvents {
  groupUserData: (data:Array<userData>) => void;
  loadGroupData: (data) => void;
}

interface ClientToServerEvents {
  [functie: string]: (a?: Object, b?: Object) => void;
}