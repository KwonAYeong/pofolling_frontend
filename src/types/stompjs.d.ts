declare module 'stompjs' {
    export interface Message {
      body: string;
    }
  
    export interface Subscription {
      unsubscribe(): void;
    }
  
    export interface Client {
      connect(headers: {}, onConnect: () => void, onError?: (error: string) => void): void;
      disconnect(onDisconnect?: () => void): void;
      send(destination: string, headers: {}, body: string): void;
      subscribe(destination: string, callback: (message: Message) => void): Subscription;
      connected: boolean;
    }
  
    export function over(socket: WebSocket): Client;
  }
  