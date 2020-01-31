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

const NewsEditListItem = props => {
	const [isEditable, setIsEditable] = useState(false);
	const toggleEdit = () => {
		if (isEditable) {
			props.handleUpdate(props.item.id, title, content);
		}

		isEditable ? setIsEditable(false) : setIsEditable(true);
	};

	const removeItem = () => {
		console.log(
			"remove News@#@ Item!! Id:" + props.item.id + "Item: " + props.item
		);
		props.handleRemove(props.item.id);
		setTitle("");
		setContent("");
	};

	const [title, setTitle] = useState(
		props.item.newsName ? props.item.newsName : ""
	);
	const [content, setContent] = useState(
		props.item.newsContent ? props.item.newsContent : ""
	);

	if (isEditable) {
		return (
			<div
				style={{
					display: "flex",

					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 40
				}}
			>
				<TextField value={title} onChange={e => setTitle(e.target.value)} />
				<TextField value={content} onChange={e => setContent(e.target.value)} />

				<Button style={{ backgroundColor: "red" }} onClick={toggleEdit}>
					submit
				</Button>
			</div>
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
				<Typography style={{ marginLeft: 10 ,flex:1}} variant="body2">
					{title}
				</Typography>
				<Typography style={{ marginLeft: 10 ,flex:1}} variant="body2">
					{content}
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
export default NewsEditListItem;
