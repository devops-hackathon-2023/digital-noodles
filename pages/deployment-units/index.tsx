import useFetch from "@/utils/useFetch";
import {DeploymentUnitResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";
import {useSas} from "@/utils/SasContext";
import Link from "next/link";

const DeploymentUnits = () => {
  const {
    selectedSas
  } = useSas();

  const {data} = useFetch<PageResponseDeploymentUnitResponse>("deployment-units")

  return (
    <div>
      {data?.page.filter(d => d.sasId === selectedSas?.id).map((d: DeploymentUnitResponse, index: number) => {
        return (
          <div key={index}>
            <Link href={`/deployment-units/${d.id}}`}>
              {d.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default DeploymentUnits