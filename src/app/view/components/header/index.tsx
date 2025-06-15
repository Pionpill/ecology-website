import useDeviceStore from "@/hooks/useDeviceStore";
import { FC } from "react";
import PCHeader from "./PcHeader"
import MobileHeader from "./MobileHeader";

const Header: FC = () => {
    const { device } = useDeviceStore();

    return device === 'PC' ? <PCHeader/> : <MobileHeader/>;
}

export default Header;