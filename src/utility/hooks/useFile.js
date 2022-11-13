function useFile(url = null, fileType = 0) {
  let file = {
    name: "",
    extension: "",
    fileType,
    // id: null,
    fileStatus: 0,
    readUrl: url,
    // bytes: null,
    url: url,
    base64: "",
  };
  return file;
}

export default useFile;
