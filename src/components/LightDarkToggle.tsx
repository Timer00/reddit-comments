interface ButtonModeSwitchProps {
  className?: string;
  switchMode: () => void;
}

export const LightDarkToggle = ({ className, switchMode }: ButtonModeSwitchProps) => {

  return (
    <button onClick={switchMode} className={className}>
      <div className="ease-in duration-1000 relative inline-block">
        <div className={`ease-in duration-1000 absolute w-[5vw] sm:w-[2vw] h-[10vw] sm:h-[5vw] border-2 border-primary rounded-full`}></div>
        <div className={`ease-in duration-1000 absolute w-[5vw] sm:w-[2vw] h-[10vw] sm:h-[5vw] bg-primary rounded-full left-[8vw] sm:left-[3vw]`}></div>
      </div>
    </button>
  );
};
