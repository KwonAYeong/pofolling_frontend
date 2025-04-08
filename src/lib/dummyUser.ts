// dummyUsers.ts - 더미 사용자 4명 목록

export type UserRole = 'MENTOR' | 'MENTEE';

export interface DummyUser {
  user_id: number;
  nickname: string;
  role: UserRole;
}

export const dummyUsers: DummyUser[] = [
  {
    user_id: 1,
    nickname: 'kay',
    role: 'MENTEE',
  },
  {
    user_id: 2,
    nickname: 'khj',
    role: 'MENTEE',
  },
  {
    user_id: 3,
    nickname: 'khm',
    role: 'MENTOR',
  },
  {
    user_id: 4,
    nickname: 'sjy',
    role: 'MENTOR',
  },
];

// 현재 로그인된 유저를 지정해줄 변수 (예: 로그인 상태)
 export const dummyUser : DummyUser | null = 
 dummyUsers[0]; // ← kay (MENTOR)로 기본 설정
//null