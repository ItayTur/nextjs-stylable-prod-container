import Link from 'next/link'
import classes from './Logo.module.css'

const Logo = props => {
    return (
        <Link href='/'>
            <a className={classes.Logo}>
                <img src='/genie-lamp.jpg' alt='genie action logo' />
                <strong>Genie Action</strong>
            </a>
        </Link>
    )
}

export default Logo