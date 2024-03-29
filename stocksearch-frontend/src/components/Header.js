import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			className="px-4"
			style={{ backgroundColor: "#2223a9 !important" }}
		>
			<Navbar.Brand className="flex-grow-1">
				<Link to="/" className="text-decoration-none text-light">
					Stock Search
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse
				id="responsive-navbar-nav"
				className="flex-grow-0 text-decoration-none"
			>
				<Nav>
					<Nav.Link>
						<Link to="/" className="text-decoration-none text-light">
							Search
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/watchlist" className="text-decoration-none text-light">
							WatchList
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/portfolio" className="text-decoration-none text-light">
							Portfolio
						</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
