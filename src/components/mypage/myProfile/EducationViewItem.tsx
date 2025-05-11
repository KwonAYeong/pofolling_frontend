interface Education {
  schoolName: string;
  major: string;
  degree: string;
  admissionDate: string;
  graduationDate: string;
  status: string;
}

interface Props {
  educations: Education[];
}

const EducationViewItem = ({ educations }: Props) => {
  if (!educations || educations.length === 0) {
    return (
      <div className="border rounded p-4 text-sm text-gray-500">입력된 학력 정보가 없습니다.</div>
    );
  }

  return (
    <div className="space-y-4">
      {educations.map((edu, i) => (
        <div key={i} className="flex items-start gap-4 border rounded p-4 shadow-sm">
          <div className="w-12 h-12 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="text-sm font-semibold">{edu.schoolName || '학교명 없음'}</div>
            <div className="text-sm text-gray-600">
              {edu.major || '전공 없음'} · {edu.degree || '학위 없음'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {(edu.admissionDate || '----.--')} ~ {(edu.graduationDate || '----.--')} · {edu.status || '상태 없음'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationViewItem;
