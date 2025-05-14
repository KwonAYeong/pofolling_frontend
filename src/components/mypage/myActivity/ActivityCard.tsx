interface Props {
  title: string;
  count: number;
  onClick: () => void;
  color?: 'blue' | 'yellow' | 'green' | 'gray';
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200', 
};

const ActivityCard = ({ title, count, onClick, color = 'gray' }: Props) => {
  const classNames = colorMap[color] ?? colorMap.gray;

  return (
    <button
      onClick={onClick}
      className={`w-[140px] p-3 rounded-lg shadow ${classNames}`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{count}</p>
    </button>
  );
};

export default ActivityCard;
