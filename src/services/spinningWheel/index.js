export default function(/**@type {ApisauceInstance} */ api) {
    const getSpinningWheels = () => api.get("SpinningWheel/wheels");
    const getSpinningWheelWithId = (id) => api.get(`SpinningWheel/wheel/${id}`);
    const deleteSpinningWheel = (id) =>
      api.delete(`SpinningWheel/delete-wheel/${id}`);
    const editSpinningWheel = ({id, payload}) =>
      api.put(`SpinningWheel/edit-wheel/${id}`, payload);
  
    const createSpinningWheel = (payload) =>
      api.post("SpinningWheel/add-wheel", payload);
  
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
  