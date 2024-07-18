import { NextResponse } from "next/server";
import connectDb from "../../../../../../middleware/mongoose";
import Product from "../../../../../../models/Product";

export async function GET(request, content) {
    await connectDb();
    let product = await Product.findOne({ slug: content.params.id })
    let variants = await Product.find({ name: product.name })
    let colorSizeSlug = {} // {red: {xl:{slug:'wear-the-code-xl'}}}
    //     const defaultColor = 'defaultColor'; // Replace with your default color
    // const defaultSize = 'defaultSize'; // Replace with your default size
    if (!Array.isArray(variants)) {
        variants = [];
    }
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.Color)) {
            colorSizeSlug[item.Color][item.Size] = { slug: item.slug }
        }
        else {
            colorSizeSlug[item.Color] = {}
            colorSizeSlug[item.Color][item.Size] = { slug: item.slug }
        }
    }
    let allColors = Object.keys(colorSizeSlug);
    console.warn("allcolors",allColors)
    return NextResponse.json({ success: true, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) ,allColors})
}