import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Portfolio } from 'types/portfolio';

export type UserRole = 'MENTEE' | 'MENTOR';

export interface User {
  user_id: number;
  nickname: string;
  role: UserRole;
  job_id: string;
  portfolios?: Portfolio[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  logout: () => void;

  // 개발 중 유저 전환용
  dummyUsers: User[];
}

// 개발용 더미 유저 (현재 로그인은 여기서 선택)
const dummyUsers: User[] = [
  {
    user_id: 1,
    nickname: 'kay',
    role: 'MENTEE',
    job_id: 'IT',
    portfolios: [
      {
        portfolioId: 1,
        title: '첫번째 포폴',
        content: '첫번째로 만든 포폴입니다',
        createdAt: '2025-04-01',
        updatedAt: '2025-04-01',
        fileUrl: '/files/portfolio1.pdf',
        status: 'REGISTERED',
        userId: 1,
      },
      {
        portfolioId: 2,
        title: '두번째 포폴',
        content: '두번째로 만든 포폴입니다',
        createdAt: '2025-04-05',
        updatedAt: '2025-04-05',
        fileUrl: '/files/portfolio2.pdf',
        status: 'REGISTERED',
        userId: 1,
      },
    ],
  },
  {
    user_id: 2,
    nickname: 'khj',
    role: 'MENTEE',
    job_id: 'IT',
    portfolios: [
      {
        portfolioId: 1,
        title: '포폴',
        content: '포폴입니다',
        createdAt: '2025-03-22',
        updatedAt: '2025-03-22',
        fileUrl: '/files/portfolio3.pdf',
        status: 'REGISTERED',
        userId: 2,
      },
      {
        portfolioId: 2,
        title: '다음 포폴',
        content: '다음 포폴입니다',
        createdAt: '2025-04-11',
        updatedAt: '2025-04-11',
        fileUrl: '/files/portfolio4.pdf',
        status: 'REGISTERED',
        userId: 2,
      },
    ],
  },
  {
    user_id: 3,
    nickname: 'khm',
    role: 'MENTOR',
    job_id: 'IT',
  },
  {
    user_id: 4,
    nickname: 'sjy',
    role: 'MENTOR',
    job_id: 'IT',
  },
];

// 현재 로그인 유저는 기본적으로 user_id === 1   (kay)
const initialUser = dummyUsers.find(user => user.user_id === 1) ?? dummyUsers[0];


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  //  실서비스 전환 시: 로그인 후 사용자 정보 불러오기
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/me'); //  배포 시 활성화
      setUser(res.data);                     // 백엔드 응답 구조에 맞게 수정
    } catch (err) {
      console.error('유저 정보 가져오기 실패', err);
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('token'); 등도 추가 가능
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout, dummyUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser는 UserProvider 안에서 사용해야 합니다.');
  return context;
};
