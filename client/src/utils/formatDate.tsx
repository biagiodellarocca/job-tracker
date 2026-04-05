export function formatDate(value: string | null): string {
	if (!value) return "";
	const [year, month, day] = value.split("-");
	if (!day || !month || !year) return "";
	return `${day}/${month}/${year}`;
}
