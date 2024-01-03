
const Footer = () => {
    return (
        <footer className=" shadow-lg bg-[#101d2d] text-white p-8 w-full">
            <div className="container md:px-8 mx-auto grid-cols-2 md:flex justify-between gap-3">
                <div className=" col-span-1">
                    <h2 className="font-bold  text-xl md:text-2xl">Top Products</h2>
                    <ul>
                        <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                        <li className="text-slate-400 p-3">Manage Reputation</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                    </ul>
                </div>
                <div className=" col-span-1">
                    <h2 className="font-bold  text-xl md:text-2xl">Quick Links</h2>
                    <ul>
                        <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                        <li className="text-slate-400 p-3">Manage Reputation</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                    </ul>
                </div>
                <div className=" col-span-1">
                    <h2 className="font-bold  text-xl md:text-2xl">Feactures</h2>
                    <ul>
                    <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                        <li className="text-slate-400 p-3">Manage Reputation</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                    </ul>
                </div>
                {/* <div className=" col-span-1">
                    <h2 className="font-bold  text-xl md:text-2xl">Resources</h2>
                    <ul>
                    <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                        <li className="text-slate-400 p-3">Manage Reputation</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                        <li className="text-slate-400 p-3">Power Tools</li>
                    </ul>
                </div> */}
                <div className=" col-span-2">
                    <h2 className="font-bold  text-xl md:text-2xl">Subscribe</h2>
                    <p className="mt-4 text-slate-400">You can Subscribe to Our Newsletter  at any time</p>
                    <div className="subscribe border border-slate-400 flex items-center justify-center w-fit md:mt-8 mt-4" >
                            <input className="p-2 border-none outline-none text-black " type="Email" placeholder="Email Address" />
                            <button className="shadow-lg border-[#5469d4]  bg-[#4a5fc9] cursor-pointer p-2 px-8  pb-2">Subscribe</button>
                        </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
