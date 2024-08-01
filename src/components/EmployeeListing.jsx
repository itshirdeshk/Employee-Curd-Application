import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../service/api';

function EmployeeListing() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            setLoading(true);
            const data = await fetchEmployees();
            setEmployees(data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await deleteEmployee(id);
            fetchEmployeeData();
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Employees</h2>
                <Link to="/add-employee" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Employee
                </Link>
            </div>
            {employees.length === 0 ? (
                <p className="text-center py-4">No Employees in the system</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                        <li key={employee._id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">{employee.name}</p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <Link to={`/employee/${employee._id}`} className="mr-2 font-medium text-blue-600 hover:text-blue-500">
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteEmployee(employee._id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Employee ID: {employee._id}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EmployeeListing;