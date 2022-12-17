import Header from "../Header/Header";
import './Layout.styles.css'
type LayoutProps = {
    children: JSX.Element[]
}
const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <div className='header'>
                <Header/>
            </div>
            <div className='body'>
                {children}
            </div>
        </div>

    )
}
export default Layout;