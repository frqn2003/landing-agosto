import Clarity from '@microsoft/clarity'

export function initClarity(projectId: string) {
    try {
        Clarity.init(projectId)
    } catch (error) {
        console.error('Error inicializando Clarity:', error)
    }
}

export function claritySetTag(key: string, value: string) {
    try {
        if (typeof window !== 'undefined' && typeof (window as any).clarity === 'function') {
            Clarity.setTag(key, value)
        }
    } catch (error) {
        console.error('Error enviando tag a Clarity:', error)
    }
}

export function clarityEvent(eventName: string) {
    try {
        if (typeof window !== 'undefined' && typeof (window as any).clarity === 'function') {
            Clarity.event(eventName)
        }
    } catch (error) {
        console.error('Error enviando evento a Clarity:', error)
    }
}

export function clarityUpgrade(reason: string) {
    try {
        if (typeof window !== 'undefined' && typeof (window as any).clarity === 'function') {
            Clarity.upgrade(reason)
        }
    } catch (error) {
        console.error('Error enviando upgrade a Clarity:', error)
    }
}
