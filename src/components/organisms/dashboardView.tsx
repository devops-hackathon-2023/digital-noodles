import {Icons} from "@/components/icons";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {Progress} from "@/components/atoms/progress";
import Link from "next/link";
import {Button} from "@/components/atoms/button";
import {useSession} from "next-auth/react";
import QualityGateRatingChart from "@/components/molecules/qualityGateCharts/qualityGateRatingChart";
import QualityGateResultChart from "@/components/molecules/qualityGateCharts/qualityGateResultChart";
import QualityGatePercentChart from "@/components/molecules/qualityGateCharts/qualityGatePercentChart";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";
import {useSas} from "@/utils/SasContext";
import {Skeleton} from "@/components/atoms/skeleton";
import QualityGateAveragePercentChart from "@/components/molecules/qualityGateCharts/qualityGateAveragePercentChart";
import {DeploymentUnitResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";

const deployments = [
  {
    name: 'devops',
    icon: Icons.success,
    status: 'Deployed'
  },
  {
    name: 'payments',
    icon: Icons.success,
    status: 'Deployed'
  },
  {
    name: 'loans',
    icon: Icons.failed,
    status: 'Failed'
  },
  {
    name: 'wealth',
    icon: Icons.running,
    status: 'Running'
  }
];

const cards = [
  {
    title: 'Failed Deploys',
    subTitle: 'You have 265 failed deploys.',
    icon: Icons.failed
  },
  {
    title: 'Running Deploys',
    subTitle: 'You have 265 runnings deploys.',
    icon: Icons.running
  }
];

const SasesList = ({
                     pageDeploymentUnits,
                     id
                   }: {
  pageDeploymentUnits: PageResponseDeploymentUnitResponse,
  id: string
}) => {


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="flex justify-between items-center w-full">
          <div className="text-2xl font-bold">Deployments units</div>
          <Link href={"/deployment-units"}>
            <Button variant={"link"}>
              Show all
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {pageDeploymentUnits.page.filter(p =>
          p.sasId === id
        ).map((d: DeploymentUnitResponse, index: number) => {
          return (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex w-full items-center gap-20">
                <Link className="flex flex-col flex-shrink-0" href={`/deployment-units/${d.id}`}>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-sm font-light">loans-fe</div>
                </Link>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}


const DashboardView = () => {
  const {data: session} = useSession()
  const sas = useSas()

  const {data: qualityGates} = useSWR(() => sas.selectedSas?.id ? `/quality-gates?page=0&size=20&sort=createdAt&order=desc&sasId=${sas.selectedSas?.id}` : null, flyIoFetcher)

  const {
    data: pageDeploymentUnits,
  } = useSWR<PageResponseDeploymentUnitResponse>(`/deployment-units`, flyIoFetcher)

  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h2 className="text-2xl leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
            Hello, {session?.user?.name}!🖐️
          </h2>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Welcome back!
          </h1>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {qualityGates === undefined || pageDeploymentUnits === undefined || sas.selectedSas === undefined ?
          <>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
          </>
          :
          <>
            <SasesList pageDeploymentUnits={pageDeploymentUnits} id={sas.selectedSas.id!}/>
            <QualityGateResultChart last100QualityGates={qualityGates}/>
            <QualityGatePercentChart last100QualityGates={qualityGates}/>
            <QualityGateAveragePercentChart last100QualityGates={qualityGates}/>
          </>
        }
      </div>
    </div>
  )
}

export default DashboardView

