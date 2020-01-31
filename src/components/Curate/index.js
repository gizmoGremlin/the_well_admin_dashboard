import React, { useState, useEffect } from "react";
import firebase from "./../../firebase";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import EditListItem from "./../EditListItem";
import EventEditListItem from "./../EventEditListItem";
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
import NewsEditListItem from "../NewsEditListItem";

const styles = theme => ({
	main: {
		width: "auto",
		display: "flex", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,

		[theme.breakpoints.up(400 + theme.spacing.unit)]: {
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		marginLeft: 100,
		marginRight: 100,

		display: "flex",
		flexDirection: "column",
		alignItems: "space-between",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	}
});

function Curate(props) {
	const { classes } = props;
	const [allBlogs, setAllBlogs] = useState([
		{
			id: "Wowo1111111",
			prayerContent: "A TEST!!! is a pinacle of virtue",
			prayerName: "Wagner is  Pretty good",
			prayerPhoto: "htttps:photo"
		}
	]);
	//newsDate: { seconds: 1577937600, nanoseconds: 0 }
	const [allNews, setAllNews] = useState([]);
	const [allEvents, setAllEvents] = useState([]);
	useEffect(() => {
		// fetch projects

		firebase.getAllNews().then(news => (news ? setAllNews(news) : []));
		firebase
			.getAllEvents()
			.then(events => (events ? setAllEvents(events) : []));
		firebase.getAllBlogs().then(items => (items ? setAllBlogs(items) : []));
	}, []);
	const updateBlog = (id, title, content, photo) => {
		firebase.updateBlog(id, title, content, photo);
	};
	const removeBlog = id => {
		firebase.removeBlog(id);
		setAllBlogs(allBlogs.filter(item => item.id !== id));
	};
	const eventRemove = id => {
		console.log("removing Event!!!1" + id);
		firebase.removeEvent(id);
		setAllEvents(allEvents.filter(event => event.id !== id));
	};

	const eventUpdate = (id, title, content, date) => {
		console.log("updating Event" + title);
		firebase.updateEvent(id, title, content, date);
	};
	const newsRemove = id => {
		console.log("removing News!!&*" + id);
		firebase.removeNews(id);
		setAllNews(allNews ? allNews.filter(news => news.id !== id) : []);
	};
	const newsUpdate = (id, title, content) => {
		console.log("removing Event!!!1" + id);
		firebase.updateNews(id, title, content);
	};
	return (
		<Box display="flex" style={{ marginBottom: 100 }} flexDirection="column">
			<Box display="flex" flexDirection="row-reverse">
				<Link
					style={{ marginRight: 100, marginTop: 40 }}
					component="button"
					variant="body2"
					onClick={() => {
						props.history.push("/dashboard");
					}}
				>
					dashboard
				</Link>
			</Box>
			<Paper className={classes.paper} variant="outlined" square>
				<Typography variant="h5">Blogs / Prayers</Typography>
				{allBlogs.map(blog => {
					return (
						<EditListItem
							key={blog.id}
							handleRemove={removeBlog}
							handleUpdate={updateBlog}
							item={blog}
						/>
					);
				})}
			</Paper>
			<Paper className={classes.paper} variant="outlined" square>
				<Typography variant="h5">Events</Typography>
				{allEvents.map(event => {
					console.log("Mapped Events " + JSON.stringify(event));
					var myevent = {
						id: event.id,
						eventDate: event.eventDate.seconds * 1000,
						eventName: event.eventName,
						eventContent: event.eventDesc
					};
					console.log("MyEvents Denormalized" + JSON.stringify(myevent));
					return (
						<EventEditListItem
							handleRemove={eventRemove}
							handleUpdate={eventUpdate}
							key={event.id}
							item={myevent}
						/>
					);
				})}
			</Paper>
			<Paper className={classes.paper} variant="outlined" square>
				<Typography variant="h5">News</Typography>
				{allNews.map(news => {
					return (
						<NewsEditListItem
							handleRemove={newsRemove}
							handleUpdate={newsUpdate}
							key={news.id}
							item={news}
						/>
					);
				})}
			</Paper>
		</Box>
	);
}
export default withRouter(withStyles(styles)(Curate));
