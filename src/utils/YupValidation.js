import * as Yup from "yup";
import IBAN from 'iban';
// secureText validation to check if text contains script or html tags
Yup.addMethod(Yup.string, 'secureText', function (message) {
  return this.test('secureText', message, function (value) {
    if (!value) return true;
    let isSecured = true;
    const { path } = this;
    const expr = /(<([^>]+)>)/ig;
    const found = value.match(expr);
    isSecured = found && found.length > 0 ? false : true;
    if (!isSecured) {
      throw this.createError({
        path: `${path}`,
        message
      });
    }
    return true;
  });
});

Yup.addMethod(Yup.object, "uniqueProperty", function (propertyName, message) {
  return this.test("unique", message, function (value) {
    if (!value || !value[propertyName]) {
      return true;
    }

    const { path } = this;
    const options = [...this.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      });
    }

    return true;
  });
});

Yup.addMethod(Yup.object, "uniqueProperties", function (propertyName1, propertyName2, message) {


  return this.test("unique", message, function (value) {
    if (!value || !value[propertyName1] || !value[propertyName2]) {
      return true;
    }

    const { path } = this;
    const options = [...this.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (subOptions.some(option => option[propertyName1] === value[propertyName1] && option[propertyName2] === value[propertyName2])) {

      throw this.createError({
        path: `${path}.${propertyName2}`,
        message
      });
    }

    return true;
  });
});
Yup.addMethod(Yup.string, 'validateIban', function (message) {
  return this.test('validateIban', message, function (value) {
    if (!value) return true;

    const { path } = this;

    if (  !IBAN.isValid(value)) {
      throw this.createError({
        path: `${path}`,
        message
      });
    }
    return true;
  });
});
export default Yup;