import logo from '../assets/logo.png';
import search from '../assets/search.png';

export const VerticalNavbar = () => {

    return(
        <div className=" flex flex-col h-full w-12 bg-gray-100 items-center justify-center gap-4">
            <img className="w-8 cursor-pointer" src={logo} alt="" />
            <img className="w-8 cursor-pointer" src={search} alt="" />
            <h1>h</h1>
        </div>
    )
}