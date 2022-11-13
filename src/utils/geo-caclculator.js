export const getDistanceBetweenTwoLocation = (lat1, lon1, lat2, lon2) => {
  if (isNaN(lat1) || isNaN(lat2) || isNaN(lon1) || isNaN(lon2)) return 0;
  let R = 6378.137;
  let dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  let dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d.toFixed(2);
};

export const convertDistanceFromKiloToMile = distance => (distance * 0.62).toFixed(2);

export const getNearbyKnownPlacesFromCurrentLocation = (lat, long, knownPlaces) => {
  const knownPlacesDistances =
    knownPlaces &&
    knownPlaces.map(({ code, latitude, longitude }) => {
      let currentPlaceInKilo = getDistanceBetweenTwoLocation(lat, long, latitude, longitude);
      let currentPlaceInMile = convertDistanceFromKiloToMile(currentPlaceInKilo);
      return { id: code, distanceInkilo: currentPlaceInKilo, distanceInMile: currentPlaceInMile };
    });
  return knownPlacesDistances;
};
