interface ProfileFieldItemProps<T extends Record<string, string>> {
    index: number;
    value: T;
    fields: [keyof T, string][];
    onChange: (updated: T) => void;
    onRemove: () => void;
    canRemove: boolean;
  }
  
  const ProfileFieldItem = <T extends Record<string, string>>({
    value,
    fields,
    onChange,
    onRemove,
    canRemove,
  }: ProfileFieldItemProps<T>) => {
    return (
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-1 grid grid-cols-2 gap-3">
          {fields.map(([key, label]) => (
            <input
              key={String(key)}
              className="p-2 border rounded"
              placeholder={label}
              value={value[key] || ''}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
          ))}
        </div>
        {canRemove && (
          <button onClick={onRemove} className="text-red-500 text-sm mt-2">❌</button>
        )}
      </div>
    );
  };
  
  export default ProfileFieldItem;
  