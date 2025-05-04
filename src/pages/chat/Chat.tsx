import React, { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const userId = 1;

  const [chatList, setChatList] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isEditingEnded, setIsEditingEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await fetch(`http://localhost:8080/chat/list/${userId}`);
        const data = await res.json();

        const transformed = data.map((chat: any) => ({
          id: chat.chatRoomId,
          name: chat.senderNickname,
          profileUrl: '/profileEX.png', // 🔥 모든 유저 동일 이미지
          messages: [],
          chatRoomId: chat.chatRoomId,
          portfolioId: chat.portfolioId,
          isActive: chat.isActive,
          unreadCount: 0,
          role: chat.senderRole || 'MENTEE',
        }));

        setChatList(transformed);
      } catch (err) {
        console.error('채팅방 목록 불러오기 실패', err);
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId === null) return;

      const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
      if (!chatRoom) return;

      try {
        const res = await fetch(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`);
        const data = await res.json();

        const formatted = data.map((msg: any) => ({
          sender: msg.senderId === userId ? '나' : chatRoom.name,
          message: msg.message,
          time: msg.sentAt?.slice(11, 16) || '',
        }));

        const updated = chatList.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: formatted, unreadCount: 0 }
            : chat
        );

        setChatList(updated);
        setIsEditingEnded(!chatRoom.isActive);
      } catch (err) {
        console.error('메시지 불러오기 실패', err);
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedChatId === null || isEditingEnded) return;
    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      await fetch(`http://localhost:8080/chat/${chatRoom.chatRoomId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: userId, message: newMessage }),
      });

      updateChatWithMessage(newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('메시지 전송 실패', err);
    }
  };

  const updateChatWithMessage = (message: string) => {
    let updated = chatList.map((chat) => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { sender: '나', message, time: getCurrentTime() }],
        };
      } else {
        return {
          ...chat,
          messages: [...chat.messages, { sender: chat.name, message, time: getCurrentTime() }],
          unreadCount: (chat.unreadCount || 0) + 1,
        };
      }
    });

    const moved = updated.find((chat) => chat.id === selectedChatId);
    updated = [moved!, ...updated.filter((chat) => chat.id !== selectedChatId)];
    setChatList(updated);
  };

  const handleEndEdit = async () => {
    if (selectedChatId === null) return;

    const chatRoom = chatList.find((chat) => chat.id === selectedChatId);
    if (!chatRoom) return;

    try {
      await fetch(`http://localhost:8080/portfolio/${chatRoom.portfolioId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETED' }),
      });

      await fetch(`http://localhost:8080/chat/${chatRoom.chatRoomId}/deactivate`, {
        method: 'PATCH',
      });

      let updated = chatList.map((chat) =>
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
              unreadCount: 0,
            }
          : chat
      );

      const ended = updated.find((chat) => chat.id === selectedChatId);
      updated = [...updated.filter((chat) => chat.id !== selectedChatId), ended!];
      setChatList(updated);
      setIsEditingEnded(true);
    } catch (err) {
      console.error('❌ 첨삭 종료 처리 실패:', err);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const h = hours % 12 || 12;
    const m = minutes < 10 ? `0${minutes}` : minutes;
    return `${ampm} ${h}:${m}`;
  };

  const handleFileUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedChatId !== null && !isEditingEnded) {
      updateChatWithMessage(`[파일] ${file.name}`);
    }
  };

  const handleLeaveChat = () => {
    if (window.confirm('채팅방을 나가시겠습니까?') && selectedChatId !== null) {
      setSelectedChatId(null);
      setIsEditingEnded(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList, selectedChatId]);

  return (
    <div className="flex h-screen">
      {/* 채팅방 목록 */}
      <div className="w-[300px] border-r bg-white overflow-y-auto">
        <ul>
          {chatList.map((chat) => {
            const latest = chat.messages.length > 0 ? chat.messages.at(-1) : null;
            const isUnread = chat.unreadCount > 0;
            const borderColor =
              chat.role === 'MENTOR' ? 'border-[#657CFF]' : 'border-[#A566FF]';

            return (
              <li
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
                  selectedChatId === chat.id ? 'bg-gray-100' : ''
                }`}
              >
                <img
                  src={chat.profileUrl}
                  alt={chat.name}
                  className={`w-12 h-12 rounded-full border-4 ${borderColor}`}
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
                    {latest?.message === '첨삭이 종료된 채팅방입니다.'
                      ? '첨삭이 종료된 채팅방입니다.'
                      : isUnread
                      ? '메시지가 도착했습니다'
                      : latest?.message || ''}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 채팅창 */}
      <div className="flex flex-col flex-1 bg-white">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src={selectedChat.profileUrl}
                  alt=""
                  className={`w-10 h-10 rounded-full border-4 ${
                    selectedChat.role === 'MENTOR'
                      ? 'border-[#657CFF]'
                      : 'border-[#A566FF]'
                  }`}
                />
                <span className="text-lg font-semibold">
                  {selectedChat.name} (포트폴리오 {selectedChat.portfolioId}번)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEndEdit}
                  className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800 hover:bg-gray-100"
                  disabled={isEditingEnded}
                >
                  첨삭 종료
                </button>
                <button
                  onClick={handleLeaveChat}
                  className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800 hover:bg-gray-100"
                >
                  채팅방 나가기
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {selectedChat.messages.map((msg: any, index: number) => (
                <div key={index} className="flex flex-col text-sm">
                  <span className="font-semibold">{msg.sender}</span>
                  <span>{msg.message}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center border-t p-2">
              <button
                onClick={handleFileUploadClick}
                className="w-8 h-8 text-xl text-gray-500"
                disabled={isEditingEnded}
              >
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
                disabled={isEditingEnded}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gray-200 text-sm rounded"
                disabled={isEditingEnded}
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
