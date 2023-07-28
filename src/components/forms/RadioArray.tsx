import React from 'react'
import FormError from './FormError'
import Radio from './Radio'

export interface RadioNode {
    label: string
    value: number
}

interface Props {
    id: string
    headerText?: string
    defaultValue: number
    radiosInfo: RadioNode[]
    error: string
    [x: string]: any
}

const RadioArray = React.forwardRef<HTMLInputElement, Props>(
    ({ id, headerText, radiosInfo, defaultValue, error, ...rest }, ref) => {
        return (
            <>
                <h2 className="text-fs-h2 text-center block pb-1">{headerText}</h2>
                <div className="flex flex-row pb-4">
                    {radiosInfo.map(({ label, value }) => {
                        return (
                            <div key={value} className="text-center flex-1 px-1">
                                <Radio
                                    defaultChecked={defaultValue === value}
                                    id={id}
                                    label={label}
                                    value={value}
                                    ref={ref}
                                    {...rest}
                                />
                            </div>
                        )
                    })}
                </div>
                <FormError error={error} />
            </>
        )
    }
)

export default RadioArray
