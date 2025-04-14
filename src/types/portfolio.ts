
export type PortfolioStatus = 'REGISTERED' | 'REQUESTED' | 'REVIEWING' | 'DONE';

export interface Portfolio {
  id: number;
  title: string;
  description?: string;
  uploadDate: string;
  status: PortfolioStatus; // ✅ 상태 기반으로 분기 가능
  fileUrl?: string; // 포폴 파일 경로 (선택)
}

// 사용 예시:
// const registeredPortfolios = portfolios.filter(p => p.status === 'REGISTERED');
