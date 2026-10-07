# Employee Management System

A React + TypeScript application built with Vite that demonstrates complete form handling, custom validation, responsive table rendering, CRUD operations, duplicate checks, and LocalStorage browser persistence.

---

## 🚀 Features

- **Dynamic Form Handling:** Controlled inputs supporting text, email, dates, radio buttons, select dropdowns, multi-checkboxes, textareas, and image uploads.
- **Strict Validation:** Real-time and submit-level error checking (e.g., minimum age of 18, 10-digit phone numbers, file size checks)[cite: 9].
- **Duplicate Prevention:** Prevents registering duplicate employee records by checking unique email and mobile numbers.
- **CRUD Operations:** Real-time Create, Read, Update, and Delete actions with feedback notifications and confirmation prompts.
- **Browser Persistence:** Automatically saves all employee entries as JSON in browser `localStorage` and loads them on startup.
- **Reusable Component Architecture:** Clean separation of concerns with TypeScript interface safety[cite: 9, 10].

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── EmployeeForm.tsx       # Form component with validation logic
│   ├── EmployeeRow.tsx        # Individual table row render component
│   ├── EmployeeTable.tsx      # Table container and empty state view
│   ├── FormInput.tsx          # Reusable input field wrapper
│   └── ValidationMessage.tsx  # Error message display component
├── types/
│   └── employee.ts            # TypeScript interfaces and form types
├── App.tsx                    # Root component handling state & CRUD logic
├── App.css                    # Global application layout and styles
└── main.tsx                   # Application entry point
```
