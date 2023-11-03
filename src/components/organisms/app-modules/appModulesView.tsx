import {AppModuleResponse, PageResponseAppModuleResponse} from "@/utils/types";
import {NextPage} from "next";
import Link from "next/link";

interface AppModuleDetailViewProps {
  pageAppModules?: PageResponseAppModuleResponse
}

const AppModulesView: NextPage<AppModuleDetailViewProps> = ({pageAppModules}) => {
  return (
    <>
      {pageAppModules?.page.map((a: AppModuleResponse, index: number) => {
        return (
          <div key={index}>
            <Link href={`/app-modules/${a.id}`}>
              {a.name}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default AppModulesView