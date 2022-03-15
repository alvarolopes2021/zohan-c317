import { Constants } from "src/constants";
import { ScheduleModel } from "./schedule.model";

export interface RequestMapModel {

}

export interface CreateScheduleRequestMap{
    date? : string;
    scheduleList?: ScheduleModel[];
}