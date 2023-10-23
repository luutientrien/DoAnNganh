import React, { Suspense, useState } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Layout from "./layouts";
import { PublicRoutes, PublicPaths } from "./routes/public-route";
import { ProtectRoutes, ProtectPaths } from "./routes/protect-route";
import { getAuthLS, LS_KEY, clearAuthLS } from '../src/helpers/localStorage';
import cookies from 'react-cookies';
import { rolePaths } from './helpers/utils'

function App() {
	let loggedIn = getAuthLS(LS_KEY.AUTH_TOKEN) ? true : false;
	const check = getAuthLS(LS_KEY.AUTH_TOKEN)

	if (cookies.load("user") == null || !loggedIn) {
		loggedIn = false;
		clearAuthLS();
		cookies.remove("user");
		cookies.remove("access_token");
	};

	function AdminLayout(props) {
		let tempRoutes = Object.assign(ProtectRoutes, PublicRoutes)
		return (
			<Layout {...props}>
				{Object.values(tempRoutes).map((route, idx) => {
					return (
						<Route
							key={`${idx}-protect`}
							path={route.path}
							exact={route.exact}
							render={(props) => <route.component {...props} />}
						/>
					);
				})}
				{/* <Redirect to="/" /> */}
			</Layout>
		);
	}

	function EmployeeLayout(props) {
		let tempRoutes = Object.assign(ProtectRoutes, PublicRoutes)
		let tempRoute = Object.values(tempRoutes);
		let tempRouteGuest = tempRoute.filter((d) => d.isAdmin !== true)
		return (
			<Layout {...props}>
				{Object.values(tempRouteGuest).map((route, idx) => {
					return (
						<Route
							key={`${idx}-protect`}
							path={route.path}
							exact={route.exact}
							render={(props) => <route.component {...props} />}
						/>
					);
				})}
				<Redirect to="/Admin/AdminProduct" />
			</Layout>
		);
	}

	function CustomerLayout(props) {
		return (
			<Layout {...props}>
				{Object.values(PublicRoutes).map((route, idx) => {
					return (
						<Route
							key={`${idx}-public-guest`}
							path={route.path}
							exact={route.exact}
							render={(props) => <route.component {...props} />}
						/>
					);
				})}
				<Redirect to="/" />
				{/* <Redirect strict from="*" to="/" /> */}
			</Layout>
		);
	}

	function GuestLayout(props) {
		let tempRoute = Object.values(PublicRoutes);
		let tempRouteGuest = tempRoute.filter((d) => d.isLogin !== true)
		return (
			<Layout {...props}>
				{Object.values(tempRouteGuest).map((route, idx) => {
					return (
						<Route
							key={`${idx}-public-guest`}
							path={route.path}
							exact={route.exact}
							render={(props) => <route.component {...props} />}
						/>
					);
				})}
				<Redirect to="/" />
				{/* <Redirect strict from="*" to="/" /> */}
			</Layout>
		);
	}

	function ManageRoute({ role }) {
		if (role === rolePaths.CUSTOMER) {
			return (
				<Route key={1} path="/" render={(props) => <CustomerLayout {...props} />} />
			);
		} else if (role === rolePaths.EMPLOYEE) {
			return (
				<Route key={2} path="/" render={(props) => <EmployeeLayout {...props} />} />
			);
		} else if (role === rolePaths.ADMIN) {
			return (
				<Route key={3} path="/" render={(props) => <AdminLayout {...props} />} />
			);
		} else {
			return (
				<Route key={1} path="/" render={(props) => <GuestLayout {...props} />} />
			);
		}
	}

	return (
		<Router>
			{loggedIn ? (
				<Switch>
					<ManageRoute role={check} />
				</Switch>
			) : (
				<Switch>
					<Route key={3} path="/" render={(props) => <GuestLayout {...props} />} />
				</Switch>
			)}
		</Router>
	);
}

export default App;