export function loadLevel(level:string) {
    return fetch(`./${level}.json`)
        .then(r => r.json())
}