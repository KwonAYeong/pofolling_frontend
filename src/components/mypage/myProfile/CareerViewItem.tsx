import { Careers } from 'types/profile';
import { Briefcase } from 'lucide-react';

interface Props {
  careers: Careers[];
}

const CareerViewItem = ({ careers }: Props) => {
  if (!careers || careers.length === 0) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">
        입력된 경력 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {careers.map((car, i) => (
        <div key={i} className="flex items-center gap-4 border rounded p-4 shadow-sm">
          {/* 아이콘 박스 */}
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
            <Briefcase className="w-6 h-6 text-gray-600" />
          </div>

          {/* 텍스트 박스 */}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
              {car.companyName?.trim() || '회사명 없음'}
            </span>
            <span className="text-sm text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap">
              {car.department?.trim() || '부서 없음'} · {car.position?.trim() || '직책 없음'}
            </span>
            <span className="text-xs text-gray-500 mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {car.startedAt || '----.--'} ~ {car.endedAt || '----.--'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerViewItem;
