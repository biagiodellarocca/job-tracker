import express from "express";
import { db } from "../db/db.js";
import { applications } from "../db/schema.js";
import AppError from "../utils/AppError.js";
import { and, eq } from "drizzle-orm";

const applicationsRouter = express.Router();

applicationsRouter.get("/", async (req, res, next) => {
	try {
		const allApplications = await db
			.select()
			.from(applications)
			.where(eq(applications.userId, req.userId));
		if (allApplications.length === 0)
			return next(new AppError("No Applications found", 404));
		res.status(200).send(allApplications);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

applicationsRouter.get("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid ID", 400));

	try {
		const selectedApplication = await db
			.select()
			.from(applications)
			.where(
				and(eq(applications.userId, req.userId), eq(applications.id, id)),
			);
		if (selectedApplication.length === 0)
			return next(new AppError(`No Application with ID ${id} found`, 404));
		res.status(200).send(selectedApplication[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

applicationsRouter.post("/", async (req, res, next) => {
	const { companyName, jobTitle, url, status, notes, location, date, type } =
		req.body;
	if (!companyName || !jobTitle)
		return next(new AppError("Company Name, Job Title required", 400));
	try {
		const newApplication = await db
			.insert(applications)
			.values({
				userId: req.userId,
				jobTitle,
				companyName,
				status,
				url,
				location,
				date,
				type,
				notes,
			})
			.returning();

		res.status(201).send(newApplication[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

applicationsRouter.put("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid ID", 400));
	const { companyName, jobTitle, url, status, notes, location, date, type } =
		req.body;
	if (!companyName || !jobTitle)
		return next(new AppError("Company Name, Job Title, required", 400));

	try {
		const updateApplication = await db
			.update(applications)
			.set({
				jobTitle,
				companyName,
				status,
				url,
				location,
				date,
				type,
				notes,
			})
			.where(
				and(eq(applications.userId, req.userId), eq(applications.id, id)),
			)
			.returning();

		if (updateApplication.length === 0)
			return next(new AppError(`No Application with ID ${id} found`, 404));
		res.status(200).send(updateApplication[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

applicationsRouter.delete("/:id", async (req, res, next) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return next(new AppError("Invalid ID", 400));
	try {
		const deletedApplication = await db
			.delete(applications)
			.where(
				and(eq(applications.userId, req.userId), eq(applications.id, id)),
			)
			.returning();

		if (deletedApplication.length === 0)
			return next(new AppError(`No Application with ID ${id} found`, 404));
		res.status(200).send(deletedApplication[0]);
	} catch {
		next(new AppError("Internal server error", 500));
	}
});

export default applicationsRouter;
