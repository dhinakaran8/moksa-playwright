export const FilterLocators = {
  // Login Elements
  emailInput: "//input[@placeholder='Enter Email']",
  passwordInput: "//input[@placeholder='Enter Password']",
  loginButton: "//button[contains(text(),'Sign In')]",

  // Navigation Menu Links
  employeesMenu:
    "//a[contains(@href,'/employees') or contains(text(),'Employees')]",
  customersMenu:
    "//a[contains(@href,'/customer') or contains(text(),'Customers')]",
  paymentsMenu:
    "//a[contains(@href,'/payments') or contains(text(),'Payments')]",
  sessionsMenu:
    "//a[contains(@href,'/session') or contains(text(),'Sessions')]",
  schedulesMenu:
    "//a[contains(@href,'/schedule') or contains(text(),'Schedules')]",
  customerProgramsMenu:
    "//a[contains(@href,'/customer_programs') or contains(text(),'Customer Programs')]",
  customerAttendanceMenu:
    "//a[contains(@href,'/customer-attendance') or contains(text(),'Customer Attendance')]",
  expensesMenu:
    "//a[contains(@href,'/expenses') or contains(text(),'Expenses')]",
  accountsMenu:
    "//a[contains(@href,'/accounts') or contains(text(),'Accounts Overview')]",
  availableTrainersMenu:
    "//a[contains(@href,'/available-trainers') or contains(text(),'Available Trainers')]",

  // Basic Filter Controls - Universal across modules
  searchInput:
    "//input[@type='search'] | //input[contains(@placeholder,'Search')]",
  searchBox:
    "//input[following-sibling::text()[contains(.,'Search:')] or preceding-sibling::text()[contains(.,'Search:')]]",
  entriesDropdown:
    "//select[preceding-sibling::text()[contains(.,'Show')] or contains(@name,'length') or contains(@name,'entries')]",
  entriesLabel: "//text()[contains(.,'Show')] | //label[contains(.,'entries')]",

  // Pagination Controls
  previousButton:
    "//a[contains(text(),'Previous') or contains(@class,'previous') or contains(@aria-label,'Previous')]",
  nextButton:
    "//a[contains(text(),'Next') or contains(@class,'next') or contains(@aria-label,'Next')]",
  firstPageButton:
    "//a[contains(text(),'1') or contains(@aria-label,'page 1')]",
  lastPageButton: "//a[contains(@class,'page-link')][position()=last()-1]",
  pageNumbers:
    "//a[contains(@class,'page-link') or parent::*[contains(@class,'pagination')]]",
  paginationInfo:
    "//div[contains(text(),'Showing') or contains(text(),'entries')] | //*[contains(@class,'dataTables_info')]",
  paginationControls:
    "//div[contains(@class,'dataTables_paginate')] | //*[contains(@class,'pagination')]",

  // Table Sorting Headers
  nameColumnHeader:
    "//th[contains(text(),'Name') or contains(@data-column,'name')]",
  emailColumnHeader:
    "//th[contains(text(),'Email') or contains(@data-column,'email')]",
  phoneColumnHeader:
    "//th[contains(text(),'Phone') or contains(@data-column,'phone')]",
  dateColumnHeader:
    "//th[contains(text(),'Date') or contains(@data-column,'date')]",
  createdAtHeader:
    "//th[contains(text(),'Created At') or contains(@data-column,'created')]",
  statusColumnHeader:
    "//th[contains(text(),'Status') or contains(@data-column,'status')]",
  sortableHeaders:
    "//th[contains(@class,'sorting') or @title[contains(.,'sort')] or contains(@aria-sort,'')]",
  ascSortIndicator:
    "//th[contains(@class,'sorting_asc') or contains(@aria-sort,'ascending')]",
  descSortIndicator:
    "//th[contains(@class,'sorting_desc') or contains(@aria-sort,'descending')]",
  neutralSortIndicator:
    "//th[contains(@class,'sorting') and not(contains(@class,'_asc')) and not(contains(@class,'_desc'))]",

  // Advanced Filter Panel
  toggleFiltersButton:
    "//button[contains(text(),'Toggle Filters') or contains(@class,'toggle-filter')]",
  advancedFiltersSection:
    "//div[preceding-sibling::h5[contains(text(),'Advanced Filters')] or contains(@class,'filter-panel')]",
  advancedFiltersHeading:
    "//h5[contains(text(),'Advanced Filters')] | //h6[contains(text(),'Advanced Filters')]",
  resetButton:
    "//button[contains(text(),'Reset') and not(contains(text(),'Password'))] | //a[contains(text(),'Reset')]",
  applyFiltersButton:
    "//button[contains(text(),'Apply Filters') or contains(text(),'Apply Filter')]",
  clearAllFiltersButton:
    "//button[contains(text(),'Clear') or contains(text(),'Clear All')]",

  // Date Range Filter Controls
  fromDateInput:
    "//input[@placeholder='From Date' or contains(@placeholder,'from') or contains(@id,'from') or @name='from_date'] | //input[preceding-sibling::*[contains(text(),'From Date')]]",
  toDateInput:
    "//input[@placeholder='To Date' or contains(@placeholder,'to') or contains(@id,'to') or @name='to_date'] | //input[preceding-sibling::*[contains(text(),'To Date')]]",
  dateRangeLabel:
    "//div[contains(text(),'Date Range') or contains(text(),'Payment Date Range')]",
  paymentDateRange:
    "//h6[contains(text(),'Date:')] | //div[contains(text(),'Date:')]",
  calendarIcon:
    "//i[contains(@class,'calendar') or contains(@class,'date')] | //*[contains(@class,'fa-calendar')]",

  // Select2 Dropdown Containers (Premium dropdowns)
  programTypeSelect2:
    "//span[@id='select2-program_type-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Program Type')]]",
  programModeSelect2:
    "//span[@id='select2-program_mode-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Program Mode')]]",
  programSelect2:
    "//span[@id='select2-program-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Program')]]",
  paymentTypeSelect2:
    "//span[@id='select2-payment_type-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Payment Type')]]",
  branchSelect2:
    "//span[@id='select2-branch-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Branch')]]",
  trainerSelect2:
    "//span[@id='select2-trainer-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Trainer')]]",
  timeSlotSelect2:
    "//span[@id='select2-time_slot-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Time Slot')]]",
  customerSelect2:
    "//span[@id='select2-customer-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Customer')]]",
  expenseTypeSelect2:
    "//span[@id='select2-expense_type-container'] | //span[contains(@class,'select2-selection') and preceding-sibling::*[contains(text(),'Type')]]",

  // Select2 Interaction Elements
  select2SearchField:
    "//input[contains(@class,'select2-search__field')] | //input[contains(@class,'select2-search-field')]",
  select2Results:
    "//ul[contains(@class,'select2-results')] | //div[contains(@class,'select2-results')]",
  select2Option:
    "//li[contains(@class,'select2-results__option')] | //*[contains(@class,'select2-option')]",
  select2Loading:
    "//li[contains(@class,'select2-results__message') and contains(text(),'Loading')]",
  select2NoResults:
    "//li[contains(@class,'select2-results__message') and contains(text(),'No results')]",

  // Tab Navigation Controls
  regularProgramTab:
    "//button[contains(@class,'tab') and contains(text(),'Regular Program')] | //*[@role='tab' and contains(text(),'Regular')]",
  specialProgramTab:
    "//button[contains(@class,'tab') and contains(text(),'Special Program')] | //*[@role='tab' and contains(text(),'Special')]",
  groupTab:
    "//button[contains(@class,'tab') and contains(text(),'Group')] | //*[@role='tab' and contains(text(),'Group')]",
  personalTab:
    "//button[contains(@class,'tab') and contains(text(),'Personal')] | //*[@role='tab' and contains(text(),'Personal')]",
  activeTab:
    "//button[contains(@class,'active') or @aria-selected='true'] | //*[@role='tab' and contains(@class,'active')]",
  tabContent:
    "//div[contains(@class,'tab-content') or contains(@class,'tab-pane')]",

  // Status Filter Buttons (Customer Programs Module)
  enquiredStatusBtn:
    "//button[contains(text(),'Enquired')] | //*[contains(@class,'status-filter') and contains(text(),'Enquired')]",
  pendingPaymentBtn:
    "//button[contains(text(),'Pending Payment')] | //*[contains(@class,'status-filter') and contains(text(),'Pending')]",
  notStartedBtn:
    "//button[contains(text(),'Not Started')] | //*[contains(@class,'status-filter') and contains(text(),'Not Started')]",
  activeStatusBtn:
    "//button[contains(text(),'Active')] | //*[contains(@class,'status-filter') and contains(text(),'Active')]",
  renewalPaymentBtn:
    "//button[contains(text(),'Renewal Payment')] | //*[contains(@class,'status-filter') and contains(text(),'Renewal')]",
  completedStatusBtn:
    "//button[contains(text(),'Completed')] | //*[contains(@class,'status-filter') and contains(text(),'Completed')]",
  closedStatusBtn:
    "//button[contains(text(),'Closed')] | //*[contains(@class,'status-filter') and contains(text(),'Closed')]",
  cancelledStatusBtn:
    "//button[contains(text(),'Cancelled')] | //*[contains(@class,'status-filter') and contains(text(),'Cancelled')]",
  statusFilterGroup:
    "//div[contains(@class,'status-filters')] | //ul[contains(@class,'status-pills')]",

  // Time-Based Filter Controls (Available Trainers Module)
  startTimeInput:
    "//input[preceding-sibling::div[contains(text(),'Start Time')] or @placeholder[contains(.,'Start Time')]]",
  endTimeInput:
    "//input[preceding-sibling::div[contains(text(),'End Time')] or @placeholder[contains(.,'End Time')]]",
  filterButton:
    "//button[contains(text(),'Filter') and not(contains(text(),'Toggle'))] | //input[@type='submit' and @value='Filter']",
  resetLink:
    "//a[contains(text(),'Reset')] | //button[contains(text(),'Reset') and contains(@class,'link')]",
  timeFilterForm:
    "//form[contains(@class,'time-filter')] | //div[contains(@class,'time-filter-container')]",

  // Customer Selection Controls (Attendance Module)
  customerSearchInput:
    "//input[@placeholder[contains(.,'Customer')] or preceding-sibling::div[contains(text(),'Customer')]]",
  allCustomersOption:
    "//span[contains(text(),'All Customers')] | //*[contains(@value,'all') and contains(text(),'Customer')]",
  customerDropdownList:
    "//ul[contains(@class,'select2-results')] | //div[contains(@class,'customer-list')]",
  selectedCustomer:
    "//span[contains(@class,'select2-selection__rendered')] | //*[contains(@class,'selected-customer')]",

  // Export and Import Functionality
  exportDataButton:
    "//button[contains(text(),'Export Data')] | //a[contains(@href,'export') or contains(text(),'Export')]",
  exportExcelButton:
    "//button[contains(text(),'Export to Excel')] | //a[contains(@href,'excel') or contains(text(),'Excel')]",
  exportPDFButton:
    "//button[contains(text(),'Export to PDF')] | //a[contains(@href,'pdf') or contains(text(),'PDF')]",
  importButton:
    "//button[contains(text(),'Import')] | //a[contains(@href,'import') or contains(text(),'Import')]",
  downloadLink:
    "//a[contains(@href,'download') or contains(text(),'Download')]",

  // Data Table Elements and Structure
  dataTable:
    "(//table[contains(@class,'dataTable')])[1] | //table[@id[contains(.,'table')]][1] | (//table[contains(@class,'table')])[1]",
  tableContainer:
    "//div[contains(@class,'dataTables_wrapper')] | //div[contains(@class,'table-responsive')]",
  tableBody: "//table//tbody | //tbody",
  tableHeader: "//table//thead | //thead",
  tableRows:
    "//table//tbody/tr[not(contains(@class,'odd') and contains(td,'No data available'))] | //tbody/tr[not(contains(@class,'no-data'))]",
  tableColumns: "//table//tbody/tr/td | //tbody/tr/td",
  noDataRow:
    "//td[contains(text(),'No data available in table')] | //tr[contains(@class,'no-data')]",
  emptyStateMessage:
    "//div[contains(text(),'No entries found')] | //*[contains(@class,'empty-state')]",
  loadingTableRow:
    "//tr[contains(@class,'loading')] | //td[contains(text(),'Loading')]",
  firstDataRow: "//table//tbody/tr[1] | //tbody/tr[position()=1]",
  lastDataRow: "//table//tbody/tr[last()] | //tbody/tr[position()=last()]",

  // Results Summary and Financial Displays
  totalAmountDisplay:
    "//h6[contains(text(),'Total Amount:')] | //*[contains(@class,'total-amount')]",
  totalCreditDisplay:
    "//h4[contains(text(),'₹') and preceding-sibling::p[contains(text(),'Total Credit')]] | //*[contains(@class,'total-credit')]",
  totalDebitDisplay:
    "//h4[contains(text(),'₹') and preceding-sibling::p[contains(text(),'Total Debit')]] | //*[contains(@class,'total-debit')]",
  remainingBalanceDisplay:
    "//h3[contains(text(),'₹') and preceding-sibling::p[contains(text(),'Remaining Balance')]] | //*[contains(@class,'remaining-balance')]",
  recordCountDisplay:
    "//span[contains(@class,'info') or contains(text(),'entries')] | //*[contains(@class,'record-count')]",
  summaryCards:
    "//div[contains(@class,'summary-card')] | //*[contains(@class,'financial-summary')]",

  // Page Structure and Navigation Elements
  pageTitle: "(//h4 | //h1 | //*[contains(@class,'page-title')])[1]",
  pageSubtitle: "(//h5 | //h6 | //*[contains(@class,'page-subtitle')])[3]",
  breadcrumbHome:
    "//a[contains(text(),'Home')] | //nav//a[contains(@href,'dashboard')]",
  breadcrumbCurrent:
    "//li[contains(@class,'breadcrumb-item') and not(./a)] | //*[contains(@class,'breadcrumb-active')]",
  breadcrumbNavigation:
    "//nav[@aria-label='breadcrumb'] | //*[contains(@class,'breadcrumb')]",
  backButton:
    "//a[contains(@class,'back')] | //button[contains(@class,'back')]",

  // Action Buttons and Controls
  createButton:
    "//a[contains(text(),'Create') or contains(@href,'/create')] | //button[contains(text(),'Create')]",
  editButton:
    "//a[contains(text(),'Edit')] | //button[contains(text(),'Edit')]",
  deleteButton:
    "//a[contains(text(),'Delete')] | //button[contains(text(),'Delete')]",
  viewButton:
    "//a[contains(text(),'View')] | //button[contains(text(),'View')]",
  saveButton:
    "//button[contains(text(),'Save')] | //input[@type='submit' and @value='Save']",
  cancelButton:
    "//button[contains(text(),'Cancel')] | //a[contains(text(),'Cancel')]",
  generateSchedulesButton:
    "//a[contains(text(),'Generate') and contains(text(),'Schedules')] | //button[contains(text(),'Generate Schedules')]",

  // Loading States and Progress Indicators
  loadingSpinner:
    "//div[contains(@class,'loading') or contains(@class,'spinner')] | //*[contains(@class,'fa-spinner')]",
  loadingOverlay:
    "//div[contains(@class,'overlay')] | //*[contains(@class,'loading-overlay')]",
  progressBar:
    "//div[contains(@class,'progress')] | //*[contains(@class,'progress-bar')]",
  disabledButton:
    "//button[@disabled] | //*[@disabled and contains(@class,'btn')]",
  enabledButton:
    "//button[not(@disabled)] | //*[not(@disabled) and contains(@class,'btn')]",

  // Filter State Indicators
  activeFilterIndicator:
    "//button[contains(@class,'active') or contains(@class,'applied')] | //*[contains(@class,'filter-active')]",
  filterBadge:
    "//span[contains(@class,'badge')] | //*[contains(@class,'filter-count')]",
  appliedFiltersCount:
    "//*[contains(@class,'applied-filters')] | //span[contains(text(),'filters applied')]",
  clearFiltersLink:
    "//a[contains(text(),'Clear')] | //button[contains(text(),'Clear Filters')]",

  // Multi-select Type Filter (Accounts Overview Module)
  typeListbox:
    "//div[@role='listbox'] | //div[contains(@class,'multi-select')]",
  regularProgramsOption:
    "//span[contains(text(),'Regular Programs')] | //*[contains(@value,'regular') and contains(text(),'Program')]",
  specialProgramsOption:
    "//span[contains(text(),'Special Programs')] | //*[contains(@value,'special') and contains(text(),'Program')]",
  expensesOption:
    "//span[contains(text(),'Expenses')] | //*[contains(@value,'expenses')]",
  typeSearchInput:
    "//input[@placeholder='Search' and ancestor::div[preceding-sibling::div[contains(text(),'Type')]]] | //*[contains(@class,'type-search')]",
  checkboxOption:
    "//input[@type='checkbox'] | //*[contains(@class,'checkbox')]",

  // Alert Messages and Notifications
  successAlert:
    "//div[contains(@class,'alert-success') or contains(@class,'success')] | //*[contains(@class,'notification-success')]",
  errorAlert:
    "//div[contains(@class,'alert-danger') or contains(@class,'error')] | //*[contains(@class,'notification-error')]",
  warningAlert:
    "//div[contains(@class,'alert-warning') or contains(@class,'warning')] | //*[contains(@class,'notification-warning')]",
  infoAlert:
    "//div[contains(@class,'alert-info') or contains(@class,'info')] | //*[contains(@class,'notification-info')]",
  validationError:
    "//span[contains(@class,'invalid-feedback') or contains(@class,'error-message')] | //*[contains(@class,'field-error')]",
  toastNotification:
    "//div[contains(@class,'toast')] | //*[contains(@class,'notification-toast')]",

  // Form Elements and Validation
  formContainer:
    "//form[contains(@class,'filter-form') or ancestor::div[contains(@class,'filter')]] | //form",
  requiredField: "//input[@required] | //*[contains(@class,'required')]",
  invalidField:
    "//input[contains(@class,'invalid')] | //*[contains(@class,'error')]",
  validField:
    "//input[contains(@class,'valid')] | //*[contains(@class,'success')]",
  fieldLabel: "//label | //*[contains(@class,'form-label')]",
  helpText:
    "//*[contains(@class,'help-text')] | //small[contains(@class,'form-text')]",

  // Modal Dialogs and Popups
  modalDialog:
    "//div[contains(@class,'modal') and contains(@class,'show')] | //*[@role='dialog']",
  modalHeader:
    "//div[contains(@class,'modal-header')] | //*[contains(@class,'dialog-header')]",
  modalBody:
    "//div[contains(@class,'modal-body')] | //*[contains(@class,'dialog-body')]",
  modalFooter:
    "//div[contains(@class,'modal-footer')] | //*[contains(@class,'dialog-footer')]",
  confirmButton:
    "//button[contains(text(),'Confirm') or contains(text(),'Yes')] | //*[contains(@class,'btn-confirm')]",
  closeModalButton:
    "//button[contains(@class,'close')] | //*[contains(@class,'modal-close')]",

  // User Interface Elements
  profileMenu:
    "//img[@alt='profile'] | //a[contains(@class,'profile')] | //*[contains(@class,'user-menu')]",
  logoutButton:
    "//a[contains(text(),'Logout')] | //button[contains(text(),'Logout')]",
  settingsButton:
    "//a[contains(text(),'Settings')] | //button[contains(text(),'Settings')]",
  helpButton:
    "//a[contains(text(),'Help')] | //button[contains(text(),'Help')]",
  themeToggle:
    "//button[contains(@class,'theme')] | //*[contains(@class,'dark-mode')]",

  // Accessibility and Screen Reader Elements
  skipToContent:
    "//a[contains(text(),'Skip to content')] | //*[contains(@class,'skip-link')]",
  ariaLabel: "//*[@aria-label]",
  roleButton: "//*[@role='button']",
  roleLink: "//*[@role='link']",
  roleTablist: "//*[@role='tablist']",
  liveRegion: "//*[@aria-live]",
};
