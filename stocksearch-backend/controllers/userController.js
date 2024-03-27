import { User } from "../models/userModel.js";

const getWatchlist = async (req, res) => {
	try {
		const name = "default";
		console.log(name);
		const user = await User.findOne({ name });

		if (user) {
			res.json({
				watchList: user.watchList,
			});
		} else {
			res.status(401);
			throw new Error("User does not exist");
		}
	} catch (e) {
		res.json({ message: e.message });
	}
};

const getDefaultUser = async (req, res) => {
	try {
		const name = "default";
		const user = await User.findOne({ name });

		if (user) {
			res.json(user);
		} else {
			res.status(401);
			throw new Error("User does not exist");
		}
	} catch (e) {
		res.json({ message: e.message });
	}
};

const addItemToWatchlist = async (req, res) => {
	const { ticker } = req.body;
	const user = await User.findOne({ name: "default" });

	if (!user) {
		res.status(401);
		throw new Error("User does not exist");
	}

	const existingTicker = user.watchList.find((item) => item === ticker);

	if (existingTicker) {
		console.log("Ticker already present in the watchlist");
		res.json(user);
	}

	user.watchList = [...user.watchList, ticker];

	let updatedUser = await user.save();
	res.json(updatedUser);
};

const deleteItemFromWatchlist = async (req, res) => {
	const { ticker } = req.body;
	const user = await User.findOne({ name: "default" });

	if (!user) {
		res.status(401);
		throw new Error("User does not exist");
	}

	let existingTicker = user.watchList.find((item) => item === ticker);

	if (!existingTicker) {
		throw new Error("Ticker not found in watchlist");
	}

	let idx = user.watchList.indexOf(ticker);
	console.log(idx);
	user.watchList.splice(idx, 1);
	console.log(user.watchList);

	let updatedUser = await user.save();
	res.json(updatedUser);
};

const addMoney = async (req, res) => {
	const { name, money } = req.body;
	const user = await User.updateOne(
		{
			name: name,
		},
		{
			money: money,
		},
		{ new: true }
	);

	if (!user.acknowledged) {
		throw new Error("Adding Money failed!");
	}
	res.json(user);
};

const subtractMoney = async (req, res) => {
	const { name, money } = req.body;
	const user = await User.findOne({
		name: name,
		money: { $gte: money },
	});

	if (!user) {
		throw new Error("Not enough money added to subtract!");
	}

	result = await User.updateOne(
		{
			name: name,
			money: { $gte: money },
		},
		{
			$inc: { money: -money },
		},
		{ new: true }
	);

	if (!result.acknowledged) {
		throw new Error("Subtracting Money failed!");
	}
	res.json(result);
};

const buyStock = async (req, res) => {
	let { ticker, name, quantity, totalCost: cost } = req.body;
	cost = parseFloat(cost);

	const user = await User.findOne({
		name: "default",
	});

	console.log(user);

	if (!user) {
		throw new Error("User does not exist!");
	}

	if (user.money < cost) {
		throw new Error("Not enough money to buy the stock");
	}

	let stockBought = user.stocksBought.find((item) => item.ticker === ticker);

	console.log("SB", stockBought);

	if (!stockBought) {
		console.log("h1");
		const stock = {
			ticker,
			name,
			quantity,
			totalCost: cost,
		};

		let updatedMoney = user.money - parseFloat(cost);
		user.money = updatedMoney;
		user.stocksBought = [...user.stocksBought, stock];
	} else {
		console.log("h2");
		const idx = user.stocksBought.map((item) => item.ticker).indexOf(ticker);
		console.log(idx);
		user.stocksBought.splice(idx, 1);
		console.log(user.stocksBought);
		const stock = {
			ticker,
			name,
			quantity: stockBought.quantity + quantity,
			totalCost: stockBought.totalCost + cost,
		};
		let updatedMoney = user.money - cost;
		user.stocksBought = [...user.stocksBought, stock];
		user.money = updatedMoney;
	}

	console.log(user);

	let updatedUser = await user.save();
	res.json(updatedUser);
};

const sellStock = async (req, res) => {
	let { ticker, quantity, cost } = req.body;
	cost = parseFloat(cost);

	const user = await User.findOne({
		name: "default",
	});

	if (!user) {
		throw new Error("User does not exist!");
	}

	let stockBought = user.stocksBought.find((item) => item.ticker === ticker);

	if (!stockBought) {
		throw new Error("The stock needs to be bought before selling");
	}

	if (stockBought.quantity < quantity) {
		throw new Error("You cannot sell more stock than you have!");
	}

	if (stockBought.quantity === quantity) {
		const idx = user.stocksBought.map((item) => item.ticker).indexOf(ticker);
		const modifiedStocksBought = [...user.stocksBought].splice(idx, 1);

		let updatedMoney = user.money + cost;
		user.stocksBought = [...modifiedStocksBought];
		user.money = updatedMoney;
	}

	if (stockBought.quantity > quantity) {
		const idx = user.stocksBought.map((item) => item.ticker).indexOf(ticker);
		const name = user.stocksBought[idx].name;
		user.stocksBought.splice(idx, 1);

		const stock = {
			ticker,
			name,
			quantity: stockBought.quantity - quantity,
			totalCost: stockBought.totalCost - cost,
		};

		let updatedMoney = user.money + cost;
		user.stocksBought = [...user.stocksBought, stock];
		user.money = updatedMoney;
	}

	let updatedUser = await user.save();
	res.json(updatedUser);
};

export {
	getWatchlist,
	getDefaultUser,
	addItemToWatchlist,
	deleteItemFromWatchlist,
	addMoney,
	subtractMoney,
	buyStock,
	sellStock,
};
