import { type TypeForm, type TypeApplication } from "../../types/types.js";

const ApplicationForm = ({
	handleSubmit,
	applicationData,
	setApplicationData,
	error,
}: TypeForm) => {
	const handleInput = (val: keyof TypeApplication, val2: string) => {
		setApplicationData({
			...applicationData,
			[val]: val2
		})
	}
	
	return (
		<form onSubmit={handleSubmit}>
         
			<div className="mb-5">
				<label htmlFor="companyName" className="block mb-2.5 text-sm font-medium text-heading">Company Name</label>
				<input type="text" id="companyName" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={applicationData.companyName} onChange={(e) => handleInput('companyName', e.currentTarget.value)} placeholder="Company..." />
			</div>

			<div className="mb-5">
				<label htmlFor="jobTitle" className="block mb-2.5 text-sm font-medium text-heading">Job Title</label>
				<input type="text" id="jobTitle" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={applicationData.jobTitle} onChange={(e) => handleInput('jobTitle', e.currentTarget.value)} placeholder="Title..." />
			</div>

			<div className="mb-5">
				<label htmlFor="url" className="block mb-2.5 text-sm font-medium text-heading">URL</label>
				<input type="text" id="url" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={applicationData.url} onChange={(e) => handleInput('url', e.currentTarget.value)} placeholder="www..." />
			</div>

			<div className="mb-5">
				<label htmlFor="status" className="block mb-2.5 text-sm font-medium text-heading">Status</label>
				<select id="status" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" value={applicationData.status} onChange={(e) => handleInput('status', e.currentTarget.value)}>
					<option value="applied">applied</option>
					<option value="interview">interview</option>
					<option value="rejected">rejected</option>
					<option value="offer">offer</option>
				</select>
			</div>

			<div className="mb-5">
				<label htmlFor="notes" className="block mb-2.5 text-sm font-medium text-heading">Notes</label>
				<textarea id="notes" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" value={applicationData.notes} onChange={(e) => handleInput('notes', e.currentTarget.value)} placeholder="Notes..."></textarea>
			</div>

			{error && <p>{error}</p>}
			<button type="submit">Submit</button>
			
		</form>
	);
};

export default ApplicationForm;
