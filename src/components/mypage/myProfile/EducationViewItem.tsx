import { Education } from 'types/profile';
import { GraduationCap } from 'lucide-react';

interface Props {
  educations: Education[];
}

const EducationViewItem = ({ educations }: Props) => {
  if (!educations || educations.length === 0) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">
        입력된 학력 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {educations.map((edu, i) => (
        <div key={i} className="flex items-center gap-4 border rounded p-4 shadow-sm">
          {/* 아이콘 박스 */}
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
            <GraduationCap className="w-6 h-6 text-gray-600" />
          </div>

          {/* 텍스트 박스 */}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
              {edu.schoolName?.trim() || '학교명 없음'}
            </span>
            <span className="text-sm text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap">
              {edu.major || '전공 없음'} · {edu.degree || '학위 없음'}
            </span>
            <span className="text-xs text-gray-500 mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {edu.admissionDate || '----.--'} ~ {edu.graduationDate || '----.--'} · {edu.educationStatus || '상태 없음'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationViewItem;
