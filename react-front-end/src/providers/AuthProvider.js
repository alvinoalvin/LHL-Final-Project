import { createContext } from 'react';

export default function AuthProvider(props) {
  const userData = {
    id: 1,
    first_name: 'Donny',
    last_name: 'Li',
    position: 'Team Lead',
    team_id: 1,
    email: 'donny@donny@live.com'
  }

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  )
}

export const authContext = createContext();