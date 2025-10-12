// Member-related types and interfaces
export interface Member {
  id: string; // JSON-server generated ID (primary key)
  email: string;
  books: number[];
  dateOfJoining: string;
  avatar?: string; // Optional URL to avatar image
}

export interface MemberFormData {
  email: string;
  books: number[];
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}
