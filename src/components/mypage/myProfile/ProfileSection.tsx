interface ProfileSectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const ProfileSection = ({ title, children }: ProfileSectionProps) => (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-gray-800 mb-2">{title}</h2>
      {children}
    </div>
  );
  
  export default ProfileSection;
  