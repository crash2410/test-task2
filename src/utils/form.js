import toast from "react-hot-toast";

export function checkFormValidity(objData){
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{4}$/;
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (objData?.name.length === 0){
        toast.error('Укажите имя сотрудника!', {
            duration: 2000
        });
        return true
    } else if (!phoneRegex.test(objData?.phone)){
        toast.error('Введен неполный номер телефона!', {
            duration: 2000
        });
        return true
    } else if (!dateRegex.test(objData?.birthday)){
        toast.error('Введена неполная дата рождения!', {
            duration: 2000
        });
        return true
    } else if (objData?.role  === ""){
        toast.error('Укажите должность сотрудника!', {
            duration: 2000
        });
        return true
    }

    return false
}