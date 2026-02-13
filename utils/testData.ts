export function generateEmployeeData(branch: string, role: string) {
  const ts = Date.now() + Math.floor(Math.random() * 1000);

  return {
    branch,
    role,
    name: `AutoEmp_${role}_${ts}`,
    mobile: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
    email: `auto${role}${ts}@test.com`,
    dailySalary: "0",
    monthlySalary: "0",
    password: process.env.EMP_DEFAULT_PASSWORD || "Test@123",
  };
}
