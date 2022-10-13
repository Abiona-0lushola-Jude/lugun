import HomePage from "./Pages/HomePage";
import './Pages/style.css'
import UserContextProvider from "./Context/userContext";
import LugunContextProvider from "./Context/lugunContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <LugunContextProvider>
          <HomePage />
        </LugunContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
