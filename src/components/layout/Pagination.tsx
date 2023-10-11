interface Props {
    from: number
    to: number
    of: number
    units: string
    setFrom: React.Dispatch<React.SetStateAction<number>>
}

function Pagination({ from, to, of, units, setFrom }: Props) {
    return (
        <div className="flex flex-col items-center select-none">
            <span className="text-sm text-clr-text1">
                Showing <span className="font-semibold text-clr-text2">{from + 1}</span> to{' '}
                <span className="font-semibold text-clr-text2">{Math.min(to, of)}</span> of{' '}
                <span className="font-semibold text-clr-text2">{of}</span> {units}
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setFrom(from - 10)}
                    disabled={from <= 0}>
                    <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                    </svg>
                    Prev
                </button>
                <button
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setFrom(from + 10)}
                    disabled={to >= of}>
                    Next
                    <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination
