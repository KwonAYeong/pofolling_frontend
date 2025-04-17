import { UserRole } from 'context/UserContext';



interface UserBadgeProps {
  role: UserRole; // 멘토 멘티 역할에 따른 테두리 스타일
  profileUrl?: string; // 프로필 이미지 url
  className?: string; // 사이즈나 위치는 조절용 Tailwind 클래스
  alt?: string; // 이미지 대체 텍스트
}

const UserBadge = ({ role, profileUrl, className = '', alt = '프로필' }: UserBadgeProps) => {
  const borderColor = role === 'MENTOR' ? 'border-mentor' : 'border-mentee';
  const fallbackImage = '/default-profile.png';
  const finalImage = profileUrl || fallbackImage; // 사진 지정 없을 시 디폴트 프로필 사진
  const finalAlt = profileUrl ? alt : '기본 프로필'; 
  return (
    <div className={`rounded-full overflow-hidden border-2 ${borderColor} ${className}`}>
      <img
        src={finalImage}
        alt={finalAlt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
/* 사용예시
<UserBadge
  role={dummyUser.role}
  rc="/profileEX.png"
  className="w-8 h-8"
/>
*/
export default UserBadge;
