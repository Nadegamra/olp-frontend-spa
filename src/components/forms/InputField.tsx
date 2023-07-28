import React from 'react'
import FormError from './FormError'

interface Props {
    text: string
    label: string
    placeholder: string
    name?: string
    error: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    [x: string]: any
}

const InputField = React.forwardRef<HTMLInputElement, Props>(
    ({ text, label, placeholder, error, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={label} className="block mb-2 font-medium">
                    {text}
                </label>
                <input
                    id={label}
                    className="bg-clr-bg1 border text-clr-text1 border-clr-border rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-full p-2.5"
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}></input>
                <FormError error={error} />
            </>
        )
    }
)

export default InputField
