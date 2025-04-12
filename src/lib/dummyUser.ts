// dummyUsers.ts - 더미 사용자 4명 목록

export type UserRole = 'MENTOR' | 'MENTEE';

interface Portfolio {
  id: number;
  title: string;
  uploadDate: string;
}
export interface DummyUser {
  user_id: number;
  nickname: string;
  role: UserRole;
  portfolios:Portfolio[];
}

export const dummyUsers: DummyUser[] = [
  {
    user_id: 1,
    nickname: 'kay',
    role: 'MENTEE',
    portfolios: [
      { id: 1, title: '첫 포폴', uploadDate: '2025-03-25' },
      { id: 2, title: '두번째 포폴', uploadDate: '2025-04-13' },
    ]
  },
  {
    user_id: 2,
    nickname: 'khj',
    role: 'MENTEE',
    portfolios: [
      { id: 1, title: ' 포폴', uploadDate: '2025-03-22' },
      { id: 2, title: '다음 포폴', uploadDate: '2025-04-11' },
    ]
  },
  {
    user_id: 3,
    nickname: 'khm',
    role: 'MENTOR',
    portfolios: [
      { id: 1, title: '포폴1', uploadDate: '2025-03-20' },
      { id: 2, title: '포폴2', uploadDate: '2025-04-22' },
    ]
  },
  {
    user_id: 4,
    nickname: 'sjy',
    role: 'MENTOR',
    portfolios: [
      { id: 1, title: '첫 포폴', uploadDate: '2025-03-27' },
      { id: 2, title: '두번째 포폴', uploadDate: '2025-04-01' },
    ]
  },
];

// 현재 로그인된 유저를 지정해줄 변수 (예: 로그인 상태)
 export const dummyUser : DummyUser | null = 
 dummyUsers[0]; // ← kay (MENTOR)로 기본 설정
//null