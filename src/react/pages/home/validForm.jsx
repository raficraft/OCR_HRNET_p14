export const validForm = (input) => {
  const thisItem = input.current.input;

  const thisInput = {
    item: thisItem,
    name: thisItem.getAttribute("name"),
    format: thisItem.getAttribute("data-format"),
    type: thisItem.getAttribute("type")
      ? thisItem.getAttribute("type")
      : "select",
    value: thisItem.value ? thisItem.value : thisItem.textContent,
    error: null,
  };

  switch (thisInput.format) {
    case "alphabetical":
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "alphanumeric":
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "date":
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "numeric":
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "select":
      if (thisInput.name === "state") {
        thisInput.error =
          thisInput.value === "Select a State"
            ? "Champs obligatoire"
            : thisInput.error;
      }

      if (thisInput.name === "department") {
        thisInput.error =
          thisInput.value === "Select a Department"
            ? "Champs obligatoire"
            : thisInput.error;
      }

      break;

    default:
      return thisInput.error;
  }

  return thisInput.error;
};
