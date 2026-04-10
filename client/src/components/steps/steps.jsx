const Step = () => {
return (
<div className="mt-20 font-semibold" id="s">

<div className="text-center">
<h1 className="text-xl capitalize text-red-700">
upload your file in .pdf format.
</h1>
</div>

<div className="mt-20 cursor-pointer flex justify-center items-center p-2">

<ol className="overflow-hidden space-y-8">

{/* Step 1 */}
<li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-green-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">

<div className="flex items-center font-medium w-full">

<span className="w-8 h-8 bg-green-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">

<svg
className="w-5 h-5 stroke-white"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<path
d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
stroke="currentColor"
strokeWidth="1.6"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</span>

<div className="block">
<h4 className="text-lg text-green-600">Step 1</h4>
<span className="text-sm text-gray-700">Create Account</span>
</div>

</div>
</li>


{/* Step 2 */}
<li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-green-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">

<div className="flex items-center font-medium w-full">

<span className="w-8 h-8 bg-green-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">

<svg
className="w-5 h-5 stroke-white"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<path
d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
stroke="currentColor"
strokeWidth="1.6"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</span>

<div className="block">
<h4 className="text-lg text-green-600">Step 2</h4>
<span className="text-sm text-gray-700">Upload .pdf File</span>
</div>

</div>
</li>


{/* Step 3 */}
<li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-green-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">

<div className="flex items-center font-medium w-full">

<span className="w-8 h-8 bg-green-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">

<svg
className="w-5 h-5 stroke-white"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<path
d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
stroke="currentColor"
strokeWidth="1.6"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</span>

<div className="block">
<h4 className="text-lg text-green-600">Step 3</h4>
<span className="text-sm text-gray-700">
Click on Analyze Resume Button
</span>
</div>

</div>
</li>


{/* Step 4 */}
<li className="relative flex-1">

<div className="flex items-center font-medium w-full">

<span className="w-8 h-8 bg-green-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">

<svg
className="w-5 h-5 stroke-white"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<path
d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
stroke="currentColor"
strokeWidth="1.6"
strokeLinecap="round"
strokeLinejoin="round"
/>

</svg>

</span>

<div className="block">
<h4 className="text-lg text-green-600">Step 4</h4>
<span className="text-sm text-gray-700">Final Result</span>
</div>

</div>
</li>

</ol>

</div>

</div>
);
};

export default Step;