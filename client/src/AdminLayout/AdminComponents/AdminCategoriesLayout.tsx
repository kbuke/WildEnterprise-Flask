import { AdminBgContainers } from "./AdminBgContainers"

type AdminInstance = {
    id: number
    slug: string
    img: string
    name: string
}

type AdminCategoriesTypes<T extends AdminInstance> = {
    categoryTitle: string
    instanceArrays: T[]
    setAction: () => void
}

export function AdminCategoriesLayout<T extends AdminInstance>({
    categoryTitle,
    instanceArrays,
    setAction
}: AdminCategoriesTypes<T>) {

    return (
        <section
            className="py-4 px-12 flex flex-col items-center"
        >
            <div
                className="flex items-center gap-4 mb-6 mt-2"
            >
                <h1
                    className="uppercase text-4xl font-bold"
                >
                    {categoryTitle}
                </h1>

                <button
                    className="submitFormButton"
                    onClick={setAction}
                >
                    Add {categoryTitle}
                </button>
            </div>

            <div
                className="grid grid-cols-3 gap-20"
            >
                {instanceArrays.map((instance, index) => {
                    return(
                        <AdminBgContainers 
                            key={index}
                            img={instance.img}
                            name={instance.name}
                            slug={instance.slug}
                        />
                    )
                })}
            </div>
        </section>
    )
}