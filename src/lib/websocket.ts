import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const createStompClient = ({
  chatRoomId,
  onMessage,
  onConnect,
}: {
  chatRoomId: number;
  onMessage: (msg: any) => void;
  onConnect?: () => void; 
}): Client => {
  const socket = new SockJS('http://localhost:8080/ws');

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log(`[✅ connected to chatRoom ${chatRoomId}]`);
      client.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
        const msg = JSON.parse(message.body);
        onMessage(msg);
      });
      if (onConnect) onConnect();
    },
    onStompError: (frame) => {
      console.error('[❌ STOMP ERROR]', frame);
    },
  });

  client.activate();
  return client;
};