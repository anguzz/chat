
import './App.css';
/*========CONFIG.JS========*/
import Pocketbase from 'pocketbase';

const USERNAME = "santoyox714@gmail.com";
const PASSWORD = "devTest1234";
const url='http://127.0.0.1:8090';

const client = new Pocketbase(url);
const authData =  /*await*/ client.admins.authWithPassword(USERNAME, PASSWORD);
//adding await breaks react 
/*================*/

function App() {
  //need the authData to read with await word
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello, {authData.admin.email}</h1>
        
      </header>
    </div>
  );
}

export default App;
