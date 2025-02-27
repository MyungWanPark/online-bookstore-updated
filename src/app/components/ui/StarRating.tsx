type Props = {
    rate: number;
};

export default function StarRating({ rate }: Props) {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => {
                return (
                    <span
                        key={i}
                        className={`flex items-center ${
                            (i + 1) * 2 <= rate
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }`}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}
