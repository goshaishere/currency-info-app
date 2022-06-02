import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({ to, children, ...props }) => {
    const match = useMatch(to)
    return (
        <Link
            to={to}
            style={{
                color: match ? '#EBE5C2' : '#1F220B',
                backgroundColor: match ? '#3EA136' : '#EBE5C2'
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export { CustomLink }