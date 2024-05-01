import { useContext } from 'react'
import style from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContex'

export function Header() {
    const { signOut } = useContext(AuthContext)
    return (
        <header className={style.headerContainer}>
            <div className={style.headerContent}>
                <Link href="/dashboard">
                    <img src='/logo.svg'></img>
                </Link>

                <nav className={style.menuNav}>
                    <Link href='category'>
                        Categoria
                    </Link>

                    <Link href='product'>
                        Cardapio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}></FiLogOut>
                    </button>
                </nav>

            </div>
        </header>
    )
}