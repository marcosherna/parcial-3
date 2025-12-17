import { FirebaseCrudService } from "./FirebaseCrudService";
export const getCollectionName = (Userslug, colectionName) =>
  `${Userslug}-${colectionName}`;

export const COLLECTION_NAME = {
  TASK: "task",
};

export const TaskService = new FirebaseCrudService(COLLECTION_NAME.TASK);
