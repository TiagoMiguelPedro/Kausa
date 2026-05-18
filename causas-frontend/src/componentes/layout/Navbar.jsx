import menuNavbarItems from "../../data/navbar.json"
import {Link} from "react-router-dom";

function Navbar() {

    return (
        <nav>
            <table>
                <tbody>
                <tr>
                    {menuNavbarItems.map((item, index) => (
                        <th key={index}>
                            <Link to={item.link}>{item.nome}</Link>
                        </th>
                    ))}
                </tr>
                </tbody>
            </table>
        </nav>

    );
}

export default Navbar;