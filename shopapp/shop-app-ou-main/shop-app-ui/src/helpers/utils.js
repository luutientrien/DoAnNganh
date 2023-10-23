export const infoRequest = (formData, formInfo) => {
	const { formType, auth, note } = formInfo;
	let currentDate = new Date();
	if (formType === 'insert') {
		formData.created_date = currentDate.getFullYear() + '-' + (currentDate.getMonth() +  1)+'-' + currentDate.getDate();
		formData.created_by = auth;
		formData.created_note = note;
		formData.update_date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1)+ '-' + currentDate.getDate();
		formData.update_by = auth;
		formData.update_note = note;
	} else {
		formData.update_date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
		formData.update_by = auth;
		formData.update_note = note;
	}
	formData.validationflag = '1'
}

export const rolePaths = {
	CUSTOMER: 'register',
	EMPLOYEE: 'manager',
	ADMIN: 'admin',
}

export const optionsGen = [
	{ id: 'm', label: 'Nam' },
	{ id: 'f', label: 'Nữ' },
]