export interface ITaskList {
    id: number;
    name: string;
}

export interface ITask {
    id: number;
    name: string;
    status: string;
    task_list_id: number;
}
