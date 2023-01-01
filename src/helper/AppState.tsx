import { createContext, useState } from 'react'

interface ChildrenType {
    children: React.ReactNode
}

interface AppConntext {
    dailyCal: number,
    calConsumed: number,
    dailyWater: number,
    waterConsumed: number
}

interface AppProviderContext{
    dailyCalInit: AppConntext,
    setDailyCalInit: React.Dispatch<React.SetStateAction<AppConntext | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppProviderContext | null>(null);

export const AppContextProvider: React.FC<ChildrenType> = ({ children }) => {
    
    const [dailyCalInit, setDailyCalInit] = useState<AppConntext | null>({
        dailyCal: 0,
        calConsumed: 0,
        dailyWater: 10,
        waterConsumed: 0
    })

    const [isLoading, setIsLoading] = useState(false)

    return (
        <AppContext.Provider value={ {dailyCalInit, setDailyCalInit, isLoading, setIsLoading} }>
            {children}
        </AppContext.Provider>
    )
}