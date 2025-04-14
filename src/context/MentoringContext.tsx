// /src/context/MentoringContext.tsx
import { createContext, useContext, useState } from 'react';
import { UserRole } from './UserContext';

export interface MentoringRequest {
  id: number;
  menteeId: number;
  menteeNickname: string;
  position: string;
  role: UserRole;
  profileUrl?: string;
  title: string;
  requestDate: string;
  portfolioId: number;
}

interface MentoringContextType {
  requests: MentoringRequest[];
  addRequest: (request: MentoringRequest) => void;
}

const MentoringContext = createContext<MentoringContextType | undefined>(undefined);

export const MentoringProvider = ({ children }: { children: React.ReactNode }) => {
  const [requests, setRequests] = useState<MentoringRequest[]>([]);

  const addRequest = (request: MentoringRequest) => {
    setRequests((prev) => [...prev, request]);
  };

  return (
    <MentoringContext.Provider value={{ requests, addRequest }}>
      {children}
    </MentoringContext.Provider>
  );
};

export const useMentoring = () => {
  const context = useContext(MentoringContext);
  if (!context) throw new Error('useMentoring는 MentoringProvider 내부에서 사용해야 합니다.');
  return context;
};
