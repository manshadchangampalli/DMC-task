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
    const { clientX, clientY } = e;
    database.ref(localStorage.getItem("name")).set({
      name : localStorage.getItem("name"),
      pos:{ left: clientX, top: clientY }
    }).catch(alert);
  };
  console.log(fireData);
  return (
    <div className="App">
      {nameBox && <InputPage setNameBox={setNameBox} />}
      <div onClick={userClicked} className="box">
        { fireData.map((data,i)=>( 
          <div key={i} className="userDot" style={{top:`${data.pos.top - 100}px`,left:`${data.pos.left - 100}px`}} >
            <p >{data.name}</p>
            <div className="dot"></div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
