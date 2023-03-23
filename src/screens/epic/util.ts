import { useProjectIdUrl } from "screens/kanban/utils";

export const useEpicSearchParams = () => ({ projectId: useProjectIdUrl() });
export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
