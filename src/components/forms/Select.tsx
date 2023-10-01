import React from 'react'
import FormError from './FormError'
export class SelectInfo {
    name: string
    id: number

    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}

interface Props {
    id: string
    headerText?: string
    selectInfo: SelectInfo[]
    error: string
    [x: string]: any
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
    ({ id, headerText, selectInfo, error, ...rest }, ref) => {
        return (
            <>
                <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 text-clr-text1">
                    {headerText}
                </label>
                <select
                    id="countries"
                    className="bg-clr-bg1 border border-clr-border text-clr-text1 text-sm rounded-lg focus:ring-clr-bg-extra focus:border-clr-bg-extra block w-full p-2.5"
                    ref={ref}
                    {...rest}>
                    {selectInfo.map((item) => {
                        return (
                            <option
                                key={item.id}
                                onSelect={() =>
                                    console.log(`Selected ${item.name} with id ${item.id}`)
                                }
                                value={item.id}>
                                {item.name}
                            </option>
                        )
                    })}
                </select>
                <FormError error={error} />
            </>
        )
    }
)

export default Select
