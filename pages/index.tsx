import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import useFetch from "@/utils/useFetch";
import {Icons} from "@/components/icons";
import {useRouter} from 'next/navigation';
import Link from "next/link";

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

export default function Home() {
  const {data} = useFetch("sases?page=0&size=30&sort=name&order=asc")

  console.log(data)

  return (
    <div className="container relative mt-5 flex flex-col gap-5">

      {/* Header */}
      <div className="flex w-full justify-between items-center">
        <div>
          <h2 className="text-2xl leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
            Hello, John!🖐️
          </h2>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Welcome back!
          </h1>
        </div>
        <Button>
          Edit
        </Button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {deployments.map((info: any, index: number) => <DeploymentCard {...info} key={index}/>)}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {cards.map((info, index) => <DetailedCard {...info} key={index}/>)}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <SasesList/>
      </div>
    </div>
  )
}

const DeploymentCard = ({
                          name,
                          icon: Icon,
                          status
                        }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {name}
      </CardTitle>
      <Icon/>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{status}</div>
      <p className="text-xs text-muted-foreground">
        Last deploy: 28.10.2023
      </p>
    </CardContent>
  </Card>
);

const DetailedCard = ({
                        title,
                        subTitle,
                        icon: Icon
                      }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
      <CardTitle className="text-2xl font-bold">
        {title}
        <div className="text-sm font-light">{subTitle}</div>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-col flex gap-5">
      {[...Array(3)].map(() => (
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center gap-20">
            <div className="flex flex-col flex-shrink-0">
              <div className="font-medium">loans</div>
              <div className="text-sm font-light">loans-fe</div>
            </div>
            <Progress value={33} className="w-[60%]"/>
          </div>
          <Icon/>
        </div>
      ))}
    </CardContent>
  </Card>
);

const SasesList = () => {

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="flex justify-between items-center w-full">
          <div className="text-2xl font-bold">Sases</div>
          <Link href={"/sass"}>
            <Button variant={"link"}>
              Show all
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-col flex gap-5">
        {[...Array(3)].map(() => (
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-20">
              <div className="flex flex-col flex-shrink-0">
                <div className="font-medium">loans</div>
                <div className="text-sm font-light">loans-fe</div>
              </div>
              <Progress value={33} className="w-[60%]"/>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}