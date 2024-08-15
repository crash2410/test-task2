export const transformationRoleToTextVersion = (role) => {
    switch (role) {
        case "driver":
            return "водитель";
        case "waiter":
            return "официант";
        case "cook":
            return "повар";
        default:
            return ""
    }
}