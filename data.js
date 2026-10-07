/* ============================================================
   Fasahar Al'umma — data.js
   All content lives here. Edit this file, nothing else.
   ============================================================

   HOW TO EDIT THIS FILE:
   ------------------------------------------------------------
   • Every user-facing string has two versions: _ha (Hausa) and _en (English).
   • If you set video: "" the video card will not show up. Leave blank if no video.
   • In read_ha / read_en you can use simple formatting:
       **bold text**
       - bullet point
       - another bullet
       Plain paragraphs separated by a blank line.
   • To add a lesson, copy an existing one and change the id + content.
   • Never change an "id" once learners have started using the app.
   ============================================================ */

const DATA = {

  /* ============================================================
     1. APP META
     ============================================================ */
  meta: {
    appName: "Fasahar Al'umma",
    tagline_ha: "Fasahar zamani ga al'umma baki ɗaya",
    tagline_en: "Digital skills for the whole community",
    version: "1.0.0",
    defaultLang: "ha",
    supportedLangs: ["ha", "en"]
  },


  /* ============================================================
     2. UI STRINGS
     Every button, label, and system message in the app.
     ============================================================ */
  ui: {

    nav: {
      home_ha: "Gida",
      home_en: "Home",
      opportunities_ha: "Dama",
      opportunities_en: "Opportunities",
      profile_ha: "Bayani na",
      profile_en: "Profile",
      language_ha: "Harshe",
      language_en: "Language"
    },

    buttons: {
      start_ha: "Fara Koyo",
      start_en: "Start Learning",
      continue_ha: "Ci gaba",
      continue_en: "Continue",
      next_ha: "Na gaba",
      next_en: "Next",
      back_ha: "Baya",
      back_en: "Back",
      submit_ha: "Aika",
      submit_en: "Submit",
      try_again_ha: "Sake gwadawa",
      try_again_en: "Try again",
      take_exam_ha: "Yi Jarrabawar Module",
      take_exam_en: "Take Module Exam",
      visit_opportunity_ha: "Ziyarci Dama",
      visit_opportunity_en: "Visit Opportunity"
    },

    lesson: {
      watch_ha: "Kalla",
      watch_en: "Watch",
      read_ha: "Karanta",
      read_en: "Read",
      verify_ha: "Tabbatar",
      verify_en: "Verify",
      correct_ha: "Madalla! Ka amsa daidai.",
      correct_en: "Well done! That's correct.",
      incorrect_ha: "Ba daidai ba. Sake gwadawa.",
      incorrect_en: "Not quite. Try again.",
      locked_ha: "A kulle",
      locked_en: "Locked",
      completed_ha: "An kammala",
      completed_en: "Completed",
      lessons_left_ha: "darasi suka rage",
      lessons_left_en: "lessons left",
      module_complete_ha: "Ka kammala wannan module!",
      module_complete_en: "You've completed this module!"
    },

    home: {
      greeting_ha: "Sannu",
      greeting_en: "Hello",
      continue_learning_ha: "Ci gaba da koyo",
      continue_learning_en: "Continue learning",
      your_paths_ha: "Hanyoyin karatunka",
      your_paths_en: "Your learning paths",
      overall_progress_ha: "Ci gaban gaba ɗaya",
      overall_progress_en: "Overall progress",
      no_progress_ha: "Fara darasi na farko don ganin ci gabanka.",
      no_progress_en: "Start your first lesson to see progress here."
    },

    exam: {
      title_ha: "Jarrabawar Module",
      title_en: "Module Exam",
      intro_ha: "Amsa duk tambayoyi don kammala wannan module.",
      intro_en: "Answer all questions to complete this module.",
      pass_ha: "Ka ci jarrabawar! Module ɗin ya kammala.",
      pass_en: "You passed! Module complete.",
      fail_ha: "Ba ka ci ba. Sake gwadawa.",
      fail_en: "You didn't pass. Try again.",
      score_ha: "Maki",
      score_en: "Score"
    },

    opportunities: {
      title_ha: "Dama da Tallafi",
      title_en: "Opportunities & Grants",
      subtitle_ha: "Abubuwan da za ka iya nema a yanzu",
      subtitle_en: "Things you can apply for right now",
      guide_title_ha: "Yadda za ka gane dama ta gaskiya",
      guide_title_en: "How to spot a real opportunity",
      verified_ha: "An tabbatar",
      verified_en: "Verified",
      deadline_ha: "Ranar ƙarshe",
      deadline_en: "Deadline",
      rolling_ha: "Kullum buɗe",
      rolling_en: "Always open"
    },

    safety: {
      scam_warning_ha: "Ka lura: Idan wani ya ce ka aika OTP ko PIN, zamba ce.",
      scam_warning_en: "Remember: If anyone asks for your OTP or PIN, it's a scam.",
      verify_before_apply_ha: "Tabbatar da asalin dama kafin ka aika komai.",
      verify_before_apply_en: "Verify an opportunity is real before you apply."
    }
  },


  /* ============================================================
     3. MODULES
     Six learning tracks. Each has lessons + a final exam.
     ============================================================ */
  modules: [

    /* ---------- MODULE 1 — Phone & Internet Basics ---------- */
    {
      id: "phone-internet",
      order: 1,
      icon: "📱",
      title_ha: "Tushen Waya da Yanar Gizo",
      title_en: "Phone & Internet Basics",
      desc_ha: "Koyi yadda wayarka take aiki, yadda za ka bincika abubuwa a yanar gizo, ka sauke manhajoji, ka kuma aika fayiloli.",
      desc_en: "Learn how your phone works, how to search the internet, download apps, and share files.",
      examPassMark: 70,
      lessons: [
        {
          id: "phone-l1",
          order: 1,
          title_ha: "Menene Wayar Zamani?",
          title_en: "What is a Smartphone?",
          video: "https://www.youtube.com/embed/9Tk1jNWQx3o?si=_YdksU0A-T7E-BUm",
          read_ha:
            "Wayar zamani (smartphone) kayan aiki ne mai ƙarfi da ke cikin aljihunka.\n\n" +
            "**Abin da take iya yi:**\n" +
            "- Aika saƙo da kira\n" +
            "- Bincika yanar gizo\n" +
            "- Ɗaukar hotuna\n" +
            "- Biyan kuɗi\n" +
            "- Koyon sabbin abubuwa\n\n" +
            "Waya ba don wasa kawai ba ce. Ita ce **ofis ɗinka mai ɗauka** — za ka iya yin kasuwanci, koyi darasi, da sadarwa da mutane daga ko'ina.",
          read_en:
            "A smartphone is a powerful tool that fits in your pocket.\n\n" +
            "**What it can do:**\n" +
            "- Send messages and make calls\n" +
            "- Search the internet\n" +
            "- Take photos\n" +
            "- Pay for things\n" +
            "- Learn new skills\n\n" +
            "A phone is not just for entertainment. It's your **portable office** — you can run a business, take a course, and connect with people from anywhere.",
          quiz: {
            question_ha: "Menene babban amfanin wayar zamani?",
            question_en: "What is the main purpose of a smartphone?",
            options: [
              { text_ha: "Wasa kawai", text_en: "Only for games", correct: false },
              { text_ha: "Kayan aiki mai ƙarfi don aiki, koyo, da sadarwa", text_en: "A powerful tool for work, learning, and connecting", correct: true },
              { text_ha: "Ajiya kawai", text_en: "Only for storage", correct: false },
              { text_ha: "Kira kawai", text_en: "Only for calls", correct: false }
            ],
            explanation_ha: "Waya kayan aiki ne mai amfani da yawa — ba don wasa kawai ba.",
            explanation_en: "A phone is a multi-purpose tool — not just for entertainment."
          }
        },
        {
          id: "phone-l2",
          order: 2,
          title_ha: "Bincike a Google",
          title_en: "Searching on Google",
          video: "https://www.youtube.com/embed/1KBwovVb9ls?si=9CX5F3iefceZrJD9",
          read_ha:
            "Google ita ce hanya mafi sauƙi don samun amsa ga kowace tambaya.\n\n" +
            "**Yadda za ka yi bincike mai kyau:**\n" +
            "- Rubuta tambayarka daidai kamar yadda za ka tambayi aboki\n" +
            "- Yi amfani da kalmomi kaɗan masu muhimmanci\n" +
            "- Karanta sakamako da yawa kafin ka zaɓi ɗaya\n\n" +
            "**Misali:** Maimakon ka rubuta \"ina son sanin yadda ake yin tuwo\", rubuta kawai **\"yadda ake yin tuwo\"**.\n\n" +
            "Google ba ta gajiya. Kowane bincike darasi ne.",
          read_en:
            "Google is the easiest way to find answers to any question.\n\n" +
            "**How to search well:**\n" +
            "- Type your question the way you'd ask a friend\n" +
            "- Use a few important keywords\n" +
            "- Read several results before choosing one\n\n" +
            "**Example:** Instead of \"I want to know how to cook tuwo\", just type **\"how to cook tuwo\"**.\n\n" +
            "Google never gets tired. Every search is a lesson.",
          quiz: {
            question_ha: "Menene hanya mafi kyau don bincike a Google?",
            question_en: "What's the best way to search on Google?",
            options: [
              { text_ha: "Rubuta jimla mai tsawo", text_en: "Type a very long sentence", correct: false },
              { text_ha: "Yi amfani da kalmomi kaɗan masu muhimmanci", text_en: "Use a few important keywords", correct: true },
              { text_ha: "Rubuta tambaya a Hausa kawai", text_en: "Only search in Hausa", correct: false },
              { text_ha: "Nemi mutum ya taimaka", text_en: "Ask someone to do it", correct: false }
            ],
            explanation_ha: "Kalmomi kaɗan masu muhimmanci sun fi kyau fiye da jimla mai tsawo.",
            explanation_en: "A few important keywords work better than a long sentence."
          }
        },
        {
          id: "phone-l3",
          order: 3,
          title_ha: "Sauke Manhajoji",
          title_en: "Downloading Apps",
          video: "",
          read_ha:
            "Manhajoji (apps) su ne shirye-shiryen da ke aiki a wayarka.\n\n" +
            "**Inda za ka samu su:**\n" +
            "- **Play Store** — don wayoyin Android\n" +
            "- **App Store** — don wayoyin iPhone\n\n" +
            "**Kafin ka sauke wata manhaja:**\n" +
            "- Duba sunan mai yin ta\n" +
            "- Karanta sharuɗɗanta\n" +
            "- Karanta bita (reviews) na wasu masu amfani\n" +
            "- Duba adadin masu sauke ta\n\n" +
            "Idan manhaja ba ta da sunan mai yin ta bayyananne, **kada ka sauke ta**.",
          read_en:
            "Apps are the programs that run on your phone.\n\n" +
            "**Where to get them:**\n" +
            "- **Play Store** — for Android phones\n" +
            "- **App Store** — for iPhones\n\n" +
            "**Before downloading an app:**\n" +
            "- Check the developer's name\n" +
            "- Read the permissions\n" +
            "- Read reviews from other users\n" +
            "- Check how many people downloaded it\n\n" +
            "If an app has no clear developer name, **don't download it**.",
          quiz: {
            question_ha: "Menene ya kamata ka duba kafin ka sauke manhaja?",
            question_en: "What should you check before downloading an app?",
            options: [
              { text_ha: "Launi na manhajar", text_en: "The app's color", correct: false },
              { text_ha: "Sunan mai yin ta da bita", text_en: "The developer name and reviews", correct: true },
              { text_ha: "Girman fayil ɗin", text_en: "The file size", correct: false },
              { text_ha: "Adadin hotuna", text_en: "Number of screenshots", correct: false }
            ],
            explanation_ha: "Sunan mai yin ta da bita suna nuna manhaja ta gaskiya ce.",
            explanation_en: "The developer name and reviews show whether an app is trustworthy."
          }
        },
        {
          id: "phone-l4",
          order: 4,
          title_ha: "Aika Fayiloli",
          title_en: "Sharing Files",
          video: "",
          read_ha:
            "Za ka iya aika hoto, takarda, ko bidiyo ga wani ta hanyoyi da yawa.\n\n" +
            "**Hanyoyin da aka fi amfani:**\n" +
            "- **WhatsApp** — don aika ga aboki\n" +
            "- **Email** — don aika wa ofis ko cibiya\n" +
            "- **Bluetooth** — don aika kai tsaye daga waya zuwa waya\n\n" +
            "**Kafin ka aika wani fayil:**\n" +
            "- Tabbatar ka aika wa mutumin da ya dace\n" +
            "- Kar ka aika bayanan sirri kamar NIN ko BVN ta WhatsApp\n\n" +
            "Fayil da ya tafi ba ya dawowa. Yi hankali.",
          read_en:
            "You can send a photo, document, or video to someone in several ways.\n\n" +
            "**Most common methods:**\n" +
            "- **WhatsApp** — for friends and family\n" +
            "- **Email** — for offices and institutions\n" +
            "- **Bluetooth** — direct phone-to-phone transfer\n\n" +
            "**Before sending a file:**\n" +
            "- Make sure you're sending it to the right person\n" +
            "- Never send sensitive data like your NIN or BVN through WhatsApp\n\n" +
            "A file that leaves your phone cannot be taken back. Be careful.",
          quiz: {
            question_ha: "Wane irin bayani bai kamata ka aika ta WhatsApp ba?",
            question_en: "What kind of information should you NOT send through WhatsApp?",
            options: [
              { text_ha: "Hoto na iyali", text_en: "A family photo", correct: false },
              { text_ha: "Lambar BVN ko NIN", text_en: "Your BVN or NIN number", correct: true },
              { text_ha: "Saƙon gaisuwa", text_en: "A greeting message", correct: false },
              { text_ha: "Adireshin gida", text_en: "A home address", correct: false }
            ],
            explanation_ha: "Bayanan sirri kamar BVN da NIN kada a taɓa aika su ta WhatsApp.",
            explanation_en: "Sensitive data like BVN and NIN should never be sent through WhatsApp."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene amfanin wayar zamani?",
          question_en: "What is a smartphone used for?",
          options: [
            { text_ha: "Wasa kawai", text_en: "Games only", correct: false },
            { text_ha: "Aiki, koyo, da sadarwa", text_en: "Work, learning, and communication", correct: true },
            { text_ha: "Ajiya kawai", text_en: "Storage only", correct: false },
            { text_ha: "Kira kawai", text_en: "Calls only", correct: false }
          ],
          explanation_ha: "Waya kayan aiki ce mai amfani da yawa.",
          explanation_en: "A phone is a multi-purpose tool."
        },
        {
          question_ha: "Menene ya kamata ka duba kafin ka sauke manhaja?",
          question_en: "What should you check before downloading an app?",
          options: [
            { text_ha: "Launi", text_en: "The color", correct: false },
            { text_ha: "Sunan mai yin ta da bita", text_en: "Developer name and reviews", correct: true },
            { text_ha: "Girman fayil", text_en: "File size", correct: false },
            { text_ha: "Adadin hotuna", text_en: "Screenshots count", correct: false }
          ],
          explanation_ha: "Sunan mai yin ta da bita suna nuna amincin manhaja.",
          explanation_en: "The developer name and reviews show whether an app is trustworthy."
        },
        {
          question_ha: "Wace hanya ce mafi kyau don bincike a Google?",
          question_en: "What's the best way to search on Google?",
          options: [
            { text_ha: "Jimla mai tsawo", text_en: "A very long sentence", correct: false },
            { text_ha: "Kalmomi kaɗan masu muhimmanci", text_en: "A few important keywords", correct: true },
            { text_ha: "Hausa kawai", text_en: "Hausa only", correct: false },
            { text_ha: "Neman taimako", text_en: "Ask for help", correct: false }
          ],
          explanation_ha: "Kalmomi kaɗan masu muhimmanci sun fi kyau.",
          explanation_en: "A few important keywords work best."
        }
      ]
    },

    /* ---------- MODULE 2 — Email & Digital Work ---------- */
    {
      id: "email-work",
      order: 2,
      icon: "📧",
      title_ha: "Ofis Na Waya da Wasiku",
      title_en: "Email & Digital Work",
      desc_ha: "Koyi yadda za ka buɗe imel mai aminci, aika fayiloli, rubuta CV, da neman aiki a kan layi.",
      desc_en: "Learn how to open a safe email, send attachments, write a CV, and apply for jobs online.",
      examPassMark: 70,
      lessons: [
        {
          id: "email-l1",
          order: 1,
          title_ha: "Buɗe Imel Mai Aminci",
          title_en: "Creating a Safe Email",
          video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          read_ha:
            "Imel ita ce hanyar sadarwa ta hukuma a yanar gizo.\n\n" +
            "**Dole ka sami imel idan:**\n" +
            "- Kana neman aiki\n" +
            "- Kana neman tallafi\n" +
            "- Kana yin kasuwanci\n\n" +
            "**Yadda za ka buɗe imel mai aminci:**\n" +
            "- Yi amfani da sunanka na gaske\n" +
            "- Yi password mai ƙarfi (haruffa, lambobi, da alamomi)\n" +
            "- Kar ka bayyana password ɗinka ga kowa\n" +
            "- Kunna 2FA idan akwai\n\n" +
            "Gmail ita ce mafi sauƙi kuma kyauta.",
          read_en:
            "Email is the official way of communicating online.\n\n" +
            "**You need email if:**\n" +
            "- You're applying for a job\n" +
            "- You're applying for a grant\n" +
            "- You're doing business\n\n" +
            "**How to create a safe email:**\n" +
            "- Use your real name\n" +
            "- Use a strong password (letters, numbers, and symbols)\n" +
            "- Never share your password with anyone\n" +
            "- Turn on 2FA if available\n\n" +
            "Gmail is the easiest and free.",
          quiz: {
            question_ha: "Menene password mai ƙarfi?",
            question_en: "What makes a password strong?",
            options: [
              { text_ha: "Sunanka kawai", text_en: "Just your name", correct: false },
              { text_ha: "Haruffa, lambobi, da alamomi", text_en: "Letters, numbers, and symbols", correct: true },
              { text_ha: "Shekarar haihuwarka", text_en: "Your birth year", correct: false },
              { text_ha: "123456", text_en: "123456", correct: false }
            ],
            explanation_ha: "Password mai ƙarfi yana haɗa haruffa, lambobi, da alamomi.",
            explanation_en: "A strong password mixes letters, numbers, and symbols."
          }
        },
        {
          id: "email-l2",
          order: 2,
          title_ha: "Aika Fayiloli ta Imel",
          title_en: "Sending Attachments",
          video: "",
          read_ha:
            "Za ka iya aika hoto, CV, ko takarda tare da imel.\n\n" +
            "**Yadda ake yi:**\n" +
            "- Buɗe imel ɗinka\n" +
            "- Danna maɓallin **attach** (alamar clip ɗin takarda)\n" +
            "- Zaɓi fayil ɗin da kake so\n" +
            "- Rubuta saƙo ka aika\n\n" +
            "**Ka tuna:**\n" +
            "- Kar ka aika fayil fiye da 25MB\n" +
            "- Kar ka aika bayanan sirri ga wanda ba ka sani ba\n\n" +
            "Aika fayil ɗin daidai, sannan ka tabbatar an karɓa.",
          read_en:
            "You can send a photo, CV, or document along with an email.\n\n" +
            "**How to do it:**\n" +
            "- Open your email\n" +
            "- Click the **attach** button (paperclip icon)\n" +
            "- Choose the file you want\n" +
            "- Write a message and send\n\n" +
            "**Remember:**\n" +
            "- Don't send files over 25MB\n" +
            "- Never send sensitive data to someone you don't know\n\n" +
            "Send the file correctly, and confirm it was received.",
          quiz: {
            question_ha: "Menene alamar attach a imel?",
            question_en: "What is the attach icon in email?",
            options: [
              { text_ha: "Alamar hoto", text_en: "A photo icon", correct: false },
              { text_ha: "Alamar clip ɗin takarda", text_en: "A paperclip icon", correct: true },
              { text_ha: "Alamar kira", text_en: "A phone icon", correct: false },
              { text_ha: "Alamar ajiya", text_en: "A save icon", correct: false }
            ],
            explanation_ha: "Alamar clip ɗin takarda ita ce attach.",
            explanation_en: "The paperclip icon is the attach button."
          }
        },
        {
          id: "email-l3",
          order: 3,
          title_ha: "Rubuta CV",
          title_en: "Writing a CV",
          video: "",
          read_ha:
            "CV takarda ce da ke bayyana kanka ga mai aiki.\n\n" +
            "**Abin da ya kamata ya kasance a cikin CV:**\n" +
            "- Sunanka da lambar waya\n" +
            "- Adireshin imel\n" +
            "- Iliminka\n" +
            "- Ƙwarewarka\n" +
            "- Ayyukan da ka taɓa yi\n\n" +
            "**Ka tuna:**\n" +
            "- CV ya kasance shafi ɗaya ko biyu\n" +
            "- Yi amfani da harshe mai sauƙi\n" +
            "- Kar ka yi ƙarya\n\n" +
            "CV mai kyau tana buɗe ƙofar aiki.",
          read_en:
            "A CV is a document that introduces you to an employer.\n\n" +
            "**What a CV should contain:**\n" +
            "- Your name and phone number\n" +
            "- Email address\n" +
            "- Education\n" +
            "- Skills\n" +
            "- Past work experience\n\n" +
            "**Remember:**\n" +
            "- Keep it to one or two pages\n" +
            "- Use simple language\n" +
            "- Don't lie\n\n" +
            "A good CV opens the door to a job.",
          quiz: {
            question_ha: "Menene bai kamata ya kasance a cikin CV ba?",
            question_en: "What should NOT be in a CV?",
            options: [
              { text_ha: "Iliminka", text_en: "Your education", correct: false },
              { text_ha: "Ƙarya", text_en: "A lie", correct: true },
              { text_ha: "Ƙwarewarka", text_en: "Your skills", correct: false },
              { text_ha: "Lambar waya", text_en: "Your phone number", correct: false }
            ],
            explanation_ha: "Kada ka taɓa yin ƙarya a CV.",
            explanation_en: "Never lie on a CV."
          }
        },
        {
          id: "email-l4",
          order: 4,
          title_ha: "Neman Aiki a Kan Layi",
          title_en: "Applying for Jobs Online",
          video: "",
          read_ha:
            "Yanzu ana neman aiki a kan layi.\n\n" +
            "**Inda za ka nemi aiki:**\n" +
            "- **LinkedIn** — don manyan ayyuka\n" +
            "- **Jobberman** — don ayyukan Najeriya\n" +
            "- Shafukan kamfanoni kai tsaye\n\n" +
            "**Kafin ka aika nema:**\n" +
            "- Karanta buƙatun aikin sosai\n" +
            "- Tabbatar CV ɗinka ya dace\n" +
            "- Rubuta wasiƙa (cover letter) gajera\n\n" +
            "**Ka lura:** Idan an ce ka biya kuɗi don neman aiki, **zamba ce**.",
          read_en:
            "Today, jobs are found online.\n\n" +
            "**Where to look:**\n" +
            "- **LinkedIn** — for professional roles\n" +
            "- **Jobberman** — for Nigerian jobs\n" +
            "- Company websites directly\n\n" +
            "**Before applying:**\n" +
            "- Read the job requirements carefully\n" +
            "- Make sure your CV matches\n" +
            "- Write a short cover letter\n\n" +
            "**Note:** If they ask you to pay money to apply, **it's a scam**.",
          quiz: {
            question_ha: "Idan an ce ka biya kuɗi don neman aiki, menene hakan?",
            question_en: "If they ask you to pay money to apply for a job, what is that?",
            options: [
              { text_ha: "Daidai ne", text_en: "Normal", correct: false },
              { text_ha: "Zamba ce", text_en: "It's a scam", correct: true },
              { text_ha: "Dole ne", text_en: "Required", correct: false },
              { text_ha: "Kyauta ce", text_en: "A gift", correct: false }
            ],
            explanation_ha: "Aikin gaskiya ba ya buƙatar kuɗi don nema.",
            explanation_en: "A real job never asks you to pay to apply."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene password mai ƙarfi?",
          question_en: "What makes a strong password?",
          options: [
            { text_ha: "Sunanka", text_en: "Your name", correct: false },
            { text_ha: "Haruffa, lambobi, da alamomi", text_en: "Letters, numbers, and symbols", correct: true },
            { text_ha: "Shekarar haihuwa", text_en: "Birth year", correct: false },
            { text_ha: "123456", text_en: "123456", correct: false }
          ],
          explanation_ha: "Password mai ƙarfi yana haɗa haruffa, lambobi, da alamomi.",
          explanation_en: "A strong password mixes letters, numbers, and symbols."
        },
        {
          question_ha: "Menene bai kamata ya kasance a cikin CV ba?",
          question_en: "What should NOT be in a CV?",
          options: [
            { text_ha: "Ilimi", text_en: "Education", correct: false },
            { text_ha: "Ƙarya", text_en: "A lie", correct: true },
            { text_ha: "Ƙwarewa", text_en: "Skills", correct: false },
            { text_ha: "Lambar waya", text_en: "Phone number", correct: false }
          ],
          explanation_ha: "Kada ka taɓa yin ƙarya a CV.",
          explanation_en: "Never lie on a CV."
        }
      ]
    },

    /* ---------- MODULE 3 — WhatsApp & Social Media ---------- */
    {
      id: "whatsapp-social",
      order: 3,
      icon: "💬",
      title_ha: "Sifirin WhatsApp da Soshiyal",
      title_en: "WhatsApp & Social Media",
      desc_ha: "Koyi yadda za ka yi amfani da WhatsApp da soshiyal cikin aminci, ka kuma gina kasuwancinka.",
      desc_en: "Learn how to use WhatsApp and social media safely, and build your online presence.",
      examPassMark: 70,
      lessons: [
        {
          id: "wa-l1",
          order: 1,
          title_ha: "Tushen WhatsApp",
          title_en: "WhatsApp Basics",
          video: "https://www.youtube.com/embed/eBjYn9SxcZw?si=_A7AvDryJUNGmzou",
          read_ha:
            "WhatsApp ita ce manhajar sadarwa mafi amfani a duniya.\n\n" +
            "**Abin da za ka iya yi:**\n" +
            "- Aika saƙon rubutu\n" +
            "- Aika saƙon murya\n" +
            "- Yimin kira da bidiyo\n" +
            "- Ƙirƙirar rukuni (group)\n" +
            "- Aika hotuna da fayiloli\n\n" +
            "**Ka lura:**\n" +
            "- Kar ka shiga rukunin da ba ka sani ba\n" +
            "- Kar ka amsa saƙo daga lambar da ba ka sani ba",
          read_en:
            "WhatsApp is the most widely used messaging app in the world.\n\n" +
            "**What you can do:**\n" +
            "- Send text messages\n" +
            "- Send voice notes\n" +
            "- Make voice and video calls\n" +
            "- Create groups\n" +
            "- Send photos and files\n\n" +
            "**Remember:**\n" +
            "- Don't join groups you don't know\n" +
            "- Don't reply to unknown numbers",
          quiz: {
            question_ha: "Menene bai kamata ka yi a WhatsApp ba?",
            question_en: "What should you NOT do on WhatsApp?",
            options: [
              { text_ha: "Aika saƙon murya", text_en: "Send a voice note", correct: false },
              { text_ha: "Amsa saƙo daga lambar da ba ka sani ba", text_en: "Reply to unknown numbers", correct: true },
              { text_ha: "Yin kira", text_en: "Make a call", correct: false },
              { text_ha: "Ƙirƙirar rukuni", text_en: "Create a group", correct: false }
            ],
            explanation_ha: "Kada ka amsa saƙo daga lambar da ba ka sani ba.",
            explanation_en: "Never reply to messages from unknown numbers."
          }
        },
        {
          id: "wa-l2",
          order: 2,
          title_ha: "Saitunan Sirri",
          title_en: "Privacy Settings",
          video: "",
          read_ha:
            "Ka iya sarrafa wanda zai iya ganin bayananka a WhatsApp.\n\n" +
            "**Saituna masu muhimmanci:**\n" +
            "- **Last seen** — wanda zai ga lokacin da ka shiga\n" +
            "- **Profile photo** — wanda zai ga hotonka\n" +
            "- **About** — wanda zai ga bayanin ka\n" +
            "- **Read receipts** — ko za a ga ka karanta saƙo\n\n" +
            "**Shawara:** Ka sa su **My Contacts** ko **Nobody** don sirri.",
          read_en:
            "You can control who sees your information on WhatsApp.\n\n" +
            "**Important settings:**\n" +
            "- **Last seen** — who sees when you were online\n" +
            "- **Profile photo** — who sees your picture\n" +
            "- **About** — who sees your bio\n" +
            "- **Read receipts** — whether others see you've read a message\n\n" +
            "**Advice:** Set these to **My Contacts** or **Nobody** for privacy.",
          quiz: {
            question_ha: "Menene ya kamata ka yi da saitunan sirri?",
            question_en: "What should you do with privacy settings?",
            options: [
              { text_ha: "Ka bar su a buɗe", text_en: "Leave them open", correct: false },
              { text_ha: "Ka sa su My Contacts ko Nobody", text_en: "Set them to My Contacts or Nobody", correct: true },
              { text_ha: "Ka share su", text_en: "Delete them", correct: false },
              { text_ha: "Ka raba su da kowa", text_en: "Share them with everyone", correct: false }
            ],
            explanation_ha: "Ka sa saitunan sirri su zama My Contacts ko Nobody.",
            explanation_en: "Set privacy settings to My Contacts or Nobody."
          }
        },
        {
          id: "wa-l3",
          order: 3,
          title_ha: "Soshiyal Media",
          title_en: "Social Media",
          video: "",
          read_ha:
            "Facebook, Instagram, da TikTok kayan aiki ne na sadarwa da kasuwanci.\n\n" +
            "**Abin da za ka iya yi:**\n" +
            "- Raba hotuna da bidiyo\n" +
            "- Yi kasuwanci\n" +
            "- Koyi sabbin abubuwa\n" +
            "- Haɗa kai da abokai\n\n" +
            "**Ka lura:**\n" +
            "- Kar ka raba bayanan sirri\n" +
            "- Kar ka gaskata duk abin da ka gani\n" +
            "- Yi hankali da mutanen da ba ka sani ba",
          read_en:
            "Facebook, Instagram, and TikTok are tools for connecting and doing business.\n\n" +
            "**What you can do:**\n" +
            "- Share photos and videos\n" +
            "- Do business\n" +
            "- Learn new things\n" +
            "- Connect with friends\n\n" +
            "**Remember:**\n" +
            "- Don't share private information\n" +
            "- Don't believe everything you see\n" +
            "- Be careful with strangers",
          quiz: {
            question_ha: "Menene ya kamata ka yi a soshiyal media?",
            question_en: "What should you do on social media?",
            options: [
              { text_ha: "Raba bayanan sirri", text_en: "Share private info", correct: false },
              { text_ha: "Yi hankali da mutanen da ba ka sani ba", text_en: "Be careful with strangers", correct: true },
              { text_ha: "Gaskata duk abin da ka gani", text_en: "Believe everything", correct: false },
              { text_ha: "Amsa duk saƙo", text_en: "Reply to every message", correct: false }
            ],
            explanation_ha: "Yi hankali da mutanen da ba ka sani ba.",
            explanation_en: "Be careful with strangers on social media."
          }
        },
        {
          id: "wa-l4",
          order: 4,
          title_ha: "WhatsApp Business",
          title_en: "WhatsApp Business",
          video: "",
          read_ha:
            "WhatsApp Business an ƙirƙira ta ne don ƴan kasuwa.\n\n" +
            "**Abin da take bayarwa:**\n" +
            "- Sunan kasuwanci\n" +
            "- Bayanin kasuwanci\n" +
            "- Katalog ɗin kayayyaki\n" +
            "- Amsoshin atomatik\n\n" +
            "**Yadda za ka fara:**\n" +
            "- Sauke WhatsApp Business daga Play Store\n" +
            "- Yi rijista da lambar kasuwancinka\n" +
            "- Sanya hoton kaya da farashi\n\n" +
            "Kasuwancinka zai zama mai sauƙin samu.",
          read_en:
            "WhatsApp Business is made for small business owners.\n\n" +
            "**What it offers:**\n" +
            "- Business name\n" +
            "- Business description\n" +
            "- Product catalog\n" +
            "- Automatic replies\n\n" +
            "**How to start:**\n" +
            "- Download WhatsApp Business from the Play Store\n" +
            "- Register with your business number\n" +
            "- Add product photos and prices\n\n" +
            "Your business becomes easier to find.",
          quiz: {
            question_ha: "Menene WhatsApp Business take bayarwa?",
            question_en: "What does WhatsApp Business offer?",
            options: [
              { text_ha: "Wasa", text_en: "Games", correct: false },
              { text_ha: "Katalog ɗin kayayyaki", text_en: "Product catalog", correct: true },
              { text_ha: "Fim", text_en: "Movies", correct: false },
              { text_ha: "Kiɗa", text_en: "Music", correct: false }
            ],
            explanation_ha: "WhatsApp Business tana ba da katalog ɗin kayayyaki.",
            explanation_en: "WhatsApp Business offers a product catalog."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene bai kamata ka yi a WhatsApp ba?",
          question_en: "What should you NOT do on WhatsApp?",
          options: [
            { text_ha: "Aika saƙon murya", text_en: "Send a voice note", correct: false },
            { text_ha: "Amsa saƙo daga lambar da ba ka sani ba", text_en: "Reply to unknown numbers", correct: true },
            { text_ha: "Yin kira", text_en: "Make a call", correct: false },
            { text_ha: "Ƙirƙirar rukuni", text_en: "Create a group", correct: false }
          ],
          explanation_ha: "Kada ka amsa saƙo daga lambar da ba ka sani ba.",
          explanation_en: "Never reply to unknown numbers."
        },
        {
          question_ha: "Menene ya kamata ka yi da saitunan sirri?",
          question_en: "What should you do with privacy settings?",
          options: [
            { text_ha: "Ka bar su a buɗe", text_en: "Leave them open", correct: false },
            { text_ha: "Ka sa su My Contacts ko Nobody", text_en: "Set them to My Contacts or Nobody", correct: true },
            { text_ha: "Ka share su", text_en: "Delete them", correct: false },
            { text_ha: "Ka raba su", text_en: "Share them", correct: false }
          ],
          explanation_ha: "Ka sa saitunan sirri su zama My Contacts ko Nobody.",
          explanation_en: "Set privacy settings to My Contacts or Nobody."
        }
      ]
    },

    /* ---------- MODULE 4 — Digital Safety ---------- */
    {
      id: "digital-safety",
      order: 4,
      icon: "🔐",
      title_ha: "Kariya da Tsaron Asusu",
      title_en: "Digital Safety",
      desc_ha: "Koyi yadda za ka gane zamba, ka kare asusunka, ka kuma kiyaye sirrin bayananka.",
      desc_en: "Learn how to detect scams, protect your accounts, and keep your information private.",
      examPassMark: 70,
      lessons: [
        {
          id: "safe-l1",
          order: 1,
          title_ha: "Gane Zamba",
          title_en: "Spotting Scams",
          video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          read_ha:
            "Zamba na yawaita a yanar gizo. Ka koyi gane su.\n\n" +
            "**Alamun zamba:**\n" +
            "- An ce ka ci kyauta kwatsam\n" +
            "- An ce ka aika OTP ko PIN\n" +
            "- An ce ka danna hanyar da ba ka sani ba\n" +
            "- An yi saƙo da harshe mara kyau\n\n" +
            "**Ka tuna:** Idan ya zama abin da ya fi kyau, to tabbas zamba ce.",
          read_en:
            "Scams are common online. Learn to spot them.\n\n" +
            "**Signs of a scam:**\n" +
            "- You suddenly won a prize\n" +
            "- You're asked to send an OTP or PIN\n" +
            "- You're told to click a strange link\n" +
            "- The message has poor grammar\n\n" +
            "**Remember:** If it sounds too good to be true, it's a scam.",
          quiz: {
            question_ha: "Menene alama ta zamba?",
            question_en: "What is a sign of a scam?",
            options: [
              { text_ha: "An ce ka ci kyauta kwatsam", text_en: "You suddenly won a prize", correct: true },
              { text_ha: "An gaishe ka", text_en: "Someone greeted you", correct: false },
              { text_ha: "An aika maka hoto", text_en: "Someone sent a photo", correct: false },
              { text_ha: "An kira ka", text_en: "Someone called you", correct: false }
            ],
            explanation_ha: "Idan an ce ka ci kyauta kwatsam, zamba ce.",
            explanation_en: "If you suddenly won a prize, it's a scam."
          }
        },
        {
          id: "safe-l2",
          order: 2,
          title_ha: "Password da 2FA",
          title_en: "Passwords & 2FA",
          video: "",
          read_ha:
            "Password shine makullin asusunka. Ka kare shi.\n\n" +
            "**Ka sa password mai ƙarfi:**\n" +
            "- Haruffa manya da ƙanana\n" +
            "- Lambobi\n" +
            "- Alamomi kamar ! @ #\n" +
            "- Aƙalla haruffa 8\n\n" +
            "**2FA (Two-Factor Authentication):**\n" +
            "Ita ce kariya ta biyu. Bayan password, za a aika maka lamba ta waya.\n\n" +
            "Ka kunna 2FA a duk asusunka.",
          read_en:
            "Your password is the key to your account. Protect it.\n\n" +
            "**Use a strong password:**\n" +
            "- Upper and lowercase letters\n" +
            "- Numbers\n" +
            "- Symbols like ! @ #\n" +
            "- At least 8 characters\n\n" +
            "**2FA (Two-Factor Authentication):**\n" +
            "It's a second layer of protection. After your password, a code is sent to your phone.\n\n" +
            "Turn on 2FA for all your accounts.",
          quiz: {
            question_ha: "Menene 2FA?",
            question_en: "What is 2FA?",
            options: [
              { text_ha: "Password na biyu", text_en: "A second password", correct: false },
              { text_ha: "Kariya ta biyu bayan password", text_en: "A second layer of protection after password", correct: true },
              { text_ha: "Wani nau'in imel", text_en: "A type of email", correct: false },
              { text_ha: "Manhajar WhatsApp", text_en: "A WhatsApp app", correct: false }
            ],
            explanation_ha: "2FA ita ce kariya ta biyu.",
            explanation_en: "2FA is a second layer of protection."
          }
        },
        {
          id: "safe-l3",
          order: 3,
          title_ha: "OTP da PIN",
          title_en: "OTP & PIN Safety",
          video: "",
          read_ha:
            "OTP da PIN sirri ne tsakaninka da bankinka.\n\n" +
            "**Ka tuna:**\n" +
            "- **OTP** — lambar wucin gadi da ake aika maka\n" +
            "- **PIN** — lambar sirri ta katin banki\n\n" +
            "**Kada ka taɓa:**\n" +
            "- Raba OTP da kowa\n" +
            "- Raba PIN da kowa\n" +
            "- Rubuta su a inda kowa zai gani\n\n" +
            "Bankinka ba zai taɓa tambayeka OTP ba. Idan wani ya tambaye ka, zamba ce.",
          read_en:
            "OTP and PIN are private between you and your bank.\n\n" +
            "**Remember:**\n" +
            "- **OTP** — a temporary code sent to you\n" +
            "- **PIN** — the secret code for your bank card\n\n" +
            "**Never:**\n" +
            "- Share your OTP with anyone\n" +
            "- Share your PIN with anyone\n" +
            "- Write them where others can see\n\n" +
            "Your bank will never ask for your OTP. If someone does, it's a scam.",
          quiz: {
            question_ha: "Idan wani ya tambaye ka OTP, menene hakan?",
            question_en: "If someone asks for your OTP, what is that?",
            options: [
              { text_ha: "Daidai ne", text_en: "Normal", correct: false },
              { text_ha: "Zamba ce", text_en: "It's a scam", correct: true },
              { text_ha: "Bukata ce", text_en: "A requirement", correct: false },
              { text_ha: "Taimako ne", text_en: "A favor", correct: false }
            ],
            explanation_ha: "Banki ba zai taɓa tambayar OTP ba.",
            explanation_en: "A bank will never ask for your OTP."
          }
        },
        {
          id: "safe-l4",
          order: 4,
          title_ha: "Sirrin Bayanai",
          title_en: "Protecting Your Privacy",
          video: "",
          read_ha:
            "Bayanan ka na sirri kaya ne mai daraja.\n\n" +
            "**Bayanan da ya kamata ka kiyaye:**\n" +
            "- Lambar BVN da NIN\n" +
            "- Lambar asusun banki\n" +
            "- OTP da PIN\n" +
            "- Adireshin gida\n\n" +
            "**Ka lura:**\n" +
            "- Kar ka rubuta su a WhatsApp\n" +
            "- Kar ka aika su ta imel\n" +
            "- Kar ka bari wani ya ga wayarka\n\n" +
            "Kare bayananka kamar yadda kake kare kuɗinka.",
          read_en:
            "Your personal information is valuable.\n\n" +
            "**Information to protect:**\n" +
            "- Your BVN and NIN numbers\n" +
            "- Your bank account number\n" +
            "- Your OTP and PIN\n" +
            "- Your home address\n\n" +
            "**Remember:**\n" +
            "- Don't write them on WhatsApp\n" +
            "- Don't send them by email\n" +
            "- Don't let anyone access your phone\n\n" +
            "Protect your data the way you protect your money.",
          quiz: {
            question_ha: "Wane bayani ne ya kamata ka kiyaye?",
            question_en: "What information should you protect?",
            options: [
              { text_ha: "Sunan ka", text_en: "Your name", correct: false },
              { text_ha: "BVN da NIN", text_en: "BVN and NIN", correct: true },
              { text_ha: "Ƙasar ka", text_en: "Your country", correct: false },
              { text_ha: "Harshen ka", text_en: "Your language", correct: false }
            ],
            explanation_ha: "BVN da NIN suna cikin bayanan da ya kamata ka kiyaye.",
            explanation_en: "BVN and NIN should be kept private."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene alama ta zamba?",
          question_en: "What is a sign of a scam?",
          options: [
            { text_ha: "Kyauta kwatsam", text_en: "A sudden prize", correct: true },
            { text_ha: "Gaisuwa", text_en: "A greeting", correct: false },
            { text_ha: "Hoto", text_en: "A photo", correct: false },
            { text_ha: "Kira", text_en: "A call", correct: false }
          ],
          explanation_ha: "Kyauta kwatsam alama ce ta zamba.",
          explanation_en: "A sudden prize is a sign of a scam."
        },
        {
          question_ha: "Menene 2FA?",
          question_en: "What is 2FA?",
          options: [
            { text_ha: "Password na biyu", text_en: "A second password", correct: false },
            { text_ha: "Kariya ta biyu", text_en: "A second layer of protection", correct: true },
            { text_ha: "Imel", text_en: "Email", correct: false },
            { text_ha: "Manhaja", text_en: "An app", correct: false }
          ],
          explanation_ha: "2FA ita ce kariya ta biyu.",
          explanation_en: "2FA is a second layer of protection."
        },
        {
          question_ha: "Idan wani ya tambaye ka OTP, menene hakan?",
          question_en: "If someone asks for your OTP, what is that?",
          options: [
            { text_ha: "Daidai", text_en: "Normal", correct: false },
            { text_ha: "Zamba", text_en: "A scam", correct: true },
            { text_ha: "Bukata", text_en: "A requirement", correct: false },
            { text_ha: "Taimako", text_en: "A favor", correct: false }
          ],
          explanation_ha: "Banki ba zai taɓa tambayar OTP ba.",
          explanation_en: "A bank will never ask for your OTP."
        }
      ]
    },

    /* ---------- MODULE 5 — AI Basics ---------- */
    {
      id: "ai-basics",
      order: 5,
      icon: "🤖",
      title_ha: "Amfani da Basirar Wucin Gadi",
      title_en: "AI Basics",
      desc_ha: "Koyi menene AI, yadda za ka rubuta prompts masu kyau, da yadda za ka yi amfani da ita cikin alhaki.",
      desc_en: "Learn what AI is, how to write good prompts, and how to use it responsibly.",
      examPassMark: 70,
      lessons: [
        {
          id: "ai-l1",
          order: 1,
          title_ha: "Menene AI?",
          title_en: "What is AI?",
          video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          read_ha:
            "AI (Basirar Wucin Gadi) ita ce manhaja da ke iya taimaka maka da tambayoyi, rubutu, da ayyuka.\n\n" +
            "**Abin da AI za ta iya yi:**\n" +
            "- Amsa tambayoyi\n" +
            "- Rubuta wasiƙa\n" +
            "- Fassara harsuna\n" +
            "- Taimaka da karatu\n\n" +
            "**Misalan AI:**\n" +
            "- ChatGPT\n" +
            "- Google Gemini\n" +
            "- Microsoft Copilot\n\n" +
            "AI ba ta maye gurbinka ba. Taimako ce kawai.",
          read_en:
            "AI (Artificial Intelligence) is software that can help you with questions, writing, and tasks.\n\n" +
            "**What AI can do:**\n" +
            "- Answer questions\n" +
            "- Write letters\n" +
            "- Translate languages\n" +
            "- Help with studying\n\n" +
            "**Examples of AI:**\n" +
            "- ChatGPT\n" +
            "- Google Gemini\n" +
            "- Microsoft Copilot\n\n" +
            "AI won't replace you. It's just a helper.",
          quiz: {
            question_ha: "Menene AI?",
            question_en: "What is AI?",
            options: [
              { text_ha: "Wasa", text_en: "A game", correct: false },
              { text_ha: "Manhaja mai taimakawa", text_en: "Software that helps you", correct: true },
              { text_ha: "Waya", text_en: "A phone", correct: false },
              { text_ha: "Banki", text_en: "A bank", correct: false }
            ],
            explanation_ha: "AI manhaja ce da ke taimaka maka.",
            explanation_en: "AI is software that helps you."
          }
        },
        {
          id: "ai-l2",
          order: 2,
          title_ha: "Rubuta Prompts",
          title_en: "Writing Prompts",
          video: "",
          read_ha:
            "Prompt ita ce tambayar da kake yi wa AI.\n\n" +
            "**Yadda za ka rubuta prompt mai kyau:**\n" +
            "- Bayyana abin da kake so sosai\n" +
            "- Ba da misalai\n" +
            "- Ce mata harshen da kake so\n\n" +
            "**Misali mara kyau:**\n" +
            "\"Rubuta mini wasiƙa\"\n\n" +
            "**Misali mai kyau:**\n" +
            "\"Rubuta mini wasiƙar neman aiki a Hausa, mai shafin ɗaya, ga kamfanin lafiya.\"\n\n" +
            "Prompt mai kyau yana samun amsa mai kyau.",
          read_en:
            "A prompt is the question you ask AI.\n\n" +
            "**How to write a good prompt:**\n" +
            "- Describe exactly what you want\n" +
            "- Give examples\n" +
            "- Tell it which language you want\n\n" +
            "**Bad example:**\n" +
            "\"Write me a letter\"\n\n" +
            "**Good example:**\n" +
            "\"Write me a one-page job application letter in Hausa, for a health company.\"\n\n" +
            "A good prompt gets a good answer.",
          quiz: {
            question_ha: "Menene prompt?",
            question_en: "What is a prompt?",
            options: [
              { text_ha: "Amsa", text_en: "An answer", correct: false },
              { text_ha: "Tambaya ga AI", text_en: "A question to AI", correct: true },
              { text_ha: "Manhaja", text_en: "An app", correct: false },
              { text_ha: "Password", text_en: "A password", correct: false }
            ],
            explanation_ha: "Prompt ita ce tambayar da kake yi wa AI.",
            explanation_en: "A prompt is a question you ask AI."
          }
        },
        {
          id: "ai-l3",
          order: 3,
          title_ha: "AI don Koyo",
          title_en: "AI for Learning",
          video: "",
          read_ha:
            "AI na iya taimaka maka wajen koyo.\n\n" +
            "**Yadda za ka yi amfani da ita:**\n" +
            "- Tambaye ta bayani kan abu mai wahala\n" +
            "- Ce mata ta ba ka misalai\n" +
            "- Ce mata ta gwada ka da tambayoyi\n" +
            "- Ce mata ta fassara zuwa Hausa\n\n" +
            "**Misali:**\n" +
            "\"Bayyana mini photosynthesis kamar ina ɗan shekara 10.\"\n\n" +
            "AI malami ce da ba ta gajiya.",
          read_en:
            "AI can help you learn.\n\n" +
            "**How to use it:**\n" +
            "- Ask for explanations of hard topics\n" +
            "- Ask for examples\n" +
            "- Ask it to quiz you\n" +
            "- Ask it to translate to Hausa\n\n" +
            "**Example:**\n" +
            "\"Explain photosynthesis to me like I'm 10 years old.\"\n\n" +
            "AI is a teacher that never gets tired.",
          quiz: {
            question_ha: "Yaya AI za ta taimaka maka wajen koyo?",
            question_en: "How can AI help you learn?",
            options: [
              { text_ha: "Ta hanyar wasa", text_en: "By playing games", correct: false },
              { text_ha: "Ta bayyana abubuwa masu wahala", text_en: "By explaining hard topics", correct: true },
              { text_ha: "Ta hanyar kira", text_en: "By calling", correct: false },
              { text_ha: "Ta hanyar hoto", text_en: "By photos", correct: false }
            ],
            explanation_ha: "AI na iya bayyana abubuwa masu wahala cikin sauƙi.",
            explanation_en: "AI can explain hard topics simply."
          }
        },
        {
          id: "ai-l4",
          order: 4,
          title_ha: "AI don Kasuwanci",
          title_en: "AI for Business",
          video: "",
          read_ha:
            "AI na iya taimaka maka da kasuwancinka.\n\n" +
            "**Yadda za ka yi amfani da ita:**\n" +
            "- Rubuta tallace-tallace\n" +
            "- Fassara saƙo ga abokan ciniki\n" +
            "- Shirya jadawalin aiki\n" +
            "- Bayar da shawarwari kan farashi\n\n" +
            "**Misali:**\n" +
            "\"Rubuta mini tallan WhatsApp game da kayan shinkafa, mai jan hankali, a Hausa.\"\n\n" +
            "AI mataimaki ce ga ƴan kasuwa.",
          read_en:
            "AI can help you with your business.\n\n" +
            "**How to use it:**\n" +
            "- Write adverts\n" +
            "- Translate messages for customers\n" +
            "- Plan your schedule\n" +
            "- Get pricing advice\n\n" +
            "**Example:**\n" +
            "\"Write me a catchy WhatsApp advert for rice, in Hausa.\"\n\n" +
            "AI is an assistant for small business owners.",
          quiz: {
            question_ha: "Yaya AI za ta taimaka maka da kasuwanci?",
            question_en: "How can AI help your business?",
            options: [
              { text_ha: "Ta siyan kaya", text_en: "By buying goods", correct: false },
              { text_ha: "Ta rubuta tallace-tallace", text_en: "By writing adverts", correct: true },
              { text_ha: "Ta biya kuɗi", text_en: "By paying money", correct: false },
              { text_ha: "Ta kawo abokan ciniki", text_en: "By bringing customers", correct: false }
            ],
            explanation_ha: "AI na iya rubuta tallace-tallace.",
            explanation_en: "AI can write adverts for you."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene AI?",
          question_en: "What is AI?",
          options: [
            { text_ha: "Wasa", text_en: "A game", correct: false },
            { text_ha: "Manhaja mai taimakawa", text_en: "Software that helps", correct: true },
            { text_ha: "Waya", text_en: "A phone", correct: false },
            { text_ha: "Banki", text_en: "A bank", correct: false }
          ],
          explanation_ha: "AI manhaja ce da ke taimaka maka.",
          explanation_en: "AI is software that helps you."
        },
        {
          question_ha: "Menene prompt mai kyau?",
          question_en: "What makes a good prompt?",
          options: [
            { text_ha: "Gajere", text_en: "Short", correct: false },
            { text_ha: "Bayani mai zurfi", text_en: "Detailed description", correct: true },
            { text_ha: "Tambaya ɗaya", text_en: "One-word question", correct: false },
            { text_ha: "Hausa kawai", text_en: "Hausa only", correct: false }
          ],
          explanation_ha: "Prompt mai kyau yana da cikakken bayani.",
          explanation_en: "A good prompt is detailed."
        }
      ]
    },

    /* ---------- MODULE 6 — Digital Business ---------- */
    {
      id: "digital-business",
      order: 6,
      icon: "💰",
      title_ha: "Kasuwancin Zamani ta Waya",
      title_en: "Digital Business",
      desc_ha: "Koyi yadda za ka sayar a kan layi, tallata kayayyaki, karɓi kuɗi, da sadarwa da abokan ciniki.",
      desc_en: "Learn how to sell online, market products, receive payments, and communicate with customers.",
      examPassMark: 70,
      lessons: [
        {
          id: "biz-l1",
          order: 1,
          title_ha: "Sayarwa a Kan Layi",
          title_en: "Selling Online",
          video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          read_ha:
            "Za ka iya sayar da kayayyaki ba tare da shago ba.\n\n" +
            "**Inda za ka sayar:**\n" +
            "- WhatsApp\n" +
            "- Facebook Marketplace\n" +
            "- Instagram\n" +
            "- Jumia\n\n" +
            "**Abin da kake buƙata:**\n" +
            "- Hoto mai kyau na kaya\n" +
            "- Bayanin kaya\n" +
            "- Farashi\n" +
            "- Lambar waya\n\n" +
            "Kasuwancin kan layi ba shi da iyaka.",
          read_en:
            "You can sell products without a physical shop.\n\n" +
            "**Where to sell:**\n" +
            "- WhatsApp\n" +
            "- Facebook Marketplace\n" +
            "- Instagram\n" +
            "- Jumia\n\n" +
            "**What you need:**\n" +
            "- Clear product photos\n" +
            "- Product description\n" +
            "- Price\n" +
            "- Phone number\n\n" +
            "Online business has no limits.",
          quiz: {
            question_ha: "Menene kake buƙata don sayarwa a kan layi?",
            question_en: "What do you need to sell online?",
            options: [
              { text_ha: "Shago", text_en: "A shop", correct: false },
              { text_ha: "Hoto, bayani, da farashi", text_en: "Photo, description, and price", correct: true },
              { text_ha: "Mota", text_en: "A car", correct: false },
              { text_ha: "Ofis", text_en: "An office", correct: false }
            ],
            explanation_ha: "Hoto, bayani, da farashi su ne muhimman abubuwa.",
            explanation_en: "Photo, description, and price are essential."
          }
        },
        {
          id: "biz-l2",
          order: 2,
          title_ha: "Tallata Kayayyaki",
          title_en: "Marketing Products",
          video: "",
          read_ha:
            "Idan ba ka tallata ba, babu wanda zai sani.\n\n" +
            "**Yadda ake tallatawa:**\n" +
            "- Yi hoto mai kyau da haske\n" +
            "- Rubuta bayani mai jan hankali\n" +
            "- Yi amfani da hashtags\n" +
            "- Aika a rukunin WhatsApp\n\n" +
            "**Misali na talla:**\n" +
            "\"Sabuwar shinkafa mai inganci! Farashi ₦5,000. Aika saƙo yanzu.\"\n\n" +
            "Talla mai kyau tana kawo abokan ciniki.",
          read_en:
            "If you don't advertise, no one will know.\n\n" +
            "**How to market:**\n" +
            "- Take good, well-lit photos\n" +
            "- Write attractive descriptions\n" +
            "- Use hashtags\n" +
            "- Send to WhatsApp groups\n\n" +
            "**Example ad:**\n" +
            "\"Fresh quality rice! ₦5,000. Message now.\"\n\n" +
            "Good marketing brings customers.",
          quiz: {
            question_ha: "Menene talla mai kyau take buƙata?",
            question_en: "What makes good marketing?",
            options: [
              { text_ha: "Hoto mara kyau", text_en: "Bad photo", correct: false },
              { text_ha: "Hoto mai kyau da bayani mai jan hankali", text_en: "Good photo and attractive description", correct: true },
              { text_ha: "Farashi mai tsada", text_en: "High price", correct: false },
              { text_ha: "Saƙo mai tsawo", text_en: "Long message", correct: false }
            ],
            explanation_ha: "Hoto mai kyau da bayani mai jan hankali suna kawo abokan ciniki.",
            explanation_en: "A good photo and attractive description bring customers."
          }
        },
        {
          id: "biz-l3",
          order: 3,
          title_ha: "Karɓar Kuɗi",
          title_en: "Receiving Payments",
          video: "",
          read_ha:
            "Za ka iya karɓar kuɗi ta hanyoyi da yawa.\n\n" +
            "**Hanyoyin biya:**\n" +
            "- **Transfer** — daga banki zuwa banki\n" +
            "- **USSD** — *737# da makamantansu\n" +
            "- **POS** — na'urar karɓar kuɗi\n" +
            "- **Online payment** — Paystack, Flutterwave\n\n" +
            "**Ka lura:**\n" +
            "- Kar ka aika kaya kafin ka tabbatar da biya\n" +
            "- Duba asusunka da kanka\n" +
            "- Kar ka gaskata hoton biya kawai\n\n" +
            "Tabbatar da biya kafin aika kaya.",
          read_en:
            "You can receive money in several ways.\n\n" +
            "**Payment methods:**\n" +
            "- **Transfer** — bank to bank\n" +
            "- **USSD** — *737# and similar\n" +
            "- **POS** — card payment machine\n" +
            "- **Online payment** — Paystack, Flutterwave\n\n" +
            "**Remember:**\n" +
            "- Don't send goods before confirming payment\n" +
            "- Check your account yourself\n" +
            "- Don't trust a screenshot alone\n\n" +
            "Confirm payment before shipping.",
          quiz: {
            question_ha: "Menene ya kamata ka yi kafin ka aika kaya?",
            question_en: "What should you do before sending goods?",
            options: [
              { text_ha: "Aika nan take", text_en: "Send immediately", correct: false },
              { text_ha: "Tabbatar da biya", text_en: "Confirm payment", correct: true },
              { text_ha: "Gaskata hoto", text_en: "Trust a screenshot", correct: false },
              { text_ha: "Jira kwana biyu", text_en: "Wait two days", correct: false }
            ],
            explanation_ha: "Tabbatar da biya kafin aika kaya.",
            explanation_en: "Confirm payment before sending goods."
          }
        },
        {
          id: "biz-l4",
          order: 4,
          title_ha: "Sadarwa da Abokan Ciniki",
          title_en: "Customer Communication",
          video: "",
          read_ha:
            "Abokan ciniki suna son girmamawa da amsa da sauri.\n\n" +
            "**Yadda za ka yi:**\n" +
            "- Amsa saƙo cikin sa'a\n" +
            "- Yi magana cikin ladabi\n" +
            "- Bayar da bayani daidai\n" +
            "- Yi godiya bayan sayarwa\n\n" +
            "**Misali na amsa:**\n" +
            "\"Na gode da saƙonka. Za mu aika maka kaya gobe.\"\n\n" +
            "Abokin ciniki mai farin ciki zai dawo.",
          read_en:
            "Customers want respect and fast replies.\n\n" +
            "**How to do it:**\n" +
            "- Reply within an hour\n" +
            "- Be polite\n" +
            "- Give accurate information\n" +
            "- Thank them after the sale\n\n" +
            "**Example reply:**\n" +
            "\"Thank you for your message. We'll send your goods tomorrow.\"\n\n" +
            "A happy customer comes back.",
          quiz: {
            question_ha: "Yaya za ka yi da abokan ciniki?",
            question_en: "How should you treat customers?",
            options: [
              { text_ha: "Yi musu sanyi", text_en: "Be rude", correct: false },
              { text_ha: "Amsa da sauri da ladabi", text_en: "Reply fast and politely", correct: true },
              { text_ha: "Kar ka amsa", text_en: "Ignore them", correct: false },
              { text_ha: "Yi magana mai tsanani", text_en: "Speak harshly", correct: false }
            ],
            explanation_ha: "Amsa da sauri da ladabi tana riƙe abokan ciniki.",
            explanation_en: "Replying fast and politely keeps customers."
          }
        }
      ],
      exam: [
        {
          question_ha: "Menene kake buƙata don sayarwa a kan layi?",
          question_en: "What do you need to sell online?",
          options: [
            { text_ha: "Shago", text_en: "A shop", correct: false },
            { text_ha: "Hoto, bayani, da farashi", text_en: "Photo, description, and price", correct: true },
            { text_ha: "Mota", text_en: "A car", correct: false },
            { text_ha: "Ofis", text_en: "An office", correct: false }
          ],
          explanation_ha: "Hoto, bayani, da farashi su ne muhimman abubuwa.",
          explanation_en: "Photo, description, and price are essential."
        },
        {
          question_ha: "Menene ya kamata ka yi kafin ka aika kaya?",
          question_en: "What should you do before shipping goods?",
          options: [
            { text_ha: "Aika nan take", text_en: "Send immediately", correct: false },
            { text_ha: "Tabbatar da biya", text_en: "Confirm payment", correct: true },
            { text_ha: "Gaskata hoto", text_en: "Trust a screenshot", correct: false },
            { text_ha: "Jira", text_en: "Wait", correct: false }
          ],
          explanation_ha: "Tabbatar da biya kafin aika kaya.",
          explanation_en: "Confirm payment before shipping goods."
        }
      ]
    }

  ],


  /* ============================================================
     4. OPPORTUNITIES — Section 7
     The 7th hub: guide + live directory of grants & programs.
     ============================================================ */
  opportunities: {
    intro_ha:
      "Kafin ka nemi kowace dama, ka tabbatar ta gaskiya ce.\n\n" +
      "**Yadda za ka gane dama ta gaskiya:**\n" +
      "- Tana da shafin yanar gizo na hukuma\n" +
      "- Ba ta buƙatar ka biya kuɗi don nema\n" +
      "- Ba ta neman OTP ko PIN ɗinka\n" +
      "- Ana iya tabbatar da ita ta hukuma\n\n" +
      "**Idan dama ta buƙaci kuɗi ko OTP, zamba ce.**",
    intro_en:
      "Before you apply for any opportunity, verify it's real.\n\n" +
      "**How to spot a real opportunity:**\n" +
      "- It has an official website\n" +
      "- It doesn't ask you to pay to apply\n" +
      "- It never asks for your OTP or PIN\n" +
      "- It can be verified through an official channel\n\n" +
      "**If an opportunity asks for money or OTP, it's a scam.**",
    guide_video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    items: [
      {
        id: "boi-youth",
        title_ha: "Tallafin Matasa na Bank of Industry",
        title_en: "Bank of Industry Youth Fund",
        org_ha: "Bank of Industry",
        org_en: "Bank of Industry",
        tag_ha: "Tallafi",
        tag_en: "Grant",
        deadline: "2026-06-30",
        link: "https://www.boi.ng",
        verified: true
      },
      {
        id: "nirsal-agri",
        title_ha: "Tallafin Noma na NIRSAL",
        title_en: "NIRSAL Agriculture Support",
        org_ha: "NIRSAL",
        org_en: "NIRSAL",
        tag_ha: "Noma",
        tag_en: "Agriculture",
        deadline: "",
        link: "https://nirsal.com",
        verified: true
      },
      {
        id: "3mtt",
        title_ha: "Shirin 3MTT na Gwamnatin Tarayya",
        title_en: "3MTT Federal Training Program",
        org_ha: "Ministry of Communications",
        org_en: "Ministry of Communications",
        tag_ha: "Koyo",
        tag_en: "Training",
        deadline: "2026-04-15",
        link: "https://3mtt.nitda.gov.ng",
        verified: true
      },
      {
        id: "ngcares",
        title_ha: "Tallafin Ƙananan Kasuwanci na NGCares",
        title_en: "NG-CARES Small Business Grant",
        org_ha: "NGCares",
        org_en: "NGCares",
        tag_ha: "Kasuwanci",
        tag_en: "Business",
        deadline: "",
        link: "https://ngcares.gov.ng",
        verified: true
      },
      {
        id: "giz-skills",
        title_ha: "Koyon Ƙwarewar GIZ",
        title_en: "GIZ Skills Training",
        org_ha: "GIZ Nigeria",
        org_en: "GIZ Nigeria",
        tag_ha: "Koyo",
        tag_en: "Training",
        deadline: "2026-05-20",
        link: "https://www.giz.de/en/worldwide/33444.html",
        verified: true
      },
      {
        id: "tetfund-scholarship",
        title_ha: "Ɗalibai na TETFund",
        title_en: "TETFund Scholarship",
        org_ha: "TETFund",
        org_en: "TETFund",
        tag_ha: "Ilimi",
        tag_en: "Education",
        deadline: "2026-07-10",
        link: "https://tetfund.gov.ng",
        verified: true
      }
    ]
  }

};