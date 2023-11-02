import FilterTable from "@/components/organisms/filter-table"
import {Button} from "@/components/ui/button";
import {Plus, Search} from 'lucide-react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import {Input} from "@/components/ui/input";


const index = [
  {name: "devops"},
  {name: "loans"},
  {name: "payments"},
  {name: "wealth"},
]

const Sass = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            SASs
          </h1>
        </div>
        <Button>
          <Plus/>
          Add new SAS
        </Button>
      </div>
      <Card>
        <CardHeader>
          <FilterTable/>
        </CardHeader>
        <CardContent>
          <div className={"flex flex-col"}>
            {index.map((s: any, index: number) => {
              return (
                <Link className={"h-10 border-b m-2"} href={`/sass/${s.name}`}>
                  {s.name}
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sass