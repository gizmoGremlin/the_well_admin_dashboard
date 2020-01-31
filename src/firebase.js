import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import uuidv4 from "uuid/v4";



class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.firestore();
	}
	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}
	logout() {
		return this.auth.signOut();
	}
	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: name
		});
	}
	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve);
		});
	}
	getAllEvents() {
		return this.db
			.collection("events")
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log("No matching documents.");
					return;
				}
				const events = snapshot.docs.map(doc => doc.data());
				console.log("Eventss " + JSON.stringify(events));
				return events;
			})
			.catch(err => {
				console.log("Error getting documents", err);
				return console.err(err);
			});
	}
	getAllNews() {
		return this.db
			.collection("news")
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log("No matching documents.");
					return;
				}
				const news = snapshot.docs.map(doc => doc.data());
				console.log("News " + JSON.stringify(news));
				return news;
			})
			.catch(err => {
				console.log("Error getting documents", err);
				return console.err(err);
			});
	}
	getAllBlogs() {
		return this.db
			.collection("prayer")
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log("No matching documents.");
					return;
				}
				const blogs = snapshot.docs.map(doc => doc.data());
				console.log("Blogs " + JSON.stringify(blogs));
				return blogs;
			})
			.catch(err => {
				console.log("Error getting documents", err);
				return console.err(err);
			});
	}
	removeNews(id) {
		this.db
			.collection("news")
			.doc(id)
			.delete()
			.catch(err => console.error(err));
	}
	updateNews(id, title, content) {
		this.db
			.collection("news")
			.doc(id)
			.update({
				title,
				content
			});
	}
	removeEvent(id) {
		console.log("Remove Events id: " + id);
		this.db
			.collection("events")
			.doc(id)
			.delete()
			.catch(err => console.error(err));
	}
	updateEvent(id, title, content, date) {
		let eventDate = new Date(date);

		this.db
			.collection("events")
			.doc(id)
			.update({
				title,
				content,
				eventDate
			});
	}
	updateBlog(id, prayerName, prayerContent, prayerPhoto) {
		this.db
			.collection("prayer")
			.doc(id)
			.update({
				prayerName,
				prayerContent,
				prayerPhoto
			})
			.catch(err => {
				console.error("ERR: " + err);
			});
	}
	removeBlog(id) {
		console.log("delet blog database " + id);
		this.db
			.collection("prayer")
			.doc(id)
			.delete();
	}
	addBlog(title, content, photo) {
		const newBlog = {
			id: uuidv4(),
			prayerName: title,
			prayerContent: content,
			prayerPhoto: photo,
			prayerDate: new Date()
		};
		console.log("Firebase Add Blog func : " + newBlog);
		this.db
			.collection("prayer")
			.doc(newBlog.id)
			.set(newBlog);
	}
	addNews(title, content) {
		console.log("Adding^^ News>>> : " + title);
		const newNews = {
			id: uuidv4(),
			newsDate: new Date(),
			newsName: title,
			newsContent: content
		};
		this.db
			.collection("news")
			.doc(newNews.id)
			.set(newNews);
	}
	addEvent(title, content, date) {
		console.log("Date outgoing to db :" + date);
		const newEvent = {
			id: uuidv4(),
			eventDate: new Date(date),
			eventName: title,
			eventDesc: content
		};
		this.db
			.collection("events")
			.doc(newEvent.id)
			.set(newEvent);
	}
	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
	}
}
export default new Firebase();
