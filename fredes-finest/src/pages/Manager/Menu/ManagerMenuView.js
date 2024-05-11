import Menu from '../../../Components/Menu/Menu';
import CreateMenu from "./CreateMenu";
import "./ManagerMenu.css"
import { useMenu } from '../../../services/MenuContext';

const ManagerMenuView = () => {
    const { menuItems } = useMenu();

    return (
        <div>
            <h1 className="pageTitle">Configure menu</h1>
            <div className="menu-grid-container">
                <div className="menu-column">
                    <Menu menuItems={menuItems} showSoldOutStatus={true} />
                </div>
                <div className="create-menu-column">
                    <CreateMenu/>
                </div>
            </div>
        </div>
    );
}
export default ManagerMenuView;
