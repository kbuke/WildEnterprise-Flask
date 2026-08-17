import { useState } from "react"
import { HotelLogout } from "./HotelLogout"
import { PatchHotelInfo } from "./PatchHotelInfo"
import { PatchHotelCredentials } from "./PatchHotelCredentials"
import { Link } from "react-router-dom"

type NavIconObjectType = {
    purpose: "Link" | "Edit"
    img: string,
    tag: string,
    setAction?: () => void,
    link?: string
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
    const navIconObject = ({img, tag, setAction, purpose, link}: NavIconObjectType) => {
        return(
            {
                purpose: purpose,
                img: img,
                tag: tag,
                setAction: setAction,
                link: link
            }
        )
    }

    const navArray = [
        navIconObject({purpose: "Link", img: "/HotelAdminHome.png", tag: "Home", link: "/hoteladmindashboard"}),
        navIconObject({purpose: "Edit", img: "/Info.png", tag: "Info", setAction: () => setPatchHotelInfo(true)}),
        navIconObject({purpose: "Edit", img: "/Password.png", tag: "Private", setAction: () => setPatchHotelCredentials(true)}),
        navIconObject({purpose: "Edit", img: "/Logout.png", tag: "Logout", setAction: () => setLogout(true)})
    ]


    return(
        <div 
            className="h-screen border-r flex flex-col justify-between px-6 py-12"
        >
            {navArray.map((navIcon, index) => {
                const {purpose, img, tag, setAction, link} = navIcon
                return(
                    purpose === "Edit"
                        ? <div
                            key={index}
                            className="cursor-pointer uppercase flex flex-col items-center font-bold"
                            onClick={() => setAction?.()}
                        >
                            <img 
                                src={img}
                                alt={`${tag}-logo`}
                            />

                            <p>
                                {tag}
                            </p>
                        </div>
                        : <Link
                            key={index}
                            className="cursor-pointer uppercase flex flex-col items-center font-bold"
                            // Tell TS we know link will be defined
                            to={link!} 
                        >
                            <img 
                                src={img}
                                alt={`${tag}-logo`}
                            />

                            <p>
                                {tag}
                            </p>
                        </Link>
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