import { useUser } from "../../services/UserContext";
import Login from "../../Components/Login/Login";

const Home = () => {

    return (
        <div className="Home">
            <h1 className="pageTitle">Homepage</h1>
            <Login/>
        </div>
    );
}

export default Home;
