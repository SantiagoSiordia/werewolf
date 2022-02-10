interface Player {
    name: string;
    role: string;
}

interface Game {
    moderator: string;
    players: Array<Player>
}