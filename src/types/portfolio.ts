

export interface Portfolio {
  nickname: string | undefined;
  portfolioId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  fileUrl: string;
  status: 'REGISTERED' | 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED';
  title: string;
  userId: number;
}

// 사용 예시:
// const registeredPortfolios = portfolios.filter(p => p.status === 'REGISTERED');
