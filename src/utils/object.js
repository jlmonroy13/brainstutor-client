function mapKeyToValue(obj, key) {
  return obj[key];
}

function toArray(obj) {
  const boundMapKeyToValue = mapKeyToValue
    .bind(null, obj);

  return Object.keys(obj)
    .map(boundMapKeyToValue, []);
}

const ObjectUtils = {
  toArray,
};

export default ObjectUtils;