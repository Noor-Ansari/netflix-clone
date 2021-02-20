import "./App.css";
import Banner from "./components/Banner";
import Row from "./components/Row";
import request from "./request";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <Row title="NETFLIX ORIGINAL" fetchUrl={request.fetchNetflixOriginals} isLarge />
      <Row title="TOP RATED" fetchUrl={request.fetchTopRated} />
      <Row title="TRENDING" fetchUrl={request.fetchTrending} />
      <Row title="HORROR" fetchUrl={request.fetchHorrorMovies} />
      <Row title="ACTION" fetchUrl={request.fetchActionMovies} />
      <Row title="ROMANCE" fetchUrl={request.fetchRomanceMovies} />
      <Row title="COMEDY" fetchUrl={request.fetchComedyMovies} />
      <Row title="DOCUMENTARIES" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
}

export default App;
