import logo from './logo.png';
import './App.css';

function App() {
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type={"submit"} style={{ backgroundColor: "#2c5237" }} />
        </form>
      </div>
    </>
  );
}

export default App;
