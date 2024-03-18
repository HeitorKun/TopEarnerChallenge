
export interface ITaskRepository {
  submitTask(data: {
    id: string;
    transactionIDs: string[];
  }): Promise<TaskSubmissionStatus>;
}

export enum TaskSubmissionStatus {
  Success = "Success",
  Failure = "Failure"
}
