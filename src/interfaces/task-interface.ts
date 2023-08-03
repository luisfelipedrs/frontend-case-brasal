export interface Task {
    _id: string;
    description: string;
    completed: boolean;
}

export interface ApiResponse {
    docs: Task[];
    totalPages: number;
}