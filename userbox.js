import axios from 'axios';
import jsonpath from 'jsonpath';

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoxNzE4MjY3Njg3LCJhcHBfaWQiOjE3MTgyNjc2ODd9.4qjbW9gwtVxtnLQ66gFlvK5P4ii_J5G3ArNltOD6hBw';

const headers = {
    'Host': 'api.usersbox.ru',
    'Authorization': key
};

async function user_api(value) {
    const url = `http://api.usersbox.ru/v1/search?q=${value}`;

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;

        let mes = "";

        const matches = jsonpath.query(data, '$.data.items[*].hits.items[*]');

        for (const match of matches) {
            for (const [key, value] of Object.entries(match)) {
                const newKey = key.replace("last_name", "Имя").replace("first_name", "Имя").replace("_id", "").replace("_score", "").replace("fullname", "Имя").replace("surname", "Фамилия").replace("name", "Имя").replace("address", "Адрес").replace("bday", "Дата Рождения").replace("patronymic", "Отчество").replace("gender", "Пол");
                //const newValue = value.replace("[object Object]", "")
                if (value.indexOf("https://")) {
                    var newValue = `<a href="${value}">Открыть</a>`
                    mes = mes + "<b>" + newKey + "</b>" + ":" + " " + newValue + "\n";
                } else {
                    mes = mes + "<b>" + newKey + "</b>" + ":" + " " + value + "\n";
                }
                //mes = mes + "<b>" + newKey + "</b>" + ":" + " " + value + "\n";
            }
        }

        return mes;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default user_api;