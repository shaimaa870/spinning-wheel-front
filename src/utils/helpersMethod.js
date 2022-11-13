// ** curently static

import { useLingui } from "@lingui/react";
import * as yup from "yup";
// ** neet to be dynamix
export const checkQuestionHaveOption = (questionType = "") => {
  const questionTypesWithChoices = ["radioButtons", "checkBoxs", "selectBox"];
  return questionTypesWithChoices.includes(questionType);
};

export const getLocalizedObject = (required) => {
  const { i18n } = useLingui();
  let validationTitle = {}
  if (i18n._localeData) {

    Object.keys(i18n._localeData).forEach((key) => {
      required?
      validationTitle[key] = yup.string().required(i18n._(`name_${key}_is_required`)):
      validationTitle[key] = yup.string()
      ;
    })
  }
  return validationTitle;
}
