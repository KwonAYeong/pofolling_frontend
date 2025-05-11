import LabeledInput from 'components/common/LabeledInput';
import PasswordInput from 'components/common/PasswordInput';
import Select from 'components/common/Select';
import Button from 'components/common/Button';
import ProfileImageUploader from './ProfileImageUploader';
import EducationItem from './EducationItem';
import CareerItem from './CareerItem';

interface Education {
  schoolName: string;
  major: string;
  degree: string;
  admissionDate: string;
  graduationDate: string;
  status: string;
}

interface Career {
  companyName: string;
  department: string;
  position: string;
  startedDate: string;
  endedDate: string;
}

interface Props {
  profileFile: File | null;
  setProfileFile: (file: File | null) => void;
  name: string;
  setName: (v: string) => void;
  nickname: string;
  setNickname: (v: string) => void;
  email: string;
  phone: string;
  setPhone: (v: string) => void;
  job: string;
  setJob: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (v: string) => void;
  educations: Education[];
  setEducations: (v: Education[]) => void;
  careers: Career[];
  setCareers: (v: Career[]) => void;
  onSubmit: () => void;
}

const ProfileForm = ({
  profileFile,
  setProfileFile,
  name,
  setName,
  nickname,
  setNickname,
  email,
  phone,
  setPhone,
  job,
  setJob,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  educations,
  setEducations,
  careers,
  setCareers,
  onSubmit,
}: Props) => {
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const handleCareerChange = (index: number, field: keyof Career, value: string) => {
    const updated = [...careers];
    updated[index][field] = value;
    setCareers(updated);
  };

  // NOTE: 현재는 하드코딩된 직무 옵션. 추후 백엔드에서 받아올 예정
  // const jobOptions = await fetch('/api/jobs').then(res => res.json());
  const jobOptions = [
    { label: '개발', value: '개발' },
    { label: '마케팅/광고', value: '마케팅/광고' },
    { label: '경영/비즈니스', value: '경영/비즈니스' },
    { label: '디자인', value: '디자인' },
  ];

  return (
    <div className="max-w-xl mx-auto px-6 py-8 text-base">
      <h1 className="text-2xl font-bold mb-6">프로필 수정</h1>

      <ProfileImageUploader profileFile={profileFile} setProfileFile={setProfileFile} />

      <div className="space-y-4">
        <LabeledInput label="이메일" value={email} onChange={() => {}} readOnly />
        <LabeledInput label="이름" value={name} onChange={setName} />
        <LabeledInput label="닉네임" value={nickname} onChange={setNickname} />
        <LabeledInput label="전화번호" value={phone} onChange={setPhone} />

        <Select
          label="직무"
          options={jobOptions}
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />

        <PasswordInput label="비밀번호" value={password} onChange={setPassword} />
        <PasswordInput label="비밀번호 확인" value={passwordConfirm} onChange={setPasswordConfirm} />

        <div className="pt-6">
          <h2 className="text-lg font-semibold mb-2">학력 정보</h2>
          {educations.map((edu, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">학교 {i + 1}</h3>
              <EducationItem
                education={edu}
                index={i}
                onChange={handleEducationChange}
                onRemove={(index) => setEducations(educations.filter((_, idx) => idx !== index))}
              />
            </div>
          ))}
          <Button label="+ 학력 추가" onClick={() => setEducations([...educations, {
            schoolName: '', major: '', degree: '', admissionDate: '', graduationDate: '', status: ''
          }])} />
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-semibold mb-2">경력 정보</h2>
          {careers.map((car, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">회사 {i + 1}</h3>
              <CareerItem
                career={car}
                index={i}
                onChange={handleCareerChange}
                onRemove={(index) => setCareers(careers.filter((_, idx) => idx !== index))}
              />
            </div>
          ))}
          <Button label="+ 경력 추가" onClick={() => setCareers([...careers, {
            companyName: '', department: '', position: '', startedDate: '', endedDate: ''
          }])} />
        </div>

        <div className="flex justify-end mt-6">
          <Button label="저장" variant="primary" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
