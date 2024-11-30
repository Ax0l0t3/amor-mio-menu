import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let thisOtherVar = document.createElement("div");
  thisOtherVar.innerHTML = "<p>This peragraph</p><p><br />This other peragraph</p>";
  document.body.appendChild(thisOtherVar);
  let thisString = thisOtherVar.innerText;
  document.body.removeChild(thisOtherVar);
  console.log(thisString);

  return (
    <>
    <div>
      <p>This peragraph</p><p><br />This other peragraph</p>
    </div>
    </>
  )
}

export default App
