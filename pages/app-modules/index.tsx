import {useSas} from "@/utils/SasContext";
import useFetch from "@/utils/useFetch";
import {AppModuleResponse, PageResponseAppModuleResponse} from "@/utils/types";
import Link from "next/link";

const AppModules = () => {
  const {
    selectedSas
  } = useSas();

  const {data} = useFetch<PageResponseAppModuleResponse>(`sases/${selectedSas?.id}/app-modules`)

  return (
    <div>
      {data?.page.map((a: AppModuleResponse, index: number) => {
        return (
          <div key={index}>
            <Link href={`/app-modules/${a.id}`}>
              {a.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default AppModules