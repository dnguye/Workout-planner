interface NumberInputProps {
  value: number | null;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function NumberInput({ value, onChange, min, max, step = 1, placeholder, label, className = '' }: NumberInputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-xs text-text-muted mb-1">{label}</label>}
      <input
        type="number"
        value={value ?? ''}
        onChange={e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange(v);
        }}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="bg-bg-primary border border-border rounded-lg px-3 py-2 text-center text-text-primary w-full focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
