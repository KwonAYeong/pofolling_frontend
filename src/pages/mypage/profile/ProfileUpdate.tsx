import { useState } from 'react';
import ProfileForm from 'components/mypage/myProfile/ProfileForm';

const ProfileUpdate = () => {
  const dummyUser = {
    name: '신재윤',
    nickname: '감자',
    email: 'sjy1234@example.com',
    phone: '010-1234-5678',
    job: '프론트엔드 개발자',
    password: '12345678',
    passwordConfirm: '12345678',
    profileFile: null,
    educations: [
      {
        schoolName: '한세대학교',
        major: 'ICT융합학과',
        degree: '학사',
        admissionDate: '2020-03-02',
        graduationDate: '2024-02-15',
        status: '졸업'
      }
    ],
    careers: [
      {
        companyName: '네이버',
        department: 'FE개발팀',
        position: '프론트엔드 엔지니어',
        startedDate: '2024-03-01',
        endedDate: '2025-02-28'
      }
    ]
  };

  const [profileFile, setProfileFile] = useState<File | null>(dummyUser.profileFile);
  const [name, setName] = useState(dummyUser.name);
  const [nickname, setNickname] = useState(dummyUser.nickname);
  const [email] = useState(dummyUser.email);
  const [phone, setPhone] = useState(dummyUser.phone);
  const [job, setJob] = useState(dummyUser.job);
  const [password, setPassword] = useState(dummyUser.password);
  const [passwordConfirm, setPasswordConfirm] = useState(dummyUser.passwordConfirm);
  const [educations, setEducations] = useState(dummyUser.educations);
  const [careers, setCareers] = useState(dummyUser.careers);

  const handleSubmit = async () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('job', job);
    formData.append('password', password);
    if (profileFile) formData.append('profileImage', profileFile);
    formData.append('educations', JSON.stringify(educations));
    formData.append('careers', JSON.stringify(careers));

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // 실제 서버 요청 예시
    // await axios.post('/api/users/update', formData);
  };

  return (
    <ProfileForm
      profileFile={profileFile}
      setProfileFile={setProfileFile}
      name={name}
      setName={setName}
      nickname={nickname}
      setNickname={setNickname}
      email={email}
      phone={phone}
      setPhone={setPhone}
      job={job}
      setJob={setJob}
      password={password}
      setPassword={setPassword}
      passwordConfirm={passwordConfirm}
      setPasswordConfirm={setPasswordConfirm}
      educations={educations}
      setEducations={setEducations}
      careers={careers}
      setCareers={setCareers}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileUpdate;
