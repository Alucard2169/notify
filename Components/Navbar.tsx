import { authContext, AuthContextProps } from "@/context/AuthContext";
import Image from "next/image";
import pfp from '@/public/1.jpg'
import { useState ,useContext} from "react";

const Navbar = () => {

const contextValue = useContext(authContext) ?? ({} as AuthContextProps);
  const { setState } = contextValue;


    const [select, setSelect] = useState<boolean>(true);

    const handleSelect = ():void => {
        setSelect(!select)
    }

    const handleAuthFormVisibility = ():void => {
        setState(true)
    }

    return ( 
        <nav className="w-screen px-8 py-2 flex justify-between items-center bg-PRIMARY">
            <ul className="flex gap-4 items-center">
                <li className={`${select ? 'custom-list':'custom-list-N'} transition-all duration-200`} onClick={handleSelect}>Tech</li>
                <li className={`${!select ? 'custom-list':'custom-list-N'} transition-all duration-200`} onClick={handleSelect}>Projects</li>
            </ul>
 
                <ul className="flex gap-8 items-center">
                    <li className="px-2 py-1 text-white bg-COMPONENT_BG text-MAIN font-semibold rounded-lg cursor-pointer" onClick={handleAuthFormVisibility} >Sign-In</li>
                    <Image alt="userPfp" className="rounded-full w-10 h-10 object-cover" width={50} height={70} src={pfp} />
                </ul>
         
        </nav>
     );
}
 
export default Navbar;