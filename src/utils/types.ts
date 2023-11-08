export interface DashboardGridCellConfig {
  id: string,
  statType: StatType,
  x: number,
  y: number,
  w: number,
  h: number
}

export interface FinishDeploymentRequest {
  status: 'SUCCESS' | 'FAILED' | 'STARTED';
}

export interface StartDeploymentRequest {
  changeTicketId: string;
  deployer: string;
  deploymentUnitName: string;
  environment: 'DEV' | 'INT' | 'PRS' | 'PRED' | 'PROD';
  platform: 'OPEN_SHIFT' | 'AZURE' | 'WEB_LOGIC';
  version: string;
}

export interface StartDeploymentResponse {
  id: string;
}

export interface PageResponseSasResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: SasResponse[];
}

export interface SasResponse {
  id: string;
  name: string;
}

export interface AppModuleResponse {
  id: string;
  name: string;
  sasId: string;
}

export interface PageResponseAppModuleResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: AppModuleResponse[];
}

export interface PageResponseQualityGateResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: QualityGateResponse[];
}

export interface QualityGateResponse {
  versionId: string;
  deploymentUnitId: string;
  appModuleId: string;
  sasId: string;
  type:
    | 'CODE_COVERAGE'
    | 'XRAY_DOCKER'
    | 'DUPLICATED_LINES'
    | 'MAINTAINABILITY_RATING'
    | 'RELIABILITY_RATING'
    | 'SECURITY_HOTSPOTS_REVIEWED'
    | 'SECURITY_RATING';
  result: 'PASSED' | 'FAILED';
  percent?: number;
  rating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  createdAt: string;
}

export interface DeploymentResponse {
  id: string;
  versionId: string;
  deploymentUnitId: string;
  appModuleId: string;
  sasId: string;
  environment: 'DEV' | 'INT' | 'PRS' | 'PRED' | 'PROD';
  status: 'SUCCESS' | 'FAILED' | 'STARTED';
  changeTicketId: string;
  deployer: string;
  platform: 'OPEN_SHIFT' | 'AZURE' | 'WEB_LOGIC';
  startedAt: string;
  finishedAt?: string;
  duration?: number;
}

export interface PageResponseDeploymentResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: DeploymentResponse[];
}

export interface DeploymentUnitResponse {
  id: string;
  name: string;
  appModuleId: string;
  language: 'JAVASCRIPT' | 'JAVA' | 'KOTLIN' | 'PLSQL' | 'PYTHON' | 'SHELL';
  repositoryUrl: string;
  sasId: string;
}

export interface PageResponseDeploymentUnitResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: DeploymentUnitResponse[];
}

export interface DeploymentUnitVersionResponse {
  id: string;
  version: string;
  gitBranch: string;
  gitCommitHash: string;
  deploymentUnitId: string;
  appModuleId: string;
  sasId: string;
}

export interface PageResponseDeploymentUnitVersionResponse {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: DeploymentUnitVersionResponse[];
}

export enum StatType {
  SYSTEM_DISK_USAGE = "SYSTEM_DISK_USAGE",
  SYSTEM_RAM_USAGE = "SYSTEM_RAM_USAGE",
  SYSTEM_BANDWIDTH = "SYSTEM_BANDWIDTH",
  SYSTEM_CPU_USAGE = "SYSTEM_CPU_USAGE",
  GATE = "GATE",
  HEALTHCHECK = "HEALTHCHECK",
  STATS_AVG_BUILD_TIME = "STATS_AVG_BUILD_TIME",
  STATS_LAST_DEPLOYMENT_BUILD_TIME = "STATS_LAST_DEPLOYMENT_BUILD_TIME",
  STATS_GATES_FAILED_PASSED = "STATS_GATES_FAILED_PASSED",
}

export enum SortType {
  ASC = "asc",
  DESC = "desc"
}

export const deploymentUnitsLanguages = [
  {
    value: "JAVASCRIPT",
    label: "JAVASCRIPT",
  },
  {
    value: "JAVA",
    label: "JAVA",
  },
  {
    value: "KOTLIN",
    label: "KOTLIN",
  },
  {
    value: "PLSQL",
    label: "PLSQL",
  },
  {
    value: "PYTHON",
    label: "PYTHON",
  },
  {
    value: "SHELL",
    label: "SHELL",
  },
]

export const qualityGateTypes = [
  {
    value: "CODE_COVERAGE",
    label: "Code coverage",
  },
  {
    value: "XRAY_DOCKER",
    label: "XRay Docker",
  },
  {
    value: "DUPLICATED_LINES",
    label: "Deuplicated lines",
  },
  {
    value: "MAINTAINABILITY_RATING",
    label: "Maintainability rating",
  },
  {
    value: "RELIABILITY_RATING",
    label: "Reliability rating",
  },
  {
    value: "SECURITY_HOTSPOTS_REVIEWED",
    label: "Security hotspots reviewed",
  },
  {
    value: "SECURITY_RATING",
    label: "Security rating",
  },
]

export const qualityGateResults = [
  {
    value: "PASSED",
    label: "Passes",
  },
  {
    value: "FAILED",
    label: "Failed",
  }
]

export const qualityGateRatings = [
  {
    value: "A",
    label: "A",
    color: "#27d54a"
  },
  {
    value: "B",
    label: "B",
    color: "#95d527"
  },
  {
    value: "C",
    label: "C",
    color: "#d5b827"
  },
  {
    value: "D",
    label: "D",
    color: "#d59827"
  },
  {
    value: "E",
    label: "E",
    color: "#d55527"
  },
  {
    value: "F",
    label: "F",
    color: "#d53b27"
  },
  {
    value: "null",
    label: "Null",
    color: "#9f9f9f"
  },
]

export interface DeploymentDecorate {
  id: string,
  deploymentUnit: DeploymentUnitResponse,
  deployment: DeploymentResponse
  deploymentUnitVersion: DeploymentUnitVersionResponse
}