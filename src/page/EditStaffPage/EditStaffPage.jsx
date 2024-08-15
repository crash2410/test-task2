import React, {useCallback, useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SelectRole from "../../components/ui/SelectRole/SelectRole";
import CheckBox from "../../components/ui/CheckBox/CheckBox";
import style from './EditStaffPage.module.scss';
import {fetchGetStaffById, fetchUpdateStaffList} from "../../store/thunk/staffThunk";
import {editStaff} from "../../store/slices/staffSlice";
import {checkFormValidity} from "../../utils/form";
import toast from "react-hot-toast";
import MainWrapper from "../../components/layout/MainWrapper/MainWrapper";

const roleList = [
    {name: "Водитель", value: "driver"},
    {name: "Повар", value: "cook"},
    {name: "Официант", value: "waiter"}
];

const EditStaffPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {staffId} = useParams();
    const {editedStaffData} = useSelector((state) => state.staffSlice);
    const [selectOption, setSelectOption] = useState({});

    useEffect(() => {
        dispatch(fetchGetStaffById(staffId));
    }, [staffId]);

    useEffect(() => {
        if (editedStaffData) {
            setSelectOption(roleList.find(option => option?.value === editedStaffData?.role));
        }
    }, [editedStaffData]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        dispatch(editStaff({type: name, [name]: type === 'checkbox' ? checked : value}));
    };

    const changeRole = (role) => {
        dispatch(editStaff({type: "role", role: role.value}));
        setSelectOption(role);
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!checkFormValidity(editedStaffData)) {
            dispatch(fetchUpdateStaffList(editedStaffData))
                .unwrap()
                .then(() => {
                    toast.success('Карточка сотрудника успешно обновлена!');
                    navigate("/");
                })
                .catch(() => {
                    toast.error('Ошибка при обновлении карточки сотрудника!', {
                        duration: 2000
                    });
                });
        }
    }, [dispatch, editedStaffData, navigate]);

    return (
        <MainWrapper>
            <header className={style.Header}>Редактирование карточки сотрудника</header>

            {editedStaffData && (
                <form className={style.EditStaffForm} onSubmit={handleSubmit}>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedStaffData?.name || ""}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="phone">Телефон:</label>
                    <InputMask
                        id="phone"
                        name="phone"
                        mask="+7\ (999) 999-9999"
                        placeholder="+7 (___) ___-____"
                        value={editedStaffData?.phone || ""}
                        onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="birthday">Дата рождения:</label>
                    <InputMask
                        id="birthday"
                        name="birthday"
                        mask="99.99.9999"
                        placeholder="ДД.ММ.ГГГГ"
                        value={editedStaffData?.birthday || ""}
                        onChange={handleChange}
                    />
                    <br/>
                    <label>Должность:</label>
                    <SelectRole
                        textValue={"-"}
                        options={roleList}
                        selectOptions={selectOption}
                        onSelect={changeRole}
                    />
                    <br/>
                    <CheckBox
                        name="isArchive"
                        onChange={handleChange}
                        inputValue={editedStaffData?.isArchive || false}
                        labelText={"В архиве"}
                    />
                    <br/>
                    <input type="submit" value="Сохранить"/>
                    <button type="button" onClick={() => navigate("/")}>Назад</button>
                </form>
            )}
        </MainWrapper>
    );
};

export default EditStaffPage;
