interface Props {
    phrase: string
    setPhrase: React.Dispatch<React.SetStateAction<string>>
    onClick: () => void
}

function SearchBar({ phrase, setPhrase, onClick }: Props) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-clr-text2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-clr-text1 border border-clr-border rounded-lg bg-clr-bg1 focus:ring-clr-bg-extra focus:border-clr-bg-extra"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Search Mockups, Logos..."
                required
            />
            <button
                type="submit"
                onClick={onClick}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
            </button>
        </div>
    )
}

export default SearchBar
