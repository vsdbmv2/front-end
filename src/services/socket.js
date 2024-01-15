import { io } from "socket.io-client";
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class SingleClient {
  __instance;
  constructor(){}

  static getInstance(){
    if(!this.__instance) this.__instance = io(BASE_URL);
    return this.__instance;
  }
}

export const client = SingleClient.getInstance();

export default SingleClient;