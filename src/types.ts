export interface Option {
  id: string;
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
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