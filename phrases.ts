export interface Phrase {
  id: number;
  armenian: string;
  spanish: string;
  category: string;
  // Subcategory/Grouping if applicable
  group?: 'general' | 'work'; 
  phoneticDescription?: string; // Guidance for Armenian speakers on how to pronounce it
}

export interface CategoryInfo {
  id: string;
  nameArm: string;
  nameEsp: string;
  iconName: string;
  group: 'general' | 'work';
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "greetings", nameArm: "Ողջույն և ծանոթություն", nameEsp: "Saludos y Presentación", iconName: "Smile", group: "general" },
  { id: "courtesy", nameArm: "Քաղաքավարություն", nameEsp: "Cortesía", iconName: "Heart", group: "general" },
  { id: "daily", nameArm: "Ամենօրյա խոսակցություն", nameEsp: "Conversación diaria", iconName: "MessageCircle", group: "general" },
  { id: "directions", nameArm: "Ճանապարհ և քաղաք", nameEsp: "Direcciones y Ciudad", iconName: "MapPin", group: "general" },
  { id: "transport", nameArm: "Տրանսպորտ", nameEsp: "Transporte", iconName: "Bus", group: "general" },
  { id: "hotel", nameArm: "Հյուրանոց", nameEsp: "Hotel", iconName: "Home", group: "general" },
  { id: "restaurant", nameArm: "Ռեստորան և սրճարան", nameEsp: "Restaurante y Cafetería", iconName: "Coffee", group: "general" },
  { id: "shopping", nameArm: "Խանութ և գնումներ", nameEsp: "Tienda y Compras", iconName: "ShoppingBag", group: "general" },
  { id: "verbs", nameArm: "Օգտակար բայեր", nameEsp: "Verbos útiles", iconName: "Activity", group: "general" },
  { id: "job_search", nameArm: "Աշխատանք փնտրել", nameEsp: "Buscar trabajo", iconName: "Briefcase", group: "work" },
  { id: "introduce_self", nameArm: "Ինձ ներկայացնել", nameEsp: "Presentarme", iconName: "User", group: "work" },
  { id: "experience", nameArm: "Փորձ", nameEsp: "Experiencia", iconName: "Award", group: "work" },
  { id: "job_questions", nameArm: "Հարցեր աշխատանքի մասին", nameEsp: "Preguntas sobre el trabajo", iconName: "HelpCircle", group: "work" },
  { id: "interview", nameArm: "Հարցազրույցում", nameEsp: "En la entrevista", iconName: "FileText", group: "work" },
];

export const PHRASES_DATA: Phrase[] = [
  // 1. Ողջույն և ծանոթություն (Saludos y Presentación)
  {
    id: 1,
    armenian: "Բարև։",
    spanish: "Hola.",
    category: "greetings",
    group: "general",
    phoneticDescription: "օլա"
  },
  {
    id: 2,
    armenian: "Բարի լույս։",
    spanish: "Buenos días.",
    category: "greetings",
    group: "general",
    phoneticDescription: "բուենոս դիաս"
  },
  {
    id: 3,
    armenian: "Բարի օր։",
    spanish: "Buenas tardes.",
    category: "greetings",
    group: "general",
    phoneticDescription: "բուենաս տարդես"
  },
  {
    id: 4,
    armenian: "Բարի երեկո / գիշեր։",
    spanish: "Buenas noches.",
    category: "greetings",
    group: "general",
    phoneticDescription: "բուենաս նոչես"
  },
  {
    id: 5,
    armenian: "Ինչպե՞ս ես։",
    spanish: "¿Cómo estás?",
    category: "greetings",
    group: "general",
    phoneticDescription: "կոմո էստաս"
  },
  {
    id: 6,
    armenian: "Ինչպե՞ս եք։",
    spanish: "¿Cómo está usted?",
    category: "greetings",
    group: "general",
    phoneticDescription: "կոմո էստա ուստեդ"
  },
  {
    id: 7,
    armenian: "Լավ եմ, շնորհակալություն։",
    spanish: "Estoy bien, gracias.",
    category: "greetings",
    group: "general",
    phoneticDescription: "էստոյ բիեն, գրասիաս"
  },
  {
    id: 8,
    armenian: "Շատ հաճելի է։",
    spanish: "Mucho gusto.",
    category: "greetings",
    group: "general",
    phoneticDescription: "մուչո գուստո"
  },
  {
    id: 9,
    armenian: "Ես Հայաստանից եմ։",
    spanish: "Soy de Armenia.",
    category: "greetings",
    group: "general",
    phoneticDescription: "սոյ դե Արմենիա"
  },

  // 2. Քաղաքավարություն (Cortesía)
  {
    id: 10,
    armenian: "Խնդրում եմ։",
    spanish: "Por favor.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "պոր ֆավոր"
  },
  {
    id: 11,
    armenian: "Շնորհակալություն։",
    spanish: "Gracias.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "գրասիաս"
  },
  {
    id: 12,
    armenian: "Շատ շնորհակալություն։",
    spanish: "Muchas gracias.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "մուչաս գրասիաս"
  },
  {
    id: 13,
    armenian: "Խնդրեմ։",
    spanish: "De nada.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "դե նադա"
  },
  {
    id: 14,
    armenian: "Ներողություն։",
    spanish: "Perdón.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "պերդոն"
  },
  {
    id: 15,
    armenian: "Ներեցեք։",
    spanish: "Disculpe.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "դիսկուլպե"
  },
  {
    id: 16,
    armenian: "Ների՛ր։",
    spanish: "Perdona.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "պերդոնա"
  },
  {
    id: 17,
    armenian: "Կներեք, ես չեմ հասկանում։",
    spanish: "Disculpe, no entiendo.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "դիսկուլպե, նո էնտիենդո"
  },
  {
    id: 18,
    armenian: "Կարո՞ղ եք կրկնել։",
    spanish: "¿Puede repetir?",
    category: "courtesy",
    group: "general",
    phoneticDescription: "պուեդե ռեպետիր"
  },
  {
    id: 19,
    armenian: "Կարո՞ղ եք ավելի դանդաղ խոսել։",
    spanish: "¿Puede hablar más despacio?",
    category: "courtesy",
    group: "general",
    phoneticDescription: "պուեդե աբլար մաս դեսպասիո"
  },
  {
    id: 20,
    armenian: "Ես լավ իսպաներեն չեմ խոսում։",
    spanish: "No hablo bien español.",
    category: "courtesy",
    group: "general",
    phoneticDescription: "նո աբլո բիեն էսպանյոլ"
  },

  // 3. Ամենօրյա խոսակցություն (Conversación diaria)
  {
    id: 21,
    armenian: "Այո։",
    spanish: "Sí.",
    category: "daily",
    group: "general",
    phoneticDescription: "սի"
  },
  {
    id: 22,
    armenian: "Ոչ։",
    spanish: "No.",
    category: "daily",
    group: "general",
    phoneticDescription: "նո"
  },
  {
    id: 23,
    armenian: "Լավ։",
    spanish: "Vale. / Está bien.",
    category: "daily",
    group: "general",
    phoneticDescription: "վալե / էստա բիեն"
  },
  {
    id: 24,
    armenian: "Իհարկե։",
    spanish: "Claro.",
    category: "daily",
    group: "general",
    phoneticDescription: "կլարո"
  },
  {
    id: 25,
    armenian: "Չգիտեմ։",
    spanish: "No lo sé.",
    category: "daily",
    group: "general",
    phoneticDescription: "նո լո սե"
  },
  {
    id: 26,
    armenian: "Ես համաձայն եմ։",
    spanish: "Estoy de acuerdo.",
    category: "daily",
    group: "general",
    phoneticDescription: "էստոյ դե ակուերդո"
  },
  {
    id: 27,
    armenian: "Ես համաձայն չեմ։",
    spanish: "No estoy de acuerdo.",
    category: "daily",
    group: "general",
    phoneticDescription: "նո էստոյ դե ակուերդո"
  },
  {
    id: 28,
    armenian: "Ինձ համար միևնույն է։",
    spanish: "Me da igual.",
    category: "daily",
    group: "general",
    phoneticDescription: "մե դա իգուալ"
  },
  {
    id: 29,
    armenian: "Խնդիր չկա։",
    spanish: "No pasa nada.",
    category: "daily",
    group: "general",
    phoneticDescription: "նո պասա նադա"
  },
  {
    id: 30,
    armenian: "Շատ լավ։",
    spanish: "Muy bien.",
    category: "daily",
    group: "general",
    phoneticDescription: "մույ բիեն"
  },
  {
    id: 31,
    armenian: "Հիանալի է։",
    spanish: "Genial.",
    category: "daily",
    group: "general",
    phoneticDescription: "խենիալ"
  },
  {
    id: 32,
    armenian: "Ի՞նչ ես անում։",
    spanish: "¿Qué haces?",
    category: "daily",
    group: "general",
    phoneticDescription: "կե ասես"
  },
  {
    id: 33,
    armenian: "Ես զբաղված եմ։",
    spanish: "Estoy ocupado/a.",
    category: "daily",
    group: "general",
    phoneticDescription: "էստոյ օկուպադո (տղամարդ) / օկուպադա (կին)"
  },
  {
    id: 34,
    armenian: "Ես հոգնած եմ։",
    spanish: "Estoy cansado/a.",
    category: "daily",
    group: "general",
    phoneticDescription: "էստոյ կանսադո (տղամարդ) / կանսադա (կին)"
  },
  {
    id: 35,
    armenian: "Ես սոված եմ։",
    spanish: "Tengo hambre.",
    category: "daily",
    group: "general",
    phoneticDescription: "տենգո ամբրե"
  },
  {
    id: 36,
    armenian: "Ես ծարավ եմ։",
    spanish: "Tengo sed.",
    category: "daily",
    group: "general",
    phoneticDescription: "տենգո սեդ"
  },
  {
    id: 37,
    armenian: "Ես ուզում եմ քնել։",
    spanish: "Quiero dormir.",
    category: "daily",
    group: "general",
    phoneticDescription: "կիերո դորմիր"
  },

  // 4. Ճանապարհ և քաղաք (Direcciones y Ciudad)
  {
    id: 38,
    armenian: "Որտե՞ղ է զուգարանը։",
    spanish: "¿Dónde está el baño?",
    category: "directions",
    group: "general",
    phoneticDescription: "դոնդե էստա էլ բանյո"
  },
  {
    id: 39,
    armenian: "Որտե՞ղ է մետրոն։",
    spanish: "¿Dónde está el metro?",
    category: "directions",
    group: "general",
    phoneticDescription: "դոնդե էստա էլ մետրո"
  },
  {
    id: 40,
    armenian: "Որտե՞ղ է կանգառը։",
    spanish: "¿Dónde está la parada?",
    category: "directions",
    group: "general",
    phoneticDescription: "դոնդե էստա լա պարադա"
  },
  {
    id: 41,
    armenian: "Որտե՞ղ է կայարանը։",
    spanish: "¿Dónde está la estación?",
    category: "directions",
    group: "general",
    phoneticDescription: "դոնդե էստա լա էստասիոն"
  },
  {
    id: 42,
    armenian: "Ինչպե՞ս կարող եմ հասնել կենտրոն։",
    spanish: "¿Cómo puedo llegar al centro?",
    category: "directions",
    group: "general",
    phoneticDescription: "կոմո պուեդե լյեգար ալ սենտրո"
  },
  {
    id: 43,
    armenian: "Սա հեռո՞ւ է։",
    spanish: "¿Está lejos?",
    category: "directions",
    group: "general",
    phoneticDescription: "էստա լեխոս"
  },
  {
    id: 44,
    armenian: "Սա մո՞տ է։",
    spanish: "¿Está cerca?",
    category: "directions",
    group: "general",
    phoneticDescription: "էստա սերկա"
  },
  {
    id: 45,
    armenian: "Գնացեք ուղիղ։",
    spanish: "Siga recto.",
    category: "directions",
    group: "general",
    phoneticDescription: "սիգա ռեկտո"
  },
  {
    id: 46,
    armenian: "Թեքվեք աջ։",
    spanish: "Gire a la derecha.",
    category: "directions",
    group: "general",
    phoneticDescription: "խիրե ա լա դերեչա"
  },
  {
    id: 47,
    armenian: "Թեքվեք ձախ։",
    spanish: "Gire a la izquierda.",
    category: "directions",
    group: "general",
    phoneticDescription: "խիրե ա լա իսկիերդա"
  },
  {
    id: 48,
    armenian: "Ես կորել եմ։",
    spanish: "Me he perdido.",
    category: "directions",
    group: "general",
    phoneticDescription: "մե է պերդիդո"
  },
  {
    id: 49,
    armenian: "Կարո՞ղ եք օգնել ինձ։",
    spanish: "¿Puede ayudarme?",
    category: "directions",
    group: "general",
    phoneticDescription: "պուեդե այուդարմե"
  },

  // 5. Տրանսպորտ (Transporte)
  {
    id: 50,
    armenian: "Որտե՞ղ կարող եմ տոմս գնել։",
    spanish: "¿Dónde puedo comprar un billete?",
    category: "transport",
    group: "general",
    phoneticDescription: "դոնդե պուեդո կոմպրար ուն բիլյետե"
  },
  {
    id: 51,
    armenian: "Մեկ տոմս, խնդրում եմ։",
    spanish: "Un billete, por favor.",
    category: "transport",
    group: "general",
    phoneticDescription: "ուն բիլյետե, պոր ֆավոր"
  },
  {
    id: 52,
    armenian: "Երկու տոմս, խնդրում եմ։",
    spanish: "Dos billetes, por favor.",
    category: "transport",
    group: "general",
    phoneticDescription: "դոս բիլյետես, պոր ֆավոր"
  },
  {
    id: 53,
    armenian: "Ո՞ր ավտոբուսն է գնում կենտրոն։",
    spanish: "¿Qué autobús va al centro?",
    category: "transport",
    group: "general",
    phoneticDescription: "կե աուտոբուս վա ալ սենտրո"
  },
  {
    id: 54,
    armenian: "Այս գնացքը գնում է Մադրի՞դ։",
    spanish: "¿Este tren va a Madrid?",
    category: "transport",
    group: "general",
    phoneticDescription: "էստե տրեն վա ա Մադրիդ"
  },
  {
    id: 55,
    armenian: "Երբ է հաջորդ գնացքը։",
    spanish: "¿Cuándo sale el próximo tren?",
    category: "transport",
    group: "general",
    phoneticDescription: "կուանդո սալե էլ պրոկսիմո տրեն"
  },
  {
    id: 56,
    armenian: "Որքա՞ն ժամանակ է տևում։",
    spanish: "¿Cuánto tiempo tarda?",
    category: "transport",
    group: "general",
    phoneticDescription: "կուանտո տիեմպո տարդա"
  },
  {
    id: 57,
    armenian: "Ես ուզում եմ տաքսի պատվիրել։",
    spanish: "Quiero pedir un taxi.",
    category: "transport",
    group: "general",
    phoneticDescription: "կիերո պեդիր ուն տաքսի"
  },
  {
    id: 58,
    armenian: "Կարո՞ղ եք ինձ հասցնել այս հասցեով։",
    spanish: "¿Puede llevarme a esta dirección?",
    category: "transport",
    group: "general",
    phoneticDescription: "պուեդե լյեվարմե ա էստա դիրեկսիոն"
  },

  // 6. Հյուրանոց (Hotel)
  {
    id: 59,
    armenian: "Ես ամրագրում ունեմ։",
    spanish: "Tengo una reserva.",
    category: "hotel",
    group: "general",
    phoneticDescription: "տենգո ունա ռեսերվա"
  },
  {
    id: 60,
    armenian: "Ես ամրագրում ունեմ Լուսիա անունով։",
    spanish: "Tengo una reserva a nombre de Lucia.",
    category: "hotel",
    group: "general",
    phoneticDescription: "տենգո ունա ռեսերվա ա նոմբրե դե Լուսիա"
  },
  {
    id: 61,
    armenian: "Մեկ սենյակ, խնդրում եմ։",
    spanish: "Una habitación, por favor.",
    category: "hotel",
    group: "general",
    phoneticDescription: "ունա աբիտասիոն, պոր ֆավոր"
  },
  {
    id: 62,
    armenian: "Երկու հոգու համար սենյակ։",
    spanish: "Una habitación para dos personas.",
    category: "hotel",
    group: "general",
    phoneticDescription: "ունա աբիտասիոն պարա դոս պերսոնաս"
  },
  {
    id: 63,
    armenian: "Որքա՞ն արժե մեկ գիշերը։",
    spanish: "¿Cuánto cuesta una noche?",
    category: "hotel",
    group: "general",
    phoneticDescription: "կուանտո կուեստա ունա նոչե"
  },
  {
    id: 64,
    armenian: "Նախաճաշը ներառվա՞ծ է։",
    spanish: "¿Está incluido el desayuno?",
    category: "hotel",
    group: "general",
    phoneticDescription: "էստա ինկլուիդո էլ դեսայունո"
  },
  {
    id: 65,
    armenian: "Ո՞ր հարկում է սենյակը։",
    spanish: "¿En qué planta está la habitación?",
    category: "hotel",
    group: "general",
    phoneticDescription: "էն կե պլանտա էստա լա աբիտասիոն"
  },
  {
    id: 66,
    armenian: "Կարո՞ղ եմ ավելի ուշ դուրս գալ։",
    spanish: "¿Puedo salir más tarde?",
    category: "hotel",
    group: "general",
    phoneticDescription: "պուեդո սալիր մաս տարդե"
  },
  {
    id: 67,
    armenian: "Բանալին, խնդրում եմ։",
    spanish: "La llave, por favor.",
    category: "hotel",
    group: "general",
    phoneticDescription: "լա լյավե, պոր ֆավոր"
  },
  {
    id: 68,
    armenian: "Wi-Fi-ի գաղտնաբառը ո՞րն է։",
    spanish: "¿Cuál es la contraseña del Wi-Fi?",
    category: "hotel",
    group: "general",
    phoneticDescription: "կուալ էս լա կոնտրասենյա դել ուայֆայ"
  },

  // 7. Ռեստորան և սրճարան (Restaurante y Cafetería)
  {
    id: 69,
    armenian: "Սեղան երկուսի համար, խնդրում եմ։",
    spanish: "Una mesa para dos, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "ունա մեսա պարա դոս, պոր ֆավոր"
  },
  {
    id: 70,
    armenian: "Մենք ամրագրում ունենք։",
    spanish: "Tenemos una reserva.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "տենեմոս ունա ռեսերվա"
  },
  {
    id: 71,
    armenian: "Կարո՞ղ եք բերել ճաշացանկը։",
    spanish: "¿Puede traer la carta?",
    category: "restaurant",
    group: "general",
    phoneticDescription: "պուեդե տրաեր լա կարտա"
  },
  {
    id: 72,
    armenian: "Ես ուզում եմ պատվիրել։",
    spanish: "Quiero pedir.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "կիերո պեդիր"
  },
  {
    id: 73,
    armenian: "Ի՞նչ խորհուրդ կտաք։",
    spanish: "¿Qué me recomienda?",
    category: "restaurant",
    group: "general",
    phoneticDescription: "կե մե ռեկոմիենդա"
  },
  {
    id: 74,
    armenian: "Ես ուզում եմ սա։",
    spanish: "Quiero esto.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "կիերո էստո"
  },
  {
    id: 75,
    armenian: "Ինձ համար սա, խնդրում եմ։",
    spanish: "Para mí esto, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "պարա մի էստո, պոր ֆավոր"
  },
  {
    id: 76,
    armenian: "Առանց մսի, խնդրում եմ։",
    spanish: "Sin carne, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "սին կարնե, պոր ֆավոր"
  },
  {
    id: 77,
    armenian: "Առանց շաքարի, խնդրում եմ։",
    spanish: "Sin azúcar, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "սին ասուկար, պոր ֆավոր"
  },
  {
    id: 78,
    armenian: "Առանց սառույցի, խնդրում եմ։",
    spanish: "Sin hielo, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "սին յելո, պոր ֆավոր"
  },
  {
    id: 79,
    armenian: "Առանց կծվի, խնդրում եմ։",
    spanish: "Sin picante, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "սին պիկանտե, պոր ֆավոր"
  },
  {
    id: 80,
    armenian: "Ես բուսակեր եմ։",
    spanish: "Soy vegetariano/a.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "սոյ վեխետարիանո (տղամարդ) / վեխետարիանա (կին)"
  },
  {
    id: 81,
    armenian: "Ես միս չեմ ուտում։",
    spanish: "No como carne.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "նո կոմո կարնե"
  },
  {
    id: 83,
    armenian: "Շատ համեղ է։",
    spanish: "Está muy rico. / Está delicioso.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "էստա մույ ռիկո / էստա դելիսիոսո"
  },
  {
    id: 84,
    armenian: "Հաշիվը, խնդրում եմ։",
    spanish: "La cuenta, por favor.",
    category: "restaurant",
    group: "general",
    phoneticDescription: "լա կուենտա, պոր ֆավոր"
  },
  {
    id: 85,
    armenian: "Կարո՞ղ եմ քարտով վճարել։",
    spanish: "¿Puedo pagar con tarjeta?",
    category: "restaurant",
    group: "general",
    phoneticDescription: "պուեդո պագար կոն տարխետա"
  },

  // 8. Խանութ և գնումներ (Tienda y Compras)
  {
    id: 86,
    armenian: "Որքա՞ն արժե։",
    spanish: "¿Cuánto cuesta?",
    category: "shopping",
    group: "general",
    phoneticDescription: "կուանտո կուեստա"
  },
  {
    id: 87,
    armenian: "Սա որքա՞ն արժե։",
    spanish: "¿Cuánto cuesta esto?",
    category: "shopping",
    group: "general",
    phoneticDescription: "կուանտո կուեստա էստո"
  },
  {
    id: 88,
    armenian: "Զեղչ կա՞։",
    spanish: "¿Hay descuento?",
    category: "shopping",
    group: "general",
    phoneticDescription: "այ դեսկուենտո"
  },
  {
    id: 89,
    armenian: "Սա զեղչո՞վ է։",
    spanish: "IEstá en oferta?",
    category: "shopping",
    group: "general",
    phoneticDescription: "էստա էն օֆերտա"
  },
  {
    id: 90,
    armenian: "Կարո՞ղ եմ փորձել։",
    spanish: "¿Puedo probarlo?",
    category: "shopping",
    group: "general",
    phoneticDescription: "պուեդո պրոբարլո"
  },
  {
    id: 91,
    armenian: "Ունե՞ք այլ չափս։",
    spanish: "¿Tiene otra talla?",
    category: "shopping",
    group: "general",
    phoneticDescription: "տիենե օտրա տալյա"
  },
  {
    id: 92,
    armenian: "Ունե՞ք այլ գույն։",
    spanish: "¿Tiene otro color?",
    category: "shopping",
    group: "general",
    phoneticDescription: "տիենե օտրո կոլոր"
  },
  {
    id: 93,
    armenian: "Ինձ պետք է փոքր չափս։",
    spanish: "Necesito una talla pequeña.",
    category: "shopping",
    group: "general",
    phoneticDescription: "նեսեսիտո ունա տալյա պեկենյա"
  },
  {
    id: 94,
    armenian: "Ինձ պետք է մեծ չափս։",
    spanish: "Necesito una talla grande.",
    category: "shopping",
    group: "general",
    phoneticDescription: "նեսեսիտո ունա տալյա գրանդե"
  },
  {
    id: 95,
    armenian: "Ես սա կվերցնեմ։",
    spanish: "Me llevo esto.",
    category: "shopping",
    group: "general",
    phoneticDescription: "մե լյեվո էստո"
  },
  {
    id: 96,
    armenian: "Ես միայն նայում եմ։",
    spanish: "Solo estoy mirando.",
    category: "shopping",
    group: "general",
    phoneticDescription: "սոլո էստոյ միրանդո"
  },
  {
    id: 97,
    armenian: "Քարտ ընդունո՞ւմ եք։",
    spanish: "¿Aceptan tarjeta?",
    category: "shopping",
    group: "general",
    phoneticDescription: "ասեպտան տարխետա"
  },
  {
    id: 98,
    armenian: "Կանխիկ կարո՞ղ եմ վճարել։",
    spanish: "¿Puedo pagar en efectivo?",
    category: "shopping",
    group: "general",
    phoneticDescription: "պուեդո պագար էն էֆեկտիվո"
  },

  // 9. Օգտակար բայեր (Verbos útiles)
  {
    id: 99,
    armenian: "Ես ուզում եմ...",
    spanish: "Quiero...",
    category: "verbs",
    group: "general",
    phoneticDescription: "կիերո..."
  },
  {
    id: 100,
    armenian: "Ես կարող եմ...",
    spanish: "Puedo...",
    category: "verbs",
    group: "general",
    phoneticDescription: "պուեդո..."
  },
  {
    id: 101,
    armenian: "Ես չեմ կարող...",
    spanish: "No puedo...",
    category: "verbs",
    group: "general",
    phoneticDescription: "նո պուեդո..."
  },
  {
    id: 102,
    armenian: "Ինձ պետք է...",
    spanish: "Necesito...",
    category: "verbs",
    group: "general",
    phoneticDescription: "նեսեսիտո..."
  },
  {
    id: 103,
    armenian: "Ես փնտրում եմ...",
    spanish: "Busco...",
    category: "verbs",
    group: "general",
    phoneticDescription: "բուսկո..."
  },
  {
    id: 104,
    armenian: "Ես ունեմ...",
    spanish: "Tengo...",
    category: "verbs",
    group: "general",
    phoneticDescription: "տենգո..."
  },
  {
    id: 105,
    armenian: "Ես չունեմ...",
    spanish: "No tengo...",
    category: "verbs",
    group: "general",
    phoneticDescription: "նո տենգո..."
  },
  {
    id: 106,
    armenian: "Ես գնում եմ...",
    spanish: "Voy a...",
    category: "verbs",
    group: "general",
    phoneticDescription: "վոյ ա..."
  },
  {
    id: 107,
    armenian: "Ես ուզում եմ գնալ...",
    spanish: "Quiero ir a...",
    category: "verbs",
    group: "general",
    phoneticDescription: "կիերո իր ա..."
  },
  {
    id: 108,
    armenian: "Ես պետք է գնամ...",
    spanish: "Tengo que ir a...",
    category: "verbs",
    group: "general",
    phoneticDescription: "տենգո կե իր ա..."
  },

  // 10. Աշխատանք փնտրել (Buscar trabajo)
  {
    id: 109,
    armenian: "Ես աշխատանք եմ փնտրում։",
    spanish: "Busco trabajo.",
    category: "job_search",
    group: "work",
    phoneticDescription: "բուսկո տրաբախո"
  },
  {
    id: 110,
    armenian: "Ես ուզում եմ աշխատանք գտնել։",
    spanish: "Quiero encontrar trabajo.",
    category: "job_search",
    group: "work",
    phoneticDescription: "կիերո էնկոնտրար տրաբախո"
  },
  {
    id: 111,
    armenian: "Աշխատանք կա՞։",
    spanish: "¿Hay trabajo?",
    category: "job_search",
    group: "work",
    phoneticDescription: "այ տրաբախո"
  },
  {
    id: 112,
    armenian: "Դուք աշխատող փնտրո՞ւմ եք։",
    spanish: "¿Buscan empleados?",
    category: "job_search",
    group: "work",
    phoneticDescription: "բուսկան էմպլեադոս"
  },
  {
    id: 113,
    armenian: "Դուք նոր աշխատողներ ընդունո՞ւմ եք։",
    spanish: "¿Están contratando personal?",
    category: "job_search",
    group: "work",
    phoneticDescription: "էստան կոնտրատանդո պերսոնալ"
  },
  {
    id: 114,
    armenian: "Կա՞ ազատ հաստիք։",
    spanish: "¿Hay alguna vacante?",
    category: "job_search",
    group: "work",
    phoneticDescription: "այ ալգունա վականտե"
  },
  {
    id: 115,
    armenian: "Կարո՞ղ եմ թողնել իմ CV-ն։",
    spanish: "¿Puedo dejar mi currículum?",
    category: "job_search",
    group: "work",
    phoneticDescription: "պուեդո դեխար մի կուռիկուլում"
  },
  {
    id: 116,
    armenian: "Ուզում եմ ուղարկել իմ CV-ն։",
    spanish: "Quiero enviar mi currículum.",
    category: "job_search",
    group: "work",
    phoneticDescription: "կիերո էնվիար մի կուռիկուլում"
  },

  // 11. Ինձ ներկայացնել (Presentarme)
  {
    id: 117,
    armenian: "Իմ անունը … է։",
    spanish: "Me llamo ….",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "մե լյամո..."
  },
  {
    id: 118,
    armenian: "Ես Հայաստանից եմ։", // repeated in job search context too! Excellent to keep both
    spanish: "Soy de Armenia.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "սոյ դե Արմենիա"
  },
  {
    id: 119,
    armenian: "Ես ապրում եմ Իսպանիայում։",
    spanish: "Vivo en España.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "վիվո էն Էսպանյա"
  },
  {
    id: 120,
    armenian: "Ես նոր եմ եկել Իսպանիա։",
    spanish: "Acabo de llegar a España.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "ակաբո դե լյեգար ա Էսպանյա"
  },
  {
    id: 121,
    armenian: "Ես մի քիչ իսպաներեն եմ խոսում։",
    spanish: "Hablo un poco de español.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "աբլո ուն պոկո դե էսպանյոլ"
  },
  {
    id: 122,
    armenian: "Ես սովորում եմ իսպաներեն։",
    spanish: "Estoy aprendiendo español.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "էստոյ ապրենդիենդո էսպանյոլ"
  },
  {
    id: 123,
    armenian: "Ես կարող եմ սովորել արագ։",
    spanish: "Puedo aprender rápido.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "պուեդո ապրենդեր ռապիդո"
  },
  {
    id: 124,
    armenian: "Ես պատասխանատու եմ։",
    spanish: "Soy responsable.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "սոյ ռեսպոնսաբլե"
  },
  {
    id: 125,
    armenian: "Ես աշխատասեր եմ։",
    spanish: "Soy trabajador/a.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "սոյ տրաբախադոր (տղամարդ) / տրաբախադորա (կին)"
  },
  {
    id: 126,
    armenian: "Ես ճշտապահ եմ։",
    spanish: "Soy puntual.",
    category: "introduce_self",
    group: "work",
    phoneticDescription: "սոյ պունտուալ"
  },

  // 12. Փորձ (Experiencia)
  {
    id: 127,
    armenian: "Ես փորձ ունեմ։",
    spanish: "Tengo experiencia.",
    category: "experience",
    group: "work",
    phoneticDescription: "տենգո էքսպերիենսիա"
  },
  {
    id: 128,
    armenian: "Ես փորձ չունեմ, բայց արագ եմ սովորում։",
    spanish: "No tengo experiencia, pero aprendo rápido.",
    category: "experience",
    group: "work",
    phoneticDescription: "նո տենգո էքսպերիենսիա, պերո ապրենդո ռապիդո"
  },
  {
    id: 129,
    armenian: "Ես աշխատել եմ խանութում։",
    spanish: "He trabajado en una tienda.",
    category: "experience",
    group: "work",
    phoneticDescription: "է տրաբախադո էն ունա տիենդա"
  },
  {
    id: 130,
    armenian: "Ես աշխատել եմ սրճարանում։",
    spanish: "He trabajado en una cafetería.",
    category: "experience",
    group: "work",
    phoneticDescription: "է տրաբախադո էն ունա կաֆետերիա"
  },
  {
    id: 131,
    armenian: "Ես աշխատել եմ ռեստորանում։",
    spanish: "He trabajado en un restaurante.",
    category: "experience",
    group: "work",
    phoneticDescription: "է տրաբախադո էն ուն ռեստաուրանտե"
  },
  {
    id: 132,
    armenian: "Ես կարող եմ աշխատել թիմում։",
    spanish: "Puedo trabajar en equipo.",
    category: "experience",
    group: "work",
    phoneticDescription: "պուեդո տրաբախար էն էկիպո"
  },
  {
    id: 133,
    armenian: "Ես կարող եմ աշխատել հաճախորդների հետ։",
    spanish: "Puedo trabajar con clientes.",
    category: "experience",
    group: "work",
    phoneticDescription: "պուեդո տրաբախար կոն կլիենտես"
  },

  // 13. Հարցեր աշխատանքի մասին (Preguntas sobre el trabajo)
  {
    id: 134,
    armenian: "Ի՞նչ աշխատանք է։",
    spanish: "¿Qué tipo de trabajo es?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "կե տիպո դե տրաբախո էս"
  },
  {
    id: 135,
    armenian: "Որքա՞ն է աշխատավարձը։",
    spanish: "¿Cuál es el sueldo?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "կուալ էս էլ սուելդո"
  },
  {
    id: 136,
    armenian: "Քանի՞ ժամ է աշխատանքը։",
    spanish: "¿Cuántas horas son?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "կուանդաս որաս սոն"
  },
  {
    id: 137,
    armenian: "Գրաֆիկը ինչպիսի՞ն է։",
    spanish: "¿Cuál es el horario?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "կուալ էս էլ որարիո"
  },
  {
    id: 138,
    armenian: "Աշխատանքը լրիվ դրույքո՞վ է։",
    spanish: "¿Es jornada completa?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "էս խորնադա կոմպլետա"
  },
  {
    id: 139,
    armenian: "Աշխատանքը կես դրույքո՞վ է։",
    spanish: "¿Es media jornada?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "էս մեդիա խորնադա"
  },
  {
    id: 140,
    armenian: "Պայմանագիր կա՞։",
    spanish: "¿Hay contrato?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "այ կոնտրատո"
  },
  {
    id: 141,
    armenian: "Ե՞րբ կարող եմ սկսել։",
    spanish: "¿Cuándo puedo empezar?",
    category: "job_questions",
    group: "work",
    phoneticDescription: "կուանդո պուեդո էմպեսար"
  },

  // 14. Հարցազրույցում (En la entrevista)
  {
    id: 142,
    armenian: "Շնորհակալ եմ հնարավորության համար։",
    spanish: "Gracias por la oportunidad.",
    category: "interview",
    group: "work",
    phoneticDescription: "գրասիաս պոր լա օպորտունիդադ"
  },
  {
    id: 143,
    armenian: "Ես հետաքրքրված եմ այս աշխատանքով։",
    spanish: "Estoy interesado/a en este trabajo.",
    category: "interview",
    group: "work",
    phoneticDescription: "էստոյ ինտերեսադո (տղամարդ) / ինտերեսադա (կին) էն էստե տրաբախո"
  },
  {
    id: 144,
    armenian: "Ես պատրաստ եմ սովորել։",
    spanish: "Estoy dispuesto/a a aprender.",
    category: "interview",
    group: "work",
    phoneticDescription: "էստոյ դիսպուեստո (տղամարդ) / դիսպուեստա (կին) ա ապրենդեր"
  },
  {
    id: 145,
    armenian: "Ես կարող եմ սկսել այս շաբաթ։",
    spanish: "Puedo empezar esta semana.",
    category: "interview",
    group: "work",
    phoneticDescription: "պուեդո էմպեսար էստա սեմանա"
  },
  {
    id: 146,
    armenian: "Ես կարող եմ աշխատել առավոտյան։",
    spanish: "Puedo trabajar por la mañana.",
    category: "interview",
    group: "work",
    phoneticDescription: "պուեդո տրաբախար պոր լա մանյանա"
  },
  {
    id: 147,
    armenian: "Ես կարող եմ աշխատել երեկոյան։",
    spanish: "Puedo trabajar por la tarde.",
    category: "interview",
    group: "work",
    phoneticDescription: "պուեդո տրաբախար պոր լա տարդե"
  },
  {
    id: 148,
    armenian: "Ես կարող եմ աշխատել հանգստյան օրերին։",
    spanish: "Puedo trabajar los fines de semana.",
    category: "interview",
    group: "work",
    phoneticDescription: "պուեդո տրաբախար լոս ֆինես դե սեմանա"
  }
];

export interface PronunciationRule {
  letter: string;
  pronunciationAr: string;
  exampleSp: string;
  exampleAr: string;
  notesArm: string;
}

export const PRONUNCIATION_RULES: PronunciationRule[] = [
  { letter: "H / h", pronunciationAr: "Համր (չի արտասանվում)", exampleSp: "Hola", exampleAr: "Օլա [Բարև]", notesArm: "Իսպաներենում 'h' տառը տեքստում երբեք չի արտասանվում։" },
  { letter: "J / j", pronunciationAr: "Խ", exampleSp: "Giro / Jesús", exampleAr: "Խիրո / Խեսուս", notesArm: "Արտասանվում է որպես հայերեն կոշտ 'Խ'։" },
  { letter: "G / g", pronunciationAr: "Գ / Խ", exampleSp: "Gracias / Gire", exampleAr: "Գրասիաս / Խիրե", notesArm: "Ar, o, u-ից առաջ արտասանվում է 'Գ', իսկ e, i տառերից առաջ՝ 'Խ'։" },
  { letter: "C / c", pronunciationAr: "Կ / Ս (կամ Թ)", exampleSp: "Cerca / Como", exampleAr: "Սերկա / Կոմո", notesArm: "e, i-ից առաջ 'Ս' (կամ 'Թ' Իսպանիայում), այլ տառերից առաջ կարդացվում է 'Կ'։" },
  { letter: "LL / ll", pronunciationAr: "Յ / Ժ / Լյ", exampleSp: "Llave / Llama", exampleAr: "Լյավե (կամ Յավե/Ժավե)", notesArm: "Տարբեր երկրներում հնչում է տարբեր՝ 'Յ'-ից մինչև թեթև 'Ժ' կամ 'Լյ'։" },
  { letter: "Ñ / ñ", pronunciationAr: "Նյ", exampleSp: "España / Baño", exampleAr: "Էսպանյա / Բանյո", notesArm: "Հայերենի փափուկ 'նյ' հնչյունն է։" },
  { letter: "CH / ch", pronunciationAr: "Չ", exampleSp: "Noches", exampleAr: "Նոչես", notesArm: "Համապատասխանում է հայերենի 'Չ'-ին։" },
  { letter: "V / v", pronunciationAr: "Բ / Վ", exampleSp: "Vale / Vivo", exampleAr: "Բալե / Վիվո", notesArm: "Հաճախ արտասանվում է որպես 'Բ'-ի և 'Վ'-ի արանքում մի հնչյուն (հիմնականում 'Բ' երանգով)։" },
  { letter: "Z / z", pronunciationAr: "Ս (կամ Թ)", exampleSp: "Zumo / Zapato", exampleAr: "Սումո / Սապատո", notesArm: "Լատինական Ամերիկայում արտասանվում է որպես 'Ս', Իսպանիայում՝ միջատամնային 'Թ'։" }
];
