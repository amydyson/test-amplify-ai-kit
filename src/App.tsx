import { useState } from "react";
import { ChatDrawer } from "./components/ChatDrawer";
import "./components/ChatDrawer.css";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main>
      <h1>Blood Pressure Placeholder</h1>
      <ChatDrawer isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </main>
  );
}

export default App;
