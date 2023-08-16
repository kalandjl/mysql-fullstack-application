import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getUser } from "../../lib/server"

export default function UserPage() {

    const { query } = useRouter()
    const { uid } = query

    let [user, setUser] = useState<{[x: string]: any} | undefined>(undefined)
    let [queryLoaded, setQueryLoaded] = useState<boolean>(false)

    useEffect(() => {

        if (typeof uid != "undefined") {

            setQueryLoaded(true)
        }
    })

    useEffect(() => {

        if (!queryLoaded) return

        let f = async () => {

            setUser({})

            if (typeof uid != "string") return

            let user = await getUser(uid)

            setUser(user)
        }

        f()
    }, [queryLoaded])

    return (
        <div className="h-screen grid place-items-center">
            <div className="px-32">
                {`User: ${ JSON.stringify(user) }`}
            </div>
        </div>
    )
}