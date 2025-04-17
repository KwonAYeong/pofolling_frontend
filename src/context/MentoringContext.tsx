import { createContext, useContext } from 'react';
import axios from 'axios';
import { UserRole } from './UserContext';

export interface MentoringRequest {
  nickname: string;
  id: number;
  menteeId: number;
  role: UserRole;
  job_id: string;
  profileImage?: string;
  requestDate: string;
  status?: 'pending' | 'accepted' | 'in-progress' | 'done';

 
  portfolioId: number;
  title: string;
  content: string;
  updatedAt: string;
  fileUrl?: string;
}


interface MentoringContextType {
  addRequest: (request: MentoringRequest) => Promise<void>;
  fetchRequests: () => Promise<MentoringRequest[]>;
  acceptRequest?: (id: number) => Promise<void>; 
}

const MentoringContext = createContext<MentoringContextType | undefined>(undefined);

export const MentoringProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. 서버에 POST로 요청 등록
  const addRequest = async (request: MentoringRequest) => {
    await axios.post('http://localhost:8080/edit-requests', {
      menteeId: request.menteeId,
      mentorId: 999, 
      portfolioId: request.portfolioId,
      requestedAt: new Date().toISOString(),
    });
  };

  // 2. 서버에서 요청 목록 불러오기
  const fetchRequests = async (): Promise<MentoringRequest[]> => {
    const res = await axios.get('http://localhost:8080/edit-response?page=0');
    return res.data?.data?.content ?? [];
  };

  return (
    <MentoringContext.Provider value={{ addRequest, fetchRequests }}>
      {children}
    </MentoringContext.Provider>
  );
};

export const useMentoring = () => {
  const context = useContext(MentoringContext);
  if (!context) throw new Error('useMentoring는 MentoringProvider 내부에서 사용해야 합니다.');
  return context;
};
