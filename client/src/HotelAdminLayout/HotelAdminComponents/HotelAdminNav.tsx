import { useState } from "react"
import { HotelLogout } from "./HotelLogout"
import { PatchHotelInfo } from "./PatchHotelInfo"
import { PatchHotelCredentials } from "./PatchHotelCredentials"

type NavIconObjectType = {
    img: string,
    tag: string,
    setAction?: () => void
}

type LoggedHotelIdType = {
    id: number
}

export function HotelAdminNav({
    id
}: LoggedHotelIdType){

    const [logout, setLogout] = useState<boolean>(false)
    const [patchHotelInfo, setPatchHotelInfo] = useState<boolean>(false)
    const [patchHotelCredentials, setPatchHotelCredentials] = useState<boolean>(false)
    
    // function NavIconObject({})
    const navIconObject = ({img, tag, setAction}: NavIconObjectType) => {
        return(
            {
                img: img,
                tag: tag,
                setAction: setAction
            }
        )
    }

    const navArray = [
        navIconObject({img: "/Info.png", tag: "Info", setAction: () => setPatchHotelInfo(true)}),
        navIconObject({img: "/Password.png", tag: "Private", setAction: () => setPatchHotelCredentials(true)}),
        navIconObject({img: "/Logout.png", tag: "Logout", setAction: () => setLogout(true)})
    ]

    console.log(setLogout)

    return(
        <div 
            className="h-screen border-r flex flex-col justify-between p-6"
        >
            {navArray.map((navIcon, index) => {
                const setAction = navIcon.setAction
                return(
                    <div
                        key={index}
                        className="cursor-pointer uppercase flex flex-col items-center font-bold"
                        onClick={() => setAction?.()}
                    >
                        <img 
                            src={navIcon.img}
                            alt={`${navIcon.tag}-logo`}
                        />

                        <p>
                            {navIcon.tag}
                        </p>
                    </div>
                )
            })}

            {logout &&
                <HotelLogout 
                    onClose={() => setLogout(false)}
                />
            }

            {patchHotelInfo &&
                <PatchHotelInfo 
                    onClose={() => setPatchHotelInfo(false)}
                    hotelId={id}
                />
            }

            {patchHotelCredentials &&
                <PatchHotelCredentials 
                    onClose={() => setPatchHotelCredentials(false)}
                    hotelId={id}
                />
            }
        </div>
    )
}