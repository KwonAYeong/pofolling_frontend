import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBadge from 'components/common/UserBadge';
import Button from 'components/common/Button';
import CareerViewItem from 'components/mypage/myProfile/CareerViewItem';
import EducationViewItem from 'components/mypage/myProfile/EducationViewItem';

interface User {
  nickname: string; // 닉네임
  role: 'MENTEE' | 'MENTOR';
  profileUrl?: string;
  email?: string;
  job?: string;
  experience?: { company: string; role: string }[];
  education?: { school: string; major: string }[];
}

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dummyUser: User = {
      nickname: '부실감자',
      role: 'MENTEE',
      profileUrl: 'profileEX.png',
      email: 'jaeyoon@example.com',
      job: '개발',
      experience: [
        {
          company: '넥슨',
          role: '마비노기 개발팀 팀장',
        },
        {
          company: '카카오엔터프라이즈',
          role: '프론트엔드 엔지니어',
        },
      ],
      education: [
        {
          school: '한세대학교',
          major: 'ICT융합학과',
        },
        {
          school: '서울과학기술대학교',
          major: '컴퓨터공학과',
        },
      ],
    };
    setUser(dummyUser);
  }, [navigate]);

  if (!user) return <div className="text-center py-10">유저 정보가 없습니다.</div>;

  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">프로필</h1>

      {/* 프로필 상단 */}
      <div className="flex items-start gap-4 mb-6">
        <UserBadge
          role={user.role}
          profileUrl={user.profileUrl}
          className="w-20 h-20 shrink-0"
        />

        <div className="flex flex-col justify-center items-start">
          {/* 닉네임 */}
          <div className="flex items-baseline gap-2">
            <div className="text-xl font-bold text-gray-900">{user.nickname} </div>
            <div className="text-sm text-gray-600">{user.role === 'MENTEE' ? '멘티' : '멘토'}님</div>
          </div>

          {/* 역할 + 직무 */}
          <div className="text-sm text-gray-600 mt-1">
            {user.job && <> {user.job}</>}
          </div>

          {/* 이메일 */}
          {user.email && (
            <div className="text-sm text-gray-500 mt-2">이메일: {user.email}</div>
          )}
        </div>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">경력</div>
        <CareerViewItem
          careers={(user.experience || []).map((exp) => ({
            companyName: exp.company,
            department: '',
            position: exp.role,
            startedDate: '',
            endedDate: '',
          }))}
        />
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2">학력</div>
        <EducationViewItem
          educations={(user.education || []).map((edu) => ({
            schoolName: edu.school,
            major: edu.major,
            degree: '',
            admissionDate: '',
            graduationDate: '',
            status: '',
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
