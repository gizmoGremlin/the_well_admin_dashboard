import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./../Homepage";
import Login from "./../Login";
import Register from "./../Register";
import Dashboard from "./../Dashboard";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Curate from "../Curate";
const theme = createMuiTheme({
	palette: {
		primary: blueGrey,
		secondary: orange
	},
	status: {
		danger: "orange"
	}
});
export default function index() {
	return (
		<div>
			<MuiThemeProvider>
				<CssBaseline />
				<Router>
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/curate" component={Curate} />
					</Switch>
				</Router>
			</MuiThemeProvider>
		</div>
	);
}
