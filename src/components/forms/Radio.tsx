import React from 'react'

interface Props {
    id: string
    label: string
    helperText?: string
    value: number
    defaultChecked: boolean
    [x: string]: any
}

const CustomRadio = React.forwardRef<HTMLInputElement, Props>(
    ({ id, label, helperText, value, defaultChecked, ...rest }, ref) => {
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
                    defaultChecked={defaultChecked}
                    className="text-clr-link bg-clr-bg2 border-clr-border focus:ring-blue-500 focus:ring-2"
                    {...rest}
                />
            </>
        )
    }
)

export default CustomRadio
