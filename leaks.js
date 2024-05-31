import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';

async function leak(phone) {
    const checkRow = 'vtb_user,';
    let checkRow1 = '';
    let linePhone = '';
    let answer = '';


    const part1 = phone.slice(0, 2);
    const part2 = phone.slice(2, 4);
    const part3 = phone.slice(4, 6);
    const part4 = phone.slice(6, 8);
    const part = `${part1}/${part2}/${part3}/${part4}.csv`;

    const URLavito = `https://data.intelx.io/saverudata/db2/dbpn/${part}`;
    const tempFilePath = path.join('/tmp', 'leak.csv');

    try {
        const response = await axios.get(URLavito);
        const data = response.data;

        await fs.writeFile(tempFilePath, data, 'utf-8');
        const fileContent = await fs.readFile(tempFilePath, 'utf-8');
        const lines = fileContent.split('\n');

        for (let line of lines) {
            if (line.includes(checkRow)) {
                checkRow1 = line;
                break;
            }
        }

        for (let line of lines) {
            if (line.includes(phone)) {
                linePhone = line;
                const checkka = checkRow1.replace(/,/g, '\n');
                const count = (checkka.match(/\n/g) || []).length - 1;

                for (let num = 2; num < count; num++) {
                    linePhone += ',,,,,';
                    const result = linePhone.split(',')[num];
                    const por = checkRow1.split(',')[num];
                    const headr = por
                        .replace('cdek_full_name', '👤 <b>ФИО:</b> ')
                        .replace('fb_profile_id', '🧿 <b>Ссылка на профиль Facebook:</b> https://facebook.com/profile.php?id=')
                        .replace('fb_full_name', '🧿 <b>Имя профиля Facebook:</b> ')
                        .replace('vk_first_name', '🤖 <b>Имя профиля ВК:</b> ')
                        .replace('vk_last_name', '🤖 <b>Фамилия профиля ВК:</b> ')
                        .replace('vk_email', '🤖 <b>Почта, привязанная к ВК:</b> ')
                        .replace('vtb_user', '💎 <b>Клиент ВТБ:</b> ')
                        .replace('cdek_email', '📧 <b>Почта:</b> ')
                        .replace('fb_address1', '🧿 <b>Адрес профиля Facebook:</b> ')
                        .replace('fb_address2', '🧿 <b>Адрес профиля Facebook:</b> ')
                        .replace('fb_work', '🧿 <b>Работа в профиле Facebook:</b> ')
                        .replace('yandex_name', '💊 <b>Имя из Яндекс:</b> ')
                        .replace('yandex_created_at', 'mt')
                        .replace('yandex_place_id', 'mt')
                        .replace('yandex_place_name', 'mt')
                        .replace('yandex_address_city', '🏠 <b>Возможный город:</b> ')
                        .replace('yandex_address_street', '🏠 <b>Возможная улица:</b> ')
                        .replace('yandex_address_house', '🏠 <b>Возможный номер дома:</b> ')
                        .replace('yandex_address_comment', 'mt')
                        .replace('yandex_region_id', 'mt')
                        .replace('yandex_latitude', 'mt')
                        .replace('yandex_longitude', 'mt')
                        .replace('yandex_amount_rub', 'mt')
                        .replace('yandex_sum_orders', 'mt')
                        .replace('yandex_user_agent', '🕹 <b>User-Agent:</b> ')
                        .replace('yandex_address_entrance', 'mt')
                        .replace('yandex_address_floor', 'mt')
                        .replace('yandex_address_office', 'mt')
                        .replace('yandex_address_doorcode', '🚪 <b>Номер квартиры:</b> ')
                        .replace('pikabu_username', '💿 <b>Имя пользователя на Pikabu:</b> ')
                        .replace('pikabu_email', '💿 <b>Почта на Pikabu:</b> ')
                        .replace('rfcont_name', '🌚 <b>Возможное имя:</b> ')
                        .replace('rfcont_email', '📧 <b>Почта:</b> ')
                        .replace('miltor_name', '🎾 <b>Имя на Miltor:</b> ')
                        .replace('miltor_email', '🎾 <b>Почта на Miltor:</b> ')
                        .replace('miltor_fio', '🎾 <b>ФИО на Miltor:</b> ')
                        .replace('mailru_email', '🦋 <b>Почта на MailRU:</b> ')
                        .replace('mailru_profile', 'mt')
                        .replace('mailru_full_name', '🦋 <b>Имя на MailRU:</b> ')
                        .replace('mailru_avatar', 'mt')
                        .replace('mailru_age', 'mt')
                        .replace('wildberries_name', '🦄 <b>Имя на WildBerries:</b> ')
                        .replace('wildberries_comment', 'mt')
                        .replace('wildberries_email', '🦄 <b>Почта на WildBerries:</b> ')
                        .replace('wildberries_address', '🦄 <b>Адрес на WildBerries:</b> ')
                        .replace('wildberries_lat', 'mt')
                        .replace('wildberries_lon', 'mt')
                        .replace('avito_user_name', '🏪 <b>Имя на Авито:</b> ')
                        .replace('avito_price', 'mt')
                        .replace('avito_ad_pdate', 'mt')
                        .replace('avito_ad_title', 'mt')
                        .replace('avito_city', '🏪 <b>Город на Авито:</b> ')
                        .replace('avito_user_location', '🏪 <b>Локация на Авито:</b> ')
                        .replace('gibdd2_name', '🚗 <b>ГИБДД имя:</b> ')
                        .replace('gibdd2_passport_address', '🚗 <b>ГИБДД адрес паспорта:</b> ')
                        .replace('gibdd2_passport', '🚗 <b>ГИБДД паспорт:</b> ')
                        .replace('gibdd2_dateofbirth', '🚗 <b>ГИБДД дата рождения:</b> ')
                        .replace('gibdd2_base_name', 'mt')
                        .replace('gibdd2_car_vin', '🚗 <b>ГИБДД VIN:</b> ')
                        .replace('gibdd2_car_year', 'mt')
                        .replace('gibdd2_car_model', 'mt')
                        .replace('gibdd2_car_plate_number', '🚗 <b>ГИБДД гос. номер автомобиля:</b> ')
                        .replace('sushi_name', '⛩ <b>Имя заказчика СушиМастер:</b> ')
                        .replace('sushi_date', 'mt')
                        .replace('sushi_address_city', '⛩ <b>Город заказчика СушиМастер:</b> ')
                        .replace('sushi_address_street', '⛩ <b>Улица заказчика СушиМастер:</b> ')
                        .replace('sushi_address_home', '⛩ <b>Дом заказчика СушиМастер:</b> ')
                        .replace('sushi_address_housing', '⛩ <b>Квартира заказчика СушиМастер:</b> ')
                        .replace('sushi_lat', 'mt')
                        .replace('sushi_long', 'mt')
                        .replace('beeline_full_name', '🐝 <b>ФИО абонента Билайн:</b> ')
                        .replace('beeline_address_city', '🐝 <b>Город абонента Билайн:</b> ')
                        .replace('beeline_address_city', '🐝 <b>Город абонента Билайн:</b> ')
                        .replace('beeline_address_street', '🐝 <b>Улица абонента Билайн:</b> ')
                        .replace('beeline_address_house', '🐝 <b>Дом абонента Билайн:</b> ')
                        .replace('beeline_address_appt', '🐝 <b>Квартира абонента Билайн:</b> ')
                        .replace('beeline_address_floors_count', 'mt')
                        .replace('beeline_address_entrance_count', 'mt')
                        .replace('beeline_latitude', 'mt')
                        .replace('beeline_longitude', 'mt')
                        .replace('beeline_inet_info', '🐝 <b>Тариф абонента Билайн:</b> ')
                        .replace('beeline_inet_mbps', 'mt')
                        .replace('gibdd_name', '🚗 <b>ГИБДД имя:</b> ')
                        .replace('gibdd_passport_address', '🚗 <b>ГИБДД адрес паспорта:</b> ')
                        .replace('gibdd_passport', '🚗 <b>ГИБДД паспорт:</b> ')
                        .replace('gibdd_dateofbirth', '🚗 <b>ГИБДД дата рождения:</b> ')
                        .replace('gibdd_base_name', 'mt')
                        .replace('gibdd2_car_vin', '🚗 <b>ГИБДД VIN:</b> ')
                        .replace('gibdd_car_year', 'mt')
                        .replace('gibdd_car_model', 'mt')
                        .replace('gibdd_car_plate_number', '🚗 <b>ГИБДД гос. номер автомобиля:</b> ')
                        .replace('gibdd_old_car_plate_number', '🚗 <b>ГИБДД старый гос. номер автомобиля:</b> ')
                        .replace('gibdd2_old_car_plate_number', '🚗 <b>ГИБДД старый гос. номер автомобиля:</b> ')
                        .replace('lnmatch_last_name', '🛡 <b>Возможная фамилия:</b> ')
                        .replace('sushi_amount_rub', 'mt')
                        .replace('sushi_total_rub', '')
                        .replace('vk_password', '🔑 <b>Пароль от ВК:</b> ')
                        .replace('gibdd2_passport_issue_date', '🚗 <b>ГИБДД дата выдачи паспорта:</b> ');

                    let fbex = '';
                    linePhone = linePhone.replace(', Russia', '').replace(/"/g, '');
                    try {
                        fbex = linePhone.split('"')[1];
                    } catch {}
    
                    if (result && headr !== 'mt') {
                        answer += `${headr}<code>${result}</code>\n`;
                    }
                }
            }
        }

    return answer;
}

export default leak;

