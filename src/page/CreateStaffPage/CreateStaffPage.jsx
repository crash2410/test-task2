import React, {useCallback, useState} from 'react';
import InputMask from 'react-input-mask';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import SelectRole from "../../components/ui/SelectRole/SelectRole";
import CheckBox from "../../components/ui/CheckBox/CheckBox";
import style from './CreateStaffPage.module.scss';
import {fetchCreateStaff} from "../../store/thunk/staffThunk";
import toast from "react-hot-toast";
import {checkFormValidity} from "../../utils/form";
import MainWrapper from "../../components/layout/MainWrapper/MainWrapper";

const roleList = [
    {name: "Водитель", value: "driver"},
    {name: "Повар", value: "cook"},
    {name: "Официант", value: "waiter"}
];

const CreateStaffPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [staffData, setStaffData] = useState({
        id: null,
        name: "",
        isArchive: false,
        role: "",
        phone: "",
        birthday: "",
    });
    const [selectOption, setSelectOption] = useState({name: "", value: "default"});

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setStaffData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const changeRole = (role) => {
        setStaffData(prevData => ({...prevData, role: role.value}));
        setSelectOption(role);
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!checkFormValidity(staffData)) {
            staffData.id = uuidv4();
            dispatch(fetchCreateStaff(staffData))
                .unwrap()
                .then(() => {
                    toast.success('Карточка сотрудника успешно создана!');
                    navigate("/");
                })
                .catch(() => {
                    toast.error('Ошибка при создании карточки сотрудника!', {
                        duration: 2000
                    });
                });
        }
    }, [staffData, dispatch, navigate]);

    return (
        <MainWrapper>
            <header className={style.Header}>Создание карточки сотрудника</header>

            {staffData && (
                <form className={style.EditStaffForm} onSubmit={handleSubmit}>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={staffData.name}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="phone">Телефон:</label>
                    <InputMask
                        id="phone"
                        name="phone"
                        mask="+7\ (999) 999-9999"
                        placeholder="+7 (___) ___-____"
                        value={staffData.phone}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="birthday">Дата рождения:</label>
                    <InputMask
                        id="birthday"
                        name="birthday"
                        mask="99.99.9999"
                        placeholder="ДД.ММ.ГГГГ"
                        value={staffData.birthday}
                        onChange={handleChange}
                    />
                    <br/>
                    <label>Должность:</label>
                    <SelectRole
                        textValue={"Выбрать"}
                        options={roleList}
                        selectOptions={selectOption}
                        onSelect={changeRole}
                    />
                    <br/>
                    <CheckBox
                        onChange={handleChange}
                        inputValue={staffData.isArchive}
                        labelText={"В архиве"}
                        name="isArchive"
                    />
                    <br/>
                    <input type="submit" value="Создать"/>
                    <button type="button" onClick={() => navigate("/")}>Назад</button>
                </form>
            )}
        </MainWrapper>
    );
};

export default CreateStaffPage;
