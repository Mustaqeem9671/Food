import React, { useState } from 'react'

const LoginInput = ({placeHolder, icons, inputState, inputStateFunc, type, isSignUp}) => {
 
    const [isFocus, setisFocus] = useState(false);
    return (
        <div
        className={`flex items-center justify-center gap-4 bg-card backdrop-blur-md rounded-md px-4 w-full py-2 ${
          isFocus ? "shadow-md shadow-red-400" : "shadow-non"
        }`}
      >
      
        {icons}
        <input type={type} placeholder={placeHolder} className="w-full h-full bg-transparent text-lg font-semibold border-none outline-none" 
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
        />
    </div>
  );
};

export default LoginInput;