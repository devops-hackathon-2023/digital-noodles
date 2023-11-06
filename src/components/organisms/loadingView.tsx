import Image from "next/image";
import s_logo from "@/assets/icons/s.png";
import x_icon from "@/assets/icons/x.svg";
import dn_logo from "@/assets/icons/digitalnoodles.png";
import React from "react";

const LoadingView = () => {
  const inlineStylS = {
    animation: 'moveLeftToOrigin 0.5s ease',
  };

  const inlineStylDn = {
    animation: 'moveRightToOrigin 0.5s ease',
  };

  const renderDelay = {
    animation: 'renderDelay 1.2s forward'
  }

  return (
    <div className={"flex justify-center items-end gap-3"} style={renderDelay}>
      <Image src={s_logo} alt={"s"} width={40} style={inlineStylS}/>
      <Image src={x_icon} alt={"s"} width={25}/>
      <Image src={dn_logo} alt={"s"} width={250} style={inlineStylDn}/>
    </div>
  )
}

export default LoadingView