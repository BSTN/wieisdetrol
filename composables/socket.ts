import { io, Socket } from "socket.io-client";
const config = useRuntimeConfig()
const started: Socket<ServerToClientEvents, ClientToServerEvents> = io(config.public.URL + config.public.BASE)

export const useSocket = () => {
  return started
}