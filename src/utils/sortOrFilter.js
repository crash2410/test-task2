export function filteredStaffList(state){
    const {staffListCopy, selectFilter } = state;
    const { isArchive, value } = selectFilter;

    const isArchiveFilterActive = isArchive;
    const isRoleFilterActive = value !== "default";

    // Фильтруем список сотрудников по роли и архиву
    state.staffList  = staffListCopy.slice().filter(staff => {
        let isMatch = true;

        if (isRoleFilterActive) {
            isMatch = staff.role === value;
        }

        if (isArchiveFilterActive) {
            isMatch = isMatch && staff.isArchive === isArchive;
        }

        return isMatch;
    });
    state.staffFilteredList = [...state.staffList]
}

export function sortingStaffList(state) {
    let arrayDataName = ""
    if (state.selectFilter.value !== "default" || state.selectFilter.isArchive){
        arrayDataName = "staffFilteredList";
    } else {
        arrayDataName = "staffListCopy";
    }

    switch (state.sortParam?.value) {
        case "name_desc":
            state.staffList  = state[arrayDataName].slice().sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "name_asc":
            state.staffList  = state[arrayDataName].slice().sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "date_desc":
            state.staffList  = state[arrayDataName].slice().sort((a, b) => new Date(b.birthday.split('.').reverse().join('-')) - new Date(a.birthday.split('.').reverse().join('-')));
            break;
        case "date_asc":
            state.staffList  = state[arrayDataName].slice().sort((a, b) => new Date(a.birthday.split('.').reverse().join('-')) - new Date(b.birthday.split('.').reverse().join('-')));
            break;
        case "default":
            state.staffList = state[arrayDataName];
            break;
        default:
            state.staffList = state[arrayDataName];
    }
}