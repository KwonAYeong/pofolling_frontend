import { useRef, useState, useEffect } from 'react';

interface Props {
  profileFile: File | null;
  setProfileFile: (file: File | null) => void;
}

const ProfileImageUploader = ({ profileFile, setProfileFile }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(profileFile);
    } else {
      setPreviewUrl(null);
    }
  }, [profileFile]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileFile(file);
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
