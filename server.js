const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("./config");
const postgres = require("./src/modules/db");

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const user_id = msg.from.id;
  const { text } = msg;
  try {
    const { users } = await postgres();
    console.log(msg);
    let user = await users.findOne({ where: user_id });

    if (user) {
      user = await users.create({
        user_id,
        username: msg.from.username ? msg.from.username : null,
      });
    }

    if (text == "/start" || text == "🔙Ortga") {
      await bot.sendChatAction(user_id, "typing");

      let keyboard = {
        resize_keyboard: true,
        keyboard: [[{ text: "Windows" }, { text: "Office dasturlari" }]],
      };

      await bot.sendMessage(
        user_id,
        "Assalomu alaykum botga xush kelibsiz, kerakli bo'limni tanlang",
        { reply_markup: keyboard }
      );
    } else if (text == "Windows") {
      await bot.sendChatAction(user_id, "typing");

      let keyboard = {
        resize_keyboard: true,
        keyboard: [
          [{ text: "Windows 11" }, { text: "Windows 10" }],
          [{ text: "Windows 8" }, { text: "Windows 7" }],
          [{ text: "🔙Ortga" }],
        ],
      };

      await bot.sendMessage(user_id, "Quyidagilardan birini tanlang", {
        reply_markup: keyboard,
      });
    } else if (text == "Windows 11") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 19);
      await bot.copyMessage(user_id, 1383785054, 20);
      await bot.copyMessage(user_id, 1383785054, 21);
      await bot.copyMessage(user_id, 1383785054, 22);
    } else if (text == "Windows 10") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 54);
      await bot.copyMessage(user_id, 1383785054, 55);
      await bot.copyMessage(user_id, 1383785054, 56);
      await bot.copyMessage(user_id, 1383785054, 57);
    } else if (text == "Windows 8") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 64);
      await bot.copyMessage(user_id, 1383785054, 65);
      await bot.copyMessage(user_id, 1383785054, 66);
    } else if (text == "Windows 7") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 71);
      await bot.copyMessage(user_id, 1383785054, 72);
      await bot.copyMessage(user_id, 1383785054, 73);
    } else if (text == "Office dasturlari") {
      await bot.sendChatAction(user_id, "typing");

      let keyboard = {
        resize_keyboard: true,
        keyboard: [
          [{ text: "Office 2021" }, { text: "Office 2016" }],
          [{ text: "🔙Ortga" }],
        ],
      };

      await bot.sendMessage(user_id, "Quyidagilardan birini tanlang", {
        reply_markup: keyboard,
      });
    } else if (text == "Office 2021") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 84);
      await bot.copyMessage(user_id, 1383785054, 85);
      await bot.copyMessage(user_id, 1383785054, 73);
    } else if (text == "Office 2016") {
      await bot.sendChatAction(user_id, "typing");

      await bot.copyMessage(user_id, 1383785054, 93);
      await bot.copyMessage(user_id, 1383785054, 94);
    }
  } catch (e) {
    console.log(e);
    await bot.sendMessage(user_id, `Botda xatolik yuz berdi ${e.message}`);
  }
});
