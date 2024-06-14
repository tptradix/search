import axios from 'axios';
import cheerio from 'cheerio';
import UserAgent from 'user-agents';

async function vkFind(user) {
    user = user.replace("/", '@');
    const headers = { 'User-Agent': new UserAgent().toString() };

    let vkAll = "🈂️ <b>ВК не найден</b>\n↳ None";
    let tgAll = "✈️ <b>Telegram не найден</b>\n↳ None\n";
    let okResult = "🆗 <b>OK не найден</b>\n↳ None";

    const vkUrl = `https://vk.com/${user}`;
    const tgUrl = `https://t.me/${user}`;

    try {
        // Check existence
        const [vkResponse, tgResponse] = await Promise.all([
            axios.get(vkUrl),
            axios.get(tgUrl)
        ]);

        if (![vkResponse, tgResponse].some(resp => resp.status === 200)) {
            return "Error";
        }

        // VK Search
        if (vkResponse.status === 200) {
            const vkApiUrl = `https://api.vk.com/method/users.get?access_token=504ab56a504ab56a504ab56ac953580c505504a504ab56a33bbb566f68e3c1c0464b299&user_id=${user}&v=5.92`;
            const vkApiResp = await axios.get(vkApiUrl);
            const vkData = vkApiResp.data.response[0];

            if (vkData) {
                vkAll = `🈂️ <b>ВК найден</b>
<b>├ ID:</b> ${vkData.id}
<b>├ Имя:</b> ${vkData.first_name}
<b>├ Фамилия:</b> ${vkData.last_name}
<b>├ Логин:</b> ${user}
├ <b>Закрытый профиль:</b> ${vkData.is_closed}
└ <b>Ссылка:</b> vk.com/${user}\n`;
            }
        }

        // Telegram Search
        if (tgResponse.status === 200) {
            const tgSoup = cheerio.load(tgResponse.data);
            const tgName = tgSoup('span[dir="auto"]').text() || 'None';
            const tgDesc = tgSoup('div.tgme_page_description').text() || 'None';
            tgAll = `✈️ <b>Telegram найден</b>
├ <b>Имя:</b> ${tgName}
├ <b>Описание:</b> ${tgDesc}
└ <b>Username:</b> @${user}\n`;
        }

        // OK Search
        const okUrl = `https://ok.ru/${user}`;
        const okResponse = await axios.get(okUrl, { headers });
        if (okResponse.status === 200) {
            const okSoup = cheerio.load(okResponse.data);
            const okName = okSoup('h1.__user-profile-name-decorator').text() || 'None';
            const okLastOnline = okSoup('span.profile-user-info_status.__new_status_color').text() || 'None';
            const okBirthday = okSoup('div.user-profile_i_value').text() || 'None';
            const okFriends = okSoup('span.navMenuCount').text() || 'None';
            okResult = `🆗 <b>OK найден</b>
├ <b>Имя:</b> ${okName}
├ <b>Был в сети:</b> ${okLastOnline}
├ <b>Дата рождения:</b> ${okBirthday}
├ <b>Друзей:</b> ${okFriends}
├ <b>Ник:</b> ${user}
└ <b>Ссылка:</b> ok.ru/${user}`;
        }

        return `👤 <b>Данные о пользвателе</b>
${vkAll}
${tgAll}
${okResult}

<b>Дополнительная информация</b>\n`;

    } catch (error) {
        return `Error: ${error.message}`;
    }
}

export default vkFind;