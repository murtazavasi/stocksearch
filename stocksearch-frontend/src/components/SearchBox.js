import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const SearchBox = ({ ticker, setTicker }) => {
	let navigate = useNavigate();

	const [currTickerValue, setCurrTickerValue] = useState("");

	const handleChange = async (e) => {
		// const response = await axios.get(
		// 	`/search/autocomplete/${currTickerValue}`
		// );
		// const data = await response.data;
		// let suggestions = data.result.map((item) => item["symbol"]);
		// setSearchSuggestions(suggestions);
		setCurrTickerValue(e.target.value);
	};

	const handleSearch = () => {
		setTicker(currTickerValue);
		navigate("/search/" + currTickerValue);
	};

	return (
		<InputGroup className="my-3 w-50 mx-auto">
			<Form.Control
				type="text"
				placeholder="Enter stock ticker symbol"
				value={currTickerValue}
				onChange={(e) => handleChange(e)}
			/>
			<i
				className="bi bi-search icon input-group-text"
				onClick={() => handleSearch()}
			></i>
			<i
				className="bi bi-x icon input-group-text"
				onClick={() => setCurrTickerValue("")}
			></i>
		</InputGroup>
	);
};

export default SearchBox;
