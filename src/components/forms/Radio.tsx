import React from 'react'
import FormError from './FormError'

interface Props {
    id: string
    label: string
    helperText?: string
    value: number
    error: string
    [x: string]: any
}

const CustomRadio = React.forwardRef<HTMLInputElement, Props>(
    ({ id, label, helperText, value, error, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={id} className="block mb-1 font-medium">
                    {label}
                    <p id="helper-radio-text" className="text-xs font-normal text-t-secondary">
                        {helperText}
                    </p>
                </label>
                <input
                    id={id}
                    aria-describedby="helper-radio-text"
                    type="radio"
                    ref={ref}
                    value={value}
                    className="text-clr-link bg-clr-bg2 border-clr-border focus:ring-blue-500 focus:ring-2"
                    {...rest}
                />
                <FormError error={error} />
            </>
        )
    }
)

export default CustomRadio
