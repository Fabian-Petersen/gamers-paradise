"use client";
// $ This component is used to render icons from react-icons
// $ It is used in app/components/SinglePhoto.tsx
// $ The component takes in the icon as a function and invokes it
// $ The component also takes in a className and handleClick as props if required by the icon
// $ The className must be styled in the global.css file in the app folder to be applied

import React, { ReactNode } from "react";
import { IconContext } from "react-icons";

type IconProps = {
  icon: () => ReactNode; // $ Adjusted the type to expect a function returning ReactNode
  handleClick?: () => void; //$ optional
  className?: string; //$ optional
};

const Icon = ({ icon, handleClick, className }: IconProps) => {
  return (
    <IconContext.Provider value={{ className: `${className}` }}>
      <div className="" onClick={handleClick}>
        {icon()} {/*// $ Invoke the function here */}
      </div>
    </IconContext.Provider>
  );
};

export default Icon;
