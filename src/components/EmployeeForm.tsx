import React, { useState } from "react";
import { type Employee, type FormErrors } from "../types/employee";
import { FormInput } from "./FormInput";
import { ValidationMessage } from "./ValidationMessage";

const SKILL_OPTIONS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "CSS",
];
const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing", "Sales"];
const LOCATIONS = ["New York", "London", "Bengaluru", "Remote", "Tokyo"];

const initialFormState: Employee = {
  id: "",
  fullName: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  department: "",
  employmentType: "",
  skills: [],
  experience: "",
  salary: "",
  joiningDate: "",
  workLocation: "",
  profileDescription: "",
  profilePhoto: "",
};

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
}

export const EmployeeForm = ({
  onSubmit,
  editingEmployee,
  onCancelEdit,
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>(
    editingEmployee || initialFormState,
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const [prevEditingEmployee, setPrevEditingEmployee] =
    useState<Employee | null>(editingEmployee);

  if (editingEmployee !== prevEditingEmployee) {
    setPrevEditingEmployee(editingEmployee);
    setFormData(editingEmployee || initialFormState);
    setErrors({});
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Employee]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      const updatedSkills = exists
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
    if (errors.skills) setErrors((prev) => ({ ...prev, skills: undefined }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "Only JPEG or PNG images are allowed",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "File size must be under 2MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: reader.result as string,
      }));
      setErrors((prev) => ({ ...prev, profilePhoto: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = "Full name required (min 3 characters)";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name can only contain letters and spaces";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 18) newErrors.dob = "Employee must be at least 18 years old";
    }

    if (!formData.gender) newErrors.gender = "Select a gender";
    if (!formData.department) newErrors.department = "Select a department";
    if (!formData.employmentType)
      newErrors.employmentType = "Select an employment type";
    if (formData.skills.length === 0)
      newErrors.skills = "Select at least one skill";

    if (formData.experience === "" || Number(formData.experience) < 0) {
      newErrors.experience = "Experience cannot be negative";
    }

    if (formData.salary === "" || Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be a positive number";
    }

    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required";
    if (!formData.workLocation)
      newErrors.workLocation = "Select a work location";

    if (
      !formData.profileDescription ||
      formData.profileDescription.length < 10
    ) {
      newErrors.profileDescription =
        "Profile description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      id: formData.id || Date.now().toString(),
    });

    setFormData(initialFormState);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>
        {editingEmployee ? "Edit Employee Details" : "Employee Registration"}
      </h2>

      <div className="form-grid">
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormInput
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          required
        />

        <FormInput
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
          required
        />

        <div className="form-group">
          <label>
            Gender <span className="required">*</span>
          </label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
          <ValidationMessage message={errors.gender} />
        </div>

        <div className="form-group">
          <label>
            Department <span className="required">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <ValidationMessage message={errors.department} />
        </div>

        <div className="form-group">
          <label>
            Employment Type <span className="required">*</span>
          </label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <ValidationMessage message={errors.employmentType} />
        </div>

        <div className="form-group">
          <label>
            Skills <span className="required">*</span>
          </label>
          <div className="checkbox-group">
            {SKILL_OPTIONS.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
          <ValidationMessage message={errors.skills} />
        </div>

        <FormInput
          label="Experience (Years)"
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          required
        />

        <FormInput
          label="Salary ($)"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          error={errors.salary}
          required
        />

        <FormInput
          label="Joining Date"
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          error={errors.joiningDate}
          required
        />

        <div className="form-group">
          <label>
            Work Location <span className="required">*</span>
          </label>
          <select
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ValidationMessage message={errors.workLocation} />
        </div>
      </div>

      <div className="form-group full-width">
        <label>
          Profile Description <span className="required">*</span>
        </label>
        <textarea
          name="profileDescription"
          rows={3}
          value={formData.profileDescription}
          onChange={handleChange}
        />
        <ValidationMessage message={errors.profileDescription} />
      </div>

      <div className="form-group full-width">
        <label>Profile Photo (Max 2MB, JPG/PNG)</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handlePhotoUpload}
        />
        <ValidationMessage message={errors.profilePhoto} />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingEmployee ? "Update Employee" : "Register Employee"}
        </button>
        {editingEmployee && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
