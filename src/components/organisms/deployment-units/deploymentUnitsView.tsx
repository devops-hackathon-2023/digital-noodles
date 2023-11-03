import {DeploymentUnitResponse, PageResponseDeploymentUnitResponse, SasResponse} from "@/utils/types";
import Link from "next/link";
import {NextPage} from "next";

interface DeploymentUnitsViewProps {
  data?: PageResponseDeploymentUnitResponse,
  selectedSas?: SasResponse
}


const DeploymentUnitsView: NextPage<DeploymentUnitsViewProps> = ({
                                                                   data,
                                                                   selectedSas
                                                                 }) => {
  return (
    <>
      {data?.page.filter(d => d.sasId === selectedSas?.id).map((d: DeploymentUnitResponse, index: number) => {
        return (
          <div key={index}>
            <Link href={`/deployment-units/${d.id}}`}>
              {d.name}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default DeploymentUnitsView