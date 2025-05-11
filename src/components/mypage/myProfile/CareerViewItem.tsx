interface Career {
  companyName: string;
  department: string;
  position: string;
  startedDate: string;
  endedDate: string;
}

interface Props {
  careers: Career[];
}

const CareerViewItem = ({ careers }: Props) => {
  if (!careers || careers.length === 0) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">입력된 경력 정보가 없습니다.</div>
    );
  }

  return (
    <div className="space-y-4">
      {careers.map((car, i) => (
        <div key={i} className="flex items-start gap-4 border rounded p-4 shadow-sm">
          <div className="w-12 h-12 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="text-sm font-semibold">{car.companyName || '회사명 없음'}</div>
            <div className="text-sm text-gray-600">
              {car.department || '부서 없음'} · {car.position || '직책 없음'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {(car.startedDate || '----.--')} ~ {(car.endedDate || '----.--')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerViewItem;
