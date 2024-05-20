import { Link } from "react-router-dom";

const MenuItem = ({ menus}) => {
    return ( 
        <div className="menu-item">
            {menus.map(menu => (
                <div className = "menu-preview" key={menu.id}>
                    <Link to={`/menus/${menu.name}`}>
                        <p> { menu.name } </p>
                        <p> Allergens: { menu.allergens } </p>
                        <p> Time to cook: {menu.timeToCook}</p>
                    </Link>
                </div>
            ))} 
        </div>
     );
}

export default MenuItem;