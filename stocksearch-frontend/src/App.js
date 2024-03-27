import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Header from "./components/Header.js";
import HomePage from "./pages/HomePage.js";
import PortfolioPage from "./pages/PortfolioPage.js";
import WatchListPage from "./pages/WatchListPage.js";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" Component={HomePage}></Route>
				<Route path="/search/:keyword" Component={HomePage}></Route>
				<Route path="/portfolio" Component={PortfolioPage}></Route>
				<Route path="/watchlist" Component={WatchListPage}></Route>
			</Routes>
		</Router>
	);
};

export default App;
