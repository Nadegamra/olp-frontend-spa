import React from 'react'

interface Props {
    text: string
    label: string
    placeholder: string
    name?: string
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
    [x: string]: any
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
    ({ text, label, placeholder, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={label} className="block mb-2 font-medium">
                    {text}
                </label>
                <textarea
                    id={label}
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:max-w-full sm:w-full p-2.5"
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}></textarea>
            </>
        )
    }
)

export default TextArea
