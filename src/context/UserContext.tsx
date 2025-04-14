// /src/context/UserContext.tsx
import { createContext, useContext, useState } from 'react';
import { Portfolio } from 'types/portfolio';


export interface User {
  user_id: number;
  nickname: string;
  role: 'MENTEE' | 'MENTOR';
  position: string; // 직군!
  portfolios?: Portfolio[];
}

// 더미 유저
const dummyUsers: User[] = [
  {
    user_id: 1,
    nickname: 'kay',
    role: 'MENTEE',
    position: "IT" ,
    portfolios: [
      { id: 1,
        title: '첫번째 포폴',
        description: "첫번째로 만든 포폴입니다",
        uploadDate: '2025-04-01', 
        status:'REGISTERED'},
      { id: 2,
        title: '두번째 포폴',
        description: "두번째로 만든 포폴입니다",
        uploadDate: '2025-04-05' ,
        status:'REGISTERED'},
    ],
  },
  {
    user_id: 2,
    nickname: 'khj',
    role: 'MENTEE',
    position: "IT" ,
    portfolios: [
      { id: 1,
        title: ' 포폴',
        description: " 포폴입니다", 
        uploadDate: '2025-03-22' ,
        status:'REGISTERED'},
      { id: 2, 
        title: '다음 포폴',
        description: "다음 포폴입니다",
        uploadDate: '2025-04-11' ,
        status:'REGISTERED'},
    ],
  },
  {
    user_id: 3,
    nickname: 'khm',
    role: 'MENTOR',
    position: "IT" ,
  },
  {
    user_id: 4,
    nickname: 'sjy',
    role: 'MENTOR',
    position: "IT" ,
  },
];

// kay 유저로 로그인했다고 가정(기본)
const initialUser = dummyUsers.find(u => u.user_id === 3) || null;

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
export type UserRole = 'MENTEE' | 'MENTOR';