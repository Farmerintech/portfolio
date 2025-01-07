import React from "react"

interface buttonPropx{
    name:string;
    action:()=>void;
    addStyle:string
}


export const Button:React.FC<buttonPropx> = ({name, action, addStyle}) =>{
   
    return(
        <button onClick={action} className={`p-2 outline-none hover:border-0 border-none rounded ${addStyle}`}>
            {name}
        </button>
    )
}