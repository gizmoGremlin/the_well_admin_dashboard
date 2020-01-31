import React, { useState, useEffect } from "react";
import firebase from "./../../firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import datejsUtils from "@date-io/dayjs";
import { withRouter } from "react-router-dom";
import {
	Paper,
	Typography,
	FormControl,
	Input,
	InputLabel,
	TextField,
	Box,
	Button,
	Link
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
const styles = theme => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	top: {
		display: "flex",
		width: "100%",

		flexDirection: "row",
		alignItems: "flex-end"
	}
});

function Dashboard(props) {
	const { classes } = props;
	const [myBlogTitle, setMyBlogTitle] = useState("");
	const [myBlogContent, setMyBlogContent] = useState("");
	const [myBlogPhoto, setMyBlogPhoto] = useState("");
	const [myNewsTitle, setMyNewsTitle] = useState("");
	const [myNewsContent, setMyNewsContent] = useState("");
	const [myEventTitle, setMyEventTitle] = useState("");
	const [myEventContent, setMyEventContent] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	//const [myEventDate, setMyEventDate]= useState(Date().now()) // use a date picker instead
	useEffect(() => {});
	if (!firebase.getCurrentUsername()) {
		// not logged in
		alert("Please login first");
		props.history.replace("/login");
		return null;
	}

	return (
		<MuiPickersUtilsProvider utils={datejsUtils}>
			<div className={classes.main}>
				<div style={{ width: "100%", marginTop: 20 }}>
					<Box display="flex" flexDirection="row-reverse">
						<Link
							component="button"
							variant="body2"
							onClick={() => {
								props.history.push("/curate");
							}}
						>
							Curate
						</Link>
					</Box>
				</div>

				<Paper className={classes.paper} variant="outlined" square>
					<Typography component="h1" variant="h5">
						Add Blog/Prayer
					</Typography>
					<form
						className={classes.form}
						onSubmit={e => e.preventDefault() && false}
					>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="blogtitle">Blog Title</InputLabel>
							<Input
								id="blogTitle"
								name="blogTitle"
								autoComplete="off"
								autoFocus
								label="Title"
								value={myBlogTitle}
								onChange={e => setMyBlogTitle(e.target.value)}
							/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<TextField
								id="blogContent"
								name="blogContent"
								autoComplete="off"
								autoFocus
								value={myBlogContent}
								multiline
								label="Content"
								onChange={e => setMyBlogContent(e.target.value)}
							/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<TextField
								id="blogPhoto"
								name="blogPhoto"
								autoComplete="off"
								autoFocus
								value={myBlogPhoto}
								multiline
								label="photo"
								onChange={e => setMyBlogPhoto(e.target.value)}
							/>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => {
								handleAddBlogItem(myBlogTitle, myBlogContent, myBlogPhoto);
								setMyBlogTitle("");
								setMyBlogPhoto("");
								setMyBlogContent("");
							}}
							className={classes.submit}
						>
							Publish
						</Button>
					</form>
				</Paper>
				<Paper className={classes.paper} variant="outlined">
					<Typography component="h1" variant="h5">
						Add News
					</Typography>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="newsTitle"
							name="newsTitle"
							autoComplete="off"
							autoFocus
							value={myNewsTitle}
							multiline
							label="News Title"
							onChange={e => setMyNewsTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="newsContent"
							name="newsContent"
							autoComplete="off"
							autoFocus
							value={myNewsContent}
							multiline
							label="News Content"
							onChange={e => setMyNewsContent(e.target.value)}
						/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => handleAddNewsItem(myNewsTitle, myNewsContent)}
						className={classes.submit}
					>
						Publish
					</Button>
				</Paper>
				<Paper className={classes.paper} variant="outlined">
					<Typography component="h1" variant="h5">
						Add Event
					</Typography>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="eventTitle"
							name="eventTitle"
							autoComplete="off"
							autoFocus
							value={myEventTitle}
							multiline
							label="Event Title"
							onChange={e => setMyEventTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="eventContent"
							name="eventContent"
							autoComplete="off"
							autoFocus
							value={myEventContent}
							multiline
							label="Event Content"
							onChange={e => setMyEventContent(e.target.value)}
						/>
					</FormControl>
					<DatePicker
						required
						fullWidth
						autoFocus
						style={{ marginTop: 30 }}
						value={selectedDate}
						onChange={setSelectedDate}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{ marginTop: 30 }}
						onClick={() =>
							handleAddEventItem(myEventTitle, myEventContent, selectedDate)
						}
						className={classes.submit}
					>
						Publish
					</Button>
				</Paper>
			</div>
		</MuiPickersUtilsProvider>
	);
	async function handleAddNewsItem(title, content) {
		console.log("add news title: " + title + ", content: " + content);
		firebase.addNews(title, content);
		setMyNewsTitle("")
		setMyNewsContent("")
	}

	async function handleAddBlogItem(title, content, photo) {
		console.log("add blog title: " + title + ", content: " + content);

		firebase.addBlog(title, content, photo);
	}
	async function handleAddEventItem(title, content, date) {
		console.log(
			"add event title: " + title + ", content: " + content + "date: " + date
		);
		firebase.addEvent(title, content, date);
	}
}
export default withRouter(withStyles(styles)(Dashboard));
