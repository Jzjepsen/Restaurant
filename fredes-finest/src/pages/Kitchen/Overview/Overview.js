import React from 'react';
import { useMenu } from '../../../services/MenuContext'; // Ensure this path is correct
import Menu from '../../../Components/Menu/Menu'; // Adjust the path as necessary

function Overview() {
    const { menuItems, toggleSoldOut } = useMenu();

    return (
        <div>
            <h1>Kitchen Overview</h1>
            <p>This is the Kitchen Overview page.</p>
            <Menu menuItems={menuItems} showSoldOutStatus={true} onSoldOutChange={toggleSoldOut} />
        </div>
    );
}

export default Overview;
