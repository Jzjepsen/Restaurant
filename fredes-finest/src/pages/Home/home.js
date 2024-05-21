import { useUser } from "../../services/UserContext";
import Login from "../../Components/Login/Login";

const Home = () => {
    const { setUser } = useUser();

    const handleRoleChange = (e) => {
        setUser({ role: e.target.value });
    };

    return (
        <div className="Home">
            <h1 className="pageTitle">Homepage</h1>
            <p>This works</p>
            <select onChange={handleRoleChange} defaultValue="Select a role">
                <option disabled value="Select a role">Select a role</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Waiter">Waiter</option>
                <option value="Manager">Manager</option>
            </select>
            <br/>
            <Login></Login>
        </div>
    );
}

export default Home;
