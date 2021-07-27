 function setResponseWithError(res, status, message, code = 'error', data = []) {
    return res.status(status).send({ code, message, data})
}

 function setResponseWithOk(res, status, message, code = 'ok', data = []) {
    return res.status(status).send({ code, message, data })
}

exports = {
    setResponseWithError,
    setResponseWithOk
}