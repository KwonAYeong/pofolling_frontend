import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(); // esc 클릭 시 닫음
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} > {/*배경클릭 시 close */}
      <div
        className="bg-white rounded shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // 모달 내용 클릭시 close방지
      >
        {children} 
      </div>
    </div>
  );
};
/* 사용예시
      <Button label="모달 열기" onClick={() => setOpen(true)} />

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h2>
        <div className="flex justify-end gap-2">
          <Button label="취소" variant="secondary" onClick={() => setOpen(false)} />
          <Button label="삭제" variant="danger" onClick={() => {

            setOpen(false);
          }} />
            </div>
      </Modal>
*/
export default Modal;
