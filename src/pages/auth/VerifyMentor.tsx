import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyMentor() {
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [portfolioText, setPortfolioText] = useState('');
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !proofFile || !portfolioText || !portfolioFile) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 여기에 인증 업로드 처리 로직 넣기 (추후)

    alert('멘토 인증이 완료되었습니다!');
    navigate('/'); // ✅ 인증 완료 후 메인페이지로 이동
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold mb-8">멘토 인증페이지</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <label>
          회사
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="회사명 (ex. 현대)"
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          재직증명서
          <input
            type="file"
            accept=".jpg,.png,.pdf"
            onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
            className="w-full border rounded px-3 py-2"
          />
        </label>

        <label>
          포트폴리오
          <textarea
            value={portfolioText}
            onChange={(e) => setPortfolioText(e.target.value)}
            placeholder="텍스트 입력"
            className="w-full border rounded px-3 py-2 h-28 resize-none"
          />
        </label>

        <input
          type="file"
          accept=".jpg,.png,.pdf"
          onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="mt-2 border px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          인증하기
        </button>
      </form>
    </div>
  );
}
