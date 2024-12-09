import Image from "next/image";
 type LogoProps = {
    width?: number;
    height?: number;
    className?: string;
  }


export const Logo = ({ height , width , className }: LogoProps) => {
  return (
    <Image
      height={height}
      width={width}
      alt="logo"
      src="/assets/logo.svg"
      className={className}
    />
  )
}
export const LogoDark = ({ height , width , className }: LogoProps) => {
  return (
    <Image
      height={height}
      width={width}
      alt="logo"
      src="/assets/LogoDark.svg"
      className={className}
    />
  )
}