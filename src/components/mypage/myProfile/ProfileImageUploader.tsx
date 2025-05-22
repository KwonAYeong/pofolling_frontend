import { useRef, useState } from 'react';
import axios from 'axios';

interface Props {
  profileImageUrl: string | null;
  setProfileImageUrl: (url: string | null) => void;
}

const ProfileImageUploader = ({ profileImageUrl, setProfileImageUrl }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profileImageUrl);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post<{ imageUrl: string }>(
        'http://localhost:8080/upload/profile-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = res.data.imageUrl;
      setProfileImageUrl(imageUrl);
      setPreviewUrl(imageUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <img
        src={previewUrl || '/default-profile.png'}
        alt="프로필"
        className="w-24 h-24 object-cover rounded-full border cursor-pointer"
        onClick={handleImageClick}
      />
      <div
        onClick={handleImageClick}
        className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border flex items-center justify-center text-gray-700 text-sm hover:bg-gray-100 cursor-pointer"
      >+</div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUploader;
