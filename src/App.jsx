import "./App.css";
import Hero from "./components/custom/Hero";

function App() {
  console.log("ENV KEY:", import.meta.env.VITE_GOOGLE_PLACE_API_KEY);

  return (
    <>
      {/* Hero Section */}
      <Hero />
    </>
  );
}

export default App;
