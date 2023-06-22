import React from 'react'

interface Props {
    text: string
    label: string
    placeholder: string
    type?: 'text' | 'email' | 'password'
    name?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    [x: string]: any
}

const FormField = React.forwardRef<HTMLInputElement, Props>(
    ({ text, label, placeholder, type, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={label} className="block mb-2 font-medium">
                    {text}
                </label>
                <input
                    type={type}
                    id={label}
                    className="bg-clr-bg3 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}></input>
            </>
        )
    }
)

export default FormField
