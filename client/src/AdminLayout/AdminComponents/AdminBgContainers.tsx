import { Link } from "react-router-dom"

type AdminBgContainerType = {
    imgPath?: string,
    img?: string
    name?: string,
    slug?: string
}

export function AdminBgContainers({
    imgPath,
    img,
    slug,
    name
}: AdminBgContainerType){
    return(
        <Link
            style={{
                backgroundImage: `url(${img ? img : `/Admin${imgPath}BgImg.jpg`})`
            }}
            className="block relative bg-no-repeat bg-center bg-cover h-80 w-100 border rounded-lg border-none mb-4"
            to={slug ? slug : `/admin${imgPath?.toLowerCase()}`}
        >
            <div
                className="bg-black/80 text-white h-10 text-2xl text-center absolute bottom-0 w-full uppercase rounded-b-lg"
            >
                {name ? name : imgPath}
            </div>
        </Link>
    )
}