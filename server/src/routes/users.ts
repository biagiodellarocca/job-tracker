import express from "express";
import { db } from "../db/db.js";
import { users } from "../db/schema.js";
import AppError from "../utils/AppError.js";
import { eq } from "drizzle-orm";

const usersRouter = express.Router();

// Get All Users
usersRouter.get("/", async (req, res, next) => {
	try {
		const allUsers = await db.select().from(users);
		if (allUsers.length === 0)
			return next(new AppError("No Users found", 400));
		res.send(allUsers);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

// Get One User
usersRouter.get("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid User ID", 400));

	try {
		const user = await db.select().from(users).where(eq(users.id, id));
		if (user.length === 0)
			return next(new AppError(`No User with ID ${id} found`, 404));
		res.send(user[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

// Create One User
usersRouter.post("/", async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password)
		return next(new AppError("Name, Email and Password required", 400));

	try {
		const newUser = await db
			.insert(users)
			.values({ name, email, password })
			.returning();

		res.send(newUser[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

// Delete One User
usersRouter.delete("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid ID", 400));

	try {
		const deletedUser = await db
			.delete(users)
			.where(eq(users.id, id))
			.returning();

		if (deletedUser.length === 0)
			return next(new AppError(`No User with ID ${id} found`, 404));

		res.send(deletedUser[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

// Update One User
usersRouter.put("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid ID", 400));

	const { name, email, password } = req.body;

	try {
		const updatedUser = await db
			.update(users)
			.set({
				name,
				email,
				password,
			})
			.where(eq(users.id, id))
			.returning();

		if (updatedUser.length === 0)
			return next(new AppError(`No User with ID ${id} found`, 404));

		res.send(updatedUser[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

export default usersRouter;
