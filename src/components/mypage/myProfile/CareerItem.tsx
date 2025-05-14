import { X } from 'lucide-react';
import { Careers } from 'types/profile';
import LabeledInput from 'components/common/LabeledInput';

interface Props {
  career: Careers;
  index: number;
  onChange: (index: number, field: keyof Careers, value: string) => void;
  onRemove: (index: number) => void;
}

const CareerItem = ({ career, index, onChange, onRemove }: Props) => (
  <div className="relative border rounded px-6 pt-6 pb-6">
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="absolute -top-3 -right-3 p-1 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full z-10 bg-white shadow-md"
      aria-label="삭제"
    >
      <X size={18} strokeWidth={2} />
    </button>

    <div className="space-y-2">
      <LabeledInput
        label="회사명"
        value={career.companyName}
        onChange={(v) => onChange(index, 'companyName', v)}
        placeholder="예: 카카오엔터프라이즈"
      />
      <LabeledInput
        label="부서"
        value={career.department}
        onChange={(v) => onChange(index, 'department', v)}
        placeholder="예: 플랫폼서비스팀"
      />
      <LabeledInput
        label="직책"
        value={career.position}
        onChange={(v) => onChange(index, 'position', v)}
        placeholder="예: 프론트엔드 엔지니어"
      />
      <LabeledInput
        label="입사일"
        type="date"
        value={career.startedAt}
        onChange={(v) => onChange(index, 'startedAt', v)}
      />
      <LabeledInput
        label="퇴사일"
        type="date"
        value={career.endedAt}
        onChange={(v) => onChange(index, 'endedAt', v)}
      />
    </div>
  </div>
);

export default CareerItem;
