import axios from 'axios';
import jsonpath from 'jsonpath';

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoxNzE4MjY3Njg3LCJhcHBfaWQiOjE3MTgyNjc2ODd9.4qjbW9gwtVxtnLQ66gFlvK5P4ii_J5G3ArNltOD6hBw';

const headers = {
    'Host': 'api.usersbox.ru',
    'Authorization': key
};

async function user_api(query) {
    const url = `http://api.usersbox.ru/v1/search?q=${query}`;

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;

        let mes = "";

        const matches = jsonpath.query(data, '$.data.items[*].hits.items[*]');

        for (const match of matches) {
            for (const [key, value] of Object.entries(match)) {
                const newKey = key.replace("last_name", "Фамилия")
                                  .replace("first_name", "Имя")
                                  .replace("_id", "")
                                  .replace("_score", "")
                                  .replace("fullname", "Имя")
                                  .replace("surname", "Фамилия")
                                  .replace("name", "Имя")
                                  .replace("address", "Адрес")
                                  .replace("bday", "Дата Рождения")
                                  .replace("patronymic", "Отчество")
                                  .replace("gender", "Пол")
                                  .replace("city", "Город")
                                  .replace("country", "Страна")
                                  .replace("photo_max", "Фото")
                                  .replace("photo_max_orig", "Фото")
                                  .replace("mobile_phone", "Номер телефона")
                                  .replace("status", "Статус")
                                  .replace("domain", "Ник");

                let newValue = value;
                if (typeof value === 'string' && value.startsWith("https://")) {
                    newValue = `<a href="${value}">Открыть</a>`;
                } else if (typeof value === 'object') {
                    newValue = JSON.stringify(value);
                }

                mes += `<b>${newKey}</b>: ${newValue}\n`;
            }
        }

        return mes;
    } catch (error) {
        console.error(error);
        return 'Произошла ошибка при поиске информации. Пожалуйста, попробуйте снова позже.';
    }
}

export default user_api;
