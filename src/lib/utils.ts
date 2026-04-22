import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function sanitizarTexto(texto: string): string{
    const ar_borrar = ["'",'"','/','\\\\','<','>',':'];
    return texto.replace(new RegExp(ar_borrar.join('|'), 'g'), '');
}