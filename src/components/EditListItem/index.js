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

const EditListItem = props => {
	const [isEditable, setIsEditable] = useState(false);
	const toggleEdit = () => {
		if (isEditable) {
			props.handleUpdate(props.item.id, title, content, photo);
		}

		isEditable ? setIsEditable(false) : setIsEditable(true);
	};

	const removeItem = () => {
		props.handleRemove(props.item.id);
		setTitle("");
		setContent("");
		setPhoto("");
	};

	const [title, setTitle] = useState(
		props.item.prayerName ? props.item.prayerName : ""
	);
	const [content, setContent] = useState(
		props.item.prayerContent ? props.item.prayerContent : ""
	);
	const [photo, setPhoto] = useState(
		props.item.prayerPhoto ? props.item.prayerPhoto : ""
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
				<TextField value={photo} onChange={e => setPhoto(e.target.value)} />
				<Button
					variant="outlined"
					size="small"
					style={{ backgroundColor: "red" }}
					onClick={toggleEdit}
					fullWidth={false}
				>
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
				<Typography style={{ marginLeft: 10 , flex:.5}} variant="body2">
					{title}
				</Typography>
				<Typography style={{ marginLeft: 10 , flex:1}} variant="body2">
					{content}
				</Typography>
				<Typography style={{ marginLeft: 10, flex:1 }} variant="body2">
					{photo}
				</Typography>
				<div style={{ marginLeft: 10 , flex:.5}}>
					<Button
						style={{ marginLeft: 10 }}
						style={{ backgroundColor: "blue" }}
						onClick={toggleEdit}
						fullWidth={false}
						variant="outlined"
						size="small"
					>
						edit
					</Button>
					<Button
						style={{ marginLeft: 10 }}
						style={{ backgroundColor: "red" }}
						onClick={removeItem}
						fullWidth={false}
						variant="outlined"
						size="small"
					>
						remove
					</Button>
				</div>
			</Box>
		);
	}
};
export default EditListItem;
