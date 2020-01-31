import React, { useState, useEffect } from "react";
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
import datejsUtils from "@date-io/dayjs";
const EventEditListItem = props => {
	const [isEditable, setIsEditable] = useState(false);
	const toggleEdit = () => {
		if (isEditable) {
			props.handleUpdate(props.item.id, title, content, date);
			console.log("inside edit " + title);
		}

		isEditable ? setIsEditable(false) : setIsEditable(true);
	};

	const removeItem = () => {
		console.log(
			"remove Event Item!! Id:" + props.item.id + "Item: " + props.item
		);
		props.handleRemove(props.item.id);
		setTitle("");
		setContent("");
		setDate("");
	};

	const [title, setTitle] = useState(
		props.item.eventName ? props.item.eventName : ""
	);
	const [content, setContent] = useState(
		props.item.eventContent ? props.item.eventContent : ""
	);
	const [date, setDate] = useState(
		props.item.eventDate ? props.item.eventDate : ""
	);
	if (isEditable) {
		return (
			<MuiPickersUtilsProvider utils={datejsUtils}>
				<div
					style={{
						display: "flex",

						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 40
					}}
				>
					<TextField value={title} onChange={e => setTitle(e.target.value)} />
					<TextField
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
					<DatePicker autoFocus value={date} onChange={setDate} />

					<Button style={{ backgroundColor: "red" }} onClick={toggleEdit}>
						submit
					</Button>
				</div>
			</MuiPickersUtilsProvider>
		);
	} else {
		return (
			<Box
				style={{
					display: "flex",

					flexDirection: "row",
					justifyContent: "space-between",
					//	flexWrap: "wrap",
					marginTop: 40
				}}
			>
				<Typography style={{ marginLeft: 10,width:"25%" }} variant="body2">
					{title}
				</Typography>
				<Typography style={{ marginLeft: 10,width:"25%" }} variant="body2">
					{content}
				</Typography>
				<Typography style={{ marginLeft: 10,width:"25%" }} variant="body2">
					{new Date(date).toDateString()}
				</Typography>
				<div style={{ marginLeft: 10 , flex:.5}}>
				<Button
					style={{ marginLeft: 10 }}
					style={{ backgroundColor: "blue" }}
					onClick={toggleEdit}
				>
					edit   
				</Button>
				<Button
					style={{ marginLeft: 10 }}
					style={{ backgroundColor: "red" }}
					onClick={removeItem}
				>
					remove
				</Button>
				</div>
			</Box>
		);
	}
};
export default EventEditListItem;
