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

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
    ({ text, label, error, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={label} className="block mb-2 font-medium">
                    {text}
                </label>
                <input
                    id={label}
                    type="checkbox"
                    className="w-4 h-4 bg-clr-bg1 text-clr-bg-extra border-clr-border rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
                    ref={ref}
                    {...rest}></input>
                <FormError error={error} />
            </>
        )
    }
)

export default Checkbox
