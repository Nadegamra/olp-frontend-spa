interface Props {
    text: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    color?: 'primary' | 'error'
    [x: string]: any
}

function Button({ text, onClick, type = 'button', color = 'primary', ...rest }: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                color === 'primary'
                    ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    : 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            }
            {...rest}>
            {text}
        </button>
    )
}

export default Button