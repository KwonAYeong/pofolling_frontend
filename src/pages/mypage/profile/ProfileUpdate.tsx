import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from 'components/mypage/myProfile/ProfileForm';
import axios from 'api/axios';
import { useUser } from 'context/UserContext';
import { Education, Careers } from 'types/profile';

type NicknameStatus = 'initial' | 'invalid' | 'original' | 'checking' | 'valid' | 'duplicated';

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
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>('initial');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

  const isValidNickname = (nickname: string) => {
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    return regex.test(nickname);
  };

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (!password && !passwordConfirm) {
      setIsPasswordMatch(null);
      return;
    }
    setIsPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  // 유저 정보 불러오기
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
        setjobType(data.jobType || '');
        setEducations(data.educations || []);
        setCareers(data.careers || []);
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchUser();
  }, [loggedInUser]);

  // 닉네임 자동 중복 확인
useEffect(() => {
  const trimmed = nickname.trim();

  // 1. 빈 문자열
  if (!trimmed) {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setNicknameStatus('initial');
    return;
  }

  // 2. 원래 닉네임
  if (trimmed === originalNickname.trim()) {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setNicknameStatus('original');
    return;
  }

  // 3. 유효성 검사 실패 → 서버 요청 막기
  if (!isValidNickname(trimmed)) {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setNicknameStatus('invalid');
    return;
  }

  // 4. 서버 중복 확인 요청
  setNicknameStatus('checking');
  if (debounceTimer.current) clearTimeout(debounceTimer.current);

  debounceTimer.current = setTimeout(async () => {
    try {
      const res = await axios.get('/mypage/profile/check-nickname', {
        params: {
          nickname: trimmed,
          userId: loggedInUser?.user_id,
        },
      });

      setNicknameStatus(res.data.isAvailable ? 'valid' : 'duplicated');
    } catch (err) {
      setNicknameStatus('initial');
    }
  }, 1000);
}, [nickname, originalNickname, loggedInUser]);




  const handleSubmit = async () => {
    if (!loggedInUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!name || !nickname || !phoneNumber || !jobType) {
      alert('이름, 닉네임, 전화번호, 직무를 모두 입력해주세요.');
      return;
    }

    if (nickname.trim() !== originalNickname.trim() && nicknameStatus !== 'valid') {
      alert('닉네임 중복 확인을 완료해주세요.');
      return;
    }

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

    const profileImageUrl = profileFile ? URL.createObjectURL(profileFile) : undefined;

    const payload = {
      name,
      nickname,
      email,
      phoneNumber,
      jobType,
      password: password || null,
      profileImage: profileImageUrl || null,
      educations: mappedEducations,
      careers: mappedCareers,
    };

    try {
      await axios.patch(`/mypage/profile/${loggedInUser.user_id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
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
      isPasswordMatch={isPasswordMatch}
      nicknameStatus={nicknameStatus}
    />
  );
};

export default ProfileUpdate;
