import { Note, User } from "@/types";

export type BaseResponse = {
  status: string;
  message: string;
}

export type LoginResponse = BaseResponse & {
  data: {
    accessToken: string;
  }
}

export type UserResponse = BaseResponse & {
  data: User;
}

export type NoteResponse = BaseResponse & {
  data: Note;
}

export type NotesResponse = BaseResponse & {
  data: Note[];
}