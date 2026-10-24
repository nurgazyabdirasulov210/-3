export type Word = {
  id: string;
  en: string;
  ipa: string;
  ru: string;
  example: string;
  exampleRu: string;
  icon: string;
  emoji: string;
};

export type Topic = {
  id: string;
  title: string;
  titleRu: string;
  blurb: string;
  icon: string;
  accent: "primary" | "teal" | "navy" | "sky";
  words: Word[];
};

export type DialogueLine = {
  speaker: "a" | "b";
  name: string;
  en: string;
  ru: string;
};

export type Dialogue = {
  id: string;
  title: string;
  titleRu: string;
  scene: string;
  icon: string;
  lines: DialogueLine[];
};

export type GrammarQuestion = {
  prompt: string;
  hint: string;
  options: string[];
  answer: string;
};

export type GrammarUnit = {
  id: string;
  title: string;
  titleRu: string;
  icon: string;
  explanation: string;
  example: string;
  questions: GrammarQuestion[];
};

export type ListenItem = {
  en: string;
  options: string[];
  answer: string;
};

export type ListenSet = {
  id: string;
  title: string;
  titleRu: string;
  icon: string;
  items: ListenItem[];
};

const w = (
  id: string,
  en: string,
  ipa: string,
  ru: string,
  example: string,
  exampleRu: string,
  icon: string,
  emoji: string,
): Word => ({ id, en, ipa, ru, example, exampleRu, icon, emoji });

export const topics: Topic[] = [
  {
    id: "greetings",
    title: "Greetings",
    titleRu: "Приветствия",
    blurb: "Как здороваться и прощаться",
    icon: "handshake",
    accent: "primary",
    words: [
      w("hello", "hello", "həˈləʊ", "привет", "Hello, my friend!", "Привет, мой друг!", "handshake", "👋"),
      w("hi", "hi", "haɪ", "привет", "Hi! How are you?", "Привет! Как дела?", "smile", "🙂"),
      w("good-morning", "good morning", "ɡʊd ˈmɔːnɪŋ", "доброе утро", "Good morning, Anna.", "Доброе утро, Анна.", "sunrise", "🌅"),
      w("good-evening", "good evening", "ɡʊd ˈiːvnɪŋ", "добрый вечер", "Good evening, everyone.", "Добрый вечер всем.", "sunset", "🌆"),
      w("goodbye", "goodbye", "ɡʊdˈbaɪ", "до свидания", "Goodbye, see you tomorrow.", "До свидания, увидимся завтра.", "door-open", "👋"),
      w("please", "please", "pliːz", "пожалуйста", "A coffee, please.", "Кофе, пожалуйста.", "hand-heart", "🙏"),
      w("thank-you", "thank you", "θæŋk juː", "спасибо", "Thank you very much.", "Большое спасибо.", "heart", "💙"),
      w("sorry", "sorry", "ˈsɒri", "извините", "I am sorry I am late.", "Извините, я опоздал.", "message-circle", "🙇"),
      w("yes", "yes", "jes", "да", "Yes, I understand.", "Да, я понимаю.", "circle-check", "✅"),
      w("no", "no", "nəʊ", "нет", "No, thank you.", "Нет, спасибо.", "circle-x", "❌"),
    ],
  },
  {
    id: "numbers",
    title: "Numbers",
    titleRu: "Числа",
    blurb: "Счёт от 1 до 10",
    icon: "hash",
    accent: "navy",
    words: [
      w("one", "one", "wʌn", "один", "I have one brother.", "У меня один брат.", "hash", "1️⃣"),
      w("two", "two", "tuː", "два", "Two cats are sleeping.", "Две кошки спят.", "hash", "2️⃣"),
      w("three", "three", "θriː", "три", "I see three birds.", "Я вижу трёх птиц.", "hash", "3️⃣"),
      w("four", "four", "fɔː", "четыре", "There are four chairs.", "Здесь четыре стула.", "hash", "4️⃣"),
      w("five", "five", "faɪv", "пять", "She is five years old.", "Ей пять лет.", "hash", "5️⃣"),
      w("six", "six", "sɪks", "шесть", "We start at six.", "Мы начинаем в шесть.", "hash", "6️⃣"),
      w("seven", "seven", "ˈsevən", "семь", "There are seven days.", "В неделе семь дней.", "hash", "7️⃣"),
      w("eight", "eight", "eɪt", "восемь", "I work eight hours.", "Я работаю восемь часов.", "hash", "8️⃣"),
      w("nine", "nine", "naɪn", "девять", "It is nine o'clock.", "Сейчас девять часов.", "hash", "9️⃣"),
      w("ten", "ten", "ten", "десять", "Count to ten.", "Посчитай до десяти.", "hash", "🔟"),
    ],
  },
  {
    id: "colors",
    title: "Colors",
    titleRu: "Цвета",
    blurb: "Назови цвет вокруг себя",
    icon: "palette",
    accent: "sky",
    words: [
      w("red", "red", "red", "красный", "The apple is red.", "Яблоко красное.", "palette", "🔴"),
      w("blue", "blue", "bluː", "синий", "The sky is blue.", "Небо синее.", "palette", "🔵"),
      w("green", "green", "ɡriːn", "зелёный", "The grass is green.", "Трава зелёная.", "palette", "🟢"),
      w("yellow", "yellow", "ˈjeləʊ", "жёлтый", "The sun is yellow.", "Солнце жёлтое.", "palette", "🟡"),
      w("black", "black", "blæk", "чёрный", "I have a black bag.", "У меня чёрная сумка.", "palette", "⚫"),
      w("white", "white", "waɪt", "белый", "The snow is white.", "Снег белый.", "palette", "⚪"),
      w("orange", "orange", "ˈɒrɪndʒ", "оранжевый", "An orange cat.", "Оранжевая кошка.", "palette", "🟠"),
      w("brown", "brown", "braʊn", "коричневый", "I like brown bread.", "Мне нравится коричневый хлеб.", "palette", "🟤"),
    ],
  },
  {
    id: "family",
    title: "Family",
    titleRu: "Семья",
    blurb: "Люди рядом с тобой",
    icon: "users",
    accent: "teal",
    words: [
      w("mother", "mother", "ˈmʌðə", "мама", "My mother is kind.", "Моя мама добрая.", "users", "👩"),
      w("father", "father", "ˈfɑːðə", "папа", "My father cooks well.", "Мой папа хорошо готовит.", "users", "👨"),
      w("sister", "sister", "ˈsɪstə", "сестра", "I have a sister.", "У меня есть сестра.", "users", "👧"),
      w("brother", "brother", "ˈbrʌðə", "брат", "My brother is tall.", "Мой брат высокий.", "users", "👦"),
      w("family", "family", "ˈfæməli", "семья", "I love my family.", "Я люблю свою семью.", "heart", "👨‍👩‍👧"),
      w("friend", "friend", "frend", "друг", "This is my friend.", "Это мой друг.", "handshake", "🤝"),
      w("baby", "baby", "ˈbeɪbi", "малыш", "The baby is sleeping.", "Малыш спит.", "baby", "👶"),
      w("name", "name", "neɪm", "имя", "My name is Alex.", "Меня зовут Алекс.", "user-round", "🪪"),
    ],
  },
  {
    id: "animals",
    title: "Animals",
    titleRu: "Животные",
    blurb: "Домашние и лесные звери",
    icon: "cat",
    accent: "primary",
    words: [
      w("cat", "cat", "kæt", "кошка", "The cat is on the bed.", "Кошка на кровати.", "cat", "🐱"),
      w("dog", "dog", "dɒɡ", "собака", "The dog is in the park.", "Собака в парке.", "dog", "🐶"),
      w("bird", "bird", "bɜːd", "птица", "A bird is in the tree.", "Птица на дереве.", "bird", "🐦"),
      w("fish", "fish", "fɪʃ", "рыба", "The fish is in the water.", "Рыба в воде.", "fish", "🐟"),
      w("rabbit", "rabbit", "ˈræbɪt", "кролик", "The rabbit is small.", "Кролик маленький.", "rabbit", "🐰"),
      w("mouse", "mouse", "maʊs", "мышь", "A mouse likes cheese.", "Мышь любит сыр.", "mouse", "🐭"),
      w("turtle", "turtle", "ˈtɜːtl", "черепаха", "The turtle is slow.", "Черепаха медленная.", "turtle", "🐢"),
      w("squirrel", "squirrel", "ˈskwɪrəl", "белка", "A squirrel eats nuts.", "Белка ест орехи.", "squirrel", "🐿️"),
    ],
  },
  {
    id: "food",
    title: "Food",
    titleRu: "Еда",
    blurb: "Что заказать и что есть",
    icon: "utensils",
    accent: "teal",
    words: [
      w("apple", "apple", "ˈæpl", "яблоко", "I eat an apple.", "Я ем яблоко.", "apple", "🍎"),
      w("bread", "bread", "bred", "хлеб", "We buy bread.", "Мы покупаем хлеб.", "wheat", "🍞"),
      w("water", "water", "ˈwɔːtə", "вода", "I drink water.", "Я пью воду.", "droplet", "💧"),
      w("milk", "milk", "mɪlk", "молоко", "The baby drinks milk.", "Малыш пьёт молоко.", "milk", "🥛"),
      w("tea", "tea", "tiː", "чай", "Would you like some tea?", "Хотите чай?", "coffee", "🍵"),
      w("coffee", "coffee", "ˈkɒfi", "кофе", "I like coffee.", "Я люблю кофе.", "coffee", "☕"),
      w("egg", "egg", "eɡ", "яйцо", "An egg for breakfast.", "Яйцо на завтрак.", "egg", "🥚"),
      w("soup", "soup", "suːp", "суп", "The soup is hot.", "Суп горячий.", "soup", "🍲"),
      w("pizza", "pizza", "ˈpiːtsə", "пицца", "We eat pizza tonight.", "Сегодня вечером едим пиццу.", "pizza", "🍕"),
      w("cake", "cake", "keɪk", "торт", "The cake is sweet.", "Торт сладкий.", "cookie", "🍰"),
    ],
  },
  {
    id: "home",
    title: "Home",
    titleRu: "Дом",
    blurb: "Комнаты и вещи дома",
    icon: "house",
    accent: "navy",
    words: [
      w("house", "house", "haʊs", "дом", "This is my house.", "Это мой дом.", "house", "🏠"),
      w("door", "door", "dɔː", "дверь", "Please close the door.", "Пожалуйста, закрой дверь.", "door-open", "🚪"),
      w("table", "table", "ˈteɪbl", "стол", "The book is on the table.", "Книга на столе.", "table", "🪵"),
      w("chair", "chair", "tʃeə", "стул", "Sit on the chair.", "Сядь на стул.", "armchair", "🪑"),
      w("bed", "bed", "bed", "кровать", "I sleep in my bed.", "Я сплю в своей кровати.", "bed", "🛏️"),
      w("kitchen", "kitchen", "ˈkɪtʃɪn", "кухня", "She is in the kitchen.", "Она на кухне.", "cooking-pot", "🍳"),
      w("bathroom", "bathroom", "ˈbɑːθruːm", "ванная", "The bathroom is small.", "Ванная маленькая.", "bath", "🛁"),
      w("lamp", "lamp", "læmp", "лампа", "Turn on the lamp.", "Включи лампу.", "lamp", "💡"),
    ],
  },
  {
    id: "weather",
    title: "Weather",
    titleRu: "Погода",
    blurb: "Солнце, дождь и ветер",
    icon: "cloud-sun",
    accent: "sky",
    words: [
      w("sun", "sun", "sʌn", "солнце", "The sun is bright.", "Солнце яркое.", "sun", "☀️"),
      w("rain", "rain", "reɪn", "дождь", "I like the rain.", "Мне нравится дождь.", "cloud-rain", "🌧️"),
      w("snow", "snow", "snəʊ", "снег", "The snow is cold.", "Снег холодный.", "snowflake", "❄️"),
      w("wind", "wind", "wɪnd", "ветер", "The wind is strong.", "Ветер сильный.", "wind", "💨"),
      w("cloud", "cloud", "klaʊd", "облако", "A white cloud.", "Белое облако.", "cloud", "☁️"),
      w("hot", "hot", "hɒt", "жаркий", "It is hot today.", "Сегодня жарко.", "thermometer", "🔥"),
      w("cold", "cold", "kəʊld", "холодный", "It is cold outside.", "На улице холодно.", "snowflake", "🥶"),
      w("umbrella", "umbrella", "ʌmˈbrelə", "зонт", "Take an umbrella.", "Возьми зонт.", "umbrella", "☂️"),
    ],
  },
  {
    id: "clothes",
    title: "Clothes",
    titleRu: "Одежда",
    blurb: "Что надеть сегодня",
    icon: "shirt",
    accent: "primary",
    words: [
      w("shirt", "shirt", "ʃɜːt", "рубашка", "I wear a blue shirt.", "Я ношу синюю рубашку.", "shirt", "👕"),
      w("shoes", "shoes", "ʃuːz", "обувь", "These shoes are new.", "Эта обувь новая.", "footprints", "👟"),
      w("hat", "hat", "hæt", "шляпа", "A hat for the sun.", "Шляпа от солнца.", "crown", "🎩"),
      w("bag", "bag", "bæɡ", "сумка", "My bag is heavy.", "Моя сумка тяжёлая.", "backpack", "👜"),
      w("glasses", "glasses", "ˈɡlɑːsɪz", "очки", "I need my glasses.", "Мне нужны очки.", "glasses", "👓"),
      w("watch", "watch", "wɒtʃ", "часы", "Look at your watch.", "Посмотри на часы.", "watch", "⌚"),
      w("coat", "coat", "kəʊt", "пальто", "Wear a coat. It is cold.", "Надень пальто. Холодно.", "shirt", "🧥"),
      w("socks", "socks", "sɒks", "носки", "Red socks.", "Красные носки.", "footprints", "🧦"),
    ],
  },
  {
    id: "body",
    title: "Body",
    titleRu: "Тело",
    blurb: "Части тела",
    icon: "person-standing",
    accent: "teal",
    words: [
      w("head", "head", "hed", "голова", "My head hurts.", "У меня болит голова.", "scan-face", "🧠"),
      w("hand", "hand", "hænd", "рука", "Raise your hand.", "Подними руку.", "hand", "✋"),
      w("eye", "eye", "aɪ", "глаз", "She has green eyes.", "У неё зелёные глаза.", "eye", "👁️"),
      w("ear", "ear", "ɪə", "ухо", "I hear with my ears.", "Я слышу ушами.", "ear", "👂"),
      w("mouth", "mouth", "maʊθ", "рот", "Open your mouth.", "Открой рот.", "smile", "👄"),
      w("foot", "foot", "fʊt", "нога", "My left foot.", "Моя левая нога.", "footprints", "🦶"),
      w("heart", "heart", "hɑːt", "сердце", "My heart is happy.", "Моё сердце радуется.", "heart", "❤️"),
      w("smile-word", "smile", "smaɪl", "улыбка", "You have a nice smile.", "У тебя красивая улыбка.", "smile", "😊"),
    ],
  },
  {
    id: "verbs",
    title: "Actions",
    titleRu: "Глаголы",
    blurb: "Что мы делаем каждый день",
    icon: "zap",
    accent: "navy",
    words: [
      w("go", "go", "ɡəʊ", "идти", "I go to school.", "Я иду в школу.", "footprints", "🚶"),
      w("eat", "eat", "iːt", "есть", "We eat at six.", "Мы едим в шесть.", "utensils", "🍽️"),
      w("drink", "drink", "drɪŋk", "пить", "I drink tea.", "Я пью чай.", "cup-soda", "🥤"),
      w("sleep", "sleep", "sliːp", "спать", "I sleep at night.", "Я сплю ночью.", "bed", "😴"),
      w("read", "read", "riːd", "читать", "I read a book.", "Я читаю книгу.", "book-open", "📖"),
      w("write", "write", "raɪt", "писать", "Please write your name.", "Пожалуйста, напиши своё имя.", "pencil", "✍️"),
      w("speak", "speak", "spiːk", "говорить", "I speak English.", "Я говорю по-английски.", "mic", "🗣️"),
      w("listen", "listen", "ˈlɪsən", "слушать", "Listen to the teacher.", "Слушай учителя.", "headphones", "🎧"),
      w("see", "see", "siː", "видеть", "I see a dog.", "Я вижу собаку.", "eye", "👀"),
      w("like", "like", "laɪk", "нравиться", "I like this song.", "Мне нравится эта песня.", "thumbs-up", "👍"),
    ],
  },
  {
    id: "places",
    title: "Places",
    titleRu: "Места",
    blurb: "Куда мы ходим",
    icon: "map-pin",
    accent: "sky",
    words: [
      w("school", "school", "skuːl", "школа", "I go to school.", "Я хожу в школу.", "school", "🏫"),
      w("shop", "shop", "ʃɒp", "магазин", "The shop is open.", "Магазин открыт.", "store", "🛍️"),
      w("park", "park", "pɑːk", "парк", "We walk in the park.", "Мы гуляем в парке.", "trees", "🌳"),
      w("city", "city", "ˈsɪti", "город", "London is a city.", "Лондон — это город.", "building", "🏙️"),
      w("hospital", "hospital", "ˈhɒspɪtl", "больница", "The hospital is near.", "Больница рядом.", "hospital", "🏥"),
      w("airport", "airport", "ˈeəpɔːt", "аэропорт", "We are at the airport.", "Мы в аэропорту.", "plane", "✈️"),
      w("street", "street", "striːt", "улица", "This street is quiet.", "Эта улица тихая.", "map-pin", "🛣️"),
      w("home-place", "home", "həʊm", "дом", "I want to go home.", "Я хочу домой.", "home", "🏡"),
    ],
  },
];

export const dialogues: Dialogue[] = [
  {
    id: "meet",
    title: "Nice to meet you",
    titleRu: "Знакомство",
    scene: "Первая встреча",
    icon: "handshake",
    lines: [
      { speaker: "a", name: "Alex", en: "Hello! My name is Alex.", ru: "Привет! Меня зовут Алекс." },
      { speaker: "b", name: "You", en: "Hi, Alex. I am Mia.", ru: "Привет, Алекс. Я Мия." },
      { speaker: "a", name: "Alex", en: "Nice to meet you, Mia.", ru: "Приятно познакомиться, Мия." },
      { speaker: "b", name: "You", en: "Nice to meet you too.", ru: "Мне тоже приятно." },
      { speaker: "a", name: "Alex", en: "How are you today?", ru: "Как ты сегодня?" },
      { speaker: "b", name: "You", en: "I am good, thank you. And you?", ru: "Хорошо, спасибо. А ты?" },
      { speaker: "a", name: "Alex", en: "I am great. See you later!", ru: "Отлично. До встречи!" },
    ],
  },
  {
    id: "cafe",
    title: "At the cafe",
    titleRu: "В кафе",
    scene: "Заказ напитка",
    icon: "coffee",
    lines: [
      { speaker: "a", name: "Waiter", en: "Good morning! What would you like?", ru: "Доброе утро! Что бы вы хотели?" },
      { speaker: "b", name: "You", en: "A coffee, please.", ru: "Кофе, пожалуйста." },
      { speaker: "a", name: "Waiter", en: "Small or large?", ru: "Маленький или большой?" },
      { speaker: "b", name: "You", en: "Large, please. And a piece of cake.", ru: "Большой, пожалуйста. И кусочек торта." },
      { speaker: "a", name: "Waiter", en: "Here you are.", ru: "Вот, пожалуйста." },
      { speaker: "b", name: "You", en: "Thank you very much.", ru: "Большое спасибо." },
    ],
  },
  {
    id: "directions",
    title: "Where is the park?",
    titleRu: "Как пройти",
    scene: "Спросить дорогу",
    icon: "map-pin",
    lines: [
      { speaker: "b", name: "You", en: "Excuse me. Where is the park?", ru: "Извините. Где парк?" },
      { speaker: "a", name: "Local", en: "Go straight and turn left.", ru: "Идите прямо и поверните налево." },
      { speaker: "b", name: "You", en: "Is it far?", ru: "Это далеко?" },
      { speaker: "a", name: "Local", en: "No, it is near the school.", ru: "Нет, он рядом со школой." },
      { speaker: "b", name: "You", en: "Thank you for your help.", ru: "Спасибо за помощь." },
      { speaker: "a", name: "Local", en: "You are welcome. Have a nice day!", ru: "Пожалуйста. Хорошего дня!" },
    ],
  },
  {
    id: "shop",
    title: "In the shop",
    titleRu: "В магазине",
    scene: "Покупка",
    icon: "store",
    lines: [
      { speaker: "a", name: "Seller", en: "Hello! Can I help you?", ru: "Здравствуйте! Могу помочь?" },
      { speaker: "b", name: "You", en: "Yes, please. I want this shirt.", ru: "Да, пожалуйста. Я хочу эту рубашку." },
      { speaker: "a", name: "Seller", en: "What colour?", ru: "Какой цвет?" },
      { speaker: "b", name: "You", en: "Blue, please. How much is it?", ru: "Синий, пожалуйста. Сколько это стоит?" },
      { speaker: "a", name: "Seller", en: "It is ten pounds.", ru: "Десять фунтов." },
      { speaker: "b", name: "You", en: "Great. I will take it.", ru: "Отлично. Я возьму." },
    ],
  },
  {
    id: "home-day",
    title: "At home",
    titleRu: "Дома",
    scene: "Утро дома",
    icon: "house",
    lines: [
      { speaker: "a", name: "Sam", en: "Good morning. Do you want tea?", ru: "Доброе утро. Хочешь чай?" },
      { speaker: "b", name: "You", en: "Yes, please. I am hungry too.", ru: "Да, пожалуйста. Я ещё и голодный." },
      { speaker: "a", name: "Sam", en: "There is bread and an egg.", ru: "Есть хлеб и яйцо." },
      { speaker: "b", name: "You", en: "Perfect. I like breakfast at home.", ru: "Идеально. Я люблю завтрак дома." },
      { speaker: "a", name: "Sam", en: "Me too. Let's eat.", ru: "Я тоже. Давай есть." },
    ],
  },
];

export const grammarUnits: GrammarUnit[] = [
  {
    id: "to-be",
    title: "To be",
    titleRu: "Глагол to be",
    icon: "equal",
    explanation:
      "Глагол to be меняется: I am, you are, he/she/it is, we/you/they are. Это «быть» — основа простых фраз.",
    example: "I am a student. She is happy. They are at home.",
    questions: [
      { prompt: "I ___ a student.", hint: "Для I используем am.", options: ["am", "is", "are", "be"], answer: "am" },
      { prompt: "She ___ my sister.", hint: "He / she / it → is.", options: ["am", "is", "are", "be"], answer: "is" },
      { prompt: "They ___ at school.", hint: "We / you / they → are.", options: ["am", "is", "are", "be"], answer: "are" },
      { prompt: "You ___ very kind.", hint: "You всегда are.", options: ["am", "is", "are", "be"], answer: "are" },
      { prompt: "It ___ a cat.", hint: "It → is.", options: ["am", "is", "are", "be"], answer: "is" },
      { prompt: "We ___ friends.", hint: "We → are.", options: ["am", "is", "are", "be"], answer: "are" },
    ],
  },
  {
    id: "articles",
    title: "A / an / the",
    titleRu: "Артикли",
    icon: "a-large-small",
    explanation:
      "A — перед согласным (a cat). An — перед гласным звуком (an apple). The — когда предмет уже известен.",
    example: "I see a dog. The dog is black. I eat an egg.",
    questions: [
      { prompt: "I have ___ cat.", hint: "Cat начинается с согласного.", options: ["a", "an", "the", "-"], answer: "a" },
      { prompt: "She eats ___ apple.", hint: "Apple начинается с гласного.", options: ["a", "an", "the", "-"], answer: "an" },
      { prompt: "Open ___ door, please.", hint: "Конкретная дверь.", options: ["a", "an", "the", "-"], answer: "the" },
      { prompt: "This is ___ umbrella.", hint: "Umbrella начинается с гласного звука.", options: ["a", "an", "the", "-"], answer: "an" },
      { prompt: "I see ___ sun.", hint: "Солнце одно, оно известное.", options: ["a", "an", "the", "-"], answer: "the" },
      { prompt: "He is ___ teacher.", hint: "Профессия в единственном числе — a.", options: ["a", "an", "the", "-"], answer: "a" },
    ],
  },
  {
    id: "pronouns",
    title: "Pronouns",
    titleRu: "Местоимения",
    icon: "users",
    explanation: "I, you, he, she, it, we, they заменяют имена. My / your / his / her — «чей».",
    example: "I am Mia. This is my bag. He is my friend.",
    questions: [
      { prompt: "___ am a student.", hint: "Говорим о себе.", options: ["I", "He", "She", "They"], answer: "I" },
      { prompt: "This is ___ book. (я)", hint: "Притяжательное для I — my.", options: ["my", "your", "his", "her"], answer: "my" },
      { prompt: "___ is my brother.", hint: "Брат — he.", options: ["He", "She", "It", "We"], answer: "He" },
      { prompt: "The cat is small. ___ is white.", hint: "Животное часто it.", options: ["He", "She", "It", "They"], answer: "It" },
      { prompt: "Anna is here. ___ is my friend.", hint: "Anna — she.", options: ["He", "She", "It", "We"], answer: "She" },
      { prompt: "Tom and I are here. ___ are happy.", hint: "Tom and I = we.", options: ["I", "He", "We", "They"], answer: "We" },
    ],
  },
  {
    id: "present",
    title: "Present simple",
    titleRu: "Present Simple",
    icon: "book-open",
    explanation:
      "Для I/you/we/they — базовая форма: I like tea. Для he/she/it добавляем -s: she likes tea.",
    example: "I go to school. She goes to school. They like pizza.",
    questions: [
      { prompt: "I ___ English.", hint: "I — без -s.", options: ["speak", "speaks", "speaking", "spoke"], answer: "speak" },
      { prompt: "She ___ coffee.", hint: "She — с -s.", options: ["like", "likes", "liking", "liked"], answer: "likes" },
      { prompt: "They ___ in a house.", hint: "They — без -s.", options: ["live", "lives", "living", "lived"], answer: "live" },
      { prompt: "He ___ to school.", hint: "Go → goes.", options: ["go", "goes", "going", "gone"], answer: "goes" },
      { prompt: "We ___ water.", hint: "We — без -s.", options: ["drink", "drinks", "drinking", "drank"], answer: "drink" },
      { prompt: "The cat ___ milk.", hint: "The cat = it → -s.", options: ["like", "likes", "liking", "liked"], answer: "likes" },
    ],
  },
  {
    id: "questions",
    title: "Questions",
    titleRu: "Вопросы",
    icon: "message-circle",
    explanation:
      "С to be: Are you happy? Is she at home? С другими глаголами: Do you like tea? Does he live here?",
    example: "What is your name? Do you speak English? Where is the park?",
    questions: [
      { prompt: "___ you a student?", hint: "You → are.", options: ["Am", "Is", "Are", "Do"], answer: "Are" },
      { prompt: "___ she at home?", hint: "She → is.", options: ["Am", "Is", "Are", "Does"], answer: "Is" },
      { prompt: "___ you like tea?", hint: "Обычный глагол, you → do.", options: ["Do", "Does", "Are", "Is"], answer: "Do" },
      { prompt: "___ he speak English?", hint: "He → does.", options: ["Do", "Does", "Is", "Are"], answer: "Does" },
      { prompt: "___ is your name?", hint: "Спрашиваем «что».", options: ["What", "Where", "Who", "When"], answer: "What" },
      { prompt: "___ is the park?", hint: "Спрашиваем место.", options: ["What", "Where", "Who", "When"], answer: "Where" },
    ],
  },
  {
    id: "prepositions",
    title: "In / on / at",
    titleRu: "Предлоги",
    icon: "map-pin",
    explanation:
      "In — внутри (in the house). On — на поверхности (on the table). At — точка (at school, at 6 o'clock).",
    example: "The cat is on the bed. I am in the kitchen. See you at school.",
    questions: [
      { prompt: "The book is ___ the table.", hint: "На поверхности.", options: ["in", "on", "at", "to"], answer: "on" },
      { prompt: "She is ___ the kitchen.", hint: "Внутри комнаты.", options: ["in", "on", "at", "to"], answer: "in" },
      { prompt: "I am ___ school.", hint: "Место-точка: at school.", options: ["in", "on", "at", "to"], answer: "at" },
      { prompt: "See you ___ six o'clock.", hint: "Точное время — at.", options: ["in", "on", "at", "to"], answer: "at" },
      { prompt: "The fish is ___ the water.", hint: "Внутри.", options: ["in", "on", "at", "to"], answer: "in" },
      { prompt: "The lamp is ___ the desk.", hint: "На столе.", options: ["in", "on", "at", "to"], answer: "on" },
    ],
  },
];

export const listenSets: ListenSet[] = [
  {
    id: "listen-hello",
    title: "Hello phrases",
    titleRu: "Приветствия на слух",
    icon: "headphones",
    items: [
      { en: "Good morning!", options: ["Доброе утро!", "До свидания!", "Как дела?", "Спасибо!"], answer: "Доброе утро!" },
      { en: "How are you?", options: ["Как тебя зовут?", "Как дела?", "Сколько это стоит?", "Где парк?"], answer: "Как дела?" },
      { en: "Nice to meet you.", options: ["Приятно познакомиться.", "Я голоден.", "До завтра.", "Я не понимаю."], answer: "Приятно познакомиться." },
      { en: "Thank you very much.", options: ["Пожалуйста.", "Большое спасибо.", "Извините.", "Добрый вечер."], answer: "Большое спасибо." },
      { en: "See you later.", options: ["Увидимся позже.", "Я дома.", "Открой дверь.", "Мне нравится."], answer: "Увидимся позже." },
      { en: "What is your name?", options: ["Где ты живёшь?", "Как тебя зовут?", "Сколько тебе лет?", "Что это?"], answer: "Как тебя зовут?" },
    ],
  },
  {
    id: "listen-cafe",
    title: "At the cafe",
    titleRu: "Кафе на слух",
    icon: "coffee",
    items: [
      { en: "A coffee, please.", options: ["Кофе, пожалуйста.", "Чай, пожалуйста.", "Счёт, пожалуйста.", "Воды, пожалуйста."], answer: "Кофе, пожалуйста." },
      { en: "I am hungry.", options: ["Я устал.", "Я голоден.", "Мне холодно.", "Я дома."], answer: "Я голоден." },
      { en: "How much is it?", options: ["Где это?", "Сколько это стоит?", "Что это?", "Когда открыто?"], answer: "Сколько это стоит?" },
      { en: "The soup is hot.", options: ["Суп горячий.", "Суп холодный.", "Торт сладкий.", "Чай готов."], answer: "Суп горячий." },
      { en: "I like this cake.", options: ["Мне нравится этот торт.", "Я не люблю кофе.", "Это мой стол.", "Дайте хлеб."], answer: "Мне нравится этот торт." },
      { en: "Water, please.", options: ["Молоко, пожалуйста.", "Воды, пожалуйста.", "Сок, пожалуйста.", "Хлеб, пожалуйста."], answer: "Воды, пожалуйста." },
    ],
  },
  {
    id: "listen-city",
    title: "In the city",
    titleRu: "Город на слух",
    icon: "map-pin",
    items: [
      { en: "Where is the park?", options: ["Где парк?", "Где школа?", "Где дом?", "Где магазин?"], answer: "Где парк?" },
      { en: "Go straight and turn left.", options: ["Идите прямо и налево.", "Идите назад.", "Стойте здесь.", "Бегите быстро."], answer: "Идите прямо и налево." },
      { en: "The shop is open.", options: ["Магазин закрыт.", "Магазин открыт.", "Школа далеко.", "Парк рядом."], answer: "Магазин открыт." },
      { en: "I want to go home.", options: ["Я хочу домой.", "Я хочу есть.", "Я хочу спать.", "Я хочу чай."], answer: "Я хочу домой." },
      { en: "It is near the school.", options: ["Это далеко от школы.", "Это рядом со школой.", "Это в школе.", "Это за школой."], answer: "Это рядом со школой." },
      { en: "Have a nice day!", options: ["Спокойной ночи!", "Хорошего дня!", "Доброе утро!", "До свидания!"], answer: "Хорошего дня!" },
    ],
  },
  {
    id: "listen-home",
    title: "Daily life",
    titleRu: "День на слух",
    icon: "house",
    items: [
      { en: "I go to school.", options: ["Я иду в школу.", "Я иду домой.", "Я сплю.", "Я читаю."], answer: "Я иду в школу." },
      { en: "Please close the door.", options: ["Открой окно.", "Закрой дверь, пожалуйста.", "Сядь на стул.", "Включи лампу."], answer: "Закрой дверь, пожалуйста." },
      { en: "It is cold outside.", options: ["На улице жарко.", "На улице холодно.", "Идёт дождь.", "Светит солнце."], answer: "На улице холодно." },
      { en: "I read a book.", options: ["Я читаю книгу.", "Я пишу имя.", "Я смотрю фильм.", "Я пью чай."], answer: "Я читаю книгу." },
      { en: "The cat is on the bed.", options: ["Собака в парке.", "Кошка на кровати.", "Птица на дереве.", "Рыба в воде."], answer: "Кошка на кровати." },
      { en: "See you tomorrow.", options: ["Увидимся завтра.", "Увидимся позже.", "Спокойной ночи.", "Добрый вечер."], answer: "Увидимся завтра." },
    ],
  },
];

export const allWords: Word[] = topics.flatMap((topic) => topic.words);

export function getTopic(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function getDialogue(id: string) {
  return dialogues.find((item) => item.id === id);
}

export function getGrammar(id: string) {
  return grammarUnits.find((item) => item.id === id);
}

export function getListenSet(id: string) {
  return listenSets.find((item) => item.id === id);
}

export function wordsById(ids: string[]) {
  const map = new Map(allWords.map((word) => [word.id, word]));
  return ids.map((id) => map.get(id)).filter((word): word is Word => Boolean(word));
}

export const XP_PER_CORRECT = 10;
export const XP_LESSON_BONUS = 20;
export const STARS_PER_CORRECT = 2;
export const LEVEL_XP = 100;
