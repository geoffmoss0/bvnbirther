import './App.css';

import Abilities from './abilities/abilities';
import Class from './class/class'
import Hp from './hp/hp';
import LuckyFoot from './lucky_foot/lucky_foot';
import Name from './name/name';
import bunny from './resources/bunny.json';
import diceParser from './utils/dice_parser';
import {useState} from 'react';

function App() {

  let class_num = Math.floor(Math.random() * 6);

  class_num = 5;

  const species_num = Math.floor(Math.random() * 4);

  let stats = calculate_stats(class_num, bunny);

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

  // calculate initial morsels
  if (bunny.classes[class_num].morsels1 !== "") {
    // add morsels 1

    let val1 = diceParser(bunny.classes[class_num].morsels1)
    setMorsels(morsels)
  }


  return (
    <div>
      <span id="bvnbirther-title"> B V N B I R T H E R</span>
      <div id="bvnbirther-subtitle">A character generator for</div>
      {/* Add detailed kill buttons here */}
      <img src={require('./images/bunny_borg_logo_no_bg.png')} alt="Bunny Borg logo" id="logo"></img>
      <hr class="division-rule"/>
      <Name/>
      <div id="sub-stat-container">
      <Class class_num={class_num}/>
      <Hp class_num={class_num}/>
      <LuckyFoot class_num={class_num}/>
      </div>
      <hr class="division-rule"/>
      {/* Class Info (do this all individually) */}
      <Abilities class_num={class_num} stats={stats} species_num={species_num}/>
    </div>
  );
}

function calculate_stats(class_num, bunny) {

  return {
      agi: diceParser(bunny.classes[class_num].stats.agility),
      pre: diceParser(bunny.classes[class_num].stats.presence),
      str: diceParser(bunny.classes[class_num].stats.strength),
      tou: diceParser(bunny.classes[class_num].stats.toughness),
      wis: diceParser(bunny.classes[class_num].stats.wisdom)
  }
}

export default App;
