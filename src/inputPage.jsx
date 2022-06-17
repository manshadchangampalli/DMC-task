import './App.css';
import React, { useState } from 'react'

const InputPage = ({setNameBox}) => {
    const [name,setName] = useState("")
    const nameHandler = () => {
        if(name.length>3){
            localStorage.setItem("name",name)
            setNameBox(false)
        }
    }
    return (
        <div className='inputPage'>
            <div className="inputBox">
                <input onChange={(e)=>setName(e.target.value)} placeholder='name' type="text" />
                <button onClick={nameHandler} >Save</button>
            </div>
        </div>
    )
}

export default InputPage