// /src/context/UserContext.tsx
import { createContext, useContext, useState } from 'react';

export interface Portfolio {
  id: number;
  title: string;
  uploadDate: string;
}

export interface User {
  user_id: number;
  nickname: string;
  role: 'MENTEE' | 'MENTOR';
  portfolios: Portfolio[];
}

// 더미 유저
const dummyUsers: User[] = [
  {
    user_id: 1,
    nickname: 'kay',
    role: 'MENTEE',
    portfolios: [
      { id: 1, title: '첫번째 포폴', uploadDate: '2025-04-01' },
      { id: 2, title: '두번째 포폴', uploadDate: '2025-04-05' },
    ],
  },
  {
    user_id: 2,
    nickname: 'khj',
    role: 'MENTEE',
    portfolios: [
      { id: 1, title: ' 포폴', uploadDate: '2025-03-22' },
      { id: 2, title: '다음 포폴', uploadDate: '2025-04-11' },
    ],
  },
  {
    user_id: 3,
    nickname: 'khm',
    role: 'MENTOR',
    portfolios: [
      { id: 1, title: '포폴1', uploadDate: '2025-03-20' },
      { id: 2, title: '포폴2', uploadDate: '2025-04-22' },
    ],
  },
  {
    user_id: 4,
    nickname: 'sjy',
    role: 'MENTOR',
    portfolios: [
      { id: 1, title: '첫 포폴', uploadDate: '2025-03-27' },
      { id: 2, title: '두번째 포폴', uploadDate: '2025-04-01' },
    ],
  },
];

// kay 유저로 로그인했다고 가정(기본)
const initialUser = dummyUsers.find(u => u.user_id === 1) || null;

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  dummyUsers: User[];
} | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser, dummyUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser는 UserProvider 안에서 사용해야 합니다.');
  return context;
};
