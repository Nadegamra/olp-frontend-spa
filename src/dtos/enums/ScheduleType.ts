import { RadioNode } from '../../components/forms/RadioArray'

export enum ScheduleType {
    Fixed,
    Flexible
}

export const ScheduleRadioInfo: RadioNode[] = [
    { label: 'Fixed', value: 0 },
    { label: 'Flexible', value: 1 }
]
