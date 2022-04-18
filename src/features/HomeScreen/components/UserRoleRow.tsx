import React, { FC } from "react";
import { View } from "react-native";
import { RoleNamesRef, useRoles } from "~/src/services";
import { useAppTranslation } from "../../translations";
import { TableRow } from "./TableRow";

export interface UserRoleRowProps {
     role: RoleNamesRef;
     amount: 0;
}

export const UserRoleRow: FC<UserRoleRowProps> = ({
    role,
    amount
}) => {

    const { t } = useAppTranslation();

    const { data: allRoles } = useRoles();

    const rolePoints = allRoles?.find(allRolesRole => allRolesRole.name === role)?.points as number

    return <View>
        <TableRow
            first={t("roles." + role)}
            second={amount + ""} 
            third={rolePoints * amount + ""}
        />
    </View>
}