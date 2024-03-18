
export interface ITaskRepository {
  submitTask(payload: {
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
