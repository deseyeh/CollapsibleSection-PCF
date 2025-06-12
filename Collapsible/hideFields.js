// /c:/repos/PCF Controls/CollapsibleSection/Collapsible/hideFields.js

function hideFieldsOnCondition(executionContext) {
  const formContext = executionContext.getFormContext();

  // Field to check
  const doNotSendMMField = "donotsendmm";

  // List of fields to hide
  const fieldsToHide = [
    "cn_clientdirector",
    "hr_secretaryclientdirector",
    "hr_clientcoordinator",
    "hr_clientrelationshipdirector",
    "hr_guardianpartner",
    "cn_newbusinessconsultant"
  ];

  // Check the value of "donotsendmm"
  const doNotSendMMValue = formContext.getAttribute(doNotSendMMField)?.getValue();

  // Hide or show fields based on the value of "donotsendmm"
  fieldsToHide.forEach(fieldName => {
    const control = formContext.getControl(fieldName);
    if (control) {
      control.setVisible(doNotSendMMValue);
    }
  });
}