import React from 'react'

interface Props {
    id: string
    label: string
    helperText?: string
    value: number
    [x: string]: any
}

const CustomRadio = React.forwardRef<HTMLInputElement, Props>(
    ({ id, label, helperText, value, ...rest }, ref) => {
        return (
            <div className="flex">
                <div className="flex items-center h-5">
                    <input
                        id={id}
                        aria-describedby="helper-radio-text"
                        type="radio"
                        ref={ref}
                        value={value}
                        className="w-4 h-4 text-clr-link bg-clr-bg2 border-clr-border focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                        {...rest}
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor={id} className="font-medium text-t-primary">
                        {label}
                    </label>
                    <p id="helper-radio-text" className="text-xs font-normal text-t-secondary">
                        {helperText}
                    </p>
                </div>
            </div>
        )
    }
)

export default CustomRadio
