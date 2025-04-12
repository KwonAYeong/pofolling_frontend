interface Props {
    id: number;
    title: string;
    uploadDate: string;
    selected: boolean;
    onSelect: (id: number) => void;
  }
  
  const PortfolioSelector = ({ id, title, uploadDate, selected, onSelect }: Props) => {
    return (
      <div
        onClick={() => onSelect(id)}
        className={`cursor-pointer border px-6 py-4 rounded-lg transition-colors w-full h-[80px] ${
          selected ? 'bg-blue-100 border-blue-400' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex justify-between items-center h-full">
          {/* 좌측 제목 */}
          <div className="flex items-center h-full">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
  
          {/* 우측 날짜 */}
          <div className="flex items-center h-full">
            <p className="text-base text-gray-500">{uploadDate}</p>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default PortfolioSelector;
  