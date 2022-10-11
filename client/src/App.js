import HomePage from "./Pages/HomePage";
import './Pages/style.css'
import UserContextProvider from "./Context/userContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <HomePage />
      </UserContextProvider>
    </div>
  );
}

export default App;
