import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import useSWR from "swr";
import {AppModuleResponse, DeploymentUnitResponse, DeploymentUnitVersionResponse, StatType} from "@/utils/types";
import axios from "axios";
import {swapItemWithId} from "@/utils/helpers";
import useOutsideClick from "@/utils/useOutsideClick";
import {fetcher, flyIoFetcher} from "@/utils/lib/fetcher";
import PlatformLayout from "@/components/layouts/platformLayout";
import DeploymentUnitDetailView from "@/components/organisms/deployment-units/deploymentUnitDetailView";

interface DeploymentUnitPageProps {
  deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({deploymentUnitId}) => {
  const {
    data: dashboardConfigs,
    mutate: mutateDashboardConfigs
  } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)
  const {data: deploymentUnit} = useSWR<DeploymentUnitResponse>(`/deployment-units/${deploymentUnitId}`, flyIoFetcher)
  const {data: deploymentUnitVersions} = useSWR<any>(`/deployment-units/${deploymentUnitId}/deployment-unit-versions?order=desc&sort=version`, flyIoFetcher)
  const [lastDeploymentUnitVersion, setLastDeploymentUnitVersion] = useState<DeploymentUnitVersionResponse | undefined>(undefined)
  const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [selectedEnv, setSelectedEnv] = useState<string>("DEV")
  const [selectedVersion, setSelectedVersion] = useState<DeploymentUnitVersionResponse>()
  const {
    data: deployments,
    mutate: mutateDeployments
  } = useSWR(() => (selectedEnv && selectedVersion) ? `/deployments?enviroment=${selectedEnv}&sortBy=startedAt&order=asc&deploymentUnitId=${deploymentUnitId}&versionId=${selectedVersion.id}` : null, flyIoFetcher)

  const {
    data: appModule
  } = useSWR<AppModuleResponse>(() => deploymentUnit?.appModuleId ? `/app-modules/${deploymentUnit?.appModuleId}` : null, flyIoFetcher)

  useEffect(() => {
    if (deploymentUnitVersions && deploymentUnitVersions.page.length > 0)
      setSelectedVersion(deploymentUnitVersions.page[0])
  }, [deploymentUnitVersions]);

  // useEffect(() => {
  //   if (dashboardConfigs && dashboardConfigs.length > 0) {
  //     setSelectedEnv(dashboardConfigs[0].env)
  //   }
  // }, [dashboardConfigs]);

  // useEffect(() => {
  //   mutateDeployments()
  // }, [selectedEnv]);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setDropdownMenuOpen(false));

  const handleLayoutChange = (dashboardConfigId: string, layout: any[]) => {
    axios.put(`/api/dashboard-configs/${dashboardConfigId}`, {dashboardCellConfigs: layout}, {withCredentials: true})
      .then((response) => response.data)
      .then((data) => {
        return mutateDashboardConfigs((layouts: any) => {
          return swapItemWithId(layouts, 'id', data.id, data)
        })
      });
  }

  const handleDraggableDragStart = (statType: StatType) => {
    setDraggedStatType(statType)
    setDropdownMenuOpen(false)
  }

  const handleSelectEnv = useCallback((env: string) => {
    setSelectedEnv(env)
  }, [])

  useEffect(() => {
    if (deploymentUnitVersions?.page.length > 0) {
      setLastDeploymentUnitVersion(deploymentUnitVersions.page[0])
    }
  }, [deploymentUnitVersions])

  if (deploymentUnit === undefined || appModule === undefined) {
    return (
      <></>
    )
  }

  return (
    <PlatformLayout>
      <DeploymentUnitDetailView
        deploymentUnit={deploymentUnit}
        selectedVersion={selectedVersion}
        deploymentUnitVersions={deploymentUnitVersions}
        setSelectedVersion={setSelectedVersion}
        dashboardConfigs={dashboardConfigs}
        lastDeploymentUnitVersion={lastDeploymentUnitVersion}
        setSelectedEnv={handleSelectEnv}
        editing={editing}
        setEditing={setEditing}
        draggedStatType={draggedStatType}
        handleLayoutChange={handleLayoutChange}
        deployments={deployments}
        handleDraggableDragStart={handleDraggableDragStart}
        selectedEnv={selectedEnv}
        appModule={appModule}
      />
    </PlatformLayout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const {query: {deploymentUnitId}} = ctx;

  return {props: {deploymentUnitId}}
}

export default DeploymentUnitPage;
