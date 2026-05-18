import footerItems from "../../data/footer.json"


function Footer(){

    return(
        <nav>
            <table>
                <tbody>
                    <tr>
                        {footerItems.map((item, index) => (
                            <td key={index}>
                                <strong>{item.titulo}</strong>
                                <ul>
                                    {item.lista.map((entrada, i) => (
                                        <li key={i}>
                                            <a href={entrada.link}>
                                                {entrada.texto}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </nav>
    );
}

export default Footer;