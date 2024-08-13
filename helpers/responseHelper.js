async function responseHelpers(res, httpCode, data = null) {
     return res.status(httpCode).json(data)
}

function handleServerError(res, error) {
     console.error(error); 
     return responseHelpers(res, 500, { message: 'Internal server error' });
}

module.exports = { responseHelpers, handleServerError };