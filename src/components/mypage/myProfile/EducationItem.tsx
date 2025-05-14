import { X } from 'lucide-react';
import { Education } from 'types/profile';
import LabeledInput from 'components/common/LabeledInput';
import Select from 'components/common/Select';

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
     <LabeledInput
        label="학교명"
        value={education.schoolName}
        onChange={(v) => onChange(index, 'schoolName', v)}
        placeholder="예: 한세대학교"
      />
      <LabeledInput
        label="전공"
        value={education.major}
        onChange={(v) => onChange(index, 'major', v)}
        placeholder="예: 컴퓨터공학과"
      />
      <LabeledInput
        label="학위"
        value={education.degree}
        onChange={(v) => onChange(index, 'degree', v)}
        placeholder="예: 학사"
      />
      <LabeledInput
        label="입학일"
        type="date"
        value={education.admissionDate}
        onChange={(v) => onChange(index, 'admissionDate', v)}
      />
      <LabeledInput
        label="졸업일"
        type="date"
        value={education.graduationDate}
        onChange={(v) => onChange(index, 'graduationDate', v)}
      />

      <Select
        label="재학 상태"
        options={[
          { label: '재학', value: '재학' },
          { label: '졸업', value: '졸업' },
          { label: '휴학', value: '휴학' },
          { label: '자퇴', value: '자퇴' },
        ]}
        value={education.educationStatus}
        onChange={(e) => onChange(index, 'educationStatus', e.target.value)}
      />
    </div>
  </div>
);

export default EducationItem;
