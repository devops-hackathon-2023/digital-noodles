import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import Link from "next/link";
import {Button} from "@/components/atoms/button";
import {useSession} from "next-auth/react";
import QualityGateResultChart from "@/components/molecules/qualityGateCharts/qualityGateResultChart";
import QualityGatePercentChart from "@/components/molecules/qualityGateCharts/qualityGatePercentChart";
import useSWR from "swr";
import {fetcher, flyIoFetcher} from "@/utils/lib/fetcher";
import {useSas} from "@/utils/SasContext";
import {Skeleton} from "@/components/atoms/skeleton";
import QualityGateAveragePercentChart from "@/components/molecules/qualityGateCharts/qualityGateAveragePercentChart";
import {DeploymentUnitResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";


const SasesList = ({
                     pageDeploymentUnits,
                   }: {
  pageDeploymentUnits: any
}) => {

  console.log(pageDeploymentUnits)


  return (
    <>    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="flex justify-between items-center w-full">
          <div className="text-2xl font-bold">Pinned Deployments units</div>
          <Link href={"/deployment-units"}>
            <Button variant={"link"}>
              Show all
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {pageDeploymentUnits.filter((p: any) =>
          p.type === "DEPLOYMENT_UNIT"
        ).map((d: any, index: number) => {
          return (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex w-full items-center gap-20">
                <Link className="flex flex-col flex-shrink-0" href={`/deployment-units/${d.item.id}`}>
                  <div className="font-medium">{d.item.name}</div>
                </Link>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
          <CardTitle className="flex justify-between items-center w-full">
            <div className="text-2xl font-bold">Pinned App modules</div>
            <Link href={"/app-modules"}>
              <Button variant={"link"}>
                Show all
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          {pageDeploymentUnits.filter((p: any) =>
            p.type === "APP_MODULE"
          ).map((d: any, index: number) => {
            return (
              <div className="flex items-center justify-between" key={index}>
                <div className="flex w-full items-center gap-20">
                  <Link className="flex flex-col flex-shrink-0" href={`/app-modules/${d.item.id}`}>
                    <div className="font-medium">{d.item.name}</div>
                  </Link>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </>

  )
}


const DashboardView = () => {
  const {data: session} = useSession()
  const {selectedSas} = useSas();


  const {data: qualityGates} = useSWR(() => selectedSas?.id ? `/quality-gates?page=0&size=20&sort=createdAt&order=desc&sasId=${selectedSas?.id}` : null, flyIoFetcher)

  const {
    data: pageDeploymentUnits,
  } = useSWR<PageResponseDeploymentUnitResponse>(`/deployment-units`, flyIoFetcher)

  const {data: config} = useSWR(() => selectedSas ? `/api/dashboard-configs?typeId=${selectedSas.id}&dashboardType=SAS` : null, fetcher);

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
        {config === undefined || qualityGates === undefined || pageDeploymentUnits === undefined || selectedSas === undefined ?
          <>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
            <Skeleton className={"w-full h-80"}/>
          </>
          :
          <>
            <SasesList pageDeploymentUnits={config}/>
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

