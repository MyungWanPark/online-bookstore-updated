type Props = {
    title: string;
    inputClass: string;
    inputName: string;
    isTextArea?: boolean;
    value: string | number;
    setValue: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
};

export default function NewBookInput({
    title,
    inputClass,
    inputName,
    isTextArea = false,
    value,
    setValue,
}: Props) {
    return (
        <div className="flex items-center mt-3">
            <label htmlFor={inputName} className="block flex-[1] text-center">
                {title}
            </label>
            {isTextArea ? (
                <textarea
                    className={`${inputClass} flex-[12]`}
                    name={inputName}
                    required
                    value={value}
                    onChange={setValue}
                />
            ) : (
                <input
                    type="text"
                    className={`${inputClass} flex-[12]`}
                    name={inputName}
                    required
                    value={value}
                    onChange={setValue}
                />
            )}
        </div>
    );
}
