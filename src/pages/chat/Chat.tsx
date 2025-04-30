// pages/chat/Chat.tsx
import React, { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: '신재윤',
      profileUrl: '/images/profile1.png',
      messages: [
        { sender: '신재윤', message: '안녕하세요!', time: '오후 1:58' },
        { sender: '나', message: '안녕하세요!', time: '오후 1:58' },
        { sender: '신재윤', message: '일단 바로 본론으로 갈까요?', time: '오후 2:07' },
        { sender: '신재윤', message: '저는 전반적으로 다 괜찮았어요', time: '오후 2:07' },
        { sender: '신재윤', message: '근데 포트폴리오 마지막 부분에 빼셔야 할게 있던데...', time: '오후 2:08' },
      ],
    },
    {
      id: 2,
      name: '권아영',
      profileUrl: '/images/profile2.png',
      messages: [
        { sender: '권아영', message: '이전 포폴이 더 나아요.', time: '오전 10:00' },
        { sender: '나', message: '진짜요? 감사합니다!', time: '오전 10:01' },
      ],
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 메시지 보내기
  const handleSendMessage = () => {
    if (!newMessage.trim() || selectedChatId === null) return;

    updateChatWithMessage(newMessage);
    setNewMessage('');
  };

  // 파일 업로드 버튼 클릭
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택했을 때
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedChatId !== null) {
      // 파일 이름을 메시지처럼 추가
      const fileMessage = `[파일] ${file.name}`;
      updateChatWithMessage(fileMessage);
    }
  };

  // 채팅방 나가기
  const handleLeaveChat = () => {
    const confirmLeave = window.confirm('채팅방을 나가시겠습니까?');
    if (confirmLeave && selectedChatId !== null) {
      const updatedChatList = chatList.filter(chat => chat.id !== selectedChatId);
      setChatList(updatedChatList);
      setSelectedChatId(null);
    }
  };

  // 공통 메시지 추가 함수 (텍스트/파일 둘 다)
  const updateChatWithMessage = (message: string) => {
    let updatedChatList = chatList.map((chat) => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: '나', message, time: getCurrentTime() },
          ],
        };
      }
      return chat;
    });

    const movedChat = updatedChatList.find(chat => chat.id === selectedChatId);
    updatedChatList = [
      movedChat!,
      ...updatedChatList.filter(chat => chat.id !== selectedChatId)
    ];

    setChatList(updatedChatList);
  };

  // 현재 시간 포맷
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${ampm} ${formattedHour}:${formattedMinutes}`;
  };

  // 메시지 추가될 때마다 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatList, selectedChatId]);

  return (
    <div className="flex h-screen">
      {/* 왼쪽 채팅 목록 */}
      <div className="w-[300px] border-r bg-white overflow-y-auto">
        <ul>
          {chatList.map((chat) => {
            const latestMessage = chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : null;

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
                  alt={`${chat.name} 프로필`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{chat.name}</span>
                    {latestMessage && (
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {latestMessage.time}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {latestMessage ? latestMessage.message : ''}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 오른쪽 채팅창 */}
      <div className="flex flex-col flex-1 bg-white">
        {selectedChat ? (
          <>
            {/* 채팅방 상단 */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
              <div className="flex items-center gap-2">
                <img src={selectedChat.profileUrl} alt="상대방" className="w-10 h-10 rounded-full" />
                <span className="text-lg font-semibold">{selectedChat.name}</span>
              </div>
              <button
                onClick={handleLeaveChat}
                className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded"
              >
                ➡️
              </button>
            </div>

            {/* 채팅 메시지 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {selectedChat.messages.map((msg, index) => (
                <div key={index} className="flex flex-col text-sm">
                  <span className="font-semibold">{msg.sender}</span>
                  <span>{msg.message}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 채팅 입력창 */}
            <div className="flex items-center border-t p-2">
              {/* ＋ 버튼 */}
              <button
                type="button"
                onClick={handleFileUploadClick}
                className="w-8 h-8 flex items-center justify-center text-xl text-gray-500"
              >
                ＋
              </button>

              {/* 숨겨진 파일 업로드 input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* 메시지 입력창 */}
              <input
                type="text"
                className="flex-1 mx-2 border-none focus:ring-0 text-sm"
                placeholder="메시지 입력"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />

              {/* 전송 버튼 */}
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-gray-200 text-sm rounded"
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
