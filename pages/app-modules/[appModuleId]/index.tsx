import {useRouter} from "next/router";
import useFetch from "@/utils/useFetch";
import {DeploymentUnitResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";
import Link from "next/link";

const Index = () => {
  const router = useRouter()
  const appModuleId = router.query.id
  const {data} = useFetch<PageResponseDeploymentUnitResponse>(`app-modules/${appModuleId}/deployment-units`)

  // const appModuleId = router.query.id;
  // const {data, error, isLoading} = appModuleId
  //   ? useFetch<PageResponseDeploymentUnitResponse>(`app-modules/${appModuleId}/deployment-units`)
  //   : {data: null, error: null, isLoading: false };

  return (
    <div>
      {data?.page.map((d: DeploymentUnitResponse, index: number) => {
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

export default Index