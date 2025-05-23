import { MenuAction } from "../enum/index";

export interface IProject {
  id: number;
  name: string;
  color: string;
  favorite: boolean;
  archived: boolean;
  tasks: ITask[];
  section: ISection[];
  menuSetting: IItemMenu[];
}

export interface ISection {
  name: string;
  archived: boolean;
  task: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  time: string;
  done: boolean;
  description?: string;
  timeDone: string;
  term: string;
  priority: IPriority;
  subTask?: ISubTask[];
  comment?: IComment[];
}

export interface ISubTask {
  id: number;
  name: string;
  time: string;
  done: boolean;
  description?: string;
}

export interface IComment {
  name: string;
  comment: string;
  data: string;
}
export interface IPriority {
  value: string;
  color: string;
}

export interface IItemMenu {
  name: string;
  icon: string;
  style: string;
  disabled: boolean;
  action: MenuAction;
  visible?: boolean;
}
