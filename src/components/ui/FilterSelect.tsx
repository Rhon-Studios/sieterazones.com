type FilterProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};

export function FilterSelect({ label, value, onChange, options }: FilterProps) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6A4A8A] focus:border-transparent transition-all text-gray-800 font-medium"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}