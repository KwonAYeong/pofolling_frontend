import { useState } from 'react';
import ProfileForm from 'components/mypage/myProfile/ProfileForm';

const ProfileUpdate = () => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [experiences, setExperiences] = useState([{ company: '', role: '' }]);
  const [educations, setEducations] = useState([{ school: '', major: '' }]);

  const handleSubmit = async () => {
    const formData = new FormData();

    if (profileFile) {
      formData.append('profileImage', profileFile);
    }

    formData.append('nickname', nickname);
    formData.append('phone', phone);
    formData.append('job', job);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('experience', JSON.stringify(experiences));
    formData.append('education', JSON.stringify(educations));


    try {
      // TODO: 실제 요청 시 URL 수정
      // await axios.post('/users/update', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      alert('프로필이 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <ProfileForm
      profileFile={profileFile}
      setProfileFile={setProfileFile}
      nickname={nickname}
      setNickname={setNickname}
      phone={phone}
      setPhone={setPhone}
      password={password}
      setPassword={setPassword}
      email={email}
      setEmail={setEmail}
      job={job}
      setJob={setJob}
      description={description}
      setDescription={setDescription}
      experiences={experiences}
      setExperiences={setExperiences}
      educations={educations}
      setEducations={setEducations}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileUpdate;
