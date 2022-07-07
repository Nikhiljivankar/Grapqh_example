const SuccessResponse = (data = null, message = 'Completed') => ({
	success: true,
	payload:{
		order: data,
		message,
	}
});
// const SuccessResponse = (data = null, records = 0, message = 'Completed') => ({
// 	isSuccess: true,
// 	data, // data
// 	records, // data count
// 	message,
// });

module.exports = SuccessResponse;
