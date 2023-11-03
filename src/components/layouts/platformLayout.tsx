import Header from "@/components/molecules/header";
import React, {ReactElement} from "react";

interface PlatformLayoutProps {
  children: ReactElement
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({children}) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header/>
      <div className={"container mt-5 mb-5"}>
        {children}
      </div>
    </div>
  )
}

export default PlatformLayout