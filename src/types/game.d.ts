declare interface Player {
    name: string;
    role: RoleNamesRef;
    team: "wolves" | "villagers"
}

declare interface Game {
    moderator: string;
    players: Array<Player>
    numberOfPlayers: number | "";
    balance: number;
    allRoles: Array<RoleCloudFirestore>
}