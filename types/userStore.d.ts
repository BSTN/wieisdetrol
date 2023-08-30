import { Socket } from "socket.io-client";

interface userData {
  userid: string,
  name: string,
  answers: Array<Answers>
}

interface answer {
  chapter: string,
  k: Number,
  answer: any[]
}

interface finished {
  [chapter: string]: Array<string>
}

export interface UserState {
  mounted: Boolean,
  loading: Boolean,
  groupid?: string,
  userid: string,
  position: Number,
  name?: string,
  connected: Boolean,
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>,
  creating: Boolean,
  users: Array<userData>
  answers: Array<answer>,
  finished: finished,
  started: Array<string>
}

interface ServerToClientEvents {
  goto: (a: string) => void
}

interface ClientToServerEvents {
  joinGroup: (a: string) => void;
  joinRoom: ({groupid: string, userid: string}) => void;
}