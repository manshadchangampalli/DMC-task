import { useEffect, useState } from "react";
import "./App.css";
import database from "./firebase";
import InputPage from "./inputPage";

function App() {
  const [nameBox, setNameBox] = useState(false);
  const [fireData,setFireData] = useState([])
  useEffect(() => {
    let arr = []
    if (localStorage.getItem("name")) {
      setNameBox(false);
    } else {
      setNameBox(true);
    }
    let ref = database.ref("/");
      ref.on("value", snapshot => {
      const data = snapshot.val()
      arr=[]
      for(let key in data){
        arr.push(data[key])
      }
      setFireData(arr)
    })
  }, []);
  const userClicked = (e) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const randomHeight = Math.floor(Math.random()*80)+20
    console.log(randomHeight);
    const { clientX, clientY } = e;
    database.ref(localStorage.getItem("name")).set({
      name : localStorage.getItem("name"),
      pos:{ left: clientX, top: clientY },
      color:randomColor,
      width:randomHeight
    }).catch(alert);
  };
  return (
    <div className="App">
      {nameBox && <InputPage setNameBox={setNameBox} />}
      <div onClick={userClicked} className="box">
        { fireData.map((data,i)=>( 
          <div key={i} className="userDot" style={{top:`${data.pos.top - 100}px`,left:`${data.pos.left - 100}px`}} >
            <p >{data.name}</p>
            <div style={{background:`#${data.color}`,width:`${data.width}px`,height:`${data.width}px`}} className="dot"></div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
