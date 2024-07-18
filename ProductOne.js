'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const ProductOne = ({ productId }) => {
  // console.warn("productId",productId)
  const [selectedImage, setSelectedImage] = useState('https://images.pexels.com/photos/717431/pexels-photo-717431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://images.pexels.com/photos/717431/pexels-photo-717431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/206557/pexels-photo-206557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1006073/pexels-photo-1006073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  //576 w × 362 px h

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setActiveIndex(index);
  };
  const [product, setProduct] = useState({})
  const [variants, setVariants] = useState({})
  const [color, setColor] = useState({})
  const [size, setSize] = useState('')
  const router = useRouter()
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const getproduct = async () => {
      let res = await fetch(`${process.env.HOST}/api/products/getsingleproduct/${productId}`);
      let data = await res.json();
      // console.warn(data,"da")
      if (data && data.variants && typeof data.variants === 'object') {
        setVariants(data.variants);
      } else {
        console.error("Variants data is not in the expected format");
        setVariants({});
      }
      console.warn(data.variants, "variantshamra")
      // console.warn(variants,"varba")
      setProduct(data.product)
      setSize(data.product.Size)
      setColor(data.product.Color)
      // Extract sizes after setting variants
      extractSizes(data.variants || {});
      extractColors(data.variants || {});
      for (let item of Object.keys(variants)) {
        console.warn(item,"varitems")
    }    
    }
    getproduct()
  }, [productId])

  const extractSizes = (variants) => {
    let allSizes = [];

    for (let color in variants) {
      if (variants[color]) {
        let sizes = Object.keys(variants[color]);
        allSizes = allSizes.concat(sizes);
      }
    }

    // Remove duplicates
    allSizes = [...new Set(allSizes)];

    setSizes(allSizes);
  };

  const extractColors = (variants) => {
    return Object.keys(variants);
  };
  const colors = extractColors(variants);



  const refreshVariants = (newsize, newcolor) => {
    let url = `${process.env.HOST}/public/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  const isTshirtDataValid = variants && Object.keys(variants).length > 0;
  const processedColors = {};


  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Your existing navigation and content structure */}
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <Image width={576} height={362} className="h-full w-full max-w-full object-cover hover:scale-125" src={selectedImage} alt="Selected" />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleImageClick(image, index)}
                      className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${activeIndex === index ? 'border-gray-900' : 'border-transparent'} text-center`}
                    >
                      <Image width={576} height={362} className="h-full w-full object-cover" src={image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Your existing product details structure */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name} ({product.Size} / {product.Color})</h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
            </div>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>

                {/* {variants && Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={(e) => { refreshVariants(size, 'white') }} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}

                {variants && Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={(e) => { refreshVariants(size, 'red') }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}

                {variants && Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={(e) => { refreshVariants(size, 'green') }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}

                {variants && Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <Link href={`${process.env.HOST}/public/product/${product.name.replace(/\s+/g, '-')}-blue-${size}`} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></Link>} */}

                {/* {isTshirtDataValid && 
          Object.keys(variants[color]).map((size) => (
            <Link key={size} href={`${process.env.HOST}/public/product/${variants[color][size].slug}`} className={`border-2 ml-1 bg-${color}-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}>
            </Link>
          ))} */}

                {isTshirtDataValid && 
          Object.keys(variants).map((color) => {
            if (processedColors[color]) return null;
          processedColors[color] = true;
          // alert(color)
          const sizes = Object.keys(variants[color]);
          // const firstAvailableSize = sizes.length > 0 ? sizes[0] : null;
          // const slug = firstAvailableSize ? variants[color][firstAvailableSize].slug : '#';
          const slug = sizes.includes(size) ? variants[color][size].slug : variants[color][sizes[0]].slug;
         
            return (
              <Link key={color} href={`${process.env.HOST}/public/product/${slug}`} className={`border-2 ml-1 bg-${color}-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}>
              </Link>
            )
          })}


                {/* <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
              </div>
              
          
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>

            <div className="relative">
              <select value={size} onChange={(e) => { refreshVariants(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                {sizes.includes('S') && <option value={'S'}>S</option>}
                {sizes.includes('M') && <option value={'M'}>M</option>}
                {sizes.includes('L') && <option value={'L'}>L</option>}
                {sizes.includes('XL') && <option value={'XL'}>XL</option>}
                {sizes.includes('XXXL') && <option value={'XXXL'}>XXXL</option>}
                {/* <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option> */}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <div class="flex items-center my-2 w-1/3 md:w-1/4"><label class="block m-2 text-sm font-medium">Size: </label>
          <a href="/product/pikachu-vector-design-tshirt-black-s"> <button class="mx-2 border-black dark:border-white rounded-lg border px-2 border-pink-500 bg-pink-100 dark:border-white dark:bg-pink-500 dark:text-white">S</button></a>
          <a href="/product/pikachu-vector-design-tshirt-black-m"> <button class="mx-2 border-black dark:border-white rounded-lg border px-2 ">M</button></a><a href="/product/pikachu-vector-design-tshirt-black-l"> <button class="mx-2 border-black dark:border-white rounded-lg border px-2 ">L</button></a><a href="/product/pikachu-vector-design-tshirt-black-xl"> <button class="mx-2 border-black dark:border-white rounded-lg border px-2 ">XL</button></a><a href="/product/pikachu-vector-design-tshirt-black-xxl"> <button class="mx-2 border-black dark:border-white rounded-lg border px-2 ">XXL</button></a></div>
          </div>

          <div className='flex items-center my-2 w-1/3 md:w-1/4'>
          <label class="block m-2 text-sm font-medium">Size: </label>
          {color &&
          variants[color] &&
          Object.keys(variants[color]).map((hsize) => {
            const slug = variants[color][hsize]?.slug || Object.values(variants[color])[0].slug;
            return slug ? (
              <Link key={hsize} className={`mx-2 dark:border-white rounded-lg border px-2 ${size === hsize ? 'border-pink-500 bg-pink-100' : 'border-black'}`} href={`${process.env.HOST}/public/product/${slug}`}>
                {hsize}
              </Link>
            ) : null;
          })}
          </div>

        <h2 className="mt-8 text-base text-gray-900">Coffee Type</h2>
        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
          <label className="">
            <input type="radio" name="type" value="Powder" className="peer sr-only" checked />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Powder</p>
          </label>
          <label className="">
            <input type="radio" name="type" value="Whole Bean" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Whole Bean</p>
          </label>
          <label className="">
            <input type="radio" name="type" value="Groud" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Groud</p>
          </label>
        </div>

        <h2 className="mt-8 text-base text-gray-900">Choose subscription</h2>
        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
          <label className="">
            <input type="radio" name="subscription" value="4 Months" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">4 Months</p>
            <span className="mt-1 block text-center text-xs">$80/mo</span>
          </label>
          <label className="">
            <input type="radio" name="subscription" value="8 Months" className="peer sr-only" checked />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">8 Months</p>
            <span className="mt-1 block text-center text-xs">$60/mo</span>
          </label>
          <label className="">
            <input type="radio" name="subscription" value="12 Months" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">12 Months</p>
            <span className="mt-1 block text-center text-xs">$40/mo</span>
          </label>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-end">
            <h1 className="text-3xl font-bold">$60.50</h1>
            <span className="text-base">/month</span>
          </div>

          <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
        </div>

        <ul className="mt-8 space-y-2">
          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
            </svg>
            Free shipping worldwide
          </li>

          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
            </svg>
            Cancel Anytime
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3">
        <div className="border-b border-gray-300">
          <nav className="flex gap-4">
            <a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>

            <a href="#" title="" className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600">
              Reviews
              <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100"> 1,209 </span>
            </a>
          </nav>
        </div>

        <div className="mt-8 flow-root sm:mt-12">
          <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
          <h1 className="mt-8 text-3xl font-bold">From the Fine Farms of Brazil</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
          <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
        </div>
      </div>
    </div>
      </div >
    </section >
  );
};

export default ProductOne;
