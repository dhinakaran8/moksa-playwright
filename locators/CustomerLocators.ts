// locators/customerLocators.ts
export const CustomerLocators = {
  // Navigation
  customerModule: "//a[@href*='customer'] | //a[contains(text(),'Customer')]",
  customerMenuItem:
    "//a[contains(text(),'Customer')] | //span[contains(text(),'Customer')] | //li[contains(text(),'Customer')]",

  // Customer List Page
  customerListContainer:
    ".customer-list, [data-testid='customer-list'], .data-table",
  createCustomerButton: " //a[contains(text(),'Create Customer')]",
  addNewCustomerButton:
    "//button[contains(text(),'New')] | //button[contains(text(),'Add Customer')] | .add-customer",
  searchCustomer: "//input[@type='search']",
  customerTable:
    "table, .dataTable, #customer-table_wrapper table, [data-testid='customer-table']",
  customerRows: "tbody tr, .customer-row, [data-testid='customer-row']",

  // Create Customer Form
  createCustomerForm:
    "form, .customer-form, .create-form, [data-testid='customer-form']",
  formTitle: "h1, h2, .form-title, .modal-title, [data-testid='form-title']",

  // Mandatory Form Fields (marked with *)
  nameInput:
    "input[placeholder='Enter Name'], input[name*='name'], input[id*='name'], textbox[name='Customer Name *']",
  mobileInput:
    "input[placeholder='Enter Mobile Number'], input[name*='mobile'], input[id*='phone'], textbox[name='Mobile Number *']",

  // Optional Form Fields
  firstNameInput:
    "input[name*='first_name'], input[id*='first_name'], input[placeholder*='First Name'], [data-testid='customer-firstname']",
  lastNameInput:
    "input[name*='last_name'], input[id*='last_name'], input[placeholder*='Last Name'], [data-testid='customer-lastname']",
  emailInput:
    "//input[@placeholder='Enter Email'] | input[name*='email'], input[id*='email'], input[placeholder*='email'], input[type='email'], [data-testid='customer-email']",
  dobInput:
    "//input[@placeholder='Enter Date of Birth'] | input[name*='dob'], input[id*='dob'], input[placeholder*='Date of Birth'], input[type='date'], [data-testid='customer-dob']",

  // Status and Settings
  statusCheckbox:
    "input[name*='status'], input[id*='status'], input[type='checkbox'], [data-testid='customer-status']",
  profileImageUpload:
    "input[type='file'], input[name*='image'], input[name*='photo'], [data-testid='customer-photo']",

  // Form Buttons
  submitButton: "//button[@type='submit']",
  cancelButton:
    "//button[contains(text(),'Cancel')] | //button[contains(text(),'Close')] | .cancel-btn, [data-testid='cancel-customer']",
  resetButton:
    "//button[contains(text(),'Reset')] | //button[contains(text(),'Clear')] | .reset-btn, [data-testid='reset-customer']",

  // Customer Actions
  editButton:
    "//a[contains(text(),'Edit')] | //button[contains(text(),'Edit')] | .edit-btn, [data-testid='edit-customer']",
  deleteButton:
    "//a[contains(text(),'Delete')] | //button[contains(text(),'Delete')] | .delete-btn, [data-testid='delete-customer']",
  viewButton:
    "//a[contains(text(),'View')] | //button[contains(text(),'View')] | .view-btn, [data-testid='view-customer']",

  // Customer Details Page
  customerProfile:
    ".customer-profile, .customer-details, [data-testid='customer-profile']",
  customerName: ".customer-name, [data-testid='customer-name-display']",
  customerMobile:
    ".customer-mobile, .customer-phone, [data-testid='customer-mobile-display']",
  customerEmail: ".customer-email, [data-testid='customer-email-display']",

  // Messages and Notifications
  successMessage: "//div[@role='alert']",
  errorMessage:
    ".error, .alert-error, [data-testid='error-message'], .toast-error",
  warningMessage:
    ".warning, .alert-warning, [data-testid='warning-message'], .toast-warning",

  // Loading and State
  loadingSpinner: ".loading, .spinner, [data-testid='loading'], .fa-spinner",
  loadingOverlay:
    ".loading-overlay, .backdrop, [data-testid='loading-overlay']",

  // Pagination and Search
  pagination: ".pagination, [data-testid='pagination']",
  nextPageButton: ".next, .pagination-next, [data-testid='next-page']",
  previousPageButton: ".prev, .pagination-prev, [data-testid='prev-page']",

  // Validation Messages
  fieldErrors:
    ".field-error, .input-error, [class*='field-error'], [data-testid='field-error']",
  validationMessage:
    ".validation-error, .error-text, [data-testid='validation-error']",
};
