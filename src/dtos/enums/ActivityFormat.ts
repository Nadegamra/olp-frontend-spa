import { RadioNode } from '../../components/forms/RadioArray'

export enum ActivityFormat {
    Online = 0,
    Live,
    Mixed
}

export const ActivityFormatRadioInfo: RadioNode[] = [
    { label: 'Online', value: 0 },
    { label: 'Live', value: 1 },
    { label: 'Mixed', value: 2 }
]
