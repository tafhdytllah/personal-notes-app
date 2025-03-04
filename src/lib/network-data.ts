import { BaseResponse, LoginResponse, Note, NoteResponse, NotesResponse, User, UserResponse } from "@/types";

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

const getAccessToken = (): string | null => localStorage.getItem("accessToken");

const putAccessToken = (accessToken: string): void => localStorage.setItem("accessToken", accessToken);

const fetchWithToken = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAccessToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers || {},
      Authorization: token ? `Bearer ${getAccessToken()}` : "",
    },
  });
}

const login = async ({
  email,
  password
}: {
  email: string;
  password: string
}): Promise<{ error: boolean; data: { accessToken: string } | null }> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseJson: LoginResponse = await response.json();
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("error:", error);
    return { error: true, data: null };
  }
}

const register = async ({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string
}): Promise<{ error: boolean }> => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson: BaseResponse = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true };
    }

    return { error: false };
  } catch (error) {
    console.error('error:', error);
    return { error: true };
  }
}

const getUserLogged = async (): Promise<{ error: boolean; data: User | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson: UserResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const addNote = async ({
  title,
  body
}: {
  title: string;
  body: string
}): Promise<{ error: boolean; data: Note | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const responseJson: NoteResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const getActiveNotes = async (): Promise<{ error: boolean; data: Note[] | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson: NotesResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const getArchivedNotes = async (): Promise<{ error: boolean; data: Note[] | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    const responseJson: NotesResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const getNote = async (id: string): Promise<{ error: boolean; data: Note | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    const responseJson: NoteResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

// async function archiveNote(id) {
//   const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
//     method: 'POST',
//   });

//   const responseJson = await response.json();

//   if (responseJson.status !== 'success') {
//     return { error: true, data: null };
//   }

//   return { error: false, data: responseJson.data };
// }

const archiveNote = async (id: string): Promise<{ error: boolean; data: string | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    const responseJson: BaseResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    console.log(responseJson);
    return { error: false, data: "ok" };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const unarchiveNote = async (id: string): Promise<{ error: boolean; data: string | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    const responseJson: BaseResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
    console.log(responseJson);
    return { error: false, data: "ok" };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

const deleteNote = async (id: string): Promise<{ error: boolean; data: string | null }> => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    const responseJson: BaseResponse = await response.json();

    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    console.log(responseJson);
    return { error: false, data: "ok" };
  } catch (error) {
    console.error('error:', error);
    return { error: true, data: null };
  }
}

export const NetworkData = {
  addNote,
  archiveNote,
  unarchiveNote,
  getAccessToken,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  deleteNote,
  getUserLogged,
  login,
  putAccessToken,
  register,
};

