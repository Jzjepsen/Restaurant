import CreateStaff from "../StaffManagement/CreateStaff";
import useFetch from "../../../services/useFetch";
import StaffMember from "../StaffManagement/StaffMember";

const StaffManagement = () => {
    const { data: staffs, isPending, error } = useFetch('http://localhost:8000/staffs');

    return (
        <div>
            <h1 className="pageTitle">Configure staff</h1>
            <div className="Staff">
                { error && <div>{ error }</div>}
                { isPending && <div>Loading...</div>}
                { staffs && <StaffMember staffs={staffs} /> }
            </div>
            <div>
                <CreateStaff/>
            </div>
        </div>
    );
}
 
export default StaffManagement;