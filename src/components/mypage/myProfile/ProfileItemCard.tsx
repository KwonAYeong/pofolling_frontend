interface ProfileItemCardProps {
    title: string;
    subtitle: string;
  }
  
  const ProfileItemCard = ({ title, subtitle }: ProfileItemCardProps) => (
    <div className="p-3 border rounded-md mb-2">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="text-xs text-gray-600">{subtitle}</div>
    </div>
  );
  
  export default ProfileItemCard;
  