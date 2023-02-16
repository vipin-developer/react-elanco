const callApi = async (url) => {
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
