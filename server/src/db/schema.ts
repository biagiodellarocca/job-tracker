import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
});

export const applications = pgTable("applications", {
	id: serial("id").primaryKey(),
	userId: integer("userId").references(() => users.id),
	jobTitle: text("jobTitle").notNull(),
	companyName: text("companyName").notNull(),
	status: text("status").notNull(),
	url: text("url"),
	location: text("location"),
	date: text("date"),
	type: text("type"),
	notes: text("notes"),
	createdAt: timestamp("createdAt").defaultNow(),
});
