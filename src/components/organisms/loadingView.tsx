import Image from "next/image";
import x_icon from "@/assets/icons/x.svg";
import s_logo from "@/assets/icons/s.png";
import dn_logo from "@/assets/icons/digitalnoodles.png";
import s_logo_dark from "@/assets/icons/s_black.png";
import dn_logo_dark from "@/assets/icons/digitalnoodles_black.png";
import React from "react";
import {useTheme} from "next-themes";

const LoadingView = () => {
  const theme = useTheme()
  const inlineStylS = {
    animation: 'moveLeftToOrigin 0.5s ease',
  };

  const inlineStylDn = {
    animation: 'moveRightToOrigin 0.5s ease',
  };

  return (
    <div className={"flex justify-center items-end gap-3"}>
      <Image src={theme.theme === "dark" ? s_logo : s_logo_dark} alt={"s"} width={40} style={inlineStylS}/>
      <Image src={x_icon} alt={"s"} width={25}/>
      <Image src={theme.theme === "dark" ? dn_logo : dn_logo_dark} alt={"s"} width={250} style={inlineStylDn}/>
    </div>
  )
}

export default LoadingView