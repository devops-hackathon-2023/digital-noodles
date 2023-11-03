import {AppModuleResponse, DeploymentUnitResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";
import Link from "next/link";
import {NextPage} from "next";
import {Button} from "@/components/atoms/button";
import {Separator} from "@/components/atoms/separator";

interface AppModuleDashboardViewProps {
  deploymentUnits?: PageResponseDeploymentUnitResponse,
  appModule?: AppModuleResponse

}

const AppModuleDashboardView: NextPage<AppModuleDashboardViewProps> = ({
                                                                         deploymentUnits,
                                                                         appModule
                                                                       }) => {

  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {appModule?.name}
          </h1>
        </div>
      </div>

      <div className={"flex flex-col gap-3"}>
        <div className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-2xl leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
              Deployment units
            </h1>
          </div>
          <Button>
            Add new Deployment unit
          </Button>
        </div>
        <Separator/>
        {deploymentUnits?.page.map((d: DeploymentUnitResponse, index: number) => {
          return (
            <div key={index}>
              <Link href={`/deployment-units/${d.id}`}>
                {d.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppModuleDashboardView