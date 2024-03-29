import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import classes from "./SearchBox.module.css";

const SearchBox = ({ ticker, setTicker }) => {
	let navigate = useNavigate();

	const [currTickerValue, setCurrTickerValue] = useState("");
	const [autocompleteList, setAutocompleteList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = async (e) => {
		try {
			if (e.target.value.trim() === "") {
				// Alert user
				setAutocompleteList([]);
				setTicker("");
				setCurrTickerValue("");
				return;
			}

			console.log(e.target.value);
			setIsLoading(true);

			// Updating the current ticker value
			setCurrTickerValue(e.target.value);
			const response = await axios.get(
				`/search/autocomplete/${e.target.value}`
			);
			const data = await response.data;
			console.log(data);
			let suggestions = data.result.map((item) => item["symbol"]);
			console.log(suggestions);
			setAutocompleteList(suggestions);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleSearch = () => {
		// console.log(string, results);
		setTicker(currTickerValue);
		setAutocompleteList([]);
		navigate("/search/" + currTickerValue);
	};

	const handleSelect = (e) => {
		console.log(e.target.textContent);
		setTicker(e.target.textContent);
		setAutocompleteList([]);
		navigate("/search/" + e.target.textContent);
	};

	return (
		<div className={classes.container}>
			<div className={classes.searchbox}>
				<input
					type="text"
					onChange={(e) => handleChange(e)}
					value={currTickerValue}
					placeholder="Enter stock ticker symbol"
				/>
				<i
					className={`bi bi-search ${classes.icon} input-group-text`}
					onClick={() => handleSearch()}
				></i>
				<i
					className={`bi bi-x ${classes.icon} input-group-text`}
					onClick={() => {
						setCurrTickerValue("");
						setAutocompleteList([]);
						setTicker("");
					}}
				></i>
			</div>
			{isLoading && <h1>Loading</h1>}

			{autocompleteList && autocompleteList.length > 0 && (
				<div className={classes.autocompleteContainer}>
					{autocompleteList.map((item) => (
						<p
							key={item}
							onClick={(e) => handleSelect(e)}
							className={classes.autocompleteItem}
						>
							{item}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBox;
