const callApi = async (method, url, params) => {
  let headers = {
    "Content-Type": "application/json",
  };
  let options = {
    mode: "cors",
    method,
    headers,
    body: params,
  };
  try {
    const response = await fetch(
      `https://engineering-task.elancoapps.com/api/` + url
    );
    const res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};

export default callApi;
