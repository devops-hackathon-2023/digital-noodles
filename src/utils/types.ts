export interface DashboardGridCellConfig {
  layout: {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    minW?: number,
    maxW?: number
  }
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
