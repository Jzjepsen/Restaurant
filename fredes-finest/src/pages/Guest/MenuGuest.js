import React from 'react';
import { useMenu } from '../../services/MenuContext'; 
import Menu from '../../Components/Menu/Menu';

function MenuGuest() {
    const { menuItems } = useMenu();

    return (
        <div>
            <h1>Menu</h1>
            <Menu menuItems={menuItems} showSoldOutStatus={true} /> {/* Do not pass onSoldOutChange prop */}
        </div>
    );
}

export default MenuGuest;
