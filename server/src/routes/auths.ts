import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { users } from "../db/schema.js";
import { db } from "../db/db.js";
import { eq } from "drizzle-orm";
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password)
		return next(new AppError("Name, Email and Password required", 400));
	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await db
			.insert(users)
			.values({
				name,
				email,
				password: hashedPassword,
			})
			.returning();
		const { password: _, ...props } = newUser[0];
		res.status(201).json(props);
	} catch (err: any) {
		next(new AppError("Internal server error", 500));
	}
});

authRouter.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password)
		return next(new AppError("Email and Password required", 400));
	try {
		const user = await db.select().from(users).where(eq(users.email, email));
		if (user.length === 0) return next(new AppError(`Email not found`, 401));

		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) return next(new AppError("Password incorrect", 400));

		const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!, {
			expiresIn: "7d",
		});

		res.json({ token });
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

export default authRouter;
