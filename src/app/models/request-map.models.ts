import { Constants } from "src/constants";
import { ScheduleModel } from "./schedule.model";

export interface RequestMapModel {

}

export interface CreateScheduleRequestMap {
    date?: string;
    scheduleList?: ScheduleModel[];
}

export interface UpdateScheduleRequestMap {
    date?: string;
    deletedSchedulesValues?: string[];
    schedulesToBeInserted?: ScheduleModel[]; //schedules added on edit section
    scheduleToBeUpdated?: Object; // Map<oldValue, newValue>
}