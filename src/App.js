import './App.css';

import Info from './Info/Info';
import {useState} from 'react';

function App() {

  console.log("App rendering!");

  // ====================================================
  // Initial setup (immutable, will re-render on page reload)

  const class_num = Math.floor(Math.random() * 6);

  const species_num = Math.floor(Math.random() * 4);

  const teststyle = {
    display: "inline-flex"
  }

  
  /*
   * Weapons structure
   */
  

  const [level, setLevel] = useState(1);
  
  // calculate initial weapons
  const [weapons, setWeapons] = useState([])




  const [morsels, setMorsels] = useState([]);


  /*
   * Morsels structure:
   * {
   *  Name
   *  Dice roll
   *  Calculated amount
   *  Level
   * }
   */

  // // calculate initial morsels
  // if (bunny.classes[class_num].morsels1 !== "") {
  //   // add morsels 1

  //   let val1 = diceParser(bunny.classes[class_num].morsels1)
  //   setMorsels(morsels)
  // }


  return (
    <div>
      <span id="bvnbirther-title"> B V N B I R T H E R</span>
      <div id="bvnbirther-subtitle">A character generator for</div>
      {/* Add detailed kill buttons here */}
      <img src={require('./images/bunny_borg_logo_no_bg.png')} alt="Bunny Borg logo" id="logo"></img>
      <Info class_num={class_num} species_num={species_num}/>
    </div>
  );
}

export default App;
