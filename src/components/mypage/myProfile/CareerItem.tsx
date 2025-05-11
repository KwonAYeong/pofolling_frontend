import { X } from 'lucide-react';

interface Career {
  companyName: string;
  department: string;
  position: string;
  startedDate: string;
  endedDate: string;
}

interface Props {
  career: Career;
  index: number;
  onChange: (index: number, field: keyof Career, value: string) => void;
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
      <input className="w-full p-2 border rounded" placeholder="회사명" value={career.companyName} onChange={(e) => onChange(index, 'companyName', e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="부서" value={career.department} onChange={(e) => onChange(index, 'department', e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="직책" value={career.position} onChange={(e) => onChange(index, 'position', e.target.value)} />
      <input className="w-full p-2 border rounded" type="date" value={career.startedDate} onChange={(e) => onChange(index, 'startedDate', e.target.value)} />
      <input className="w-full p-2 border rounded" type="date" value={career.endedDate} onChange={(e) => onChange(index, 'endedDate', e.target.value)} />
    </div>
  </div>
);

export default CareerItem;
