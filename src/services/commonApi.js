import axios from 'axios';

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  };

  try {
    const result = await axios(reqConfig);
    console.log("API Response:", result); // Log API response
    return result;
  } catch (err) {
    console.error("API Error:", err); // Log API error
    return err.response || err;
  }
};
