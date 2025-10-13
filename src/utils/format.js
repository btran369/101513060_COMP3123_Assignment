export function formatUserResponse(user) {
  return {
    message: "User created successfully.",
    user_id: user._id.toString(),
  };
}

export function formatLoginResponse(token) {
  const res = { message: "Login successful." };
  if (token) res.jwt_token = token;
  return res;
}

export function formatEmployee(emp) {
  return {
    employee_id: emp._id.toString(),
    first_name: emp.first_name,
    last_name: emp.last_name,
    email: emp.email,
    position: emp.position,
    salary: emp.salary,
    date_of_joining: emp.date_of_joining,
    department: emp.department,
  };
}
