import mongoose from "mongoose";

const MONGO_URL =
	"mongodb+srv://dbadmin:gj6mqs1KDdQJSQ4V@cluster0.wmahrxg.mongodb.net/auth?retryWrites=true&w=majority";

async function mongoConnect(callback?: () => void) {
	await mongoose
		.connect(MONGO_URL)
		.then(() => {			
			console.log("MongoDB connected");
			callback?.();
		})
		.catch((err) => {
			console.log(err);
		});
}

async function mongoDisconnect() {
	await mongoose.disconnect();
	console.log("MongoDB disconnected");
}

export { mongoConnect, mongoDisconnect };
