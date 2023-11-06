import React, {useEffect, useRef, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import useSWR from "swr";
import {DeploymentUnitVersionResponse, StatType} from "@/utils/types";
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
  const {data: deploymentUnit} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}`, flyIoFetcher)
  const {data: deploymentUnitVersions} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}/deployment-unit-versions?order=desc&sort=version`, flyIoFetcher)
  const [lastDeploymentUnitVersion, setLastDeploymentUnitVersion] = useState<DeploymentUnitVersionResponse | undefined>(undefined)
  const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [selectedEnv, setSelectedEnv] = useState<string | undefined>()
  const [selectedVersion, setSelectedVersion] = useState<DeploymentUnitVersionResponse>()
  const {
    data: deployments,
    mutate: mutateDeployments
  } = useSWR(() => (selectedEnv && selectedVersion) ? `https://dopo.fly.dev/api/v1/dopo/deployments?enviroment=${selectedEnv}&deploymentUnitId=${deploymentUnitId}&versionId=${selectedVersion.id}` : null, flyIoFetcher)

  useEffect(() => {
    if (deploymentUnitVersions && deploymentUnitVersions.page.length > 0)
      setSelectedVersion(deploymentUnitVersions.page[0])
  }, [deploymentUnitVersions]);

  useEffect(() => {
    if (dashboardConfigs && dashboardConfigs.length > 0) {
      setSelectedEnv(dashboardConfigs[0].env)
    }
  }, [dashboardConfigs]);

  useEffect(() => {
    mutateDeployments()
  }, [selectedEnv]);

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

  useEffect(() => {
    if (deploymentUnitVersions?.page.length > 0) {
      setLastDeploymentUnitVersion(deploymentUnitVersions.page[0])
    }
  }, [deploymentUnitVersions])

  return (
    <PlatformLayout>
      <DeploymentUnitDetailView
        deploymentUnit={deploymentUnit}
        selectedVersion={selectedVersion}
        deploymentUnitVersions={deploymentUnitVersions}
        setSelectedVersion={setSelectedVersion}
        dashboardConfigs={dashboardConfigs}
        lastDeploymentUnitVersion={lastDeploymentUnitVersion}
        setSelectedEnv={setSelectedEnv}
        editing={editing}
        setEditing={setEditing}
        draggedStatType={draggedStatType}
        handleLayoutChange={handleLayoutChange}
        deployments={deployments}
        handleDraggableDragStart={handleDraggableDragStart}
      />
    </PlatformLayout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const {query: {deploymentUnitId}} = ctx;

  return {props: {deploymentUnitId}}
}

export default DeploymentUnitPage;
