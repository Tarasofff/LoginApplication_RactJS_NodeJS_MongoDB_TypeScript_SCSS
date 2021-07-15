export const Log = (check: boolean): void => {
    if (check) {
        (document.getElementById('login_inputs') as HTMLElement).style.display = "none";
        (document.getElementById('Logout') as HTMLButtonElement).style.display = "inline";
        (document.getElementById('EmailConfirm') as HTMLButtonElement).style.display = "inline";
    } else {
        (document.getElementById('login_inputs') as HTMLElement).style.display = "inline";
        (document.getElementById('Logout') as HTMLButtonElement).style.display = "none";
        (document.getElementById('EmailConfirm') as HTMLButtonElement).style.display = "none";
    }
}