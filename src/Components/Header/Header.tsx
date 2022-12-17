import './Header.styles.css';
import logoImg from '../../img/Mortal-Kombat-Logo.png'

const Header = () => {
    return (
        <div className='header'>
            <div className='coloredBG'/>
            <img src={logoImg} width={50} className='img' alt='logo'/>
        </div>
    )
}

export default Header;