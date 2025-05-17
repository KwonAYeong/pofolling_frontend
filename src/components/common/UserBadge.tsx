import { useEffect, useRef, useState } from 'react';
import { UserRole } from 'context/UserContext';

interface UserBadgeProps {
  role: UserRole;
  profileUrl?: string;
  className?: string;
  alt?: string;
  hoverEffect?: boolean;  // ✅ 추가
}

const UserBadge = ({
  role,
  profileUrl,
  className = '',
  alt = '프로필',
  hoverEffect = false, // 기본값 false
}: UserBadgeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [borderWidth, setBorderWidth] = useState(1);

  const borderColor = role === 'MENTOR' ? '#A566FF' : '#657CFF';
  const fallbackImage = '/default-profile.png';
  const finalImage = profileUrl || fallbackImage;

  useEffect(() => {
    if (ref.current) {
      const size = ref.current.offsetWidth;
      const calculated = Math.max(2, Math.round(size / 30));
      setBorderWidth(calculated);
    }
  }, []);

  const baseClass = `rounded-full overflow-hidden ${className}`;
  const hoverClass = hoverEffect ? 'transition-transform duration-200 hover:scale-105' : '';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${hoverClass}`}
      style={{
        borderColor,
        borderStyle: 'solid',
        borderWidth: `${borderWidth}px`,
      }}
    >
      <img
        src={finalImage}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserBadge;
