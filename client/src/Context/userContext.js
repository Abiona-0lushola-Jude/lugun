import { createContext, useState } from 'react'

export const userContext = createContext()

export default function UserContextProvider({children}) {

    const [user, setUser] = useState({
      username: localStorage.getItem("userLugun") || null,
      school: localStorage.getItem("userLugunSch") || null,
    })

  return (
    <userContext.Provider value={[user, setUser]}>
        {children}
    </userContext.Provider>
  )
}
