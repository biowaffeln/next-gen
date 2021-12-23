export const toValidPath = (str: string) =>
	str
		.replace(/[^a-zA-Z0-9]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
		.toLowerCase();
