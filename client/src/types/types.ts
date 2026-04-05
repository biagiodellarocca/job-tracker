import type { Dispatch, SetStateAction } from "react";

export const applicationStatus = ["applied", "interview", "rejected", "offer"] as const;
export type ApplicationStatus = typeof applicationStatus[number];

export interface TypeNewApplication {
	jobTitle: string;
	companyName: string;
	status: ApplicationStatus;
	url?: string;
	location?: string;
	date?: string;
	type?: string;
	notes?: string;
}

export interface TypeApplication extends TypeNewApplication {
	id: number;
}

export interface TypeForm {
	applicationData: TypeNewApplication;
	handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
	error?: string;
	setApplicationData: Dispatch<SetStateAction<TypeNewApplication>>;
}
