import { createContext, useState } from 'react'

interface ChildrenType {
    children: React.ReactNode
}

interface RegistrationValueType {
    weight: number,
    height: number,
    age: number,
    sex: string,
    email: string,
    password: string
}

interface steps {
    details: boolean,
    register: boolean
}

interface Registration{
    regis: RegistrationValueType,
    setRegis: React.Dispatch<React.SetStateAction<RegistrationValueType | null>>,
    RegistrationPages: Object,
    setRegistrationPages: React.Dispatch<React.SetStateAction<steps | null>>
}

export const RegisterContext = createContext<Registration | null>(null);

export const RegisterContextProvider: React.FC<ChildrenType> = ({ children }) => {
    
    const [regis, setRegis] = useState<RegistrationValueType | null>({
        weight: null,
        height: null,
        age: null,
        sex: '',
        email: '',
        password: ''
    })

    const [RegistrationPages, setRegistrationPages] = useState({
        'details': false,
        'register': false
    })

    return (
        <RegisterContext.Provider value={ {regis, setRegis, RegistrationPages, setRegistrationPages} }>
            {children}
        </RegisterContext.Provider>
    )
}