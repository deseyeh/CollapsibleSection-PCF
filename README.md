# 🧩 Collapsible Section PCF Control – Release Notes 

## Overview  
The **Collapsible Section PCF Control** introduces a  flexible way to organize fields within **model-driven forms** in **Microsoft Dynamics 365** and the **Power Platform**. This control enhances user experience by enabling collapsible and expandable sections, reducing visual clutter and focusing user attention on relevant areas.


---

## ✨ Key Features

- ✅ **Toggle collapsible/expandable behavior** to show or hide form sections interactively.
- 🧩 **Dynamic field visibility** — specify fields to automatically hide or show based on the section’s state.
- 🎨 **Highly customizable** appearance:
  - Label text and icon  
  - Text size, weight, and color  
  - Background color and hover color  
  - Padding and layout options  
- 📐 **Configurable directly in the Form Designer** using control properties.
- 🎨 Uses **Fluent UI** for consistent look-and-feel across Power Platform components.

---

## 🚀 Example
![Sample Image](https://github.com/deseyeh/CollapsibleSection/blob/main/assset/CollapsibleEx.gif)
 
---

## ✅ Best Practices

**Do:**
- ✔️ Use to organize long forms by grouping related fields (e.g., “Address Info”, “Employment History”) into logical sections.
- ✔️ Configure styling options
- ✔️ Use control properties to define field visibility rules depending on the Control's placeholder field state ( Yes/No Choice).

**Don’t:**
- ❌ Overuse collapsible sections on a single form — too many can overwhelm users.
- ❌ Use vague or unclear section labels; ensure labels are descriptive (e.g., "Work Info", not "Section 1").
- ❌ Hide required fields using this control.  
  However, you **can display a Control Notification** in the header if there are required fields within a collapsible section.

---

## 🛠️ Adding Control to Form
 
![Sample Image](https://github.com/deseyeh/CollapsibleSection/blob/main/assset/CollapsibleControl.gif)


## 🛠️ Adding Control Notifications to the Collapsible Header Field

If your collapsible section hides required fields, you must inform users that a required field is empty. This can be done by setting a **Control Notification** on the **header field** ( Yes/No toggle).

### 🔧 Assumptions:

- The **Yes/No field** (e.g., `new_showsection`) is used as the control’s anchor in the header.
- There is a **required field** (e.g., `emailaddress1`) inside the collapsible section.
- You want to **display a notification** on the header field if the required field is empty.

### ✅ Example JavaScript: Show Notification on Header Control

```javascript
function onLoad(executionContext) {
    const formContext = executionContext.getFormContext();

    // Run check on form load
    validateRequiredFields(formContext);

    // Attach onchange handler to the required field
    formContext.getAttribute("emailaddress1").addOnChange(() => {
        validateRequiredFields(formContext);
    });
}

function validateRequiredFields(formContext) {
    const emailAttr = formContext.getAttribute("emailaddress1");
    const headerControl = formContext.getControl("new_showsection");

    const emailValue = emailAttr.getValue();
    const notificationId = "email_required_warning";

    if (!emailValue) {
        headerControl.setNotification("Email is required in the collapsed section.", notificationId);
    } else {
        headerControl.clearNotification(notificationId);
    }
}
