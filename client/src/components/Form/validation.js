export default function validation(inputs) {
  const errors = {};
  const urlRegex = /(https?:\/\/.*\.(?:png|jpeg|jpg))/i; //Expresión regular para verificar una url solamente de imágenes
  const letraRegex = /^[A-Za-z\s]+$/; //Expresión regular para verificar que un texto no tenga números ni símbolos

  if (!letraRegex.test(inputs.title)) {
    errors.title = "The name cannot contain symbols or numbers";
  }
  if (inputs.title.trim().length === 0) {
    errors.title = "Required field";
  }
  if (!urlRegex.test(inputs.image)) {
    errors.image = "Invalid URL ";
  }
  if (!inputs.summary.trim().length >= 1) {
    errors.summary = "Required field";
  }
  if (!inputs.summary.trim().length > 500) {
    errors.summary = "Maximum limit exceeded";
  }
  // if ((inputs.diets.length = 0)) {
  //   errors.diet = "Choose at least one diet";
  // }

  return errors;
}
