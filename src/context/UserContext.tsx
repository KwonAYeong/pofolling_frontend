import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Portfolio } from 'types/portfolio';

export type UserRole = 'MENTEE' | 'MENTOR';

export interface User {
  user_id: number;
  nickname?: string;
  role: UserRole;
  job_id?: string;
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
    role: 'MENTEE',
  },
  {
    user_id: 2,
    role: 'MENTEE',
  },
  {
    user_id: 3,
    role: 'MENTEE',
  },
  {
    user_id: 4,
    role: 'MENTOR',
  },
  {
    user_id: 5,
    role: 'MENTOR',
  },
  {
    user_id: 6,
    role: 'MENTOR',
  },
];

// 현재 로그인 유저는 기본적으로 user_id === 1   (kay)
const initialUser = dummyUsers.find(user => user.user_id === 3) || dummyUsers[0];


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
