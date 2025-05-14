import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from 'components/mypage/myProfile/ProfileForm';
import axios from 'api/axios';
import { useUser } from 'context/UserContext';
import { Education } from 'types/profile';
import { Careers } from 'types/profile';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useUser();
  const [originalNickname, setOriginalNickname] = useState('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [jobType, setjobType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [educations, setEducations] = useState<Education[]>([]);
  const [careers, setCareers] = useState<Careers[]>([]);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

  // 유저 정보 불러오기
  useEffect(() => {
     if (!password && !passwordConfirm) {
        setIsPasswordMatch(null);
        return;
      }
      setIsPasswordMatch(password === passwordConfirm);
}, [password, passwordConfirm]);
useEffect(() => {
    const fetchUser = async () => {
     
      try {
        if (!loggedInUser) return;

        const res = await axios.get(`/mypage/profile/${loggedInUser.user_id}`);
        const data = res.data;

        setName(data.name || '');
        setNickname(data.nickName || '');
        setOriginalNickname(data.nickName || ''); 
        setEmail(data.email || '');
        setphoneNumber(data.phoneNumber || '');
        setjobType(data.jobTypeType || '');
        setEducations(data.educations || []);
        setCareers(data.careers || []);
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchUser();
  }, [loggedInUser]);

  // 닉네임 중복 확인
 const checkNicknameDuplicate = async () => {
  if (nickname === loggedInUser?.nickname) {
    alert('현재 닉네임과 동일합니다.');
    setIsNicknameAvailable(null);
    return;
  }

  try {
    await axios.get('/mypage/profile/check-nickname', {
      params: { nickname },
    });

  
    alert('사용 가능한 닉네임입니다.');
    setIsNicknameAvailable(true);
  } catch (err: any) {

    const msg = err.response?.data?.message || '';

    if (msg.includes('이미 사용 중')) {
      alert('이미 사용 중인 닉네임입니다.');
      setIsNicknameAvailable(false);
    } else {
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
      console.error(err);
    }
  }
};


const handleSubmit = async () => {
  if (!loggedInUser) {
    alert('로그인이 필요합니다.');
    return;
  }

  if (!name || !nickname || !phoneNumber || !jobType) {
    alert('이름, 닉네임, 전화번호, 직무를 모두 입력해주세요.');
    return;
  }

  // 닉네임이 변경됐는데 중복 확인 안 한 경우
 if (nickname.trim() !== originalNickname.trim() && isNicknameAvailable !== true) {
  alert('닉네임 중복 확인을 완료해주세요.');
  return;
}


  // 비밀번호 입력 여부 확인
  if (password || passwordConfirm) {
    if (!password || !passwordConfirm) {
      alert('비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  }

  // 학력/경력 매핑
  const mappedEducations = educations.map((edu, idx) => ({
    educationId: idx,
    schoolName: edu.schoolName,
    major: edu.major,
    degree: edu.degree,
    admissionDate: edu.admissionDate,
    graduationDate: edu.graduationDate,
    educationStatus: edu.educationStatus,
  }));

  const mappedCareers = careers.map((car, idx) => ({
    careerId: idx,
    companyName: car.companyName,
    position: car.position,
    startedAt: car.startedAt,
    endedAt: car.endedAt,
  }));

  // 이미지 URL 추출
  const profileImageUrl = profileFile ? URL.createObjectURL(profileFile) : undefined;

  // JSON 데이터 구성
  const payload = {
    name,
    nickname,
    email,
    phoneNumber,
    jobType,
    password: password || null, // 입력 안 하면 null로 전달
    profileImage: profileImageUrl || null,
    educations: mappedEducations,
    careers: mappedCareers,
  };

  try {
    await axios.patch(`/mypage/profile/${loggedInUser.user_id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert('프로필이 성공적으로 수정되었습니다.');
    navigate(`/mypage`);
  } catch (error) {
    console.error('업데이트 실패:', error);
    alert('프로필 수정 중 오류가 발생했습니다.');
  }
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
      phoneNumber={phoneNumber}
      setphoneNumber={setphoneNumber}
      jobType={jobType}
      setjobType={setjobType}
      password={password}
      setPassword={setPassword}
      passwordConfirm={passwordConfirm}
      setPasswordConfirm={setPasswordConfirm}
      educations={educations}
      setEducations={setEducations}
      careers={careers}
      setCareers={setCareers}
      onSubmit={handleSubmit}
      onCheckNickname={checkNicknameDuplicate}
      isNicknameAvailable={isNicknameAvailable} 
      isPasswordMatch={isPasswordMatch}
    />
  );
};

export default ProfileUpdate;
