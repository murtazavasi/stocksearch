import axios from "axios";

const getAutocompleteData = async (req, res) => {
	const ticker_symbol = req.params.symbol;
	const finnhub_api_key = process.env.FINNHUB_API_KEY;
	const finnhub_base_url = process.env.FINNHUB_BASE_URL;

	const finnhub_url = `${finnhub_base_url}/search?q=${ticker_symbol}&token=${finnhub_api_key}`;

	const response = await axios.get(finnhub_url);
	res.json(response.data);
};

export { getAutocompleteData };
