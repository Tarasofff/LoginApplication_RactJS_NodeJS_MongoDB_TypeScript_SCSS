export const StepsRegister = (counter: number): void => {
       if (counter === 1) {
        (document.getElementById("Step1") as HTMLInputElement).style.display = "none";
        (document.getElementById("Step2") as HTMLInputElement).style.display = "inline";
        (document.getElementById("Step4") as HTMLButtonElement).style.display = "inline";
        (document.getElementById("Step3") as HTMLButtonElement).style.display = "none";
        (document.getElementById("Step") as HTMLInputElement).style.display = "none";
    }
}
