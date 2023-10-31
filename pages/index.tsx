import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

export default function Home() {
  return (
    <div className="container relative mt-5 flex flex-col gap-5">
      <div className={"flex w-full justify-between items-center"}>
        <h1 className={"text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"}>
          Welcome back!
        </h1>
        <Button>
          Edit
        </Button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              devops
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <rect width="18" height="18" fill="#55D640" rx="9"/>
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12.333 6.5 7.75 11.083 5.667 9"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Deployed</div>
            <p className="text-xs text-muted-foreground">
              Last deploy: 28.10.2023
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              payments
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <rect width="18" height="18" fill="#55D640" rx="9"/>
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12.333 6.5 7.75 11.083 5.667 9"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Deployed</div>
            <p className="text-xs text-muted-foreground">
              Last deploy: 28.10.2023
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              loans
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18">
              <rect width="18" height="18" x=".667" fill="#D64040" rx="9"/>
              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m12.167 6.5-5 5m0-5 5 5"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Failed</div>
            <p className="text-xs text-muted-foreground">
              Last deploy: 28.10.2023
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              wealth
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <rect width="18" height="18" fill="#3B82F6" rx="9"/>
              <g clip-path="url(#a)">
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12.75 4.833v2.5h-2.5"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M5.25 9a3.75 3.75 0 0 1 6.25-2.792l1.25 1.125m-7.5 5.834v-2.5h2.5"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12.75 9a3.75 3.75 0 0 1-6.25 2.792l-1.25-1.125"/>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M4 4h10v10H4z"/>
                </clipPath>
              </defs>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Running</div>
            <p className="text-xs text-muted-foreground">
              Last deploy: 28.10.2023
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
            <CardTitle className="text-2xl font-bold">
              Failed Deploys
              <div className="text-sm font-light">You have 265 falied deploys.</div>
            </CardTitle>
          </CardHeader>
          <CardContent className={"flex-col flex gap-5"}>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18">
                <rect width="18" height="18" x=".667" fill="#D64040" rx="9"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m12.167 6.5-5 5m0-5 5 5"/>
              </svg>
            </div>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18">
                <rect width="18" height="18" x=".667" fill="#D64040" rx="9"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m12.167 6.5-5 5m0-5 5 5"/>
              </svg>
            </div>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18">
                <rect width="18" height="18" x=".667" fill="#D64040" rx="9"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m12.167 6.5-5 5m0-5 5 5"/>
              </svg>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
            <CardTitle className="text-2xl font-bold">
              Running Deploys
              <div className="text-sm font-light">You have 265 runnings deploys.</div>
            </CardTitle>
          </CardHeader>
          <CardContent className={"flex-col flex gap-5"}>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
                <Progress value={33} className="w-[60%]"/>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                <rect width="18" height="18" fill="#3B82F6" rx="9"/>
                <g clip-path="url(#a)">
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 4.833v2.5h-2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M5.25 9a3.75 3.75 0 0 1 6.25-2.792l1.25 1.125m-7.5 5.834v-2.5h2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 9a3.75 3.75 0 0 1-6.25 2.792l-1.25-1.125"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M4 4h10v10H4z"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
                <Progress value={33} className="w-[60%]"/>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                <rect width="18" height="18" fill="#3B82F6" rx="9"/>
                <g clip-path="url(#a)">
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 4.833v2.5h-2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M5.25 9a3.75 3.75 0 0 1 6.25-2.792l1.25 1.125m-7.5 5.834v-2.5h2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 9a3.75 3.75 0 0 1-6.25 2.792l-1.25-1.125"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M4 4h10v10H4z"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={"flex items-center justify-between"}>
              <div className={"flex w-full items-center gap-20"}>
                <div className={"flex flex-col flex-shrink-0"}>
                  <div className="font-medium">loans</div>
                  <div className="text-sm font-light">loans-fe</div>
                </div>
                <Progress value={33} className="w-[60%]"/>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                <rect width="18" height="18" fill="#3B82F6" rx="9"/>
                <g clip-path="url(#a)">
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 4.833v2.5h-2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M5.25 9a3.75 3.75 0 0 1 6.25-2.792l1.25 1.125m-7.5 5.834v-2.5h2.5"/>
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12.75 9a3.75 3.75 0 0 1-6.25 2.792l-1.25-1.125"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M4 4h10v10H4z"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
