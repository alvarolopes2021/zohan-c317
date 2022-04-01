export interface EditDayTimeActionModel{
    dayTimeId?: string;
    date?: Date;
    action?: string;
    oldValue?: string | null;
    newValue?: string | null;
}