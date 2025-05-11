interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const LabeledInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  readOnly = false,
}: LabeledInputProps) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full p-3 border rounded mt-1 ${readOnly ? 'bg-gray-100' : ''}`}
    />
  </label>
);

export default LabeledInput;
