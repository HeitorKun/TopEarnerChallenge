import axios from "axios";
import {
  ITaskRepository,
  TaskSubmissionStatus,
} from "../../../repositories/task/TaskRepository";

export class TaskSubmissionAPIRepository implements ITaskRepository {
  async submitTask(data: {
    id: string;
    transactionIDs: string[];
  }): Promise<TaskSubmissionStatus> {
    try {
      const url = process.env.API_URL_POST as string;
      data;
      await axios.post(url, {
        id: data.id,
        result: data.transactionIDs,
      });

      return TaskSubmissionStatus.Success;
    } catch (error: any) {
      return TaskSubmissionStatus.Failure;
    }
  }
}
