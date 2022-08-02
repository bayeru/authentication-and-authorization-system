import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./routes/user.router";
import { authRouter } from "./routes/auth.router";
import HttpError from "./util/HttpError";

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Route not found handler (Pass error to next middleware, which is the error handler)
app.use((req: Request, res: Response, next: NextFunction) => {
	next(new HttpError("Route cannot be found.", 404));
});

// Error handler, it's placed after all the routes
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	// If the headers have already been sent, delegate to the default error handler
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof HttpError) {
		res
			.status(err.statusCode || 500)
			.json({ message: err.message || "Something went wrong!" });
	} else {
		res.status(500).json({ message: "Something went wrong!" });
	}
});

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
