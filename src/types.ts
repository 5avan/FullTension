export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  allowMultiple: boolean;
}

export interface Paragraph {
  id: string;
  text: string;
  questions: Question[];
}

export interface UserResponse {
  questionId: string;
  selectedOptionIds: string[];
} 