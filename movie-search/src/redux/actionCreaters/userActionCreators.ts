// actionCreaters/userActionCreators.ts
import { call, put, takeEvery } from "redux-saga/effects";
import { IChangePassword, ISignUp, IUser } from "../../types";
import { CHANGE_PASSWORD, CHANGE_USER_DATA, SET_USER, SIGN_IN_USER, SIGN_OUT, SIGN_UP_USER } from "../actionTypes/userActionTypes";

const signUpUser = (userData: ISignUp, navigate: Function) => ({
    type: SIGN_UP_USER,
    userData,
    navigate
});

const setUser = (user: IUser) => ({
    type: SET_USER,
    user,
});

const signInUser = (signInData: { email: string, password: string }, navigate: Function) => ({
    type: SIGN_IN_USER,
    signInData,
    navigate
});

const changeUserData = (user: IUser) => ({
    type: CHANGE_USER_DATA,
    user,
})

const changePassword = (user: IChangePassword) => ({
    type: CHANGE_PASSWORD,
    user,
})

const signout = () =>({
    type: SIGN_OUT
})

function* fetchChangePassword(action: any) {
    const resp: Response = yield fetch('http://localhost:3001/update_password', {
        method: 'POST',
        body: JSON.stringify(action.user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 200) {
      
        console.log("fetchChangePassword");
  

    }
}

function* fetchChangeUserData(action: any) {
    const resp: Response = yield fetch('http://localhost:3001/update_user', {
        method: 'POST',
        body: JSON.stringify(action.user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 200) {
        const data: IUser = yield resp.json();
        console.log("fetchChangeUserData", data);
        localStorage.setItem("user", JSON.stringify({user: {...data}}));

    }
}

function* signIn(action: any) {
    try {
        const resp: Response = yield call(fetch, 'http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(action.signInData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (resp.status === 200) {
            const data: IUser = yield resp.json();
            console.log("fetchSignUp response data:", data);
            yield put(setUser(data));
            localStorage.setItem("user", JSON.stringify(data));
            action.navigate('/movies/home'); // Используем navigate для перехода
        } else {
            console.error('Login failed with status:', resp.status);
            // Дополнительная обработка ошибки, если необходимо
        }
    } catch (error) {
        console.error('Login failed with error:', error);
        // Дополнительная обработка ошибки, если необходимо
    }
}

function* fetchSignUp(action: any) {
    try {
        console.log("fetchSignUp action:", action); // Логируем действие
        const response: Response = yield fetch (`http://localhost:3001/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.userData)
        });
        if (response.status === 201) {
            const data: IUser = yield response.json(); // Предполагаем, что сервер возвращает данные пользователя
            console.log("fetchSignUp response data:", data); // Логируем ответ сервера
            yield put(setUser(data)); // Используем данные из ответа сервера
            localStorage.setItem("user", JSON.stringify({...data}));
            console.log(data)
            action.navigate('/movies/home'); // Используем navigate для перехода
        } else {
            console.error("Failed to sign up user:", response.status);
        }
    } catch (error) {
        console.error("fetchSignUp error:", error);
    }
}

function* watcherUser() {
    yield takeEvery(SIGN_UP_USER, fetchSignUp);
    yield takeEvery(SIGN_IN_USER, signIn);
    yield takeEvery(CHANGE_USER_DATA, fetchChangeUserData);
    yield takeEvery(CHANGE_PASSWORD, fetchChangePassword);

}

export { signUpUser, watcherUser, setUser, signInUser, changeUserData, changePassword, signout };
