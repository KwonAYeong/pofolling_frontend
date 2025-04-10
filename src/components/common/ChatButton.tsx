
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/chat/1')} 
      className="fixed bottom-6 right-6 z-50 p-4 bg-white text-black rounded-full shadow-lg hover:bg-mentee transition"
    >
      <MessageCircle size={24} />
    </button>
  );
};
// 사용예시 <ChatButton/>
export default ChatButton;
