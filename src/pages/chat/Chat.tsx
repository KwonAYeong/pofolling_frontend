// Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUser } from 'context/UserContext';

export default function Chat() {
  const { user } = useUser();
  const [chatList, setChatList] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isActive, setIsActive] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchChatList = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/chat/list/${user.user_id}`);
        const data = res.data;

        const transformed = data.map((chat: any) => {
          const isSender = chat.senderId === user.user_id;
          return {
            id: chat.chatRoomId,
            name: isSender ? chat.receiverNickname : chat.senderNickname,
            profileUrl: isSender
              ? chat.receiverProfileImage || '/profileEX.png'
              : chat.senderProfileImage || '/profileEX.png',
            messages: [],
            chatRoomId: chat.chatRoomId,
            portfolioId: chat.portfolioId,
            role: isSender ? chat.receiverRole : chat.senderRole,
            unreadCount: 0,
            isActive: chat.isActive,
          };
        });

        setChatList(transformed);
      } catch (err) {
        console.error('채팅방 목록 불러오기 실패', err);
      }
    };

    fetchChatList();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId === null) return;
      const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
      if (!chatRoom) return;

      try {
        const res = await axios.get(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`);
        const data = res.data;

        const formatted = data.map((msg: any) => ({
          sender: msg.senderId === user?.user_id ? '나' : chatRoom.name,
          message: msg.message,
          time: msg.sentAt?.slice(11, 16) || '',
          profile: msg.senderId === user?.user_id ? null : chatRoom.profileUrl,
        }));

        const updated = chatList.map((chat) =>
          chat.id === selectedChatId ? { ...chat, messages: formatted, unreadCount: 0 } : chat
        );

        setChatList(updated);
        setIsActive(chatRoom.isActive);
      } catch (err) {
        console.error('메시지 불러오기 실패', err);
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedChatId === null || !isActive) return;
    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      await axios.post(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`, {
        senderId: user?.user_id,
        message: newMessage,
      });

      updateChatWithMessage(newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('메시지 전송 실패', err);
    }
  };

  const updateChatWithMessage = (message: string) => {
    const updated = chatList.map((chat) => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { sender: '나', message, time: getCurrentTime() }],
        };
      } else {
        return chat;
      }
    });

    const moved = updated.find((chat) => chat.id === selectedChatId);
    setChatList([moved!, ...updated.filter((chat) => chat.id !== selectedChatId)]);
  };

  const handleEndEdit = async () => {
    if (selectedChatId === null) return;
    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      await axios.patch(`http://localhost:8080/chat/${chatRoom.chatRoomId}/deactivate`);

      const updated = chatList.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  sender: '시스템',
                  message: '첨삭이 종료된 채팅방입니다.',
                  time: getCurrentTime(),
                },
              ],
              isActive: false,
            }
          : chat
      );

      setChatList(updated);
      setIsActive(false);
    } catch (err) {
      console.error('첨삭 종료 실패:', err);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleFileUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedChatId !== null) {
      updateChatWithMessage(`[파일] ${file.name}`);
    }
  };
  const handleBack = () => setSelectedChatId(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList, selectedChatId]);

  const getBorderColor = (role: string) => role?.toUpperCase() === 'MENTOR' ? 'border-[#A566FF]' : 'border-[#657CFF]';

  return (
    <div className="flex h-screen">
      <div className="w-[300px] border-r bg-white overflow-y-auto">
        <ul>
          {chatList.map((chat) => {
            const latest = chat.messages.at(-1);
            const isUnread = chat.unreadCount > 0;
            return (
              <li
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-100 ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
              >
                <img
                  src={chat.profileUrl}
                  alt={chat.name}
                  className={`w-12 h-12 rounded-full border-4 ${getBorderColor(chat.role)}`}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {chat.name} (포트폴리오 {chat.portfolioId}번)
                    </span>
                    {isUnread && (
                      <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {latest?.message === '첨삭이 종료된 채팅방입니다.' ? '첨삭이 종료된 채팅방입니다.' : isUnread ? '메시지가 도착했습니다' : latest?.message || ''}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col flex-1 bg-white">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <div className="flex items-center gap-2">
                <button onClick={handleBack} className="text-2xl">←</button>
                <img
                  src={selectedChat.profileUrl}
                  alt=""
                  className={`w-10 h-10 rounded-full border-4 ${getBorderColor(selectedChat.role)}`}
                />
                <span className="text-lg font-semibold">
                  {selectedChat.name} (포트폴리오 {selectedChat.portfolioId}번)
                </span>
              </div>
              <button
                onClick={handleEndEdit}
                className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800 hover:bg-gray-100"
              >
                첨삭 종료
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {selectedChat.messages.map((msg: any, idx: number) => {
                const showTime =
                  idx === selectedChat.messages.length - 1 ||
                  selectedChat.messages[idx + 1]?.sender !== msg.sender ||
                  selectedChat.messages[idx + 1]?.time !== msg.time;

                return msg.sender === '시스템' ? (
                  <div key={idx} className="flex justify-center text-xs text-gray-500">
                    {msg.message}
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={`flex flex-col text-sm ${msg.sender === '나' ? 'items-end text-right' : 'items-start text-left'}`}
                  >
                    {msg.sender !== '나' && (
                      <div className="flex items-center gap-2">
                        <img src={selectedChat.profileUrl} alt="" className="w-6 h-6 rounded-full" />
                        <span className="font-semibold">{msg.sender}</span>
                      </div>
                    )}
                    <div className="bg-gray-100 rounded px-3 py-1 inline-block">{msg.message}</div>
                    {showTime && <span className="text-xs text-gray-400">{msg.time}</span>}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center border-t p-2">
              <button onClick={handleFileUploadClick} className="w-8 h-8 text-xl text-gray-500">
                ＋
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <input
                type="text"
                className="flex-1 mx-2 border-none focus:ring-0 text-sm"
                placeholder="메시지 입력"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!isActive}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gray-200 text-sm rounded"
                disabled={!isActive}
              >
                전송
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            채팅방을 선택해주세요.
          </div>
        )}
      </div>
    </div>
  );
}