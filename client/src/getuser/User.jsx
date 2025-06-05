// Este archivo se encarga del manejo de empleados en un sistema de gestión, permitiendo listar, agregar, actualizar y eliminar usuarios.

import React, { useEffect, useState } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const translations = {
    en: {
        title: "Employee Management System",
        addEmployee: "Add Employee",
        noData: "No Data Available",
        addPrompt: "Please add a user to see them listed here.",
        name: "Name",
        idNumber: "ID number",
        dateOfBirth: "Date of Birth",
        developer: "Developer?",
        yes: "Yes",
        no: "No",
        description: "Description",
        area: "Area",
        actions: "Actions",
        addBtn: "Add Employee"
    },
    es: {
        title: "Sistema de gestión de empleados",
        addEmployee: "Agregar empleado",
        noData: "No hay datos disponibles",
        addPrompt: "Por favor agregue un usuario para verlo listado aquí.",
        name: "Nombre",
        idNumber: "DNI",
        dateOfBirth: "Fecha de nacimiento",
        developer: "¿Es desarrollador?",
        yes: "Sí",
        no: "No",
        description: "Descripción",
        area: "Área",
        actions: "Acciones",
        addBtn: "Agregar empleado"
    }
};

const User = () => {
    const [users, setUsers] = useState([]);
    const [lang, setLang] = React.useState(() => localStorage.getItem('lang') || 'es');
    const t = translations[lang];

    // Guarda el idioma en localStorage cuando cambia
    React.useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/user/${id}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter(user => user._id !== id));
                toast.success(response.data.message, { position: 'top-right' });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                toast.error('Error deleting user', { position: 'top-right' });
            });
    }

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) setLang(savedLang);
    }, []);

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    return (
        <>
            <div className='header'>
                <img src="https://buenosaires.gob.ar/themes/custom/obelisco/logo.svg" alt="Logo" />
                <div style={{ textAlign: 'right', margin: '10px 0' }}>
                    <div style={{ textAlign: 'right', margin: '10px 0' }}>
                        <img className='flag'
                            src="https://flagcdn.com/w40/ar.png"
                            alt="Español"
                            onClick={() => setLang('es')}
                            style={{ cursor: 'pointer', width: 32 }}
                        />
                        <img className='flag'
                            src="https://flagcdn.com/w40/gb.png"
                            alt="English"
                            onClick={() => setLang('en')}
                            style={{ cursor: 'pointer', width: 32, marginRight: 8 }}
                        />

                    </div>
                </div>
            </div>
            
            <h1 className='title'>{t.title}</h1>

            <div className='userTable'>
                <Link to="/add" className='btn btn-primary'>
                    {t.addBtn} <i className="fa-solid fa-user-plus"></i>
                </Link>

                {users.length === 0 ? (
                    <div className='noUser'>
                        <h2>{t.noData}</h2>
                        <p>{t.addPrompt}</p>
                    </div>
                ) : (<table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">{t.name}</th>
                            <th scope="col">{t.idNumber}</th>
                            <th scope="col">{t.dateOfBirth}</th>
                            <th scope="col">{t.developer}</th>
                            <th scope="col">{t.description}</th>
                            <th scope="col">{t.area}</th>
                            <th scope="col">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index}>
                                <td data-label={t.name}>{user.name}</td>
                                <td data-label={t.idNumber}>{user.idNumber}</td>
                                <td data-label={t.dateOfBirth}>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}</td>
                                <td data-label={t.developer}>{user.isDeveloper ? t.yes : t.no}</td>
                                <td data-label={t.description}>{user.description}</td>
                                <td data-label={t.area}>{user.area}</td>
                                <td data-label={t.actions} className='actionButtons'>
                                    <Link
                                        to={`/update/${user._id}`}
                                        type="button"
                                        className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>)}
            </div>
        </>
    )
}

export default User;