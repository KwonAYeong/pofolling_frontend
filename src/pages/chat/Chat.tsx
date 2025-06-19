import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useUser } from 'context/UserContext';
import UserBadge from '../../components/common/UserBadge';
import { createStompClient } from '../../lib/websocket';
import { Client } from '@stomp/stompjs';

interface ChatItem {
  id: number;
  name: string;
  profileUrl: string;
  messages: any[];
  chatRoomId: number;
  portfolioIds: number[];
  portfolioTitles?: string[];
  role: 'MENTOR' | 'MENTEE';
  isActive: boolean;
  lastMessage: string;
  hasNewMessage: boolean;
}

export default function Chat() {
  const { user } = useUser();
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isEditActive, setIsEditActive] = useState(true);
  const [isWsConnected, setIsWsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clientRef = useRef<Client | null>(null);

  const cleanMessage = (message: string) => message.replace(/\s*\([^)]*\)\s*$/, '');

  useEffect(() => {
    if (!user?.user_id) return;
    const fetchChatList = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/chat/list/${user.user_id}`);
        const data = res.data;

        const transformed: ChatItem[] = data.map((chat: any) => {
          const isSender = chat.senderId === user.user_id;
          const role: 'MENTOR' | 'MENTEE' = user.role === 'MENTEE' ? 'MENTOR' : 'MENTEE';

          return {
            id: chat.chatRoomId,
            name: isSender ? chat.receiverNickname : chat.senderNickname,
            profileUrl: isSender
              ? chat.receiverProfileImage || '/default-profile.png'
              : chat.senderProfileImage || '/default-profile.png',
            messages: [],
            chatRoomId: chat.chatRoomId,
            portfolioIds: chat.portfolioIds || [],
            portfolioTitles: chat.portfolioTitles || [],
            role,
            isActive: chat.isActive,
            lastMessage: chat.isActive ? chat.lastMessage || '' : '첨삭이 종료된 채팅방입니다.',
            hasNewMessage: chat.hasNewMessage || false,
          };
        });

        const sorted = [
          ...transformed.filter((c) => c.isActive),
          ...transformed.filter((c) => !c.isActive),
        ];

        setChatList(sorted);
      } catch (err) {
        console.error('채팅방 목록 불러오기 실패', err);
      }
    };
    fetchChatList();
  }, [user]);

  useEffect(() => {
    const chat = chatList.find((c) => c.id === selectedChatId) || null;
    setSelectedChat(chat);
    setIsEditActive(chat?.isActive ?? true);
  }, [selectedChatId, chatList]);

  const updateChatWithMessage = useCallback((message: string) => {
    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    const updated = chatList.map((chat) => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { sender: '나', message, time: getCurrentTime() }],
          lastMessage: message,
        };
      } else {
        return chat;
      }
    });

    const moved = updated.find((chat) => chat.id === selectedChatId);
    const sorted = [
      ...updated.filter((c) => c.isActive && c.id !== selectedChatId),
      moved!,
      ...updated.filter((c) => !c.isActive),
    ];
    setChatList(sorted);
  }, [chatList, selectedChatId]);

  useEffect(() => {
    if (!selectedChatId || !user?.user_id) return;

    const client = createStompClient({
      chatRoomId: selectedChatId,
      onMessage: (msg) => {
        updateChatWithMessage(msg.message);
      },
      onConnect: () => {
        setIsWsConnected(true);
      },
    });

    clientRef.current = client;

    return () => {
      client.deactivate();
      setIsWsConnected(false);
    };
  }, [selectedChatId, user?.user_id, updateChatWithMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) return;
      const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
      if (!chatRoom) return;

      try {
        const res = await axios.get(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`);
        const { messages } = res.data;

        const formatted = messages.map((msg: any) => ({
          sender: msg.senderId === user?.user_id ? '나' : msg.senderNickname ?? '시스템',
          message: cleanMessage(msg.message),
          time: msg.sentAt?.slice(11, 16) || '',
          profile: msg.senderId === user?.user_id ? null : msg.senderProfileImage,
        }));

        const updated = chatList.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: formatted, hasNewMessage: false, lastMessage: formatted.at(-1)?.message || '' }
            : chat
        );

        setChatList(updated);
      } catch (err) {
        console.error('메시지 불러오기 실패', err);
      }
    };
    fetchMessages();
  }, [selectedChatId, chatList, user?.user_id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedChatId === null || !isEditActive) return;

    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      if (clientRef.current && isWsConnected) {
        clientRef.current.publish({
          destination: '/app/chat/message',
          body: JSON.stringify({
            chatRoomId: chatRoom.chatRoomId,
            senderId: user?.user_id,
            message: newMessage,
            fileUrl: null,
          }),
        });
      } else {
        await axios.post(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`, {
          senderId: user?.user_id,
          message: newMessage,
        });
      }

      updateChatWithMessage(newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('메시지 전송 실패', err);
      alert('메시지 전송에 실패했습니다. 다시 시도해보세요.');
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatPortfolioTitles = (titles?: string[]) =>
    titles && titles.length ? ` ${titles.join(', ')}` : '포트폴리오 없음';

  const handleBack = () => setSelectedChatId(null);

  const handleFileUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedChatId === null) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:8080/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileUrl = res.data.fileUrl;
      const fileMessage = `<파일> ${file.name} (${fileUrl})`;

      await axios.post(`http://localhost:8080/chat/${selectedChatId}/messages`, {
        senderId: user?.user_id,
        message: fileMessage,
      });

      updateChatWithMessage(fileMessage);
    } catch (err) {
      console.error('파일 업로드 실패:', err);
    }
  };

  const handleEndEdit = async () => {
    if (selectedChatId === null) return;
    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      const res = await axios.patch(`http://localhost:8080/chat/${chatRoom.chatRoomId}/deactivate`);
      const updatedRoom = res.data;

      const systemMessage = { sender: '시스템', message: '첨삭이 종료되었습니다', time: '', profile: null };

      setChatList(prevList =>
        prevList.map(chat =>
          chat.id === updatedRoom.chatRoomId
            ? {
                ...chat,
                isActive: updatedRoom.isActive,
                lastMessage: updatedRoom.lastMessage || '첨삭이 종료되었습니다',
                messages: [...chat.messages, systemMessage],
                hasNewMessage: updatedRoom.hasNewMessage,
              }
            : chat
        )
      );

      setSelectedChat((prev) => {
        if (prev && prev.id === updatedRoom.chatRoomId) {
          return {
            ...prev,
            isActive: updatedRoom.isActive,
            lastMessage: updatedRoom.lastMessage || '첨삭이 종료되었습니다',
            messages: [...prev.messages, systemMessage],
            hasNewMessage: updatedRoom.hasNewMessage,
          } as ChatItem;
        }
        return prev;
      });

      setIsEditActive(false);
      setNewMessage('');
    } catch (err) {
      console.error('첨삭 종료 실패', err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages.length]);


   return (
    <div className="flex h-screen">
      <div className="w-[300px] border-r bg-white overflow-y-auto">
        <ul>
          {chatList.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
                selectedChatId === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <UserBadge role={chat.role} profileUrl={chat.profileUrl} className="w-12 h-12" />
              <div className="flex-1">
                <div className="font-semibold flex items-center gap-1">
                  {chat.name} ({formatPortfolioTitles(chat.portfolioTitles)})
                </div>
                <p
                  className={`text-sm truncate ${
                    chat.hasNewMessage &&
                    selectedChatId !== chat.id &&
                    chat.lastMessage !== '첨삭이 종료된 채팅방입니다.'
                      ? 'font-semibold'
                      : 'text-gray-600'
                  }`}
                  style={
                    chat.hasNewMessage &&
                    selectedChatId !== chat.id &&
                    chat.lastMessage !== '첨삭이 종료된 채팅방입니다.'
                      ? { color: '#FF9090' }
                      : undefined
                  }
                >
                  {chat.hasNewMessage &&
                  selectedChatId !== chat.id &&
                  chat.lastMessage !== '첨삭이 종료된 채팅방입니다.'
                    ? '새 메시지가 도착하였습니다.'
                    : chat.lastMessage}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-1 bg-white">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <div className="flex items-center gap-2">
                <button onClick={handleBack} className="text-2xl">←</button>
                <UserBadge role={selectedChat.role} profileUrl={selectedChat.profileUrl} className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{selectedChat.name}</span>
                  <span className="text-xs text-gray-500">{formatPortfolioTitles(selectedChat.portfolioTitles)}</span>
                </div>
              </div>
              {isEditActive && (
                <button onClick={handleEndEdit} className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800 hover:bg-gray-100">
                  첨삭 종료
                </button>
              )}
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
                  <div key={idx} className={`flex flex-col text-sm ${msg.sender === '나' ? 'items-end text-right' : 'items-start text-left'}`}>
                    {msg.sender !== '나' && (
                      <div className="flex items-center gap-2">
                        <img src={msg.profile || '/default-profile.png'} alt="" className="w-6 h-6 rounded-full" />
                        <span className="font-semibold">{msg.sender}</span>
                      </div>
                    )}
                    <div className="bg-gray-100 rounded px-3 py-1 inline-block break-all">
                      {msg.message.startsWith('<파일>') ? (() => {
                        const matches = msg.message.match(/<파일> (.+) \((http.+)\)/);
                        if (matches) {
                          const [, filename, fileUrl] = matches;
                          return (
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                              {filename}
                            </a>
                          );
                        } else {
                          return msg.message;
                        }
                      })() : msg.message}
                    </div>
                    {showTime && <span className="text-xs text-gray-400">{msg.time}</span>}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center border-t p-2">
              <button onClick={handleFileUploadClick} className="w-8 h-8 text-xl text-gray-500">＋</button>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              <input
                type="text"
                className="flex-1 mx-2 border-none focus:ring-0 text-sm"
                placeholder="메시지 입력"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!isEditActive}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gray-200 text-sm rounded"
                disabled={!isEditActive}
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