import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const PasswordInput = ({ label, value, onChange }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border rounded mt-1 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
};

export default PasswordInput;
