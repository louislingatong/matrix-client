class UnprocessableEntityErrorHandler {
  static parse = (error) => {
    const status = error.response.status;

    const data = {
      error: null,
      status
    };

    if (status === 422) {
      const err = error.response.data.error;
      const errArr = Object.entries(err);
      data.error = {
        name: errArr[0][0],
        value: {
          message: errArr[0][1].replace(`"${errArr[0][0]}"`, errArr[0][0]),
          shouldFocus: true
        }
      };
    } else {
      data.error = error.response.data;
    }

    return data;
  }
}

export default UnprocessableEntityErrorHandler