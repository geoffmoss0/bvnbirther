import './App.css';

import Info from './Info/Info';
import bunny from './resources/bunny.json';
import { calculate_stats } from './Info/generators';
import diceParser from './utils/dice_parser';
import {useState} from 'react';

function App() {

  // console.log("App rendering!");

  // ====================================================
  // Initial setup (immutable, will re-render on page reload)

  let name_vals = [];

  for (let i = 0; i < 5; i++) {
      name_vals.push(Math.floor(Math.random() * 20));
  }

  let quest_vals = [];
  for (let i = 0; i < 4; i++) {
    quest_vals.push(Math.floor(Math.random() * 10));
  }

  const quest = "Seeking " + bunny.quests.seeking[quest_vals[0]] + " through the " + bunny.quests.through_the[quest_vals[1]] + 
  ", guaurded by " + bunny.quests.guarded_by[quest_vals[2]] + ", rumored to be " + bunny.quests.rumored_to_be[quest_vals[3]]

  const name = bunny.names.first[name_vals[0]] + " " + bunny.names.last[name_vals[1]] + " of the " + 
  bunny.names.of_the[name_vals[2]] + " who " + bunny.names.who[name_vals[3]] + " in the " + bunny.names.in_the[name_vals[4]];

  /*
   * Morsels structure:
   * {
   *  Number
   *  Dice roll
   *  Calculated amount
   *  Level
   * }
   * 
   * 
   * Display:
   * 
   * 2 (1D4) morsels of
   * Call Microplastics: 
   * "Reach out to all microplastics in a small area and pull 
   * them towards you, each creature affected tests TOU",
   * 
   * creatures take D4 damage blah blah blah
   */

  // // calculate initial morsels
  // if (bunny.classes[class_num].morsels1 !== "") {
  //   // add morsels 1

  //   let val1 = diceParser(bunny.classes[class_num].morsels1)
  //   setMorsels(morsels)
  // }


  return (
    <div>
      <span id="bvnbirther-title"><h2 className="title">B V N B I R T H E R</h2></span>
      <div id="bvnbirther-subtitle">A character generator for</div>
      {/* Add detailed kill buttons here */}
      <img src={require('./images/bunny_borg_logo_no_bg.png')} alt="Bunny Borg logo" id="logo"></img>
      <Info name={name} quest={quest}/>
    </div>
  );
}

export default App;
