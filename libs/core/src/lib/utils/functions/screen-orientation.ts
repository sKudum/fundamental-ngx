export enum FdScreenOrientation {
    'LANDSCAPE',
    'PORTRAIT',
}

export function screenOrientation(window): FdScreenOrientation {
    return window.innerWidth > window.innerHeight
        ? FdScreenOrientation.LANDSCAPE
        : FdScreenOrientation.PORTRAIT;
}
