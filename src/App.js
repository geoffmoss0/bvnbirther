import './App.css';

import Info from './Info/Info';
import bunny from './resources/bunny.json';
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

  let name_vals = [];

  for (let i = 0; i < 5; i++) {
      name_vals.push(Math.floor(Math.random() * 20));
  }

  const name = bunny.names.first[name_vals[0]] + " " + bunny.names.last[name_vals[1]] + " of the " + 
  bunny.names.of_the[name_vals[2]] + " who " + bunny.names.who[name_vals[3]] + " in the " + bunny.names.in_the[name_vals[4]];



  
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
      <Info class_num={class_num} species_num={species_num} name={name}/>
    </div>
  );
}

export default App;
