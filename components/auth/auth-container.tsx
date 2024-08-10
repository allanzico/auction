import React, { ReactNode } from 'react'
import AuthHeader from './auth-header';


type Props = {
    children?: ReactNode;
  };
const Authcontainer = ({children}: Props) => {
  return (
    <div>
        <AuthHeader />
        <div className="container relative flex grow flex-col px-4 overflow-auto">
        {children}
    </div>
    </div>
    
  )
}

export default Authcontainer