import "dotenv/config";
import express from "express";
import cors from "cors";
import AppError from "./utils/AppError.js";
import { protect } from "./middleware/auth.js";
import authRouter from "./routes/auths.js";
import usersRouter from "./routes/users.js";
import applicationsRouter from "./routes/applications.js";

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: "*",
	}),
);

app.get("/", (req, res) => {
	res.send("Welcome to the Job-Tracker-App!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", protect, usersRouter);
app.use("/api/v1/applications", protect, applicationsRouter);

// 404 Error
app.use((req, res, next) => {
	next(new AppError(`404 - Route ${req.originalUrl} not Found`, 404));
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal server error";
	res.status(statusCode).send(message);
});

app.listen(port, () => {
	console.log(`App is listening to port http://localhost:${port}`);
});
