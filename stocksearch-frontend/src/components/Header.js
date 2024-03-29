import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import classes from "./Header.module.css";

const Header = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			className="px-4"
			style={{ backgroundColor: "#2223a9" }}
		>
			<Navbar.Brand className="flex-grow-1">
				<Link to="/" className="text-decoration-none text-light">
					Stock Search
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle
				aria-controls="responsive-navbar-nav"
				className="hamburgerIcon"
			/>
			<Navbar.Collapse
				id="responsive-navbar-nav"
				className="flex-grow-0 text-decoration-none"
			>
				<Nav className="py-2">
					<Link
						to="/"
						className="text-decoration-none text-light py-2 rounded px-3"
					>
						Search
					</Link>
					<Link
						to="/watchlist"
						className="text-decoration-none text-light py-2 rounded px-3"
					>
						WatchList
					</Link>
					<Link
						to="/portfolio"
						className="text-decoration-none text-light py-2 rounded px-3"
					>
						Portfolio
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
