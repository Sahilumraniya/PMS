export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  assignees: string[];
  comments: number;
  files: number;
  dueDate?: string;
  status: 'todo' | 'inProgress' | 'done' | string;
}
