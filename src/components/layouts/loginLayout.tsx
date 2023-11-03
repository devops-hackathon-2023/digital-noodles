import React, {ReactElement} from "react";

interface LoginLayoutProps {
  children: ReactElement
}

const LoginLayout: React.FC<LoginLayoutProps> = ({children}) => {
  return (
    <div
      className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {children}
    </div>
  )
}

export default LoginLayout