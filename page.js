
import ProductOne from "@/app/components/ProductOne";
export default async function Page({ params }) {
    console.warn("params",params)
    const id = params.slug;
    console.warn("id", id)
    return (
        <>
        <ProductOne  productId={params.slug} />
        </>
    )
}