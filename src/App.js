import './App.css';

import Info from './Info/Info';
import Style from './style/style'
import bunny from './resources/bunny.json';

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
  ", guarded by " + bunny.quests.guarded_by[quest_vals[2]] + ", rumored to be " + bunny.quests.rumored_to_be[quest_vals[3]] + '.';

  const name = bunny.names.first[name_vals[0]] + " " + bunny.names.last[name_vals[1]] + " of the " + 
  bunny.names.of_the[name_vals[2]] + " who " + bunny.names.who[name_vals[3]] + " in the " + bunny.names.in_the[name_vals[4]];

  // randomize between the 6 page styles
  const styleId = Math.floor(Math.random() * 6);

  const logos = [
    "bunny_borg_logo_no_bg.png",
    "bunny_borg_logo_factory.png",
    "bunny_borg_logo_seedwhisker.png",
    "bunny_borg_logo_soulless.png",
    "bunny_borg_logo_shaman.png",
    "bunny_borg_logo_hibernation.png"
  ]

  function githubIssue() {
    window.open('https://github.com/geoffmoss0/bvnbirther/issues/new/choose', '_blank');
  }

  return (
    <div id="appcontainer">
      <Style pageStyle={styleId}/>
      <span id="bvnbirther-title"><h1 className="title">B V N B I R T H E R</h1></span>
      <div id="bvnbirther-subtitle">A character generator for</div>
      <img src={require(`./images/${logos[styleId]}`)} alt="Bunny Borg logo" id="logo"></img>
      <Info name={name} quest={quest}/>

      <div id="footer">
        <div id="version"><i>Bvnbirther v1 .03 by AutumnOceans</i></div>
        <button id="report-issue-button" onClick={githubIssue}><div id="report-issue-text">Report an Issue</div></button>
      </div>
    </div>
  );
}

export default App;
