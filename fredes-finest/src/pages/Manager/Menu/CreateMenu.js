import { useState } from 'react'
import './CreateMenu.css';

const CreateMenu = () => {
    const [name, setName] = useState('');
    const [allergens, setAllergens] = useState('');
    const [price, setPrice] = useState('');
    const [timeToCook, setTimeToCook] = useState('20');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const menu = { name, allergens, price, timeToCook };

        setIsPending(true);

        fetch('https://localhost:7033/api/MenuItems', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu)
        }).then(() => {
            console.log('new menu added');
            setIsPending(false);
        })
    }

    return ( 
        <div className="createMenu">
            <h1> Add a new menu</h1>
            <form onSubmit={handleSubmit}>
                <label className="menuAttributeTitle">Menu name:</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="menuAttributeTitle">Menu allergens:</label>
                <input 
                    type="text"
                    required
                    value={allergens}
                    onChange={(e) => setAllergens(e.target.value)}
                />
                <label className="menuAttributeTitle">Menu price:</label>
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                />
                <label className="menuAttributeTitle">Menu timeToCook:</label>
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