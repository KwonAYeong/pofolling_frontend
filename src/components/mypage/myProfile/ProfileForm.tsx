import { useEffect, useState } from 'react';
import Button from 'components/common/Button';
import ProfileFieldItem from './ProfileFieldItem';

const dummyUser = {
  profileUrl: '', // 더 이상 사용 안 함
  nickname: '홍길동',
  phone: '010-1234-5678',
  job: '프론트엔드 개발자',
  email: 'hong@example.com',
  password: '',
  description: '안녕하세요! 포트폴리오 첨삭을 받고 싶습니다.',
  experience: [{ company: '카카오', role: '프론트엔드 엔지니어' }],
  education: [{ school: '한세대학교', major: 'ICT융합학과' }],
};

interface Props {
  // profileUrl 제거, 대신 파일로 받음
  nickname: string;
  setNickname: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  job: string;
  setJob: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  experiences: { company: string; role: string }[];
  setExperiences: (v: { company: string; role: string }[]) => void;
  educations: { school: string; major: string }[];
  setEducations: (v: { school: string; major: string }[]) => void;
  profileFile: File | null;
  setProfileFile: (f: File | null) => void;
  onSubmit: () => void;
}

const ProfileForm = ({
  nickname,
  setNickname,
  phone,
  setPhone,
  job,
  setJob,
  password,
  setPassword,
  email,
  setEmail,
  description,
  setDescription,
  experiences,
  setExperiences,
  educations,
  setEducations,
  profileFile,
  setProfileFile,
  onSubmit,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // 초기화: 이미지 없음, 나머지 정보 설정
    setNickname(dummyUser.nickname);
    setPhone(dummyUser.phone);
    setJob(dummyUser.job);
    setEmail(dummyUser.email);
    setPassword('');
    setDescription(dummyUser.description);
    setExperiences(dummyUser.experience);
    setEducations(dummyUser.education);
  }, [
    setNickname,
    setPhone,
    setJob,
    setEmail,
    setPassword,
    setDescription,
    setExperiences,
    setEducations,
  ]);

  const handleAdd = <T extends object>(list: T[], setter: (v: T[]) => void, empty: T) => {
    setter([...list, empty]);
  };

  const handleRemove = <T extends object>(list: T[], setter: (v: T[]) => void, index: number) => {
    if (list.length <= 1) return;
    setter(list.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">프로필 수정</h1>

      <div className="space-y-4 mb-6">
        {/* 이미지 업로드 + 미리보기 */}
        <div>
          <label className="block text-sm font-medium mb-1">프로필 이미지</label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <input className="w-full p-3 border rounded" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <input className="w-full p-3 border rounded" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="w-full p-3 border rounded" placeholder="직무" value={job} onChange={(e) => setJob(e.target.value)} />
        <input className="w-full p-3 border rounded" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 border rounded" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <textarea className="w-full p-3 border rounded" rows={4} placeholder="자기소개" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2">경력</h2>
        {experiences.map((exp, idx) => (
          <ProfileFieldItem
            key={idx}
            index={idx}
            value={exp}
            fields={[
              ['company', '회사명'],
              ['role', '직무'],
            ]}
            onChange={(updated) => {
              const updatedList = [...experiences];
              updatedList[idx] = updated;
              setExperiences(updatedList);
            }}
            onRemove={() => handleRemove(experiences, setExperiences, idx)}
            canRemove={experiences.length > 1}
          />
        ))}
        <Button label="+ 경력 추가" onClick={() => handleAdd(experiences, setExperiences, { company: '', role: '' })} />
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2">학력</h2>
        {educations.map((edu, idx) => (
          <ProfileFieldItem
            key={idx}
            index={idx}
            value={edu}
            fields={[
              ['school', '학교명'],
              ['major', '전공'],
            ]}
            onChange={(updated) => {
              const updatedList = [...educations];
              updatedList[idx] = updated;
              setEducations(updatedList);
            }}
            onRemove={() => handleRemove(educations, setEducations, idx)}
            canRemove={educations.length > 1}
          />
        ))}
        <Button label="+ 학력 추가" onClick={() => handleAdd(educations, setEducations, { school: '', major: '' })} />
      </div>

      <div className="flex justify-end">
        <Button label="저장" variant="primary" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ProfileForm;
