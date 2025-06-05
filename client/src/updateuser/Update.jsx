// Este archivo se encarga de actualizar la información de un empleado existente. Permite editar campos como nombre, número de documento, fecha de nacimiento, si es desarrollador, descripción y área.
import React from 'react'
import './update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const translations = {
    en: {
        goBack: "Go Back",
        updateEmployee: "Update employee",
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
        submit: "Submit"
    },
    es: {
        goBack: "Volver",
        updateEmployee: "Actualizar empleado",
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
        submit: "Enviar"
    }
};

// Este componente UpdateUser permite actualizar la información de un usuario existente.
const UpdateUser = () => {
    const initialUser = {
        name: '',
        idNumber: '',
        dateOfBirth: '',
        isDeveloper: false,
        description: '',
        area: ''
    };
    const [user, setUser] = React.useState(initialUser);
    const [lang, setLang] = React.useState(() => localStorage.getItem('lang') || 'es');
    const t = translations[lang];

    const navigate = useNavigate();
    const { id } = useParams();

    // Manejador de cambios de entrada
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

    // Cargar datos del usuario al montar el componente
    React.useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
        });
    }, [id]);

    // Mantener idioma seleccionado al cambiarlo con bandera
    React.useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    const submitForm = async (e) => {
        e.preventDefault();
        const payload = {
            ...user,
            idNumber: Number(user.idNumber),
            isDeveloper: user.isDeveloper,
        };
        await axios
        .put(`http://localhost:8000/api/update/user/${id}`, payload)
        .then((response) => {
            toast.success(response.data.message, { position: 'top-right'})
            navigate('/');
        })
        .catch((error) => console.error(`Error adding user: ${error.message}`));
    }
    
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
            <h3>{t.updateEmployee}</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='name'>{t.name}</label>
                    <input 
                        type='text' 
                        id='name' 
                        value={user.name}
                        name='name' 
                        placeholder={t.enterName}
                        onChange={inputHandler}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='idNumber'>{t.idNumber}</label>
                    <input 
                        type='text' 
                        id='idNumber'
                        value={user.idNumber} 
                        name='idNumber' 
                        placeholder={t.enterId}
                        onChange={inputHandler}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='dateOfBirth'>{t.dateOfBirth}</label>
                    <input 
                        type='date' 
                        id='dateOfBirth' 
                        value={user.dateOfBirth}
                        name='dateOfBirth' 
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
                        value={user.description}
                        placeholder={t.enterDescription}
                        onChange={inputHandler}
                    ></textarea>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='area'>{t.area}</label>
                    <input 
                        type='text' 
                        id='area' 
                        name='area' 
                        value={user.area}
                        placeholder={t.enterArea}
                        onChange={inputHandler}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>{t.submit}</button>
            </form>
        </div>
      </>
    )
}

export default UpdateUser;

