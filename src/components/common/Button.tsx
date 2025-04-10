
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'secondary' | 'primary' | 'danger';
}

const Button = ({
  label,
  variant = 'secondary',
  className = '',
  ...props
}: ButtonProps) => {

  //secondary: 기본 버튼, primary: 중요한 버튼, danger: 주의가 필요한 버튼
  const baseStyle = 'px-4 py-2 rounded text-sm font-semibold transition';
  const variantStyle = {
    secondary: 'bg-white text-black border border-black hover:bg-gray-50',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
/* 사용예시
<Button label="저장" onClick={handleSave} />
<Button label="취소" variant="secondary" onClick={handleCancel} />
<Button label="삭제" variant="danger" onClick={handleDelete} />
*/
export default Button;
