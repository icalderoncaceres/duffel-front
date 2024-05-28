export class WorkflowService {
    private static STEP: number = 0;

    public static getStep(): number {
        return this.STEP;
    }

    public static setStep(step: number): void {
        this.STEP = step;
    }
}
