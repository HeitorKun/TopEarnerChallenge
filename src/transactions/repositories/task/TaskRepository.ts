
export interface ITaskRepository {
  submitTask(data: {
    id: string;
    transactionIDs: string[];
  }): Promise<TaskSubmissionStatus>;
}

export enum TaskSubmissionStatus {
  Success = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 503
}
