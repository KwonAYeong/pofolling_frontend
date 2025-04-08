// 알림 아이콘 + 모달
import { useState } from 'react';
import { Bell } from 'lucide-react'; // 아이콘 라이브러리 설치 필요

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const unreadCount = 2; // 임시 값

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-700 hover:text-black"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-md z-10">
          <ul className="p-2 text-sm">
            <li className="border-b py-2">📨 포트폴리오 첨삭이 도착했어요</li>
            <li className="border-b py-2">✅ 첨삭 완료: 디자인 피드백</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
