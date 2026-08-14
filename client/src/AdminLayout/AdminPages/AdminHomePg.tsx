import { AdminBgContainers } from "../AdminComponents/AdminBgContainers"

export function AdminHomePg(){

    const adminContainers: string[] = ["Hotel"]
    
    return(
        <section
            className="adminSections"
        >
            {adminContainers.map((container, index) => {
                return(
                    <AdminBgContainers 
                        key={index}
                        imgPath={container}
                    />
                )
            })}
        </section>
    )
}