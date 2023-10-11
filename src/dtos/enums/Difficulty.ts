import { RadioNode } from '../../components/forms/RadioArray'

export enum Difficulty {
    Beginner,
    Intermediate,
    Advanced,
    Expert,
    Master
}

export const DifficultyRadioInfo: RadioNode[] = [
    { label: 'Beginner', value: 0 },
    { label: 'Intermediate', value: 1 },
    { label: 'Advanced', value: 2 },
    { label: 'Expert', value: 3 },
    { label: 'Master', value: 4 }
]
