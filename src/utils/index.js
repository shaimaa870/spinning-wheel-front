export const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sum = (arr, key) => {
  return arr.reduce((total, obj) => obj[key] + total, 0);
};

export const distinctByProps = (array, props) => {
  const result = [];
  for (const element of array) {
    let exist = false;
    for (const a of result) {
      exist = exist || props.every(p => a[p] === element[p]);
    }
    if (!exist) {
      result.push(element);
    }
  }
  return result;
};

export const customSort = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce(
    (obj, item, index) => ({
      ...obj,
      [item]: index
    }),
    {}
  );
  return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]);
};

export const convertToDate = (date) =>{
  var result = new Date(date);
  var dd = String(result.getDate()).padStart(2, '0');
  var mm = String(result.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = result.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}
Object.defineProperty(Array.prototype, "chunk", {
  value: function(chunkSize) {
    const result = [];
    for (let i = 0; i < this.length; i += chunkSize) result.push(this.slice(i, i + chunkSize));
    return result;
  }
});

