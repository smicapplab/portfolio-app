
/**
 * Assembles a FormData object from a given data object.
 *
 * @param {Object} data - The data object to assemble into a FormData object.
 * @return {FormData} The assembled FormData object.
 */
export const assembleFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // @ts-ignore
      formData.append(key, data[key]);
    }
  }
  return formData;
}

// @ts-ignore
export const destructureFormData = async (formDataPromise) => {
  const formData = await formDataPromise;
  const data = {};
  // @ts-ignore
  formData.forEach((value, key) => {
    // @ts-ignore
    data[key] = value;
  });
  return data;
};


// @ts-ignore
export const parseResponse = async ( response ) => {
  try {
    const jsonResponse = await response.json();
    const parsedArray = JSON.parse(jsonResponse.data);

    // Extract the positions of keys from the first element of the array
    const keyPositions = parsedArray[0];
    const success = parsedArray[keyPositions.success];
    const message = parsedArray[keyPositions.message] || "Unknown error occurred";
    const data = keyPositions.data !== undefined ? parsedArray[keyPositions.data] : undefined;

    const result = {
      type: jsonResponse.type,
      status: jsonResponse.status,
      data: {
        success,
        message,
        data,
      },
    };

    return result;
  } catch (error) {
    console.error("Error parsing response data:", error);
    return {
      type: "error",
      status: 500,
      data: {
        success: false,
        message: "Something went wrong!"
      }
    };
  }
};