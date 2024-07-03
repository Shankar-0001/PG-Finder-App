import { Link } from "react-router-dom";


export function Invalid() {
    return (
        <>
            <div>
                o..oow there is nothing to find try again
            </div>
            <div>
                <Link to='/login'>Try Again</Link>
            </div>
        </>
    )
}