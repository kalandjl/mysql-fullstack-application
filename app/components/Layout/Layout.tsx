import { FC, ReactElement } from "react";
import Footer from "../Footer";
import Nav from "../Nav";

interface Props {
    children: ReactElement
}

const Layout: FC<Props> = (props: Props) => {

    return (
        <>
            <Nav />
            <div
            className={`
            px-32
            bg-white`
            }
            >
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout