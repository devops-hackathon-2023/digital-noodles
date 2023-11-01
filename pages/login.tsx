import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function LoginPage() {
    const { data: session } = useSession()
    const { data: test } = useSWR("/api/test", fetcher)

    if (session) {
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}