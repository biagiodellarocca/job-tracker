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

			<div className="mb-6">
				<label htmlFor="jobTitle" className="form-label">Job Title</label>
				<input type="text" id="jobTitle" className="form-input" value={applicationData.jobTitle} onChange={(e) => handleInput('jobTitle', e.currentTarget.value)} placeholder="Title..." />
			</div>

			<div className="mb-6">
				<label htmlFor="companyName" className="form-label">Company Name</label>
				<input type="text" id="companyName" className="form-input" value={applicationData.companyName} onChange={(e) => handleInput('companyName', e.currentTarget.value)} placeholder="Company..." />
			</div>
			
			<div className="mb-6">
				<label htmlFor="location" className="form-label">Location</label>
				<input type="text" id="location" className="form-input" value={applicationData.location} onChange={(e) => handleInput('location', e.currentTarget.value)} placeholder="Location..." />
			</div>

			<div className="mb-6">
				<label htmlFor="type" className="form-label">Type</label>
				<select id="type" className="form-select" value={applicationData.type} onChange={(e) => handleInput('type', e.currentTarget.value)}>
					<option value="on-site">On-site</option>
					<option value="remote">Remote</option>
					<option value="hybrid">Hybrid</option>
				</select>
			</div>
			
			<div className="mb-6">
				<label htmlFor="date" className="form-label">Date</label>
				<input type="date" id="date" className="form-input" value={applicationData.date} onChange={(e) => handleInput('date', e.currentTarget.value)} placeholder="Date..." />
			</div>

			<div className="mb-6">
				<label htmlFor="url" className="form-label">URL</label>
				<input type="text" id="url" className="form-input" value={applicationData.url} onChange={(e) => handleInput('url', e.currentTarget.value)} placeholder="www..." />
			</div>

			<div className="mb-6">
				<label htmlFor="status" className="form-label">Status</label>
				<select id="status" className="form-select" value={applicationData.status} onChange={(e) => handleInput('status', e.currentTarget.value)}>
					<option value="applied">applied</option>
					<option value="interview">interview</option>
					<option value="rejected">rejected</option>
					<option value="offer">offer</option>
				</select>
			</div>

			<div className="mb-10">
				<label htmlFor="notes" className="form-label">Notes</label>
				<textarea id="notes" className="form-textarea" value={applicationData.notes} onChange={(e) => handleInput('notes', e.currentTarget.value)} placeholder="Notes..."></textarea>
			</div>

			{error && <p>{error}</p>}
			<button type="submit" className="form-submit">Save Application</button>
			
		</form>
	);
};

export default ApplicationForm;
