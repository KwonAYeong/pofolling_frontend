import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pagesPerBlock = 10;
    const currentBlock = Math.floor((currentPage - 1) / pagesPerBlock);
    const startPage = currentBlock * pagesPerBlock + 1;
    const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  
    const handlePrev = () => {
      if (startPage > 1) {
        onPageChange(startPage - 1);
      }
    };
  
    const handleNext = () => {
      if (endPage < totalPages) {
        onPageChange(endPage + 1);
      }
    };
  
    return (
      <div className="flex justify-center items-center gap-2 mt-8 text-sm">
        {/* 이전 */}
        {startPage > 1 && (
          <button
            onClick={handlePrev}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            ◀ 이전
          </button>
        )}
  
        {/* 페이지 번호 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? 'font-bold text-blue-500 underline'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
  
        {/* 다음 */}
        {endPage < totalPages && (
          <button
            onClick={handleNext}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            다음 ▶
          </button>
        )}
      </div>
    );
  };
  
  export default Pagination;
  