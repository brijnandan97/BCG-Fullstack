import "./App.css";
import { AppRouter } from "./router";
import { Header } from "./Pages/Header/header";
import "antd/dist/reset.css";
import { useContext } from "react";
import { ConnectionContext } from "./utils/contexts/connection-context-provider/connection-context";

function App() {
  const { contextHolder } = useContext(ConnectionContext);
  return (
    <div className="App">
      {contextHolder}
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
