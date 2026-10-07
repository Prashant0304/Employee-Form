export interface Employee {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "";
  department: "IT" | "HR" | "Finance" | "Marketing" | "Sales" | "";
  employmentType: "Permanent" | "Contract" | "Internship" | "";
  skills: string[];
  experience: number | "";
  salary: number | "";
  joiningDate: string;
  workLocation: string;
  profileDescription: string;
  profilePhoto: string;
}

export type FormErrors = Partial<Record<keyof Employee, string>>;
