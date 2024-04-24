import MenuItem from "./MenuItem";
import CreateMenu from "./CreateMenu";
import useFetch from "../services/useFetch";

const Menu = () => {
    const { data: menus, isPending, error } = useFetch('http://localhost:8000/menus');

    return (
        <div>
            <h1 className="pageTitle">Configure menu</h1>
            <div className="Menu">
                { error && <div>{ error }</div>}
                { isPending && <div>Loading...</div>}
                { menus && <MenuItem menus={menus} /> }
            </div>
            <div>
                <CreateMenu/>
            </div>
        </div>
    );
}
 
export default Menu;