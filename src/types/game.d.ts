declare interface Player {
    name: string;
    role: string;
}

declare interface Game {
    moderator: string;
    players: Array<Player>
}