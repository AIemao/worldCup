import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clsx (classnames condicionais) com tailwind-merge (resolve
 * conflitos de utilidades Tailwind, ex: "p-2 p-4" → "p-4").
 * Usado internamente por todos os componentes do shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
