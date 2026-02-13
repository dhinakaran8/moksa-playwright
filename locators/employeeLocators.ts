// locators/employeeLocators.ts
export const EmployeeLocators = {
  // Navigation
  employeeModule: "//a[@href='https://portal.moksafitness.com/employees']",
  employeeMenuItem:
    "//a[contains(text(),'Employee')] | //span[contains(text(),'Employee')] | //li[contains(text(),'Employee')]",

  // Employee List Page
  employeeListContainer:
    ".employee-list, [data-testid='employee-list'], .data-table",
  createEmployeeButton:
    "//a[@href='https://portal.moksafitness.com/employees/create']",
  addNewEmployeeButton:
    "//button[contains(text(),'New')] | //button[contains(text(),'Add Employee')] | .add-employee",
  searchEmployee:
    "input[placeholder*='search'], input[placeholder*='Search'], .search-input",
  employeeTable:
    "table, .employee-table, .data-grid, [data-testid='employee-table']",
  employeeRows: "tbody tr, .employee-row, [data-testid='employee-row']",

  // Create Employee Form
  createEmployeeForm:
    "form, .employee-form, .create-form, [data-testid='employee-form']",
  formTitle: "h1, h2, .form-title, .modal-title, [data-testid='form-title']",

  // Form Fields
  branchDropdown:
    "select[name*='branch'], select[id*='branch'], .branch-dropdown, [data-testid='branch-dropdown']",
  branchOption: "option[value*='Anandnagar'], option:contains('Anandnagar')",
  branchSelected: ".selected-branch, [data-testid='selected-branch']",

  roleDropdown:
    "select[name*='role'], select[id*='role'], .role-dropdown, [data-testid='role-dropdown']",
  roleOption: "option:not(:disabled):not([value='']):first",
  roleSelected: ".selected-role, [data-testid='selected-role']",

  nameField:
    "input[name*='name'], input[id*='name'], input[placeholder*='name'], [data-testid='employee-name']",
  mobileField:
    "input[name*='mobile'], input[id*='phone'], input[placeholder*='mobile'], input[placeholder*='phone'], [data-testid='employee-mobile']",
  emailField:
    "input[name*='email'], input[id*='email'], input[placeholder*='email'], [data-testid='employee-email']",
  passwordField:
    "input[name*='password'], input[id*='password'], input[placeholder*='password'], [data-testid='employee-password']",

  // Form Buttons
  saveButton:
    "//button[contains(text(),'Save')] | //button[contains(text(),'Create')] | //button[contains(text(),'Submit')] | .save-btn, [data-testid='save-employee']",
  cancelButton:
    "//button[contains(text(),'Cancel')] | //button[contains(text(),'Close')] | .cancel-btn, [data-testid='cancel-employee']",
  resetButton:
    "//button[contains(text(),'Reset')] | //button[contains(text(),'Clear')] | .reset-btn",

  // Success/Error Messages
  successMessage:
    ".success, .alert-success, .toast-success, [data-testid='success-message']",
  errorMessage:
    ".error, .alert-error, .toast-error, [data-testid='error-message']",
  validationError: ".field-error, .validation-error, .invalid-feedback",

  // Loading States
  loadingSpinner: ".spinner, .loading, [data-testid='loading']",
  loadingButton: "button[disabled], .btn-loading",

  // Modal/Dialog
  modal: ".modal, .dialog, .popup, [data-testid='employee-modal']",
  modalOverlay: ".modal-overlay, .backdrop",
  modalCloseButton: ".modal-close, .close-btn, [data-testid='modal-close']",

  // Employee List Items
  employeeNameCell:
    "td:first-child, .employee-name-cell, [data-testid='employee-name-cell']",
  employeeBranchCell:
    "td:nth-child(2), .employee-branch-cell, [data-testid='employee-branch-cell']",
  employeeRoleCell:
    "td:nth-child(3), .employee-role-cell, [data-testid='employee-role-cell']",
  employeeMobileCell:
    "td:nth-child(4), .employee-mobile-cell, [data-testid='employee-mobile-cell']",

  // Pagination
  pagination: ".pagination, .page-navigation",
  nextPageButton: ".page-next, .pagination-next",
  previousPageButton: ".page-previous, .pagination-previous",
  pageNumbers: ".page-number, .pagination-item",

  // Filters
  branchFilter: "select[name*='branch-filter'], .branch-filter",
  roleFilter: "select[name*='role-filter'], .role-filter",
  statusFilter: "select[name*='status-filter'], .status-filter",
};
