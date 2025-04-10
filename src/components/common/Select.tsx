import { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select = ({ label, options, className = '', ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      >
        <option value="">선택해주세요</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
/* 사용예시
 const [job, setJob] = useState('');

  const jobOptions = [
    { label: '프론트엔드', value: 'frontend' },
    { label: '백엔드', value: 'backend' },
  ];

  return (
    <div className="w-full max-w-xs">
      <Select
        label="직무"
        options={jobOptions}
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
    </div>
*/
export default Select;
