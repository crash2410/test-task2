import React, {useMemo} from 'react';
import style from "./StaffListPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {transformationRoleToTextVersion} from "../../utils/transformation";
import SelectSort from "../../components/ui/SelectSort/SelectSort";
import {setFilter, setSortParams} from "../../store/slices/staffSlice";
import SelectRole from "../../components/ui/SelectRole/SelectRole";
import {useNavigate} from "react-router-dom";
import CheckBox from "../../components/ui/CheckBox/CheckBox";
import {fetchGetStaffList} from "../../store/thunk/staffThunk";
import MainWrapper from "../../components/layout/MainWrapper/MainWrapper";

const option = [{value: "default", text: "Сбросить"}, {
    value: "date_asc",
    text: "Дате рождения (ASC)"
}, {value: "date_desc", text: "Дате рождения (DESC)"}, {value: "name_asc", text: "Имени (ASC)"}, {
    value: "name_desc",
    text: "Имени (DESC)"
}]
const roleList = [{name: "Сбросить", value: "default"}, {name: "Водитель", value: "driver"}, {
    name: "Повар",
    value: "cook"
}, {name: "Официант", value: "waiter"}];

const StaffListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {staffList, selectFilter, sortParam, loading} = useSelector((state) => state.staffSlice)

    useMemo(() => {
        dispatch(fetchGetStaffList())
    }, [])

    const changeSelectOption = (selectData) => {
        dispatch(setSortParams(selectData));
    }

    const handleFilter = (selectFilterData) => {
        dispatch(setFilter(selectFilterData));
    }

    const editSelectStaff = (uid) => {
        navigate(`/editStaff/${uid}`)
    }

    const changeArchiveFilter = (e) => {
        const {checked} = e.target;
        dispatch(setFilter({
            type: "changeIsArchive",
            isArchive: checked
        }))
    }

    const createNewStaff = () => {
        navigate(`/createStaff`)
    }

    return (
        <MainWrapper>
            <header className={style.PageHeader}>Список сотрудников</header>
            <div className={style.TablePanel}>
                <SelectSort textValue={"Сортировать по"} options={option} selectOptions={sortParam}
                            onSelect={(selectData) => changeSelectOption(selectData)}/>
                <SelectRole textValue={"Выбрать фильтр"} options={roleList} selectOptions={selectFilter}
                            onSelect={(selectFilterData) => handleFilter(selectFilterData)}/>

                <CheckBox name={"isArchive"} onChange={changeArchiveFilter} inputValue={selectFilter.isArchive}
                          labelText={"Сотрудники \"в архиве\"."}/>
                <button onClick={createNewStaff} className={style.CreateStaff}>+</button>
            </div>

            <div className={style.tableWrapper}>
                <table border="0" cellSpacing="0" cellPadding="0" className={style.TableStaff}>
                    <thead>
                    <tr>
                        <th width="110px">Имя</th>
                        <th width="100px">Должность</th>
                        <th width="200px">Номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        loading && <tr>
                            <td colSpan="3" className={style.LoadingInfo}>Загрузка списка...</td>
                        </tr>
                    }
                    {
                        !loading && staffList && staffList.map(staff => {
                            return <tr className={style.StaffItem} key={staff.id} onClick={() => editSelectStaff(staff.id)}>
                                <td>{staff.name}</td>
                                <td>{transformationRoleToTextVersion(staff.role)}</td>
                                <td>{staff.phone}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </MainWrapper>
    );
};

export default StaffListPage;