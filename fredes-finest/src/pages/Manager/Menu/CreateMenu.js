import './CreateMenu.css';
import { useMenu } from '../../../services/MenuContext';

const CreateMenu = () => {
    const { name, description, price, timeToCook, isPending, setName, setDescription, setPrice, setTimeToCook, setIsPending, addMenuItem } = useMenu();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMenuItem = { name, description, price, timeToCook };

        addMenuItem(newMenuItem);
    }

    return ( 
        <div className="createMenu">
            <h2> Add a new dish to the menu</h2>
            <form onSubmit={handleSubmit}>
                <label className="menuAttributeTitle">Menu name:</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="menuAttributeTitle">Menu Description:</label>
                <input 
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className="menuAttributeTitle">Menu price:</label>
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                />
                <label className="menuAttributeTitle">Cooking time:</label>
                <select
                value={timeToCook}
                onChange={(e) => setTimeToCook(e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                </select>
                {!isPending && <button>Add menu</button>}
                {isPending && <button disabled>Adding menu...</button>}
            </form>
        </div>
     );
}
 
export default CreateMenu;