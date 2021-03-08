class UnprocessableEntityErrorHandler {
  static parse = (error) => {
    const status = error.response.status;

    const data = {
      error: null,
      status
    };

    if (status === 422) {
      const {name, message} = error.response.data;
      data.error = {name, value: {message: message.replace(`"${name}"`, name), shouldFocus: true}};
    } else {
      data.error = error.response.data;
    }

    return data;
  }
}

export default UnprocessableEntityErrorHandler