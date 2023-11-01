import {useRouter} from "next/router";

const Detail = () => {
  const router = useRouter()
  const name = router.query.name

  return (
    <div className="container relative mt-5 flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {name}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Detail