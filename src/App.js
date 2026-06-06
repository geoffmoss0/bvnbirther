import './App.css';

import Class from './class/class'
import Hp from './hp/hp';
import LuckyFoot from './lucky_foot/lucky_foot';
import Name from './name/name';

function App() {

  const class_num = Math.floor(Math.random() * 6);

  const teststyle = {
    display: "inline-flex"
  }


  return (
    <div>
      <span> B V N B I R T H E R</span>
      <div>A character generator for</div>
      {/* Add detailed kill buttons here */}
      <img src={require('./images/bunny_borg_logo_no_bg.png')} alt="Bunny Borg logo"></img>
      <hr class="division-rule"/>
      <Name/>
      <div id="sub-stat-container">
      <Class class_num={class_num}/>
      <Hp class_num={class_num}/>
      <LuckyFoot class_num={class_num}/>
      </div>
      <hr class="division-rule"/>
      {/* Class Info (do this all individually) */}
      
      
    </div>
  );
}

export default App;
