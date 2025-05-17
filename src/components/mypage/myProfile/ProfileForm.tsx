import LabeledInput from 'components/common/LabeledInput';
import PasswordInput from 'components/common/PasswordInput';
import Select from 'components/common/Select';
import Button from 'components/common/Button';
import ProfileImageUploader from './ProfileImageUploader';
import EducationItem from './EducationItem';
import CareerItem from './CareerItem';
import { Careers, Education } from 'types/profile';

type NicknameStatus = 'initial' | 'invalid' | 'original' | 'checking' | 'valid' | 'duplicated';

interface Props {
  profileFile: File | null;
  setProfileFile: (file: File | null) => void;
  name: string;
  setName: (v: string) => void;
  nickname: string;
  setNickname: (v: string) => void;
  email: string;
  phoneNumber: string;
  setphoneNumber: (v: string) => void;
  jobType: string;
  setjobType: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (v: string) => void;
  educations: Education[];
  setEducations: (v: Education[]) => void;
  careers: Careers[];
  setCareers: (v: Careers[]) => void;
  onSubmit: () => void;
  isPasswordMatch: boolean | null;
  nicknameStatus: NicknameStatus;
}

const ProfileForm = ({
  profileFile,
  setProfileFile,
  name,
  setName,
  nickname,
  setNickname,
  email,
  phoneNumber,
  setphoneNumber,
  jobType,
  setjobType,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  educations,
  setEducations,
  careers,
  setCareers,
  onSubmit,
  isPasswordMatch,
  nicknameStatus,
}: Props) => {
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const handleCareerChange = (index: number, field: keyof Careers, value: string) => {
    const updated = [...careers];
    updated[index][field] = value;
    setCareers(updated);
  };

  const jobTypeOptions = [
    { label: '개발', value: '개발' },
    { label: '마케팅/광고', value: '마케팅_광고' },
    { label: '경영/비즈니스', value: '경영_비즈니스' },
    { label: '디자인', value: '디자인' },
  ];

  return (
    <div className="max-w-xl mx-auto px-6 py-8 text-base">
      <h1 className="text-2xl font-bold mb-6">프로필 수정</h1>

      <ProfileImageUploader profileFile={profileFile} setProfileFile={setProfileFile} />

      <div className="space-y-4">
        <LabeledInput label="이메일" value={email} onChange={() => {}} readOnly />
        <LabeledInput label="이름" value={name} onChange={setName} placeholder="예: 홍길동" />

        <div>
          <label className="text-sm font-medium block mb-1">닉네임</label>
          <div className="flex gap-2 flex-nowrap">
            <input
              className="w-full p-2 border rounded"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 감자도리"
            />
          </div>
          {nicknameStatus === 'invalid' && (
            <p className="text-red-600 text-sm mt-1">닉네임은 한글/영문/숫자 2~10자 이내여야 합니다.</p>
          )}
          {nicknameStatus === 'original' && (
            <p className="text-gray-500 text-sm mt-1">현재 사용 중인 닉네임입니다.</p>
          )}
          {nicknameStatus === 'checking' && (
            <p className="text-gray-500 text-sm mt-1">중복 확인 중...</p>
          )}
          {nicknameStatus === 'valid' && (
            <p className="text-green-600 text-sm mt-1">사용 가능한 닉네임입니다.</p>
          )}
          {nicknameStatus === 'duplicated' && (
            <p className="text-red-600 text-sm mt-1">이미 사용 중인 닉네임입니다.</p>
          )}
        </div>

        <LabeledInput
          label="전화번호"
          value={phoneNumber}
          onChange={setphoneNumber}
          placeholder="예: 010-1234-5678"
        />
        <Select
          label="직무"
          options={jobTypeOptions}
          value={jobType}
          onChange={(e) => setjobType(e.target.value)}
        />
        <PasswordInput label="비밀번호" value={password} onChange={setPassword} />
        <PasswordInput label="비밀번호 확인" value={passwordConfirm} onChange={setPasswordConfirm} />
        {isPasswordMatch === false && (
          <p className="text-red-600 text-sm">비밀번호가 일치하지 않습니다.</p>
        )}
        {isPasswordMatch === true && password && passwordConfirm && (
          <p className="text-green-600 text-sm">비밀번호가 일치합니다.</p>
        )}

        {/* 학력 정보 */}
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
          <Button
            label="+ 학력 추가"
            onClick={() =>
              setEducations([
                ...educations,
                {
                  schoolName: '',
                  major: '',
                  degree: '',
                  admissionDate: '',
                  graduationDate: '',
                  educationStatus: '',
                },
              ])
            }
          />
        </div>

        {/* 경력 정보 */}
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
          <Button
            label="+ 경력 추가"
            onClick={() =>
              setCareers([
                ...careers,
                {
                  companyName: '',
                  department: '',
                  position: '',
                  startedAt: '',
                  endedAt: '',
                },
              ])
            }
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button label="저장" variant="primary" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
