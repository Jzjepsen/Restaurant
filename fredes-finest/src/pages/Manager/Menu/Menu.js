import MenuItem from "../Menu/MenuItem";
import CreateMenu from "../Menu/CreateMenu";
import useFetch from "../../../services/useFetch";sdsdsd
import "./Menu.css"

const Menu = () => {
    const { data: menus, isPending, error } = useFetch('http://localhost:8000/menus');

    return (
        <div className="menu-container">
            <h1 className="pageTitle">Configure menu</h1>
            <div className="menu-grid-container">
                <div className="menu-content">

                    { error && <div>{ error }</div>}
                    { isPending && <div>Loading...</div>}
                    { menus && <MenuItem menus={menus} /> }
                </div>
                <div className="create-menu-container">
                    <CreateMenu/>
                </div>
            </div>
        </div>
    );
}

export default Menu;
