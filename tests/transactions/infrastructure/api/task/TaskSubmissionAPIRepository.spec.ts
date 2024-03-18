import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { TaskSubmissionAPIRepository } from '../../../../../src/transactions/infrastructure/api/task/TaskSubmissionAPIRepository';
import { TaskSubmissionStatus } from '../../../../../src/transactions/repositories/task/TaskRepository';

describe('TaskSubmissionAPIRepository', () => {
    const mockAxios = new AxiosMockAdapter(axios);
    const apiURL = process.env.API_URL_POST;
  
    afterEach(() => {
      mockAxios.reset();
    });
  
    it('should return Success status on 200 response', async () => {
      mockAxios.onPost(apiURL).reply(200);
  
      const repository = new TaskSubmissionAPIRepository();
      const status = await repository.submitTask({
        id: '12345',
        transactionIDs: ['TX_001', 'TX_002'],
      });
  
      expect(status).toBe(TaskSubmissionStatus.Success);
    });
  
    it('should return Failure status on 400 response', async () => {
      mockAxios.onPost(apiURL).reply(400);
  
      const repository = new TaskSubmissionAPIRepository();
      const status = await repository.submitTask({
        id: '12345',
        transactionIDs: ['TX_001', 'TX_002'],
      });
  
      expect(status).toBe(TaskSubmissionStatus.Failure);
    });
  
    it('should return Failure status on 404 response', async () => {
      mockAxios.onPost(apiURL).reply(404);
  
      const repository = new TaskSubmissionAPIRepository();
      const status = await repository.submitTask({
        id: '12345',
        transactionIDs: ['TX_001', 'TX_002'],
      });
  
      expect(status).toBe(TaskSubmissionStatus.Failure);
    });
  
    it('should return Failure status on 503 response', async () => {
      mockAxios.onPost(apiURL).reply(503);
  
      const repository = new TaskSubmissionAPIRepository();
      const status = await repository.submitTask({
        id: '12345',
        transactionIDs: ['TX_001', 'TX_002'],
      });
  
      expect(status).toBe(TaskSubmissionStatus.Failure);
    });
  
    
  });