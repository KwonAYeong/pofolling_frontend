export const mypageSidebarMenu = (role: 'MENTOR' | 'MENTEE') => {
    const common = [
      { label: '프로필', path: '/mypage' },
      { label: '내 활동', path: '/mypage/activity' },
    ];
    const menteeOnly = { label: '내 포트폴리오', path: '/mypage/portfolio' };
  
    return role === 'MENTOR'
      ? [...common]
      : [common[0], menteeOnly, common[1]];
  };
  