import { UserRole } from 'context/UserContext';

interface UserBadgeProps {
  role: UserRole;
  profileUrl?: string;
  className?: string;
  alt?: string;
}

const UserBadge = ({ role, profileUrl, className = '', alt = '프로필' }: UserBadgeProps) => {
  const borderColor = role === 'MENTOR' ? '#A566FF' : '#657CFF'; // 멘토: 보라, 멘티: 파랑
  const fallbackImage = '/default-profile.png';
  const finalImage = profileUrl || fallbackImage;
  const finalAlt = profileUrl ? alt : '기본 프로필';

  return (
    <div
      className={`rounded-full overflow-hidden border-2 ${className}`}
      style={{
        borderColor,
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    >
      <img
        src={finalImage}
        alt={finalAlt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserBadge;

/* 사용예시
<UserBadge
  role={dummyUser.role}
  rc="/profileEX.png"
  className="w-8 h-8"
/>
*/