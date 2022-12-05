
import './App.css';
import {client, authData} from './utils/config'


function App() {
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
