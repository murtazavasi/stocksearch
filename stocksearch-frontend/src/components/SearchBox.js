import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Loader from "./utils/Loader";
import classes from "./SearchBox.module.css";

const SearchBox = ({
	ticker,
	setTicker,
	setAlertContent,
	setIsAlertVisible,
	setAlertVariant,
}) => {
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
				setIsAlertVisible(false);
				return;
			}

			setIsLoading(true);

			// Updating the current ticker value
			setCurrTickerValue(e.target.value);
			const response = await axios.get(
				`/search/autocomplete/${e.target.value}`
			);
			const data = await response.data;
			console.log(data);
			let suggestions = data.result
				.filter(
					(item) =>
						item["type"] === "Common Stock" && !item["symbol"].includes(".")
				)
				.map((item) => item["symbol"]);

			console.log(suggestions);

			if (suggestions.length === 0) {
				setIsAlertVisible(true);
				setAlertContent("No data found. Please enter a valid ticker");
				setAlertVariant("danger");
				console.log("first");
			} else {
				console.log("second");
				setIsAlertVisible(false);
			}

			setAutocompleteList(suggestions);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleSearch = () => {
		// console.log(string, results);
		setTicker(currTickerValue.toUpperCase());
		setAutocompleteList([]);
		navigate("/search/" + currTickerValue);
	};

	const handleSelect = (e) => {
		console.log(e.target.textContent);
		setTicker(e.target.textContent.toUpperCase());
		// setCurrTickerValue(e.target.textContent.toUpperCase());
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
						navigate("/");
					}}
				></i>
			</div>

			<div className={classes.autocompleteContainer}>
				{isLoading ? (
					<Loader />
				) : (
					autocompleteList.map((item) => (
						<p
							key={item}
							onClick={(e) => handleSelect(e)}
							className={classes.autocompleteItem}
						>
							{item}
						</p>
					))
				)}
			</div>
		</div>
	);
};

export default SearchBox;
