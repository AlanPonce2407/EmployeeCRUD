// Este archivo es parte de un proyecto de gestión de empleados, donde se permite agregar nuevos usuarios a través de un formulario. El código está escrito en React y utiliza axios para realizar solicitudes HTTP a un servidor backend. También incluye soporte para múltiples idiomas (inglés y español) mediante un sistema de traducción simple.

import React from 'react'
import './adduser.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// Traducciones para los textos en inglés y español
const translations = {
    en: {
        addEmployee: "Add new employee",
        name: "Name",
        enterName: "Enter name",
        idNumber: "ID Number",
        enterId: "Enter ID number",
        dateOfBirth: "Date of Birth",
        developer: "Developer?",
        yes: "Yes",
        no: "No",
        description: "Description",
        enterDescription: "Enter description",
        area: "Area",
        enterArea: "Enter area",
        submit: "Submit",
        goBack: "Go Back"
    },
    es: {
        addEmployee: "Agregar nuevo empleado",
        name: "Nombre",
        enterName: "Ingrese nombre",
        idNumber: "DNI",
        enterId: "Ingrese DNI",
        dateOfBirth: "Fecha de nacimiento",
        developer: "¿Es desarrollador?",
        yes: "Sí",
        no: "No",
        description: "Descripción",
        enterDescription: "Ingrese descripción",
        area: "Área",
        enterArea: "Ingrese área",
        submit: "Enviar",
        goBack: "Volver"
    }
};

const AddUser = () => {
    // Lee el idioma guardado o usa 'es' por defecto
    const [lang, setLang] = React.useState(() => localStorage.getItem('lang') || 'es');
    const t = translations[lang];

    // Guarda el idioma en localStorage cuando cambia
    React.useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    // Estado inicial del usuario
    const initialUser = {
        name: '',
        idNumber: '',
        dateOfBirth: '',
        isDeveloper: false,
        description: '',
        area: ''
    };
    // Estado para manejar el usuario actual
    const [user, setUser] = React.useState(initialUser);
    const navigate = useNavigate();

    // Manejador de cambios en los inputs del formulario
    const inputHandler = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (name === "isDeveloper") {
            val = value === "true";
        }
        if (name === "idNumber") {
            val = value.replace(/\D/, '');
        }
        setUser({
            ...user,
            [name]: val
        });
    }
    
    // Manejador de envío del formulario
    const submitForm = async (e) => {
        e.preventDefault();
        const payload = {
            ...user,
            idNumber: Number(user.idNumber),
            isDeveloper: user.isDeveloper,
        };
        await axios
            .post('http://localhost:8000/api/user', payload)
            .then((response) => {
                toast.success(response.data.message, { position: 'top-right' })
                navigate('/');
            })
            .catch((error) => console.error(`Error adding user: ${error.message}`));
    }

    // Carga el idioma guardado al iniciar el componente
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

            <div className='addUser'>
                <Link to="/" className='btn btn-secondary'>
                    <i className="fa-solid fa-backward"></i> {t.goBack}
                </Link>
                <h3>{t.addEmployee}</h3>
                <form className='addUserForm' onSubmit={submitForm}>
                    <div className='inputGroup'>
                        <label htmlFor='name'>{t.name}</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder={t.enterName}
                            value={user.name}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='idNumber'>{t.idNumber}</label>
                        <input
                            type='text'
                            id='idNumber'
                            name='idNumber'
                            placeholder={t.enterId}
                            value={user.idNumber}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='dateOfBirth'>{t.dateOfBirth}</label>
                        <input
                            type='date'
                            id='dateOfBirth'
                            name='dateOfBirth'
                            value={user.dateOfBirth}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='isDeveloper'>{t.developer}</label>
                        <select
                            id='isDeveloper'
                            name='isDeveloper'
                            value={user.isDeveloper ? "true" : "false"}
                            onChange={inputHandler}
                        >
                            <option value='true'>{t.yes}</option>
                            <option value='false'>{t.no}</option>
                        </select>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='description'>{t.description}</label>
                        <textarea
                            id='description'
                            name='description'
                            placeholder={t.enterDescription}
                            value={user.description}
                            onChange={inputHandler}
                        ></textarea>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='area'>{t.area}</label>
                        <input
                            type='text'
                            id='area'
                            name='area'
                            placeholder={t.enterArea}
                            value={user.area}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className='inputGroup'>
                        <button type='submit' className='btn btn-primary'>{t.submit}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddUser;