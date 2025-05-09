type StatusType = 'REGISTERED' | 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED';

const statusMap: Record<StatusType, { label: string; dotColor: string }> = {
  REGISTERED: { label: '등록됨', dotColor: 'bg-gray-400' },
  REQUESTED: { label: '요청대기', dotColor: 'bg-orange-300' },
  IN_PROGRESS: { label: '첨삭중', dotColor: 'bg-blue-300' },
  COMPLETED: { label: '첨삭완료', dotColor: 'bg-green-400' },
};

const StatusBadge = ({ status }: { status: StatusType }) => {
  const { label, dotColor } = statusMap[status];

  return (
    <div className="flex items-center gap-1 min-w-[100px]">
      <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
};

export default StatusBadge;
