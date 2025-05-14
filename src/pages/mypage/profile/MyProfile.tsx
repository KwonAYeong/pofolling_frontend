import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBadge from 'components/common/UserBadge';
import Button from 'components/common/Button';
import CareerViewItem from 'components/mypage/myProfile/CareerViewItem';
import EducationViewItem from 'components/mypage/myProfile/EducationViewItem';
import { useUser } from 'context/UserContext';
import axios from 'api/axios';

interface User {
  nickName: string;
  profileImage?: string;
  email: string;
  jobType?: string;
  role: 'MENTEE' | 'MENTOR';
  careers?: {
    companyName: string;
    role: string;
    department?: string;
    position?: string;
    startedAt?: string;
    endedAt?: string;
  }[];
  educations?: {
    schoolName: string;
    major: string;
    degree?: string;
    admissionDate?: string;
    graduationDate?: string;
    educationStatus?: string;
  }[];
}


const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { user: loggedInUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        if (!loggedInUser) return;

        const userId = loggedInUser.user_id;
        const res = await axios.get(`/mypage/profile/${userId}`);

        setUser(res.data);
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [loggedInUser]);

  if (isLoading) return <div className="text-center py-10"></div>;
  if (!user) return <div className="text-center py-10">유저 정보 없음</div>;

  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">프로필</h1>

      {/* 프로필 상단 */}
      <div className="flex items-start gap-4 mb-6">
        <UserBadge
          role={user.role}
          profileUrl={user.profileImage}
          className="w-20 h-20 shrink-0"
        />
        <div className="flex flex-col justify-center items-start">
          <div className="flex items-baseline gap-2">
            <div className="text-xl font-bold text-gray-900">{user.nickName}</div>
            <div className="text-sm text-gray-600">{user.role === 'MENTEE' ? '멘티' : '멘토'}님</div>
          </div>
          <div className="text-sm text-gray-600 mt-1">{user.jobType}</div>
          {user.email && (
            <div className="text-sm text-gray-500 mt-1">{user.email}</div>
          )}
        </div>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">경력</div>
        <CareerViewItem
          careers={(user.careers || []).map((cer) => ({
            companyName: cer.companyName,
            department: cer.department || '',
            position: cer.position || cer.role || '',
            startedAt: cer.startedAt || '',
            endedAt: cer.endedAt || '',
          }))}
        />
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">학력</div>
        <EducationViewItem
          educations={(user.educations || []).map((edu) => ({
            schoolName: edu.schoolName,
            major: edu.major,
            degree: edu.degree || '',
            admissionDate: edu.admissionDate || '',
            graduationDate: edu.graduationDate || '',
            educationStatus: edu.educationStatus || '',
          }))}
        />
      </div>

      <div className="flex justify-end">
        <Button
          label="프로필 수정"
          variant="primary"
          onClick={() => navigate('/mypage/edit')}
        />
      </div>
    </div>
  );
};

export default MyProfile;
