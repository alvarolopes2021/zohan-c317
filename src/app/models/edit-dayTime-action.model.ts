export interface EditDayTimeActionModel{
    dayTimeId?: string;
    date?: string;
    action?: string;
    oldValue?: string | null;
    newValue?: string | null;
}