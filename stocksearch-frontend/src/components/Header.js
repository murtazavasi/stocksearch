import React from "react";

import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mx-4">
			<Navbar.Brand href="/" className="flex-grow-1">
				Stock Search
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-0">
				<Nav>
					<Nav.Link href="/">Search</Nav.Link>
					<Nav.Link href="/watchlist">WatchList</Nav.Link>
					<Nav.Link href="/portfolio">Portfolio</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
