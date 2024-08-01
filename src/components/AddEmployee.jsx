import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../service/api';

function AddEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        address: { line1: '', city: '', country: '', zip_code: '' },
        contact_methods: [{ contact_method: 'EMAIL', value: '' }]
    });

    const handleChange = (e, field, index = null) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setEmployee(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: e.target.value }
            }));
        } else if (index !== null) {
            const newContactMethods = [...employee.contact_methods];
            newContactMethods[index] = { ...newContactMethods[index], [field]: e.target.value };
            setEmployee(prev => ({ ...prev, contact_methods: newContactMethods }));
        } else {
            setEmployee(prev => ({ ...prev, [field]: e.target.value }));
        }
    };

    const addContactMethod = () => {
        setEmployee(prev => ({
            ...prev,
            contact_methods: [...prev.contact_methods, { contact_method: 'EMAIL', value: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createEmployee(employee);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 divide-y divide-gray-200">
            <div className="space-y-4 divide-y divide-gray-200">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Employee</h3>
                    <p className="mt-1 text-sm text-gray-500">Please fill in the employee details.</p>
                </div>

                <div className="">
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={employee.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="address.line1" className="block text-sm font-medium text-gray-700">
                                Address Line 1
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="address.line1"
                                    id="address.line1"
                                    value={employee.address.line1}
                                    onChange={(e) => handleChange(e, 'address.line1')}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="address.city"
                                    id="address.city"
                                    value={employee.address.city}
                                    onChange={(e) => handleChange(e, 'address.city')}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="address.country"
                                    id="address.country"
                                    value={employee.address.country}
                                    onChange={(e) => handleChange(e, 'address.country')}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address.zip_code" className="block text-sm font-medium text-gray-700">
                                ZIP / Postal code
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="address.zip_code"
                                    id="address.zip_code"
                                    value={employee.address.zip_code}
                                    onChange={(e) => handleChange(e, 'address.zip_code')}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Methods</h3>
                        <p className="mt-1 text-sm text-gray-500">Add at least one contact method of the employee.</p>
                    </div>
                    <div className="mt-6 space-y-6">
                        {employee.contact_methods.map((contact, index) => (
                            <div key={index} className="flex items-center gap-x-4">
                                <div className="w-full sm:w-1/3">
                                    <label htmlFor={`contact_method_${index}`} className="block text-sm font-medium text-gray-700">
                                        Contact Method
                                    </label>
                                    <select
                                        id={`contact_method_${index}`}
                                        name={`contact_method_${index}`}
                                        value={contact.contact_method}
                                        onChange={(e) => handleChange(e, 'contact_method', index)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-1"
                                    >
                                        <option value="EMAIL">Email</option>
                                        <option value="PHONE">Phone</option>
                                    </select>
                                </div>
                                <div className="w-full sm:w-2/3">
                                    <label htmlFor={`contact_value_${index}`} className="block text-sm font-medium text-gray-700">
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        name={`contact_value_${index}`}
                                        id={`contact_value_${index}`}
                                        value={contact.value}
                                        onChange={(e) => handleChange(e, 'value', index)}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addContactMethod}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Contact Method
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddEmployee;