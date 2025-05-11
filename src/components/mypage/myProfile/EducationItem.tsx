import { X } from 'lucide-react';

interface Education {
  schoolName: string;
  major: string;
  degree: string;
  admissionDate: string;
  graduationDate: string;
  status: string;
}

interface Props {
  education: Education;
  index: number;
  onChange: (index: number, field: keyof Education, value: string) => void;
  onRemove: (index: number) => void;
}

const EducationItem = ({ education, index, onChange, onRemove }: Props) => (
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
      <input className="w-full p-2 border rounded" placeholder="학교명" value={education.schoolName} onChange={(e) => onChange(index, 'schoolName', e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="전공" value={education.major} onChange={(e) => onChange(index, 'major', e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="학위" value={education.degree} onChange={(e) => onChange(index, 'degree', e.target.value)} />
      <input className="w-full p-2 border rounded" type="date" value={education.admissionDate} onChange={(e) => onChange(index, 'admissionDate', e.target.value)} />
      <input className="w-full p-2 border rounded" type="date" value={education.graduationDate} onChange={(e) => onChange(index, 'graduationDate', e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="재학 상태 (예: 재학중, 졸업)" value={education.status} onChange={(e) => onChange(index, 'status', e.target.value)} />
    </div>
  </div>
);

export default EducationItem;
