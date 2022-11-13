export default function(/**@type {ApisauceInstance} */ api) {
    const getSpinningWheels = () => api.get("SpinnigWheel");
    const getSpinningWheelWithId = (id) => api.get(`SpinnigWheel/find/${id}`);
    const deleteSpinningWheel = (id) =>
      api.delete(`SpinnigWheel/delete/${id}`);
    const editSpinningWheel = ({ payload}) =>
      api.put(`SpinnigWheel`, payload);
  
    const createSpinningWheel = (payload) =>
      api.post("SpinnigWheel/", payload);
  
    return {
      spinningWheels: {
        createSpinningWheel,
        getSpinningWheels,
        getSpinningWheelWithId,
        deleteSpinningWheel,
        editSpinningWheel,
      },
    };
  }
  