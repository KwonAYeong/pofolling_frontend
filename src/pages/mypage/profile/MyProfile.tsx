import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBadge from 'components/common/UserBadge';
import Button from 'components/common/Button';

interface User {
  nickname: string;
  role: 'MENTEE' | 'MENTOR';
  profileUrl?: string;
  email?: string;
  job?: string;
  description?: string;
  experience?: { company: string; role: string }[];
  education?: { school: string; major: string }[];
}

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const dummyUser: User = {
      nickname: '홍길동',
      role: 'MENTEE',
      profileUrl: '',
      email: 'hong@example.com',
      job: '프론트엔드 개발자',
      description: '안녕하세요! 포트폴리오 첨삭을 받고 싶습니다.',
      experience: [
        {
          company: '넥슨',
          role: '마비노기 개발팀 팀장',
        },
      ],
      education: [
        {
          school: '한세대',
          major: 'ICT융합학과 (4년제)',
        },
      ],
    };
    setUser(dummyUser);

    // 실제 연동 코드 (향후 사용 예정)
    // axios.get('http://localhost:8080/users/me')
    //   .then((res) => setUser(res.data.data))
    //   .catch((err) => {
    //     console.error('유저 정보 불러오기 실패:', err);
    //     alert('로그인이 필요합니다.');
    //     navigate('/');
    //   });
  }, [navigate]);

  if (!user) return <div className="text-center py-10">유저 정보가 없습니다.</div>;

  return (
    <div className="px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">프로필</h1>

      <div className="flex items-center gap-4 mb-6">
        <UserBadge role={user.role} profileUrl={user.profileUrl} className="w-16 h-16" />
        <div>
          <div className="text-lg font-semibold">{user.nickname}</div>
          <div className="text-sm text-gray-500">{user.role === 'MENTEE' ? '멘티' : '멘토'}</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-xs text-gray-500 mb-1">이메일</div>
          <div className="text-sm font-medium text-gray-800">{user.email || '-'}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-xs text-gray-500 mb-1">직무</div>
          <div className="text-sm font-medium text-gray-800">{user.job || '-'}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-xs text-gray-500 mb-1">소개</div>
          <div className="text-sm font-medium text-gray-800 whitespace-pre-wrap">
            {user.description || '-'}
          </div>
        </div>
      </div>

      {/* 경력 */}
      {user.experience && user.experience.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">경력</div>
          {user.experience.map((exp, idx) => (
            <div key={idx} className="p-3 border rounded-lg mb-2">
              <div className="text-sm font-semibold">{exp.company}</div>
              <div className="text-xs text-gray-600">{exp.role}</div>
            </div>
          ))}
        </div>
      )}

      {/* 학력 */}
      {user.education && user.education.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">학력</div>
          {user.education.map((edu, idx) => (
            <div key={idx} className="p-3 border rounded-lg mb-2">
              <div className="text-sm font-semibold">{edu.school}</div>
              <div className="text-xs text-gray-600">{edu.major}</div>
            </div>
          ))}
        </div>
      )}

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
