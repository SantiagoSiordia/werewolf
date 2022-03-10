declare interface Player {
    name: string;
    role: string;
    team: "wolves" | "villagers"
}

declare interface Game {
    moderator: string;
    players: Array<Player>
    numberOfPlayers: number | "";
    balance: number;
    allRoles: Array<RoleCloudFirestore>
}